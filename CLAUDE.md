# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static website for **MonthBar** - a macOS MenuBar app that displays the progress of the current month. This repository contains marketing content, privacy policy, and assets that will be converted into a static website.

All content sourced from the [MonthBar repository](https://github.com/brightdigit/MonthBar) at commit `6717a9d` (February 11, 2026).

## Repository Structure

```
month.bar/
├── content/                      # Marketing content source files
│   ├── privacy.md               # Privacy policy
│   ├── app-store-metadata.md    # App Store copy, descriptions, keywords
│   └── features.md              # Feature documentation
└── public/                      # Static assets (served as-is)
    └── images/
        ├── app-icon/            # App icon exports (TODO)
        └── screenshots/         # App screenshots (TODO)
```

## Current Status

**Pre-SSG Setup**: This repository currently contains only content and placeholder directories. No static site generator has been chosen yet.

### Pending Decisions

1. **Static Site Generator** - Options under consideration:
   - Astro (recommended for content-focused sites)
   - Hugo (fast, Go-based)
   - Eleventy (JavaScript, flexible)
   - Jekyll (Ruby, GitHub Pages native)

2. **Deployment Platform** - Options:
   - Vercel
   - Netlify
   - Cloudflare Pages
   - GitHub Pages

### Assets Not Yet Available

- **App Icons**: Need to be exported from MonthBar Xcode project (`Resources/Assets.xcassets/AppIcon.appiconset`)
  - Required: 512x512, 1024x1024 PNG files + favicon.ico
  - Target: `public/images/app-icon/`

- **Screenshots**: Specified but not created
  - Specs: 2560x1600px minimum, Modern Minimalist aesthetic
  - Full specs in `MonthBar/specs/002-app-store-ready/MARKETING_ASSETS_SPECS.md`
  - Target: `public/images/screenshots/`

## Content Reference

### App Store Metadata (`content/app-store-metadata.md`)

Contains optimized App Store copy with character counts:
- App Name: "MonthBar" (8/30 chars)
- Subtitle: "Track your month's progress" (26/30 chars)
- Description: 1,443/4,000 chars
- Keywords: 91/100 chars (month, progress, tracker, menubar, calendar, time, productivity, etc.)
- Privacy Policy URL: `https://brightdigit.github.io/MonthBar/privacy-policy.html`

### Key Features to Highlight

From `content/features.md`:
- Two icon styles: Pie Chart and Percentage Text
- Toggle between Remaining and Elapsed time display
- Real-time updates (every 60 seconds)
- Privacy-first: no network, no tracking, no accounts
- Native macOS SwiftUI app

### MonthBar App Architecture

Built with:
- **Platform**: macOS 14.0 (Sonoma) or later
- **Framework**: SwiftUI
- **Pattern**: MVVM with Observable models
- **Core Components**:
  - `MonthProgressModel.swift` - Progress calculation logic
  - `AppSettings.swift` - Configuration enums
  - `MenuBarIconView.swift` - MenuBar icon renderer
  - `SettingsView.swift` - Settings interface

## Build Commands

### Using mise (Recommended)

This project uses [mise](https://mise.jdx.dev/) for Node.js version management. To activate Node/npm:

```bash
eval "$(mise activate zsh)"   # In zsh shell
eval "$(mise activate bash)"  # In bash shell
```

After activation, use standard npm commands:

```bash
npm install              # Install dependencies
npm run dev             # Start development server
npm run build           # Build for production
npm run validate-schema  # Validate JSON-LD schemas in dist/
```

If using mise with commands, you can also run them in a single invocation:

```bash
eval "$(mise activate zsh)" && npm run build
```

## Git Workflow

- Main branch: `main`
- Current branch: `website`
- Clean status at initialization
- Latest commit: `99654cc Initial commit: Add marketing content from MonthBar repo`
