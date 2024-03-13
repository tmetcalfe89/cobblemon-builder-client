import Feature from "./Feature";
import WithId from "./WithId";

export default interface FeatureAccess<T extends Feature> {
  list: WithId<T>[] | null;
  createFromFile: (file: File) => Promise<WithId<T> | WithId<T>[]>;
  deleteEntry: (id: number) => Promise<void>;
  createFromName?: (name: string) => Promise<WithId<T>>;
  rename: (id: number, name: string) => Promise<void>;
  update: (id: number, data: T) => Promise<void>;
}
