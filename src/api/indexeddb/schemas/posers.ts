import { IDBSchema } from "the-promised-indexeddb/types/types";

const poserSchema: IDBSchema = {
  name: "posers",
  fields: {
    1: {
      name: { index: true, unique: true },
      monsterId: { index: true },
    },
  },
};

export default poserSchema;
