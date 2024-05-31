import React from 'react';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { CssBaseline } from '@mui/material/';
import { ThemeProvider  } from '@mui/material/styles';
import i18n from '@utils/i18n';
import App from './App';
import theme from './theme';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <App />
      </ThemeProvider>
    </I18nextProvider>
  </React.StrictMode>
);
