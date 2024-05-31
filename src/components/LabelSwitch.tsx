import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';

type LabelSwitchProps = {
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>, isNeutralVenue: boolean) => void;
  disabled: boolean;
};

export default function LabelSwitch(props: LabelSwitchProps) {
  const { label, checked, onChange, disabled } = props;

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
