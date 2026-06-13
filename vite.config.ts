import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@mascotnova/core': path.resolve(__dirname, '../MascotNova/packages/core/src/index.ts')
    }
  },
  server: {
    fs: {
      allow: ['..']
    }
  }
});
