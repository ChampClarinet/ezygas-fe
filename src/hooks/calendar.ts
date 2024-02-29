import { addLocale } from "primereact/api";

export const useThaiLocale = () => {
  addLocale("th", {
    firstDayOfWeek: 0,
    dayNames: [
      "อาทิตย์",
      "จันทร์",
      "อังคาร",
      "พุธ",
      "พฤหัสบดี",
      "ศุกร์",
      "เสาร์",
    ],
    dayNamesShort: ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"],
    dayNamesMin: ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"],
    monthNames: [
      "มกราคม",
      "กุมภาพันธ์",
      "มีนาคม",
      "เมษายน",
      "พฤษภาคม",
      "มิถุนายน",
      "กรกฎาคม",
      "สิงหาคม",
      "กันยายน",
      "ตุลาคม",
      "พฤศจิกายน",
      "ธันวาคม",
    ],
    monthNamesShort: [
      "มค",
      "กพ",
      "มีค",
      "เมย",
      "พค",
      "มิย",
      "กค",
      "สค",
      "กย",
      "ตค",
      "พย",
      "ธค",
    ],
    today: "วันนี้",
    clear: "คืนค่า",
    dateFormat: "dd MM yy",
  });
};
