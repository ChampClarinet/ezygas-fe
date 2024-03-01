"use client";
import { createContext, useCallback, useRef } from "react";
import { Toast, ToastMessage } from "primereact/toast";

export interface ToastContextType {
  showToast: (message: ToastMessage | ToastMessage[]) => void;
}

export const ToastContext = createContext<ToastContextType>({
  showToast: (msg) => {},
});

export const ToastContextProvider = ({ children }: any) => {
  const toastRef = useRef<Toast>(null);

  const showToast = useCallback((message: ToastMessage | ToastMessage[]) => {
    toastRef.current?.show(message);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      <Toast ref={toastRef} />
      {children}
    </ToastContext.Provider>
  );
};
