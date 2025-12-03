import { defineConfig } from 'tsup';
import { copyFileSync, existsSync } from 'fs';
import { join } from 'path';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  onSuccess: () => {
    // Copy CSS files to dist
    const cssFiles = ['typography.css', 'colors.css'];
    cssFiles.forEach((file) => {
      const srcCss = join(process.cwd(), 'src', file);
      const distCss = join(process.cwd(), 'dist', file);
      if (existsSync(srcCss)) {
        copyFileSync(srcCss, distCss);
      }
    });
  },
});

