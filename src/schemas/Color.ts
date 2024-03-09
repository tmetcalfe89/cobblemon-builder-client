import * as yup from "yup";

const ColorSchema = yup.object().shape({
  r: yup.number().required(),
  g: yup.number().required(),
  b: yup.number().required(),
  a: yup.number().required(),
});

export default ColorSchema;
