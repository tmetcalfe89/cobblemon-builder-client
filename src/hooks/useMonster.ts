import { useEffect, useState } from "react";
import {
  deleteAnimation,
  deleteModel,
  deleteTexture,
  getAllAnimationsForMonster,
  getAllModelsForMonster,
  getAllTexturesForMonster,
  getMonsterById,
} from "../api/indexeddb";
import Monster from "../types/Monster";
import { uploadAnimations, uploadModel, uploadTexture } from "../util/upload";
import useFeature from "./useFeature";

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

  return { monster, animations, models, textures };
}
