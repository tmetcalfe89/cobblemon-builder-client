import { Route, Routes, useParams } from "react-router-dom";
import Layout, { MenuHeader, MenuItem } from "../components/Layout";
import useAddon from "../hooks/useAddon";
import { useMemo } from "react";
import { Download, Folder, Pets } from "@mui/icons-material";
import useMonster from "../hooks/useMonster";
import FeatureView from "./FeatureView";
import FeatureEntry from "./FeatureEntry";
import ImageEntry from "./ImageEntry";
import PoserEditor from "./PoserEditor";
import Loading from "../components/Loading";
import ResolverEditor from "./ResolverEditor";
import SpeciesEditor from "./SpeciesEditor";
import useGitlab from "../hooks/useGitlab";
import { exportAddon } from "../util/addon";

const monsterParts = ["animations", "models", "posers", "resolvers", "textures", "species", "spawns"];

export default function MonsterView() {
  const { addonId = "-1", monsterId = "-1" } = useParams();
  const { addon } = useAddon(+addonId);
  const { monster, animations, models, textures, posers, resolvers, species } = useMonster(+monsterId);
  const { pokemonNames } = useGitlab();

  const menuHeaders = useMemo<MenuHeader[] | undefined>(() => (addon && monster) ? ([
    {
      label: addon.name,
      path: `/addons/${addon.id}`,
      icon: <Folder />,
      actions: [
        {
          icon: <Download />,
          label: "Export",
          onAct: () => exportAddon(addon.id)
        }
      ]
    },
    {
      label: monster.name,
      path: `/addons/${addon.id}/monsters/${monster.id}`,
      icon: <Pets />,
    },
  ]) : undefined,
    [addon, monster]
  );

  const menuItems = useMemo((): MenuItem[] | undefined => (addon && monster) ? monsterParts.map((part) => ({
    label: part,
    path: `/addons/${addon.id}/monsters/${monster.id}/${part}`
  })) : undefined, [addon, monster]);

  return <Routes>
    <Route index element={<Layout menuHeaders={menuHeaders} menu={menuItems} />} />
    <Route path="/animations" element={<FeatureView menuHeaders={menuHeaders} menuItems={menuItems} feature={animations} entryComponent={FeatureEntry} />} />
    <Route path="/models" element={<FeatureView menuHeaders={menuHeaders} menuItems={menuItems} feature={models} entryComponent={FeatureEntry} />} />
    <Route path="/posers" element={<FeatureView menuHeaders={menuHeaders} menuItems={menuItems} feature={posers} entryComponent={FeatureEntry} />} />
    <Route path="/posers/:poserId" element={<Loading loading={!(posers?.list && animations?.list)} render={() => <PoserEditor menuHeaders={menuHeaders} menuItems={menuItems} posers={posers} animations={animations.list!} />} />} />
    <Route path="/resolvers" element={<FeatureView menuHeaders={menuHeaders} menuItems={menuItems} feature={resolvers} entryComponent={FeatureEntry} />} />
    <Route path="/resolvers/:resolverId" element={<Loading loading={!(resolvers?.list && posers?.list && models?.list && textures?.list)} render={() => <ResolverEditor menuHeaders={menuHeaders} menuItems={menuItems} resolvers={resolvers} posers={posers.list!} models={models.list!} textures={textures.list!} />} />} />
    <Route path="/textures" element={<FeatureView menuHeaders={menuHeaders} menuItems={menuItems} feature={textures} entryComponent={ImageEntry} imageView />} />
    <Route path="/species" element={<Loading loading={!(species?.list && monster && pokemonNames)} render={() => <SpeciesEditor menuHeaders={menuHeaders} menuItems={menuItems} species={species} monster={monster!} pokemonNames={pokemonNames} />} />} />
    <Route path="*" element={<Layout menuHeaders={menuHeaders} menu={menuItems} />} />
  </Routes>
}