import { z } from 'zod';

/**
 * Registry file schema
 */
export const registryFileSchema = z.object({
  path: z.string().describe('Source file path in monorepo (e.g., packages/core/src/Button.tsx)'),
  target: z.string().describe('Target path in user project (e.g., components/Button.tsx)'),
  type: z.enum(['component', 'style', 'util', 'type']).describe('Type of file'),
});

export type RegistryFile = z.infer<typeof registryFileSchema>;

/**
 * Registry item schema (component, token, or icon)
 */
export const registryItemSchema = z.object({
  name: z.string().describe('Unique identifier (e.g., "button", "colors")'),
  type: z.enum(['component', 'token', 'icon']).describe('Type of registry item'),
  displayName: z.string().optional().describe('Display name for CLI output'),
  description: z.string().optional().describe('Brief description'),
  files: z.array(registryFileSchema).describe('Files to copy'),
  dependencies: z.array(z.string()).optional().describe('Component dependencies (e.g., ["icon"])'),
  registryDependencies: z.array(z.string()).optional().describe('Special dependencies like icons or tokens'),
  cssImports: z.array(z.string()).optional().describe('CSS imports to add to global CSS'),
  externalDependencies: z.record(z.string()).optional().describe('npm packages to install (name: version)'),
});

export type RegistryItem = z.infer<typeof registryItemSchema>;

/**
 * Full registry schema
 */
export const registrySchema = z.array(registryItemSchema);

export type Registry = z.infer<typeof registrySchema>;

/**
 * Config schema for asds.config.json
 */
export const configSchema = z.object({
  $schema: z.string().optional(),
  framework: z.enum(['react']).default('react'),
  typescript: z.boolean().default(true),
  designSystemPath: z.string().default('src/design-system'),
  aliases: z.object({
    designSystem: z.string().default('@/design-system'),
    components: z.string().default('@/design-system/components'),
    tokens: z.string().default('@/design-system/tokens'),
    icons: z.string().default('@/design-system/icons'),
  }).default({
    designSystem: '@/design-system',
    components: '@/design-system/components',
    tokens: '@/design-system/tokens',
    icons: '@/design-system/icons',
  }),
  css: z.object({
    globalCssFile: z.string().default('src/index.css'),
    cssModules: z.boolean().default(false),
  }).default({
    globalCssFile: 'src/index.css',
    cssModules: false,
  }),
  components: z.object({
    autoInstallDeps: z.boolean().default(true),
    overwrite: z.enum(['ask', 'always', 'never']).default('ask'),
  }).default({
    autoInstallDeps: true,
    overwrite: 'ask',
  }),
});

export type Config = z.infer<typeof configSchema>;
