import { defineConfig } from 'vite';

// base './' : Capacitor uygulaması dosyaları yerel olarak yükler.
export default defineConfig({
  base: './',
  build: { outDir: 'dist', assetsInlineLimit: 0 },
});
