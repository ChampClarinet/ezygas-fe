"use client";
import { createContext, useCallback, useRef } from "react";
import { Toast, ToastMessage } from "primereact/toast";

export interface ToastContextType {
  showToast: (message: ToastMessage) => void;
}

export const ToastContext = createContext<ToastContextType>({
  showToast: () => {},
});

export const ToastContextProvider = ({ children }: any) => {
  const toastRef = useRef<Toast>(null);

  const showToast = useCallback((message: ToastMessage) => {
    if (!message.icon) {
      switch (message.severity) {
        case "success":
          message.icon = "pi pi-check-circle";
          break;
        case "warn":
          message.icon = "pi pi-exclamation-circle";
          break;
        case "error":
          message.icon = "pi pi-times-circle";
          break;
        case "info":
          message.icon = "pi pi-info-circle";
          break;
        default:
          break;
      }
    }
    toastRef.current?.show(message);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      <Toast ref={toastRef} />
      {children}
    </ToastContext.Provider>
  );
};
