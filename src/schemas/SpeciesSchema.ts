import FeatureSchema from "./FeatureSchema";
import { SpeciesFileSchema } from "./SpeciesFile";
import * as yup from "yup";

const SpeciesSchema = FeatureSchema.concat(
  yup.object().shape({
    monsterId: yup.number().required(),
    species: SpeciesFileSchema.required(),
    id: yup.number().required(),
  })
);

export default SpeciesSchema;
