export const isEqual = (obj1: object, obj2: object) => {
  //? Deep equal, same memory id
  if (obj1 === obj2) {
    return true;
  }

  if (
    typeof obj1 !== "object" ||
    obj1 === null ||
    typeof obj2 !== "object" ||
    obj2 === null
  ) {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length != keys2.length) return false;

  for (const key of keys1) {
    if (
      !keys2.includes(key) ||
      !isEqual((obj1 as any)[key], (obj2 as any)[key])
    ) {
      return false;
    }
  }

  return true;
};

export const nullifyEmptyStrings = <T extends object>(data: T[]): any[] => {
  return data.map((item) => {
    const keys = Object.keys(item) as (keyof T)[];
    const output = keys.reduce((obj, key) => {
      let current: any = item[key];
      if (current === "") {
        current = null;
      }

      return { ...obj, [key]: current };
    }, {} as any);
    return output;
  });
};
