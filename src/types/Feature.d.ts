export default interface Feature<T> {
  list: WithId<T>[] | null;
  createFromFile: (file: File) => Promise<boolean>;
  deleteEntry: (id: number) => Promise<void>;
  createFromName?: (name: string) => Promise<boolean>;
}
