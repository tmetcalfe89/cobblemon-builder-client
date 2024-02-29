import { IDBSchema } from "the-promised-indexeddb/types/types";

const animationSchema: IDBSchema = {
  name: "animations",
  fields: {
    1: {
      name: { index: true, unique: true },
      monsterId: { index: true },
    },
  },
};

export default animationSchema;
