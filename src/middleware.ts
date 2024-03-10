import { NextRequest, NextResponse } from "next/server";
import { REFRESH_TOKEN_KEY, USER_TOKEN_KEY } from "@/config/cookies";
import {
  doRefreshTokenServerside,
  checkTokenIsExpiresServerside,
} from "@/utils/auth";
import AuthAPI from "./api/auth";
import { TokenExpiresError } from "./errors";

const publicRoutes = ["/login", "/register", "/pending"];

const middleware = async (req: NextRequest) => {
  const currentUrl = req.nextUrl.clone().pathname;
  if (currentUrl.startsWith("/assets")) return NextResponse.next();

  if (publicRoutes.includes(currentUrl))
    return await publicPagesMiddleware(req);
  return await authenticatedPagesMiddleware(req);
};

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

export default middleware;

const publicPagesMiddleware = async (req: NextRequest) => {
  const { code, newAccessToken } = await handleAuthorizationCheck(req);
  if (code == "FAIL") return NextResponse.next();

  const response = getRedirectUrl(req, "/");

  if (code == "REFRESHED" && newAccessToken != null) {
    response.cookies.set({
      name: USER_TOKEN_KEY,
      value: newAccessToken,
      path: "/",
    });
  }
  return response;
};

const authenticatedPagesMiddleware = async (req: NextRequest) => {
  const { code, newAccessToken } = await handleAuthorizationCheck(req);
  if (code == "FAIL") {
    const refreshToken = req.cookies.get(REFRESH_TOKEN_KEY)?.value;
    if (refreshToken) await AuthAPI.logoutAPIServerside(refreshToken);
    const response = getRedirectUrl(req, "/login");
    response.cookies.delete(USER_TOKEN_KEY);
    response.cookies.delete(REFRESH_TOKEN_KEY);
    return response;
  }
  const response = NextResponse.next();
  if (code == "REFRESHED" && newAccessToken) {
    response.cookies.set({
      name: USER_TOKEN_KEY,
      value: newAccessToken,
      path: "/",
    });
  }
  return response;
};

interface AuthCheckResult {
  code: "REFRESHED" | "PASS" | "FAIL";
  oldAccessToken: string | null;
  newAccessToken: string | null;
}
const handleAuthorizationCheck = async (
  req: NextRequest
): Promise<AuthCheckResult> => {
  const accessToken = req.cookies.get(USER_TOKEN_KEY)?.value;
  if (!accessToken) {
    return {
      code: "FAIL",
      oldAccessToken: null,
      newAccessToken: null,
    };
  }

  const isTokenExpired = await checkTokenIsExpiresServerside(accessToken);
  if (!isTokenExpired) {
    return {
      code: "PASS",
      oldAccessToken: accessToken,
      newAccessToken: null,
    };
  }

  const refreshToken = req.cookies.get(REFRESH_TOKEN_KEY)?.value;

  const newAccessToken = refreshToken
    ? await doRefreshTokenServerside(refreshToken).catch(
        (e) => e instanceof TokenExpiresError && null
      )
    : null;
  if (!newAccessToken) {
    return {
      code: "FAIL",
      oldAccessToken: null,
      newAccessToken: null,
    };
  }

  return {
    code: "REFRESHED",
    oldAccessToken: accessToken,
    newAccessToken,
  };
};

const getRedirectUrl = (req: NextRequest, redirectionUrl: string) => {
  const url = req.nextUrl.clone();
  url.pathname = redirectionUrl;

  return NextResponse.redirect(url);
};
