import { useCallback, useEffect, useState } from "react";
import Addon from "../types/Addon";
import {
  createAddon as idbCreateAddon,
  getAllAddons,
  deleteAddon as idbDeleteAddon,
} from "../api/indexeddb";

export default function useAccount() {
  const [addons, setAddons] = useState<(Addon & { id: number })[] | null>(null);

  useEffect(() => {
    let running = true;
    async function fetchAddons() {
      const fetchedAddons = await getAllAddons();
      if (!running) return;
      setAddons(fetchedAddons);
    }
    fetchAddons();

    return () => {
      running = false;
    };
  }, []);

  const createAddon = useCallback(async (name: string) => {
    const newAddon = await idbCreateAddon({ name });
    setAddons((p) => p?.concat(newAddon) || null);
  }, []);

  const deleteAddon = useCallback(async (addonId: number) => {
    await idbDeleteAddon(addonId);
    setAddons((p) => p?.filter((e) => e.id !== addonId) || null);
  }, []);

  return { addons, createAddon, deleteAddon };
}
