import Layout from "../components/Layout";
import useAccount from "../hooks/useAccount";
import { useCallback, useMemo } from "react";

export default function AccountView() {
  const { addons, createAddon } = useAccount();

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

  const menuItems = useMemo(() =>
    addons?.map(({ id, name }) => ({
      label: name,
      path: `/addons/${id}`
    })),
    [addons]
  )

  return <Layout
    menu={menuItems}
    onMiniFormSubmit={handleCreateAddon}
    miniFormLabel="Create new addon"
  >
    <></>
  </Layout>;
}