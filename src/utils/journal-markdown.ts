import type { RemarkPlugin } from '@astrojs/markdown-remark';

export const journalMarkdownGuard: RemarkPlugin = () => (tree, file) => {
  if (!file.path?.replaceAll('\\', '/').includes('/data/journal/')) return;
  const walk = (node: { type: string; value?: string; url?: string; children?: unknown[] }) => {
    if (node.type === 'html') node.type = 'text';
    if (
      node.url &&
      /^(?:javascript|vbscript|data|file):/i.test(
        [...node.url].filter((char) => char.charCodeAt(0) > 32 && char.charCodeAt(0) !== 127).join('')
      )
    )
      node.url = '#';
    for (const child of node.children ?? []) walk(child as Parameters<typeof walk>[0]);
  };
  walk(tree);
};
