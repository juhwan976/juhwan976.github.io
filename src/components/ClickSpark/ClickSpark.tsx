import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import styles from './ClickSpark.module.scss';

// reactbits.dev의 Click Spark 컴포넌트를 프로젝트 컨벤션에 맞게 재구현.
// 클릭 지점에서 악센트 컬러의 짧은 스파크 선이 퍼져나가는 피드백.
// 전역 오버레이 캔버스 1개로 동작하며, 모션 감소 환경에서는 렌더하지 않는다.

const SPARK_COLOR = '#ff6a00';
const SPARK_COUNT = 8;
const SPARK_SIZE = 9;
const SPARK_RADIUS = 18;
const DURATION_MS = 420;

interface Spark {
  x: number;
  y: number;
  angle: number;
  startedAt: number;
}

const easeOut = (t: number): number => t * (2 - t);

export default function ClickSpark(): React.ReactNode {
  const prefersReducedMotion = usePrefersReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) {
      return;
    }

    const sparks: Spark[] = [];
    let frameId = 0;
    let isAnimating = false;

    const resize = (): void => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const draw = (now: number): void => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = sparks.length - 1; i >= 0; i -= 1) {
        const spark = sparks[i];
        const progress = (now - spark.startedAt) / DURATION_MS;
        if (progress >= 1) {
          sparks.splice(i, 1);
          continue;
        }
        const eased = easeOut(progress);
        const distance = eased * SPARK_RADIUS;
        const lineLength = SPARK_SIZE * (1 - eased);
        const x1 = spark.x + distance * Math.cos(spark.angle);
        const y1 = spark.y + distance * Math.sin(spark.angle);
        const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
        const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

        context.strokeStyle = SPARK_COLOR;
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.stroke();
      }

      if (sparks.length > 0) {
        frameId = requestAnimationFrame(draw);
      } else {
        isAnimating = false;
      }
    };

    const handleClick = (event: MouseEvent): void => {
      const startedAt = performance.now();
      for (let i = 0; i < SPARK_COUNT; i += 1) {
        sparks.push({
          x: event.clientX,
          y: event.clientY,
          angle: (Math.PI * 2 * i) / SPARK_COUNT,
          startedAt,
        });
      }
      if (!isAnimating) {
        isAnimating = true;
        frameId = requestAnimationFrame(draw);
      }
    };

    window.addEventListener('click', handleClick, { passive: true });
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(frameId);
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    return null;
  }

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}
