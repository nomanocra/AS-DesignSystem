/**
 * Generate Icon.tsx imports from SVG files
 *
 * This script scans the assets/svg/icons directory and generates:
 * - Import statements for all SVG files
 * - iconMap object mapping icon names to imported content
 *
 * Run: node scripts/generate-icon-imports.js
 */

const fs = require('fs');
const path = require('path');

// Paths
const ICONS_DIR = path.join(__dirname, '../src/assets/svg/icons');
const ICON_COMPONENT_PATH = path.join(__dirname, '../src/components/Icon.tsx');

// Helper to convert filename to camelCase variable name
function toCamelCase(filename) {
  // Remove .svg extension
  const name = filename.replace('.svg', '');

  // Handle special cases
  if (name === 'add') return 'addIcon';
  if (name === 'delete') return 'deleteIcon';

  // Convert kebab-case or snake_case to camelCase
  return name
    .split(/[-_]/)
    .map((part, index) => {
      if (index === 0) return part.toLowerCase();
      return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
    })
    .join('') + 'Icon';
}

// Read all SVG files
console.log('📂 Scanning SVG files in:', ICONS_DIR);
const files = fs.readdirSync(ICONS_DIR)
  .filter(file => file.endsWith('.svg'))
  .sort();

console.log(`✅ Found ${files.length} SVG files`);

// Generate imports
const imports = files.map(file => {
  const varName = toCamelCase(file);
  const iconName = file.replace('.svg', '');
  return {
    varName,
    iconName,
    file,
    import: `import ${varName} from '../assets/svg/icons/${file}?raw';`
  };
});

// Generate iconMap entries
const iconMapEntries = imports.map(({ varName, iconName }) => {
  return `  '${iconName}': ${varName},`;
});

// Read the current Icon.tsx
let iconTsx = fs.readFileSync(ICON_COMPONENT_PATH, 'utf-8');

// Find the import section (from first import to before "// Build iconMap")
const importSectionStart = iconTsx.indexOf('import');
const importSectionEnd = iconTsx.indexOf('// Build iconMap');

if (importSectionStart === -1 || importSectionEnd === -1) {
  console.error('❌ Could not find import section markers in Icon.tsx');
  process.exit(1);
}

// Find the iconMap section
const iconMapStart = iconTsx.indexOf('const iconMap: Record<string, string> = {');
const iconMapEnd = iconTsx.indexOf('};', iconMapStart);

if (iconMapStart === -1 || iconMapEnd === -1) {
  console.error('❌ Could not find iconMap section in Icon.tsx');
  process.exit(1);
}

// Generate iconNames export
const iconNamesExport = `export const availableIcons = [\n${imports.map(({ iconName }) => `  '${iconName}',`).join('\n')}\n] as const;\n\nexport type IconName = typeof availableIcons[number];`;

// Find where the component code starts (after any existing exports)
// Look for "export interface IconProps" as the boundary
let componentStart = iconTsx.indexOf('export interface IconProps');
if (componentStart === -1) {
  // Fallback: look for the Icon component function
  componentStart = iconTsx.indexOf('export function Icon');
}
if (componentStart === -1) {
  console.error('❌ Could not find component code in Icon.tsx');
  process.exit(1);
}

// Generate new content
const preImports = iconTsx.substring(0, importSectionStart);
const postExports = iconTsx.substring(componentStart);

const newImports = imports.map(i => i.import).join('\n');
const newIconMap = `const iconMap: Record<string, string> = {\n${iconMapEntries.join('\n')}\n}`;

const newContent = `${preImports}${newImports}\n\n// Build iconMap from imported icons\n${newIconMap};\n\n${iconNamesExport}\n\n${postExports}`;

// Write the updated file
fs.writeFileSync(ICON_COMPONENT_PATH, newContent, 'utf-8');

console.log('✨ Icon.tsx updated successfully!');
console.log(`   - ${imports.length} imports generated`);
console.log(`   - ${iconMapEntries.length} iconMap entries generated`);
console.log(`   - availableIcons array exported`);
