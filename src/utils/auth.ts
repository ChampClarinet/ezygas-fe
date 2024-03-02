import { AxiosResponse } from "axios";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import AuthAPI from "@/api/auth";
import { REFRESH_TOKEN_KEY, USER_TOKEN_KEY } from "@/config/cookies";
import { RegistrationError } from "@/errors";
import { RegisterDTO } from "@/types/user";

export const login = async (username: string, password: string) => {
  try {
    const { refresh, access } = await AuthAPI.loginAPI(username, password);
    setCookie(REFRESH_TOKEN_KEY, refresh);
    setCookie(USER_TOKEN_KEY, access);
    return "OK";
  } catch (e) {
    const response = (e as any)?.response as AxiosResponse;
    if (response.status === 401) {
      return "INCORRECT_PASSWORD";
    } else if (response.status === 403) {
      return "ACCOUNT_STILL_PENDING_OR_SUSPENDED";
    } else return "ERROR";
  }
};

export const logout = async () => {
  const refreshToken = getCookie(REFRESH_TOKEN_KEY);
  const isOk = refreshToken ? await AuthAPI.logoutAPI(refreshToken) : false;
  deleteCookie(USER_TOKEN_KEY);
  deleteCookie(REFRESH_TOKEN_KEY);
  if (!isOk) throw new Error(`Something's wrong with logout api`);
  return true;
};

export type RegisterAPIResponse =
  | {
      result: RegisterDTO;
      code: string;
    }
  | "EMAIL_CONFLICT"
  | "INVALID_TEL"
  | "ERROR";

export const register = async (
  payload: RegisterDTO
): Promise<RegisterAPIResponse> => {
  try {
    const response = await AuthAPI.registerAPI(payload);
    const { vendor_code } = response.data;
    return {
      result: payload,
      code: vendor_code,
    };
  } catch (error) {
    const errResponse = (error as any).response as AxiosResponse<{
      message: string;
      code: string;
    }> | null;
    if (errResponse && errResponse.status < 500) {
      throw new RegistrationError(errResponse.data.message);
    }
    throw new RegistrationError();
  }
};
