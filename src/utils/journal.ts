import { getCollection, type CollectionEntry } from 'astro:content';
import { localePath, type Locale } from '~/i18n';

export async function journalForLocale(locale: Locale) {
  const posts = await getCollection('journal', ({ data }) => !data.draft);
  const groups = new Map<string, CollectionEntry<'journal'>[]>();
  for (const post of posts) {
    const group = groups.get(post.data.translationKey) ?? [];
    group.push(post);
    groups.set(post.data.translationKey, group);
  }
  return [...groups.values()]
    .map(
      (group) =>
        group.find((post) => post.data.locale === locale) ?? group.find((post) => post.data.locale === 'zh') ?? group[0]
    )
    .sort(
      (a, b) =>
        (b.data.publishDate ?? '').localeCompare(a.data.publishDate ?? '') ||
        a.data.translationKey.localeCompare(b.data.translationKey)
    );
}

export const journalHref = (locale: Locale, key?: string) => `${localePath(locale)}/journal${key ? `/${key}` : ''}`;

export function journalDate(value: string | undefined, locale: Locale) {
  return value
    ? new Intl.DateTimeFormat(locale === 'zh' ? 'zh-CN' : locale === 'ja' ? 'ja-JP' : 'en-GB', {
        dateStyle: 'medium',
        timeZone: 'UTC',
      }).format(new Date(`${value}T00:00:00Z`))
    : '';
}
