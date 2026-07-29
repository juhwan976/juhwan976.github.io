import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import styles from './Magnet.module.scss';

// reactbits.dev의 Magnet 컴포넌트를 프로젝트 컨벤션에 맞게 재구현.
// 포인터가 요소 주변(padding 범위)에 들어오면 요소가 포인터 방향으로
// 살짝 끌려가는 마이크로 인터랙션. 모션 감소 환경에서는 비활성화된다.

interface MagnetProps {
  children: React.ReactNode;
  /** 자석 효과가 활성화되는 요소 주변 거리(px) */
  padding?: number;
  /** 끌림 강도. 값이 클수록 이동량이 줄어든다 */
  magnetStrength?: number;
  disabled?: boolean;
}

export default function Magnet({
  children,
  padding = 60,
  magnetStrength = 4,
  disabled = false,
}: MagnetProps): React.ReactNode {
  const prefersReducedMotion = usePrefersReducedMotion();
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);
  const enabled = !disabled && !prefersReducedMotion;

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const handleMouseMove = (event: MouseEvent): void => {
      const wrapper = wrapperRef.current;
      if (!wrapper) {
        return;
      }
      const rect = wrapper.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distanceX = Math.abs(centerX - event.clientX);
      const distanceY = Math.abs(centerY - event.clientY);

      const withinRange =
        distanceX < rect.width / 2 + padding &&
        distanceY < rect.height / 2 + padding;

      if (withinRange) {
        setIsActive(true);
        setOffset({
          x: (event.clientX - centerX) / magnetStrength,
          y: (event.clientY - centerY) / magnetStrength,
        });
      } else {
        setIsActive(false);
        setOffset({ x: 0, y: 0 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [enabled, padding, magnetStrength]);

  // 비활성 상태에서는 상태값과 무관하게 원위치를 렌더한다
  const x = enabled ? offset.x : 0;
  const y = enabled ? offset.y : 0;
  const innerClassName =
    enabled && isActive ? `${styles.inner} ${styles.active}` : styles.inner;

  return (
    <span ref={wrapperRef} className={styles.wrapper}>
      <span
        className={innerClassName}
        style={{ transform: `translate3d(${x}px, ${y}px, 0)` }}
      >
        {children}
      </span>
    </span>
  );
}
