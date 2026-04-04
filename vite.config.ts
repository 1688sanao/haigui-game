import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // 开发环境将 /api 转发到后端，避免浏览器跨域
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
  },
})
