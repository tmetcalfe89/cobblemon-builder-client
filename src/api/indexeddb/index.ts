import Database from "the-promised-indexeddb";
import schemas from "./schemas";
import Addon from "../../types/Addon";
import Monster from "../../types/Monster";
import monsterSchema from "./schemas/monsters";
import addonSchema from "./schemas/addons";
import animationSchema from "./schemas/animations";

const db = Database("CobbledBuilder", schemas);

const addonsDb = db.getStore<Addon>(addonSchema.name);
const monstersDb = db.getStore<Monster>(monsterSchema.name);
const animationsDb = db.getStore<Animation>(animationSchema.name);

const createAddon = addonsDb.create;
const getAllAddons = addonsDb.getAll;
const getAddonById = addonsDb.getById;

const createMonster = monstersDb.create;
const getAllMonstersForAddon = (addonId: number) =>
  monstersDb.getByField("addonId", addonId);
const getMonsterById = monstersDb.getById;

const createAnimation = animationsDb.create;

export {
  createAddon,
  getAllAddons,
  getAddonById,
  createMonster,
  getAllMonstersForAddon,
  getMonsterById,
  createAnimation,
};
