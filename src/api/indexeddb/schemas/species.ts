import { IDBSchema } from "the-promised-indexeddb/types/types";

const specieSchema: IDBSchema = {
  name: "species",
  fields: {
    1: {
      name: { index: true, unique: true },
      monsterId: { index: true },
    },
  },
};

export default specieSchema;
