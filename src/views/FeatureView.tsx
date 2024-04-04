import { ImageList, List, Stack } from "@mui/material";
import { useCallback } from "react";
import FileInput from "../components/FileInput";
import Layout, { MenuHeader, MenuItem } from "../components/Layout";
import FeatureAccess from "../types/FeatureAccess";
import { FeatureEntryProps } from "./FeatureEntry";
import Feature from "../types/Feature";

export interface FeatureViewProps<T extends Feature> {
  entryComponent: (props: FeatureEntryProps<T>) => JSX.Element;
  imageView?: boolean;
  menuHeaders?: MenuHeader[];
  menuItems?: MenuItem[];
  feature: FeatureAccess<T>;
}

export default function FeatureView<T extends Feature>({
  entryComponent: EntryComponent,
  imageView,
  feature,
  menuHeaders,
  menuItems,
}: FeatureViewProps<T>) {
  const handleFileInputChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    async (event) => {
      if (event.target.files) {
        for (const file of event.target.files) {
          await feature.createFromFile(file);
        }
      }
    },
    [feature]
  );

  return (
    <Layout menuHeaders={menuHeaders} menu={menuItems} onMiniFormSubmit={feature?.createFromName}>
      <Stack>
        <FileInput onChange={handleFileInputChange} multiple={imageView} filter={imageView ? "image/*" : "application/json"} />
        {imageView ? <ImageList cols={5}>
          {(feature.list || []).map((entry) =>
            <EntryComponent key={entry.id} entry={entry} onDelete={feature.deleteEntry} onRename={feature.rename} />
          )}
        </ImageList> : <List>
          {feature.list?.map((entry) => (
            <EntryComponent key={entry.id} entry={entry} onDelete={feature.deleteEntry} onRename={feature.rename} />
          ))}
        </List>}
      </Stack>
    </Layout>
  );
}
