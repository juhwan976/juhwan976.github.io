# AGENTS.md

이 문서는 프로젝트의 전체 설계 철학, 구조, 개발 규칙, 그리고 AI 에이전트가 반드시 따라야 할 기준을 포함하는 **통합 가이드 문서**입니다.

---

## 1. 프로젝트 개요

이 프로젝트는 React + TypeScript 기반의 웹 애플리케이션입니다.

그러나 전체 아키텍처는 특정 언어나 프레임워크에 종속되지 않도록 설계되었습니다.

핵심 데이터 흐름은 다음과 같습니다.

```text
API Response (응답 객체)
        ↓
Entity (Domain Model)
        ↓
ViewModel (Presentation Model)
        ↓
Component (Render Layer)
```

### 설계 목표

- 도메인과 표현 계층의 완전한 분리
- 유지보수성과 확장성 확보
- 예측 가능한 데이터 흐름
- 강한 타입 안정성 유지
- 성능을 고려한 렌더링 구조

---

## 2. 기술 스택

- React (최신 안정 버전)
- TypeScript (strict mode)
- Vite
- Redux Toolkit
- React Router DOM
- Styled Components
- Axios
- Zod
- ESLint + Prettier
- Yarn

※ 명시되지 않은 라이브러리는 추가하지 않습니다.

---

## 3. 프로젝트 구조

```text
src/
├── api/                # API 레이어
├── assets/             # 에셋
├── components/         # 전역 컴포넌트
├── constants/          # 전역 상수
├── entities/           # Entity (Domain Model)
├── handlers/           # 전역 핸들러
├── hooks/              # 전역 훅
├── routes/             # 라우트
├── services/           # 서비스 레이어
├── styles/             # 전역 스타일
├── types/              # 공통 타입 정의
├── utils/              # 유틸리티
├── view_models/        # ViewModel (Presentation Model)
└── views/              # 페이지 단위 View
```

위 항목은 **필요 시에만 생성**합니다. 현재 프로젝트에서 사용하지 않는 디렉터리는 만들지 않아도 됩니다.

### 로컬 구성 원칙

특정 View에서만 사용되는 컴포넌트/훅/핸들러는 해당 View 내부에 로컬 선언합니다.

---

## 4. 아키텍처 규칙 (Strict)

### 4-1. 데이터 흐름 규칙

1. API 응답은 반드시 Entity로 변환하여 사용합니다.
2. View에서는 API 응답 객체를 직접 사용하지 않습니다.
3. View 컴포넌트는 ViewModel에만 의존합니다.
4. API 호출과 Entity → ViewModel 변환은 Controller 훅에서 처리합니다.

### 4-2. 의존성 방향 규칙

허용되는 방향:

- View 컴포넌트 → ViewModel, Controller 훅
- Controller 훅 → API 훅 (`@/api` barrel), ViewModel, Entity
- ViewModel → Entity
- API → Entity
- Entity → (프로젝트 레이어에 의존하지 않음)

역방향 의존성은 절대 금지합니다.

### 4-3. Controller 훅

- 페이지 단위 로직을 담당하는 훅입니다.
- 해당 View 내부에 로컬로 선언합니다.
- API 훅 호출, 상태 관리, Entity → ViewModel 변환을 수행합니다.
- View 컴포넌트에는 ViewModel과 콜백만 전달합니다.
- 현재 프로젝트에서는 API 호출을 Controller 훅에서 처리합니다. (복잡한 유스케이스/공유 비동기 로직이 증가하면 서비스 레이어로 분리할 수 있습니다.)
- 서비스 분리 기준은 `.cursor/rules/service_boundary.mdc`를 따릅니다.
- 비즈니스 결과에 따른 분기(상태 전이/후속 이동)는 Controller 훅에서 처리하고, 단순 UI 네비게이션(예: 뒤로가기)은 View에서 처리할 수 있습니다.
- 비동기 콜백은 `try/catch/finally` 패턴을 사용하고, 종료 시 로딩 상태 원복을 보장합니다.
- 초기 조회/사용자 액션 로딩 분리가 필요하면 `loadState`를 사용하며, 공통 타입/상수는 `src/types/load_state.ts`를 재사용합니다.
- 초기 로딩/재시도 처리에서 `setTimeout`/`setInterval` 우회 패턴은 사용하지 않습니다.

### 4-4. 인증/세션 원칙

