import yaml from 'js-yaml';
import slugify from 'limax';

export const languages = ['zh', 'en', 'ja'];
export const kinds = ['note', 'log', 'essay', 'experiment'];
export const today = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Shanghai' }).format(new Date());
export const identity = (locale, key) => {
  if (
    !languages.includes(locale) ||
    typeof key !== 'string' ||
    !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(key) ||
    key.length > 100
  )
    throw new Error('invalid_address');
  return `${locale}/${key}`;
};
export function parseDocument(markdown, filename = 'untitled.md') {
  if (typeof markdown !== 'string' || Buffer.byteLength(markdown, 'utf8') > 1024 * 1024) throw new Error('too_large');
  const source = markdown.replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n');
  const front = source.match(/^---\n([\s\S]*?)\n---(?:\n|$)/);
  if (source.startsWith('---\n') && !front) throw new Error('invalid_metadata');
  let metadata = {};
  if (front) {
    try {
      metadata = yaml.load(front[1], { schema: yaml.JSON_SCHEMA }) ?? {};
    } catch {
      throw new Error('invalid_metadata');
    }
    if (typeof metadata !== 'object' || Array.isArray(metadata)) throw new Error('invalid_metadata');
  }
  const body = front ? source.slice(front[0].length) : source;
  const inferred = body.match(/^#\s+(.+)$/m)?.[1] ?? filename.replace(/\.md$/i, '').replace(/[\\/]/g, '-');
  const title = typeof metadata.title === 'string' ? metadata.title : inferred;
  const key =
    typeof metadata.translationKey === 'string'
      ? metadata.translationKey
      : slugify(title, { lowercase: true }).slice(0, 90) || `note-${Date.now()}`;
  return {
    body,
    title,
    key,
    locale: languages.includes(metadata.locale) ? metadata.locale : 'zh',
    kind: kinds.includes(metadata.kind) ? metadata.kind : 'note',
    description: typeof metadata.description === 'string' ? metadata.description : '',
    date:
      typeof metadata.publishDate === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(metadata.publishDate)
        ? metadata.publishDate
        : today(),
    tags: Array.isArray(metadata.tags) ? metadata.tags.filter((tag) => typeof tag === 'string').slice(0, 15) : [],
    draft: metadata.draft !== false,
  };
}
export function serializeDocument(input, draft) {
  identity(input.locale, input.key);
  if (typeof input.title !== 'string' || !input.title.trim() || input.title.length > 200)
    throw new Error('invalid_title');
  if (typeof input.body !== 'string' || !input.body.trim() || Buffer.byteLength(input.body) > 1024 * 1024)
    throw new Error('invalid_body');
  if (!kinds.includes(input.kind)) throw new Error('invalid_kind');
  if (
    typeof input.date !== 'string' ||
    !/^\d{4}-\d{2}-\d{2}$/.test(input.date) ||
    Number.isNaN(Date.parse(`${input.date}T00:00:00Z`)) ||
    new Date(`${input.date}T00:00:00Z`).toISOString().slice(0, 10) !== input.date
  )
    throw new Error('invalid_date');
  const tags = Array.isArray(input.tags)
    ? input.tags
        .filter((tag) => typeof tag === 'string' && tag.trim())
        .map((tag) => tag.trim().slice(0, 60))
        .slice(0, 15)
    : [];
  return `---\n${yaml.dump(
    {
      title: input.title.trim(),
      locale: input.locale,
      translationKey: input.key,
      kind: input.kind,
      publishDate: input.date,
      description: String(input.description ?? '')
        .trim()
        .slice(0, 1000),
      tags,
      draft,
    },
    { lineWidth: -1, noRefs: true, quotingType: '"', forceQuotes: true }
  )}---\n\n${input.body.trim()}\n`;
}
