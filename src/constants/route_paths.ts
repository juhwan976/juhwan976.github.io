export const ROUTE_PATHS = {
  ROOT: '/',
  PROJECT_DETAIL: '/projects/:projectSlug',
  NOT_FOUND: '/404',
} as const;

export const buildProjectPath = (projectSlug: string): string =>
  `/projects/${projectSlug}`;
