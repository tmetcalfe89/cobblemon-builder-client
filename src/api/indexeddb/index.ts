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
import { DatabaseStoreType } from "the-promised-indexeddb/types/types";
import Poser from "../../types/Poser";
import poserSchema from "./schemas/posers";

const db = Database("CobbledBuilder", schemas);

const addonsDb = db.getStore<Addon>(addonSchema.name);
const monstersDb = db.getStore<Monster>(monsterSchema.name);
const animationsDb = db.getStore<Animation>(animationSchema.name);
const modelsDb = db.getStore<Model>(modelSchema.name);
const texturesDb = db.getStore<Texture>(textureSchema.name);
const posersDb = db.getStore<Poser>(poserSchema.name);

const createAddon = addonsDb.create;
const getAllAddons = addonsDb.getAll;
const getAddonById = addonsDb.getById;
const deleteAddon = async (addonId: number) => {
  await addonsDb.delete(addonId);
  const monsters = await getAllMonstersForAddon(addonId);
  for (const monster of monsters) {
    await deleteMonster(monster.id);
  }
};

const createMonster = monstersDb.create;
const getAllMonstersForAddon = (addonId: number) =>
  monstersDb.getByField("addonId", addonId);
const getMonsterById = monstersDb.getById;
const deleteMonster = async (monsterId: number) => {
  await monstersDb.delete(monsterId);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const monsterFeatureStores: DatabaseStoreType<any & { id: number }>[] = [
    animationsDb,
    modelsDb,
    texturesDb,
  ];
  for (const dbStore of monsterFeatureStores) {
    const featureEntries = await dbStore.getByField("monsterId", monsterId);
    for (const entry of featureEntries) {
      await dbStore.delete(entry.id);
    }
  }
};

const createAnimation = animationsDb.create;
const getAllAnimationsForMonster = (monsterId: number) =>
  animationsDb.getByField("monsterId", monsterId);
const deleteAnimation = animationsDb.delete;

const createModel = modelsDb.create;
const getAllModelsForMonster = (monsterId: number) =>
  modelsDb.getByField("monsterId", monsterId);
const deleteModel = modelsDb.delete;

const createTexture = texturesDb.create;
const getAllTexturesForMonster = (monsterId: number) =>
  texturesDb.getByField("monsterId", monsterId);
const deleteTexture = texturesDb.delete;

const createPoser = posersDb.create;
const getAllPosersForMonster = (monsterId: number) =>
  posersDb.getByField("monsterId", monsterId);
const deletePoser = posersDb.delete;

export {
  createAddon,
  getAllAddons,
  getAddonById,
  deleteAddon,
  createMonster,
  getAllMonstersForAddon,
  deleteMonster,
  getMonsterById,
  createAnimation,
  getAllAnimationsForMonster,
  deleteAnimation,
  createModel,
  getAllModelsForMonster,
  deleteModel,
  createTexture,
  getAllTexturesForMonster,
  deleteTexture,
  createPoser,
  getAllPosersForMonster,
  deletePoser,
};
