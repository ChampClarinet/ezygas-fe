import { NextRequest, NextResponse } from "next/server";
import { USER_TOKEN_KEY } from "@/config/cookies";

export const middleware = async (req: NextRequest) => {
  console.log("mid");
  const accessToken = req.cookies.get(USER_TOKEN_KEY)?.value;
  if (!accessToken) {
    return NextResponse.redirect("/login");
  }

  NextResponse.json({
    hello: "world",
  });
};
