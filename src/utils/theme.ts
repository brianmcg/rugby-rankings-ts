import { createTheme } from '@mui/material/styles';
import { blueGrey } from '@mui/material/colors';

export const PRIMARY = '#00419b';

export const SECONDARY = '#19194b';

export const BACKGROUND = '#e6e7eb';

export const INFO = '#00917b';

export const WARNING = '#e31394';

export const SUCCESS = '#58be46';

export const ERROR = '#c30019';

const transitionStyle = {
  transitionBehavior: 'normal',
  transitionDelay: '0s',
  transitionDuration: '0.2s',
  transitionProperty: 'all',
  transitionTimingFunction: 'linear',
};

const theme = createTheme({
  typography: {
    fontFamily: 'Webb Ellis Cup',
    h1: {
      fontWeight: 900,
      fontSize: 48,
    },
    h5: {
      fontWeight: 900,
    },
    h6: {
      fontWeight: 900,
    },
    body2: {
      fontWeight: 900,
    },
    button: {
      fontWeight: 900,
      textTransform: 'none',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '*::-webkit-scrollbar': {
            width: 20,
          },
          '*::-webkit-scrollbar-track': {
            backgroundColor: 'transparent',
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: blueGrey[100],
            border: '6px solid transparent',
            backgroundClip: 'content-box',
            '&:hover': {
              backgroundColor: blueGrey[200],
            },
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        list: {
          '&[role="menu"]': {
            backgroundColor: SECONDARY,
            color: 'white',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          ...transitionStyle,
          borderRadius: 0,
        },
      },
    },
    MuiStack: {
      styleOverrides: {
        root: {
          ...transitionStyle,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          ...transitionStyle,
          borderRadius: 0,
        },
      },
    },
    MuiCardMedia: {
      styleOverrides: {
        root: {
          backgroundColor: PRIMARY,
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: SUCCESS,
          height: 5,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          color: PRIMARY,
          // '&.Mui-selected': {
          //   opacity: 1,
          // }
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          ...transitionStyle,
          textDecoration: 'none',
          '&:hover': {
            color: INFO,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: { borderRadius: 0 },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
  },
  palette: {
    mode: 'light',
    primary: {
      main: PRIMARY,
    },
    secondary: {
      main: SECONDARY,
    },
    background: {
      default: blueGrey[50],
    },
    info: {
      main: INFO,
    },
    success: {
      main: SUCCESS,
    },
    warning: {
      main: WARNING,
    },
    error: {
      main: ERROR,
    },
  },
});

export default theme;
