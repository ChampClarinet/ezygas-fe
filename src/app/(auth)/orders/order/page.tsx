"use server";
import { FC } from "react";
import { redirect } from "next/navigation";

const OrderPage: FC = () => {
  redirect("/");
};

export default OrderPage;
