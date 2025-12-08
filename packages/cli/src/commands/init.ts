import { Command } from 'commander';
import prompts from 'prompts';
import fs from 'fs-extra';
import path from 'path';
import { logger } from '../utils/logger';
import { configExists, writeConfig, getResolvedPaths } from '../utils/config';
import { getRegistryItem } from '../utils/registry';
import type { Config, RegistryFile } from '../registry/schema';

/**
 * Copy file from templates to target
 */
async function copyFile(file: RegistryFile, config: Config, cwd: string): Promise<void> {
  const sourcePath = path.resolve(__dirname, '..', file.path);
  const targetPath = path.join(cwd, config.designSystemPath, file.target);

  const content = await fs.readFile(sourcePath, 'utf-8');
  await fs.ensureDir(path.dirname(targetPath));
  await fs.writeFile(targetPath, content, 'utf-8');
}

/**
 * Update global CSS with imports
 */
async function updateGlobalCss(cssImports: string[], config: Config, cwd: string): Promise<void> {
  const globalCssPath = path.join(cwd, config.css.globalCssFile);

  if (!(await fs.pathExists(globalCssPath))) {
    return;
  }

  let content = await fs.readFile(globalCssPath, 'utf-8');

  for (const cssImport of cssImports) {
    const importStatement = `@import '${cssImport}';`;
    if (!content.includes(importStatement)) {
      content = `${importStatement}\n${content}`;
    }
  }

  await fs.writeFile(globalCssPath, content, 'utf-8');
}

