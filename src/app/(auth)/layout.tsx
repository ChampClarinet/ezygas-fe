"use server";
import { FC, PropsWithChildren } from "react";
import { cookies } from "next/headers";
import { RedirectType, redirect } from "next/navigation";
import { REFRESH_TOKEN_KEY, USER_TOKEN_KEY } from "@/config/cookies";
import AuthAPI from "@/api/auth";
import MasterAPI, { MenuResponse } from "@/api/master";
import UserAPI from "@/api/user";
import VendorsAPI, { Vendor } from "@/api/vendors";
import MainLayout from "@/components/globals/mainlayout";
import { TokenExpiresError, UnauthorizedError } from "@/errors";
import { User } from "@/types/user";

const isProduction = process.env.NODE_ENV === "production";
const unauthPlaceholder = (msg?: string) => (
  <h1>error not authorized {isProduction ? msg : ""}</h1>
);

export interface WithServerData {
  myVendor: Vendor;
  user: User;
  menus: MenuResponse;
}

interface AuthedPageLayoutProps extends PropsWithChildren {}
const AuthedPageLayout: FC<AuthedPageLayoutProps> = async ({ children }) => {
  const cookie = cookies();
  let accessToken = cookie.get(USER_TOKEN_KEY)?.value;
  if (!accessToken) return unauthPlaceholder("access");
  try {
    //? Verify and refresh
    try {
      await AuthAPI.verifyTokenAPIServerside(accessToken);
    } catch (error) {
      if (error instanceof TokenExpiresError) {
        const refreshToken = cookie.get(REFRESH_TOKEN_KEY)?.value;
        if (!refreshToken) throw new TokenExpiresError();
        const { access: newToken } = await AuthAPI.refreshTokenAPIServerside(
          refreshToken
        );
        cookie.set(USER_TOKEN_KEY, newToken);
        accessToken = newToken;
      } else throw error;
    }

    const [vendor, user, menus] = await Promise.all([
      VendorsAPI.fetchMyVendorServerside(accessToken),
      UserAPI.fetchMyAccountServerside(accessToken),
      MasterAPI.fetchMenuServerside(accessToken),
    ]);
    console.log({ vendor, user, menus });
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
      redirect("/login", RedirectType.replace);
    }
    throw error;
  }
};

export default AuthedPageLayout;
