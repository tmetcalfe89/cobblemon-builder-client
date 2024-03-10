import * as yup from "yup";

export const StatsSchema = yup.object().shape({
  hp: yup.number().default(0).required(),
  attack: yup.number().default(0).required(),
  defence: yup.number().default(0).required(),
  special_attack: yup.number().default(0).required(),
  special_defence: yup.number().default(0).required(),
  speed: yup.number().default(0).required(),
});
