# 장주환 — Portfolio

Frontend Engineer / UX Engineer 개인 포트폴리오 웹사이트입니다.

React + TypeScript + Vite 기반이며, 스크롤 기반 메인 페이지와 프로젝트별 Case Study 상세 페이지로 구성된 하이브리드 구조를 사용합니다. 설계 문서는 `docs/portfolio-plan.md`를 참고하세요.

## 페이지 구성

```text
/                              메인 (Hero → Scroll Story → Projects → Principles → Capabilities → Career → Contact)
/projects/logistics-simulator  물류 시뮬레이터 Case Study
/projects/lgsc                 LGSC Case Study
/projects/travel-plus          Travel+ Case Study
```

## 기술 스택

- **프론트엔드**: React 19, TypeScript(strict), Vite
- **라우팅**: React Router DOM (route별 lazy 코드 분할)
- **스타일**: SCSS (디자인 토큰 + SCSS Modules), Pretendard Variable
- **인터랙션**: GSAP + ScrollTrigger (Scroll Story), React Three Fiber + Three.js (Hero 3D, lazy)
- **품질 도구**: ESLint, Prettier, Vitest, Testing Library

## 실행 방법

```bash
yarn install   # 의존성 설치
yarn dev       # 개발 서버
yarn build     # 프로덕션 빌드 (typecheck 포함)
yarn preview   # 빌드 결과 미리보기
yarn test      # 테스트
yarn lint      # ESLint
yarn typecheck # 타입 검사
```

## 콘텐츠 수정 방법

모든 문구, 수치, 기간, 에셋 경로는 컴포넌트가 아니라 `src/content/` 데이터 파일에서 관리합니다.

| 파일 | 내용 |
| --- | --- |
| `src/content/site.ts` | 이름, 직무, 이메일, 이력서 URL, Hero 카피, Scroll Story, 원칙, 역량, 커리어, 연락처 |
| `src/content/projects/logistics-simulator.ts` | 물류 시뮬레이터 Case Study 전체 |
| `src/content/projects/lgsc.ts` | LGSC Case Study 전체 |
| `src/content/projects/travel-plus.ts` | Travel+ Case Study 전체 |
| `src/content/types.ts` | 콘텐츠 타입 정의 |

### 미확정 정보 (placeholder)

아직 제공되지 않은 정보는 아래 placeholder로 표시되어 있으며, 값을 채우면 UI가 자동으로 전환됩니다.

- `EMAIL_PLACEHOLDER` — `src/content/site.ts`의 `email`. 실제 이메일을 넣으면 mailto 링크로 표시됩니다.
- `RESUME_URL_PLACEHOLDER` — `src/content/site.ts`의 `resumeUrl`. URL을 넣으면 이력서 버튼이 활성화됩니다.
- `TODO_VERIFY_DATE` — `src/content/site.ts`의 커리어 단계별 연도.
- `IMAGE_PLACEHOLDER` / `VIDEO_PLACEHOLDER` — 프로젝트 이미지·영상. 경로를 넣기 전까지 추상 와이어프레임 패널이 렌더됩니다.

### 에셋 교체

파일을 아래 경로에 넣고, 각 프로젝트 content 파일의 `src`(및 영상의 `poster`)를 실제 경로로 바꾸면 됩니다.

```text
public/
  images/
    profile/
    projects/
      logistics-simulator/
      lgsc/
      travel-plus/
  videos/
    logistics-simulator/
    travel-plus/
```

예: `src: '/images/projects/lgsc/app-screen.png'`

## 접근성 / 성능

- `prefers-reduced-motion`: Scroll Story는 정적 나열로 전환되고, 3D·카운트업 애니메이션이 비활성화됩니다.
- 모바일(<768px)에서는 3D 에셋을 로드하지 않고, Scroll Story를 세로 나열로 단순화합니다.
- 키보드 내비게이션: 본문 건너뛰기 링크, `:focus-visible` 링 제공.
- Three.js는 lazy import이며 화면 밖에서는 렌더링을 중지합니다.

## 디렉터리 구조

```text
src/
├── components/   # 전역 컴포넌트 (Header, MediaFrame, SectionHeading, StatValue, TagList)
├── constants/    # 라우트 경로 등 전역 상수
├── content/      # 사이트/프로젝트 콘텐츠 데이터 (단일 원천)
├── hooks/        # 전역 훅 (useMediaQuery, usePrefersReducedMotion, useInViewOnce 등)
├── routes/       # 라우터, 스크롤 복원
├── styles/       # 디자인 토큰, 믹스인, 전역 스타일 (SCSS)
├── three/        # Hero 3D 장면 (lazy)
└── views/        # 페이지 단위 View (Home, ProjectDetail, common)
```
