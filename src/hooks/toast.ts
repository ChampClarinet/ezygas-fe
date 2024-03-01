"use client";
import { useContext } from "react";
import { ToastContext } from "@/toast.context";

export const useToastContext = () => {
  const context = useContext(ToastContext);

  if (!context) throw new NoToastContextError();

  return context;
};

class NoToastContextError extends Error {
  constructor() {
    super("No ToastContext found");
  }
}
