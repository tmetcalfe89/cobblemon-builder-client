import Feature from "./Feature";
import WithId from "./WithId";

export default interface FeatureAccess<T extends Feature> {
  list: WithId<T>[] | null;
  createFromFile: (file: File) => Promise<boolean>;
  deleteEntry: (id: number) => Promise<void>;
  createFromName?: (name: string) => Promise<boolean>;
  rename: (id: number, name: string) => Promise<void>;
}
