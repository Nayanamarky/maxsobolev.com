import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Один проект — один файл в src/content/projects/.
 * Двуязычные поля пишутся как { ru: "...", en: "..." }.
 * Схема проверяется на сборке: пропущенное обязательное поле уронит сборку, а не сайт.
 */
const bilingual = z.object({ ru: z.string(), en: z.string() });

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    /** Название проекта — обычно одинаковое на обоих языках */
    title: z.string(),
    /** Клиент / студия */
    client: z.string(),
    year: z.number().int(),
    /** Категории фильтра: character (персонажка) | vfx | motion2d (2D motion) | neuro (нейронка) */
    categories: z.array(z.enum(['character', 'vfx', 'motion2d', 'neuro'])).min(1),
    /** На чём снято — факт, не фильтр: shoot (съёмка) | cg (full CG). Не всегда известно/применимо. */
    production: z.enum(['shoot', 'cg']).optional(),
    /** Кадр-обложка для плитки в сетке */
    cover: z.string(),
    /** Порядок в сетке: меньше — выше */
    order: z.number().int(),
    /** Роль на проекте — для страницы проекта */
    role: bilingual.optional(),
    /**
     * Ролики проекта. Без этого поля герой — просто кадр без кнопки плей.
     * Один элемент — герой играет его. Несколько — герой играет первый,
     * остальные идут списком блоков ниже под заголовком.
     */
    videos: z
      .array(
        z.object({
          /** Подпись ролика — нужна, если их несколько (например «Кат 1») */
          label: bilingual.optional(),
          /** Ссылка на встраиваемый плеер (Vimeo/Bunny) */
          embed: z.string(),
          /** Кадр-превью ролика; если не указан — берётся cover проекта */
          poster: z.string().optional(),
        })
      )
      .optional(),
    /** Черновик: проект не попадает в сетку */
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects };
