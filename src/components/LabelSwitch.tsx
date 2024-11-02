import { ReactNode, SyntheticEvent } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';

type Props = {
  label: ReactNode;
  checked: boolean;
  disabled?: boolean;
  onChange: (e: SyntheticEvent, isSelected: boolean) => void;
};

export default function LabelSwitch({
  label,
  checked,
  onChange,
  disabled,
}: Props) {
  return (
    <FormGroup>
      <FormControlLabel
        disabled={disabled}
        control={<Switch checked={checked} onChange={onChange} />}
        label={<Typography variant="caption">{label}</Typography>}
      />
    </FormGroup>
  );
}
