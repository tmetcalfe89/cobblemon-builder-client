export default interface Model {
  monsterId: number;
  modelName: string;
  // TODO: Make a proper type for this. Extra at the moment because we're just gonna grab the whole thing.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  model: any;
}
