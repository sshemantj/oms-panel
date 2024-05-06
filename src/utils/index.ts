const setSplit = (value1: string, value2: string) => {
  const splitby = "%*-)";
  return `${value1}${splitby}${value2}`;
};
const getSplit = (value: string) => {
  const splitby = "%*-)";
  const [value1, value2] = value.split(splitby);
  return {
    value1,
    value2,
  };
};

const checkEmtyObj = (obj: any) => {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      // @ts-ignore
      if (typeof obj[key] === "boolean") {
        continue;
      }
      // @ts-ignore
      if (!obj[key]) {
        return true;
      }
    }
  }
  return false;
};

export { getSplit, setSplit, checkEmtyObj };
