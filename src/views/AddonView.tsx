import { useParams } from "react-router-dom";
import Layout, { MenuHeader, MenuItem } from "../components/Layout";
import useAddon from "../hooks/useAddon";
import { useCallback, useMemo } from "react";
import { Delete, Folder } from "@mui/icons-material";

export default function AddonView() {
  const { addonId = "-1" } = useParams();
  const { addon, monsters, createMonster, deleteMonster } = useAddon(+addonId)

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
    icon: <Folder />
  }]) : undefined,
    [addon]
  );

  const handleCreateMonster = useCallback(async (name: string) => {
    if (!name) return false;
    try {
      await createMonster(name);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }, [createMonster]);

  return <Layout
    menu={menuItems}
    onMiniFormSubmit={handleCreateMonster}
    miniFormLabel="Create new monster"
    menuHeaders={menuHeaders}
  >
    <></>
  </Layout>
}