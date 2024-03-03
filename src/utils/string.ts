export const includeIgnoreCase = (subString: string, string: string) =>
  string.toLowerCase().includes(subString.toLowerCase());

export const filterDuplicates = (arr: string[]) => {
  const set = new Set<string>();
  arr.forEach((x) => set.add(x));
  return Array.from(set);
};

export const pad0 = (x: string | number, digits = 1): string => {
  const valueToPad = digits * 10;
  if (!isNaN(+x) && +x < valueToPad) {
    let zeros = "";
    for (let i = 0; i < digits; ++i) zeros += "0";
    return zeros + x;
  }
  return x + "";
};
