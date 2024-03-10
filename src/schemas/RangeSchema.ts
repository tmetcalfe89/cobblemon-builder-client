import * as yup from "yup";

export const RangeSchema = yup.object().shape({
  min: yup.number().required(),
  max: yup.number().required(),
});
