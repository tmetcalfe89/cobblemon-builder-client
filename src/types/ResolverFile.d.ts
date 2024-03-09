export default interface ResolverFile {
  variations: Variation[];
}

export interface Variation {
  aspects: Aspect[];
  poser?: number;
  model?: number;
  texture?: number;
  layers?: ModelLayer[];
}

export interface Aspect {
  key: string;
  value: string;
}

export interface ModelLayer {
  name: string;
  enabled?: boolean;
  tint?: Color;
  texture?: ModelTextureSupplier;
  emissive?: boolean;
  translucent?: boolean;
}

export type ModelTextureSupplier = string | VaryingModelTextureSupplier;

export interface VaryingModelTextureSupplier {
  frames?: number[];
  fps?: number;
  loop?: boolean;
}

export interface Color {
  r: number;
  g: number;
  b: number;
  a: number;
}
