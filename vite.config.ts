import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), 'src');

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: {
    alias: {
      '@assets': '/src/assets',
      '@components': resolve(root, 'components'),
      '@constants': resolve(root, 'constants'),
      '@utils': resolve(root, 'utils'),
    },
  },
});
