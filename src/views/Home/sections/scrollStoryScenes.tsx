/* eslint-disable react-refresh/only-export-components -- 정적 그래픽 매핑 파일 */
import type { ScrollStoryScene } from '@/content/types';

// Scroll Story 장면 그래픽.
// 규칙:
// - data-fx="drop"  : 위에서 떨어지며 등장 (스크럽 모드)
// - data-fx="fade"  : 서서히 등장
// - data-fx="draw"  : 선이 그려지며 등장 (SVGGeometryElement만)
// 애니메이션이 없어도 완성된 그림으로 보여야 한다.

const LINE = 'rgba(255, 255, 255, 0.16)';
const LINE_STRONG = 'rgba(255, 255, 255, 0.34)';
const LABEL = '#8a8a90';
const ACCENT = '#ff6a00';
const SURFACE = '#111114';

const labelProps = {
  fontFamily: 'var(--font-mono)',
  fontSize: 13,
  fill: LABEL,
} as const;

/** Scene 1 — 테트리스에서 영감을 받은 블록이 작은 시스템으로 조립되는 모습 */
function SceneBlocks(): React.ReactNode {
  const cell = { width: 52, height: 52, rx: 3 } as const;
  const blocks: ReadonlyArray<{ x: number; y: number; accent?: boolean }> = [
    { x: 172, y: 444 },
    { x: 228, y: 444 },
    { x: 284, y: 444 },
    { x: 340, y: 444 },
    { x: 396, y: 444 },
    { x: 228, y: 388 },
    { x: 284, y: 388 },
    { x: 340, y: 388 },
    { x: 284, y: 332 },
    { x: 340, y: 332 },
    { x: 284, y: 276, accent: true },
  ];

  return (
    <svg viewBox="0 0 600 600" role="presentation" focusable="false">
      <g stroke={LINE} strokeWidth="1" strokeDasharray="2 6">
        <line x1="198" y1="120" x2="198" y2="496" />
        <line x1="310" y1="120" x2="310" y2="496" />
        <line x1="422" y1="120" x2="422" y2="496" />
      </g>
      <line
        x1="140"
        y1="500"
        x2="460"
        y2="500"
        stroke={LINE_STRONG}
        strokeWidth="1"
      />
      {blocks.map((block) => (
        <rect
          key={`${block.x}-${block.y}`}
          data-fx="drop"
          x={block.x}
          y={block.y}
          width={cell.width}
          height={cell.height}
          rx={cell.rx}
          fill={block.accent ? 'rgba(255, 106, 0, 0.14)' : SURFACE}
          stroke={block.accent ? ACCENT : LINE_STRONG}
          strokeWidth={block.accent ? 1.5 : 1}
        />
      ))}
      <text data-fx="fade" x="140" y="545" {...labelProps}>
        Excel VBA — 첫 번째 실체
      </text>
    </svg>
  );
}

/** Scene 2 — 블록이 UI/상태/API/데이터로 분해되고 여러 경로가 하나의 결과로 연결 */
function SceneBranches(): React.ReactNode {
  const nodes: ReadonlyArray<{ x: number; label: string }> = [
    { x: 110, label: 'UI 컴포넌트' },
    { x: 235, label: '상태' },
    { x: 365, label: 'API' },
    { x: 490, label: '데이터 구조' },
  ];

  return (
    <svg viewBox="0 0 600 600" role="presentation" focusable="false">
      <rect
        data-fx="fade"
        x="250"
        y="64"
        width="100"
        height="56"
        rx="4"
        fill={SURFACE}
        stroke={LINE_STRONG}
      />
      <g stroke={LINE} strokeWidth="1" fill="none">
        {nodes.map((node) => (
          <path
            key={node.label}
            data-fx="draw"
            d={`M300 120 C 300 200, ${node.x} 210, ${node.x} 292`}
          />
        ))}
        {nodes.map((node) => (
          <path
            key={`merge-${node.label}`}
            data-fx="draw"
            d={`M${node.x} 308 C ${node.x} 400, 300 402, 300 472`}
          />
        ))}
      </g>
      <path
        data-fx="draw"
        d="M300 120 C 300 200, 235 210, 235 292 M235 308 C 235 400, 300 402, 300 472"
        stroke={ACCENT}
        strokeWidth="1.5"
        fill="none"
        opacity="0.9"
      />
      {nodes.map((node) => (
        <g key={`node-${node.label}`} data-fx="fade">
          <circle
            cx={node.x}
            cy="300"
            r="7"
            fill={SURFACE}
            stroke={node.label === '상태' ? ACCENT : LINE_STRONG}
            strokeWidth={node.label === '상태' ? 1.5 : 1}
          />
          <text x={node.x} y="336" textAnchor="middle" {...labelProps}>
            {node.label}
          </text>
        </g>
      ))}
      <g data-fx="fade">
        <circle cx="300" cy="480" r="9" fill={ACCENT} />
        <text x="300" y="520" textAnchor="middle" {...labelProps}>
          상황에 적합한 답
        </text>
      </g>
    </svg>
  );
}

