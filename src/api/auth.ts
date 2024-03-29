import axios from "./axios";
import { TokenExpiresError } from "@/errors";
import { RegisterDTO } from "@/types/user";
import { RegisterResponse } from "@/types/auth";

const BASE_URL_API = (process.env.NEXT_PUBLIC_URL_API || "") + "/api";

export interface LoginResponse {
  access: string;
  refresh: string;
  groups: string[];
  username: string;
}

export interface AuthFailedResponse {
  detail: "LOGIN_BAD_CREDENTIALS" | "Unauthorized";
}

const AuthAPI = {
  /**
   * Login API
   * @param username username for login
   * @param password password for login
   * @returns response data of access token and refresh token in LoginResponse format
   */
  loginAPI: async (
    username: string,
    password: string
  ): Promise<LoginResponse> => {
    const response = await axios.post<LoginResponse>("/auth/get_token/", {
      username,
      password,
    });
    return response.data;
  },

  /**
   * Logout API
   * @returns boolean indicating success of logout API request
   */
  logoutAPI: async (refreshToken: string): Promise<boolean> => {
    const response = await axios.post<unknown>("/auth/logout/", {
      refresh: refreshToken,
    });
    return response.status === 204;
  },

  logoutAPIServerside: async (refreshToken: string): Promise<boolean> => {
    const response = await fetch(BASE_URL_API + "/auth/logout/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: refreshToken }),
      cache: "no-store",
    });
    return response.status === 204;
  },

  /**
   * Verify Token API
   *
   * @param token token to verify
   * @returns response data from server on token verification
   */
  verifyTokenAPI: async (token: string): Promise<unknown> => {
    const headers = {
      authorization: `Bearer ${token}`,
    };
    const response = await axios.post("/auth/verify/", null, { headers });
    return response.data;
  },

  verifyTokenAPIServerside: async (token: string): Promise<unknown> => {
    const headers = {
      authorization: `Bearer ${token}`,
    };
    const response = await fetch(BASE_URL_API + "/auth/verify/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      cache: "no-store",
    });
    if (response.status != 200) {
      throw new TokenExpiresError();
    }
    return await response.json();
  },

  /**
   * Refreshes the token.
   *
   * @returns The refreshed token if successful.
   */
  refreshTokenAPI: async (
    refreshToken: string
  ): Promise<{ access: string }> => {
    const response = await axios.post<{ access: string }>(
      "/auth/refresh_token/",
      { refresh: refreshToken }
    );
    return response.data;
  },
  refreshTokenAPIServerside: async (
    refreshToken: string
  ): Promise<{ access: string }> => {
    const response = await fetch(BASE_URL_API + "/auth/refresh_token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: refreshToken }),
      cache: "no-store",
    });
    if ([401, 403].includes(response.status)) throw new TokenExpiresError();
    return await response.json();
  },

  /**
   * Register API
   *
   * @param payload register data to be sent to server
   * @returns response data from server on registration, in User or ErrorResponse format
   */
  registerAPI: async (payload: RegisterDTO) => {
    const response = await axios.post<RegisterResponse>(
      "/auth/register/",
      payload
    );
    return response.data;
  },
};

export default AuthAPI;
