import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import { getActiveLenis } from '@/hooks/useSmoothScroll';

// 위치(location.key)별 스크롤 기록. SPA 수명 동안 유지된다.
const scrollPositions = new Map<string, number>();

// Lenis가 활성일 때는 진행 중인 관성 애니메이션을 멈추고
// 내부 목표값까지 함께 리셋해야 이전 페이지 위치로 끌려가지 않는다.
const jumpTo = (top: number): void => {
  const lenis = getActiveLenis();
  if (lenis) {
    lenis.stop();
    lenis.scrollTo(top, { immediate: true, force: true });
    lenis.start();
  } else {
    window.scrollTo({ top, behavior: 'instant' });
  }
};

// 라우트 전환 시 스크롤을 직접 관리한다.
// 브라우저 자동 복원(auto)은 복원 시점이 비동기라서, POP 복원이 늦게 도착해
// 다음 PUSH 페이지에 이전 스크롤이 적용되는 경합이 생길 수 있다.
// 그래서 manual로 전환하고 PUSH는 최상단, POP은 기록된 위치로 직접 되돌린다.
export default function ScrollToTop(): null {
  const { hash, key } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    window.history.scrollRestoration = 'manual';
    return () => {
      window.history.scrollRestoration = 'auto';
    };
  }, []);

  // 전환 직후 스크롤 결정 — 해시 이동은 앵커 스크롤에 맡긴다.
  useEffect(() => {
    if (hash) {
      return;
    }
    const top =
      navigationType === 'POP' ? (scrollPositions.get(key) ?? 0) : 0;
    jumpTo(top);
  }, [key, hash, navigationType]);

  // 현재 위치에 머무는 동안의 스크롤을 기록한다.
  // 리스너는 위 복원 effect 이후에 붙으므로 전환 중 값이 이전 키를 오염시키지 않고,
  // 전환 시 Lenis 관성은 jumpTo의 stop()이 차단한다.
  useEffect(() => {
    const save = (): void => {
      scrollPositions.set(key, window.scrollY);
    };
    window.addEventListener('scroll', save, { passive: true });
    return () => window.removeEventListener('scroll', save);
  }, [key]);

  return null;
}
