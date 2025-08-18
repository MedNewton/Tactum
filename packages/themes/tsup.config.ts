import { defineConfig } from 'tsup';
import { vanillaExtractPlugin } from '@vanilla-extract/esbuild-plugin';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  target: 'es2022',
  // 👇 THIS is what makes VE emit CSS for your tokens.css.ts
  esbuildPlugins: [vanillaExtractPlugin()],
  // themes is pure side-effect (registers CSS vars), keep it simple
  external: [],
  minify: false,
});
