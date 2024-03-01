import { Pose } from "../types/PoserFile";

const defaultPoser = {
  head: null,
  portraitScale: 1,
  portraitTranslation: [0, 0.5, 0],
  profileScale: 1,
  profileTranslation: [0, 0.4, 0],
  poses: [] as Pose[],
};

export default defaultPoser;
