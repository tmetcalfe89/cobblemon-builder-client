import { IDBSchema } from "the-promised-indexeddb/types/types";

const fileSchema: IDBSchema = {
  name: "files",
  fields: {
    1: {
      path: { index: true },
      branch: { index: true },
    },
  },
};

export default fileSchema;
