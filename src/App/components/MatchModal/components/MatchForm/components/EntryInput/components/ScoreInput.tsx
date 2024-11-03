import { forwardRef, ReactNode, ChangeEvent, ChangeEventHandler } from 'react';
import {
  NumericFormat,
  OnValueChange,
  NumericFormatProps,
} from 'react-number-format';
import { InputBaseComponentProps, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { validateScore } from '@utils/validate';

type NumbericFormatCustomProps = InputBaseComponentProps & NumericFormatProps;

type ScoreInputProps = {
  label: ReactNode;
  value: number | null;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

const NumericFormatCustom = forwardRef(function NumericFormatCustom(
  { onChange, ...other }: NumbericFormatCustomProps,
  ref,
) {
  const onValueChange: OnValueChange = ({ value }) => {
    if (onChange) {
      const event = { target: { value } } as ChangeEvent<HTMLInputElement>;
      onChange(event);
    }
  };

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={onValueChange}
      valueIsNumericString
    />
  );
});

export default function ScoreInput({
  onChange,
  value,
  label,
}: ScoreInputProps) {
  return (
    <FormControl sx={{ width: '100%' }}>
      <TextField
        label={label}
        value={value}
        error={!validateScore(value)}
        onChange={onChange}
        InputProps={{ inputComponent: NumericFormatCustom }}
      />
    </FormControl>
  );
}
