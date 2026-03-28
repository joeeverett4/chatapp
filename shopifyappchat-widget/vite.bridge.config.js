import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/bridge.js',
      name: 'ShopAppChatBridge',
      fileName: 'bridge',
      formats: ['iife']
    },
    outDir: 'dist',
    emptyOutDir: false,
    minify: true
  }
});
