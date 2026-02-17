#!/usr/bin/env node

/**
 * Generate favicons from the app icon
 * Runs automatically during the build process
 */

import sharp from 'sharp';
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

function encodeIco(pngBuffers, sizes) {
  const count = pngBuffers.length;

  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);     // reserved
  header.writeUInt16LE(1, 2);     // type: 1 = ICO
  header.writeUInt16LE(count, 4); // number of images

  const dataOffset = 6 + count * 16;
  const directoryEntries = [];
  let currentOffset = dataOffset;

  for (let i = 0; i < count; i++) {
    const size = sizes[i];
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0);  // width
    entry.writeUInt8(size >= 256 ? 0 : size, 1);  // height
    entry.writeUInt8(0, 2);                        // color count (true color)
    entry.writeUInt8(0, 3);                        // reserved
    entry.writeUInt16LE(1, 4);                     // color planes
    entry.writeUInt16LE(32, 6);                    // bits per pixel
    entry.writeUInt32LE(pngBuffers[i].length, 8);  // data size
    entry.writeUInt32LE(currentOffset, 12);        // data offset
    directoryEntries.push(entry);
    currentOffset += pngBuffers[i].length;
  }

  return Buffer.concat([header, ...directoryEntries, ...pngBuffers]);
}

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
    const icoBuffer = encodeIco(icoBuffers, icoSizes);
    writeFileSync(join(publicDir, 'favicon.ico'), icoBuffer);
    console.log('  ✓ Generated favicon.ico (multi-resolution ICO format)');

    console.log('✅ Favicon generation complete!\n');
  } catch (error) {
    console.error('❌ Error generating favicons:', error);
    process.exit(1);
  }
}

generateFavicons();
