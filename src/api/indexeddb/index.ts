import Database from "the-promised-indexeddb";
import schemas from "./schemas";
import Addon from "../../types/Addon";
import Monster from "../../types/Monster";
import monsterSchema from "./schemas/monsters";
import addonSchema from "./schemas/addons";
import animationSchema from "./schemas/animations";
import Animation from "../../types/Animation";
import modelSchema from "./schemas/models";
import Texture from "../../types/Texture";
import textureSchema from "./schemas/textures";

const db = Database("CobbledBuilder", schemas);

const addonsDb = db.getStore<Addon>(addonSchema.name);
const monstersDb = db.getStore<Monster>(monsterSchema.name);
const animationsDb = db.getStore<Animation>(animationSchema.name);
const modelsDb = db.getStore<Model>(modelSchema.name);
const texturesDb = db.getStore<Texture>(textureSchema.name);

const createAddon = addonsDb.create;
const getAllAddons = addonsDb.getAll;
const getAddonById = addonsDb.getById;

const createMonster = monstersDb.create;
const getAllMonstersForAddon = (addonId: number) =>
  monstersDb.getByField("addonId", addonId);
const getMonsterById = monstersDb.getById;

const createAnimation = animationsDb.create;
const getAllAnimationsForMonster = (monsterId: number) =>
  animationsDb.getByField("monsterId", monsterId);

const createModel = modelsDb.create;
const getAllModelsForMonster = (monsterId: number) =>
  modelsDb.getByField("monsterId", monsterId);

const createTexture = texturesDb.create;
const getAllTexturesForMonster = (monsterId: number) =>
  texturesDb.getByField("monsterId", monsterId);

export {
  createAddon,
  getAllAddons,
  getAddonById,
  createMonster,
  getAllMonstersForAddon,
  getMonsterById,
  createAnimation,
  getAllAnimationsForMonster,
  createModel,
  getAllModelsForMonster,
  createTexture,
  getAllTexturesForMonster,
};
