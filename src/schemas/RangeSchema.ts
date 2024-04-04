import * as yup from "yup";

export const RangeSchema = yup.object().shape({
  min: yup.number().optional(),
  max: yup.number().optional(),
}).transform((currVal) => {
  if (typeof currVal === "string") {
    const [min = 1, max = min] = currVal.split("-");
    return { min: +min, max: +max };
  }
  if (typeof currVal === "number") {
    return { min: currVal, max: currVal };
  }
  if (currVal === undefined) {
    return { min: 1, max: 1 };
  }
  return currVal;
});
