// 전역 테마.
// color, font-size, spacing, z-index는 반드시 이 파일의 값만 사용한다.

export const zIndexes = [
  'normal',
  'backdrop',
  'content',
  'header',
  'skip',
  /** 첫 진입 로딩 오버레이 — 항상 최상단 */
  'overlay',
] as const;

type ZIndexToken = (typeof zIndexes)[number];

const zIndexMap = Object.fromEntries(
  zIndexes.map((token, index) => [token, index]),
) as Record<ZIndexToken, number>;

export const theme = {
  colors: {
    /** 페이지 기본 배경 */
    bg: '#0e0f11',
    /** 살짝 떠 있는 패널 배경 */
    panel: '#15171a',
    /** 미디어 placeholder 배경 */
    media: '#1a1d21',
    /** 얇은 구분선 */
    line: '#26292e',
    /** 강조 구분선 */
    lineStrong: '#3a3e45',
    /** 기본 텍스트 */
    text: '#eceae5',
    /** 보조 텍스트 */
    textDim: '#9aa0a8',
    /** 흐린 텍스트 (라벨, 각주) */
    textFaint: '#686d74',
    /** 오렌지 포인트 */
    accent: '#ff5c1f',
    /** 오렌지 포인트 (연한 배경용) */
    accentSoft: 'rgba(255, 92, 31, 0.12)',
    /** 오렌지 포인트 (섹션 배경 톤 전환용, 가장 연함) */
    accentTint: 'rgba(255, 92, 31, 0.05)',
    /** 거대 워터마크 타이포 */
    watermark: '#1b1d21',
  },
  fonts: {
    body: "'Pretendard Variable', 'Pretendard', -apple-system, 'Apple SD Gothic Neo', sans-serif",
    mono: "'SF Mono', ui-monospace, 'JetBrains Mono', Menlo, monospace",
  },
  fontSizes: {
    /** Hero 헤드라인 */
    display: 'clamp(2.5rem, 5.2vw, 4.375rem)',
    /** 상세 페이지 제목 — display와 h2 사이 */
    h1: 'clamp(2.1rem, 3.8vw, 3.2rem)',
    /** 섹션 대제목 */
    h2: 'clamp(1.75rem, 3vw, 2.625rem)',
    /** 프로젝트명, 원칙 선언 */
    h3: 'clamp(1.25rem, 1.9vw, 1.75rem)',
    /** 강조 본문 */
    bodyLg: '1.0625rem',
    body: '0.9375rem',
    small: '0.8125rem',
    /** 각주, 캡션 */
    tiny: '0.75rem',
    /** 소형 대문자 라벨 */
    label: '0.6875rem',
    /** Contact 하단 워터마크 */
    watermark: 'clamp(4rem, 13vw, 13rem)',
  },
  spacing: {
    xs: '8px',
    sm: '12px',
    md: '16px',
    lg: '24px',
    xl: '40px',
    xxl: '64px',
    /** 섹션 수직 여백 */
    sectionY: 'clamp(104px, 14vh, 176px)',
    /** 좌우 여백 — 화면 크기에 비례 */
    gutter: 'clamp(24px, 6vw, 120px)',
  },
  layout: {
    /** 전체 레이아웃 최대 너비 */
    maxWidth: '1728px',
    /** 본문 텍스트 최대 너비 */
    proseWidth: '620px',
    /** 헤더 높이 */
    headerHeight: '64px',
  },
  media: {
    /** 768px 미만 */
    mobile: '@media (max-width: 767px)',
    /** 1024px 미만 */
    tablet: '@media (max-width: 1023px)',
    /** hover 가능한 포인터 장치 */
    hover: '@media (hover: hover)',
    reducedMotion: '@media (prefers-reduced-motion: reduce)',
  },
  zIndexes: zIndexMap,
} as const;

export type AppTheme = typeof theme;
