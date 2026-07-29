import { useEffect, useState } from 'react';
import { useInViewOnce } from '@/hooks/useInViewOnce';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import type { ProjectStat } from '@/content/types';
import styles from './StatValue.module.scss';

interface StatValueProps {
  stat: ProjectStat;
}

const COUNT_DURATION_MS = 1200;

const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

/** viewport 진입 시 1회만 카운트업하는 수치. 모션 감소 환경에서는 정적 표시. */
export default function StatValue({ stat }: StatValueProps): React.ReactNode {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { ref, inView } = useInViewOnce<HTMLDivElement>(0.5);
  const shouldAnimate =
    stat.numericValue !== undefined && !prefersReducedMotion;
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldAnimate || !inView || stat.numericValue === undefined) {
      return;
    }
    const target = stat.numericValue;
    let frameId = 0;
    const startedAt = performance.now();

    const tick = (now: number): void => {
      const progress = Math.min((now - startedAt) / COUNT_DURATION_MS, 1);
      setCount(Math.round(easeOutCubic(progress) * target));
      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [shouldAnimate, inView, stat.numericValue]);

  const displayValue =
    shouldAnimate && stat.numericValue !== undefined
      ? `${stat.prefix ?? ''}${count.toLocaleString('ko-KR')}${stat.suffix ?? ''}`
      : stat.value;

  return (
    <div ref={ref} className={styles.root}>
      <dt className={styles.label}>{stat.label}</dt>
      <dd className={styles.value}>
        {displayValue}
        {stat.note ? <span className={styles.note}>{stat.note}</span> : null}
      </dd>
    </div>
  );
}
