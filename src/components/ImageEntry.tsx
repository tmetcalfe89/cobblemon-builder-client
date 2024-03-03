import { Delete } from "@mui/icons-material";
import Texture from "../types/Texture";
import { ImageListItem, ImageListItemBar } from "@mui/material";
import WithId from "../types/WithId";

export interface TextureEntryProps {
  entry: WithId<Texture>;
  onDelete: (id: number) => void;
}

export default function ImageEntry({ entry, onDelete }: TextureEntryProps) {
  return <ImageListItem>
    <img src={`data:image/png;base64,${entry.texture}`} loading="lazy" style={{ imageRendering: "pixelated" }} />
    <ImageListItemBar
      title={entry.name}
      position="bottom"
      actionIcon={<Delete sx={{ cursor: "pointer" }} onClick={() => onDelete(entry.id)} />}
    />
  </ImageListItem>
}