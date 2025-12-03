import { defineConfig } from 'tsup';
import { copyFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { readdirSync, statSync } from 'fs';

function copyDir(src: string, dest: string) {
  if (!existsSync(dest)) {
    mkdirSync(dest, { recursive: true });
  }
  const entries = readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = join(src, entry.name);
    const destPath = join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      copyFileSync(srcPath, destPath);
    }
  }
}

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
  loader: {
    '.png': 'copy',
    '.jpg': 'copy',
    '.jpeg': 'copy',
    '.svg': 'copy',
  },
  onSuccess: () => {
    // Copy CSS files to dist
    const cssFiles = ['Icon.css', 'Button.css', 'ToolIcons.css'];
    cssFiles.forEach((file) => {
      const srcCss = join(process.cwd(), 'src', file);
      const distCss = join(process.cwd(), 'dist', file);
      if (existsSync(srcCss)) {
        copyFileSync(srcCss, distCss);
      }
    });
    
    // Copy assets directory to dist
    const srcAssets = join(process.cwd(), 'src', 'assets');
    const distAssets = join(process.cwd(), 'dist', 'assets');
    if (existsSync(srcAssets)) {
      copyDir(srcAssets, distAssets);
    }
  },
});

