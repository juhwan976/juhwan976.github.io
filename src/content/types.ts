// 콘텐츠 데이터 타입 정의.
// 모든 화면 문구/수치/에셋 경로는 이 타입을 따르는 데이터 파일에서 관리한다.

export const MediaKinds = {
  IMAGE: "image",
  VIDEO: "video",
} as const;

export type MediaKind = (typeof MediaKinds)[keyof typeof MediaKinds];

/** 에셋·정보가 아직 없을 때 사용하는 예약 값 */
export const IMAGE_PLACEHOLDER = "IMAGE_PLACEHOLDER";
export const VIDEO_PLACEHOLDER = "VIDEO_PLACEHOLDER";
export const TEXT_PLACEHOLDER = "TEXT_PLACEHOLDER";

export interface MediaItem {
  readonly kind: MediaKind;
  /** 실제 파일 경로 또는 IMAGE_PLACEHOLDER / VIDEO_PLACEHOLDER */
  readonly src: string;
  /** 영상일 때 poster 이미지 경로 */
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
  /** 측정 기준 주석 (예: "내부 측정 기준") */
  readonly note?: string;
}

export interface ProjectChallenge {
  readonly id: string;
  /** 첫 항목은 'Key Challenge', 이후는 'Challenge 2'부터 순번을 잇는다 */
  readonly label: string;
  readonly title: string;
  readonly problem: readonly string[];
  /** 결정 또는 해결 방식 */
  readonly approach: readonly string[];
  readonly reasons?: readonly string[];
  readonly results: readonly string[];
}

export interface FlowDiagramSpec {
  readonly type: "flow";
  readonly title: string;
  readonly steps: ReadonlyArray<{
    readonly title: string;
    readonly detail?: string;
  }>;
}

export interface SplitDiagramSpec {
  readonly type: "split";
  readonly title: string;
  readonly left: { readonly title: string; readonly items: readonly string[] };
  readonly right: { readonly title: string; readonly items: readonly string[] };
}

export type DiagramSpec = FlowDiagramSpec | SplitDiagramSpec;

export interface ProjectDecision {
  readonly id: string;
  /** 첫 항목은 'Key Decision', 이후는 'Decision 2'부터 순번을 잇는다 */
  readonly label: string;
  readonly title: string;
  readonly body: readonly string[];
  readonly diagram?: DiagramSpec;
}

export interface ReflectionItem {
  readonly title: string;
  readonly points: readonly string[];
}

export interface ProjectContent {
  readonly slug: string;
  /** 프로젝트 번호 (예: '01') */
  readonly number: string;
  readonly name: string;
  /** 상세 페이지 표시 제목. '\n'으로 줄바꿈 */
  readonly title: string;
  /** 한 줄 설명 */
  readonly summary: string;
  readonly period: string;
  readonly team: string;
  /** 메인 Work 밴드에 노출하는 역할 요약 한 줄 (Career와 중복 금지 — 이 프로젝트 안에서의 담당 구성만) */
  readonly roleLine: string;
  readonly tech: readonly string[];
  readonly users: readonly string[];
  readonly myRole: readonly string[];
  /** 문제 배경 */
  readonly background: readonly string[];
  /** 메인 Work 밴드와 상세 Outcome에 노출하는 핵심 성과 (메인은 최대 3개) */
  readonly highlights: readonly ProjectStat[];
  readonly challenges: readonly ProjectChallenge[];
  readonly decisions: readonly ProjectDecision[];
  readonly results: readonly string[];
  /** 실서비스 증빙용 외부 링크 (스토어 등). 있을 때만 상세 페이지에 노출 */
  readonly links?: ReadonlyArray<{
    readonly label: string;
    readonly url: string;
  }>;
  /** 회고. items가 비어 있으면 note만 표시 */
  readonly reflection: {
    readonly note?: string;
    readonly items: readonly ReflectionItem[];
  };
  readonly gallery: readonly MediaItem[];
  /** 메인 Work 밴드에 사용하는 대표 미디어 */
  readonly cardMedia: MediaItem;
}

export interface CareerRole {
  readonly id: string;
  /** 표시용 기간 (예: "2026.02 — 현재") */
  readonly period: string;
  /** 직급 (예: "팀장") */
  readonly title: string;
  /** 소속 팀 (예: "인터랙션레이어") */
  readonly team: string;
  /** 담당 범위 한 줄 (프로젝트 서사는 Work 담당 — 역할 관점만) */
  readonly summary: string;
  /** 현재 역할 여부 */
  readonly current?: boolean;
}

export interface CareerCompany {
  readonly id: string;
  readonly name: string;
  /** 로고 경로. 아직 없으면 IMAGE_PLACEHOLDER (이니셜 박스로 대체 렌더링) */
  readonly logo: string;
  /** 입사 시점 "YYYY.MM" — 재직 기간 계산에 사용 */
  readonly start: string;
  /** 퇴사 시점 "YYYY.MM". 없으면 재직 중 */
  readonly end?: string;
  /** 역임한 역할. 최신순 */
  readonly roles: readonly CareerRole[];
}

export interface SiteConfig {
  readonly pageTitle: string;

  readonly name: string;
  readonly nameEn: string;
  readonly role: string;
  /** 미확정이면 EMAIL_PLACEHOLDER */
  readonly email: string;
  /** 미확정이면 RESUME_URL_PLACEHOLDER */
  readonly resumeUrl: string;
  /** 소셜/외부 프로필 바로가기. url이 '_PLACEHOLDER'로 끝나면 노출하지 않음 */
  readonly socials: ReadonlyArray<{
    readonly id: string;
    readonly label: string;
    readonly url: string;
  }>;
  readonly nav: ReadonlyArray<{ readonly id: string; readonly label: string }>;
  readonly hero: {
    /** 메인 문장. '\n'으로 줄바꿈 */
    readonly headline: string;
    /** 짧은 설명. '\n'으로 줄바꿈 */
    readonly description: string;
    readonly cta: string;
  };
  readonly about: {
    /** '\n'으로 줄바꿈 */
    readonly title: string;
    readonly body: readonly string[];
  };
}
