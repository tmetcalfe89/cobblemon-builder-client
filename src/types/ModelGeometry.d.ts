import Bone from "./Bone";

export default interface ModelGeometry {
  description: {
    identifier: string;
    texture_width: number;
    texture_height: number;
  };
  bones: Bone[];
}
