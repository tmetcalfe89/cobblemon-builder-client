import { useCallback, useEffect, useState } from "react";
import Addon from "../types/Addon";
import {
  getAddonById,
  getAllMonstersForAddon,
  createMonster as idbCreateMonster,
  deleteMonster as idbDeleteMonster,
  updateAddon as idbUpdateAddon,
} from "../api/indexeddb";
import Monster from "../types/Monster";

export default function useAddon(addonId: number) {
  const [addon, setAddon] = useState<(Addon & { id: number }) | null>(null);
  const [monsters, setMonsters] = useState<(Monster & { id: number })[] | null>(
    null
  );

  useEffect(() => {
    let running = true;
    async function fetchAddon() {
      const fetchedAddon = await getAddonById(addonId);
      if (!running) return;
      setAddon(fetchedAddon);
    }
    fetchAddon();

    return () => {
      running = false;
    };
  }, [addonId]);

  useEffect(() => {
    let running = true;
    async function fetchMonsters() {
      const fetchedMonsters = await getAllMonstersForAddon(addonId);
      if (!running) return;
      setMonsters(fetchedMonsters);
    }
    fetchMonsters();

    return () => {
      running = false;
    };
  }, [addonId]);

  const updateAddon = useCallback(async (id: number, data: Addon) => {
    setAddon(await idbUpdateAddon(id, data));
  }, []);

  const createMonster = useCallback(
    async (name: string) => {
      const newMonster = await idbCreateMonster({ name, addonId: +addonId });
      setMonsters((p) => p?.concat(newMonster) || null);
    },
    [addonId]
  );

  const deleteMonster = useCallback(async (monsterId: number) => {
    await idbDeleteMonster(monsterId);
    setMonsters((p) => p?.filter((e) => e.id !== monsterId) || null);
  }, []);

  return { addon, monsters, createMonster, deleteMonster, updateAddon };
}
