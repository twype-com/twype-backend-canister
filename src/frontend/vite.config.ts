import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'url'
// import react from '@vitejs/plugin-react'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import { VitePWA } from 'vite-plugin-pwa'
import mkcert from 'vite-plugin-mkcert'
import webfontDownload from 'vite-plugin-webfont-dl'
import { analyzer } from 'vite-bundle-analyzer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths({
      parseNative: false,
    }),
    mkcert(),
    VitePWA({
      registerType: 'autoUpdate',
    }),
    webfontDownload(['https://fonts.googleapis.com/css2?family=Righteous&display=swap']),
    analyzer(),
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: fileURLToPath(new URL('./src', import.meta.url)),
      },
      {
        find: '@assets',
        replacement: fileURLToPath(new URL('./src/assets', import.meta.url)),
      },
      {
        find: '@styles',
        replacement: fileURLToPath(new URL('./src/styles', import.meta.url)),
      },
    ],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "./src/styles/mixins.scss";
          @import "./src/styles/breakpoints.scss";
        `,
      },
    },
  },
  server: {
    host: true,
    https: true,
    strictPort: true,
    port: 5500,
  },
})
