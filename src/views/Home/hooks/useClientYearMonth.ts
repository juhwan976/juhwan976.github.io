import { useSyncExternalStore } from 'react';

export interface YearMonth {
  readonly year: number;
  readonly month: number;
}

function subscribe(onChange: () => void): () => void {
  window.addEventListener('focus', onChange);
  return () => window.removeEventListener('focus', onChange);
}

function getMonthIndex(): number {
  const now = new Date();
  return now.getFullYear() * 12 + now.getMonth();
}

// 프리렌더와 hydration에는 같은 값을 쓰고, 방문 시점의 연·월은 브라우저에서 읽는다.
export function useClientYearMonth(): YearMonth | null {
  const monthIndex = useSyncExternalStore(subscribe, getMonthIndex, () => null);
  if (monthIndex === null) return null;

  return { year: Math.floor(monthIndex / 12), month: (monthIndex % 12) + 1 };
}
