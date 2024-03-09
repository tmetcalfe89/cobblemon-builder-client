import { Accordion, AccordionDetails, AccordionSummary, Button, Chip, Divider, IconButton, Stack, Typography } from "@mui/material";
import Layout, { MenuHeader, MenuItem as MenuItemType } from "../components/Layout";
import FeatureAccess from "../types/FeatureAccess";
import Resolver from "../types/Resolver";
import { useParams } from "react-router-dom";
import { useCallback, useMemo } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import WithId from "../types/WithId";
import { yupResolver } from "@hookform/resolvers/yup";
import ResolverSchema from "../schemas/ResolverSchema";
import { ArrowDownward, ArrowUpward, ExpandMore } from "@mui/icons-material";
import Poser from "../types/Poser";
import Model from "../types/Model";
import Texture from "../types/Texture";
import VariationAdder from "./VariationAdder";
import defaultVariation from "../defaults/Variation";
import Variation from "../types/Variation";
import VariationEditor from "./VariationEditor";

export interface ResolverEditorProps {
  menuHeaders?: MenuHeader[];
  menuItems?: MenuItemType[];
  resolvers: FeatureAccess<Resolver>;
  posers: WithId<Poser>[];
  models: WithId<Model>[];
  textures: WithId<Texture>[];
}

export default function ResolverEditor({ menuHeaders, menuItems, resolvers, models, posers, textures }: ResolverEditorProps) {
  const { resolverId = "-1" } = useParams();
  const originalResolver = useMemo(() => resolvers.list!.find((resolver) => resolver.id === +resolverId), [resolverId, resolvers.list]);
  const { getValues, control, reset, handleSubmit, formState: { isDirty } } = useForm<WithId<Resolver>>({
    defaultValues: originalResolver,
    // resolver: yupResolver(ResolverSchema),
    resolver: async (data, context, options) => {
      // you can debug your validation schema here
      console.log("formData", data)
      console.log(
        "validation result",
        await yupResolver(ResolverSchema)(data, context, options)
      )
      return yupResolver(ResolverSchema)(data, context, options)
    }
  });
  const { append: addVariation, fields: variations, remove: removeVariation, swap: swapVariations } = useFieldArray({
    control,
    name: "resolver.variations"
  })

  const handleAddVariation = useCallback((overrides: Partial<Variation>) => {
    addVariation({
      ...defaultVariation,
      ...overrides
    })
  }, [addVariation]);

  const handleUpdate = useCallback(async (values: WithId<Resolver>) => {
    console.log(values);
    await resolvers.update(values.id, values);
    reset(values);
  }, [reset, resolvers]);

  const handleMoveVariationUp: (i: number) => React.MouseEventHandler<HTMLButtonElement> = useCallback(
    (i: number) =>
      (e) => {
        e.stopPropagation();
        swapVariations(i, i - 1)
      },
    [swapVariations]
  );

  const handleMoveVariationDown: (i: number) => React.MouseEventHandler<HTMLButtonElement> = useCallback(
    (i: number) =>
      (e) => {
        e.stopPropagation();
        swapVariations(i, i + 1)
      },
    [swapVariations]
  );

  if (!originalResolver) return <div>Oops...</div>;

  return <Layout menu={menuItems} menuHeaders={menuHeaders}>
    <Stack sx={{ height: "100%" }} gap={2}>
      <Typography variant="h1">Resolver - {getValues("name")}</Typography>
      <Stack flexGrow={1} gap={1} minHeight={0} flexBasis={0} overflow="auto">
        <Divider>Variations</Divider>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>Add Variation</AccordionSummary>
          <AccordionDetails>
            <Stack gap={1}>
              <VariationAdder onAdd={handleAddVariation} models={models} posers={posers} textures={textures} />
            </Stack>
          </AccordionDetails>
        </Accordion>
        {!!variations && <>
          <Divider />
          {variations.map((variant, i) => {
            const key = variant.aspects.length ? variant.aspects.map(({ key, value }) => `${key}=${value}`) : ["base"]
            return <Accordion key={key.join("|")}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Stack direction="row" gap={1} alignItems="center">
                  <Stack direction="row">
                    <IconButton disabled={i === 0} onClick={handleMoveVariationUp(i)}>
                      <ArrowUpward />
                    </IconButton>
                    <IconButton disabled={i === variations.length - 1} onClick={handleMoveVariationDown(i)}>
                      <ArrowDownward />
                    </IconButton>
                  </Stack>
                  {key.map((aspect) => <Chip label={aspect} />)}
                </Stack>
              </AccordionSummary>
              <AccordionDetails>
                <VariationEditor
                  models={models}
                  posers={posers}
                  textures={textures}
                  control={control}
                  index={i} onDelete={() => removeVariation(i)}
                />
              </AccordionDetails>
            </Accordion>
          })}
        </>}
      </Stack>
      <Stack direction="row" gap={3} justifyContent="stretch" sx={{ "& > *": { flexGrow: 1 } }}>
        <Button disabled={!isDirty} onClick={handleSubmit(handleUpdate)}>Update</Button>
        <Button onClick={() => reset()}>Reset</Button>
      </Stack>
    </Stack>
  </Layout>
}