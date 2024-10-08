import { IDBSchema } from "the-promised-indexeddb/types/types";

const monsterSchema: IDBSchema = {
  name: "monsters",
  fields: {
    1: {
      name: { index: true, unique: true },
      addonId: { index: true },
    },
  },
};

export default monsterSchema;
