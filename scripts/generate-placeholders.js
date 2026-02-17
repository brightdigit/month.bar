#!/usr/bin/env node

/**
 * Generate placeholder images for MonthBar website
 * Creates SVG-based placeholders that can be converted to PNG later
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, '..', 'public');
const iconDir = path.join(publicDir, 'images', 'app-icon');
const screenshotsDir = path.join(publicDir, 'images', 'screenshots');

// Ensure directories exist
fs.mkdirSync(iconDir, { recursive: true });
fs.mkdirSync(screenshotsDir, { recursive: true });

/**
 * Generate a pie chart SVG icon with 75% progress
 */
function generateIconSVG(size) {
  const center = size / 2;
  const radius = size / 2 - 20;

  // Calculate 75% arc
  const startAngle = -Math.PI / 2; // Start at top
  const endAngle = startAngle + (2 * Math.PI * 0.75);

  const startX = center + radius * Math.cos(startAngle);
  const startY = center + radius * Math.sin(startAngle);
  const endX = center + radius * Math.cos(endAngle);
  const endY = center + radius * Math.sin(endAngle);

  // Large arc flag for > 180 degrees
  const largeArcFlag = 1;

  const path = `M ${center} ${center} L ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY} Z`;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0071e3;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#0051a8;stop-opacity:1" />
    </linearGradient>
  </defs>

  <!-- Background circle -->
  <circle cx="${center}" cy="${center}" r="${radius}" fill="#f5f5f7" />

  <!-- Progress pie (75%) -->
  <path d="${path}" fill="url(#iconGradient)" />

  <!-- Center circle -->
  <circle cx="${center}" cy="${center}" r="${radius * 0.4}" fill="white" />

  <!-- Percentage text -->
  <text x="${center}" y="${center}"
        font-family="-apple-system, BlinkMacSystemFont, sans-serif"
        font-size="${size * 0.15}"
        font-weight="600"
        text-anchor="middle"
        dominant-baseline="middle"
        fill="#0071e3">75%</text>

  <!-- PREVIEW watermark -->
  <text x="${center}" y="${size - 30}"
        font-family="-apple-system, BlinkMacSystemFont, sans-serif"
        font-size="16"
        font-weight="500"
        text-anchor="middle"
        fill="#86868b"
        opacity="0.5">PREVIEW</text>
</svg>`;
}

/**
 * Generate OG image SVG (1200x630)
 */
function generateOGImageSVG() {
  const width = 1200;
  const height = 630;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#f5f5f7;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#e8e8ed;stop-opacity:1" />
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="${width}" height="${height}" fill="url(#bgGradient)" />

  <!-- Icon (centered, 200x200) -->
  <g transform="translate(${width/2 - 100}, ${height/2 - 150})">
    <circle cx="100" cy="100" r="90" fill="#f5f5f7" />
    <path d="M 100 100 L 100 10 A 90 90 0 1 1 36.967 163.033 Z" fill="#0071e3" />
    <circle cx="100" cy="100" r="36" fill="white" />
    <text x="100" y="100"
          font-family="-apple-system, BlinkMacSystemFont, sans-serif"
          font-size="30"
          font-weight="600"
          text-anchor="middle"
          dominant-baseline="middle"
          fill="#0071e3">75%</text>
  </g>

  <!-- Title -->
  <text x="${width/2}" y="${height/2 + 100}"
        font-family="-apple-system, BlinkMacSystemFont, sans-serif"
        font-size="64"
        font-weight="700"
        text-anchor="middle"
        fill="#1d1d1f">MonthBar</text>

  <!-- Subtitle -->
  <text x="${width/2}" y="${height/2 + 160}"
        font-family="-apple-system, BlinkMacSystemFont, sans-serif"
        font-size="32"
        font-weight="400"
        text-anchor="middle"
        fill="#6e6e73">Track your month's progress</text>

  <!-- PREVIEW watermark -->
  <text x="${width - 100}" y="${height - 30}"
        font-family="-apple-system, BlinkMacSystemFont, sans-serif"
        font-size="24"
        font-weight="500"
        text-anchor="end"
        fill="#86868b"
        opacity="0.5">PREVIEW</text>
</svg>`;
}

/**
 * Generate screenshot SVG (2560x1600)
 */
