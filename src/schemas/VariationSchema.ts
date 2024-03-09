import * as yup from "yup";
import AspectSchema from "./AspectSchema";
import ModelLayerSchema from "./ModelLayer";
import { Variation } from "../types/ResolverFile";

const VariationSchema: yup.ObjectSchema<Variation> = yup.object().shape({
  aspects: yup.array().of(AspectSchema).required(),
  poser: yup.number().optional(),
  model: yup.number().optional(),
  texture: yup.number().optional(),
  layers: yup
    .array()
    .of(yup.lazy(() => ModelLayerSchema))
    .optional(),
});

export default VariationSchema;
