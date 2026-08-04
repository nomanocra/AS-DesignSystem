# AI Agent Instructions for AS Design System

This file contains instructions for any AI assistant (Claude Code, Codex, etc.) to properly implement new components, composites, and templates in the AS Design System.

> **Single source of truth:** `AGENTS.md` is a symlink to this file. Edit only `CLAUDE.md`.

---

## Project Architecture

```
packages/
├── core/                    # Design system source (single source of truth)
│   └── src/
│       ├── components/      # Atomic components (.tsx + .css)
│       ├── composites/      # Complex container components (.tsx + .css)
│       ├── tokens/          # Design tokens (colors, typography, radius)
│       └── assets/          # SVG icons, PNG tool icons, backgrounds
│
├── cli/                     # CLI tool for component installation
│   ├── src/
│   │   ├── commands/        # CLI commands (init, add, list)
│   │   ├── registry/        # Component/composite/template definitions
│   │   │   ├── components.ts
│   │   │   ├── composites.ts
│   │   │   ├── templates.ts
│   │   │   ├── tokens.ts
│   │   │   └── schema.ts
│   │   └── utils/
│   └── templates/           # Synced from core + page templates
│       ├── components/
│       ├── composites/
│       ├── tokens/
│       ├── assets/
│       └── pages/           # Page templates (CLI-only)
│
└── apps/
    └── docs/                # Documentation site
        └── src/
            ├── pages/       # Component/composite documentation
            └── components/  # Doc site components (Layout, CodeModal)
```

---

## Component vs Composite vs Template

| Type | Location | Purpose | User modifies |
|------|----------|---------|---------------|
| **Component** | `core/src/components/` | Atomic UI element (Button, Icon, Input) | Rarely |
| **Composite** | `core/src/composites/` | Complex container combining components (Modal, AppHeader) | Rarely |
| **Template** | `cli/templates/pages/` | Complete page layout, starting point | Always |

---

## Component Implementation Workflow

### Step 1: Inspect Figma Design

Use MCP tools to extract the complete design:
- `mcp__figma__get_design_context` - Main design specs
- `mcp__figma__get_screenshot` - Visual reference
- `mcp__figma__get_variable_defs` - Design tokens used

Extract: variants, sizes, states, colors, spacing, typography, borders, icons.

### Step 2: Create Component Files

Create in `/packages/core/src/components/`:
- `ComponentName.tsx`
- `ComponentName.css`

**Reference:** See `Button.tsx`, `Tab.tsx`, `TextInput.tsx` for examples.

**TypeScript structure:**
```typescript
import './ComponentName.css';

export type ComponentSize = 'XS' | 'S' | 'M' | 'L' | 'XL';
export type ComponentVariant = 'Default' | 'Outlined' | 'Ghost';

export interface ComponentNameProps {
  label: string;
  size?: ComponentSize;
  variant?: ComponentVariant;
  disabled?: boolean;
  onClick?: () => void;
}

export function ComponentName({ size = 'M', variant = 'Default', ...props }: ComponentNameProps) {
  const classes = [
    'component-name',
    `component-name--${size.toLowerCase()}`,
    `component-name--${variant.toLowerCase()}`,
  ].filter(Boolean).join(' ');

  return <button className={classes}>{/* ... */}</button>;
}
```

**CSS structure:**
```css
/**
 * ComponentName Component Styles
 */

.component-name {
  /* base styles */
}

/* Sizes */
.component-name--xs { height: 24px; }
.component-name--s { height: 32px; }
.component-name--m { height: 40px; }

/* Variants */
.component-name--default {
  background-color: var(--primary-default, #063b9e);
  color: var(--text-negative, #ffffff);
}

.component-name--default:not(:disabled):hover {
  background-color: var(--primary-hover, #255fcc);
}

/* Disabled */
.component-name:disabled {
  opacity: 0.3;
  cursor: default;
  pointer-events: none;
}
```

### Step 3: Register Component

**1. Export from `/packages/core/src/index.ts`:**
```typescript
export { ComponentName, type ComponentNameProps } from './components/ComponentName';
```

**2. Add CSS to `componentCssFiles` in `/packages/core/tsup.config.ts`:**
```typescript
const componentCssFiles = ['Button.css', 'ComponentName.css', /* ... */];
```

**3. Add CSS export in `/packages/core/package.json`:**
```json
"./ComponentName.css": "./dist/ComponentName.css"
```

**4. Register in `/packages/cli/src/registry/components.ts`:**
```typescript
{
  name: 'component-name',           // kebab-case for CLI
  type: 'component',
  displayName: 'ComponentName',
  description: 'Description here',
  files: [
    { path: 'templates/components/ComponentName.tsx', target: 'components/ComponentName.tsx', type: 'component' },
    { path: 'templates/components/ComponentName.css', target: 'components/ComponentName.css', type: 'style' },
  ],
  dependencies: ['icon'],           // Other DS components used
  externalDependencies: {           // npm packages (if any)
    '@radix-ui/react-select': '^2.1.2',
  },
  cssImports: [
    '@/design-system/tokens/typography.css',
    '@/design-system/tokens/colors.css',
  ],
}
```

