# AS Design System

Design System React avec composants, tokens, et icônes générés depuis Figma.

## 🏗️ Structure du projet

```
as-design-system/
├── packages/
│   ├── core/              # Composants React + Tokens + Icônes
│   └── cli/               # CLI pour installation des composants
├── apps/
│   └── docs/              # Application de documentation
└── Configuration monorepo
```

## 📦 Packages

### `@as-design-system/core`
Package principal contenant :
- **Composants React** : Button, Icon, IconButton, Tab, ToolIcons
- **Design tokens** : Couleurs, typographie
- **39 icônes SVG** : Icônes AS + Material Icons

### `@as-design-system/cli`
CLI pour installer rapidement les composants dans votre projet.

## 🚀 Démarrage

### Prérequis

- Node.js >= 18.0.0
- pnpm >= 8.0.0

### Installation

```bash
# Installer les dépendances
pnpm install

# Build tous les packages
pnpm build
```

### Développement

```bash
# Lancer l'app de documentation en mode développement
cd apps/docs
pnpm dev

# Build le package core
cd packages/core
pnpm build

# Vérification TypeScript
pnpm type-check
```

## 📚 Documentation

L'application de documentation est accessible via `pnpm dev` et permet de :
- Visualiser tous les composants avec exemples interactifs
- Explorer les tokens (couleurs, typographie)
- Consulter les 39 icônes disponibles
- Voir les exemples d'utilisation avec code

## 🎨 Ajouter de nouvelles icônes

```bash
# 1. Ajouter vos fichiers SVG dans:
packages/core/src/assets/svg/icons/

# 2. Générer les imports automatiquement:
cd packages/core
pnpm generate-icons

# 3. Rebuild le package:
pnpm build
```

Les icônes apparaîtront automatiquement dans la documentation!

## 🛠️ Technologies

- **TypeScript** : Typage statique
- **React 18** : Framework UI
- **Vite** : Build tool & dev server
- **CSS Modules** : Styling avec CSS variables
- **pnpm workspaces** : Monorepo
- **tsup** : Build rapide TypeScript
- **Figma MCP** : Extraction des composants depuis Figma

## 📖 Plus d'infos

Pour les détails techniques et conventions de développement, voir [CLAUDE.md](./CLAUDE.md).
