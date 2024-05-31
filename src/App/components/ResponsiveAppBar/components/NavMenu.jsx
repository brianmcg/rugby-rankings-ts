import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import MenuButton from './MenuButton';

export default function NavMenu({ options, disabled }) {
  return (
    <Box
      alignItems="center"
      justifyContent="flex-end"
      sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' } }}
    >
      <Stack direction="row" spacing={2}>
        {options.map(({ icon, onClick, label }) => (
          <Box key={label}>
            <MenuButton
              key={label}
              icon={icon}
              label={label}
              disabled={disabled}
              onClick={onClick}
            />
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
