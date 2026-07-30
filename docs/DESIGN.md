# DESIGN.md · juhwan976 Portfolio

> 다크 단일 테마 위에 오렌지 하나만 태우는, 절제된 인터랙션 포트폴리오.
> 모든 시각 결정의 단일 원천은 `src/styles/theme.ts`다. 이 문서는 그 값과 규칙을 사람이 읽을 수 있게 정리한 것이다.

---

## 1. Design Philosophy

1. **다크 단일 테마.** 페이지 어디에서도 테마가 반전되지 않는다. 밝은 섹션을 끼워 넣지 않는다.
2. **액센트는 오렌지 하나.** `#ff5c1f`만 강조에 쓴다. 두 번째 강조색은 존재하지 않는다.
3. **구분은 선보다 여백.** 섹션·항목의 경계는 헤어라인 대신 간격으로 만든다. 헤어라인은 페이지 프레임(헤더·페이저)과 짧은 데이터 목록에만 남긴다.
4. **대담함은 한 곳에만.** 화면마다 강조 요소는 하나다(히어로의 유체 배경, 상세의 Key Challenge 패널). 나머지는 조용하게 유지한다.
5. **라벨은 모노 언어.** 내비게이션·섹션 라벨·수치·기간은 JetBrains Mono + 대문자 + 넓은 자간으로 통일한다.
6. **인터랙션은 정체성이다.** 마우스에 반응하는 배경, 클릭 스파크, 마스크 리빌은 장식이 아니라 "인터랙션에 관심 있는 개발자"라는 주장의 증거다. 단, 모든 모션은 `prefers-reduced-motion`을 존중한다.

---

## 2. Color

토큰 외의 색은 사용하지 않는다. (`theme.colors`)

### Background

| 토큰        | 값        | 용도                                     |
| ----------- | --------- | ---------------------------------------- |
| `bg`        | `#0e0f11` | 페이지 기본 배경                         |
| `panel`     | `#15171a` | 승격된 패널 (Key Challenge, 이니셜 박스) |
| `media`     | `#1a1d21` | 미디어 프레임·다이어그램 배경            |
| `watermark` | `#1b1d21` | Contact 거대 워터마크 타이포             |

배경 3단계(`bg` → `panel` → `media`)가 깊이를 만든다. 순수 검정(`#000`)은 쓰지 않는다.

### Text

| 토큰        | 값        | 용도                   |
| ----------- | --------- | ---------------------- |
| `text`      | `#eceae5` | 제목, 강조 본문        |
| `textDim`   | `#9aa0a8` | 일반 본문, 보조 텍스트 |
| `textFaint` | `#686d74` | 라벨, 캡션, 각주       |

순수 흰색(`#fff`)은 쓰지 않는다. 위계는 크기보다 이 3단계 명도로 먼저 만든다.

### Line

| 토큰         | 값        | 용도                           |
| ------------ | --------- | ------------------------------ |
| `line`       | `#26292e` | 기본 보더·구분선               |
| `lineStrong` | `#3a3e45` | 강조 보더 (다이어그램 스텝 등) |

### Accent

| 토큰         | 값                     | 용도                                       |
| ------------ | ---------------------- | ------------------------------------------ |
| `accent`     | `#ff5c1f`              | 링크, 불릿, 콜아웃 보더, 현재 상태, 스파크 |
| `accentSoft` | `rgba(255,92,31,0.12)` | 콜아웃·현재 역할 배경                      |
| `accentTint` | `rgba(255,92,31,0.05)` | 섹션 배경 톤 전환 (가장 연함)              |

오렌지 사용처: 활성/현재 상태, 핵심 수치, 링크·CTA, 인터랙션 피드백. 넓은 면적을 채우는 용도로 쓰지 않는다.

---

## 3. Typography

### 서체

| 역할      | 스택                                                                                    |
| --------- | --------------------------------------------------------------------------------------- |
| 본문      | `Pretendard Variable` → Pretendard → -apple-system → Apple SD Gothic Neo → sans-serif   |
| 라벨·수치 | `JetBrains Mono Variable` → JetBrains Mono → SF Mono → ui-monospace → Menlo → monospace |

