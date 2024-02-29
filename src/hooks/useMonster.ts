import { useCallback, useEffect, useState } from "react";
import {
  createAnimation,
  createModel,
  getAllAnimationsForMonster,
  getAllModelsForMonster,
  getMonsterById,
} from "../api/indexeddb";
import Monster from "../types/Monster";
import { uploadJson } from "../util/upload";
import AnimationFile from "../types/AnimationFile";
import Animation from "../types/Animation";
import ModelFile from "../types/ModelFile";

export default function useMonster(monsterId: number) {
  const [monster, setMonster] = useState<(Monster & { id: number }) | null>(
    null
  );
  const [animations, setAnimations] = useState<
    (Animation & { id: number })[] | null
  >(null);
  const [models, setModels] = useState<(Model & { id: number })[] | null>(null);

  useEffect(() => {
    let running = true;
    async function fetchMonster() {
      const fetchedMonster = await getMonsterById(monsterId);
      if (!running) return;
      setMonster(fetchedMonster);
    }
    fetchMonster();

    return () => {
      running = false;
    };
  }, [monsterId]);

  useEffect(() => {
    let running = true;
    async function fetchAnimations() {
      const fetchedAnimations = await getAllAnimationsForMonster(monsterId);
      if (!running) return;
      setAnimations(fetchedAnimations);
    }
    fetchAnimations();

    return () => {
      running = false;
    };
  }, [monsterId]);

  useEffect(() => {
    let running = true;
    async function fetchModels() {
      const fetchedModels = await getAllModelsForMonster(monsterId);
      if (!running) return;
      setModels(fetchedModels);
    }
    fetchModels();

    return () => {
      running = false;
    };
  }, [monsterId]);

  const uploadAnimation = useCallback(
    async (file: File) => {
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
      setAnimations((p) => p?.concat(addedAnimations) || null);
    },
    [monsterId]
  );

  const uploadModel = useCallback(
    async (file: File) => {
      const model = await uploadJson<ModelFile>(file);
      const addedModel = await createModel({
        model,
        modelName: model["minecraft:geometry"][0].description.identifier,
        monsterId,
      });
      setModels((p) => p?.concat(addedModel) || null);
    },
    [monsterId]
  );

  return { monster, animations, uploadAnimation, models, uploadModel };
}
