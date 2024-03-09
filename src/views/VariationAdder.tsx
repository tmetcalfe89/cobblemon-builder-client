import { Button, Divider, Stack } from "@mui/material";
import Model from "../types/Model";
import Poser from "../types/Poser";
import Texture from "../types/Texture";
import WithId from "../types/WithId";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useCallback } from "react";
import Select from "../components/Select";
import AspectBuilder from "./AspectBuilder";
import Variation from "../types/Variation";

export interface VariantAdderProps {
  onAdd: (newVariation: Variation) => void;
  posers: WithId<Poser>[];
  models: WithId<Model>[];
  textures: WithId<Texture>[];
}

export default function VariationAdder({ onAdd, models, posers, textures }: VariantAdderProps) {
  const { handleSubmit, reset, control } = useForm<Variation>({
    defaultValues: {
      aspects: [],
      layers: [],
      model: undefined,
      poser: undefined,
      texture: undefined
    }
  });
  const { append: addAspect, fields: aspects, remove: removeAspect } = useFieldArray({
    control,
    name: "aspects"
  });

  const handleAdd = useCallback((newVariation: Variation) => {
    onAdd(newVariation);
    reset();
  }, [onAdd, reset]);

  return <Stack gap={1}>
    <Divider>Aspects</Divider>
    <AspectBuilder value={aspects} onAdd={addAspect} onRemove={removeAspect} />
    <Divider>Connections</Divider>
    <Controller
      control={control}
      name="poser"
      render={({ field: { ref: _ref, ...field } }) =>
        <Select {...field} label="Poser" options={posers.map(({ id, name }) => ({ id, name }))} clearable />
      }
    />
    <Controller
      control={control}
      name="model"
      render={({ field: { ref: _ref, ...field } }) =>
        <Select {...field} label="Model" options={models.map(({ id, name }) => ({ id, name }))} clearable />
      }
    />
    <Controller
      control={control}
      name="texture"
      render={({ field: { ref: _ref, ...field } }) =>
        <Select {...field} label="Texture" options={textures.map(({ id, name }) => ({ id, name }))} clearable />
      }
    />
    <Button onClick={handleSubmit(handleAdd)}>Add Variation</Button>
  </Stack>
}