export const locales = ['zh', 'en', 'ja'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'zh';
export const siteBase = `${import.meta.env.BASE_URL.replace(/\/$/, '')}/`;

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && locales.some((locale) => locale === value);
}

export function localePath(locale: Locale): string {
  return `${siteBase}${locale}`;
}

/** Match the visitor's ordered language preferences; unsupported languages fall back to Chinese. */
export function resolveLocale(languages: readonly string[], saved?: string | null): Locale {
  if (isLocale(saved)) return saved;
  for (const language of languages) {
    const base = language.toLowerCase().split(/[-_]/)[0];
    if (isLocale(base)) return base;
  }
  return defaultLocale;
}

export const languageTags: Record<Locale, string> = { zh: 'zh-Hans', en: 'en', ja: 'ja' };
export const languageNames: Record<Locale, string> = { zh: '中文', en: 'EN', ja: '日本語' };
