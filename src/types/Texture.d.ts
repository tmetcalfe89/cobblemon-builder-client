import Feature from "./Feature";

export default interface Texture extends Feature {
  monsterId: number;
  name: string;
  texture: string;
}
