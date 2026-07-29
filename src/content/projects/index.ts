import { lgsc } from '@/content/projects/lgsc';
import { logisticsSimulator } from '@/content/projects/logistics-simulator';
import { travelPlus } from '@/content/projects/travel-plus';
import type { ProjectContent } from '@/content/types';

/** 메인 페이지 노출 순서 */
export const projects: readonly ProjectContent[] = [
  logisticsSimulator,
  lgsc,
  travelPlus,
];

export const getProjectBySlug = (slug: string): ProjectContent | undefined =>
  projects.find((project) => project.slug === slug);

export const getAdjacentProjects = (
  slug: string,
): { previous: ProjectContent; next: ProjectContent } | undefined => {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) {
    return undefined;
  }
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  return { previous, next };
};
