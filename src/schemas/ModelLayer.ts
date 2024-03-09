import * as yup from "yup";
import ColorSchema from "./Color";
import ModelTextureSupplierSchema from "./ModelTextureSupplier";
import ModelLayer from "../types/ModelLayer";

const ModelLayerSchema: yup.ObjectSchema<ModelLayer> = yup.object().shape({
  name: yup.string().required(),
  enabled: yup.boolean().optional(),
  tint: ColorSchema.optional(),
  texture: yup.lazy(() => ModelTextureSupplierSchema).optional(),
  emissive: yup.boolean().optional(),
  translucent: yup.boolean().optional(),
});

export default ModelLayerSchema;
