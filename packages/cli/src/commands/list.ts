import { Command } from 'commander';
import chalk from 'chalk';
import { getRegistryByType } from '../utils/registry';
import { logger } from '../utils/logger';

export const list = new Command()
  .name('list')
  .description('List all available components, tokens, and icons')
  .action(() => {
    logger.info('Available items:\n');

    // Components
    const components = getRegistryByType('component');
    if (components.length > 0) {
      console.log(chalk.bold.cyan('Components:'));
      for (const comp of components) {
        const displayName = comp.displayName || comp.name;
        const description = comp.description || '';
        console.log(`  ${chalk.green(comp.name.padEnd(15))} ${displayName}`);
        if (description) {
          console.log(`  ${' '.repeat(15)} ${chalk.gray(description)}`);
        }
      }
      console.log('');
    }

    // Tokens
    const tokens = getRegistryByType('token');
    if (tokens.length > 0) {
      console.log(chalk.bold.cyan('Tokens:'));
      for (const token of tokens) {
        const displayName = token.displayName || token.name;
        const description = token.description || '';
        console.log(`  ${chalk.green(token.name.padEnd(15))} ${displayName}`);
        if (description) {
          console.log(`  ${' '.repeat(15)} ${chalk.gray(description)}`);
        }
      }
      console.log('');
    }

    // Icons
    const icons = getRegistryByType('icon');
    if (icons.length > 0) {
      console.log(chalk.bold.cyan('Icons:'));
      for (const icon of icons) {
        const displayName = icon.displayName || icon.name;
        const description = icon.description || '';
        console.log(`  ${chalk.green(icon.name.padEnd(15))} ${displayName}`);
        if (description) {
          console.log(`  ${' '.repeat(15)} ${chalk.gray(description)}`);
        }
      }
      console.log('');
    }

    logger.info('Usage:');
    logger.info('  asds add <name>        Add a specific component or token');
    logger.info('  asds add button icon   Add multiple items at once');
  });
