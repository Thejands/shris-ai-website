import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  site: 'https://shris.ai',
  adapter: node({
    mode: 'standalone',
  }),
  build: {
    inlineStylesheets: 'auto'
  }
});
