import { Delete } from "@mui/icons-material";
import Texture from "../types/Texture";
import { ImageListItem, ImageListItemBar } from "@mui/material";

interface TextureEntryProps {
  entry: Texture & { id: number };
  onDelete: (id: number) => void;
}

export default function TextureEntry({ entry, onDelete }: TextureEntryProps) {
  return <ImageListItem>
    <img src={`data:image/png;base64,${entry.texture}`} loading="lazy" style={{ imageRendering: "pixelated" }} />
    <ImageListItemBar
      title={entry.textureName}
      position="bottom"
      actionIcon={<Delete sx={{ cursor: "pointer" }} onClick={() => onDelete(entry.id)} />}
    />
  </ImageListItem>
}