export const init = new Command()
  .name('init')
  .description('Initialize AS Design System in your project')
  .option('-y, --yes', 'Skip prompts and use defaults')
  .action(async (options) => {
    const cwd = process.cwd();

    logger.info('Initializing AS Design System...');
    logger.break();

    // Check if config already exists
    if (await configExists(cwd)) {
      logger.warn('Configuration already exists. Aborting.');
      return;
    }

    // Detect project structure
    const packageJsonPath = path.join(cwd, 'package.json');
    const hasPackageJson = await fs.pathExists(packageJsonPath);

    if (!hasPackageJson) {
      logger.error('No package.json found. Please run this command in a React project.');
      process.exit(1);
    }

    // Read package.json to detect framework
    const packageJson = await fs.readJSON(packageJsonPath);
    const hasReact = packageJson.dependencies?.react || packageJson.devDependencies?.react;

    if (!hasReact) {
      logger.error('React not found in dependencies. This CLI currently supports React projects only.');
      process.exit(1);
    }

    let config: Partial<Config> = {};

    if (options.yes) {
      // Use defaults
      config = {
        framework: 'react',
        typescript: true,
        designSystemPath: 'src/design-system',
        aliases: {
          designSystem: '@/design-system',
          components: '@/design-system/components',
          tokens: '@/design-system/tokens',
          icons: '@/design-system/icons',
        },
        css: {
          globalCssFile: 'src/index.css',
          cssModules: false,
        },
        components: {
          autoInstallDeps: true,
          overwrite: 'ask',
        },
      };
    } else {
      // Interactive prompts
      const answers = await prompts([
        {
          type: 'confirm',
          name: 'typescript',
          message: 'Are you using TypeScript?',
          initial: true,
        },
        {
          type: 'text',
          name: 'designSystemPath',
          message: 'Where should we install the design system?',
          initial: 'src/design-system',
        },
        {
          type: 'text',
          name: 'globalCssFile',
          message: 'Path to your global CSS file:',
          initial: 'src/index.css',
        },
        {
          type: 'confirm',
          name: 'autoInstallDeps',
          message: 'Automatically install component dependencies?',
          initial: true,
        },
      ]);

      config = {
        framework: 'react',
        typescript: answers.typescript,
        designSystemPath: answers.designSystemPath,
        aliases: {
          designSystem: '@/design-system',
          components: '@/design-system/components',
          tokens: '@/design-system/tokens',
          icons: '@/design-system/icons',
        },
        css: {
          globalCssFile: answers.globalCssFile,
          cssModules: false,
        },
        components: {
          autoInstallDeps: answers.autoInstallDeps,
          overwrite: 'ask',
        },
      };
    }

    // Create directory structure
    const spinner = logger.spinner('Creating directory structure...');
    const paths = getResolvedPaths(config as Config, cwd);

    await fs.ensureDir(paths.components);
    await fs.ensureDir(paths.tokens);

    spinner.succeed('Created directory structure');

    // Write config
    await writeConfig(config as Config, cwd);

    // Update tsconfig.json if TypeScript is enabled
    if (config.typescript) {
      const tsconfigPath = path.join(cwd, 'tsconfig.json');
      if (await fs.pathExists(tsconfigPath)) {
        const tsconfig = await fs.readJSON(tsconfigPath);

        if (!tsconfig.compilerOptions) {
          tsconfig.compilerOptions = {};
        }

        if (!tsconfig.compilerOptions.paths) {
          tsconfig.compilerOptions.paths = {};
        }

        // Add path aliases
        tsconfig.compilerOptions.paths['@/design-system/*'] = [`${config.designSystemPath}/*`];

        await fs.writeJSON(tsconfigPath, tsconfig, { spaces: 2 });
        logger.success('Updated tsconfig.json with path aliases');
      }
    }

    // Update vite.config.ts/js if it exists
    const viteConfigTs = path.join(cwd, 'vite.config.ts');
    const viteConfigJs = path.join(cwd, 'vite.config.js');
    const viteConfigPath = await fs.pathExists(viteConfigTs) ? viteConfigTs :
                           await fs.pathExists(viteConfigJs) ? viteConfigJs : null;

    if (viteConfigPath) {
      let viteConfig = await fs.readFile(viteConfigPath, 'utf-8');

      // Check if path import already exists
      if (!viteConfig.includes("import path from 'path'") && !viteConfig.includes('import path from "path"')) {
        // Add path import after defineConfig import
        viteConfig = viteConfig.replace(
          /(import { defineConfig } from ['"]vite['"])/,
          "$1\nimport path from 'path'"
        );
      }

      // Check if fileURLToPath import exists for ES modules
      if (!viteConfig.includes("import { fileURLToPath } from 'url'") && !viteConfig.includes('import { fileURLToPath } from "url"')) {
        // Add fileURLToPath import after path import
        viteConfig = viteConfig.replace(
          /(import path from ['"]path['"])/,
          "$1\nimport { fileURLToPath } from 'url'"
        );
      }

      // Add __dirname polyfill for ES modules if not present
      if (!viteConfig.includes('__filename') && !viteConfig.includes('__dirname')) {
        // Add after imports, before export default
        viteConfig = viteConfig.replace(
          /(\/\/ https:\/\/.*\n)/,
          `$1const __filename = fileURLToPath(import.meta.url);\nconst __dirname = path.dirname(__filename);\n\n`
        );
      }

      // Check if '@' alias already exists
      if (!viteConfig.includes("'@':") && !viteConfig.includes('"@":')) {
        // Check if resolve block exists
        if (viteConfig.includes('resolve:')) {
          // Check if alias exists but is empty
          if (viteConfig.includes('alias: {}') || viteConfig.includes('alias:{}')) {
            // Replace empty alias object
            viteConfig = viteConfig.replace(
              /alias:\s*\{\s*\}/,
              `alias: {\n      '@': path.resolve(__dirname, './src'),\n    }`
            );
          } else if (!viteConfig.includes('alias:')) {
            // Add alias to existing resolve block
            viteConfig = viteConfig.replace(
              /(resolve:\s*\{)/,
              `$1\n    alias: {\n      '@': path.resolve(__dirname, './src'),\n    },`
            );
          }
        } else {
          // Add entire resolve block
          viteConfig = viteConfig.replace(
            /(plugins:\s*\[[^\]]+\],?)/,
            `$1\n  resolve: {\n    alias: {\n      '@': path.resolve(__dirname, './src'),\n    },\n  },`
          );
        }
        await fs.writeFile(viteConfigPath, viteConfig, 'utf-8');
        logger.success('Updated vite.config with path aliases');
      }
    }

    // Auto-install design tokens
    const tokenSpinner = logger.spinner('Installing design tokens...');
    try {
      const colors = getRegistryItem('colors');
      const typography = getRegistryItem('typography');

      if (!colors || !typography) {
        throw new Error('Token registry items not found');
      }

      // Filter files based on TypeScript setting
      const shouldCopyFile = (file: RegistryFile) => {
        // If TypeScript is enabled, copy all files
        if (config.typescript) return true;
        // If TypeScript is disabled, skip ONLY pure .ts files (like colors.ts, typography.ts)
        // Keep .tsx files because Vite/Babel can compile them in JS projects
        // Keep .d.ts files
        if (file.path.endsWith('.d.ts')) return true;
        if (file.path.endsWith('.tsx')) return true;
        return !file.path.endsWith('.ts');
      };

      // Copy token files (filtered)
      for (const file of colors.files.filter(shouldCopyFile)) {
        await copyFile(file, config as Config, cwd);
      }
      for (const file of typography.files.filter(shouldCopyFile)) {
        await copyFile(file, config as Config, cwd);
      }

      // Update global CSS with token imports
      const cssImports: string[] = [];
      if (colors.cssImports) cssImports.push(...colors.cssImports);
      if (typography.cssImports) cssImports.push(...typography.cssImports);

      if (cssImports.length > 0) {
        await updateGlobalCss(cssImports, config as Config, cwd);
      }

      tokenSpinner.succeed('Installed design tokens (colors, typography)');
    } catch (error: any) {
      tokenSpinner.fail('Failed to install design tokens');
      logger.error(error.message);
    }

    logger.break();
    logger.success('Initialization complete!');
    logger.break();
    logger.info('Next steps:');
    logger.info('  1. Run "asds add button" to install your first component');
    logger.info('  2. Run "asds list" to see all available components');
  });
