# Claude AI Instructions for AS Design System

This file contains instructions for Claude AI (or any AI assistant) to properly implement new components in the AS Design System.

---

## 📋 Component Implementation Workflow

### Step 1: Inspect Figma Design with MCP

**Always start by inspecting the Figma design:**

```
Use: mcp__local-figma-mcp__get_design_context
```

- Extract node ID from Figma URL (e.g., `?node-id=1-2` → nodeId is `1:2`)
- Document all variants, sizes, states, colors, spacing, typography
- Note design tokens used (especially colors with semantic names)

**Key information to extract:**
- Variants (Default, Outlined, Ghost, Container, etc.)
- Sizes (XS, S, M, L, XL)
- States (Default, Hover, Active, Disabled)
- Colors, spacing, borders, typography, icon sizes

---

### Step 2: Create Component in `/packages/core`

#### 2.1 Component Files

Create two files in the components folder:
- `/packages/core/src/components/ComponentName.tsx`
- `/packages/core/src/components/ComponentName.css`

**Reference:** See `Button.tsx`, `Tab.tsx`, or `Icon.tsx` for structure examples.

**TypeScript structure:**
```typescript
import './ComponentName.css';

export type ComponentSize = 'S' | 'M' | 'L' | 'XL';
export type ComponentVariant = 'Default' | 'Outlined';

export interface ComponentNameProps {
  label: string;
  size?: ComponentSize;
  variant?: ComponentVariant;
  disabled?: boolean;
  onClick?: () => void;
  // ... other props
}

export function ComponentName({ /* props */ }: ComponentNameProps) {
  // Build className with BEM-like naming
  const classes = [
    'component-name',
    `component-name--${size.toLowerCase()}`,
    // ... add modifiers
  ].filter(Boolean).join(' ');

  return <button className={classes}>{/* ... */}</button>;
}
```

**CSS structure:**
```css
/**
 * ComponentName Component Styles
 * Uses design system tokens
 */

/* Tokens are exported from the package root */
/* Users should import: @as-design-system/core/colors.css and @as-design-system/core/typography.css */

.component-name { /* base styles */ }

/* Sizes */
.component-name--s { height: 32px; /* ... */ }
.component-name--m { height: 40px; /* ... */ }

/* Variants */
.component-name--default { /* ... */ }

/* States */
.component-name:disabled,
.component-name--disabled {
  opacity: 0.3;
  cursor: default;
  pointer-events: none;
}
```

**⚠️ Important:** Do NOT use `@import` in component CSS files. Users must import token CSS files separately from the package root.

#### 2.2 Export Component

**File:** `/packages/core/src/index.ts`
```typescript
export { ComponentName, type ComponentNameProps } from './components/ComponentName';
```

#### 2.3 Configure Build

**File:** `/packages/core/tsup.config.ts`

Add your CSS file to the component CSS copy list:
```typescript
const componentCssFiles = ['Icon.css', 'Button.css', 'ComponentName.css'];
```

**File:** `/packages/core/package.json`

Add CSS export:
```json
{
  "exports": {
    "./ComponentName.css": "./dist/ComponentName.css"
  }
}
```

#### 2.4 Build Core Package

```bash
cd packages/core && pnpm build
```

#### 2.5 Sync CLI Templates (Automatic)

The CLI templates are automatically synced when you build the CLI package. To manually sync:

```bash
cd packages/cli && pnpm sync
```

This copies components from `packages/core/src/` to `packages/cli/templates/` for CLI distribution.

---

### Step 3: Create Documentation Page in `/apps/docs`

#### 3.1 Documentation Files

Create two files:
- `/apps/docs/src/pages/ComponentName.tsx`
- `/apps/docs/src/pages/ComponentName.css`

**Reference:** See `Button.tsx`, `Tab.tsx`, or `ToolIcons.tsx` in `/apps/docs/src/pages/`.

