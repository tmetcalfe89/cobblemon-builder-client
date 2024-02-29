import { IDBSchema } from "the-promised-indexeddb/types/types";

const spawnSchema: IDBSchema = {
  name: "spawns",
  fields: {
    1: {
      name: { index: true, unique: true },
      monsterId: { index: true },
    },
  },
};

export default spawnSchema;
