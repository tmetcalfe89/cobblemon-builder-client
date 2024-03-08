import * as yup from "yup";
import { getEnumValues } from "../util/tsUtil";
import { PoseType } from "../data/poseType";
import QuirkSchema from "./Quirk";

const PoseSchema = yup.object().shape({
  poseName: yup.string().required(),
  transformTicks: yup.number().required(),
  poseTypes: yup
    .array()
    .of(yup.string().oneOf(getEnumValues(PoseType)))
    .required(),
  animations: yup.array().of(yup.number().required()).required(),
  isBattle: yup.bool().optional(),
  quirks: yup.array().of(QuirkSchema).optional(),
});

export default PoseSchema;
