import { IDBSchema } from "the-promised-indexeddb/types/types";

const addonSchema: IDBSchema = {
  name: "addons",
  fields: {
    1: {
      name: { index: true, unique: true },
    },
  },
};

export default addonSchema;
