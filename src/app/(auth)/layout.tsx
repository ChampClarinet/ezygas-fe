"use server";
import { FC, PropsWithChildren } from "react";
import { cookies } from "next/headers";
import { RedirectType, redirect } from "next/navigation";
import { REFRESH_TOKEN_KEY, USER_TOKEN_KEY } from "@/config/cookies";
import AuthAPI from "@/api/auth";
import MasterAPI, { MenuResponse } from "@/api/master";
import UserAPI from "@/api/user";
import VendorsAPI, { Vendor } from "@/api/vendors";
import { setAccessToken } from "@/app/actions";
import MainLayout from "@/components/globals/mainlayout";
import { TokenExpiresError, UnauthorizedError } from "@/errors";
import { User } from "@/types/user";
import { logout } from "@/utils/auth";

const isProduction = process.env.NODE_ENV === "production";

export interface WithServerData {
  myVendor: Vendor;
  user: User;
  menus: MenuResponse;
}

interface AuthedPageLayoutProps extends PropsWithChildren {}
const AuthedPageLayout: FC<AuthedPageLayoutProps> = async ({ children }) => {
  const cookie = cookies();
  try {
    let accessToken = cookie.get(USER_TOKEN_KEY)?.value;
    if (!accessToken) {
      throw new UnauthorizedError({
        message: "no access token",
      });
    }
    //? Verify and refresh
    try {
      await AuthAPI.verifyTokenAPIServerside(accessToken);
    } catch (error) {
      if (error instanceof TokenExpiresError) {
        try {
          const refreshToken = cookie.get(REFRESH_TOKEN_KEY)?.value;
          if (!refreshToken) throw new TokenExpiresError();
          const { access: newToken } = await AuthAPI.refreshTokenAPIServerside(
            refreshToken
          );
          setAccessToken(newToken);
          accessToken = newToken;
        } catch (error) {
          if (error instanceof TokenExpiresError) {
            logout();
            redirect("/login");
          }
        }
      } else throw error;
    }

    const [vendor, user, menus] = await Promise.all([
      VendorsAPI.fetchMyVendorServerside(accessToken),
      UserAPI.fetchMyAccountServerside(accessToken),
      MasterAPI.fetchMenuServerside(accessToken),
    ]);
    return (
      <MainLayout myVendor={vendor} user={user} menus={menus}>
        {children}
      </MainLayout>
    );
  } catch (error) {
    if (
      error instanceof UnauthorizedError ||
      error instanceof TokenExpiresError
    ) {
      if (!isProduction) console.warn("unauthorized: " + error);
      redirect("/login", RedirectType.replace);
    }
    throw error;
  }
};

export default AuthedPageLayout;
