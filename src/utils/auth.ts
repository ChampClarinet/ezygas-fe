import { AxiosResponse } from "axios";
import { getCookie, setCookie } from "cookies-next";
import AuthAPI from "@/api/auth";
import { REFRESH_TOKEN_KEY, USER_TOKEN_KEY } from "@/config/cookies";

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
  if (!isOk) throw new Error(`Something's wrong with logout api`);
  return true;
};
