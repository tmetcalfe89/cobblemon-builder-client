export default interface Cube {
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
