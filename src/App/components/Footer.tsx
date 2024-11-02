import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import SportsRugbyIcon from '@mui/icons-material/SportsRugby';
import GitHubIcon from '@mui/icons-material/GitHub';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useTheme } from '@mui/material';
import Translate from '@components/Translate';

const options = [
  {
    icon: <SportsRugbyIcon />,
    label: 'app.footer.rankings',
    href: 'https://www.world.rugby/rankings',
  },
  {
    icon: <GitHubIcon />,
    label: 'app.footer.github',
    href: 'https://github.com/brianmcg/rugby-rankings',
  },
  {
    icon: <AccountCircleIcon />,
    label: 'app.footer.author',
    href: 'http://www.bmcgrath.net',
  },
];

export default function Footer() {
  const { palette } = useTheme();
  const { primary, secondary, success } = palette;

  return (
    <footer>
      <Box
        sx={{
          color: 'common.white',
          marginTop: 2,
          backgroundImage: `linear-gradient(${primary.main}, ${secondary.main})`,
          borderTop: `solid 4px ${success.main}`,
        }}
      >
        <Container>
          <Box p={8}>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="flex-start"
              gap={4}
            >
              {options.map(({ icon, label, href }) => (
                <Stack key={href} direction="row" alignItems="center" gap={1}>
                  {icon}
                  <Link href={href} target="_blank" color="inherit">
                    <Typography variant="caption">
                      <Translate text={label} />
                    </Typography>
                  </Link>
                </Stack>
              ))}
            </Stack>
          </Box>
        </Container>
      </Box>
    </footer>
  );
}
