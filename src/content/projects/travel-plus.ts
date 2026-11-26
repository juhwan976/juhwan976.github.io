import {
  MediaKinds,
  ProjectLinkKinds,
  type ProjectContent,
} from "@/content/types";

export const travelPlus: ProjectContent = {
  slug: "travel-plus",
  number: "04",
  name: "LG Travel+",
  title: "webOS TV 지도 로딩을 약 10초로 단축",
  summary:
    "LG webOS TV에서 지도와 여행지 정보를 살펴보고 여행 상품을 탐색하는 앱",
  period: "2025.07 ~ 2026.01",
  team: "4인 개발",
  roleLine: "4인 팀을 이끌며 프론트엔드 리뉴얼과 성능 개선을 주도하고, 백엔드를 인수해 완성했습니다.",
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
    "일부 TV에서는 화면을 불러오는 데 시간이 오래 걸려 사용과 QA가 어려웠습니다.",
    "기존 코드의 여러 기능이 서로 밀접하게 연결돼 있어 한 곳을 수정하면 다른 화면에 오류가 생겼습니다.",
    "기존 기능 범위를 유지하면서 TV 성능에 맞게 화면을 재구성하고, 남은 백엔드 API를 완성해야 했습니다.",
  ],
  highlights: [
    {
      label: "webOS TV 지도 로딩 시간",
      value: "약 3분 → 약 10초",
      note: "WebGL 지도를 Mapbox 정적 이미지로 바꾼 뒤 개발 환경에서 측정했습니다.",
    },
    {
      label: "리뉴얼 개발 기간",
      value: "약 1개월",
      note: "기존 버전에서 약 3개월 동안 개발한 기능 범위를 약 1개월에 구현했습니다.",
    },
    { label: "LG 내부 QA", value: "핵심 화면 검증이 가능한 상태로 개선" },
  ],
  challenges: [
    {
      id: "performance",
      label: "Key Challenge",
      title: "WebGL 지도를 정적 이미지로 전환",
      problem: [
        "도시 상세 화면에서 지도가 뜰 때까지 오래 기다려야 했습니다.",
      ],
      approach: [
        "TV에서 WebGL로 지도를 그리던 화면에 Mapbox 정적 지도 이미지를 표시하도록 바꿨습니다.",
      ],
      results: ["개발 당시 측정값 기준으로 지도 로딩을 약 3분에서 약 10초로 줄였습니다."],
    },
    {
      id: "design-constraints",
      label: "Challenge 2",
      title: "디자인과 하드웨어 제약 조율",
      problem: [
        "일부 디자인 요소를 그대로 구현하면 저사양 TV에서 조작이 느려졌습니다.",
      ],
      approach: [
        "성능이 떨어지는 이유를 설명하고, 디자인 의도를 살릴 수 있는 대안을 제시했습니다.",
      ],
      results: ["기획 및 디자인 팀과 합의한 화면 구성을 적용했습니다."],
    },
  ],
  decisions: [
    {
      id: "focus-system",
      label: "Key Decision",
      title: "포커스 시스템 재구성",
      body: [
        "TV 리모컨으로 이동할 때 화면의 포커스를 관리하는 방식을 Enact 기반으로 바꿨습니다.",
        "webOS의 기본 포커스 동작에 맞게 화면 구조를 재구성했습니다.",
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
          { title: "화면 구조 변경", detail: "리모컨 이동 규칙 정리" },
        ],
      },
    },
    {
      id: "scss",
      label: "Decision 2",
      title: "성능 병목 컴포넌트에 SCSS 적용",
      body: [
        "느린 컴포넌트의 스타일을 SCSS로 옮겨 화면을 표시할 때 스타일을 생성하는 비용을 줄였습니다.",
      ],
    },
    {
      id: "backend-takeover",
      label: "Decision 3",
      title: "백엔드 인수와 배포 자동화",
      body: [
        "기존 코드의 데이터 흐름을 파악하고 빠진 API부터 구현했습니다.",
        "외부 API 연동과 MySQL 데이터 모델을 완성하고 Jenkins로 빌드와 배포를 자동화했습니다.",
      ],
      diagram: {
        type: "flow",
        title: "Backend Takeover",
        steps: [
          { title: "구조 분석", detail: "기존 코드·데이터 흐름 파악" },
          { title: "빠진 API 정리", detail: "개발 순서 결정" },
          { title: "연동·모델 완성", detail: "외부 API + MySQL 모델" },
          { title: "CI/CD 구축", detail: "Jenkins 배포 자동화" },
        ],
      },
    },
  ],
  // 수치 성과는 highlights(Outcome 스탯)에서 보여주므로 여기서는 반복하지 않는다.
  results: [
    "리뉴얼한 앱을 LG 내부 QA에서 검증할 수 있도록 주요 화면을 안정화했습니다.",
  ],
  // LG Apps(TV 스토어)는 공개 웹 상세 페이지가 없어 LG 공식 서비스 소개로 연결한다.
  links: [
    {
      label: "LG Apps",
      url: "https://kr.lgappstv.com/main/tvapp/detail?appId=1276878&catCode1=&moreYn=N&cateYn=N&orderType=0&headerName=&appRankCode=&sellrUsrNo=",
      kind: ProjectLinkKinds.LG_APPS,
    },
  ],
  reflection: {
    items: [
      {
        title: "스타일 시스템 혼용",
        points: [
          "styled-components와 SCSS를 함께 사용했습니다.",
          "다음에는 저사양 TV에서 먼저 확인한 뒤 스타일 작성 방식을 정하려 합니다.",
        ],
      },
      {
        title: "테스트 환경",
        points: [
          "일정 제약으로 충분한 기기와 조건에서 테스트하지 못했습니다.",
          "다음에는 초기에 검증할 TV 모델과 화면, 네트워크 조건을 정하려 합니다.",
        ],
      },
    ],
  },
  gallery: [
    {
      kind: MediaKinds.IMAGE,
      src: "/images/projects/travel-plus/app-screens.webp",
      alt: "여행지 홈 화면·장소 카드 목록·목적지 탐색 지도를 나열한 실제 서비스 화면",
      caption: "실제 서비스 화면",
    },
    {
      kind: MediaKinds.IMAGE,
      src: "/images/projects/travel-plus/places.webp",
      alt: "여행지 카드 목록 화면 - 도시별 지도와 방문 추천 시기 정보",
      caption: "여행지 카드 탐색",
    },
    {
      kind: MediaKinds.IMAGE,
      src: "/images/projects/travel-plus/destinations.webp",
      alt: "대륙별 목적지 탐색 화면 - 세계 지도 기반 단계형 탐색",
      caption: "대륙별 목적지 탐색",
    },
  ],
  cardMedia: {
    kind: MediaKinds.IMAGE,
    src: "/images/projects/travel-plus/card.webp",
    alt: "Travel+ TV 앱의 여행지 홈 화면과 목적지 탐색 화면",
  },
};
