"use server";
import { FC } from "react";
import { RedirectType, redirect } from "next/navigation";

const NotFoundPage: FC = () => {
  redirect("/", RedirectType.replace);
};

export default NotFoundPage;
