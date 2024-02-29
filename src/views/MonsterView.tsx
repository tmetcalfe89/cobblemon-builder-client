import { Route, Routes, useParams } from "react-router-dom";
import Layout, { MenuHeader } from "../components/Layout";
import useAddon from "../hooks/useAddon";
import { useMemo } from "react";
import { Folder, Pets } from "@mui/icons-material";
import AnimationsView from "./AnimationsView";
import ModelsView from "./ModelsView";
import useMonster from "../hooks/useMonster";

const monsterParts = ["animations", "models", "posers", "resolvers", "textures", "spawns", "species"];

export default function MonsterView() {
  const { addonId = "-1", monsterId = "-1" } = useParams();
  const { addon } = useAddon(+addonId);
  const { monster, animations, uploadAnimation, models, uploadModel } = useMonster(+monsterId);

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
      <Route path="/animations" element={<AnimationsView onUpload={uploadAnimation} animations={animations} />} />
      <Route path="/models" element={<ModelsView onUpload={uploadModel} models={models} />} />
    </Routes>
  </Layout>
}