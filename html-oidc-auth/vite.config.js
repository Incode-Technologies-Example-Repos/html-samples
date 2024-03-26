import { defineConfig } from 'vite'
import mkcert from 'vite-plugin-mkcert'

export default defineConfig({
  server: {
    https: true,
    port: 443,
    host: 'development.incode.local',
  },
  plugins: [ mkcert() ]
})