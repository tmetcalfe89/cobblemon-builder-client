import Database from "the-promised-indexeddb";
import schemas from "./schemas";
import Addon from "../../types/Addon";
import Monster from "../../types/Monster";
import monsterSchema from "./schemas/monsters";
import addonSchema from "./schemas/addons";

const db = Database("CobbledBuilder", schemas);

const addonsDb = db.getStore<Addon>(addonSchema.name);
const monstersDb = db.getStore<Monster>(monsterSchema.name);

const createAddon = addonsDb.create;
const getAllAddons = addonsDb.getAll;
const getAddonById = addonsDb.getById;

const createMonster = monstersDb.create;
const getAllMonstersForAddon = (addonId: number) =>
  monstersDb.getByField("addonId", addonId);

export {
  createAddon,
  getAllAddons,
  getAddonById,
  createMonster,
  getAllMonstersForAddon,
};
