import { useCallback } from "react";
import FileInput from "../components/FileInput";
import Animation from "../types/Animation";
import { List, ListItem, ListItemButton, Stack, Typography } from "@mui/material";

interface AnimationsViewProps {
  onUpload: (file: File) => void;
  animations: (Animation & { id: number })[] | null;
}

export default function AnimationsView({ onUpload, animations }: AnimationsViewProps) {
  const handleFileInputChange: React.ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
    if (event.target.files) {
      onUpload(event.target.files[0]);
    }
  }, [onUpload]);

  return (
    <Stack>
      <FileInput onChange={handleFileInputChange} />
      <List>
        {animations?.map((animation) => <AnimationEntry animation={animation} key={animation.id} />)}
      </List>
    </Stack>
  );
}

interface AnimationEntryProps {
  animation: Animation;
}
function AnimationEntry({ animation }: AnimationEntryProps) {

  return <ListItem>
    <ListItemButton>
      <Typography variant="button">{animation.animationName}</Typography>
    </ListItemButton>
  </ListItem>
}