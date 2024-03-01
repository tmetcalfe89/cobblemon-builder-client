import { Delete } from "@mui/icons-material";
import Layout, { MenuItem } from "../components/Layout";
import useAccount from "../hooks/useAccount";
import { useCallback, useMemo } from "react";

export default function AccountView() {
  const { addons, createAddon, deleteAddon } = useAccount();

  const handleCreateAddon = useCallback(async (name: string) => {
    if (!name) return false;
    try {
      await createAddon(name);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }, [createAddon]);

  const menuItems = useMemo<MenuItem[] | undefined>((): MenuItem[] | undefined =>
    addons?.map(({ id, name }) => ({
      label: name,
      path: `/addons/${id}`,
      icon: <Delete />,
      onIconClick: () => deleteAddon(id),
    })),
    [addons, deleteAddon]
  )

  return <Layout
    menu={menuItems}
    onMiniFormSubmit={handleCreateAddon}
    miniFormLabel="Create new addon"
  >
    <></>
  </Layout>;
}