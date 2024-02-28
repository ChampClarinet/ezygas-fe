import { REFRESH_TOKEN_KEY, USER_TOKEN_KEY } from "@/config/cookies";
import { IncomingMessage, ServerResponse } from "http";
import AuthAPI from "@/api/auth";
import Cookies from "./cookies";

class TokenUtils {
  getUserToken(
    req?: IncomingMessage,
    res?: ServerResponse
  ): string | null | undefined {
    const key = USER_TOKEN_KEY;
    if (req && res) return Cookies.getServer(key, req, res);
    return Cookies.getClient(key);
  }

  getRefreshToken(req?: IncomingMessage, res?: ServerResponse) {
    const key = REFRESH_TOKEN_KEY;
    if (req && res) return Cookies.getServer(key, req, res);
    return Cookies.getClient(key);
  }

  /**
   * @returns token if still not expired, null if expired
   */
  async isTokenExpired(
    req?: IncomingMessage,
    res?: ServerResponse
  ): Promise<string | null> {
    let tokenString = this.getUserToken(req, res);
    if (tokenString) {
      try {
        await AuthAPI.verifyTokenAPI(tokenString);
        return tokenString;
      } catch (e) {
        return null;
      }
    }
    return null;
  }

  setUserToken(
    token: string,
    expireOn?: number,
    req?: IncomingMessage,
    res?: ServerResponse
  ) {
    const key = USER_TOKEN_KEY;
    if (req && res) Cookies.setServer(key, token, req, res);
    else Cookies.setClient(key, token);
  }

  setRefreshToken(
    token: string,
    expireOn?: number,
    req?: IncomingMessage,
    res?: ServerResponse
  ) {
    const key = REFRESH_TOKEN_KEY;
    if (!expireOn) expireOn = 6.048e8;
    if (req && res) Cookies.setServer(key, token, req, res);
    else Cookies.setClient(key, token);
  }

  removeUserToken(req?: IncomingMessage, res?: ServerResponse) {
    const key = USER_TOKEN_KEY;
    if (req && res) return Cookies.removeServer(key, req, res);
    return Cookies.removeClient(key);
  }

  removeRefreshToken(req?: IncomingMessage, res?: ServerResponse) {
    const key = REFRESH_TOKEN_KEY;
    if (req && res) return Cookies.removeServer(key, req, res);
    return Cookies.removeClient(key);
  }
}

const Token = new TokenUtils();

export default Token;
