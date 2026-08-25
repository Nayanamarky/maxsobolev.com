export const locales = ['ru', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'ru';

/**
 * Все тексты интерфейса — здесь. В компонентах строк быть не должно:
 * добавить язык или поправить формулировку нужно в одном месте.
 */
export const ui = {
  ru: {
    'site.title': 'Максим Соболев — CG / VFX',
    'site.description':
      'Портфолио Максима Соболева, CG/VFX production supervisor: проекты, роли, breakdown.',
    'brand.role': 'CG / VFX SUPERVISOR',
    'menu.label': 'Меню',
    'menu.about': 'Обо мне',
    'menu.contact': 'Контакты',
    'menu.posts': 'Посты',
    'filter.all': 'ВСЕ',
    'filter.character': 'ПЕРСОНАЖКА',
    'filter.cg': 'FULL CG',
    'filter.vfx': 'VFX / СЪЁМКА',
    'filter.motion2d': 'МОУШЕН',
    'filter.neuro': 'НЕЙРОНКА',
    'project.clip': 'Ролик',
    'totop.label': 'Наверх',
    'footer': '© 2026 · MOSCOW',
  },
  en: {
    'site.title': 'Max Sobolev — CG / VFX',
    'site.description':
      'Portfolio of Max Sobolev, CG/VFX production supervisor: projects, roles, breakdowns.',
    'brand.role': 'CG / VFX SUPERVISOR',
    'menu.label': 'Menu',
    'menu.about': 'About',
    'menu.contact': 'Contact',
    'menu.posts': 'Posts',
    'filter.all': 'ALL',
    'filter.character': 'CHARACTER',
    'filter.cg': 'FULL CG',
    'filter.vfx': 'VFX / SHOOT',
    'filter.motion2d': 'MOTION',
    'filter.neuro': 'NEURO',
    'project.clip': 'Clip',
    'totop.label': 'To top',
    'footer': '© 2026 · MOSCOW',
  },
} as const;

export type UIKey = keyof (typeof ui)['ru'];

/** t('menu.about') для текущего языка */
export function useTranslations(locale: Locale) {
  return function t(key: UIKey): string {
    return ui[locale][key] ?? ui[defaultLocale][key];
  };
}

/** Путь с языковым префиксом: ru → /path, en → /en/path */
export function localePath(locale: Locale, path = '/'): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return locale === defaultLocale ? clean : `/${locale}${clean === '/' ? '' : clean}`;
}
