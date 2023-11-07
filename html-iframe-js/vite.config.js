import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    https: {
      key: '/Users/brandonscolieri/Code/html-samples/html-iframe-js/key.pem',
      cert: '/Users/brandonscolieri/Code/html-samples/html-iframe-js/cert.pem',
    },
  },
});