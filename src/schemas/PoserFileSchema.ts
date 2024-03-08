import * as yup from "yup";
import PoseSchema from "./PoseSchema";

const PoserFileSchema = yup.object().shape({
  head: yup.string().nullable().optional(),
  portraitScale: yup.number().required(),
  portraitTranslation: yup
    .array()
    .of(yup.number().required())
    .length(3)
    .required()
    .meta({
      direction: "row",
    }),
  profileScale: yup.number().required(),
  profileTranslation: yup
    .array()
    .of(yup.number().required())
    .length(3)
    .required(),
  poses: yup.array().of(PoseSchema.required()).required(),
});

export default PoserFileSchema;
