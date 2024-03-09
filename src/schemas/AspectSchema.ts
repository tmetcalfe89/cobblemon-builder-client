import * as yup from "yup";
import Aspect from "../types/Aspect";

const AspectSchema: yup.ObjectSchema<Aspect> = yup.object().shape({
  key: yup.string().required(),
  value: yup.string().required(),
});

export default AspectSchema;
