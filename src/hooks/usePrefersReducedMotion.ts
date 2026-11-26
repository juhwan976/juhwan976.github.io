import { useMediaQuery } from '@/hooks/useMediaQuery';
import { theme } from '@/styles/theme';

export function usePrefersReducedMotion(): boolean {
  return useMediaQuery(theme.mediaQueries.reducedMotion);
}
