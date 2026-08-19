// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // site: 'https://example.com', // укажем перед деплоем — нужен для sitemap и og-тегов
  i18n: {
    defaultLocale: 'ru',
    locales: ['ru', 'en'],
    routing: {
      // русский без префикса: / ; английский с префиксом: /en/
      prefixDefaultLocale: false,
    },
  },
});
