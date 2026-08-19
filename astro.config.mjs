// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Канонический адрес сайта. Нужен для sitemap, og-тегов и абсолютных ссылок.
  site: 'https://maxsobolev.com',
  i18n: {
    defaultLocale: 'ru',
    locales: ['ru', 'en'],
    routing: {
      // русский без префикса: / ; английский с префиксом: /en/
      prefixDefaultLocale: false,
    },
  },
});
