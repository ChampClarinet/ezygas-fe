"use client";
import { FC } from "react";
import Global from "@/components/globals";

const HomePage: FC = (props) => {
  console.log({ props });
  return <h1 className="text-current">Home page</h1>;
};

export default HomePage;
