import { useEffect, useRef, useState, type RefObject } from 'react';

/** 요소가 viewport에 처음 진입한 순간을 1회만 감지한다. */
export function useInViewOnce<T extends Element>(
  threshold = 0.3,
): { ref: RefObject<T | null>; inView: boolean } {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || inView) {
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [inView, threshold]);

  return { ref, inView };
}
