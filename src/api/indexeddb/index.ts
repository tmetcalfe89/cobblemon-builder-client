import Database from "the-promised-indexeddb";
import schemas from "./schemas";
import Addon from "../../types/Addon";

const db = Database("CobbledBuilder", schemas);

const addonsDb = db.getStore<Addon>("addons");

const createAddon = addonsDb.create;
const getAllAddons = addonsDb.getAll;

export { createAddon, getAllAddons };
