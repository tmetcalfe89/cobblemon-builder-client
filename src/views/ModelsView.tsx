import { useCallback } from "react";
import FileInput from "../components/FileInput";
import { List, ListItem, ListItemButton, Stack, Typography } from "@mui/material";

interface ModelsViewProps {
  onUpload: (file: File) => void;
  models: (Model & { id: number })[] | null;
}

export default function ModelsView({ onUpload, models }: ModelsViewProps) {
  const handleFileInputChange: React.ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
    if (event.target.files) {
      onUpload(event.target.files[0]);
    }
  }, [onUpload]);

  return (
    <Stack>
      <FileInput onChange={handleFileInputChange} />
      <List>
        {models?.map((model) => <ModelEntry model={model} key={model.id} />)}
      </List>
    </Stack>
  );
}

interface ModelEntryProps {
  model: Model;
}

function ModelEntry({ model }: ModelEntryProps) {
  return <ListItem>
    <ListItemButton>
      <Typography variant="button">{model.modelName}</Typography>
    </ListItemButton>
  </ListItem>
}