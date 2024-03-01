import { createAnimation, createModel, createTexture } from "../api/indexeddb";
import Animation from "../types/Animation";
import AnimationFile from "../types/AnimationFile";
import ModelFile from "../types/ModelFile";

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
    model,
    modelName: model["minecraft:geometry"][0].description.identifier,
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
      animationName: animationFullName.split(".").pop() || "missing",
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
    textureName: file.name,
  });
  return addedTexture;
};
