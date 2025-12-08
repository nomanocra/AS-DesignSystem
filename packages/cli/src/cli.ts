import { Command } from 'commander';
import { init } from './commands/init';
import { add } from './commands/add';
import { list } from './commands/list';

const packageJson = {
  name: '@as-design-system/cli',
  version: '0.1.0',
  description: 'CLI tool to add AS Design System components to your project',
};

export function createCLI() {
  const program = new Command()
    .name('asds')
    .description(packageJson.description)
    .version(packageJson.version, '-v, --version', 'Display version number');

  // Register commands
  program.addCommand(init);
  program.addCommand(add);
  program.addCommand(list);

  return program;
}
