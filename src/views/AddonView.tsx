import { useParams } from "react-router-dom";
import Layout, { MenuHeader, MenuItem } from "../components/Layout";
import useAddon from "../hooks/useAddon";
import { useCallback, useMemo } from "react";
import { Delete, Download, Folder } from "@mui/icons-material";
import AddonEditor from "./AddonEditor";
import { Skeleton } from "@mui/material";
import { exportAddon } from "../util/addon";

export default function AddonView() {
  const { addonId = "-1" } = useParams();
  const { addon, monsters, updateAddon, createMonster, deleteMonster } = useAddon(+addonId)

  const menuItems = useMemo<MenuItem[] | undefined>((): MenuItem[] | undefined =>
    monsters?.map(({ id, addonId, name }) => ({
      label: name,
      path: `/addons/${addonId}/monsters/${id}`,
      icon: <Delete />,
      onIconClick: () => deleteMonster(id)
    })),
    [deleteMonster, monsters]
  );

  const menuHeaders = useMemo<MenuHeader[] | undefined>(() => addon ? ([{
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
  }]) : undefined,
    [addon]
  );

  const handleCreateMonster = useCallback(async (name: string) => await createMonster(name), [createMonster]);

  return <Layout
    menu={menuItems}
    onMiniFormSubmit={handleCreateMonster}
    miniFormLabel="Create new monster"
    menuHeaders={menuHeaders}
  >
    {addon ? <AddonEditor addon={addon} onUpdate={updateAddon} /> : <Skeleton />}
  </Layout>
}