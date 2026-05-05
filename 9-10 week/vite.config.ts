import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [dts()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: 'index',
    },
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    minify: false,
    rollupOptions: {
      external: ['fs', 'fs/promises', 'path'],
    },
    target: 'node18',
  },
});