function generateScreenshotSVG(variant) {
  const width = 2560;
  const height = 1600;

  const screenshots = {
    1: {
      title: 'MenuBar with Pie Chart Icon',
      description: 'Visual progress indicator in your MenuBar'
    },
    2: {
      title: 'Two Display Styles',
      description: 'Choose between pie chart or percentage text'
    },
    3: {
      title: 'Settings Panel',
      description: 'Customize your display preferences'
    }
  };

  const { title, description } = screenshots[variant];

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGradient${variant}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1d1d1f;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#2c2c2e;stop-opacity:1" />
    </linearGradient>
  </defs>

  <!-- Background (dark mode) -->
  <rect width="${width}" height="${height}" fill="url(#bgGradient${variant})" />

  <!-- MenuBar mockup (top) -->
  <rect x="0" y="0" width="${width}" height="80" fill="#000000" opacity="0.9" />

  <!-- Icon in MenuBar (right side) -->
  <g transform="translate(${width - 200}, 20)">
    <circle cx="40" cy="40" r="32" fill="#3a3a3c" />
    <path d="M 40 40 L 40 8 A 32 32 0 1 1 16.8 56.8 Z" fill="#0071e3" />
    <circle cx="40" cy="40" r="13" fill="#1d1d1f" />
  </g>

  <!-- Content area -->
  <g transform="translate(${width/2}, ${height/2})">
    <!-- Title -->
    <text x="0" y="-100"
          font-family="-apple-system, BlinkMacSystemFont, sans-serif"
          font-size="96"
          font-weight="700"
          text-anchor="middle"
          fill="#f5f5f7">${title}</text>

    <!-- Description -->
    <text x="0" y="0"
          font-family="-apple-system, BlinkMacSystemFont, sans-serif"
          font-size="48"
          font-weight="400"
          text-anchor="middle"
          fill="#86868b">${description}</text>

    <!-- Large preview icon -->
    <g transform="translate(-150, 100)">
      <circle cx="150" cy="150" r="140" fill="#3a3a3c" />
      <path d="M 150 150 L 150 10 A 140 140 0 1 1 36.4 250.4 Z" fill="#0071e3" />
      <circle cx="150" cy="150" r="56" fill="#1d1d1f" />
      <text x="150" y="150"
            font-family="-apple-system, BlinkMacSystemFont, sans-serif"
            font-size="56"
            font-weight="600"
            text-anchor="middle"
            dominant-baseline="middle"
            fill="#0071e3">75%</text>
    </g>
  </g>

  <!-- PREVIEW watermark -->
  <text x="${width - 100}" y="${height - 50}"
        font-family="-apple-system, BlinkMacSystemFont, sans-serif"
        font-size="48"
        font-weight="500"
        text-anchor="end"
        fill="#86868b"
        opacity="0.5">PREVIEW</text>
</svg>`;
}

/**
 * Generate simple favicon.ico (SVG-based)
 * Note: Browsers support SVG favicons
 */
function generateFaviconSVG() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
  <circle cx="16" cy="16" r="14" fill="#f5f5f7" />
  <path d="M 16 16 L 16 2 A 14 14 0 1 1 6.2 25.8 Z" fill="#0071e3" />
  <circle cx="16" cy="16" r="5.6" fill="white" />
</svg>`;
}

// Generate all files
console.log('Generating SVG placeholder images...\n');

// App icons
console.log('Creating app icon SVG placeholders...');
fs.writeFileSync(path.join(iconDir, 'icon-512.svg'), generateIconSVG(512));
fs.writeFileSync(path.join(iconDir, 'icon-1024.svg'), generateIconSVG(1024));
console.log('✓ icon-512.svg');
console.log('✓ icon-1024.svg');

// OG image
console.log('\nCreating OG image SVG placeholder...');
fs.writeFileSync(path.join(iconDir, 'og-image.svg'), generateOGImageSVG());
console.log('✓ og-image.svg');

// Favicon
console.log('\nCreating favicon SVG...');
fs.writeFileSync(path.join(publicDir, 'favicon.svg'), generateFaviconSVG());
console.log('✓ favicon.svg');

// Screenshots
console.log('\nCreating screenshot SVG placeholders...');
for (let i = 1; i <= 3; i++) {
  const filename = `screenshot-${i}.svg`;
  fs.writeFileSync(path.join(screenshotsDir, filename), generateScreenshotSVG(i));
  console.log(`✓ ${filename}`);
}

console.log('\n✅ All SVG placeholder images generated successfully!');
console.log('\nNote: These are SVG placeholders for development.');
console.log('Using optimized app icons from public/images/app-icon/');
console.log('Replace placeholders with production assets when ready.\n');