두 서체 모두 웹폰트로 제공되어 OS와 무관하게 동일하게 렌더링된다.
`<img>`로 로드되는 SVG 다이어그램에는 사용 글리프만 서브셋해 base64로 임베드한다.

### 크기 스케일 (`theme.fontSizes`)

| 토큰        | 값                               | 용도                        |
| ----------- | -------------------------------- | --------------------------- |
| `display`   | `clamp(2.5rem, 5.2vw, 4.375rem)` | 홈 Hero 헤드라인            |
| `h1`        | `clamp(2.1rem, 3.8vw, 3.2rem)`   | 상세 페이지 제목            |
| `h2`        | `clamp(1.75rem, 3vw, 2.625rem)`  | 섹션 대제목, 상세 블록 제목 |
| `h3`        | `clamp(1.25rem, 1.9vw, 1.75rem)` | 프로젝트명, 스탯 수치       |
| `bodyLg`    | `1.0625rem`                      | 강조 본문, 콜아웃           |
| `body`      | `0.9375rem`                      | 일반 본문                   |
| `small`     | `0.8125rem`                      | 보조 정보, 칩               |
| `tiny`      | `0.75rem`                        | 캡션, 각주, 기간            |
| `label`     | `0.6875rem`                      | 소형 대문자 라벨            |
| `watermark` | `clamp(4rem, 13vw, 13rem)`       | Contact 워터마크            |

위계 규칙: `display > h1 > h2 > h3`. 한 페이지에서 인접한 두 단계가 같은 크기로 보이면 안 된다.

### 라벨 스펙 (SectionLabel 계열)

```css
font-family: mono / font-size: label / font-weight: 600
letter-spacing: 0.22em / text-transform: uppercase / color: textFaint
```

본문은 `line-height: 1.75~1.85`, `word-break: keep-all`. 제목의 자간은 `-0.015em`.

---

## 4. Spacing & Layout

### 간격 스케일 (`theme.spacing`)

| 토큰 | 값   | 토큰       | 값                          |
| ---- | ---- | ---------- | --------------------------- |
| `xs` | 8px  | `xl`       | 40px                        |
| `sm` | 12px | `xxl`      | 64px                        |
| `md` | 16px | `sectionY` | `clamp(104px, 14vh, 176px)` |
| `lg` | 24px | `gutter`   | `clamp(24px, 6vw, 120px)`   |

### 레이아웃 (`theme.layout`)

| 토큰           | 값     | 용도                |
| -------------- | ------ | ------------------- |
| `maxWidth`     | 1728px | 전체 컨테이너       |
| `proseWidth`   | 620px  | 읽는 텍스트 최대 폭 |
| `headerHeight` | 64px   | 고정 헤더           |

### 핵심 레이아웃 패턴

- **홈 섹션**: 좌측 여백에 SectionLabel, 본문은 `maxWidth` 안에서 좌측 정렬. 히어로는 중앙 정렬하지 않는다.
- **Work 밴드**: 텍스트 5fr + 미디어 7fr 그리드. 밴드마다 좌우를 교차해 지그재그 리듬을 만든다. 모바일은 미디어 우선의 단일 컬럼.
- **상세 본문**: `220px 사이드 레이블 + 620px 콘텐츠` 2컬럼. 레이블은 sticky로 현재 섹션을 알린다. 블록 간격은 `clamp(88px, 11vh, 128px)`.
- **브레이크포인트**: mobile < 768px, tablet < 1024px. 고변형 레이아웃은 모바일에서 단일 컬럼으로 접는다.

### z-index (`theme.zIndexes`)

`normal(0) → backdrop(1) → content(2) → header(3) → skip(4) → overlay(5)` — 임의 숫자 사용 금지.

---

## 5. Shape & Material

