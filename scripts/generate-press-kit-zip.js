#!/usr/bin/env node

/**
 * Generate press kit ZIP from app icons and screenshots
 * Runs automatically during the build process
 */

import archiver from 'archiver';
import { createWriteStream, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicDir = join(__dirname, '..', 'public');
const outputDir = join(publicDir, 'downloads');
const outputPath = join(outputDir, 'monthbar-press-kit.zip');

const iconDir = join(publicDir, 'images', 'app-icon');
const screenshotDir = join(publicDir, 'images', 'screenshots');

const readme = `MonthBar Press Kit
==================

App Name: MonthBar
Developer: BrightDigit
Platform: macOS
Price: Free
Category: Productivity
Website: https://month.bar
TestFlight: https://testflight.apple.com/join/N8n1fSPE

Description
-----------
MonthBar is a minimal macOS MenuBar app that shows your monthly progress at a glance.
Choose between a pie chart or percentage text display. Toggle between viewing remaining
or elapsed time. Privacy-first — no network connection, no data collection, no accounts.
Native macOS app built with SwiftUI.

Contents
--------
icons/        - App icons in PNG and WebP formats (512px, 1024px)
screenshots/  - App screenshots in light and dark mode (WebP)

Usage Guidelines
----------------
- Use the provided app icon files without modification
- Maintain the original aspect ratio
- Do not alter icon colors, add effects, or distort the icon
- Allow sufficient clear space around the icon

For press inquiries, visit https://month.bar/press
`;

const icons = [
  'icon-512.png',
  'icon-512.webp',
  'icon-1024.png',
  'icon-1024.webp',
];

const screenshots = [
  'light-mode/pie-elapsed.webp',
  'light-mode/pie-remaining.webp',
  'light-mode/percent-elapsed.webp',
  'light-mode/percent-remaining.webp',
  'light-mode/no-menu.webp',
  'dark-mode/pie-elapsed.webp',
  'dark-mode/pie-remaining.webp',
  'dark-mode/percent-elapsed.webp',
  'dark-mode/percent-remaining.webp',
  'dark-mode/no-menu.webp',
];

console.log('📦 Generating press kit ZIP...');

async function generatePressKit() {
  try {
    mkdirSync(outputDir, { recursive: true });

    const output = createWriteStream(outputPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    const done = new Promise((resolve, reject) => {
      output.on('close', resolve);
      archive.on('error', reject);
    });

    archive.pipe(output);

    // Add README
    archive.append(readme, { name: 'README.txt' });

    // Add icons
    for (const icon of icons) {
      archive.file(join(iconDir, icon), { name: `icons/${icon}` });
      console.log(`  ✓ Added icons/${icon}`);
    }

    // Add screenshots
    for (const screenshot of screenshots) {
      archive.file(join(screenshotDir, screenshot), { name: `screenshots/${screenshot}` });
      console.log(`  ✓ Added screenshots/${screenshot}`);
    }

    await archive.finalize();
    await done;

    console.log('✅ Press kit ZIP generated!\n');
  } catch (error) {
    console.error('❌ Error generating press kit:', error);
    process.exit(1);
  }
}

generatePressKit();
