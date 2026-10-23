import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const metadataDefinition = () =>
  z
    .object({
      title: z.string().optional(),
      ignoreTitleTemplate: z.boolean().optional(),

      canonical: z.url().optional(),

      robots: z
        .object({
          index: z.boolean().optional(),
          follow: z.boolean().optional(),
        })
        .optional(),

      description: z.string().optional(),

      openGraph: z
        .object({
          url: z.string().optional(),
          siteName: z.string().optional(),
          images: z
            .array(
              z.object({
                url: z.string(),
                width: z.number().optional(),
                height: z.number().optional(),
              })
            )
            .optional(),
          locale: z.string().optional(),
          type: z.string().optional(),
        })
        .optional(),

      twitter: z
        .object({
          handle: z.string().optional(),
          site: z.string().optional(),
          cardType: z.string().optional(),
        })
        .optional(),
    })
    .optional();

const postCollection = defineCollection({
  loader: glob({ pattern: ['*.md', '*.mdx'], base: 'src/data/post' }),
  schema: z.object({
    publishDate: z.date().optional(),
    updateDate: z.date().optional(),
    draft: z.boolean().optional(),

    title: z.string(),
    excerpt: z.string().optional(),
    image: z.string().optional(),
    /** Alternative text for the cover image. Leave empty for decorative stock photos. */
    imageAlt: z.string().optional(),

    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    author: z.string().optional(),

    metadata: metadataDefinition(),
  }),
});

// Separate from the template's example posts; drafts are private by default.
const journalCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/data/journal' }),
  schema: z.object({
    title: z.string(),
    locale: z.enum(['zh', 'en', 'ja']),
    translationKey: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    kind: z.enum(['note', 'log', 'essay', 'experiment']),
    draft: z.boolean().default(true),
    description: z.string().optional(),
    publishDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .optional(),
    tags: z.array(z.string()).default([]),
  }),
});

// Only deliberately rewritten public material belongs here; never import source documents.
const projectCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/data/project' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    locale: z.enum(['zh', 'en', 'ja']),
    translationKey: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    category: z.string(),
    status: z.string(),
    tags: z.array(z.string()).min(1),
    order: z.number().int().positive(),
    video: z
      .object({
        src: z.string().regex(/^media\/projects\/[a-z0-9/-]+\.mp4$/),
        poster: z.string().regex(/^media\/projects\/[a-z0-9/-]+\.jpg$/),
        captions: z.string().regex(/^media\/projects\/[a-z0-9/-]+\.vtt$/),
        duration: z.string().regex(/^\d+:\d{2}$/),
      })
      .optional(),
    draft: z.boolean().default(true),
  }),
});

export const collections = {
  post: postCollection,
  journal: journalCollection,
  project: projectCollection,
};
