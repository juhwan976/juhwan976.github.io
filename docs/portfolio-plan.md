# Portfolio Plan

장주환 — Frontend Engineer 개인 포트폴리오 설계 문서.

---

## 1. 사이트 목적

- 채용 담당자가 3분 안에 "다양한 플랫폼에서 제품을 만든 프론트엔드 엔지니어"라는 인상을 얻게 한다.
- 프로젝트 상세 페이지에서 문제 해결 과정과 기술적 의사결정의 깊이를 증명한다.
- 이력서형 나열이 아니라 문제 → 판단 → 결과 구조로 역량을 전달한다.

강조 우선순위:

1. 프론트엔드 개발 역량
2. 사용자 경험 설계
3. 모바일 / Flutter 개발 경험

## 2. 사용자

- 자체 서비스 IT 기업 / 에이전시 / SI 기업의 채용 담당자, 팀 리드
- 데스크톱에서 처음 열람하는 경우가 많지만 모바일 열람도 완전 대응

## 3. 정보 구조

```text
/                             메인 (스크롤 기반)
/projects/logistics-simulator 물류 시뮬레이터 Case Study
/projects/lgsc                LGSC Case Study
/projects/travel-plus         Travel+ Case Study
/404                          Not Found
```

- 메인: 빠른 이해 담당 (Hero → Scroll Story → Projects → Principles → Capabilities → Career → Contact)
- 상세: 증명 담당 (읽기 쉬운 Case Study, 애니메이션은 보조)
- 상세 간 이전/다음 프로젝트 순환 이동 제공

## 4. 페이지별 섹션

### 메인 (`/`)

1. Header — 이름/직무 + About·Work·Principles·Contact 내비게이션, 현재 섹션 표시
2. Hero — 메인 카피, 직무, CTA(프로젝트 보기 / 이력서), 우측 3D 노드 그래픽
3. Scroll Story — 4개 장면 스크롤텔링 (핀 고정 + 스크럽)
4. Selected Projects — 프로젝트 3개, 문제/결정/결과 관점
5. Engineering Principles — 의사결정 원칙 4개
6. Capabilities — 업무 능력 4그룹 (아이콘 나열 금지)
7. Career Summary — 역할 확장 타임라인
8. Contact — 이름/직무/이메일만 표시

### 프로젝트 상세 (`/projects/:slug`)

1. Project Hero
2. At a Glance
3. Context and Problem
4. My Role
5. Key Challenges
6. Design and Engineering Decisions (다이어그램 포함)
7. Architecture
8. Results
9. Reflection
10. Gallery
11. Next Project

## 5. 컴포넌트 목록

전역 (`src/components/`):

- `Header` — 홈/상세 모드 겸용. 홈: 섹션 앵커 내비게이션, 상세: Back to Home + Prev/Next
- `SectionHeading` — 섹션 라벨(번호/eyebrow) + 제목
- `TagList` — 기술/역할 태그 나열
- `StatValue` — viewport 진입 시 1회 카운트업하는 수치
- `MediaFrame` — 이미지/영상 프레임. 에셋이 없으면 추상 placeholder(그리드 + 와이어프레임 + 프로젝트명 패널) 렌더

메인 로컬 (`src/views/Home/sections/`):

- `HeroSection`, `ScrollStorySection`, `SelectedProjectsSection`, `PrinciplesSection`, `CapabilitiesSection`, `CareerSection`, `ContactSection`

상세 로컬 (`src/views/ProjectDetail/components/`):

- `ProjectHero`, `AtAGlance`, `ProseBlock`, `ChallengeBlock`, `DecisionBlock`, `FlowDiagram`(순차 강조), `SplitStateDiagram`, `ResultsBlock`, `ReflectionBlock`, `GalleryBlock`, `NextProjectLink`

3D (`src/three/`):

- `HeroScene` — 노드-연결선 시스템, 오렌지 활성 경로 1개, 마우스에 약하게 반응. lazy import, 화면 밖에서 렌더 중지

## 6. 디자인 토큰

색상 (다크 단일 테마):

| 토큰                       | 값                         |
| -------------------------- | -------------------------- |
| `--color-bg`               | `#09090B`                  |
| `--color-surface`          | `#111114`                  |
| `--color-surface-elevated` | `#18181C`                  |
| `--color-text`             | `#F5F5F3`                  |
| `--color-text-secondary`   | `#99999F`                  |
| `--color-border`           | `rgba(255, 255, 255, 0.1)` |
| `--color-accent`           | `#FF6A00`                  |
| `--color-accent-light`     | `#FF8A34`                  |

