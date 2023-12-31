import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import dns from 'dns';

dns.setDefaultResultOrder('verbatim');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost',
    port: '3000',
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'mui-x-date-pickers': ['@mui/x-date-pickers'],
          'mui-x-date-pickers-pro': ['@mui/x-date-pickers-pro'],
        },
      },
    },
  },
});