- **모서리는 직각.** 카드·패널·프레임·칩 모두 `border-radius: 0`. 예외는 회사 로고 박스(10px)와 스플래시 마크뿐이다.
- **재질 2종을 구분한다.**
  - _패널_ (`panel` + `line` 보더): 콘텐츠의 승격. Key Challenge 블록 하나에만 허용.
  - _프레임_ (`media` + `line` 보더): 미디어·다이어그램을 담는 액자. MediaPanel, DiagramView.
- **그림자는 쓰지 않는다.** 깊이는 배경 3단계와 보더로 만든다.
- **블러는 오버레이 전용.** 고정 헤더(`blur(12px)`)와 이미지 뷰어 배경(`blur(8px)`)에만 쓴다. 배경색은 `color-mix(in srgb, bg N%, transparent)` 패턴.

---

## 6. Iconography & Glyphs

아이콘 라이브러리를 쓰지 않는다. 두 가지 언어만 존재한다.

| 종류          | 형태            | 용도                                                                      |
| ------------- | --------------- | ------------------------------------------------------------------------- |
| 텍스트 글리프 | `←` `→` `↗` `↓` | 링크 방향 표시 (`← Back`, `View Case Study →`, 외부 링크 `↗`, 스크롤 `↓`) |
| CSS 바        | 18×2px 바 2~3개 | 햄버거 메뉴, 닫기(X) — 45° 교차                                           |

- 외부로 나가는 링크는 항상 `↗`를 붙인다.
- 확대 가능한 이미지는 `cursor: zoom-in`, 뷰어 배경은 `cursor: zoom-out`.

---

## 7. Motion

모션은 "의미(위계·피드백·전환)"가 있을 때만 쓴다. 장식용 무한 루프는 두지 않는다.

| 모션               | 스펙                                                                                             |
| ------------------ | ------------------------------------------------------------------------------------------------ |
| 미디어 마스크 리빌 | `clip-path inset` 좌→우, `0.9s cubic-bezier(0.65, 0, 0.35, 1)`, viewport 진입 시 1회             |
| 리빌 내부 이미지   | `scale(1.05→1)`, `1.1s` 동일 이징                                                                |
| 첫 진입 스플래시   | 마크가 아래→위로 채워짐. 실제 로딩 신호(폰트·load·셰이더 첫 프레임) 대기, 완료 후 `0.45s` 페이드 |
| 상세 페이지 진입   | `0.4s` 페이드                                                                                    |
| 이미지 뷰어        | 오버레이 `0.2s` 페이드 + 콘텐츠 `0.25s cubic-bezier(0.16, 1, 0.3, 1)` 스케일(0.97→1)             |
| 색·투명도 전환     | `0.2s ease`                                                                                      |
| 클릭 스파크        | 8방향, 400ms, ease-out                                                                           |
| Hero 유체 배경     | WebGL 셰이더. 화면 밖·탭 숨김 시 정지, dpr ≤ 1.5                                                 |
| 스무스 스크롤      | Lenis + GSAP ticker. 라우트 전환 시 관성 정지 후 즉시 점프                                       |

**전역 규칙**: `prefers-reduced-motion: reduce`에서 모든 애니메이션·전환이 즉시 완료되거나 비활성화된다. 스크롤은 rAF 루프에서 React state를 만지지 않는다.

---

## 8. Components

