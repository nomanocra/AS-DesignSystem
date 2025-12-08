#!/usr/bin/env node

import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CORE_SRC = path.resolve(__dirname, '../../core/src');
const CLI_TEMPLATES = path.resolve(__dirname, '../templates');

console.log('🔄 Syncing templates from core...\n');

try {
  // Ensure templates directory exists
  fs.ensureDirSync(CLI_TEMPLATES);

  // Sync components
  console.log('📦 Syncing components...');
  const componentsSource = path.join(CORE_SRC, 'components');
  const componentsTarget = path.join(CLI_TEMPLATES, 'components');

  if (fs.existsSync(componentsSource)) {
    fs.copySync(componentsSource, componentsTarget, { overwrite: true });
    const componentFiles = fs.readdirSync(componentsTarget);
    console.log(`   ✅ ${componentFiles.length} files synced`);
  } else {
    console.warn('   ⚠️  Components source not found');
  }

  // Sync assets
  console.log('🎨 Syncing assets...');
  const assetsSource = path.join(CORE_SRC, 'assets');
  const assetsTarget = path.join(CLI_TEMPLATES, 'assets');

  if (fs.existsSync(assetsSource)) {
    fs.copySync(assetsSource, assetsTarget, { overwrite: true });

    // Count SVG icons
    const svgIconsPath = path.join(assetsTarget, 'svg', 'icons');
    const svgCount = fs.existsSync(svgIconsPath)
      ? fs.readdirSync(svgIconsPath).length
      : 0;

    // Count PNG icons
    const pngIconsPath = path.join(assetsTarget, 'png', 'tool-icons');
    const pngCount = fs.existsSync(pngIconsPath)
      ? fs.readdirSync(pngIconsPath).length
      : 0;

    console.log(`   ✅ ${svgCount} SVG icons + ${pngCount} PNG icons synced`);
  } else {
    console.warn('   ⚠️  Assets source not found');
  }

  // Sync tokens
  console.log('🎯 Syncing tokens...');
  const tokensSource = path.join(CORE_SRC, 'tokens');
  const tokensTarget = path.join(CLI_TEMPLATES, 'tokens');

  if (fs.existsSync(tokensSource)) {
    fs.copySync(tokensSource, tokensTarget, { overwrite: true });
    const tokenFiles = fs.readdirSync(tokensTarget);
    console.log(`   ✅ ${tokenFiles.length} files synced`);
  } else {
    console.warn('   ⚠️  Tokens source not found');
  }

  console.log('\n✨ Templates synced successfully!\n');

  // Show summary
  console.log('📊 Summary:');
  console.log(`   Source: ${CORE_SRC}`);
  console.log(`   Target: ${CLI_TEMPLATES}`);

} catch (error) {
  console.error('❌ Error syncing templates:', error.message);
  process.exit(1);
}
