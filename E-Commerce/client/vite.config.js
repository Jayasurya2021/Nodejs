import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      }
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('scheduler')) {
              return 'vendor-react';
            }
            if (id.includes('redux') || id.includes('@reduxjs/toolkit')) {
              return 'vendor-redux';
            }
            if (id.includes('framer-motion') || id.includes('gsap')) {
              return 'vendor-animation';
            }
            if (id.includes('react-icons') || id.includes('lucide-react')) {
              return 'vendor-icons';
            }
            return 'vendor-utils';
          }
        }
      }
    }
  }
})
