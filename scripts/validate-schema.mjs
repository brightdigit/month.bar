import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '..', 'dist');

function extractJsonLdBlocks(html) {
  const regex = /<script type="application\/ld\+json"[^>]*>([^<]+)<\/script>/g;
  const blocks = [];
  let match;

  while ((match = regex.exec(html)) !== null) {
    blocks.push(match[1]);
  }

  return blocks;
}

function findHtmlFiles(dir) {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  entries.forEach(entry => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...findHtmlFiles(fullPath));
    } else if (entry.name.endsWith('.html')) {
      files.push(fullPath);
    }
  });

  return files;
}

function validateSchemaFiles() {
  if (!fs.existsSync(distDir)) {
    console.error(`Error: dist directory not found at ${distDir}`);
    process.exit(1);
  }

  const htmlFiles = findHtmlFiles(distDir);

  if (htmlFiles.length === 0) {
    console.error('Error: no HTML files found in dist directory');
    process.exit(1);
  }

  let totalSchemas = 0;
  let validSchemas = 0;
  const results = [];

  htmlFiles.forEach(filePath => {
    const html = fs.readFileSync(filePath, 'utf-8');
    const blocks = extractJsonLdBlocks(html);
    const relativeFile = path.relative(distDir, filePath);

    blocks.forEach((block, index) => {
      totalSchemas++;
      try {
        const schema = JSON.parse(block);
        validSchemas++;
        const schemaType = schema['@type'] || 'Unknown';
        results.push(`✓ ${relativeFile} - ${schemaType}`);
      } catch (error) {
        results.push(`✗ ${relativeFile} - Invalid JSON-LD: ${error.message}`);
      }
    });
  });

  console.log('\n=== JSON-LD Schema Validation ===\n');
  results.forEach(result => console.log(result));
  console.log(`\n${validSchemas}/${totalSchemas} schemas valid\n`);

  if (validSchemas !== totalSchemas) {
    process.exit(1);
  }
}

validateSchemaFiles();
