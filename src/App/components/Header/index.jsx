import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import SportsRugbyIcon from '@mui/icons-material/SportsRugby';
import Translate from '@components/Translate';
import Tabs from './components/Tabs';

export default function Header({ sport, disabled, changeSport }) {
  return (
    <header>
      <Box sx={{ width: '100%', p: 2, bgcolor: 'primary.main', color: 'common.white', textAlign: 'left' }}>
        <Container>
          <Stack direction="row" spacing={2} alignItems="center">
            <SportsRugbyIcon sx={{ fontSize: 48 }}/>
            <Typography color="inherit" variant="h1" align="left">
              <Translate text="app.header.title" />
            </Typography>
          </Stack>
        </Container>
      </Box>
      <Tabs sport={sport} disabled={disabled} changeSport={changeSport} />
    </header>
  );
}
