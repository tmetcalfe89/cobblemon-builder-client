import * as yup from "yup";

const FeatureSchema = yup.object().shape({
  id: yup.number().optional(),
  name: yup.string().required(),
});

export default FeatureSchema;