| 컴포넌트                                                    | 위치                        | 역할·스펙 요점                                                           |
| ----------------------------------------------------------- | --------------------------- | ------------------------------------------------------------------------ |
| `Header`                                                    | `components/Header`         | 고정 64px, 블러 배경. 모바일은 햄버거 드롭다운(바깥 터치·Escape 닫기)    |
| `MediaPanel`                                                | `components/MediaPanel`     | 미디어 프레임 + 마스크 리빌 + placeholder 패널. `zoomable`이면 클릭 확대 |
| `MediaViewer`                                               | `components/MediaPanel`     | 이미지 확대 모달. 포커스 트랩, Escape·배경 클릭 닫기, 스크롤 잠금        |
| `LoadingOverlay`                                            | `components/LoadingOverlay` | 첫 진입 스플래시. `role="progressbar"`                                   |
| `ClickSpark`                                                | `components/ClickSpark`     | 전역 클릭 스파크 캔버스 (뷰포트 고정, dpr 보정)                          |
| `FerrofluidBackdrop`                                        | `components/Backdrop`       | Hero WebGL 유체 배경 + 텍스트 가독성 스크림                              |
| `SectionShell / SectionLabel / Prose / ThinLink / HairLine` | `components/ui/primitives`  | 섹션 골격·라벨·본문 컬럼·밑줄 링크·구분선 프리미티브                     |
| `DetailBlock`                                               | `views/ProjectDetail`       | 사이드 sticky 레이블 + 본문. `featured`면 패널 승격                      |
| `DiagramView`                                               | `views/ProjectDetail`       | 데이터 기반 플로우/스플릿 다이어그램. 진입 시 순차 표시                  |
| `StatGrid(StatTable)`                                       | `views/ProjectDetail`       | 헤어라인 없는 2컬럼 스탯 — 라벨 위, 수치 아래                            |
| `ChipList`                                                  | `views/ProjectDetail`       | 긴 나열을 대신하는 보더 칩                                               |
| `ResultCallout`                                             | `views/ProjectDetail`       | 좌측 오렌지 보더 + `accentSoft` 배경의 결과 강조                         |

---

## 9. Voice & Writing

- **선언형, 존댓말.** "~합니다."로 끝나는 짧은 문장. 감성적인 마무리 문장은 넣지 않는다.
- **수치는 근거와 함께.** 측정 기준이 불명확하면 "약", "(스토어 측정 기준)" 표기를 유지한다. 임의의 수치를 만들지 않는다.
- **같은 정보는 한 번만.** 수치 테이블과 정리 불릿, About과 Career처럼 역할이 겹치는 자리에서 내용을 반복하지 않는다.
- **구두점 규칙**: em-dash(`—`)·en-dash(`–`) 금지. 구분은 하이픈(`-`) 또는 가운뎃점(`·`). 가운뎃점은 한 줄에 하나의 묶음까지만.
- 라벨·버튼은 기능을 그대로 말한다("View Case Study", "뷰어 닫기"). 시적인 라벨을 만들지 않는다.

---

## 10. Do / Don't

**Do**

- 색·크기·간격·z-index가 필요하면 먼저 `theme.ts`에서 찾는다. 없으면 토큰을 추가한 뒤 쓴다.
- 새 화면의 구분감은 여백과 배경 3단계로 만든다.
- 외부 링크에 `↗`, 확대 가능한 대상에 zoom 커서를 붙인다.
- 새 모션에는 반드시 reduced-motion 폴백을 함께 만든다.
- 이미지 에셋은 WebP(사진)·SVG(다이어그램, 폰트 임베드)로 넣는다.

**Don't**

- 하드코딩된 hex, px 간격, 임의 z-index.
- 두 번째 액센트 색, 밝은 배경 섹션, 순수 흑/백.
- border-radius, box-shadow, 아이콘 라이브러리.
- 모든 행에 헤어라인을 까는 목록, 섹션마다 붙는 아이브로우.
- em-dash, 장식용 라벨, 근거 없는 수치.

---

## 11. Code Conventions

- 스타일은 `{Name}.styles.ts`에 두고 `const S = { ... } as const`로 묶어 default export, 사용처에서 `S.ComponentName`.
- 상태 기반 스타일은 transient props(`$open`, `$featured`)로 전달한다.
- 문구·수치·에셋 경로는 컴포넌트가 아니라 `src/content/` 데이터 파일에서 관리한다.
- 미확정 값은 `*_PLACEHOLDER`로 두고, UI는 placeholder를 감지해 숨기거나 대체 렌더링한다.

---

_마지막 갱신: 2026-07-30. 토큰 값이 `src/styles/theme.ts`와 어긋나면 코드가 우선이다._
