import { Command } from 'commander';
import prompts from 'prompts';
import fs from 'fs-extra';
import path from 'path';
import { logger } from '../utils/logger';
import { loadConfig, getResolvedPaths } from '../utils/config';
import { resolveDependencies, getRegistryItem, getAllRegistryItems } from '../utils/registry';
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
  const sourcePath = path.resolve(__dirname, '..', file.path);
  const targetPath = path.join(cwd, config.designSystemPath, file.target);

  await fs.ensureDir(path.dirname(targetPath));

  const isBinary = /\.(png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/i.test(file.path);

  if (isBinary) {
    await fs.copyFile(sourcePath, targetPath);
  } else {
    const content = await fs.readFile(sourcePath, 'utf-8');
    const rewritten = rewriteImports(content, config, file.target);
    await fs.writeFile(targetPath, rewritten, 'utf-8');
  }
}

/**
 * Detect installed components by checking existing files
 */
async function detectInstalledComponents(
  config: any,
  cwd: string
): Promise<string[]> {
  const allItems = getAllRegistryItems();
  const installed: string[] = [];

  for (const item of allItems) {
    // Check if the main component file exists
    const mainFile = item.files.find(f => f.type === 'component' && f.target.endsWith('.tsx'));
    if (mainFile) {
      const targetPath = path.join(cwd, config.designSystemPath, mainFile.target);
      if (await fs.pathExists(targetPath)) {
        installed.push(item.name);
      }
    }
  }

  return installed;
}

export const update = new Command()
  .name('update')
  .description('Update installed components to their latest versions')
  .argument('[components...]', 'Components to update (updates all installed if none specified)')
  .option('-y, --yes', 'Skip confirmation prompt')
  .action(async (componentNames: string[], options) => {
    const cwd = process.cwd();

    // Load config
    const config = await loadConfig(cwd);
    if (!config) {
      logger.error('No configuration found. Run "asds init" first.');
      process.exit(1);
    }

    // If no components specified, detect installed ones
    let toUpdate: string[] = componentNames;

    if (toUpdate.length === 0) {
      logger.info('Detecting installed components...');
      toUpdate = await detectInstalledComponents(config, cwd);

      if (toUpdate.length === 0) {
        logger.warn('No installed components found.');
        return;
      }

      logger.info(`Found ${toUpdate.length} installed component(s):`);
      for (const name of toUpdate) {
        const item = getRegistryItem(name);
        logger.info(`  - ${item?.displayName || name}`);
      }
      logger.break();
    }

    // Resolve all dependencies
    const toInstall: RegistryItem[] = [];
    const seen = new Set<string>();

    for (const name of toUpdate) {
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
      logger.warn('Nothing to update.');
      return;
    }

    // Show what will be updated
    logger.info(`Will update ${toInstall.length} item(s):`);
    for (const item of toInstall) {
      logger.info(`  - ${item.displayName || item.name} (${item.type})`);
    }
    logger.break();

    // Confirm update
    if (!options.yes) {
      const { shouldUpdate } = await prompts({
        type: 'confirm',
        name: 'shouldUpdate',
        message: 'This will overwrite existing files. Continue?',
        initial: true,
      });

      if (!shouldUpdate) {
        logger.info('Update cancelled.');
        return;
      }
    }

    // Update files
    const spinner = logger.spinner('Updating files...');

    try {
      let filesCopied = 0;

      const shouldCopyFile = (file: RegistryFile) => {
        if (config.typescript) return true;
        if (file.path.endsWith('.d.ts')) return true;
        if (file.path.endsWith('.tsx')) return true;
        return !file.path.endsWith('.ts');
      };

      for (const item of toInstall) {
        for (const file of item.files) {
          if (!shouldCopyFile(file)) continue;
          await copyFile(file, config, cwd);
          filesCopied++;
        }
      }

      spinner.succeed(`Updated ${filesCopied} file(s)`);

      logger.break();
      logger.success('Update complete!');
    } catch (error: any) {
      spinner.fail('Failed to update files');
      logger.error(error.message);
      process.exit(1);
    }
  });
