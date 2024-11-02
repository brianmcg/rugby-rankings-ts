import { ReactNode } from 'react';
import Button from '@mui/material/Button';
import Translate from '@components/Translate';

type Props = {
  icon: ReactNode;
  label: string;
  disabled?: boolean;
  onClick: () => void;
};

export default function MenuButton({
  icon,
  onClick,
  label,
  disabled = false,
}: Props) {
  return (
    <Button
      disabled={disabled}
      sx={{
        p: 0,
        opacity: 0.75,
        '&:hover': { opacity: 1 },
        '&:disabled': { opacity: 0 },
      }}
      color="inherit"
      startIcon={icon}
      onClick={onClick}
    >
      <Translate text={label} />
    </Button>
  );
}
