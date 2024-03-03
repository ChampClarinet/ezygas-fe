import * as regex from "@/constants/regex";

export const isNaturalNumber = (number: string | number) =>
  !isNaN(+number) && +number > 0;

export const sanitizeNegativeNumber = (
  number: string | number,
  changeNegativeValueTo = "0"
) => {
  if (isNaN(+number) || +number < 0 || !regex.NUMERIC.test(number + ""))
    return changeNegativeValueTo;
  return `${number}`;
};

export const minifiedLargeNumber = (number: number) => {
  if (number < 1e3) return number;
  else if (number < 1e6) return `${number / 1e3}k`;
  else if (number < 1e9) return `${number / 1e6}M`;
  else return `${number / 1e9}B`;
};

export const toDisplayNumber = (
  num: string | number,
  options?: Intl.NumberFormatOptions
) => {
  if (isNaN(+num)) return num;
  const number = +num;
  return number.toLocaleString("en-US", options);
};

export const fractionNumberWithComma = (num: number) => {
  let n = num;
  if (typeof num != "number") n = +num;
  if (isNaN(n)) throw Error("fractionNumberWithComma: NaN received: " + num);
  const str = n.toFixed(2);
  return str.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const hasFraction = (n: number | string) => {
  if (isNaN(+n)) return false;
  const floored = Math.floor(+n);
  return floored != +n;
};

export const sum = (list: number[]) =>
  list.reduce((sum, curr) => curr + sum, 0);

export const sumField = <T = object>(list: T[], fieldName: keyof T) =>
  sum(list.map((l: any) => l[fieldName]));