- 인증 상태는 단일 원천으로 관리하고, Guard는 해당 상태만 참조합니다.
- 세션 만료 판정 및 로그아웃 정리는 공통 auth 흐름에서 처리합니다.
- 상세 기준은 `.cursor/rules/auth_session.mdc`, Guard 연동은 `.cursor/rules/guard.mdc`를 따릅니다.

### 4-5. 계층별 책임

#### Entity

- API 응답의 모든 필드를 보존합니다.
- UI 로직을 포함하지 않습니다.
- 도메인 모델의 순수 표현입니다.

#### ViewModel

- UI에 필요한 형태로 데이터를 가공합니다.
- 네트워크 로직을 포함하지 않습니다.
- readonly 속성을 원칙으로 합니다.

#### Component

- ViewModel만 의존합니다.
- 가능한 한 Pure하게 유지합니다.
- 렌더링에 집중합니다.

### 4-6. 전체 흐름 예시 (Generic Resource)

한 건의 데이터가 API부터 화면까지 어떻게 흐르는지 요약합니다.

**1. API → Entity** (`src/api/{domain}/{Domain}Api.ts`, `src/entities/{Domain}Entity.ts`)

- API가 응답 객체를 반환하면, 호출부에서 `{Domain}Entity.fromJson(response.data)`로 Entity로 변환합니다.

**2. Controller 훅** (`src/views/{PageName}/hooks/use{PageName}Controller.ts`)

- `use{Domain}Api()`로 API를 가져와 목록 메서드(`getList` 등) 호출.
- `result.data.map(create{Domain}ViewModel)`로 Entity 배열을 ViewModel 배열로 변환.
- `loadState`(또는 `isLoading`)와 `errorMessage` 등 상태는 이 훅에서 보관.
- View에는 `{ items, isInitialLoading, isActionLoading, errorMessage, onRetry }` 형태로 전달할 수 있습니다.

**3. View** (`src/views/{PageName}/{PageName}.tsx`)

- `const { items, isInitialLoading, errorMessage, onRetry } = use{PageName}Controller();`
- 로딩/에러면 스피너·에러 메시지, 성공이면 `items`를 리스트 컴포넌트에 전달.

**4. 도메인 컴포넌트** (`src/components/{Domain}Item/` 또는 View 내부)

- 리스트의 한 항목: `model={item}` (ViewModel), `onAction={onAction}` 등 콜백은 별도 prop.
- 컴포넌트는 `model`의 표현 필드만 사용한다.

```text
getList() → 응답 데이터 → Entity.fromJson() → Entity[]
       → create{Domain}ViewModel() → ViewModel[]
       → use{PageName}Controller() 반환 { items, isInitialLoading, onRetry }
       → View가 {Domain}Item에 model={item} 전달
```

### 4-7. 에러/로딩 상태 원칙

- API는 `BaseResult`(`success`, `message`)를 반환합니다.
- Controller 훅은 `errorMessage`를 표준 상태로 관리하고 View에 전달합니다.
- 로딩 상태는 기본 `isLoading` 또는 승격된 `loadState`(`initialLoading`, `actionLoading`, `idle`)를 사용합니다.
- View는 Controller가 전달한 상태만으로 로딩/에러/정상 렌더링을 분기합니다.

### 4-8. 프로파일 기준 (S/M/L)

- 기본 시작 프로파일은 `M`이다.
- `S (Simple)`: 단일 화면의 단순 CRUD이며, 재사용/정책성 로직 요구가 없을 때 허용한다. Entity는 유지하고 ViewModel은 가공 필요 시에만 생성한다.
- `M (Default)`: Entity + ViewModel + Controller 기본 구조를 사용한다. API는 표준 파일 구조(Provider/Hook 포함)를 유지한다.
- `L (Complex)`: 재시도/캐시/동시성/취소/오케스트레이션 등 정책성 비동기 로직이 필요한 경우 Service/UseCase로 분리한다.
- 승격 규칙: 재사용 2곳 이상, 정책성 로직 필요, 비동기 단계 3단계 이상 중 하나라도 만족하면 `M/L`로 승격한다.
- `S`로 시작한 구현이 승격 조건을 만족하면 `M` 또는 `L`로 반드시 승격한다.
- 다운그레이드(`L→M`, `M→S`)는 복잡도 감소 근거가 있을 때 허용한다.

