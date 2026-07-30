import { MediaKinds, type ProjectContent } from "@/content/types";

export const travelPlus: ProjectContent = {
  slug: "travel-plus",
  number: "03",
  name: "LG Travel+",
  title: "3분이 걸리던 TV 앱을\n10초 수준으로 개선하다.",
  summary:
    "LG webOS TV에서 특정 여행지와 관련된 정보를 제공하는 TV 애플리케이션",
  period: "2025.07 ~ 2026.01",
  team: "4인 개발",
  roleLine: "프로젝트 리드 (4인) - 핵심 구조 재구성과 성능 최적화 주도",
  tech: [
    "React",
    "TypeScript",
    "webOS",
    "SCSS",
    "Redux Toolkit",
    "Laravel",
    "Jenkins",
  ],
  users: ["LG webOS TV 사용자"],
  myRole: [
    "요구사항 분석",
    "프론트엔드 아키텍처",
    "상태 관리",
    "공통 컴포넌트 개발",
    "성능 최적화",
    "백엔드 개발",
    "데이터베이스 추가 설계",
    "배포",
    "팀원 관리",
    "일정 관리",
    "고객사 커뮤니케이션",
    "QA 이슈 분석과 수정",
  ],
  background: [
    "성능 문제로 일부 TV에서 정상 이용이 불가능했습니다.",
    "결합도가 높은 코드로 인해 하나의 수정이 다른 오류를 발생시켰습니다.",
    "디자인 요구와 TV 하드웨어 성능 사이의 충돌이 있었습니다.",
    "촉박한 일정 내에 성능이 개선된 리뉴얼 버전 개발이 필요했습니다.",
  ],
  highlights: [
    {
      label: "일부 화면 로딩 시간",
      value: "약 3분 → 약 10초",
      note: "개발 당시 측정",
    },
    {
      label: "리뉴얼 개발 기간",
      value: "약 1개월",
      note: "기존 버전이 약 3개월 동안 구현한 범위 확보",
    },
    { label: "LG 내부 QA", value: "검증 가능한 수준으로 안정화" },
  ],
  challenges: [
    {
      id: "performance",
      label: "Key Challenge",
      title: "고치는 대신,\n다시 세웠다.",
      problem: [
        "기존 버전은 성능 문제로 QA 검증조차 어려웠고,\nTV 하드웨어와 일정 모두 여유가 없었습니다.",
      ],
      approach: [
        "영향이 큰 화면부터 우선순위를 정해 핵심 구조를 재구성했습니다.",
        "런타임 스타일 생성 비용과 포커스 처리 구조를 재검토했습니다.",
      ],
      results: ["Loading\n3 min → 10 sec"],
    },
    {
      id: "design-constraints",
      label: "Challenge 2",
      title: "디자인과 하드웨어 제약 조율",
      problem: [
        "디자인 표현을 그대로 구현하면 저사양 TV에서 성능이 저하됐습니다.",
        "디자인 완성도와 실제 사용 가능성 사이의 충돌이 있었습니다.",
      ],
      approach: [
        "성능 문제가 발생하는 기술적 이유를 설명했습니다.",
        "디자인 의도를 유지하면서 구현 가능한 대안을 여러 개 제시했습니다.",
        "기획 및 디자인 부서와 대안 수준을 합의했습니다.",
      ],
      results: ["사용성과 시각적 완성도를 함께 고려한 결과물을 적용했습니다."],
    },
  ],
  decisions: [
    {
      id: "scss",
      label: "Important Decision 1",
      title: "성능 병목 컴포넌트에 SCSS 적용",
      body: [
        "성능 병목이 큰 컴포넌트에 styled-components 대신 SCSS를 적용했습니다.",
        "런타임 스타일 생성 비용을 줄이는 것이 목적이었습니다.",
      ],
    },
    {
      id: "focus-system",
      label: "Important Decision 2",
      title: "포커스 시스템 재구성",
      body: [
        "기존 TV 포커스 라이브러리를 Enact 기반 방식으로 변경했습니다.",
        "webOS의 기본 포커스 환경과 호환되는 방식을 채택했습니다.",
        "기존 코드를 유지하는 대신 안정성을 위해 핵심 구조를 재구성했습니다.",
      ],
      diagram: {
        type: "flow",
        title: "Focus Architecture 전환",
        steps: [
          { title: "기존 포커스 라이브러리", detail: "성능·호환성 문제" },
          {
            title: "Enact 기반 방식 검토",
            detail: "webOS 기본 포커스 환경과 호환",
          },
          { title: "핵심 구조 재구성", detail: "부분 수정 대신 안정성 우선" },
        ],
      },
    },
  ],
  // 수치 성과는 highlights(Outcome 스탯)에서 보여주므로 여기서는 반복하지 않는다.
  results: [
    "디자인 요구와 TV 하드웨어 제약 사이의 대안을 제시해 합의를 이끌었습니다.",
  ],
  reflection: {
    items: [
      {
        title: "스타일 시스템 혼용",
        points: [
          "styled-components와 SCSS를 함께 사용했습니다.",
          "다시 구현한다면 TV 성능 환경을 고려해 SCSS 중심으로 통일하고 싶습니다.",
        ],
      },
      {
        title: "테스트 환경",
        points: [
          "일정 제약으로 충분한 기기와 조건에서 테스트하지 못했습니다.",
          "다시 진행한다면 초기부터 기기별 성능 테스트 매트릭스를 구성하고 싶습니다.",
        ],
      },
    ],
  },
  gallery: [
    {
      kind: MediaKinds.IMAGE,
      src: "/images/projects/travel-plus/app-screens.png",
      alt: "여행지 홈 화면·장소 카드 목록·목적지 탐색 지도를 나열한 실제 서비스 화면",
      caption: "실제 서비스 화면",
    },
    {
      kind: MediaKinds.IMAGE,
      src: "/images/projects/travel-plus/places.png",
      alt: "여행지 카드 목록 화면 - 도시별 지도와 방문 추천 시기 정보",
      caption: "여행지 카드 탐색",
    },
    {
      kind: MediaKinds.IMAGE,
      src: "/images/projects/travel-plus/destinations.png",
      alt: "대륙별 목적지 탐색 화면 - 세계 지도 기반 단계형 탐색",
      caption: "대륙별 목적지 탐색",
    },
  ],
  cardMedia: {
    kind: MediaKinds.IMAGE,
    src: "/images/projects/travel-plus/card.png",
    alt: "Travel+ TV 앱의 여행지 홈 화면과 목적지 탐색 화면",
  },
};
