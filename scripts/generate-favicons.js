#!/usr/bin/env node

/**
 * Generate favicons from the app icon
 * Runs automatically during the build process
 */

import sharp from 'sharp';
import toIco from 'to-ico';
import { writeFileSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicDir = join(__dirname, '..', 'public');
const iconDir = join(publicDir, 'images', 'app-icon');
const sourceIcon = join(iconDir, 'icon-1024.png');

const favicons = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'apple-touch-icon.png', size: 180 }
];

console.log('🎨 Generating favicons...');

async function generateFavicons() {
  try {
    // Ensure output directory exists
    mkdirSync(iconDir, { recursive: true });

    // Generate PNG favicons
    for (const favicon of favicons) {
      const outputPath = join(iconDir, favicon.name);
      await sharp(sourceIcon)
        .resize(favicon.size, favicon.size, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .png({ quality: 100 })
        .toFile(outputPath);

      console.log(`  ✓ Generated ${favicon.name} (${favicon.size}x${favicon.size})`);
    }

    // Generate multi-size favicon.ico with proper ICO format
    const icoSizes = [16, 32, 48];
    const icoBuffers = [];

    for (const size of icoSizes) {
      const buffer = await sharp(sourceIcon)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .png()
        .toBuffer();
      icoBuffers.push(buffer);
    }

    // Create proper multi-resolution ICO file
    const icoBuffer = await toIco(icoBuffers);
    writeFileSync(join(publicDir, 'favicon.ico'), icoBuffer);
    console.log('  ✓ Generated favicon.ico (multi-resolution ICO format)');

    console.log('✅ Favicon generation complete!\n');
  } catch (error) {
    console.error('❌ Error generating favicons:', error);
    process.exit(1);
  }
}

generateFavicons();
