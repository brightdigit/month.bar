# MonthBar Website

Static marketing website for **MonthBar** - a macOS MenuBar app that displays the progress of the current month.

Built with [Astro](https://astro.build) and deployed to GitHub Pages.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Generate placeholder images
npm run generate:placeholders

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
month.bar/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment workflow
├── content/                    # Original marketing content (reference only)
│   ├── privacy.md
│   ├── app-store-metadata.md
│   └── features.md
├── public/
│   ├── images/
│   │   ├── app-icon/           # App icons (512, 1024, og-image, favicon)
│   │   └── screenshots/        # App screenshots (3 screenshots)
│   └── robots.txt              # SEO robots file
├── scripts/
│   └── generate-placeholders.js # Placeholder image generator
├── src/
│   ├── components/             # Reusable Astro components
│   │   ├── FeatureCard.astro
│   │   ├── Features.astro
│   │   └── Hero.astro
│   ├── content/
│   │   ├── config.ts           # Content collection schema
│   │   └── docs/
│   │       └── privacy.md      # Privacy policy content
│   ├── layouts/
│   │   ├── BaseLayout.astro    # Base layout with SEO
│   │   └── ContentLayout.astro # Layout for markdown content
│   ├── pages/
│   │   ├── index.astro         # Homepage
│   │   ├── privacy.astro       # Privacy policy page
│   │   └── 404.astro           # 404 error page
│   └── styles/
│       └── global.css          # Global styles and design system
├── astro.config.mjs            # Astro configuration
├── tailwind.config.mjs         # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
└── package.json
```

## 🎨 Design System

The website uses a macOS-inspired design system with:

- **Colors**: Apple-inspired palette with Apple Blue (#0071e3) accent
- **Typography**: System font stack (-apple-system, BlinkMacSystemFont, etc.)
- **Dark Mode**: Automatic based on system preference (prefers-color-scheme)
- **Responsive**: Mobile-first design with breakpoints for tablet/desktop

## 🖼️ Placeholder Images

Current placeholder images are SVG-based with "PREVIEW" watermarks. To replace with real assets:

1. Export app icons from MonthBar Xcode project:
   - `MonthBar/Resources/Assets.xcassets/AppIcon.appiconset`
   - Export at 512x512 and 1024x1024
   - Replace files in `public/images/app-icon/`

2. Create screenshots (2560x1600 minimum):
   - Follow specs in MonthBar repository
   - Replace files in `public/images/screenshots/`

3. Rebuild and deploy:
   ```bash
   npm run build
   git add public/images/
   git commit -m "Replace placeholder images with real assets"
   git push
   ```

## 🔍 SEO Features

- Semantic HTML5 structure
- Open Graph meta tags for social sharing
- Twitter Card meta tags
- JSON-LD structured data
- Sitemap generation
- robots.txt configuration
- Optimized meta descriptions and keywords

## 🚀 Deployment

The site is automatically deployed to GitHub Pages via GitHub Actions when pushing to the `main` branch.

**Deployment URL**: https://month.bar

### GitHub Pages Setup

1. Enable GitHub Pages in repository settings:
   - Settings > Pages
   - Source: GitHub Actions

2. Push to `main` branch to trigger deployment:
   ```bash
   git push origin main
   ```

3. Monitor deployment at Actions tab

## 📝 Content Updates

### Privacy Policy

Edit `src/content/docs/privacy.md` with frontmatter:

```yaml
---
title: "Privacy Policy"
description: "MonthBar privacy policy and data practices"
lastUpdated: 2026-02-10
---
```

### Features

Edit features in `src/components/Features.astro` (features array).

### SEO Metadata

Edit meta tags in `src/layouts/BaseLayout.astro`.

## 🛠️ Development

Built with:
- **Astro** - Static site generator
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Type-safe development
- **Content Collections** - Type-safe markdown content

## 📄 License

Copyright (c) 2026 Leo Dion

## 🔗 Links

- [Website Repository](https://github.com/brightdigit/month.bar)
- [MonthBar App Repository](https://github.com/brightdigit/MonthBar)
- [MonthBar Website](https://month.bar)
- [Report Issues](https://github.com/brightdigit/MonthBar/issues)
