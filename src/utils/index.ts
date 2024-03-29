import { Customer } from "@/api/customer";
import { Address } from "@/api/vendors";

export const addressToDisplayAddress = ({
  subdistrict,
  district,
  province,
  zipcode,
  isInBangkok,
}: Address) =>
  isInBangkok
    ? `แขวง${subdistrict} เขต${district} ${province} ${zipcode}`
    : `ตำบล${subdistrict} อำเภอ${district} ${province} ${zipcode}`;

export const isAnonymous = (customer: Customer) =>
  customer.customer_code.includes("ANNO");

export const uniq = <T>(arr: T[]) => {
  return arr.reduce((arr, item) => {
    const isExists = arr.find(
      (i) => JSON.stringify(i) === JSON.stringify(item)
    );
    if (isExists) return arr;
    return [...arr, item];
  }, [] as T[]);
};
