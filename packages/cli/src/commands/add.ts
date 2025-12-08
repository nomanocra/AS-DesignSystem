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

  // Don't transform relative imports - they are already correct in templates
  // Templates use relative imports for same-directory files (e.g., './Icon')
  // and these should be preserved as-is

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

    // Check for conflicts and build file map
    const paths = getResolvedPaths(config, cwd);
    const existingFiles = new Set<string>();
    const newFiles = new Set<string>();

    // Map each file to its target path and check existence
    type FileWithItem = { file: RegistryFile; item: RegistryItem; targetPath: string };
    const fileMap = new Map<string, FileWithItem>();

    for (const item of toInstall) {
      for (const file of item.files) {
        const targetPath = path.join(cwd, config.designSystemPath, file.target);
        const exists = await fs.pathExists(targetPath);

        fileMap.set(file.target, { file, item, targetPath });

        if (exists) {
          existingFiles.add(file.target);
        } else {
          newFiles.add(file.target);
        }
      }
    }

    // Determine which files to install
    let filesToInstall = new Set<string>(fileMap.keys());

    if (existingFiles.size > 0 && !options.overwrite) {
      logger.warn(`${existingFiles.size} file(s) already exist:`);
      const displayLimit = 10;
      const existingArray = Array.from(existingFiles);
      for (let i = 0; i < Math.min(displayLimit, existingArray.length); i++) {
        logger.warn(`  - ${existingArray[i]}`);
      }
      if (existingArray.length > displayLimit) {
        logger.warn(`  ... and ${existingArray.length - displayLimit} more`);
      }
      logger.break();

      const { shouldOverwrite } = await prompts({
        type: 'confirm',
        name: 'shouldOverwrite',
        message: 'Overwrite existing files? (No = skip existing, install new files only)',
        initial: false,
      });

      if (!shouldOverwrite) {
        // Skip existing files, only install new ones
        filesToInstall = newFiles;
        logger.info(`Skipping ${existingFiles.size} existing file(s), installing ${newFiles.size} new file(s)...`);
        logger.break();
      }
    }

    // Install files
    const spinner = logger.spinner('Copying files...');

    try {
      const allCssImports = new Set<string>();
      const installedItems = new Set<string>();
      let filesCopied = 0;

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

      // Copy only the files in filesToInstall
      for (const fileTarget of filesToInstall) {
        const fileWithItem = fileMap.get(fileTarget);
        if (!fileWithItem) continue;

        const { file, item } = fileWithItem;

        // Apply TypeScript filter
        if (!shouldCopyFile(file)) continue;

        await copyFile(file, config, cwd);
        filesCopied++;
        installedItems.add(item.name);
      }

      // Collect CSS imports from all items that have at least one file installed
      for (const item of toInstall) {
        if (installedItems.has(item.name) && item.cssImports) {
          for (const cssImport of item.cssImports) {
            allCssImports.add(cssImport);
          }
        }
      }

      // Calculate how many files were skipped
      const skippedCount = filesToInstall === newFiles ? existingFiles.size : 0;
      if (skippedCount > 0) {
        spinner.succeed(`Copied ${filesCopied} file(s), skipped ${skippedCount} existing file(s)`);
      } else {
        spinner.succeed(`Copied ${filesCopied} file(s)`);
      }

      // Update global CSS
      if (allCssImports.size > 0) {
        const cssSpinner = logger.spinner('Updating global CSS...');
        await updateGlobalCss(Array.from(allCssImports), config, cwd);
        cssSpinner.succeed('Updated global CSS');
      }

      logger.break();
      logger.success('Installation complete!');
      logger.break();

      // Show usage hints only for components that were actually installed
      const installedComponents = toInstall.filter(
        (i) => i.type === 'component' && installedItems.has(i.name)
      );
      if (installedComponents.length > 0) {
        logger.info('Import components in your code:');
        for (const comp of installedComponents) {
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
