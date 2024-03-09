import { Delete, Edit, Save } from "@mui/icons-material";
import { ListItem, ListItemButton, ListItemIcon, TextField, Typography } from "@mui/material";
import useBoolean from "../hooks/useBoolean";
import { useCallback, useState } from "react";
import WithId from "../types/WithId";
import Feature from "../types/Feature";
import ListItemLink from "../components/ListItemLink";

export interface FeatureEntryProps<T extends Feature> {
  entry: WithId<T>;
  onDelete: (id: number) => void;
  onRename: (id: number, name: string) => Promise<void>;
}

const FeatureEntry = <T extends Feature>({ entry, onDelete, onRename }: FeatureEntryProps<T>) => {
  const [editingName, { on: showNameEditor, off: hideNameEditor }] = useBoolean(false);
  const [editingNameValue, setEditingNameValue] = useState(entry.name);

  const handleEditName = useCallback(async () => {
    if (!onRename) return;
    await onRename(entry.id, editingNameValue);
    hideNameEditor();
  }, [editingNameValue, entry.id, hideNameEditor, onRename]);

  return <ListItem sx={{ alignItems: "stretch" }}>
    {editingName ?
      <TextField
        fullWidth
        value={editingNameValue}
        onChange={(e) => setEditingNameValue(e.target.value)} /> :
      <ListItemLink to={`${entry.id}`}>
        <Typography>{entry.name}</Typography>
      </ListItemLink>}
    <ListItemButton sx={{ flexGrow: 0 }} onClick={editingName ? handleEditName : showNameEditor}>
      <ListItemIcon sx={{ minWidth: "unset" }}>
        {editingName ? <Save /> : <Edit />}
      </ListItemIcon>
    </ListItemButton>
    <ListItemButton sx={{ flexGrow: 0 }} onClick={() => onDelete(entry.id)}>
      <ListItemIcon sx={{ minWidth: "unset" }}>
        <Delete />
      </ListItemIcon>
    </ListItemButton>
  </ListItem>
}

export default FeatureEntry;