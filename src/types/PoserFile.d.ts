import { PoseType } from "../data/poseType";

export default interface PoserFile {
  head?: string | null;
  faint?: number;
  cry?: number;
  portraitScale: number;
  portraitTranslation: number[];
  profileScale: number;
  profileTranslation: number[];
  poses: Pose[];
}

export interface Quirk {
  name: string;
  animations: number[];
}

export interface Pose {
  poseName: string;
  transformTicks: number;
  poseTypes: PoseType[];
  animations: number[];
  isBattle?: boolean;
  quirks?: Quirk[];
}