**Page structure:**
```typescript
import { useState } from 'react';
import { ComponentName, Button, Tab } from '@as-design-system/core';
import '@as-design-system/core/ComponentName.css';
import '@as-design-system/core/Button.css';
import '@as-design-system/core/Tab.css';
import CodeModal from '../components/CodeModal';

export default function ComponentNamePage() {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'examples' | 'props'>('examples');

  return (
    <div className="component-page">
      {/* Title */}
      <h1 className="heading-5">ComponentName</h1>
      <p className="label-regular-m">Description in English.</p>

      {/* Tabs - Use design system Tab component */}
      <div style={{ display: 'flex', gap: '0', marginBottom: '32px' }}>
        <Tab
          label="Examples"
          size="M"
          status={activeTab === 'examples' ? 'Active' : 'Default'}
          onClick={() => setActiveTab('examples')}
        />
        <Tab
          label="Props"
          size="M"
          status={activeTab === 'props' ? 'Active' : 'Default'}
          onClick={() => setActiveTab('props')}
        />
      </div>

      {/* Examples Tab */}
      {activeTab === 'examples' && (
        <>
          <section className="component-section">
            <div className="section-header">
              <h2 className="heading-6">Variants</h2>
              <Button
                label="Code"
                leftIcon="code"
                size="S"
                variant="Outlined"
                onClick={() => setOpenModal('variants')}
              />
            </div>
            <div className="component-examples">
              {/* Component examples */}
            </div>
          </section>
          {/* More sections: Sizes, States, Icons, etc. */}
        </>
      )}

      {/* Props Tab */}
      {activeTab === 'props' && (
        <section className="component-section">
          <h2 className="heading-6">Props</h2>
          <div className="props-table">
            <table>
              <thead>
                <tr>
                  <th>Prop</th>
                  <th>Type</th>
                  <th>Default</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {/* Props rows */}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Code Modals */}
      <CodeModal
        isOpen={openModal === 'variants'}
        onClose={() => setOpenModal(null)}
        title="Variants Implementation"
        code={variantsCode}
      />
    </div>
  );
}
```

#### 3.2 Add Route

**File:** `/apps/docs/src/App.tsx`
```typescript
import ComponentName from './pages/ComponentName';
// ...
<Route path="/components/component-name" element={<ComponentName />} />
```

#### 3.3 Add Navigation Link

**File:** `/apps/docs/src/components/Layout.tsx`
```typescript
<Link
  to="/components/component-name"
  className={`nav-link nav-link-sub ${location.pathname === '/components/component-name' ? 'active' : ''}`}
>
  ComponentName
</Link>
```

---

### Step 4: Test

```bash
cd packages/core && pnpm build
cd apps/docs && pnpm dev
```

Check: variants, sizes, states, icons, accessibility, no console errors.

---

### Step 5: Commit & Push

```bash
git add .
git commit -m "feat: add ComponentName component with documentation"
git push
```

---

## 🎨 Design System Best Practices

### Use Design System Components in Documentation

**CRITICAL:** Documentation pages **must** use design system components:

✅ **DO:**
- Use `Tab` component for Examples/Props tabs
- Use `Button` component for "Code" buttons
- Use `Icon` component for icons
- Use design system typography classes (`heading-5`, `label-regular-m`)
- Use design system color tokens

❌ **DON'T:**
- Create custom styled buttons/tabs with inline styles
- Use hard-coded colors or spacing

### CSS Best Practices

**Color Tokens:**
```css
/* ✅ Good - Use tokens with fallbacks */
color: var(--primary-default, var(--sea-blue-70, #063b9e));

/* ❌ Bad - Hard-coded */
color: #063b9e;
```

**BEM-like Naming:**
```css
.component-name { /* block */ }
.component-name--modifier { /* modifier */ }
.component-name__element { /* element */ }
```

**Disabled State Pattern:**
```css
.component:disabled,
.component--disabled {
  opacity: 0.3;
  cursor: default;        /* NEVER use cursor: not-allowed */
  pointer-events: none;
}
```

