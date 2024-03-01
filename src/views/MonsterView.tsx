import { Route, Routes, useParams } from "react-router-dom";
import Layout, { MenuHeader } from "../components/Layout";
import useAddon from "../hooks/useAddon";
import { useMemo } from "react";
import { Folder, Pets } from "@mui/icons-material";
import AnimationEntry from "../features/AnimationEntry";
import useMonster from "../hooks/useMonster";
import FeatureView from "./FeatureView";
import ModelEntry from "../features/ModelEntry";
import TextureEntry from "../features/TexturesView";

const monsterParts = ["animations", "models", "posers", "resolvers", "textures", "spawns", "species"];

export default function MonsterView() {
  const { addonId = "-1", monsterId = "-1" } = useParams();
  const { addon } = useAddon(+addonId);
  const { monster, animations, models, textures } = useMonster(+monsterId);

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

  const menuItems = useMemo(() => (addon && monster) ? monsterParts.map((part) => ({
    label: part,
    path: `/addons/${addon.id}/monsters/${monster.id}/${part}`
  })) : undefined, [addon, monster]);

  return <Layout
    menuHeaders={menuHeaders}
    menu={menuItems}
  >
    <Routes>
      <Route path="/animations" element={<FeatureView onUpload={animations.createNew} onDelete={animations.deleteEntry} list={animations.list} entryComponent={AnimationEntry} />} />
      <Route path="/models" element={<FeatureView onUpload={models.createNew} onDelete={models.deleteEntry} list={models.list} entryComponent={ModelEntry} />} />
      <Route path="/textures" element={<FeatureView onUpload={textures.createNew} onDelete={textures.deleteEntry} list={textures.list} entryComponent={TextureEntry} imageView />} />
    </Routes>
  </Layout>
}