### Step 4: Create Documentation

Create in `/apps/docs/src/pages/`:
- `ComponentName.tsx`
- `ComponentName.css`

**Reference:** See existing doc pages like `Button.tsx`, `Select.tsx`.

**Important:** Every example section MUST wrap its demo content in a `<div className="example-container">`:
```tsx
<section className="component-section">
  <div className="section-header">...</div>
  <div className="example-container">
    <div className="component-demo">
      {/* Component examples here */}
    </div>
  </div>
</section>
```

Add route in `/apps/docs/src/App.tsx`:
```typescript
<Route path="/components/component-name" element={<ComponentName />} />
```

Add nav link in `/apps/docs/src/components/Layout.tsx` under Components section (alphabetical order).

### Step 5: Build & Test

```bash
cd packages/core && pnpm build
cd packages/cli && pnpm build    # This syncs templates automatically
cd apps/docs && pnpm dev
```

---

## Composite Implementation Workflow

Composites are complex components that combine multiple atomic components (Modal, AppHeader, ProductBanner).

### Step 1: Inspect Figma & Check Dependencies

Verify all required components exist in `/packages/core/src/components/`.

### Step 2: Create Composite Files

Create in `/packages/core/src/composites/`:
- `CompositeName.tsx`
- `CompositeName.css`

**Reference:** See `Modal.tsx`, `AppHeader.tsx`, `ProductBanner.tsx`.

### Step 3: Register Composite

**1. Export from `/packages/core/src/index.ts`**

**2. Add CSS to `compositeCssFiles` in `tsup.config.ts` and add export in `package.json`**

**3. Register in `/packages/cli/src/registry/composites.ts`:**
```typescript
{
  name: 'composite-name',
  type: 'composite',
  displayName: 'CompositeName',
  description: 'Description here',
  files: [
    { path: 'templates/composites/CompositeName.tsx', target: 'composites/CompositeName.tsx', type: 'component' },
    { path: 'templates/composites/CompositeName.css', target: 'composites/CompositeName.css', type: 'style' },
  ],
  dependencies: ['icon', 'button'],  // Components AND composites used
  cssImports: [
    '@/design-system/tokens/typography.css',
    '@/design-system/tokens/colors.css',
  ],
}
```

### Step 4: Create Documentation

Add doc page under Composites section in navigation.

---

## Template Implementation Workflow

Templates are complete page layouts installed directly into user's project. They are **CLI-only** (not in core).

### Step 1: Create Template Files

Create in `/packages/cli/templates/pages/`:
- `TemplateName.tsx`
- `TemplateName.css`

**Important:** Use `@/design-system/` alias for imports (what users will have):
```typescript
import { AppHeader, Button } from '@/design-system/components';
import { Modal } from '@/design-system/composites';
import '@/design-system/components/Button.css';
import './TemplateName.css';
```

### Step 2: Register Template

Register in `/packages/cli/src/registry/templates.ts`:
```typescript
{
  name: 'template-name',
  type: 'template',
  displayName: 'TemplateName',
  description: 'Description here',
  files: [
    { path: 'templates/pages/TemplateName.tsx', target: 'TemplateName.tsx', type: 'component' },
    { path: 'templates/pages/TemplateName.css', target: 'TemplateName.css', type: 'style' },
  ],
  dependencies: ['app-header', 'button', 'modal'],  // All DS dependencies
  targetPath: 'src/pages',  // Default install location
}
```

### Step 3: Create Documentation Preview

Create preview page in `/apps/docs/src/pages/TemplateNameTemplate.tsx`.
Add route under `/templates/template-name`.

---

## CSS Best Practices

**Always use tokens with fallbacks:**
```css
color: var(--primary-default, #063b9e);
background-color: var(--background-main, #ffffff);
```

**BEM-like naming:**
```css
.component { }
.component--modifier { }
.component__element { }
```

**Disabled state (NEVER use cursor: not-allowed):**
```css
.component:disabled {
  opacity: 0.3;
  cursor: default;
  pointer-events: none;
}
```

**Hover states (exclude disabled/active):**
```css
.component:not(:disabled):hover {
  background-color: var(--primary-hover);
}
```

---

## Icon Convention

**Single source of truth for icon variants.** Icons live in `packages/core/src/assets/svg/icons/`. To add one: drop the SVG in that dir, then run `pnpm generate-icons` in `packages/core` (regenerates `Icon.tsx` imports + map), then build core + CLI (e.g. `/bucp`). Note: `pnpm build` alone does **not** regenerate the icon map.

