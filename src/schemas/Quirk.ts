import * as yup from "yup";

const QuirkSchema = yup.object().shape({
  name: yup.string().required(),
  animations: yup.array().of(yup.number().required()).required(),
});

export default QuirkSchema;
