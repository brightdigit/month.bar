import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://month.bar',
  integrations: [
    tailwind(),
    sitemap(),
    mdx()
  ],
  output: 'static',
  build: {
    assets: '_assets'
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  }
});
