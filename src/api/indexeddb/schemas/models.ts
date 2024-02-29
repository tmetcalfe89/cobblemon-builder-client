import { IDBSchema } from "the-promised-indexeddb/types/types";

const modelSchema: IDBSchema = {
  name: "models",
  fields: {
    1: {
      name: { index: true, unique: true },
      monsterId: { index: true },
    },
  },
};

export default modelSchema;