오렌지 사용처 제한: 활성 내비게이션, 핵심 키워드, 프로젝트 번호, 인터랙션 상태, 중요 수치, 버튼 hover/focus.

타이포그래피:

- 본문/디스플레이: Pretendard Variable (한글 최적화)
- 라벨/수치/코드성 텍스트: 시스템 모노스페이스 스택 (`ui-monospace`, SF Mono 등 — 폰트 로드 비용 0)
- 스케일: clamp() 기반 유동 타입. 디스플레이 최대 5rem 수준, 본문 1rem/1.7

간격·레이아웃:

- 콘텐츠 최대 폭 1200px, 본문 프로즈 폭 720px
- 섹션 수직 여백 clamp(96px ~ 200px)
- 얇은 1px 보더(`--color-border`)와 12컬럼 그리드 라인을 시각 언어로 사용

## 7. 애니메이션 원칙

- 인터랙션은 의미가 있을 때만. 모든 텍스트 fade-up 금지.
- Scroll Story만 핀 고정 스크럽 사용. 그 외 스크롤 스냅 금지.
- 텍스트를 읽는 중 콘텐츠가 움직이지 않게 한다.
- 수치 카운트업은 viewport 진입 시 1회.
- `prefers-reduced-motion`: 핀/스크럽/3D/카운트업 전부 비활성화하고 정적 콘텐츠로 대체. 콘텐츠 접근성은 동일.
- GSAP ScrollTrigger는 Scroll Story에서만 등록하고 언마운트 시 정리.

## 8. 반응형 전략

- Desktop (≥1024px): Scroll Story 전체 경험, 3D 그래픽, 넓은 그리드
- Tablet (768–1023px): 3D 장면 대신 정적 SVG, Scroll Story 유지(장면 단순화)
- Mobile (<768px): Scroll Story를 장면별 세로 나열 + 가벼운 등장 전환으로 단순화, 3D 자동 로딩 금지, 영상은 탭 재생, hover 의존 기능 없음, 터치 타깃 44px 이상

## 9. 접근성 전략

- semantic HTML (`header/main/section/nav/footer`, 제목 위계 유지)
- 키보드 내비게이션 + 명확한 `:focus-visible` 링
- 이미지 alt, placeholder에도 대체 텍스트
- 영상은 텍스트 설명 병행, muted/playsInline
- 명암 대비: 본문 `#F5F5F3`/`#09090B`, 보조 텍스트 `#99999F` 이상 유지
- 애니메이션 없이도 모든 콘텐츠 열람 가능

## 10. 필요한 에셋

아직 없는 에셋은 전부 추상 placeholder로 렌더된다. 파일을 아래 경로에 넣고 content 데이터의 경로를 바꾸면 교체된다.

```text
public/images/profile/
public/images/projects/logistics-simulator/  # 편집 화면, Before/After, 카메라 모드 비교, 시스템 구성도
public/images/projects/lgsc/                 # 블러 처리 화면, 연결 흐름, 동기화 다이어그램
public/images/projects/travel-plus/          # 서비스 화면, 전후 비교, 포커스 흐름
public/videos/logistics-simulator/           # 편집/시뮬레이션 화면 녹화 (muted)
public/videos/travel-plus/                   # 성능 개선 데모 (muted)
```

## 11. 미확정 정보 목록

| 항목                 | 현재 값                                   | 위치                        |
| -------------------- | ----------------------------------------- | --------------------------- |
| 이메일               | `EMAIL_PLACEHOLDER`                       | `src/content/site.ts`       |
| 이력서 URL           | `RESUME_URL_PLACEHOLDER`                  | `src/content/site.ts`       |
| 커리어 단계별 연도   | `TODO_VERIFY_DATE`                        | `src/content/site.ts`       |
| 프로젝트 이미지/영상 | `IMAGE_PLACEHOLDER` / `VIDEO_PLACEHOLDER` | `src/content/projects/*.ts` |

성과 수치는 제공된 값만 사용하고, 측정 기준이 불명확한 값은 "약", "내부 측정 기준" 표기를 유지한다. 임의의 경력·성과·수치를 추가하지 않는다.
