import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';

type Props = {
  label: string;
  checked: boolean;
  disabled: boolean;
  onChange: () => void;
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
