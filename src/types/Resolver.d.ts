import Feature from "./Feature";
import ResolverFile from "./ResolverFile";

export default interface Resolver extends Feature {
  monsterId: number;
  name: string;
  resolver: ResolverFile;
}
