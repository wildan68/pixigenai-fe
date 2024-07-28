import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      crypto: 'crypto-browserify'
    }
  },
  build: {
    chunkSizeWarningLimit: 5000,
  },
  server: {
    port: 3000
  },
})
