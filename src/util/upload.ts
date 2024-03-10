import {
  createAnimation,
  createModel,
  createPoser,
  createResolver,
  createSpecies,
  createTexture,
} from "../api/indexeddb";
import { SpeciesFileSchema } from "../schemas/SpeciesFile";
import Animation from "../types/Animation";
import AnimationFile from "../types/AnimationFile";
import ModelFile from "../types/ModelFile";
import PoserFile from "../types/PoserFile";
import ResolverFile from "../types/ResolverFile";
import { SpeciesFile } from "../types/SpeciesFile";
import { checkForRootFolderAndFix } from "./model";

export const uploadJson = async <T extends object>(file: File): Promise<T> => {
  const abUploaded = await uploadFile(file);
  const decoder = new TextDecoder();
  return JSON.parse(decoder.decode(abUploaded));
};

export const uploadImage = async (file: File) => {
  const abUploaded = await uploadFile(file);
  return btoa(String.fromCharCode(...new Uint8Array(abUploaded)));
};

function uploadFile(file: File): Promise<ArrayBuffer> {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (!event.target) {
        rej("Error loading file");
        return;
      }
      res(event.target.result as ArrayBuffer);
    };
    reader.onerror = (event) => {
      rej(event.target?.error);
    };
    reader.readAsArrayBuffer(file);
  });
}

export const uploadModel = async (file: File, monsterId: number) => {
  const model = await uploadJson<ModelFile>(file);
  const addedModel = await createModel({
    model: checkForRootFolderAndFix(model),
    name: file.name,
    monsterId,
  });
  return addedModel;
};

export const uploadAnimations = async (file: File, monsterId: number) => {
  const animationData = await uploadJson<AnimationFile>(file);
  const remappedAnimations: Animation[] = Object.entries(
    animationData.animations
  ).map(
    ([animationFullName, animation]): Animation => ({
      animation,
      name: animationFullName.split(".").pop() || "missing",
      monsterId,
    })
  );
  const addedAnimations = await Promise.all(
    remappedAnimations.map((animation) => createAnimation(animation))
  );
  return addedAnimations;
};

export const uploadTexture = async (file: File, monsterId: number) => {
  const texture = await uploadImage(file);
  const addedTexture = await createTexture({
    monsterId,
    texture,
    name: file.name,
  });
  return addedTexture;
};

export const uploadPoser = async (file: File, monsterId: number) => {
  const rawPoser = await uploadJson<PoserFile>(file);
  const poser: PoserFile = {
    ...rawPoser,
    poses: Object.values(rawPoser),
  };
  const addedPoser = await createPoser({
    monsterId,
    poser,
    name: file.name,
  });
  return addedPoser;
};

export const uploadResolver = async (file: File, monsterId: number) => {
  const rawResolver = await uploadJson<ResolverFile>(file);
  const resolver: ResolverFile = {
    ...rawResolver,
  };
  const addedResolver = await createResolver({
    monsterId,
    resolver,
    name: file.name,
  });
  return addedResolver;
};

export const uploadSpecies = async (file: File, monsterId: number) => {
  const rawSpecies = await uploadJson<SpeciesFile>(file);
  const addedSpecies = await createSpecies({
    monsterId,
    species: SpeciesFileSchema.cast(rawSpecies),
    name: file.name,
  });
  return addedSpecies;
};
