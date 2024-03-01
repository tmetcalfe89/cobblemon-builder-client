import Feature from "./Feature";
import PoserFile from "./PoserFile";

export default interface Poser extends Feature {
  monsterId: number;
  name: string;
  poser: PoserFile;
}
