import Layout, { MenuHeader, MenuItem } from "../components/Layout";
import { Divider, Button, Stack, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import FeatureAccess from "../types/FeatureAccess";
import Species from "../types/Species";
import { useCallback, useMemo } from "react";
import SpecieEditor from "./SpecieEditor";
import WithId from "../types/WithId";
import { ExpandMore } from "@mui/icons-material";
import useBoolean from "../hooks/useBoolean";
import Monster from "../types/Monster";

export interface SpeciesEditorProps {
  menuHeaders?: MenuHeader[];
  menuItems?: MenuItem[];
  species: FeatureAccess<Species>;
  monster: WithId<Monster>;
}

export default function SpeciesEditor({
  menuHeaders,
  menuItems,
  species,
  monster
}: SpeciesEditorProps) {
  const [specieOpen, { toggle: toggleSpecie }] = useBoolean(false);
  const specie = useMemo(() => species.list![0], [species]);

  const handleUpdate = useCallback((newData: WithId<Species>) => {
    species.update(newData.id, newData)
  }, [species]);

  return <Layout menu={menuItems} menuHeaders={menuHeaders}>
    <Stack gap={1}>
      <Divider>Species</Divider>
      {!specie ?
        <Button onClick={() => species.createFromName!(monster.name)}>Create</Button> :
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