/** Scene 3 — 예상 경로와 실제 사용자 경로가 갈라졌다가 피드백으로 다시 만나는 모습 */
function ScenePaths(): React.ReactNode {
  return (
    <svg viewBox="0 0 600 600" role="presentation" focusable="false">
      <path
        data-fx="draw"
        d="M90 280 C 210 258, 380 256, 498 268"
        stroke={LINE_STRONG}
        strokeWidth="1"
        strokeDasharray="5 7"
        fill="none"
      />
      <path
        data-fx="draw"
        d="M90 280 C 150 386, 232 176, 302 338 C 350 448, 440 386, 498 330"
        stroke={LINE_STRONG}
        strokeWidth="1.25"
        fill="none"
      />
      <path
        data-fx="draw"
        d="M498 330 C 556 330, 556 268, 498 268"
        stroke={ACCENT}
        strokeWidth="1.5"
        fill="none"
      />
      <g data-fx="fade">
        <circle cx="90" cy="280" r="7" fill={SURFACE} stroke={LINE_STRONG} />
        <text x="90" y="248" textAnchor="middle" {...labelProps}>
          시작
        </text>
      </g>
      <text data-fx="fade" x="250" y="222" textAnchor="middle" {...labelProps}>
        개발자가 예상한 경로
      </text>
      <text data-fx="fade" x="250" y="452" textAnchor="middle" {...labelProps}>
        실제 사용자의 경로
      </text>
      <text data-fx="fade" x="536" y="222" textAnchor="middle" {...labelProps}>
        사용자 피드백
      </text>
      <circle data-fx="fade" cx="498" cy="268" r="8" fill={ACCENT} />
    </svg>
  );
}

/** Scene 4 — UI, 데이터, 컴포넌트가 하나의 정돈된 인터페이스로 결합 */
function SceneSystem(): React.ReactNode {
  return (
    <svg viewBox="0 0 600 600" role="presentation" focusable="false">
      <rect
        data-fx="draw"
        x="180"
        y="110"
        width="240"
        height="380"
        rx="8"
        fill="none"
        stroke={LINE_STRONG}
        strokeWidth="1.25"
      />
      <line
        data-fx="draw"
        x1="180"
        y1="158"
        x2="420"
        y2="158"
        stroke={LINE_STRONG}
      />
      <line
        data-fx="draw"
        x1="248"
        y1="158"
        x2="248"
        y2="490"
        stroke={LINE}
      />
      <g data-fx="fade">
        <circle cx="198" cy="134" r="4" fill="none" stroke={LINE_STRONG} />
        <line x1="214" y1="134" x2="300" y2="134" stroke={LINE} />
      </g>
      <g data-fx="fade">
        <rect x="196" y="182" width="36" height="9" rx="2" fill={LINE} />
        <rect x="196" y="206" width="36" height="9" rx="2" fill={ACCENT} />
        <rect x="196" y="230" width="36" height="9" rx="2" fill={LINE} />
      </g>
      <g data-fx="fade" fill="none" stroke={LINE_STRONG}>
        <rect x="264" y="180" width="138" height="64" rx="3" />
        <rect x="264" y="260" width="138" height="40" rx="3" />
        <rect x="264" y="316" width="63" height="88" rx="3" />
        <rect x="339" y="316" width="63" height="88" rx="3" />
      </g>
      <g stroke={LINE} strokeWidth="1">
        <line data-fx="draw" x1="96" y1="200" x2="180" y2="200" />
        <line data-fx="draw" x1="96" y1="400" x2="180" y2="400" />
        <line data-fx="draw" x1="504" y1="240" x2="420" y2="240" />
        <line data-fx="draw" x1="504" y1="380" x2="420" y2="380" />
      </g>
      <line
        data-fx="draw"
        x1="96"
        y1="300"
        x2="180"
        y2="300"
        stroke={ACCENT}
        strokeWidth="1.5"
      />
      <g data-fx="fade" fill={SURFACE} stroke={LINE_STRONG}>
        <circle cx="96" cy="200" r="6" />
        <circle cx="96" cy="400" r="6" />
        <circle cx="504" cy="240" r="6" />
        <circle cx="504" cy="380" r="6" />
      </g>
      <circle data-fx="fade" cx="96" cy="300" r="7" fill={ACCENT} />
      <text data-fx="fade" x="96" y="440" textAnchor="middle" {...labelProps}>
        데이터
      </text>
      <text data-fx="fade" x="504" y="420" textAnchor="middle" {...labelProps}>
        컴포넌트
      </text>
      <text data-fx="fade" x="300" y="540" textAnchor="middle" {...labelProps}>
        하나의 사용자 인터페이스
      </text>
    </svg>
  );
}

export const STORY_GRAPHICS: Record<
  ScrollStoryScene['graphic'],
  React.ComponentType
> = {
  blocks: SceneBlocks,
  branches: SceneBranches,
  paths: ScenePaths,
  system: SceneSystem,
};
