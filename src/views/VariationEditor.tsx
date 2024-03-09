import { Button, Divider, Stack } from "@mui/material";
import Model from "../types/Model";
import Poser from "../types/Poser";
import Texture from "../types/Texture";
import WithId from "../types/WithId";
import { Control, Controller, useFieldArray } from "react-hook-form";
import Select from "../components/Select";
import AspectBuilder from "./AspectBuilder";
import Resolver from "../types/Resolver";
import { Delete } from "@mui/icons-material";

export interface VariationEditorProps {
  onDelete: () => void;
  control: Control<WithId<Resolver>>;
  index: number;
  posers: WithId<Poser>[];
  models: WithId<Model>[];
  textures: WithId<Texture>[];
}

const prefix = "resolver.variations";

export default function VariationEditor({ models, posers, textures, control, index, onDelete }: VariationEditorProps) {
  const { append: addAspect, fields: aspects, remove: removeAspect } = useFieldArray({
    control,
    name: `${prefix}.${index}.aspects`
  });

  return <Stack gap={1}>
    <Divider>Aspects</Divider>
    <AspectBuilder value={aspects} onAdd={addAspect} onRemove={removeAspect} />
    <Divider>Connections</Divider>
    <Controller
      control={control}
      name={`${prefix}.${index}.poser`}
      render={({ field: { ref: _ref, ...field } }) =>
        <Select {...field} label="Poser" options={posers.map(({ id, name }) => ({ id, name }))} clearable />
      }
    />
    <Controller
      control={control}
      name={`${prefix}.${index}.model`}
      render={({ field: { ref: _ref, ...field } }) =>
        <Select {...field} label="Model" options={models.map(({ id, name }) => ({ id, name }))} clearable />
      }
    />
    <Controller
      control={control}
      name={`${prefix}.${index}.texture`}
      render={({ field: { ref: _ref, ...field } }) =>
        <Select {...field} label="Texture" options={textures.map(({ id, name }) => ({ id, name }))} clearable />
      }
    />
    <Button onClick={onDelete}><Delete /></Button>
  </Stack>
}