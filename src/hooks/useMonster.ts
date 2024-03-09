import { useEffect, useState } from "react";
import {
  createPoser,
  createResolver,
  deleteAnimation,
  deleteModel,
  deletePoser,
  deleteResolver,
  deleteTexture,
  getAllAnimationsForMonster,
  getAllModelsForMonster,
  getAllPosersForMonster,
  getAllResolversForMonster,
  getAllTexturesForMonster,
  getMonsterById,
  renameAnimation,
  renameModel,
  renamePoser,
  renameResolver,
  renameTexture,
  updateAnimation,
  updateModel,
  updatePoser,
  updateResolver,
  updateTexture,
} from "../api/indexeddb";
import Monster from "../types/Monster";
import {
  uploadAnimations,
  uploadModel,
  uploadPoser,
  uploadResolver,
  uploadTexture,
} from "../util/upload";
import useFeature from "./useFeature";
import defaultPoser from "../defaults/PoserFile";
import defaultResolver from "../defaults/ResolverFile";

export default function useMonster(monsterId: number) {
  const [monster, setMonster] = useState<(Monster & { id: number }) | null>(
    null
  );

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

  const models = useFeature(
    monsterId,
    uploadModel,
    getAllModelsForMonster,
    deleteModel,
    renameModel,
    updateModel
  );
  const animations = useFeature(
    monsterId,
    uploadAnimations,
    getAllAnimationsForMonster,
    deleteAnimation,
    renameAnimation,
    updateAnimation
  );
  const textures = useFeature(
    monsterId,
    uploadTexture,
    getAllTexturesForMonster,
    deleteTexture,
    renameTexture,
    updateTexture
  );
  const posers = useFeature(
    monsterId,
    uploadPoser,
    getAllPosersForMonster,
    deletePoser,
    renamePoser,
    updatePoser,
    {
      createFromName: (name) =>
        createPoser({
          monsterId,
          name,
          poser: defaultPoser,
        }),
    }
  );

  const resolvers = useFeature(
    monsterId,
    uploadResolver,
    getAllResolversForMonster,
    deleteResolver,
    renameResolver,
    updateResolver,
    {
      createFromName: (name) =>
        createResolver({
          monsterId,
          name,
          resolver: defaultResolver,
        }),
    }
  );

  return {
    monster,
    animations,
    models,
    textures,
    posers,
    resolvers,
  };
}
