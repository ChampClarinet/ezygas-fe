import { AxiosResponse } from "axios";
import { IncomingMessage, ServerResponse } from "http";
import AuthAPI from "@/api/auth";
import { RegisterDTO } from "@/types/auth";
import Token from "./token";

class Auth {
  loginCheckServerSide = async (
    req: IncomingMessage,
    res: ServerResponse
  ): Promise<[boolean, string | null]> => {
    const currentToken = await Token.isTokenExpired(req, res);
    if (currentToken) return [true, currentToken];

    try {
      const refresh = Token.getRefreshToken();
      const { access: newToken } = await AuthAPI.refreshTokenAPI(refresh);
      Token.setUserToken(newToken, undefined, req, res);
      return [true, newToken];
    } catch (error) {
      if (
        (error as { response: AxiosResponse })?.response?.data?.code ===
        "token_not_valid"
      ) {
        //? Refresh token also expired
        console.error("error refresh", (error as any).response);
      } else console.error("unknown refresh token error", error);
    }
    Token.removeRefreshToken(req, res);
    Token.removeUserToken(req, res);
    return [false, null];
  };

  login = async (username: string, password: string) => {
    try {
      const { refresh, access } = await AuthAPI.loginAPI(username, password);
      Token.setRefreshToken(refresh);
      Token.setUserToken(access);
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

  logout = async () => {
    const refreshToken = Token.getRefreshToken();
    const isOk = await AuthAPI.logoutAPI(refreshToken);
    if (!isOk) throw new Error(`Something's wrong with logout api`);
    Token.removeRefreshToken();
    Token.removeUserToken();
    return true;
  };

  register = async (
    payload: RegisterDTO
  ): Promise<
    | {
        result: RegisterDTO;
        code: string;
      }
    | "EMAIL_CONFLICT"
    | "INVALID_TEL"
    | "ERROR"
  > => {
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
        return errResponse.data.code as "INVALID_TEL" | "EMAIL_CONFLICT";
      }
    }
    return "ERROR";
  };

  doRefreshToken = async () => {
    try {
      const refreshToken = Token.getRefreshToken();
      const response = await AuthAPI.refreshTokenAPI(refreshToken);
      const { access } = response;
      Token.setUserToken(access);
      return true;
    } catch (error) {
      return false;
    }
  };
}
const AuthUtils = new Auth();
export default AuthUtils;
