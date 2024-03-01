import { Delete } from "@mui/icons-material";
import { ListItem, ListItemButton, ListItemIcon, Typography } from "@mui/material";
import Poser from "../types/Poser";
import WithId from "../types/WithId";

interface PoserEntryProps {
  entry: WithId<Poser>;
  onDelete: (id: number) => void;
}

export default function PoserEntry({ entry, onDelete }: PoserEntryProps) {
  return <ListItem>
    <ListItemButton>
      <Typography variant="button">{entry.poserName}</Typography>
    </ListItemButton>
    <ListItemButton sx={{ flexGrow: 0 }} onClick={() => onDelete(entry.id)}>
      <ListItemIcon sx={{ minWidth: "unset" }}>
        <Delete />
      </ListItemIcon>
    </ListItemButton>
  </ListItem>
}