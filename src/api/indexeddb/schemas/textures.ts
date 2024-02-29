import { IDBSchema } from "the-promised-indexeddb/types/types";

const textureSchema: IDBSchema = {
  name: "textures",
  fields: {
    1: {
      name: { index: true, unique: true },
      monsterId: { index: true },
    },
  },
};

export default textureSchema;
