import { useEffect, useRef, useState } from 'react';
import S from '@/components/LoadingOverlay/LoadingOverlay.styles';

interface LoadingOverlayProps {
  /** 뒷 배경(폰트·페이지·셰이더) 로딩 완료 여부 */
  readonly ready: boolean;
  /** 페이드아웃까지 끝난 뒤 호출 — 오버레이를 언마운트할 때 사용 */
  readonly onDone: () => void;
}

/** ready 전까지 차오르는 상한 */
const CREEP_LIMIT = 0.9;
/** 상한까지 차오르는 데 걸리는 시간 */
const CREEP_DURATION_MS = 2800;
/** 100% 도달 후 페이드아웃 전 대기 시간 */
const HOLD_MS = 200;
/** Overlay opacity transition과 동일하게 유지한다 */
const FADE_MS = 450;

// 파비콘의 슬래시(/)와 닷 마크를 그대로 재현한 SVG
function Mark(): React.ReactNode {
  return (
    <svg viewBox="0 0 96 96" aria-hidden="true" focusable="false">
      <polygon points="58,14 78,14 38,82 18,82" />
      <rect x="58" y="66" width="16" height="16" />
    </svg>
  );
}

// 첫 진입 로딩 오버레이.
// 실제 로딩 신호(ready)가 오기 전에는 CREEP_LIMIT까지만 차오르고,
// ready가 되면 100%까지 채운 뒤 페이드아웃하며 콘텐츠를 드러낸다.
export default function LoadingOverlay({
  ready,
  onDone,
}: LoadingOverlayProps): React.ReactNode {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  // 진행 루프(rAF)가 최신 값을 참조하도록 ref로 동기화한다.
  const readyRef = useRef(ready);
  const onDoneRef = useRef(onDone);

  useEffect(() => {
    readyRef.current = ready;
    onDoneRef.current = onDone;
  }, [ready, onDone]);

  useEffect(() => {
    let rafId = 0;
    let holdTimer = 0;
    let fadeTimer = 0;
    const start = performance.now();
    let last = start;
    let value = 0;

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      const creep = Math.min(
        CREEP_LIMIT,
        ((now - start) / CREEP_DURATION_MS) * CREEP_LIMIT,
      );
      const target = readyRef.current ? 1 : creep;
      value += (target - value) * Math.min(1, dt * 6);

      if (readyRef.current && value > 0.995) {
        setProgress(1);
        holdTimer = window.setTimeout(() => {
          setLeaving(true);
          fadeTimer = window.setTimeout(() => onDoneRef.current(), FADE_MS);
        }, HOLD_MS);
        return;
      }
      setProgress(value);
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(holdTimer);
      clearTimeout(fadeTimer);
    };
  }, []);

  // 오버레이가 떠 있는 동안 뒤 페이지 스크롤을 잠근다.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  const percent = Math.round(progress * 100);

  return (
    <S.Overlay
      $leaving={leaving}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent}
      aria-label="페이지 로딩 중"
    >
      <S.MarkFrame>
        <S.MarkBase>
          <Mark />
        </S.MarkBase>
        <S.MarkFill
          style={{ clipPath: `inset(${(1 - progress) * 100}% 0 0 0)` }}
        >
          <Mark />
        </S.MarkFill>
      </S.MarkFrame>
      <S.Percent>{String(percent).padStart(3, '0')}</S.Percent>
    </S.Overlay>
  );
}
