import { useCallback, useEffect, useState } from "react";
import WithId from "../types/WithId";

export interface OptionalFeatureParams<T> {
  createFromName?: (name: string) => Promise<WithId<T>>;
}

export interface Feature<T> {
  list: WithId<T>[] | null;
  createFromFile: (file: File) => Promise<boolean>;
  deleteEntry: (id: number) => Promise<void>;
  createFromName?: (name: string) => Promise<boolean>;
}

const useFeature = <T extends object>(
  id: number,
  upload: (
    file: File,
    id: number
  ) => Promise<(T & { id: number }) | WithId<T>[]>,
  getAllForId: (id: number) => Promise<WithId<T>[]>,
  deleteOne: (id: number) => Promise<void>,
  optionalParams: OptionalFeatureParams<T> = {}
): Feature<T> => {
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
    async (file: File) => {
      try {
        const entry = await upload(file, id);
        setList(
          (p) => p?.concat(...(Array.isArray(entry) ? entry : [entry])) || null
        );
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
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
    async (name: string): Promise<boolean> => {
      if (!createFromName) return false;
      try {
        const entry = await createFromName(name);
        setList(
          (p) => p?.concat(...(Array.isArray(entry) ? entry : [entry])) || null
        );
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    [createFromName]
  );

  return {
    list,
    createFromFile: handleCreateFromFile,
    deleteEntry,
    createFromName: createFromName ? handleCreateFromName : undefined,
  };
};

export default useFeature;
