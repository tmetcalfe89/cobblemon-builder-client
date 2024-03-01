import { ImageList, List, Stack } from "@mui/material";
import { useCallback } from "react";
import FileInput from "../components/FileInput";
import Layout, { MenuHeader, MenuItem } from "../components/Layout";
import { Feature } from "../hooks/useFeature";

export interface EntryComponentProps<T> {
  entry: T;
  onDelete: (id: number) => void;
}

export interface FeatureViewProps<T> {
  // onUpload: (file: File) => Promise<void>;
  // onDelete: (id: number) => void;
  // list: (T & { id: number })[] | null;
  entryComponent: (props: EntryComponentProps<T & { id: number }>) => JSX.Element;
  imageView?: boolean;
  menuHeaders?: MenuHeader[];
  menuItems?: MenuItem[];
  // onMiniFormSubmit?: (name: string) => Promise<boolean>;
  feature: Feature<T>
}

export default function FeatureView<T>({
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
    <Layout menuHeaders={menuHeaders} menu={menuItems} onMiniFormSubmit={feature.createFromName}>
      <Stack>
        <FileInput onChange={handleFileInputChange} multiple={imageView} filter={imageView ? "image/*" : "application/json"} />
        {imageView ? <ImageList cols={5}>
          {(feature.list || []).map((entry) =>
            <EntryComponent key={entry.id} entry={entry} onDelete={feature.deleteEntry} />
          )}
        </ImageList> : <List>
          {feature.list?.map((entry) => (
            <EntryComponent key={entry.id} entry={entry} onDelete={feature.deleteEntry} />
          ))}
        </List>}
      </Stack>
    </Layout>
  );
}
