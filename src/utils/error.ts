import axios from "axios";
import SweetAlert from "@/utils/sweetalert";

type AlertType = "toast" | "dialog";
export interface ErrorPayload {
  code: string;
  message: string;
  stacktrace?: any;
}
export interface ResolveErrorResponseOptions {
  fallbackErrorLog?: string;
  alertType?: AlertType;
  customMsg?: string;
}
export const resolveErrorResponse = async (
  error: any,
  options?: ResolveErrorResponseOptions
) => {
  const fallbackErrorLog = options?.fallbackErrorLog;
  const alertType = options?.alertType || "dialog";
  const [isOK, data] = await handleErrorResponse(error, alertType);
  if (!isOK) {
    let opt = {};
    if (options?.customMsg) opt = { text: options.customMsg };
    else {
      const text = handleError(error);
      if (text) opt = { text };
    }
    await SweetAlert.showError(opt);
    fallbackErrorLog && console.error(fallbackErrorLog);
  }
  return data;
};

const handleError = (error: Error) => {
  if (error.message) {
    switch (error.message) {
      default:
        return error.message;
    }
  }
};

const handleErrorResponse = async (
  error: any,
  alertType: AlertType
): Promise<[boolean, ErrorPayload | null]> => {
  if (error == null || error.response == null || !axios.isAxiosError(error))
    return [false, null];
  const resData = error.response?.data;
  if (resData == null) return [false, null];
  const { code, message, stacktrace } = resData as ErrorPayload;
  if (!code) return [false, resData];
  console.error(`${message || "error"}: ${stacktrace}`);
  await SweetAlert.showPopupFromErrorCode(code, alertType);
  return [true, resData];
};
