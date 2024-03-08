import React, { ForwardedRef, forwardRef } from 'react';
import Clear from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField, { TextFieldProps } from '@mui/material/TextField';

interface NullableTextFieldProps extends Omit<TextFieldProps, 'variant'> {
  onClear?: React.MouseEventHandler<HTMLButtonElement>;
}

export default forwardRef(function NullableTextField({ onChange, onClear, ...props }: NullableTextFieldProps, ref: ForwardedRef<HTMLDivElement | null>) {
  return (
    <TextField
      {...props}
      InputProps={{
        ...props.InputProps,
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={onClear}>
              <Clear />
            </IconButton>
          </InputAdornment>
        ),
      }}
      onChange={onChange}
      ref={ref}
    />
  );
})
