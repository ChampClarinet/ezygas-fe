"use client";
import Global from "@/components/globals";
import { FC } from "react";

const LoginPage: FC = (props) => {
  console.log({ props });
  return (
    <Global>
      <h1 className="text-red-700">Login page</h1>
    </Global>
  );
};

export default LoginPage;
