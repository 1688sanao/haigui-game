import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // 与 Vercel 一致：对外 /api/chat，后端 Express 只监听 "/"
      "/api/chat": {
        target: "http://localhost:3001",
        changeOrigin: true,
        rewrite: () => "/",
      },
      // 其余 /api/*（如 /api/docs）原样转发
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
  },
})
