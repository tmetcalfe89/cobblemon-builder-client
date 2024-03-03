import { Route, Routes, useParams } from "react-router-dom";
import Layout, { MenuHeader, MenuItem } from "../components/Layout";
import useAddon from "../hooks/useAddon";
import { useMemo } from "react";
import { Folder, Pets } from "@mui/icons-material";
import useMonster from "../hooks/useMonster";
import FeatureView from "./FeatureView";
import FeatureEntry from "../components/FeatureEntry";
import ImageEntry from "../components/ImageEntry";

const monsterParts = ["animations", "models", "posers", "resolvers", "textures", "spawns", "species"];

export default function MonsterView() {
  const { addonId = "-1", monsterId = "-1" } = useParams();
  const { addon } = useAddon(+addonId);
  const { monster, animations, models, textures, posers } = useMonster(+monsterId);

  const menuHeaders = useMemo<MenuHeader[] | undefined>(() => (addon && monster) ? ([
    {
      label: addon.name,
      path: `/addons/${addon.id}`,
      icon: <Folder />,
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
    <Route path="/textures" element={<FeatureView menuHeaders={menuHeaders} menuItems={menuItems} feature={textures} entryComponent={ImageEntry} imageView />} />
    <Route path="*" element={<Layout menuHeaders={menuHeaders} menu={menuItems} />} />
  </Routes>
}