# Plan d'Approche - AS Design System

## Vue d'ensemble

Création d'un design system basé sur Figma et Figma MCP pour générer des composants React, des tokens, et une documentation interactive.

## Architecture en 2 Phases

### Phase 1 : Génération et Documentation (Actuelle)

**Objectifs :**
- Générer les composants depuis Figma via MCP
- Générer les tokens (couleurs, typographie, espacements) depuis Figma
- Créer une application de documentation pour visualiser les composants et tokens
- Tester et valider les composants localement

**Structure :**
```
as-design-system/
├── packages/
│   ├── core/              # Composants React (générés depuis Figma)
│   ├── tokens/            # Design tokens (générés depuis Figma)
│   └── icons/             # Icônes SVG (générées depuis Figma)
├── apps/
│   └── docs/              # Application de documentation (Vite + React + React Router)
```

**Utilisation en Phase 1 :**
- Import direct depuis les packages (npm link en local)
- Build et publication npm classique
- Test dans l'app de documentation

### Phase 2 : Distribution et CLI (Future)

**Objectifs :**
- Créer un CLI pour installer les composants individuellement (style shadcn-ui)
- Système de copie de fichiers dans les projets utilisateurs
- Configuration automatique
- Documentation d'installation

**Ajouts :**
```
├── packages/
│   └── cli/               # CLI pour installation des composants
```

## Stack Technique

### Core
- **TypeScript** : Typage statique
- **React 18+** : Framework UI (vanilla, pas Next.js)
- **Vite** : Build tool pour les packages et la doc

### Styling
- **CSS Modules** : Scoping automatique, TypeScript support
- **PostCSS** : Autoprefixer, etc.
- **CSS Variables** : Pour les tokens

### Build & Distribution
- **tsup** : Build TypeScript optimisé
- **pnpm workspaces** : Gestion du monorepo
- **Changesets** : Versioning (Phase 2)

### Documentation
- **Vite + React** : Application de documentation
- **React Router** : Navigation entre les pages
- **MDX** : Documentation enrichie (optionnel)
- **Navigation custom** : Menu latéral pour composants et tokens

### Figma Integration
- **Figma MCP** : Model Context Protocol pour extraire les données
- **Node.js scripts** : Synchronisation Figma → Code

### Installation (Phase 2)
- **Commander.js** : CLI framework
- **degit** ou copy : Installation de composants

## Décisions Techniques

### ✅ Choisi
- React vanilla (pas Next.js) pour les composants
- CSS Modules pour le styling
- Documentation from scratch (pas Storybook)
- Composants créés de zéro (pas Radix UI pour l'instant)

### ⏸️ À décider plus tard
- Utilisation de Radix UI si nécessaire pour certains composants complexes
- CLI vs npm classique pour la distribution

## Workflow de Synchronisation Figma

1. **Script de sync** : Utilise Figma MCP pour récupérer les données
2. **Transformation** : Parse et transforme en tokens/composants
3. **Génération** : Génère les fichiers TypeScript/React
4. **Validation** : Tests et vérification dans la documentation

## Structure des Packages

### `@as-design-system/core`
Composants React réutilisables générés depuis Figma.

### `@as-design-system/tokens`
Design tokens (couleurs, typographie, espacements, ombres, breakpoints).

### `@as-design-system/icons`
Bibliothèque d'icônes SVG converties en composants React.

### `@as-design-system/cli` (Phase 2)
CLI pour installer les composants dans les projets utilisateurs.

## Prochaines Étapes

### Phase 1 - En cours
- [x] Documentation du plan
- [ ] Setup monorepo (pnpm workspaces)
- [ ] Structure des packages (core, tokens, icons)
- [ ] Configuration TypeScript
- [ ] App de documentation (structure de base)
- [ ] Configuration Figma MCP (structure des scripts)
- [ ] Génération des tokens depuis Figma
- [ ] Génération des composants depuis Figma
- [ ] Génération des icônes depuis Figma

### Phase 2 - À venir
- [ ] Package CLI
- [ ] Système d'installation de composants
- [ ] Documentation d'installation
- [ ] Tests d'intégration

## Notes

- Les composants doivent être utilisables dans n'importe quel projet React (Next.js, Vite, CRA, etc.)
- L'accessibilité doit être prise en compte dès le début
- Les composants doivent être personnalisables via les tokens

