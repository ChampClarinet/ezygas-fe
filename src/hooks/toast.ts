"use client";
import { useContext } from "react";
import { NoToastContextError } from "@/errors";
import { ToastContext } from "@/toast.context";

export const useToastContext = () => {
  const context = useContext(ToastContext);

  if (!context) throw new NoToastContextError();

  return context;
};
