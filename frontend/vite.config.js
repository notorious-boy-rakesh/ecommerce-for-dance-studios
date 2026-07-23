import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // All /api requests from Vite dev server are proxied to the backend
      // This eliminates CORS issues during development
      '/api': {
        target: 'https://ecommerce-for-dance-studios.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
