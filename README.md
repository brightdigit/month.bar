# MonthBar Website

Static website for [MonthBar](https://github.com/brightdigit/MonthBar) - a macOS MenuBar app that displays the progress of the current month.

## Repository Structure

```
month.bar/
├── content/                      # Marketing content source files
│   ├── privacy.md               # Privacy policy (from MonthBar repo)
│   ├── app-store-metadata.md    # App Store copy, descriptions, keywords
│   └── features.md              # Feature documentation (from README.md)
├── public/                       # Static assets (will be served as-is)
│   └── images/
│       ├── app-icon/            # App icon exports (TODO: export from MonthBar)
│       └── screenshots/         # App screenshots (TODO: create per specs)
└── README.md                     # This file
```

## Content Attribution

All marketing content sourced from the [MonthBar repository](https://github.com/brightdigit/MonthBar) at commit `6717a9d` (February 11, 2026).

Original content by Leo Dion.

## TODO: Before Website Launch

### 1. Export App Icon
The app icon needs to be exported from the MonthBar Xcode project:
- Export from `Resources/Assets.xcassets/AppIcon.appiconset`
- Generate PNG files: 512x512, 1024x1024
- Generate favicon.ico from app icon
- Place in `public/images/app-icon/`

### 2. Create Screenshots
Screenshots are specified but not yet created. See `MonthBar/specs/002-app-store-ready/MARKETING_ASSETS_SPECS.md` for:
- Technical requirements (2560x1600px minimum)
- Composition guidelines (Modern Minimalist aesthetic)
- Shot list (5 screenshots: Light/Dark mode, icon styles, settings)
- Production procedures

Once created, copy from `MonthBar/Marketing/Screenshots/` to `public/images/screenshots/`

### 3. Choose Static Site Generator
Options:
- **Astro** (recommended for content-focused sites)
- **Hugo** (fast, Go-based)
- **Eleventy** (JavaScript, flexible)
- **Jekyll** (Ruby, GitHub Pages native)

### 4. Set Up Deployment
Options:
- **Vercel** (automatic preview deployments)
- **Netlify** (easy setup, CDN)
- **Cloudflare Pages** (fast, free tier)
- **GitHub Pages** (free, easy for simple sites)

Planned URL from metadata: `https://brightdigit.github.io/MonthBar/privacy-policy.html`

## MonthBar App Info

**What it does:** Displays current month progress in the macOS MenuBar with customizable display modes.

**Key Features:**
- Two icon styles (Pie Chart, Percentage Text)
- Toggle between remaining/elapsed time
- Privacy-first (no network, no tracking)
- Native macOS app built with SwiftUI

**Download:** [App Store link - TBD]

**Support:** [GitHub Issues](https://github.com/brightdigit/MonthBar/issues)

## Development

Once you set up a static site generator, add build and development instructions here.

```bash
# Example (will vary by SSG choice):
npm install
npm run dev      # Start development server
npm run build    # Build for production
```

## License

Copyright (c) 2026 Leo Dion
