import { AutocompleteChangeReason, AutocompleteValue, Autocomplete as MuiAutocomplete, AutocompleteProps as MuiAutocompleteProps, TextField } from '@mui/material';
import { useCallback } from 'react';

type AutocompleteProps<T, Multiple extends boolean | undefined, DisableClearable extends boolean | undefined, FreeSolo extends boolean | undefined> = Omit<MuiAutocompleteProps<T, Multiple, DisableClearable, FreeSolo>, 'renderInput'> & {
  label: string;
  maxCount?: number;
};

const Autocomplete = <T, Multiple extends boolean | undefined, DisableClearable extends boolean | undefined, FreeSolo extends boolean | undefined>({
  label,
  maxCount,
  onChange,
  value,
  ...props
}: AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>) => {
  const handleChange = useCallback((event: React.SyntheticEvent,
    newValue: AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>,
    reason: AutocompleteChangeReason) => {
    if (reason === 'selectOption' && !!maxCount && Array.isArray(value) && value.length >= maxCount) {
      event.stopPropagation();
      return;
    }
    if (onChange) {
      onChange(event, newValue, reason);
    }
  }, [maxCount, onChange, value]);

  return (
    <MuiAutocomplete
      {...props}
      onChange={handleChange}
      value={value}
      renderInput={(params) => <TextField {...params} label={label} />}
      disableCloseOnSelect
    />
  );
};

export default Autocomplete;
