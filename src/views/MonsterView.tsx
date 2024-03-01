import { Route, Routes, useParams } from "react-router-dom";
import Layout, { MenuHeader } from "../components/Layout";
import useAddon from "../hooks/useAddon";
import { useMemo } from "react";
import { Folder, Pets } from "@mui/icons-material";
import AnimationsView from "./AnimationsView";
import ModelsView from "./ModelsView";
import useMonster from "../hooks/useMonster";
import TexturesView from "./TexturesView";

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
      <Route path="/animations" element={<AnimationsView onUpload={animations.createNew} animations={animations.list} />} />
      <Route path="/models" element={<ModelsView onUpload={models.createNew} models={models.list} />} />
      <Route path="/textures" element={<TexturesView onUpload={textures.createNew} textures={textures.list} />} />
    </Routes>
  </Layout>
}