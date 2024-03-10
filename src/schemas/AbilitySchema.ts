import * as yup from "yup";

export const AbilitySchema = yup
  .object()
  .shape({
    name: yup.string().required(),
    hidden: yup.boolean().default(false),
  })
  .transform((input) => {
    if (typeof input === "string") {
      return {
        name: input.split(":").pop()!,
        hidden: input.startsWith("h:"),
      };
    }
    return input;
  });
