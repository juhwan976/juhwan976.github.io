import { useMediaQuery } from '@/hooks/useMediaQuery';

export function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}
