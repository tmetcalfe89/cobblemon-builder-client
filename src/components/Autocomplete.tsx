import { Autocomplete as MuiAutocomplete, AutocompleteProps as MuiAutocompleteProps, TextField } from '@mui/material';

type AutocompleteProps<T, Multiple extends boolean | undefined> = Omit<MuiAutocompleteProps<T, Multiple, boolean, boolean>, 'renderInput'> & {
  label: string;
};

const Autocomplete = <T, Multiple extends boolean | undefined = undefined>({
  label,
  ...props
}: AutocompleteProps<T, Multiple>) => {
  return (
    <MuiAutocomplete
      {...props}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
};

export default Autocomplete;
