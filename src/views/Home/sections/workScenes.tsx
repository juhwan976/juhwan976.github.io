/* eslint-disable react-refresh/only-export-components -- 정적 그래픽 매핑 파일 */
import type { SceneTheme } from '@/content/types';

// Work 장면 그래픽.
// 프로젝트 미디어 에셋이 확보되기 전까지 각 프로젝트의 핵심 모티프를
// 추상 그래픽으로 표현한다. data-parallax 요소는 스크럽 시 느리게 이동한다.

const LINE = 'rgba(255, 255, 255, 0.14)';
const LINE_STRONG = 'rgba(255, 255, 255, 0.32)';
const ACCENT = '#ff6a00';
const SURFACE = '#111114';

/** 01 물류 시뮬레이터 — 공장 도면 위의 AGV 경로 */
function BlueprintScene(): React.ReactNode {
  return (
    <svg viewBox="0 0 960 640" role="presentation" focusable="false">
      {/* 도면 그리드 */}
      <g stroke={LINE} strokeWidth="1">
        {Array.from({ length: 11 }, (_, i) => (
          <line key={`v${i}`} x1={80 + i * 80} y1="60" x2={80 + i * 80} y2="580" />
        ))}
        {Array.from({ length: 7 }, (_, i) => (
          <line key={`h${i}`} x1="80" y1={60 + i * 87} x2="880" y2={60 + i * 87} />
        ))}
      </g>
      {/* 설비 블록 */}
      <g fill={SURFACE} stroke={LINE_STRONG} strokeWidth="1">
        <rect x="140" y="120" width="180" height="110" rx="3" />
        <rect x="420" y="100" width="130" height="150" rx="3" />
        <rect x="660" y="140" width="160" height="90" rx="3" />
        <rect x="180" y="380" width="150" height="120" rx="3" />
        <rect x="560" y="400" width="220" height="100" rx="3" />
      </g>
      {/* AGV 경로 — 오렌지 */}
      <path
        data-parallax
        d="M120 320 H 380 Q 400 320 400 300 V 280 Q 400 260 420 260 H 600 Q 620 260 620 280 V 340 Q 620 360 640 360 H 840"
        stroke={ACCENT}
        strokeWidth="2"
        fill="none"
      />
      <g fill={ACCENT}>
        <circle cx="120" cy="320" r="6" />
        <circle cx="840" cy="360" r="6" />
      </g>
      {/* AGV 본체 */}
      <g data-parallax>
        <rect
          x="486"
          y="242"
          width="52"
          height="36"
          rx="4"
          fill="rgba(255, 106, 0, 0.16)"
          stroke={ACCENT}
          strokeWidth="1.5"
        />
      </g>
      {/* 도면 마커 */}
      <g stroke={LINE_STRONG} fill="none">
        <circle cx="120" cy="320" r="14" strokeDasharray="3 4" />
        <circle cx="840" cy="360" r="14" strokeDasharray="3 4" />
      </g>
    </svg>
  );
}

/** 02 LGSC — 하나의 구조로 수렴하는 제품군 그리드 */
function ApplianceScene(): React.ReactNode {
  const cols = 12;
  const rows = 5;
  const tile = 44;
  const gap = 14;
  const originX = 120;
  const originY = 80;

  return (
    <svg viewBox="0 0 960 640" role="presentation" focusable="false">
      {/* 제품군 타일 그리드 */}
      <g>
        {Array.from({ length: rows * cols }, (_, i) => {
          const col = i % cols;
          const row = Math.floor(i / cols);
          const highlighted = i % 17 === 3;
          return (
            <rect
              key={i}
              x={originX + col * (tile + gap)}
              y={originY + row * (tile + gap)}
              width={tile}
              height={tile}
              rx="4"
              fill={highlighted ? 'rgba(255, 106, 0, 0.14)' : SURFACE}
              stroke={highlighted ? ACCENT : LINE}
              strokeWidth="1"
            />
          );
        })}
      </g>
      {/* 그리드에서 하나의 코어로 수렴하는 라인 */}
      <g stroke={LINE_STRONG} strokeWidth="1" fill="none">
        <path d="M240 372 C 240 460, 420 470, 452 500" />
        <path d="M480 372 C 480 440, 480 460, 480 492" />
        <path d="M720 372 C 720 460, 540 470, 508 500" />
      </g>
      <path
        data-parallax
        d="M120 372 C 120 480, 400 490, 448 508"
        stroke={ACCENT}
        strokeWidth="1.5"
        fill="none"
      />
      {/* 코어 — 하나의 구조 */}
      <g data-parallax>
        <rect
          x="440"
          y="500"
          width="80"
          height="80"
          rx="8"
          fill="rgba(255, 106, 0, 0.1)"
          stroke={ACCENT}
          strokeWidth="1.5"
        />
        <circle cx="480" cy="540" r="10" fill={ACCENT} />
      </g>
    </svg>
  );
}

/** 03 Travel+ — TV 프레임과 로딩 시간의 극적인 축소 */
function TvScene(): React.ReactNode {
  return (
    <svg viewBox="0 0 960 640" role="presentation" focusable="false">
      {/* TV 프레임 */}
      <rect
        x="160"
        y="90"
        width="640"
        height="380"
        rx="10"
        fill={SURFACE}
        stroke={LINE_STRONG}
        strokeWidth="1.5"
      />
      <line x1="400" y1="510" x2="560" y2="510" stroke={LINE_STRONG} />
      <line x1="480" y1="470" x2="480" y2="510" stroke={LINE_STRONG} />
      {/* 화면 콘텐츠 골격 */}
      <g fill="none" stroke={LINE} strokeWidth="1">
        <rect x="200" y="130" width="360" height="200" rx="4" />
        <rect x="590" y="130" width="170" height="94" rx="4" />
        <rect x="590" y="236" width="170" height="94" rx="4" />
        <rect x="200" y="356" width="120" height="74" rx="4" />
        <rect x="336" y="356" width="120" height="74" rx="4" />
        <rect x="472" y="356" width="120" height="74" rx="4" />
      </g>
      {/* Before — 길게 늘어진 로딩 바 */}
      <g data-parallax>
        <rect x="160" y="560" width="640" height="4" rx="2" fill={LINE} />
        <rect x="160" y="560" width="608" height="4" rx="2" fill="rgba(255,255,255,0.24)" />
      </g>
      {/* After — 짧은 오렌지 로딩 바 */}
      <g data-parallax>
        <rect x="160" y="596" width="640" height="4" rx="2" fill={LINE} />
        <rect x="160" y="596" width="36" height="4" rx="2" fill={ACCENT} />
        <circle cx="196" cy="598" r="6" fill={ACCENT} />
      </g>
      {/* 포커스 링 — TV 리모컨 포커스 모티프 */}
      <rect
        data-parallax
        x="588"
        y="128"
        width="174"
        height="98"
        rx="6"
        fill="none"
        stroke={ACCENT}
        strokeWidth="2"
      />
    </svg>
  );
}

export const WORK_SCENE_GRAPHICS: Record<SceneTheme, React.ComponentType> = {
  blueprint: BlueprintScene,
  appliance: ApplianceScene,
  tv: TvScene,
};

/** 장면 배경 틴트 CSS 변수 매핑 */
export const WORK_SCENE_TINTS: Record<SceneTheme, string> = {
  blueprint: 'var(--scene-bg-blueprint)',
  appliance: 'var(--scene-bg-appliance)',
  tv: 'var(--scene-bg-tv)',
};
