import { useCallback, useEffect, useState } from "react";

export default function useFeature<T extends object>(
  id: number,
  upload: (
    file: File,
    id: number
  ) => Promise<(T & { id: number }) | (T & { id: number })[]>,
  getAllForId: (id: number) => Promise<(T & { id: number })[]>,
  deleteOne: (id: number) => Promise<void>
) {
  const [list, setList] = useState<(T & { id: number })[] | null>(null);

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

  const createNew = useCallback(
    async (file: File) => {
      const entry = await upload(file, id);
      setList(
        (p) => p?.concat(...(Array.isArray(entry) ? entry : [entry])) || null
      );
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

  return { list, createNew, deleteEntry };
}
