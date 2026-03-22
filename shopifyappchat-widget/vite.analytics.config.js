import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/analytics.js',
      name: 'ShopAnalytics',
      fileName: 'analytics',
      formats: ['iife']
    },
    outDir: 'dist',
    emptyOutDir: false
  }
});
