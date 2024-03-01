import { useEffect, useState } from "react";
import {
  createPoser,
  deleteAnimation,
  deleteModel,
  deletePoser,
  deleteTexture,
  getAllAnimationsForMonster,
  getAllModelsForMonster,
  getAllPosersForMonster,
  getAllTexturesForMonster,
  getMonsterById,
  renameAnimation,
  renameModel,
  renamePoser,
  renameTexture,
} from "../api/indexeddb";
import Monster from "../types/Monster";
import {
  uploadAnimations,
  uploadModel,
  uploadPoser,
  uploadTexture,
} from "../util/upload";
import useFeature from "./useFeature";
import defaultPoser from "../defaults/PoserFile";

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
    renameModel
  );
  const animations = useFeature(
    monsterId,
    uploadAnimations,
    getAllAnimationsForMonster,
    deleteAnimation,
    renameAnimation
  );
  const textures = useFeature(
    monsterId,
    uploadTexture,
    getAllTexturesForMonster,
    deleteTexture,
    renameTexture
  );
  const posers = useFeature(
    monsterId,
    uploadPoser,
    getAllPosersForMonster,
    deletePoser,
    renamePoser,
    {
      createFromName: (name) =>
        createPoser({
          monsterId,
          name,
          poser: defaultPoser,
        }),
    }
  );

  return {
    monster,
    animations,
    models,
    textures,
    posers,
  };
}
