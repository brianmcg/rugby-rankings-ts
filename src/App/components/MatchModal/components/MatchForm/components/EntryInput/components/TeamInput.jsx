import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { validateTeam } from '@utils/validate';

export default function TeamInput({ options, value, label, onChange }) {
  return (
    <Autocomplete
      sx={{ width: '100%' }}
      onChange={onChange}
      disablePortal
      value={value}
      options={options}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <TextField
          {...params}
          error={!validateTeam(value)}
          label={label}
        />
      )}
    />
  );
}
