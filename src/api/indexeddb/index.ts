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
import Model from "../../types/Model";
import Feature from "../../types/Feature";
import Resolver from "../../types/Resolver";
import resolverSchema from "./schemas/resolvers";
import Species from "../../types/Species";
import speciesSchema from "./schemas/species";

const rename =
  <T extends Feature>(store: DatabaseStoreType<T>) =>
  async (id: number, name: string) =>
    store.update(id, { ...(await store.getById(id)), name });

const db = Database("CobbledBuilder", schemas);

const addonsDb = db.getStore<Addon>(addonSchema.name);
const monstersDb = db.getStore<Monster>(monsterSchema.name);
const animationsDb = db.getStore<Animation>(animationSchema.name);
const modelsDb = db.getStore<Model>(modelSchema.name);
const texturesDb = db.getStore<Texture>(textureSchema.name);
const posersDb = db.getStore<Poser>(poserSchema.name);
const resolversDb = db.getStore<Resolver>(resolverSchema.name);
const speciesDb = db.getStore<Species>(speciesSchema.name);

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
const updateAddon = addonsDb.update;

const createMonster = monstersDb.create;
const getAllMonstersForAddon = (addonId: number) =>
  monstersDb.getByField("addonId", addonId);
const getMonsterById = monstersDb.getById;
const deleteMonster = async (monsterId: number) => {
  await monstersDb.delete(monsterId);
  // Need to fix this. The things stored in the... stores are Features and it won't let me `DatabaseStoreType<Feature>` :thinking:
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const monsterFeatureStores: DatabaseStoreType<any>[] = [
    animationsDb,
    modelsDb,
    texturesDb,
    speciesDb,
    resolversDb,
    posersDb,
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
const renameAnimation = rename(animationsDb);
const updateAnimation = animationsDb.update;

const createModel = modelsDb.create;
const getAllModelsForMonster = (monsterId: number) =>
  modelsDb.getByField("monsterId", monsterId);
const deleteModel = modelsDb.delete;
const renameModel = rename(modelsDb);
const updateModel = modelsDb.update;

const createTexture = texturesDb.create;
const getAllTexturesForMonster = (monsterId: number) =>
  texturesDb.getByField("monsterId", monsterId);
const deleteTexture = texturesDb.delete;
const renameTexture = rename(texturesDb);
const updateTexture = texturesDb.update;

const createPoser = posersDb.create;
const getAllPosersForMonster = (monsterId: number) =>
  posersDb.getByField("monsterId", monsterId);
const deletePoser = posersDb.delete;
const renamePoser = rename(posersDb);
const updatePoser = posersDb.update;

const createResolver = resolversDb.create;
const getAllResolversForMonster = (monsterId: number) =>
  resolversDb.getByField("monsterId", monsterId);
const deleteResolver = resolversDb.delete;
const renameResolver = rename(resolversDb);
const updateResolver = resolversDb.update;

const createSpecies = speciesDb.create;
const getAllSpeciesForMonster = (monsterId: number) =>
  speciesDb.getByField("monsterId", monsterId);
const deleteSpecies = speciesDb.delete;
const renameSpecies = rename(speciesDb);
const updateSpecies = speciesDb.update;

export {
  createAddon,
  getAllAddons,
  getAddonById,
  deleteAddon,
  updateAddon,
  createMonster,
  getAllMonstersForAddon,
  deleteMonster,
  getMonsterById,
  createAnimation,
  getAllAnimationsForMonster,
  deleteAnimation,
  renameAnimation,
  updateAnimation,
  createModel,
  getAllModelsForMonster,
  deleteModel,
  renameModel,
  updateModel,
  createTexture,
  getAllTexturesForMonster,
  deleteTexture,
  renameTexture,
  updateTexture,
  createPoser,
  getAllPosersForMonster,
  deletePoser,
  renamePoser,
  updatePoser,
  createResolver,
  getAllResolversForMonster,
  deleteResolver,
  renameResolver,
  updateResolver,
  createSpecies,
  getAllSpeciesForMonster,
  deleteSpecies,
  renameSpecies,
  updateSpecies,
};
