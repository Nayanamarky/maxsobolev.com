import type { CollectionEntry } from 'astro:content';

type Project = CollectionEntry<'projects'>;

/**
 * Маршруты страниц проектов + соседи для навигации «пред / след».
 * Общая функция для русской и английской ветки — порядок проектов один и тот же.
 * order — дата в формате YYYYMMDD, больше значит новее и выше в сетке.
 */
export function projectPaths(projects: Project[]) {
  const sorted = [...projects].sort((a, b) => b.data.order - a.data.order);

  return sorted.map((project, i) => {
    const prevEntry = sorted[i - 1];
    const nextEntry = sorted[i + 1];

    return {
      params: { id: project.id },
      props: {
        project,
        prev: prevEntry ? { id: prevEntry.id, title: prevEntry.data.title } : null,
        next: nextEntry ? { id: nextEntry.id, title: nextEntry.data.title } : null,
      },
    };
  });
}
