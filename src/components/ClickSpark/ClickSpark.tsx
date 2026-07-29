import { useEffect, useRef } from 'react';
import S from '@/components/ClickSpark/ClickSpark.styles';

// reactbits의 Click Spark를 프로젝트 컨벤션에 맞게 이식한 컴포넌트.
// 원본은 부모 크기의 캔버스를 사용하지만, 문서 전체 높이만큼 캔버스가
// 커지는 것을 피하기 위해 뷰포트 고정 캔버스 + window 클릭 수신으로 바꿨다.

export type SparkEasing = 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';

interface ClickSparkProps {
  readonly sparkColor?: string;
  /** 스파크 선 길이 */
  readonly sparkSize?: number;
  /** 스파크가 퍼지는 반경 */
  readonly sparkRadius?: number;
  /** 클릭당 스파크 개수 */
  readonly sparkCount?: number;
  /** 애니메이션 시간 (ms) */
  readonly duration?: number;
  readonly easing?: SparkEasing;
  readonly extraScale?: number;
}

interface Spark {
  readonly x: number;
  readonly y: number;
  readonly angle: number;
  readonly startTime: number;
}

const ease = (t: number, easing: SparkEasing): number => {
  switch (easing) {
    case 'linear':
      return t;
    case 'ease-in':
      return t * t;
    case 'ease-in-out':
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    default:
      return t * (2 - t);
  }
};

export default function ClickSpark({
  sparkColor = '#fff',
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 400,
  easing = 'ease-out',
  extraScale = 1,
}: ClickSparkProps): React.ReactNode {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sparksRef = useRef<Spark[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = (): void => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onClick = (e: MouseEvent): void => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }
      const now = performance.now();
      const created: Spark[] = Array.from({ length: sparkCount }, (_, i) => ({
        x: e.clientX,
        y: e.clientY,
        angle: (2 * Math.PI * i) / sparkCount,
        startTime: now,
      }));
      sparksRef.current.push(...created);
    };
    window.addEventListener('click', onClick);

    let rafId = 0;
    const draw = (timestamp: number): void => {
      rafId = requestAnimationFrame(draw);
      if (sparksRef.current.length === 0) {
        return;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      sparksRef.current = sparksRef.current.filter((spark) => {
        const elapsed = timestamp - spark.startTime;
        if (elapsed >= duration) return false;

        const progress = ease(elapsed / duration, easing);
        const distance = progress * sparkRadius * extraScale;
        const lineLength = sparkSize * (1 - progress);
        const x1 = spark.x + distance * Math.cos(spark.angle);
        const y1 = spark.y + distance * Math.sin(spark.angle);
        const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
        const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

        ctx.strokeStyle = sparkColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        return true;
      });
      // 마지막 스파크가 사라진 프레임의 잔상을 지운다.
      if (sparksRef.current.length === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };
    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('click', onClick);
    };
  }, [sparkColor, sparkSize, sparkRadius, sparkCount, duration, easing, extraScale]);

  return <S.Canvas ref={canvasRef} aria-hidden="true" />;
}
