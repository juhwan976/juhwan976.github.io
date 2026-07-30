# 장주환 — Portfolio

Frontend Engineer 개인 포트폴리오 웹사이트입니다.

React + TypeScript + Vite 기반이며, 스크롤 기반 메인 페이지와 프로젝트별 Case Study 상세 페이지로 구성됩니다. 설계 문서는 `docs/portfolio-plan.md`를 참고하세요.

## 페이지 구성

```text
/                              메인 (Hero → About → Selected Work → Career → Contact)
/projects/logistics-simulator  물류 시뮬레이터 Case Study
/projects/lgsc                 LGSC Case Study
/projects/travel-plus          LG Travel+ Case Study
```

## 기술 스택

- **프론트엔드**: React 19, TypeScript(strict), Vite
- **라우팅**: React Router DOM
- **스타일**: Styled Components + 전역 테마(`src/styles/theme.ts`), Pretendard Variable
- **인터랙션**: Three.js 유체 시뮬레이션 배경 (LiquidEther, lazy), Canvas 클릭 스파크, 마스크 리빌
- **품질 도구**: ESLint, Prettier, Vitest

## 실행 방법

```bash
yarn install   # 의존성 설치
yarn dev       # 개발 서버
yarn build     # 프로덕션 빌드 (typecheck 포함)
yarn preview   # 빌드 결과 미리보기
yarn lint      # ESLint
yarn typecheck # 타입 검사
```

## 주요 인터랙션

- **첫 진입 로딩 스플래시** — 파비콘 마크(슬래시+닷)가 진행률만큼 아래에서 위로 채워지는 오버레이. 폰트 로딩, `window load`, Hero 배경 셰이더의 첫 프레임까지 실제 로딩 신호를 기다린 뒤 페이드아웃됩니다. (신호 지연 시 5초 안전장치)
- **Hero 유체 배경** — Three.js 기반 LiquidEther 시뮬레이션. lazy import로 초기 번들에서 분리되고, 화면 밖이거나 탭이 숨겨지면 렌더링을 멈춥니다. 모바일에서는 로드하지 않습니다.
- **클릭 스파크** — 클릭 지점에서 액센트 색 스파크가 퍼지는 전역 효과. (reactbits Click Spark 이식)
- **미디어 마스크 리빌** — 이미지/영상 패널이 viewport 진입 시 1회 왼쪽에서 드러납니다.
- **모바일 헤더** — 섹션 링크는 햄버거 드롭다운으로 접고, Resume 링크는 항상 노출합니다.

## 콘텐츠 수정 방법

모든 문구, 수치, 기간, 에셋 경로는 컴포넌트가 아니라 `src/content/` 데이터 파일에서 관리합니다.

| 파일 | 내용 |
| --- | --- |
| `src/content/site.ts` | 탭 타이틀, 이름, 직무, 이메일, 이력서 URL, 내비게이션, Hero·About 카피 |
| `src/content/career.ts` | 회사 단위 경력 (로고, 재직 기간, 역할) |
| `src/content/projects/logistics-simulator.ts` | 물류 시뮬레이터 Case Study 전체 |
| `src/content/projects/lgsc.ts` | LGSC Case Study 전체 |
| `src/content/projects/travel-plus.ts` | LG Travel+ Case Study 전체 |
| `src/content/types.ts` | 콘텐츠 타입 정의 |

### 미확정 정보 (placeholder)

아직 제공되지 않은 정보는 아래 placeholder로 표시되어 있으며, 값을 채우면 UI가 자동으로 전환됩니다.

- `RESUME_URL_PLACEHOLDER` — `src/content/site.ts`의 `resumeUrl`. URL을 넣으면 이력서 링크가 활성화됩니다.
- `LINKEDIN_URL_PLACEHOLDER` / `REMEMBER_URL_PLACEHOLDER` — `src/content/site.ts`의 `socials`. url을 채우면 Contact 하단 바로가기로 노출됩니다.
- `IMAGE_PLACEHOLDER` / `VIDEO_PLACEHOLDER` — 프로젝트 이미지·영상. 경로를 넣기 전까지 라벨이 있는 placeholder 패널이 렌더됩니다.

### 에셋 구성

프로젝트 이미지는 아래 경로에 있으며, 각 content 파일의 `src`가 이를 참조합니다.

```text
public/
  images/
    career/                      # 회사 로고 (amuse.png)
    profile/
    projects/
      logistics-simulator/       # SVG 다이어그램 (아키텍처, 파이프라인 등)
      lgsc/                      # 스토어 스크린샷 합성 이미지 (카드, 갤러리)
      travel-plus/               # TV 앱 스크린샷 합성 이미지
  videos/
    logistics-simulator/
    travel-plus/
```

예: `src: '/images/projects/lgsc/card.png'`

## 접근성 / 성능

- `prefers-reduced-motion`: 스플래시 페이드, 메뉴 애니메이션, 클릭 스파크가 비활성화되거나 즉시 완료됩니다.
- 모바일(<768px)에서는 3D 배경을 로드하지 않습니다.
- 키보드 내비게이션: 본문 건너뛰기 링크, `:focus-visible` 링, 햄버거 메뉴 `aria-expanded`/Escape 닫기 제공.
- Three.js는 lazy import이며, IntersectionObserver로 화면 밖에서는 시뮬레이션을 중지합니다.
- 로딩 스플래시는 `role="progressbar"`와 실시간 `aria-valuenow`를 제공합니다.
- 이미지에는 `loading="lazy"`를 적용합니다.

## 디렉터리 구조

```text
src/
├── components/   # 전역 컴포넌트 (Backdrop, ClickSpark, Header, LoadingOverlay, MediaPanel, ui)
├── constants/    # 라우트 경로 등 전역 상수
├── content/      # 사이트/커리어/프로젝트 콘텐츠 데이터 (단일 원천)
├── hooks/        # 전역 훅 (useMediaQuery, useInViewOnce, useDocumentTitle 등)
├── routes/       # 라우터, 라우트 전환 시 스크롤 초기화
├── styles/       # 전역 테마(theme.ts), 전역 스타일(global.scss)
├── types/        # styled-components 테마 타입 선언
└── views/        # 페이지 단위 View (Home, ProjectDetail, common)
    └── Home/
        ├── hooks/     # View 로컬 훅 (useHomeSplash)
        └── sections/  # Hero, About, Work, Career, Contact
```

### 스타일 규칙

- 색상, 폰트 크기, 간격, z-index는 `src/styles/theme.ts`에 정의된 토큰만 사용합니다.
- 페이지/컴포넌트별 스타일은 `.styles.ts`에서 `const S = { ... } as const`로 묶어 default export 하고, `S.ComponentName` 형태로 사용합니다.
- 상태에 따른 스타일은 transient props(`$` prefix)로 전달합니다.
