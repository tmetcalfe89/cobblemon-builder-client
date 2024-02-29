import { useCallback, useEffect, useState } from "react";
import Addon from "../types/Addon";
import {
  getAddonById,
  getAllMonstersForAddon,
  createMonster as idbCreateMonster,
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

  const createMonster = useCallback(
    async (name: string) => {
      const newMonster = await idbCreateMonster({ name, addonId: +addonId });
      setMonsters((p) => p?.concat(newMonster) || null);
    },
    [addonId]
  );

  return { addon, monsters, createMonster };
}
