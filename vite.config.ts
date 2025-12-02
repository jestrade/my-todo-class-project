import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['preact', 'preact/compat'] // 👈 evita substitución automática
  },
  resolve: {
    alias: {
      react: "react",
      "react-dom": "react-dom",
      "react/jsx-runtime": "react/jsx-runtime"
    }
  }
})