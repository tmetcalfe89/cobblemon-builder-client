import { Accordion, AccordionDetails, AccordionSummary, Button, Chip, Divider, Stack, Typography } from "@mui/material";
import FeatureAccess from "../types/FeatureAccess";
import Poser from "../types/Poser";
import Layout, { MenuHeader, MenuItem as MenuItemType } from "./Layout";
import { useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import WithId from "../types/WithId";
import NullableTextField from "./NullableTextField";
import NumberField from "./NumberField";
import { ExpandMore } from "@mui/icons-material";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import defaultPose from "../defaults/Pose";
import PoseEditor from "./PoseEditor";
import { yupResolver } from "@hookform/resolvers/yup";
import PoserSchema from "../schemas/PoserSchema";
import PoseAdder from "./PoseAdder";
import NewPose from "../types/NewPose";
import useBoolean from "../hooks/useBoolean";
import Animation from "../types/Animation";
import PremadePoses from "../data/premadePoses";
import Select from "./Select";

export interface PoserEditorProps {
  menuHeaders?: MenuHeader[];
  menuItems?: MenuItemType[];
  posers: FeatureAccess<Poser>;
  animations: FeatureAccess<Animation>;
}

export default function PoserEditor({ menuItems, menuHeaders, posers, animations }: PoserEditorProps) {
  const [adderOpen, { toggle: toggleAdder, off: closeAdder }] = useBoolean(false);
  const { poserId = -1 } = useParams();
  const originalPoser = useMemo(() => posers.list!.find(({ id }) => id === +poserId)!, [posers.list, poserId])
  const { control, register, reset, handleSubmit, getValues, formState: { isDirty } } = useForm<WithId<Poser>>({
    defaultValues: originalPoser,
    resolver: yupResolver(PoserSchema),
    shouldFocusError: false,
    mode: "onTouched"
  });
  const { append, fields, remove } = useFieldArray({
    control,
    name: "poser.poses"
  });

  const handleUpdate = useCallback(async (values: WithId<Poser>) => {
    await posers.update(values.id, values);
    reset(values);
  }, [posers, reset]);

  const addPose = useCallback(({ animation, poseName, premade }: NewPose) => {
    console.log(animation, animations.list);
    append({
      ...defaultPose,
      ...(premade !== undefined ? PremadePoses[premade].data : {}),
      poseName: poseName || animations.list?.find((animationI) => animationI.id === +animation)?.name || "",
      animations: animation !== undefined ? [+animation] : []
    })
    closeAdder();
  }, [animations.list, append, closeAdder]);

  const defaultableAnimations = useMemo(() => animations.list
    ?.filter((animation) => animation.name in PremadePoses && !getValues("poser.poses").some((pose) => pose.poseName === animation.name)), [animations.list, getValues]);

  const animationsList = animations.list;
  if (!animationsList) return <div>Loading...</div>;

  return <Layout menu={menuItems} menuHeaders={menuHeaders}>
    <Stack sx={{ height: "100%" }} gap={2}>
      <Typography variant="h1">Poser - {getValues("name")}</Typography>
      <Stack flexGrow={1} gap={1}>
        <NullableTextField {...register("poser.head")} label="Head" />
        <Divider>Position & Scale</Divider>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>Portrait</AccordionSummary>
          <AccordionDetails>
            <Stack gap={1}>
              <NumberField {...register("poser.portraitScale")} label="Portrait Scale" />
              <Stack direction="row" sx={{ "& > *": { flexGrow: 1 } }}>
                <NumberField {...register("poser.portraitTranslation.0")} label="Portrait Translation X" />
                <NumberField {...register("poser.portraitTranslation.1")} label="Portrait Translation Y" />
                <NumberField {...register("poser.portraitTranslation.2")} label="Portrait Translation Z" />
              </Stack>
            </Stack>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>Profile</AccordionSummary>
          <AccordionDetails>
            <Stack gap={1}>
              <NumberField {...register("poser.profileScale")} label="Profile Scale" />
              <Stack direction="row" sx={{ "& > *": { flexGrow: 1 } }}>
                <NumberField {...register("poser.profileTranslation.0")} label="Profile Translation X" />
                <NumberField {...register("poser.profileTranslation.1")} label="Profile Translation Y" />
                <NumberField {...register("poser.profileTranslation.2")} label="Profile Translation Z" />
              </Stack>
            </Stack>
          </AccordionDetails>
        </Accordion>
        <Divider>Animations</Divider>
        <Controller
          control={control}
          name="poser.faint"
          render={({ field: { ref: _ref, ...field } }) => <Select
            {...field}
            label="Faint"
            options={animationsList.map(({ id, name }) => ({ id, name }))}
            clearable
          />}
        />
        <Controller
          control={control}
          name="poser.cry"
          render={({ field: { ref: _ref, ...field } }) => <Select
            {...field}
            label="Cry"
            options={animationsList.map(({ id, name }) => ({ id, name }))}
            clearable
          />}
        />
        <Divider>Poses</Divider>
        {!!fields.length && <>
          {fields.map((pose, i) =>
            <Accordion key={pose.id}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Stack direction="row" gap={1} alignItems="center">
                  <Typography>Pose</Typography>
                  <Chip label={pose.poseName || pose.id} />
                </Stack>
              </AccordionSummary>
              <AccordionDetails>
                <PoseEditor onDelete={() => remove(i)} index={i} register={register} control={control} animations={animations.list} />
              </AccordionDetails>
            </Accordion>
          )}
          <Divider />
        </>}
        {defaultableAnimations
          ?.map((animation) => <Button variant="outlined" sx={{ textAlign: "start" }} onClick={() => addPose({ animation: animation.id, poseName: animation.name, premade: animation.name })}>Create Default for {animation.name}</Button>)}
        <Accordion expanded={adderOpen} onChange={toggleAdder}>
          <AccordionSummary expandIcon={<ExpandMore />}>Add Pose</AccordionSummary>
          <AccordionDetails>
            <PoseAdder onAdd={addPose} animations={animations.list} />
          </AccordionDetails>
        </Accordion>
      </Stack>
      <Stack direction="row" gap={3} justifyContent="stretch" sx={{ "& > *": { flexGrow: 1 } }}>
        <Button disabled={!isDirty} onClick={handleSubmit(handleUpdate)}>Update</Button>
        <Button onClick={() => reset()}>Reset</Button>
      </Stack>
    </Stack>
  </Layout>
}

