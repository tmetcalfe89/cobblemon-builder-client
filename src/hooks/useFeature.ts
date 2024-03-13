import { useCallback, useEffect, useState } from "react";
import WithId from "../types/WithId";
import FeatureAccess from "../types/FeatureAccess";
import Feature from "../types/Feature";

export interface OptionalFeatureParams<T> {
  createFromName?: (name: string) => Promise<WithId<T>>;
}

const useFeature = <T extends Feature>(
  id: number,
  upload: (file: File, id: number) => Promise<WithId<T> | WithId<T>[]>,
  getAllForId: (id: number) => Promise<WithId<T>[]>,
  deleteOne: (id: number) => Promise<void>,
  rename: (id: number, name: string) => Promise<WithId<T>>,
  update: (id: number, data: T) => Promise<WithId<T>>,
  optionalParams: OptionalFeatureParams<T> = {}
): FeatureAccess<T> => {
  const { createFromName } = optionalParams;
  const [list, setList] = useState<WithId<T>[] | null>(null);

  useEffect(() => {
    let running = true;
    async function fetchList() {
      const fetchedList = await getAllForId(id);
      if (!running) return;
      setList(fetchedList);
    }
    fetchList();

    return () => {
      running = false;
    };
  }, [getAllForId, id]);

  const handleCreateFromFile = useCallback(
    async (file: File): Promise<WithId<T> | WithId<T>[]> => {
      const entry = await upload(file, id);
      setList(
        (p) => p?.concat(...(Array.isArray(entry) ? entry : [entry])) || null
      );
      return entry;
    },
    [id, upload]
  );

  const deleteEntry = useCallback(
    async (id: number) => {
      await deleteOne(id);
      setList((p) => p?.filter((entry) => entry.id !== id) || null);
    },
    [deleteOne]
  );

  const handleCreateFromName = useCallback(
    async (name: string): Promise<WithId<T>> => {
      if (!createFromName) throw new Error("Cannot create from name");
      const entry = await createFromName(name);
      setList(
        (p) => p?.concat(...(Array.isArray(entry) ? entry : [entry])) || null
      );
      return entry;
    },
    [createFromName]
  );

  const handleRename = useCallback(
    async (id: number, name: string) => {
      const updatedEntry = await rename(id, name);
      setList(
        (p) =>
          p?.map((existing) =>
            existing.id === id ? updatedEntry : existing
          ) || null
      );
    },
    [rename]
  );

  const handleUpdate = useCallback(
    async (id: number, data: T) => {
      const updatedEntry = await update(id, data);
      setList(
        (p) =>
          p?.map((existing) =>
            existing.id === id ? updatedEntry : existing
          ) || null
      );
    },
    [update]
  );

  return {
    list,
    createFromFile: handleCreateFromFile,
    deleteEntry,
    createFromName: createFromName ? handleCreateFromName : undefined,
    rename: handleRename,
    update: handleUpdate,
  };
};

export default useFeature;
