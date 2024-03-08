export const getEnumValues = (enumType: object) =>
  Object.values(enumType).filter((e) => typeof e === "string");
