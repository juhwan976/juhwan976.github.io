import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

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

    const tick = (time: number): void => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, [prefersReducedMotion]);
}
