import { useCallback, useSyncExternalStore } from 'react';

export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const mediaQueryList = window.matchMedia(query);
      mediaQueryList.addEventListener('change', onStoreChange);
      return () => mediaQueryList.removeEventListener('change', onStoreChange);
    },
    [query],
  );

  const getSnapshot = useCallback(
    () => window.matchMedia(query).matches,
    [query],
  );

  // 프리렌더(SSR)에서는 매칭 여부를 알 수 없으므로 false로 고정한다.
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
