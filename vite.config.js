import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/epub': {
        target: 'https://epubreader.brahmakumaris.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/epub/, ''),
        secure: false,
        ws: true
      }
    }
  }
})