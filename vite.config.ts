import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import basicSsl from '@vitejs/plugin-basic-ssl'
import mkcert from 'vite-plugin-mkcert'
import path from "node:path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), mkcert()],
  server: {
    host: true,

  },
  base: '/ia',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
