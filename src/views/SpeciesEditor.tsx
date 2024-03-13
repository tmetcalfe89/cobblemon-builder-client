import Layout, { MenuHeader, MenuItem } from "../components/Layout";
import { Divider, Button, Stack, Accordion, AccordionSummary, AccordionDetails, Skeleton } from "@mui/material";
import FeatureAccess from "../types/FeatureAccess";
import Species from "../types/Species";
import { useCallback, useMemo } from "react";
import SpecieEditor from "./SpecieEditor";
import WithId from "../types/WithId";
import { ExpandMore } from "@mui/icons-material";
import useBoolean from "../hooks/useBoolean";
import Monster from "../types/Monster";
import Autocomplete from "../components/Autocomplete";
import { Controller, useForm } from "react-hook-form";
import { getSpecies } from "../api/gitlab";

export interface SpeciesEditorProps {
  menuHeaders?: MenuHeader[];
  menuItems?: MenuItem[];
  species: FeatureAccess<Species>;
  monster: WithId<Monster>;
  pokemonNames: { value: string, label: string }[]
}

export default function SpeciesEditor({
  menuHeaders,
  menuItems,
  species,
  monster,
  pokemonNames,
}: SpeciesEditorProps) {
  const [loadingSpecies, { on: startLoadingSpecies, off: stopLoadingSpecies }] = useBoolean(false);
  const [specieOpen, { toggle: toggleSpecie }] = useBoolean(false);
  const specie = useMemo(() => species.list![0], [species]);
  const copyForm = useForm({
    defaultValues: {
      name: ""
    }
  })

  const handleCreateFromName = useCallback(() => species.createFromName!(monster.name), [monster.name, species.createFromName]);

  const handleUpdate = useCallback((newData: WithId<Species>) => {
    species.update(newData.id, newData)
  }, [species]);

  const handleImport = useCallback(async () => {
    const pokemonName = copyForm.getValues("name")
    startLoadingSpecies();
    const copiedSpecies = await getSpecies(pokemonName, { branch: "1.4.1" });
    if (copiedSpecies) {
      const created = await handleCreateFromName();
      await species.update(created.id, {
        ...created,
        species: {
          ...copiedSpecies,
          name: undefined
        }
      })
    }
    stopLoadingSpecies();
  }, [copyForm, handleCreateFromName, species, startLoadingSpecies, stopLoadingSpecies]);

  return <Layout menu={menuItems} menuHeaders={menuHeaders}>
    <Stack gap={1}>
      <Divider>Species</Divider>
      {!specie ?
        (loadingSpecies ? <Skeleton /> : <Stack gap={1}>
          <Button onClick={handleCreateFromName}>Create</Button>
          <Stack direction="row">
            <Controller
              control={copyForm.control}
              name="name"
              render={({ field: { ref: _ref, onChange, ...field } }) =>
                <Autocomplete
                  label="Copy from"
                  options={[""].concat(pokemonNames.map(({ value }) => value))}
                  sx={{ flexGrow: 1 }}
                  onChange={(_, data) => onChange(data)}
                  getOptionLabel={(e) => e || "Please select a value"}
                  {...field}
                />
              }
            />
            <Button onClick={handleImport} disabled={!copyForm.watch("name")}>Import</Button>
          </Stack>
        </Stack>) :
        <Accordion onChange={toggleSpecie} expanded={specieOpen}>
          <AccordionSummary expandIcon={<ExpandMore />}>Species</AccordionSummary>
          <AccordionDetails>
            <SpecieEditor specie={specie} onUpdate={handleUpdate} />
          </AccordionDetails>
        </Accordion>}
      <Divider>Forms</Divider>
    </Stack>
  </Layout>
}