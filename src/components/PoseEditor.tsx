import { Button, Stack, TextField } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { Control, Controller, UseFormRegister } from "react-hook-form";
import NumberField from "./NumberField";
import { getEnumValues } from "../util/tsUtil.ts";
import { PoseType } from "../data/poseType.ts";
import Autocomplete from "./Autocomplete.tsx";
import WithId from "../types/WithId";
import Poser from "../types/Poser";
import Animation from "../types/Animation";

export interface PoseEditorProps {
  onDelete: () => void;
  register: UseFormRegister<WithId<Poser>>;
  control: Control<WithId<Poser>>;
  index: number;
  animations: WithId<Animation>[] | null;
}

const prefix = "poser.poses.";

export default function PoseEditor({ onDelete, register, control, index, animations }: PoseEditorProps) {
  if (!animations) return <div>Loading...</div>;

  return <Stack gap={1}>
    <TextField {...register(`${prefix}${index}.poseName`)} label="Name" />
    <NumberField {...register(`${prefix}${index}.transformTicks`)} label="Transform Ticks" />
    <Controller
      name={`${prefix}${index}.poseTypes`}
      control={control}
      render={({ field: { ref: _ref, ...field } }) => <Autocomplete
        {...field}
        options={getEnumValues(PoseType)}
        onChange={(_, data) => field.onChange(data)}
        label="Pose Types"
        multiple
      />}
    />
    {/* <Controller
      name={`${prefix}${index}.isBattle`}
      control={control}
      render={({ field: { ref: _ref, value, ...field } }) => <FormControlLabel control={<Switch {...field} checked={value} />} label="Battle Pose" />}
    /> */}
    <Controller
      name={`${prefix}${index}.animations`}
      control={control}
      render={({ field: { ref: _ref, ...field } }) => <Autocomplete
        {...field}
        options={animations.map(({ id }) => id)}
        onChange={(_, data) => {
          field.onChange(data);
        }}
        label="Animations"
        multiple
        getOptionLabel={(id) => animations.find((animation) => animation.id === id)!.name}
      />}
    />

    <Button onClick={onDelete}><Delete /></Button>
  </Stack>
}