// 콘텐츠 데이터 타입 정의.
// 모든 화면 문구/수치/에셋 경로는 이 타입을 따르는 데이터 파일에서 관리한다.

export const MediaKinds = {
  IMAGE: 'image',
  VIDEO: 'video',
} as const;

export type MediaKind = (typeof MediaKinds)[keyof typeof MediaKinds];

/** 에셋이 아직 없을 때 사용하는 예약 경로 값 */
export const IMAGE_PLACEHOLDER = 'IMAGE_PLACEHOLDER';
export const VIDEO_PLACEHOLDER = 'VIDEO_PLACEHOLDER';

export interface MediaItem {
  readonly kind: MediaKind;
  /** 실제 파일 경로 또는 IMAGE_PLACEHOLDER / VIDEO_PLACEHOLDER */
  readonly src: string;
  /** 영상일 때 poster 이미지 경로 (없으면 placeholder 렌더) */
  readonly poster?: string;
  readonly alt: string;
  readonly caption?: string;
  /** placeholder 패널에 표시할 라벨 */
  readonly placeholderLabel?: string;
}

export interface ProjectStat {
  readonly label: string;
  /** 표시용 값 (예: "약 1개월", "7,000명") */
  readonly value: string;
  /** 카운트업 대상 수치 (없으면 정적 표시) */
  readonly numericValue?: number;
  readonly prefix?: string;
  readonly suffix?: string;
  /** 측정 기준 주석 (예: "내부 측정 기준") */
  readonly note?: string;
}

export interface ProjectChallenge {
  readonly id: string;
  readonly label: string;
  readonly title: string;
  readonly problem: readonly string[];
  /** 결정 또는 해결 방식 */
  readonly approach: readonly string[];
  readonly reasons?: readonly string[];
  readonly results: readonly string[];
}

export interface FlowDiagramSpec {
  readonly type: 'flow';
  readonly title: string;
  readonly steps: ReadonlyArray<{
    readonly title: string;
    readonly detail?: string;
  }>;
}

export interface SplitDiagramSpec {
  readonly type: 'split';
  readonly title: string;
  readonly left: { readonly title: string; readonly items: readonly string[] };
  readonly right: { readonly title: string; readonly items: readonly string[] };
}

export type DiagramSpec = FlowDiagramSpec | SplitDiagramSpec;

export interface ProjectDecision {
  readonly id: string;
  readonly label: string;
  readonly title: string;
  readonly body: readonly string[];
  readonly diagram?: DiagramSpec;
}

export interface ReflectionItem {
  readonly title: string;
  readonly points: readonly string[];
}

export const SceneThemes = {
  BLUEPRINT: 'blueprint',
  APPLIANCE: 'appliance',
  TV: 'tv',
} as const;

export type SceneTheme = (typeof SceneThemes)[keyof typeof SceneThemes];

/** 메인 페이지 Work 장면에 노출하는 최소 정보 */
export interface ProjectScene {
  /** 큰 제목. '\n'으로 줄바꿈 */
  readonly title: string;
  /** 한 줄(최대 2줄) 설명. '\n'으로 줄바꿈 */
  readonly summary: string;
  /** 핵심 수치 2~3개 (표시 문자열) */
  readonly stats: readonly string[];
  /** 핵심 기술 최대 5개 */
  readonly coreTech: readonly string[];
  /** 장면 배경 틴트/그래픽 테마 */
  readonly theme: SceneTheme;
}

export interface ProjectContent {
  readonly slug: string;
  /** 프로젝트 번호 (예: '01') */
  readonly number: string;
  readonly name: string;
  /** 표시 제목. '\n'으로 줄바꿈 */
  readonly title: string;
  readonly summary: string;
  readonly period: string;
  readonly team: string;
  readonly tags: readonly string[];
  readonly tech: readonly string[];
  readonly users: readonly string[];
  readonly myRole: readonly string[];
  /** 문제 배경 */
  readonly background: readonly string[];
  /** 카드/At a Glance에 노출하는 핵심 성과 */
  readonly highlights: ProjectStat[];
  readonly challenges: readonly ProjectChallenge[];
  readonly decisions: readonly ProjectDecision[];
  readonly results: readonly string[];
  /** 회고. items가 비어 있으면 note만 표시 */
  readonly reflection: {
    readonly note?: string;
    readonly items: readonly ReflectionItem[];
  };
  readonly gallery: readonly MediaItem[];
  /** 목록 카드에 사용하는 대표 미디어 */
  readonly cardMedia: MediaItem;
  /** 메인 페이지 Work 장면 정보 */
  readonly scene: ProjectScene;
}

export interface ScrollStoryScene {
  readonly id: string;
  readonly label: string;
  /** 장면 그래픽 종류 (ScrollStory 렌더러가 해석) */
  readonly graphic: 'blocks' | 'branches' | 'paths' | 'system';
  /** 큰 제목. '\n'으로 줄바꿈 */
  readonly title: string;
  /** 2줄 이내 설명. '\n'으로 줄바꿈 */
  readonly description: string;
}

export interface Principle {
  readonly id: string;
  readonly label: string;
  readonly title: string;
  readonly description: string;
}

export interface SiteConfig {
  readonly name: string;
  readonly role: string;
  /** 미확정이면 EMAIL_PLACEHOLDER */
  readonly email: string;
  /** 미확정이면 RESUME_URL_PLACEHOLDER */
  readonly resumeUrl: string;
  readonly nav: ReadonlyArray<{ readonly id: string; readonly label: string }>;
  readonly hero: {
    /** 큰 제목. '\n'으로 줄바꿈 */
    readonly headline: string;
    readonly roles: readonly string[];
    /** 핵심 기술 한 줄 (예: 'React · Flutter · Electron') */
    readonly techLine: string;
    readonly cta: string;
  };
  readonly scrollStory: readonly ScrollStoryScene[];
  readonly principlesTitle: string;
  readonly principles: readonly Principle[];
  /** Principles 하단에 한 줄로 표시하는 역량 키워드 */
  readonly principlesFootnote: string;
  readonly contact: {
    /** 큰 문장. '\n'으로 줄바꿈 */
    readonly title: string;
  };
}
