import { TextField, TextFieldProps } from "@mui/material";
import { ForwardedRef, forwardRef, useMemo } from "react";

interface NumberFieldProps extends Omit<TextFieldProps, 'variant'> { }

export default forwardRef(function NumberField({ value, error, ...props }: NumberFieldProps, ref: ForwardedRef<HTMLDivElement | null>) {
  const isErrored = useMemo(() => {
    return (value !== null && value !== undefined) ? Number.isNaN(+value) : false
  }, [value]);

  return <TextField {...props} value={value} error={error || isErrored} ref={ref} />
})