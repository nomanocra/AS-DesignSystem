import { cosmiconfig } from 'cosmiconfig';
import fs from 'fs-extra';
import path from 'path';
import { configSchema, type Config } from '../registry/schema';
import { logger } from './logger';

const explorer = cosmiconfig('asds', {
  searchPlaces: [
    'asds.config.json',
    'asds.config.js',
    '.asdsrc',
    '.asdsrc.json',
  ],
});

/**
 * Load config from user project
 */
export async function loadConfig(cwd: string = process.cwd()): Promise<Config | null> {
  try {
    const result = await explorer.search(cwd);

    if (!result) {
      return null;
    }

    const parsed = configSchema.safeParse(result.config);

    if (!parsed.success) {
      logger.error('Invalid config file:');
      console.error(parsed.error.format());
      process.exit(1);
    }

    return parsed.data;
  } catch (error) {
    logger.error(`Failed to load config: ${error}`);
    return null;
  }
}

/**
 * Check if config exists
 */
export async function configExists(cwd: string = process.cwd()): Promise<boolean> {
  const result = await explorer.search(cwd);
  return result !== null;
}

/**
 * Write config file
 */
export async function writeConfig(config: Config, cwd: string = process.cwd()): Promise<void> {
  const configPath = path.join(cwd, 'asds.config.json');

  const configWithSchema = {
    $schema: 'https://as-design-system.com/schema.json',
    ...config,
  };

  await fs.writeJSON(configPath, configWithSchema, { spaces: 2 });
  logger.success(`Created config file: asds.config.json`);
}

/**
 * Get resolved paths from config
 */
export function getResolvedPaths(config: Config, cwd: string = process.cwd()) {
  return {
    designSystem: path.join(cwd, config.designSystemPath),
    components: path.join(cwd, config.designSystemPath, 'components'),
    tokens: path.join(cwd, config.designSystemPath, 'tokens'),
    icons: path.join(cwd, config.designSystemPath, 'icons'),
    globalCss: path.join(cwd, config.css.globalCssFile),
  };
}
