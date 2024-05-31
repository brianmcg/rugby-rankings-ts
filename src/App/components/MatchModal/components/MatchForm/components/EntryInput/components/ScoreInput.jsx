import { forwardRef } from 'react';
import { NumericFormat } from 'react-number-format';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { validateScore } from '@utils/validate';

const NumericFormatCustom = forwardRef(
  function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        valueIsNumericString
      />
    );
  },
);

export default function ScoreInput({ onChange, value, label }) {
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
