import * as yup from "yup";
import { VaryingModelTextureSupplier } from "../types/ResolverFile";

const ModelTextureSupplierSchema: yup.Lazy<
  string | VaryingModelTextureSupplier
> = yup.lazy((value) =>
  typeof value === "string"
    ? yup.string().required()
    : yup
        .object()
        .shape({
          frames: yup.array().of(yup.number().required()).optional(),
          fps: yup.number().optional(),
          loop: yup.boolean().optional(),
        })
        .required()
);

export default ModelTextureSupplierSchema;
