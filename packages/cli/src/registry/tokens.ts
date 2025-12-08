import type { RegistryItem } from './schema';

export const tokens: RegistryItem[] = [
  {
    name: 'colors',
    type: 'token',
    displayName: 'Colors',
    description: 'Color tokens including primitives and semantic colors',
    files: [
      {
        path: 'templates/tokens/colors.ts',
        target: 'tokens/colors.ts',
        type: 'component',
      },
      {
        path: 'templates/tokens/colors.css',
        target: 'tokens/colors.css',
        type: 'style',
      },
    ],
    cssImports: ['@/design-system/tokens/colors.css'],
  },
  {
    name: 'typography',
    type: 'token',
    displayName: 'Typography',
    description: 'Typography tokens including fonts, sizes, and text styles',
    files: [
      {
        path: 'templates/tokens/typography.ts',
        target: 'tokens/typography.ts',
        type: 'component',
      },
      {
        path: 'templates/tokens/typography.css',
        target: 'tokens/typography.css',
        type: 'style',
      },
    ],
    cssImports: ['@/design-system/tokens/typography.css'],
  },
];
