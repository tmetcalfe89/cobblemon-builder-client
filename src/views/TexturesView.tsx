import { useCallback } from "react";
import Texture from "../types/Texture";
import { ImageList, ImageListItem, ImageListItemBar, Stack } from "@mui/material";
import FileInput from "../components/FileInput";

interface TexturesViewProps {
  onUpload: (file: File) => void;
  textures: (Texture & { id: number })[] | null;
}

export default function TexturesView({ onUpload, textures }: TexturesViewProps) {
  const handleFileInputChange: React.ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
    if (event.target.files) {
      onUpload(event.target.files[0]);
    }
  }, [onUpload]);

  return (
    <Stack height="100%">
      <FileInput onChange={handleFileInputChange} />
      <ImageList cols={5}>
        {(textures || []).map((texture) => <TextureEntry texture={texture} key={texture.id} />)}
      </ImageList>
    </Stack>
  );
}

interface TextureEntryProps {
  texture: Texture;
}

function TextureEntry({ texture }: TextureEntryProps) {
  return <ImageListItem>
    <img src={`data:image/png;base64,${texture.texture}`} loading="lazy" style={{ imageRendering: "pixelated" }} />
    <ImageListItemBar
      title={texture.textureName}
      position="below"
    />
  </ImageListItem>
}