### 4-9. 변경 체크리스트 (S/M/L)

- [ ] 이번 변경의 프로파일(`S/M/L`)을 선택했고, 근거를 **재사용 N곳 / 정책성 로직 유무 / 비동기 단계 수**로 기록한다.
- [ ] 승격 조건(재사용 2곳+, 정책성 로직 필요(재시도/캐시/동시성 포함), 비동기 단계 3단계 이상) 충족 시 `M/L`로 반영한다.
- [ ] 다운그레이드 시 삭제된 복잡도(정책 제거/재사용 감소/비동기 단순화) 근거를 함께 기록한다.
- [ ] View는 API/Entity에 직접 의존하지 않고 Controller 경계를 지킨다.
- [ ] ViewModel은 네트워크/스토어에 의존하지 않고 표현 모델 역할만 유지한다.
- [ ] 로딩/에러 상태 모델(`isLoading` 또는 `loadState`)을 규칙에 맞게 적용한다.
- [ ] 테스트 범위를 프로파일 수준에 맞게 반영한다. (`S`: 핵심 흐름, `M`: 경계+상태 전이, `L`: 정책/오케스트레이션 포함)

---

## 5. 상태 관리 규칙 (Redux)

- Redux에는 ViewModel 또는 UI 상태만 저장합니다.
- 인증 상태(AuthState)는 예외적으로 Redux 전역 상태로 관리할 수 있습니다. (4-4 참고)
- 앱 전역 상태값(예: 사용자/권한, 다크모드, locale, 전역 feature flag)은 Redux에 저장할 수 있습니다.
- 2개 이상 화면에서 공유되거나 라우트 전환 후 유지가 필요한 값만 Redux에 올리고, 단일 화면 임시 상태는 로컬 state를 우선합니다.
- id 기반 컬렉션(목록/상세 캐시)은 `createEntityAdapter` 사용을 기본으로 합니다.
- Redux 내부 상태(state/action payload)는 serializable plain object로 유지하고(camelCase 권장), 경계(Controller/selector)에서만 ViewModel class <-> plain 변환을 수행합니다.
- 변환 어댑터는 slice 기준으로 파일 위치를 고정하고(`adapters.ts`), Redux serializable check 미들웨어를 기본 유지합니다.
- 목록 반영 기본 전략은 `setAll`이며 정렬은 서버 순서를 기본으로 유지합니다.
- 상세 조회는 `selectById` 캐시를 우선 사용하고, 캐시 miss일 때만 API를 호출합니다.
- `createEntityAdapter`를 사용해도 API 호출 책임은 Controller(또는 Service)에 유지합니다.
- Domain 로직을 Redux에 넣지 않습니다.
- 비동기 로직은 기본적으로 Controller 훅(또는 thunk)에서 처리합니다. 서비스 레이어는 복잡한 유스케이스가 생길 때 분리합니다.
- Slice 내부에 복잡한 비즈니스 로직을 두지 않습니다.
- 페이지 단위 로직은 Controller 훅으로 분리합니다. (4-3 참고)

---

## 6. TypeScript 규칙

- any 타입 사용 금지
- 암시적 any 금지
- 불필요한 타입 단언(as Type) 금지
- export 되는 함수는 명시적 반환 타입 작성
- 타입 안전성을 우회하여 컴파일 오류를 해결하지 않음

### Enum 권장 패턴

```typescript
export const NotificationTypes = {
  ANNOUNCEMENT: 'announcement',
  QNA: 'qna',
} as const;

export type NotificationType =
  (typeof NotificationTypes)[keyof typeof NotificationTypes];
```

---

## 7. API 설계 규칙

### 7-1. 구조 원칙

- 모든 API는 `src/api/{도메인명}/` 하위에 생성합니다.
- 모든 API는 `IApi`(`src/api/IApi.ts`)를 상속받습니다.
- API 스캐폴딩은 `yarn g:api`(hygen)를 기본으로 사용합니다.
- 새로운 API 생성 시 반드시 7개 파일을 함께 생성합니다.
  - `I{API이름}Api.ts` (추상 클래스)
  - `I{API이름}.ts` (Params/Result 인터페이스)
  - `{API이름}Api.ts` (실제 구현)
  - `Fake{API이름}Api.ts` (Mock 구현)
  - `{API이름}ApiContext.ts` (Context 객체)
  - `{API이름}ApiProvider.tsx` (Provider 컴포넌트)
  - `use{API이름}Api.ts` (접근 훅)
