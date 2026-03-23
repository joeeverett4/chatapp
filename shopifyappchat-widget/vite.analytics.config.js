import { defineConfig } from 'vite';

export default defineConfig({
  define: {
    'process.env.NODE_ENV': JSON.stringify('development')
  },
  build: {
    lib: {
      entry: 'src/analytics.js',
      name: 'ShopAnalytics',
      fileName: 'analytics',
      formats: ['iife']
    },
    outDir: 'dist',
    emptyOutDir: false,
    minify: false
  }
});
