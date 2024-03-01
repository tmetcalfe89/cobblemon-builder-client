import Feature from "./Feature";

export default interface Model extends Feature {
  monsterId: number;
  // TODO: Make a proper type for this. Extra at the moment because we're just gonna grab the whole thing.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  model: any;
}
