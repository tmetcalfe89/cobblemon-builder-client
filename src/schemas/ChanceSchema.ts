import * as yup from "yup";

export const ChanceSchema = yup.object().shape({
  x: yup.number().required(),
  y: yup.number().required(),
});