**Hover States:**
```css
/* ✅ Good - Exclude active/disabled states */
.tab:not(:disabled):not(.tab--active):hover {
  background-color: var(--t-hover);
}

/* ❌ Bad - Hovers on active elements */
.tab:hover {
  background-color: var(--t-hover);
}
```

**Focus Styles:**
```css
.component:focus-visible {
  outline: 2px solid var(--primary-default, #063b9e);
  outline-offset: 2px;
}
```

### Icon Integration

Icons use inline SVG with direct imports for proper bundling:

```typescript
// Icon component automatically handles color via currentColor
import { Icon } from './Icon';

// In your component:
const iconSizeMap: Record<ComponentSize, number> = {
  S: 12,
  M: 16,
  L: 20,
  XL: 24,
};

// Icon color is controlled via CSS color property
const iconColor = variant === 'Default'
  ? 'var(--text-negative, #ffffff)'
  : 'var(--primary-default, #063b9e)';

<Icon name="add" size={iconSizeMap[size]} color={iconColor} />
```

**Available icons:** See `/packages/core/src/assets/svg/icons/` for all available icon files.

**⚠️ Important:** Icons use `?raw` imports and inline SVG rendering for proper color control and bundling.

### Typography

- Font family: `'Inter', sans-serif`
- Use consistent spacing: 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px

---

## 📝 Language & Documentation

- **All code and documentation must be in English**
- Props table must document all properties
- Code examples must be copy-paste ready
- Clear, concise component descriptions

---

## 🔄 Important Notes

### CSS Hot Reload

CSS files in `/packages/core` are **not** hot-reloaded. After modifying CSS:
1. Run `pnpm build` in `packages/core`
2. Changes will appear in docs

### Reference Files

When in doubt, refer to existing implementations:
- **Components:** `Button.tsx`, `Tab.tsx`, `Icon.tsx` in `/packages/core/src/components/`
- **Documentation:** Same files in `/apps/docs/src/pages/`
- **CSS patterns:** Check `Button.css`, `Tab.css` for structure
- **Tokens:** `/packages/core/src/tokens/` for color and typography tokens
- **Assets:** `/packages/core/src/assets/` for SVG icons and PNG tool icons

### Monorepo Structure

```
packages/
├── core/              # Design system components (single source of truth)
│   ├── src/
│   │   ├── components/  # All React components (.tsx + .css)
│   │   ├── tokens/      # Design tokens (colors, typography)
│   │   └── assets/      # SVG icons, PNG tool icons
│   └── dist/          # Built package
│
├── cli/               # CLI tool for component installation
│   ├── src/           # CLI source code
│   ├── templates/     # Component templates (synced from core)
│   └── scripts/
│       └── sync-templates.js  # Auto-sync script
│
└── apps/
    └── docs/          # Documentation site
        └── src/
            └── pages/ # Component documentation pages
```

### CLI Template Sync

Templates in `packages/cli/templates/` are automatically synced from `packages/core/src/`:

- **Automatic sync:** Runs before `pnpm build` and `pnpm publish`
- **Manual sync:** `cd packages/cli && pnpm sync`
- **Single source:** Only maintain code in `packages/core/src/`

This ensures CLI users always get the latest component versions when using `asds add <component>`.

---

## ✅ Component Implementation Checklist

- [ ] Inspect Figma design with MCP
- [ ] Create `.tsx` and `.css` files in `/packages/core/src/`
- [ ] Export component from `index.ts`
- [ ] Add CSS to `tsup.config.ts` and `package.json`
- [ ] Build core package (`pnpm build`)
- [ ] Create documentation page with Examples/Props tabs
- [ ] Use design system components (Tab, Button) in documentation
- [ ] Add route in `App.tsx`
- [ ] Add navigation link in `Layout.tsx`
- [ ] All text in English
- [ ] Test all variants, sizes, states
- [ ] No console errors
- [ ] Commit and push

---

**This workflow ensures consistency across all components in the AS Design System.**
