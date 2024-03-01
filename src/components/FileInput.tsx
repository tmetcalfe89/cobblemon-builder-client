import { CloudUpload } from "@mui/icons-material";
import { Button } from "@mui/material";

export interface FileInputProps {
  onChange?: React.ChangeEventHandler<HTMLInputElement>,
  multiple?: boolean,
  filter?: string | string[],
}

export default function FileInput({ onChange, multiple, filter }: FileInputProps) {
  return <Button
    component="label"
    role={undefined}
    variant="contained"
    tabIndex={-1}
    startIcon={<CloudUpload />}
  >
    Upload file
    <input type="file" style={{ display: "none" }} onChange={onChange} multiple={multiple} accept={Array.isArray(filter) ? filter.join(",") : filter} />
  </Button>
}