import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://bogoparchebackend-production-5a1a.up.railway.app/",
        changeOrigin: true,
        secure: true,
        ws: true},
    },
    port: 5000,
  },
})
