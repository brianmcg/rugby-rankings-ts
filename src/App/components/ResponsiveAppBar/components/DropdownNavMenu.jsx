import { useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import MenuButton from './MenuButton';

export default function DropdownNavMenu({ options }) {
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = event => setAnchorElNav(event.currentTarget);

  const handleCloseNavMenu = () => setAnchorElNav(null);

  return (
    <Box justifyContent="flex-end" sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'none' } }}>
      <IconButton
        size="large"
        onClick={handleOpenNavMenu}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
      <Menu
        anchorEl={anchorElNav}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        onClick={handleCloseNavMenu}
        sx={{ display: { xs: 'block', sm: 'none' } }}
      >
        {options.map(({ icon, onClick, label }) => (
          <MenuItem key={label}>
            <MenuButton icon={icon} label={label} onClick={onClick} />
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
