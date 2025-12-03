# Typography Tokens

Les tokens de typographie sont générés depuis Figma et disponibles sous deux formes :
1. **Tokens TypeScript** : Pour une utilisation programmatique
2. **Classes CSS** : Pour une utilisation directe dans le HTML/JSX

## Installation

```bash
pnpm add @as-design-system/tokens
```

## Utilisation des Classes CSS

### Import du CSS

```css
@import '@as-design-system/tokens/typography.css';
```

Ou dans votre fichier JavaScript/TypeScript :

```typescript
import '@as-design-system/tokens/typography.css';
```

### Utilisation

```tsx
<h1 className="heading-1">Titre Principal</h1>
<h2 className="heading-2">Sous-titre</h2>
<p className="label-regular-m">Texte de label</p>
```

## Classes disponibles

### Headings

- `.heading-1` - 56px, Bold, line-height 80px
- `.subheading-1` - 56px, Light, line-height 80px
- `.heading-2` - 48px, Bold, line-height 72px
- `.subheading-2` - 48px, Light, line-height 72px
- `.heading-3` - 36px, Bold, line-height 56px
- `.subheading-3` - 36px, Light, line-height 56px
- `.heading-4` - 32px, Bold, line-height 48px
- `.subheading-4` - 32px, Light, line-height 48px
- `.heading-5` - 24px, Bold, line-height 40px
- `.subheading-5` - 24px, Light, line-height 40px
- `.heading-6` - 20px, Bold, line-height 32px
- `.subheading-6` - 20px, Light, line-height 32px

### Labels - Large (18px)

- `.label-bold-l`
- `.label-medium-l`
- `.label-regular-l`
- `.label-light-l`

### Labels - Medium (16px)

- `.label-bold-m`
- `.label-medium-m`
- `.label-regular-m`
- `.label-light-m`

### Labels - Small (14px)

- `.label-bold-s`
- `.label-medium-s`
- `.label-regular-s`
- `.label-light-s`

### Labels - Extra Small (12px)

- `.label-bold-xs`
- `.label-medium-xs`
- `.label-regular-xs`
- `.label-light-xs`

### Legends (11px)

- `.legend-bold`
- `.legend-medium`

### System - Monospace

- `.system-l` - 18px, Roboto Mono
- `.system-m` - 16px, Roboto Mono
- `.system-s` - 14px, Roboto Mono
- `.system-xs` - 12px, Roboto Mono

## Utilisation des Tokens TypeScript

```typescript
import { typography } from '@as-design-system/tokens';

// Accéder aux valeurs
const heading1Style = typography.headings.h1;
// { fontFamily: "'Inter', sans-serif", fontSize: "56px", fontWeight: 700, lineHeight: "80px" }

// Utiliser dans du style inline React
<div style={typography.headings.h1}>Titre</div>
```

## Fonts

Les polices sont chargées automatiquement via Google Fonts :
- **Inter** : Light (300), Regular (400), Medium (500), Bold (700)
- **Roboto Mono** : Regular (400)

