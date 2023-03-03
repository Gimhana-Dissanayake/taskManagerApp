export const isStringEmpty = (str: string) => {
  return str;
};

export const isDate = (d: any) => {
  //   return d instanceof Date && !isNaN(d);
  return !!d;
};

export const toTitleCase = (str: string) => {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};
