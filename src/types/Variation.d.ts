import Aspect from "./Aspect";
import ModelLayer from "./ModelLayer";

export default interface Variation {
  aspects: Aspect[];
  poser?: number;
  model?: number;
  texture?: number;
  layers?: ModelLayer[];
}
