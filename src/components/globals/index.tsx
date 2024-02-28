"use client";
import { FC, PropsWithChildren, Suspense, useEffect } from "react";
import { PrimeReactProvider } from "primereact/api";
import { GlobalStyle } from "@/styles/global";
import pt from "@/styles/passthrough";

const Global: FC<PropsWithChildren> = ({ children }) => {
  console.log("global runs");
  useEffect(() => {}, []);
  return (
    <Suspense fallback={null}>
      <PrimeReactProvider value={{ pt }}>
        <GlobalStyle />
        {children}
      </PrimeReactProvider>
    </Suspense>
  );
};

export default Global;
