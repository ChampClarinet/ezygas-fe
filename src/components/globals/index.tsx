"use client";
import { FC, PropsWithChildren, Suspense } from "react";
import { PrimeReactProvider } from "primereact/api";
import { GlobalStyle } from "@/styles/global";
import pt from "@/styles/passthrough";
import { ToastContextProvider } from "@/toast.context";

const Global: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Suspense fallback={null}>
      <PrimeReactProvider value={{ pt }}>
        <ToastContextProvider>
          <GlobalStyle />
          {children}
        </ToastContextProvider>
      </PrimeReactProvider>
    </Suspense>
  );
};

export default Global;
