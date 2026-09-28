import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://shris.thejands.in',
  adapter: vercel(),
  build: {
    inlineStylesheets: 'auto'
  },
  redirects: {
    '/docs': '/docs/overview'
  }
});
