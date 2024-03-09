import Pose from "./Pose";

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
