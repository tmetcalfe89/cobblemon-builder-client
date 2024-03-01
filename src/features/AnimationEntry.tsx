import Animation from "../types/Animation";
import { ListItem, ListItemButton, ListItemIcon, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";

interface AnimationEntryProps {
  entry: Animation & { id: number };
  onDelete: (id: number) => void;
}

export default function AnimationEntry({ entry, onDelete }: AnimationEntryProps) {
  return <ListItem>
    <ListItemButton>
      <Typography variant="button">{entry.animationName}</Typography>
    </ListItemButton>
    <ListItemButton sx={{ flexGrow: 0 }} onClick={() => onDelete(entry.id)}>
      <ListItemIcon sx={{ minWidth: "unset" }}>
        <Delete />
      </ListItemIcon>
    </ListItemButton>
  </ListItem>
}