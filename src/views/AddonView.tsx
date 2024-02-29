import { useParams } from "react-router-dom";
import Layout, { MenuHeader } from "../components/Layout";
import useAddon from "../hooks/useAddon";
import { useCallback, useMemo } from "react";
import { Folder } from "@mui/icons-material";

export default function AddonView() {
  const { addonId = "-1" } = useParams();
  const { addon, monsters, createMonster } = useAddon(+addonId)

  const menuItems = useMemo(() =>
    monsters?.map(({ id, addonId, name }) => ({
      label: name,
      path: `/addons/${addonId}/monsters/${id}`
    })),
    [monsters]
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