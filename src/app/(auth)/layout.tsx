"use server";
import { FC, PropsWithChildren } from "react";
import { cookies } from "next/headers";
import { USER_TOKEN_KEY } from "@/config/cookies";
import MasterAPI, { MenuResponse } from "@/api/master";
import UserAPI from "@/api/user";
import VendorsAPI, { Vendor } from "@/api/vendors";
import MainLayout from "@/components/globals/mainlayout";
import { UnauthorizedError } from "@/errors";
import { User } from "@/types/user";

const unauthPlaceholder = (msg?: string) => <h1>error not authorized {msg}</h1>;

export interface WithServerData {
  myVendor: Vendor;
  user: User;
  menus: MenuResponse;
}

interface AuthedPageLayoutProps extends PropsWithChildren {}
const AuthedPageLayout: FC<AuthedPageLayoutProps> = async ({ children }) => {
  const cookie = cookies();
  const accessToken = cookie.get(USER_TOKEN_KEY)?.value;
  if (!accessToken) return unauthPlaceholder("access");
  try {
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
    if (error instanceof UnauthorizedError)
      return unauthPlaceholder(error.message);
    throw error;
  }
};

export default AuthedPageLayout;
