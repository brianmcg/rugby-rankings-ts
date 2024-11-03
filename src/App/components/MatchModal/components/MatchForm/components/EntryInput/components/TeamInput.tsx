import { ReactNode, SyntheticEvent } from 'react';
import TextField from '@mui/material/TextField';
import { Autocomplete } from '@mui/material';
import { validateTeam } from '@utils/validate';
import type { Team } from '@constants/types';

type Props = {
  options: Array<Team>;
  label: ReactNode;
  value: Team | null;
  onChange: (event: SyntheticEvent, value: Team | null) => void;
};

export default function TeamInput({ options, value, label, onChange }: Props) {
  return (
    <Autocomplete
      sx={{ width: '100%' }}
      onChange={onChange}
      disablePortal
      value={value}
      options={options}
      getOptionLabel={option => option.name ?? ''}
      renderInput={params => (
        <TextField {...params} error={!validateTeam(value)} label={label} />
      )}
    />
  );
}
