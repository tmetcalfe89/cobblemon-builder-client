import { useForm } from "react-hook-form";
import Addon from "../types/Addon";
import WithId from "../types/WithId";
import { Stack } from "@mui/system";
import { Button, TextField } from "@mui/material";
import { useCallback } from "react";

interface AddonEditorProps {
  addon: WithId<Addon>;
  onUpdate: (id: number, data: Addon) => Promise<void>;
}

export default function AddonEditor({ addon, onUpdate }: AddonEditorProps) {
  const addonForm = useForm({
    defaultValues: addon
  });

  const handleUpdate = useCallback(async (values: WithId<Addon>) => {
    await onUpdate(addon.id, values);
  }, [addon.id, onUpdate]);

  return <Stack sx={{ height: "100%" }}>
    <Stack sx={{ flexGrow: 1, minHeight: 0, flexBasis: 0 }}>
      <TextField {...addonForm.register("name")} label="Name" />
    </Stack>
    <Button onClick={addonForm.handleSubmit(handleUpdate)}>Update</Button>
  </Stack>
}