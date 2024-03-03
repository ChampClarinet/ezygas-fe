"use server";
import { cookies } from "next/headers";
import { REFRESH_TOKEN_KEY, USER_TOKEN_KEY } from "@/config/cookies";

export const setAccessToken = async (token: string) => {
  cookies().set(USER_TOKEN_KEY, token, {
    path: "/",
  });
};

export const setRefreshToken = async (token: string) => {
  cookies().set(REFRESH_TOKEN_KEY, token, {
    path: "/",
  });
};
