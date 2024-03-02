import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { getCookie, setCookie } from "cookies-next";
import { REFRESH_TOKEN_KEY, USER_TOKEN_KEY } from "@/config/cookies";
import AuthAPI from "./auth";
import { logout } from "@/utils/auth";

/**
 * Use this axios file to call API instead of using default axios
 */

const BASE_URL_API_CLIENTSIDE =
  (process.env.NEXT_PUBLIC_URL_API || "") + "/api";
const TIMEOUT = 6e4;

/**
 * This interceptor adds authorization header in request if the token is present.
 * @param {AxiosRequestConfig} config - The axios request configuration
 * @returns {AxiosRequestConfig} - The updated axios request configuration
 */
const requestInterceptor = (config: AxiosRequestConfig): AxiosRequestConfig => {
  const token = getCookie(USER_TOKEN_KEY) as string | undefined;
  if (token) {
    config.headers = {
      ...config.headers,
      "Cache-Control": "no-cache",
      authorization: `Bearer ${token}`,
    };
  }

  const controller = new AbortController();
  throttleDuplicateRequest(config);

  return { ...config, signal: controller.signal };
};

/**
 *
 * @param {AxiosResponse} response - The axios response
 * @returns {AxiosResponse} - The axios response
 */
const clientInterceptor = (response: AxiosResponse): AxiosResponse => {
  return response;
};

/**
 * This interceptor refreshes the token if the token is invalid or expired and returns the response from axios call
 * @param {AxiosResponse} error - The error object in case of axios call failure
 */
const onErrorClientInterceptor = async (error: any) => {
  const originalRequest = error.config;
  const TOKEN_INVALID_OR_EXPIRED =
    error?.response?.data?.code === "token_not_valid";
  if (TOKEN_INVALID_OR_EXPIRED && !originalRequest._retry) {
    originalRequest._retry = true;
    const newToken = await refreshToken();
    if (!newToken) {
      await logout();
      typeof window !== "undefined" && window.open("/login", "_self");
    }
    return axios(originalRequest);
  }
  return Promise.reject(error);
};

interface InjectInterceptorsParams {
  /**
   * The axios instance to be used to send requests
   */
  instance: AxiosInstance;
  /**
   * The function that adds an interceptor for requests
   */
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  /**
   * The function that adds an interceptor for responses
   */
  responseInterceptor?: (res: AxiosResponse) => AxiosResponse;
  /**
   * The function that adds an interceptor for errors
   */
  errorInterceptor?: (e: any) => Promise<any>;
}
/**
 * @param {InjectInterceptorsParams} options - Options for interceptors
 * @returns {AxiosInstance} - Axios instance with added interceptors
 */
const withInterceptors = (options: InjectInterceptorsParams): AxiosInstance => {
  const {
    instance,
    requestInterceptor,
    responseInterceptor,
    errorInterceptor = defaultErrorInterceptor,
  } = options;

  if (requestInterceptor) {
    instance.interceptors.request.use(requestInterceptor, errorInterceptor);
  }

  if (responseInterceptor) {
    instance.interceptors.response.use(responseInterceptor, errorInterceptor);
  }

  return instance;
};

/**
 * @param {AxiosError} error - Axios error instance
 * @returns {AxiosError} - Returns the same error instance
 */
const defaultErrorInterceptor = (error: AxiosError): AxiosError => {
  return error;
};

/**
 * This is the default axios instance for this project
 * It sends request to the Backend API (client side)
 */
export default withInterceptors({
  instance: axios.create({
    baseURL: BASE_URL_API_CLIENTSIDE,
    timeout: TIMEOUT,
  }),
  requestInterceptor,
  responseInterceptor: clientInterceptor,
  errorInterceptor: onErrorClientInterceptor,
});

const lastRequestTimestamps: Record<string, any> = {};
const debounceTimeout = 1000;

export const throttleDuplicateRequest = (config: AxiosRequestConfig) => {
  const { url, params, data } = config;

  // Construct a unique identifier for the request including URL, query parameters, and request body
  const requestIdentifier = `${url}?${JSON.stringify(params)}${JSON.stringify(
    data
  )}`;

  // Check if a request has been sent to the same URL within the debounce timeout
  if (
    requestIdentifier &&
    lastRequestTimestamps[requestIdentifier] &&
    Date.now() - lastRequestTimestamps[requestIdentifier] < debounceTimeout
  ) {
    // Cancel the request if it's within the debounce timeout
    throw new axios.Cancel();
  }

  // Update the last request timestamp for the URL
  if (url) lastRequestTimestamps[requestIdentifier] = Date.now();
};

const refreshToken = async () => {
  try {
    const refreshToken = getCookie(REFRESH_TOKEN_KEY);
    if (!refreshToken) return null;
    const { access } = await AuthAPI.refreshTokenAPI(refreshToken);
    setCookie(USER_TOKEN_KEY, access);
    return access;
  } catch (error) {
    if (
      axios.isAxiosError(error) &&
      (error.response?.status == 401 || error.response?.status == 403)
    ) {
      return null;
    }
    throw error;
  }
};
