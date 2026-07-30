import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

// 라우트 전환 등 외부에서 즉시 스크롤이 필요할 때 참조하는 활성 인스턴스.
// window.scrollTo만 호출하면 Lenis 내부 목표값이 남아 이전 위치로 되돌아간다.
let activeLenis: Lenis | null = null;

export function getActiveLenis(): Lenis | null {
  return activeLenis;
}

// Lenis 스무스 스크롤을 GSAP ScrollTrigger와 동기화한다.
// 모션 감소 환경에서는 활성화하지 않는다.
export function useSmoothScroll(): void {
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({ anchors: true });
    lenis.on('scroll', ScrollTrigger.update);
    activeLenis = lenis;

    const tick = (time: number): void => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      activeLenis = null;
    };
  }, [prefersReducedMotion]);
}
