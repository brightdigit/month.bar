import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://month.bar',
  integrations: [
    tailwind(),
    sitemap()
  ],
  output: 'static',
  build: {
    assets: '_assets'
  },
  experimental: {
    contentIntellisense: true,
    security: {
      checkOrigin: true
    }
  },
  security: {
    checkOrigin: true
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: undefined
        }
      }
    },
    plugins: [
      {
        name: 'configure-response-headers',
        configureServer: (server) => {
          server.middlewares.use((_req, res, next) => {
            res.setHeader('Content-Security-Policy', "default-src 'self'; img-src 'self' https: data:; font-src 'self'; connect-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'");
            next();
          });
        }
      }
    ]
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  }
});