**Default: Material Icons _classic Filled_** — viewBox `0 0 24 24`.

**Never use:**
- Material **Symbols** (viewBox `0 -960 960 960`) — different weight/proportions, breaks visual consistency.
- The **Rounded** variant.

**Outlined variant** is allowed **only** as part of an explicit Filled + Outline pair. Naming convention:
- Base name = Filled: `warning.svg`
- `_outline` suffix = classic Outlined: `warning_outline.svg` (also `error_outline.svg`, `help_outline.svg`)
- The outlined variant must be **classic Outlined (square corners), never Rounded**.

**Where to fetch SVGs** (classic Material Icons):
- Filled: `https://cdn.jsdelivr.net/npm/@material-icons/svg/svg/{name}/baseline.svg`
- Outlined: `https://cdn.jsdelivr.net/npm/@material-icons/svg/svg/{name}/outline.svg`

Normalize fetched SVGs to `viewBox="0 0 24 24"` with `fill="currentColor"` (see `lock.svg`).

> If `{name}/baseline.svg` returns HTTP 404 on the CDN, that icon exists only in Material Symbols (not classic) — flag it rather than silently substituting a Symbols version. (The CDN does carry many newer icons in classic form, e.g. `oil_barrel`, `more_time`, `tag`.)

**Documented Symbols exceptions** — the rule above was waived explicitly, case by case. Do not extend this list without asking:
- `autoplay.svg` — no classic equivalent exists. Taken from `@material-symbols/svg-400/outlined`, path re-projected numerically from viewBox `0 -960 960 960` to `0 0 24 24` (scale 0.025, translate y +24) so the file is structurally identical to the rest of the set. Its stroke is lighter than classic Filled; pair it with `slow_motion_video` (classic) when weight consistency matters.

---

## CLI Commands

```bash
asds init              # Initialize DS in project
asds list              # List all available items
asds add button        # Add a component
asds add modal         # Add a composite
asds add home-page     # Add a template
```

---

## Publishing & Distribution

The CLI is distributed as a **private package** via GitHub Packages under the `@as-designsystem` scope.

**GitHub org:** `as-designsystem`
**Package:** `@as-designsystem/cli`
**Registry:** `https://npm.pkg.github.com`

### How it works

- On push to `main`, if files in `packages/cli/` or `packages/core/` changed, GitHub Actions automatically publishes the CLI to GitHub Packages.
- **Version bumping** is handled by a local pre-push git hook:
  - On push, if CLI/core files changed, automatically bumps patch version (`x.x.X+1`) and commits
  - Skips if last commit is already a bump (prevents infinite loop)
  - Hook is in `.git/hooks/pre-push` (not versioned, must be recreated on fresh clone)
- The workflow file is at `.github/workflows/publish.yml`

### User onboarding

Users configure their npm to access the private registry (one-time):
```bash
npm config set @as-designsystem:registry https://npm.pkg.github.com
npm config set //npm.pkg.github.com/:_authToken TOKEN
```

Then use the CLI normally:
```bash
npx @as-designsystem/cli init
asds add button
```

The access token (classic PAT with `read:packages` scope) is managed by the project admin and shared with users.

---

## Build Commands

```bash
# Core package
cd packages/core && pnpm build

# CLI (syncs templates automatically)
cd packages/cli && pnpm build

# Manual template sync
cd packages/cli && pnpm sync

# Docs dev server
cd apps/docs && pnpm dev
```

---

## Important Notes

- **Single source of truth:** Components/composites live in `packages/core/src/`
- **CLI templates:** Auto-synced from core on build
- **Page templates:** CLI-only, in `packages/cli/templates/pages/`
- **CSS hot reload:** Not available for core. Run `pnpm build` after CSS changes.
- **Documentation:** Always use DS components (Tab, Button) in doc pages
- **All text in English**
- **Package scope:** `@as-designsystem` (matches GitHub org `as-designsystem`)
- **Private distribution:** CLI published to GitHub Packages, not public npm

---

## Checklist

### Component
- [ ] Create `.tsx` + `.css` in `core/src/components/`
- [ ] Export from `index.ts`
- [ ] Add CSS to `tsup.config.ts` and `package.json`
- [ ] Register in `cli/src/registry/components.ts`
- [ ] Create doc page, add route and nav link
- [ ] Build and test

### Composite
- [ ] Create `.tsx` + `.css` in `core/src/composites/`
- [ ] Export from `index.ts`
- [ ] Add CSS to `tsup.config.ts` and `package.json`
- [ ] Register in `cli/src/registry/composites.ts`
- [ ] Create doc page, add route and nav link
- [ ] Build and test

### Template
- [ ] Create `.tsx` + `.css` in `cli/templates/pages/`
- [ ] Register in `cli/src/registry/templates.ts`
- [ ] Create preview page in docs
- [ ] Build CLI and test installation
