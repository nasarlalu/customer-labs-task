// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Set the port to 3000
    proxy: {
      '/api': {
        target: 'https://webhook.site', // The backend server you want to proxy to
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Optionally rewrite the URL path
      },
    },
  },
});

