"use client";
import CustomersList from "@/modules/customers-list";
import { FC } from "react";

const HomePage: FC = (props) => {
  return <CustomersList mode="ORDER" />;
};

export default HomePage;
