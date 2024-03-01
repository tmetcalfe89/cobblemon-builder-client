import { ImageList, List, Stack } from "@mui/material";
import { useCallback } from "react";
import FileInput from "../components/FileInput";

export interface EntryComponentProps<T> {
  entry: T;
  onDelete: (id: number) => void;
}

export interface FeatureViewProps<T> {
  onUpload: (file: File) => Promise<void>;
  onDelete: (id: number) => void;
  list: (T & { id: number })[] | null;
  entryComponent: (props: EntryComponentProps<T & { id: number }>) => JSX.Element;
  imageView?: boolean;
}

export default function FeatureView<T>({
  onUpload,
  onDelete,
  list,
  entryComponent: EntryComponent,
  imageView
}: FeatureViewProps<T>) {
  const handleFileInputChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    async (event) => {
      if (event.target.files) {
        for (const file of event.target.files) {
          await onUpload(file);
        }
      }
    },
    [onUpload]
  );

  return (
    <Stack>
      <FileInput onChange={handleFileInputChange} multiple={imageView} filter={imageView ? "image/*" : "application/json"} />
      {imageView ? <ImageList cols={5}>
        {(list || []).map((entry) =>
          <EntryComponent key={entry.id} entry={entry} onDelete={onDelete} />
        )}
      </ImageList> : <List>
        {list?.map((entry) => (
          <EntryComponent key={entry.id} entry={entry} onDelete={onDelete} />
        ))}
      </List>}
    </Stack>
  );
}
