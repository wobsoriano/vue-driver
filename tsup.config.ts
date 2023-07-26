import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  minify: true,
  clean: true,
  sourcemap: true,
  format: ['cjs', 'esm'],
  dts: true,
})
