import { TextField } from "@mui/material";
import { useCallback, useEffect, useState } from "react";

export interface JsonInputProps {
  value: object;
  onChange: (newValue: string) => void;
}

export default function JsonInput({ value, onChange }: JsonInputProps) {
  const [innerValue, setInnerValue] = useState<string>(JSON.stringify(value, null, 2));
  const [jsonError, setJsonError] = useState<string | null>(null);

  useEffect(() => {
    setInnerValue(JSON.stringify(value, null, 2));
  }, [value]);

  const handleChange = useCallback(() => {
    try {
      onChange(JSON.parse(innerValue));
      setJsonError(null);
    } catch (error) {
      console.error(error);
      const e = error as Error;
      setJsonError(e.message)
    }
  }, [innerValue, onChange]);

  return <TextField
    value={innerValue}
    multiline
    onChange={(evt) => setInnerValue(evt.target.value)}
    onBlur={handleChange}
    helperText={jsonError}
    error={!!jsonError}
    maxRows={5}
  />
}