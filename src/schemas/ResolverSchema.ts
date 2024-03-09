import * as yup from "yup";
import FeatureSchema from "./FeatureSchema";
import ResolverFileSchema from "./ResolverFileSchema";

const ResolverSchema = FeatureSchema.concat(
  yup.object().shape({
    monsterId: yup.number().required(),
    resolver: ResolverFileSchema.required(),
    id: yup.number().required(),
  })
);

export default ResolverSchema;
