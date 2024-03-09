import Feature from "./Feature";
import ModelFile from "./ModelFile";

export default interface Model extends Feature {
  monsterId: number;
  model: ModelFile;
}
