import { Delete } from "@mui/icons-material";
import { ListItem, ListItemButton, ListItemIcon, Typography } from "@mui/material";

export interface ModelEntryProps {
  entry: Model & { id: number };
  onDelete: (id: number) => void;
}

export default function ModelEntry({ entry, onDelete }: ModelEntryProps) {
  return <ListItem>
    <ListItemButton>
      <Typography variant="button">{entry.modelName}</Typography>
    </ListItemButton>
    <ListItemButton sx={{ flexGrow: 0 }} onClick={() => onDelete(entry.id)}>
      <ListItemIcon sx={{ minWidth: "unset" }}>
        <Delete />
      </ListItemIcon>
    </ListItemButton>
  </ListItem>
}