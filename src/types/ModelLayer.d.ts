import { Color } from "./Color";
import { ModelTextureSupplier } from "./ModelTextureSupplier";

export default interface ModelLayer {
  name: string;
  enabled?: boolean;
  tint?: Color;
  texture?: ModelTextureSupplier;
  emissive?: boolean;
  translucent?: boolean;
}
