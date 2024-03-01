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
    deleteModel
  );
  const animations = useFeature(
    monsterId,
    uploadAnimations,
    getAllAnimationsForMonster,
    deleteAnimation
  );
  const textures = useFeature(
    monsterId,
    uploadTexture,
    getAllTexturesForMonster,
    deleteTexture
  );
  const posers = useFeature(
    monsterId,
    uploadPoser,
    getAllPosersForMonster,
    deletePoser,
    {
      createFromName: (poserName) =>
        createPoser({
          monsterId,
          poserName,
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
