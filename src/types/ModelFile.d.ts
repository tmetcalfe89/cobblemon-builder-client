import ModelGeometry from "./ModelGeometry";

export default interface ModelFile {
  format_version: string;
  "minecraft:geometry": [ModelGeometry];
}
