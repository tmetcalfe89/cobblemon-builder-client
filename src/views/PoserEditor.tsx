import { Accordion, AccordionDetails, AccordionSummary, Button, Chip, Divider, Stack, Typography } from "@mui/material";
import FeatureAccess from "../types/FeatureAccess";
import Poser from "../types/Poser";
import Layout, { MenuHeader, MenuItem as MenuItemType } from "../components/Layout";
import { useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import WithId from "../types/WithId";
import NullableTextField from "../components/NullableTextField";
import NumberField from "../components/NumberField";
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
import Select from "../components/Select";

export interface PoserEditorProps {
  menuHeaders?: MenuHeader[];
  menuItems?: MenuItemType[];
  posers: FeatureAccess<Poser>;
  animations: WithId<Animation>[];
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

  const addPose = useCallback(({ animation, poseName, premade }: NewPose, { keepOpen }: { keepOpen: boolean } = { keepOpen: false }) => {
    append({
      ...defaultPose,
      ...(premade !== undefined ? PremadePoses[premade].data : {}),
      poseName: poseName || animations.find((animationI) => animationI.id === +animation)?.name || "",
      animations: animation !== undefined ? [+animation] : []
    })
    if (!keepOpen) {
      closeAdder();
    }
  }, [animations, append, closeAdder]);

  const poses = getValues("poser.poses");
  const defaultableAnimations = useMemo(() => animations
    ?.filter((animation) => animation.name in PremadePoses && !poses.some((pose) => pose.poseName === animation.name)),
    [animations, poses]);

  return <Layout menu={menuItems} menuHeaders={menuHeaders}>
    <Stack sx={{ height: "100%" }} gap={2}>
      <Typography variant="h1">Poser - {getValues("name")}</Typography>
      <Stack flexGrow={1} gap={1} minHeight={0} flexBasis={0} overflow="auto">
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
            options={animations.map(({ id, name }) => ({ id, name }))}
            clearable
          />}
        />
        <Controller
          control={control}
          name="poser.cry"
          render={({ field: { ref: _ref, ...field } }) => <Select
            {...field}
            label="Cry"
            options={animations.map(({ id, name }) => ({ id, name }))}
            clearable
          />}
        />
        <Divider>Poses</Divider>
        <Accordion expanded={adderOpen} onChange={toggleAdder}>
          <AccordionSummary expandIcon={<ExpandMore />}>Add Pose</AccordionSummary>
          <AccordionDetails>
            <Stack gap={1}>
              <Stack direction="row" gap={1}>
                {defaultableAnimations
                  ?.map((animation) =>
                    <Button
                      key={animation.id}
                      variant="outlined"
                      sx={{ textAlign: "start" }}
                      onClick={() => addPose({ animation: animation.id, poseName: animation.name, premade: animation.name }, { keepOpen: true })}>{animation.name}</Button>)}
              </Stack>
              <PoseAdder onAdd={addPose} animations={animations} />
            </Stack>
          </AccordionDetails>
        </Accordion>
        {!!fields.length && <>
          <Divider />
          {fields.map((pose, i) =>
            <Accordion key={pose.id}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Stack direction="row" gap={1} alignItems="center">
                  <Typography>Pose</Typography>
                  <Chip label={pose.poseName || pose.id} />
                </Stack>
              </AccordionSummary>
              <AccordionDetails>
                <PoseEditor onDelete={() => remove(i)} index={i} register={register} control={control} animations={animations} />
              </AccordionDetails>
            </Accordion>
          )}
        </>}
      </Stack>
      <Stack direction="row" gap={3} justifyContent="stretch" sx={{ "& > *": { flexGrow: 1 } }}>
        <Button disabled={!isDirty} onClick={handleSubmit(handleUpdate)}>Update</Button>
        <Button onClick={() => reset()}>Reset</Button>
      </Stack>
    </Stack>
  </Layout>
}

