import { Stock } from "@/api/stock";
import { TANK_TYPE_PRECISION, TANK_TYPE_INT } from "@/constants/regex";

export const filterStocksBySearch = (stock: Stock, search: string) => {
  const { type_text, brand_text, brand_code, type_code } = stock;
  const skuName = `${brand_text} ${type_text}`;
  return (
    skuName.includes(search) ||
    brand_code.includes(search) ||
    (type_code + "").includes(search)
  );
};

/**
 * Ex: picnic --> 4
 * Ex: 13.5 kg --> 13
 * Ex: 15 kg --> 15
 */
export const tankTypeToTypeCode = (type: string) => {
  const typeLowerCase = type.toLowerCase();
  if (typeLowerCase === "picnic") return "4";
  if (TANK_TYPE_PRECISION.test(typeLowerCase))
    return typeLowerCase.split(".")[0];
  if (TANK_TYPE_INT.test(typeLowerCase)) return typeLowerCase.split(" ")[0];
  throw Error(`Invalid tank type: ${type}`);
};

export const findByBrandAndTypeCode = (
  brand: string,
  typeCode: string,
  list: Stock[]
) => {
  const result = list.find(({ cylinder_brand, cylinder_type }) => {
    const stockBrand = cylinder_brand.toLowerCase();
    const stockTypeCode = tankTypeToTypeCode(cylinder_type);
    return brand == stockBrand && typeCode == stockTypeCode;
  });
  return result || null;
};
