import { Pose } from "../types/PoserFile";
import { PoseType } from "./poseType";

export interface PremadePoseType {
  name: string;
  data: Partial<Pose>;
}

export type PremadePosesType = Record<string, PremadePoseType>;

const PremadePoses: PremadePosesType = {
  ground_idle: {
    name: "Ground Idle",
    data: {
      poseTypes: [PoseType.STAND, PoseType.NONE],
    },
  },
  ground_idle_with_pose: {
    name: "Ground Idle w/Pose",
    data: {
      poseTypes: [
        PoseType.STAND,
        PoseType.NONE,
        PoseType.PORTRAIT,
        PoseType.PROFILE,
      ],
    },
  },
  pose: {
    name: "Pose",
    data: {
      poseTypes: [PoseType.PORTRAIT, PoseType.PROFILE],
    },
  },
  ground_walk: {
    name: "Ground Walk",
    data: {
      poseTypes: [PoseType.WALK],
    },
  },
  battle_idle: {
    name: "Battle Idle",
    data: {
      poseTypes: [PoseType.STAND],
      isBattle: true,
    },
  },
  air_idle: {
    name: "Air Idle",
    data: {
      poseTypes: [PoseType.HOVER],
    },
  },
  air_fly: {
    name: "Air Fly",
    data: {
      poseTypes: [PoseType.FLY],
    },
  },
  sleep: {
    name: "Sleep",
    data: {
      poseTypes: [PoseType.SLEEP],
    },
  },
  left_shoulder: {
    name: "Left Shoulder",
    data: {
      poseTypes: [PoseType.SHOULDER_LEFT],
    },
  },
  right_shoulder: {
    name: "Right Shoulder",
    data: {
      poseTypes: [PoseType.SHOULDER_RIGHT],
    },
  },
  water_swim: {
    name: "Water Swim",
    data: {
      poseTypes: [PoseType.SWIM],
    },
  },
  water_idle: {
    name: "Water Idle",
    data: {
      poseTypes: [PoseType.FLOAT],
    },
  },
};

export default PremadePoses;