- 생성 직후 파일은 메서드 없는 빈 스캐폴드(주석 예시 포함)로 시작하고, 실제 메서드는 요구사항 확정 후 추가합니다.
- 생성 시 `src/api/index.ts`(barrel)와 `src/api/ApiProvider.tsx`에는 자동으로 등록합니다.

### 7-2. 핵심 규칙

- API 응답은 반드시 `Entity.fromJson()`을 통해 Entity로 변환합니다.
- 모든 Result는 `BaseResult`를 기반으로 합니다.
- Fake API는 Real API와 동일한 반환 구조를 가집니다.

### 7-3. Provider 패턴

- Context 기반 Provider로 API를 주입합니다.
- Fake/Real 전환은 설정 값(`API_CONFIG.USE_FAKE`)으로 제어합니다.
- View에서 API 내부 파일을 직접 import 하지 않습니다. `@/api` barrel을 통한 훅 접근만 허용합니다.
- Context, Provider, Hook은 각각 별도 파일로 분리합니다. (Fast Refresh 대응)

---

## 8. 컴포넌트 설계 규칙

### 8-1. 데이터 전달 원칙

- **도메인/비즈니스 컴포넌트**(ResourceItem, ProductCard 등): 한 도메인 개념의 여러 필드를 다루므로 `model`이라는 이름의 ViewModel 객체로 전달합니다. 콜백은 별도 prop으로 전달합니다.
- **프레젠테이션 원시 컴포넌트**(Title, TextField, Label, Badge 등): 도메인 무관한 범용 UI는 `title`, `content`, `placeholder` 등 개별 props로 전달합니다.

### 8-2. ViewModel 설계 원칙

- BaseViewModel을 상속받습니다.
- 속성은 readonly를 기본으로 합니다.
- 수정이 필요한 경우 private + getter/setter 사용

### 8-3. StyledComponent 규칙

- 상태에 따른 스타일 변경은 transient props(`$` prefix)로 전달합니다.
- `$` prefix가 붙은 props는 DOM으로 전달되지 않고 스타일 계산에만 사용됩니다.
- 특정 페이지의 `.styles.ts`는 View에서 개별 named import를 길게 나열하지 않습니다.
- `.styles.ts`에서 `const S = { ... } as const`로 묶어 `default export` 하고, View에서는 `import S from './{PageName}.styles'` 후 `S.ComponentName` 형태로 사용합니다.
- 기존 호환이 필요하면 named export를 유지할 수 있지만, 신규/수정 코드는 `S` 네임스페이스 패턴을 우선합니다.

### 8-4. 성능 규칙

- 불필요한 재렌더링 방지
- useMemo / useCallback 적절히 사용
- JSX 내부에서 불필요한 객체/함수 생성 지양
- 이미지에 loading="lazy" 사용 권장

---

## 9. 전역 테마

Styled Components 기반 theme.ts를 사용합니다.

color, font-size, z-index 등은 theme에 정의된 값만 사용합니다.

---

## 10. 최적화 기준

- 상태 변경 시 중복 호출 방지
- 불필요한 상태 제거
- 이벤트 핸들러 내 무거운 동기 로직 지양
- 복잡 UI는 구조 분리 후 최적화

---

## 11. 테스트 원칙

- 테스트는 아키텍처 경계(Entity/Controller/Store/Guard/Route) 중심으로 작성합니다.
- 구현 디테일보다 동작 계약(입력/출력/상태 전이)을 우선 검증합니다.
- 상세 기준은 `.cursor/rules/test_strategy.mdc`를 따릅니다.

---

## 12. AI 에이전트 행동 규칙

AI는 다음을 반드시 준수해야 합니다.

### Do not

- 아키텍처를 임의로 변경하지 말 것
- 계층을 단순화한다는 이유로 제거하지 말 것
- 새로운 라이브러리를 추가하지 말 것
- 기존 패턴을 무시하지 말 것
- TODO 등의 임시 코드를 남기지 말 것
- 타입 안전성을 우회하지 말 것

이 문서는 프로젝트의 구조적 일관성을 유지하기 위한 최상위 규칙입니다.

---

## 끝

"프레임워크 위에 얹힌 앱"이 아니라

"구조 위에 얹힌 UI"를 목표로 합니다.
