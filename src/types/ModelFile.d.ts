export default interface ModelFile {
  format_version: string;
  "minecraft:geometry": ModelGeometry[];
}

interface ModelGeometry {
  description: {
    identifier: string;
    texture_width: number;
    texture_height: number;
  };
  bones: Bone[];
}

interface Bone {
  name: string;
  parent?: string;
  pivot: [number, number, number];
  rotation?: [number, number, number];
  cubes?: Cube[];
}

interface Cube {
  origin: [number, number, number];
  size: [number, number, number];
  uv:
    | [number, number]
    | {
        north: [number, number];
        south: [number, number];
        east: [number, number];
        west: [number, number];
        up: [number, number];
        down: [number, number];
      };
}
