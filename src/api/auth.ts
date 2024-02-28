import axios from "./axios";
import { RegisterDTO } from "@/types/user";
import { RegisterResponse } from "@/types/auth";

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
   * For real usage, use login from AuthUtils to make it complete flow
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
   * For real usage, use logout from AuthUtils to make it complete flow
   * @returns boolean indicating success of logout API request
   */
  logoutAPI: async (refreshToken: string): Promise<boolean> => {
    const response = await axios.post<unknown>("/auth/logout/", {
      refresh: refreshToken,
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
