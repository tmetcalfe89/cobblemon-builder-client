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
}).transform((currVal) => {
  if (typeof currVal === "string") {
    const [method, move] = currVal.split(":");
    const retval = {
      name: move,
      obtainment: isNaN(+method) ? method : "level",
      level: isNaN(+method) ? undefined : +method
    };
    return retval;
  }
  return currVal;
});
