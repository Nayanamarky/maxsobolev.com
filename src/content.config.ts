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
    /** Категории фильтра: cg | vfx | realtime | direction */
    categories: z.array(z.enum(['cg', 'vfx', 'realtime', 'direction'])).min(1),
    /** Кадр-обложка для плитки в сетке */
    cover: z.string(),
    /** Порядок в сетке: меньше — выше */
    order: z.number().int(),
    /** Роль на проекте — для страницы проекта */
    role: bilingual.optional(),
    /** Черновик: проект не попадает в сетку */
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects };
