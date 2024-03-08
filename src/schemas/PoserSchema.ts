import * as yup from "yup";
import FeatureSchema from "./FeatureSchema";
import PoserFileSchema from "./PoserFileSchema";

const PoserSchema = FeatureSchema.concat(
  yup.object().shape({
    monsterId: yup.number().required(),
    poser: PoserFileSchema.required(),
    id: yup.number().required(),
  })
);

export default PoserSchema;
