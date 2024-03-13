import Database from "the-promised-indexeddb";

import schemas from "./schemas";
import fileSchema from "./schemas/file";

const db = Database("gitlab", schemas);

export interface File {
  path: string;
  branch: string;
  contents?: string;
}

export const filesDb = db.getStore<File>(fileSchema.name);
