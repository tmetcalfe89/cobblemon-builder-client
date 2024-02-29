import { useCallback, useEffect, useState } from "react";
import Addon from "../types/Addon";
import { createAddon as idbCreateAddon, getAllAddons } from "../api/indexeddb";

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

  return { addons, createAddon };
}
