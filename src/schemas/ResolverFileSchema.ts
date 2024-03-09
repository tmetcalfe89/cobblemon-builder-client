import * as yup from "yup";
import VariationSchema from "./VariationSchema";
import ResolverFile from "../types/ResolverFile";

const ResolverFileSchema: yup.ObjectSchema<ResolverFile> = yup.object().shape({
  variations: yup.array().of(VariationSchema.required()).required(),
});

export default ResolverFileSchema;
