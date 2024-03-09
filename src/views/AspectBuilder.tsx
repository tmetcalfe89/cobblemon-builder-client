import { Controller, useForm } from "react-hook-form";
import { useCallback } from "react";
import { Button, Chip, Stack, TextField } from "@mui/material";
import Autocomplete from "../components/Autocomplete";
import Aspect from "../types/Aspect";

interface AspectBuilderProps {
  value: Aspect[];
  onAdd: (newVal: Aspect) => void;
  onRemove: (removedVal: number) => void;
}

export default function AspectBuilder({ value, onAdd, onRemove }: AspectBuilderProps) {
  const { reset, register, handleSubmit, control } = useForm({
    defaultValues: {
      key: "",
      value: ""
    }
  });

  const handleAdd = useCallback((newEntry: Aspect) => {
    onAdd(newEntry);
    reset();
  }, [onAdd, reset]);

  return <Stack component="form" onSubmit={handleSubmit(handleAdd)} gap={1}>
    <Stack direction="row" gap={1}>
      {value.map((entry, i) =>
        <Chip label={`${entry.key}=${entry.value}`} key={entry.key} onDelete={() => onRemove(i)} />
      )}
    </Stack>
    <Stack direction="row" gap={1} sx={{ "& > *": { flexGrow: 1, minWidth: 0, flexBasis: 0 } }}>
      <Controller
        control={control}
        name="key"
        render={({ field: { ref: _ref, onChange, ...field } }) =>
          <Autocomplete
            {...field}
            disablePortal
            options={["shiny"]}
            getOptionLabel={(e) => e}
            isOptionEqualToValue={(entry, value) => entry === value}
            label="Key"
            onChange={(_, data) => onChange(data)}
            freeSolo
          />
        }
      />
      <TextField {...register("value")} label="Value" />
    </Stack>
    <Button type="submit">Add Aspect</Button>
  </Stack>
}