import Sw, { SweetAlertOptions, SweetAlertResult } from "sweetalert2";
import errorMessages from "@/constants/error.json";

const defaultOptions: SweetAlertOptions = {
  customClass: {
    loader: "swal-loader",
    popup: "swal-popup",
    confirmButton: "swal-confirm",
    closeButton: "swal-close-button",
  },
};

/**
 * Use this function to show popup
 */
const showPopup = (overrideOptions?: SweetAlertOptions) => {
  return Sw.fire({
    titleText: "ยืนยันที่จะทำรายการต่อ?",
    showCancelButton: true,
    confirmButtonText: "ยืนยัน",
    cancelButtonText: "ยกเลิก",
    ...overrideOptions,
  });
};

/**
 * Use this function to close any sweetalert modals
 */
const close = () => Sw.close();

/**
 * Use this function to show loading modal
 * @returns
 */
const showLoading = (overrideOptions?: SweetAlertOptions) => {
  return Sw.fire({
    titleText: "กำลังโหลด",
    html: "กรุณารอสักครู่...",
    allowOutsideClick: false,
    allowEscapeKey: false,
    didOpen: () => {
      Sw.showLoading(null);
    },
    ...overrideOptions,
  });
};

const showConfirm = (option?: SweetAlertOptions) => {
  return Sw.fire({
    titleText: "ยืนยันที่จะทำรายการต่อ?",
    showCancelButton: true,
    confirmButtonText: "ยืนยัน",
    cancelButtonText: "ยกเลิก",
    ...option,
  });
};

/**
 * Use this for fire error messages
 * @export
 * @param {string} [code] error code, should be defined in @/constants/error.ts if not, this code will be message to show
 * @returns {Promise<SweetAlertResult>}
 */
const showError = async (
  option?: SweetAlertOptions
): Promise<SweetAlertResult> => {
  return await Sw.fire({
    ...defaultOptions,
    titleText: `เกิดข้อผิดพลาด`,
    allowOutsideClick: false,
    text: "กรุณารีเฟรชหน้าใหม่ หรือติดต่อผู้ดูแลระบบ",
    confirmButtonText: "ปิด",
    icon: "error",
    ...(option as any),
  });
};

const showPopupFromErrorCode = (
  code: string,
  alertType: "dialog" | "toast" = "dialog"
) => {
  const prefix = code.charAt(0);
  const foundInMessages = Object.keys(errorMessages).find((k) => k === code);
  let text = code;
  if (foundInMessages) {
    text = (errorMessages as any)[code];
  }
  return showError({
    icon: prefix === "W" ? "warning" : "error",
    text,
  });
  // if (alertType === "dialog")
  //   return showError({
  //     icon: prefix === "W" ? "warning" : "error",
  //     text,
  //   });
  // if (prefix === "W") return toastWarn(text);
  // return toastError(text);
};

const SweetAlert = {
  showPopup,
  close,
  showLoading,
  showConfirm,
  showPopupFromErrorCode,
  showError,
  defaultOptions,
};

export default SweetAlert;
