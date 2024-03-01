import * as regex from "@/constants/regex";

export const validateEmail = (email: string, required = true) => {
  if (required && !email.length) return "กรุณากรอกอีเมล";
  if (!regex.EMAIL.test(email) && email != "" && required)
    return "กรุณากรอกอีเมลให้ถูกต้อง";
  return undefined;
};

export const validatePassword = (
  password: string,
  passwordToCompare?: string
) => {
  if (passwordToCompare != null && password !== passwordToCompare)
    return "รหัสผ่านไม่ตรงกัน";
  if (password.length < 6) return "ต้องมีความยาวมากกว่า 6 อักขระ";
  return undefined;
};

export const validateName = (name: string) => {
  if (!name.trim()) {
    return "กรุณากรอกชื่อ นามสกุล";
  } else if (!/^\S+(\s\S+)+$/.test(name)) {
    return "กรุณากรอกชื่อนามสกุลให้ถูกต้อง (ชื่อ เว้นวรรค ตามด้วยนามสกุล)";
  }
  return undefined;
};

export const validatePhone = (phone: string) => {
  const isInvalid = !regex.TEL.test(phone);
  if (isInvalid) return "เบอร์โทรศัพท์ไม่ถูกต้อง (ใช้ตัวเลขเท่านั้น)";

  return undefined;
};

export const validateExist = (value: string | null | number, name: string) => {
  if (value == null) return "กรุณากรอก" + name;
  return undefined;
};
