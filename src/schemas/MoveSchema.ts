import * as yup from "yup";
import MoveObtainments from "../data/moveObtainments";

export const MoveSchema = yup.object().shape({
  name: yup.string().required(),
  obtainment: yup.string().oneOf(MoveObtainments).required(),
  level: yup.number().when("obtainment", ([obtainment], schema) => {
    if (obtainment === "level") {
      return schema.required();
    } else {
      return schema.strip();
    }
  }),
});
