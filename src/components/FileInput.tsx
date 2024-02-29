import { CloudUpload } from "@mui/icons-material";
import { Button, Input } from "@mui/material";

export interface FileInputProps {
  onChange?: React.ChangeEventHandler<HTMLInputElement>,
}

export default function FileInput({ onChange }: FileInputProps) {
  return <Button
    component="label"
    role={undefined}
    variant="contained"
    tabIndex={-1}
    startIcon={<CloudUpload />}
  >
    Upload file
    <Input type="file" sx={{ display: "none" }} onChange={onChange} />
  </Button>
}