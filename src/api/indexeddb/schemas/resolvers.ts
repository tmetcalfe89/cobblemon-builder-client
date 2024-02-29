import { IDBSchema } from "the-promised-indexeddb/types/types";

const resolverSchema: IDBSchema = {
  name: "resolvers",
  fields: {
    1: {
      name: { index: true, unique: true },
      monsterId: { index: true },
    },
  },
};

export default resolverSchema;
