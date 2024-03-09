import { yupResolver } from "@hookform/resolvers/yup";
import { Button, SelectChangeEvent, Stack, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import NewPose from "../types/NewPose";
import { ReactNode, useCallback } from "react";
import WithId from "../types/WithId";
import Animation from "../types/Animation";
import PremadePoses from "../data/premadePoses";
import Select from "../components/Select";

const PoseAdderSchema = yup.object().shape({
  poseName: yup.string(),
  animation: yup.string().required(),
  premade: yup.string(),
});

export interface PoseAdderProps {
  onAdd: (newPose: NewPose) => void;
  animations: WithId<Animation>[] | null;
}

export default function PoseAdder({ onAdd, animations }: PoseAdderProps) {
  const { handleSubmit, register, reset, control, setValue } = useForm({
    defaultValues: {
      poseName: "",
      animation: "",
      premade: ""
    },
    resolver: yupResolver(PoseAdderSchema),
    shouldFocusError: false
  });

  const handleAdd = useCallback((newPose: NewPose) => {
    onAdd(newPose);
    reset();
  }, [onAdd, reset]);

  const handleAnimationChange = useCallback((cb: (event: SelectChangeEvent<string | number>, child: ReactNode) => void) => (event: SelectChangeEvent<string | number>, child: ReactNode) => {
    const value = animations?.find((animation) => animation.id === +event.target.value)?.name;
    console.log(value);
    if (value && value in PremadePoses) {
      setValue("premade", value);
    }
    cb(event, child);
  }, [animations, setValue]);

  if (!animations) return <div>Loading...</div>;

  return <Stack gap={1} component="form" onSubmit={handleSubmit(handleAdd)}>
    <TextField label="Name" {...register("poseName", { required: true })} />
    <Controller
      control={control}
      name="animation"
      render={({ field: { ref: _ref, onChange, ...field } }) =>
        <Select {...field} onChange={handleAnimationChange(onChange)} label="Animation" options={animations.map(({ id, name }) => ({ id, name }))} />}
    />
    <Controller
      control={control}
      name="premade"
      render={({ field: { ref: _ref, ...field } }) =>
        <Select {...field} label="Premade" options={Object.entries(PremadePoses).map(([key, { name }]) => ({ id: key, name }))} />}
    />
    <Button type="submit">Add Pose</Button>
  </Stack>
}