import React from 'react';
import { FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select as MuiSelect, SelectChangeEvent } from "@mui/material";
import { SelectProps as MuiSelectProps, SelectVariants } from '@mui/material/Select';
import { Clear } from '@mui/icons-material';

interface SelectOption {
  id: string | number;
  name: string;
}

interface SelectProps extends Omit<MuiSelectProps<string | number>, 'onChange' | 'value' | 'label' | 'variant'> {
  value?: string | number;
  label: string;
  options: SelectOption[];
  onChange: (event: SelectChangeEvent<string | number>, child: React.ReactNode) => void;
  clearable?: boolean;
  defaultValue?: string | number;
  variant?: SelectVariants;
}

const Select: React.FC<SelectProps> = ({ label, options, onChange, clearable, variant = "outlined", value, sx, ...props }) => {
  const handleClear = () => {
    onChange({ target: { value: "" } } as SelectChangeEvent<string | number>, null);
  };

  return (
    <FormControl variant={variant} sx={sx}>
      <InputLabel>{label}</InputLabel>
      <MuiSelect
        {...props}
        label={label}
        variant={variant}
        value={value || ""}
        onChange={onChange}
        endAdornment={clearable && value ? <InputAdornment position="end">
          <IconButton onClick={handleClear}>
            <Clear />
          </IconButton>
        </InputAdornment> : undefined}
        IconComponent={clearable && value ? "span" : undefined}
      >
        {options.map(({ id, name }) => (
          <MenuItem value={id} key={id}>{name}</MenuItem>
        ))}
      </MuiSelect>
    </FormControl >
  );
}

export default Select;
