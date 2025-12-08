import { Command } from 'commander';
import prompts from 'prompts';
import fs from 'fs-extra';
import path from 'path';
import { logger } from '../utils/logger';
import { loadConfig, getResolvedPaths } from '../utils/config';
import { resolveDependencies, getRegistryItem } from '../utils/registry';
import type { RegistryItem, RegistryFile } from '../registry/schema';

/**
 * Rewrite imports in file content
 */
function rewriteImports(content: string, config: any, filePath?: string): string {
  let rewritten = content;

  // Rewrite @as-design-system/core → @/design-system/components
  rewritten = rewritten.replace(
    /@as-design-system\/core/g,
    config.aliases.components.replace('/components', '')
  );

  // Rewrite @as-design-system/icons → @/design-system/icons
  rewritten = rewritten.replace(
    /@as-design-system\/icons/g,
    config.aliases.icons
  );

  // Rewrite @as-design-system/tokens → @/design-system/tokens
  rewritten = rewritten.replace(
    /@as-design-system\/tokens/g,
    config.aliases.tokens
  );

  // Don't transform relative imports in index.ts files (barrel exports)
  // These files re-export from sibling files and should keep relative imports
  const isIndexFile = filePath?.endsWith('index.ts') || filePath?.endsWith('index.tsx');

  if (!isIndexFile) {
    // Rewrite relative imports like './Icon' → '@/design-system/components/Icon'
    // Only for non-index files (actual component files)
    rewritten = rewritten.replace(
      /from ['"]\.\/([^'"]+)['"]/g,
      `from '${config.aliases.components}/$1'`
    );
  }

  return rewritten;
}

/**
 * Copy file from source to target with import rewriting
 */
async function copyFile(
  file: RegistryFile,
  config: any,
  cwd: string
): Promise<void> {
  // Resolve templates from CLI package location
  // __dirname will be in dist/, templates/ is at package root
  const sourcePath = path.resolve(__dirname, '..', file.path);
  const targetPath = path.join(cwd, config.designSystemPath, file.target);

  // Ensure target directory exists
  await fs.ensureDir(path.dirname(targetPath));

  // Check if file is binary (images, etc.)
  const isBinary = /\.(png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/i.test(file.path);

  if (isBinary) {
    // Copy binary files without modification
    await fs.copyFile(sourcePath, targetPath);
  } else {
    // Read source file as text
    const content = await fs.readFile(sourcePath, 'utf-8');

    // Rewrite imports (pass file.target to detect index.ts files)
    const rewritten = rewriteImports(content, config, file.target);

    // Write file
    await fs.writeFile(targetPath, rewritten, 'utf-8');
  }
}

/**
 * Update global CSS with imports
 */
async function updateGlobalCss(
  cssImports: string[],
  config: any,
  cwd: string
): Promise<void> {
  const globalCssPath = path.join(cwd, config.css.globalCssFile);

  if (!(await fs.pathExists(globalCssPath))) {
    logger.warn(`Global CSS file not found: ${config.css.globalCssFile}`);
    return;
  }

  let content = await fs.readFile(globalCssPath, 'utf-8');

  for (const cssImport of cssImports) {
    const importStatement = `@import '${cssImport}';`;

    // Check if import already exists
    if (content.includes(importStatement)) {
      continue;
    }

    // Add import at the top
    content = `${importStatement}\n${content}`;
  }

  await fs.writeFile(globalCssPath, content, 'utf-8');
}

export const add = new Command()
  .name('add')
  .description('Add components, tokens, or icons to your project')
  .argument('[components...]', 'Components to add')
  .option('-a, --all', 'Install all components')
  .option('-o, --overwrite', 'Overwrite existing files without asking')
  .action(async (componentNames: string[], options) => {
    const cwd = process.cwd();

    // Load config
    const config = await loadConfig(cwd);
    if (!config) {
      logger.error('No configuration found. Run "asds init" first.');
      process.exit(1);
    }

    if (componentNames.length === 0 && !options.all) {
      logger.error('Please specify components to add, or use --all to install everything.');
      logger.info('Example: asds add button icon');
      logger.info('Run "asds list" to see available components.');
      process.exit(1);
    }

    // Resolve all dependencies
    const toInstall: RegistryItem[] = [];
    const seen = new Set<string>();

    for (const name of componentNames) {
      try {
        const resolved = resolveDependencies(name);
        for (const item of resolved) {
          if (!seen.has(item.name)) {
            toInstall.push(item);
            seen.add(item.name);
          }
        }
      } catch (error: any) {
        logger.error(error.message);
        process.exit(1);
      }
    }

    if (toInstall.length === 0) {
      logger.warn('Nothing to install.');
      return;
    }

    // Show what will be installed
    logger.info(`Installing ${toInstall.length} item(s):`);
    for (const item of toInstall) {
      logger.info(`  - ${item.displayName || item.name} (${item.type})`);
    }
    logger.break();

    // Check for conflicts
    const paths = getResolvedPaths(config, cwd);
    const conflicts: string[] = [];

    for (const item of toInstall) {
      for (const file of item.files) {
        const targetPath = path.join(cwd, config.designSystemPath, file.target);
        if (await fs.pathExists(targetPath)) {
          conflicts.push(file.target);
        }
      }
    }

    if (conflicts.length > 0 && !options.overwrite) {
      logger.warn('The following files already exist:');
      for (const conflict of conflicts) {
        logger.warn(`  - ${conflict}`);
      }
      logger.break();

      const { shouldOverwrite } = await prompts({
        type: 'confirm',
        name: 'shouldOverwrite',
        message: 'Do you want to overwrite these files?',
        initial: false,
      });

      if (!shouldOverwrite) {
        logger.info('Aborting.');
        return;
      }
    }

    // Install files
    const spinner = logger.spinner('Copying files...');

    try {
      const allCssImports = new Set<string>();

      // Filter files based on TypeScript setting
      const shouldCopyFile = (file: RegistryFile) => {
        // If TypeScript is enabled, copy all files
        if (config.typescript) return true;
        // If TypeScript is disabled, skip ONLY pure .ts files (like colors.ts, typography.ts)
        // Keep .tsx files (components) because Vite/Babel can compile them in JS projects
        // Keep .d.ts files
        if (file.path.endsWith('.d.ts')) return true;
        if (file.path.endsWith('.tsx')) return true;
        return !file.path.endsWith('.ts');
      };

      for (const item of toInstall) {
        // Copy files (filtered based on TypeScript setting)
        const filesToCopy = item.files.filter(shouldCopyFile);
        for (const file of filesToCopy) {
          await copyFile(file, config, cwd);
        }

        // Collect CSS imports
        if (item.cssImports) {
          for (const cssImport of item.cssImports) {
            allCssImports.add(cssImport);
          }
        }
      }

      spinner.succeed(`Copied ${toInstall.length} item(s)`);

      // Update global CSS
      if (allCssImports.size > 0) {
        const cssSpinner = logger.spinner('Updating global CSS...');
        await updateGlobalCss(Array.from(allCssImports), config, cwd);
        cssSpinner.succeed('Updated global CSS');
      }

      logger.break();
      logger.success('Installation complete!');
      logger.break();

      // Show usage hints
      const components = toInstall.filter((i) => i.type === 'component');
      if (components.length > 0) {
        logger.info('Import components in your code:');
        for (const comp of components) {
          const componentName = comp.displayName || comp.name;
          logger.info(`  import { ${componentName} } from '${config.aliases.components}/${componentName}';`);
        }
      }
    } catch (error: any) {
      spinner.fail('Failed to copy files');
      logger.error(error.message);
      process.exit(1);
    }
  });
