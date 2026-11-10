import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configuracion minima: sin proxy, sin variables de entorno y sin servicios externos.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: false,
  },
  test: {
    environment: 'jsdom',
    setupFiles: './test/setup.ts',
    include: ['test/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
  },
});
