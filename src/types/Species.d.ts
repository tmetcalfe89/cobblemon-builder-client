import Feature from "./Feature";
import SpeciesFile from "./SpeciesFile";

export default interface Species extends Feature {
  monsterId: number;
  name: string;
  species: SpeciesFile;
}
