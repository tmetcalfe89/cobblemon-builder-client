import Cube from "./Cube";

export default interface Bone {
  name: string;
  parent?: string;
  pivot: [number, number, number];
  rotation?: [number, number, number];
  cubes?: Cube[];
}
