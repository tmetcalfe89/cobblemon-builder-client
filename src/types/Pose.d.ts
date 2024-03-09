import { PoseType } from "../data/poseType";
import Quirk from "./Quirk";

export default interface Pose {
  poseName: string;
  transformTicks: number;
  poseTypes: PoseType[];
  animations: number[];
  isBattle?: boolean;
  quirks?: Quirk[];
}
