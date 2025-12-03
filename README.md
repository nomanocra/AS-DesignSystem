# AS Design System

Design System basé sur Figma avec génération automatique de composants et tokens via Figma MCP.

## 🏗️ Structure du projet

```
as-design-system/
├── packages/
│   ├── core/              # Composants React
│   ├── tokens/            # Design tokens (couleurs, typographie, etc.)
│   └── icons/             # Bibliothèque d'icônes
├── apps/
│   └── docs/              # Application de documentation
├── scripts/
│   └── sync-figma.js      # Scripts de synchronisation Figma MCP
└── Configuration monorepo
```

## 📦 Packages

### `@as-design-system/core`
Composants React réutilisables générés depuis Figma.

### `@as-design-system/tokens`
Design tokens (couleurs, typographie, espacements, ombres, breakpoints).

### `@as-design-system/icons`
Bibliothèque d'icônes SVG converties en composants React.

## 🚀 Démarrage

### Prérequis

- Node.js >= 18.0.0
- pnpm >= 8.0.0

### Installation

```bash
# Installer les dépendances
pnpm install
```

### Développement

```bash
# Lancer l'app de documentation en mode développement
pnpm dev

# Build tous les packages
pnpm build

# Vérification TypeScript
pnpm type-check
```

## 📚 Documentation

L'application de documentation est accessible via `pnpm dev` et permet de :
- Visualiser les composants
- Explorer les tokens
- Consulter les exemples d'utilisation

## 🔄 Synchronisation Figma

Les scripts de synchronisation Figma MCP seront implémentés dans `scripts/sync-figma.js` pour :
- Extraire les tokens depuis Figma
- Générer les composants React
- Générer les icônes SVG

## 📝 Plan d'approche

Voir [PLAN.md](./PLAN.md) pour le plan détaillé du projet.

## 🛠️ Technologies

- **TypeScript** : Typage statique
- **React 18+** : Framework UI
- **Vite** : Build tool
- **CSS Modules** : Styling
- **pnpm workspaces** : Monorepo
- **Figma MCP** : Synchronisation Figma → Code

