import chalk from 'chalk';
import ora, { Ora } from 'ora';

export const logger = {
  info: (message: string) => {
    console.log(chalk.blue('ℹ'), message);
  },

  success: (message: string) => {
    console.log(chalk.green('✔'), message);
  },

  warn: (message: string) => {
    console.log(chalk.yellow('⚠'), message);
  },

  error: (message: string) => {
    console.log(chalk.red('✖'), message);
  },

  break: () => {
    console.log('');
  },

  spinner: (text: string): Ora => {
    return ora({
      text,
      color: 'cyan',
    }).start();
  },
};
