import * as yup from "yup";
import { SpeciesFileSchema } from "../schemas/SpeciesFile";

type SpeciesFile = yup.InferType<SpeciesFileSchema>;
