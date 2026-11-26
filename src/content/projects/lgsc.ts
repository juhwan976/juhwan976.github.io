import {
  MediaKinds,
  ProjectLinkKinds,
  type ProjectContent,
} from "@/content/types";

export const lgsc: ProjectContent = {
  slug: "lgsc",
  number: "03",
  name: "LGSC",
  title: "오프라인에서도 LG 가전을 진단하는 앱",
  summary:
    "수리기사가 휴대폰을 LG 가전에 연결해 실시간 데이터를 확인하고 제품을 제어하는 앱",
  period: "2023.11 ~ 2025.12",
  team: "4인 개발",
  roleLine: "4인 팀을 이끌며 공통 구조와 냉장고 기능을 개발하고 백엔드도 맡았습니다.",
  tech: [
    "Flutter",
    "Dart",
    "RxDart",
    "Drift",
    "Wi-Fi (SoftAP)",
    "TCP·TLS Socket",
    "Laravel",
    "AWS",
  ],
  users: ["가전제품 수리기사", "제품 소프트웨어 개발자"],
  myRole: [
    "요구사항 분석",
    "프론트엔드 아키텍처",
    "상태 관리",
    "공통 핵심 기능 개발",
    "냉장고 제품군 핵심 기능 개발",
    "백엔드 개발",
    "데이터베이스 설계",
    "배포",
    "팀원 관리",
    "일정 관리",
    "고객사 커뮤니케이션",
  ],
  background: [
    "제품군마다 데이터 형식이 달랐고, 앱을 다시 배포하지 않고도 새 제품군을 추가할 수 있어야 했습니다.",
    "수리 현장에 인터넷이 없어도 제품에 직접 연결해 데이터를 확인하고 제어할 수 있어야 했습니다.",
    "국가와 기능별로 사용 통계를 수집해야 했습니다.",
  ],
  highlights: [
    { label: "MAU", value: "7,000+" },
    { label: "지원 제품군", value: "약 200개" },
    {
      label: "앱 비정상 종료율",
      value: "약 8% → 약 1%",
      note: "AWS Amplify 로그 동기화를 Drift(SQLite) 기반으로 교체한 뒤 스토어 지표에서 확인했습니다.",
    },
    { label: "오프라인 로그 동기화", value: "자체 구현" },
  ],
  challenges: [
    {
      id: "offline-sync",
      label: "Key Challenge",
      title: "오프라인 로그 동기화",
      problem: [
        "AWS Amplify로 로그를 동기화할 때 네트워크가 끊기면 요청이 쌓여 앱이 비정상 종료됐습니다.",
      ],
      approach: [
        "Drift(SQLite)로 로그 동기화를 직접 구현해 연결이 끊겨도 로그를 기기에 저장했습니다.",
        "네트워크가 복구되면 로그를 순서대로 보내고, 전송 결과에 따라 재시도합니다.",
      ],
      results: ["스토어 기준 앱 비정상 종료율을 약 8%에서 약 1%로 낮췄습니다."],
    },
    {
      id: "common-components",
      label: "Challenge 2",
      title: "제품군별 기능을 담는 공통 화면",
      problem: [
        "모든 제품군의 사양이 확정되기 전에 팀이 함께 사용할 화면 구조를 만들어야 했습니다.",
      ],
      approach: [
        "냉장고 제품군 기준으로 공통 구조를 먼저 구현했습니다.",
        "제품군마다 다른 기능을 공통 화면에 추가할 수 있도록 구성했습니다.",
      ],
      results: ["약 200개 제품군을 같은 화면 구조로 지원합니다."],
    },
  ],
  decisions: [
    {
      id: "mptcp",
      label: "Key Decision",
      title: "MPTCP 검증과 iOS 적용",
      body: [
        "Android와 iOS에서 MPTCP 지원 여부를 확인하고, iOS에서는 URLSession 옵션으로 적용했습니다.",
      ],
    },
    {
      id: "parsing-db",
      label: "Decision 2",
      title: "제품군별 데이터 해석 규칙",
      body: [
        "사업부와 제품군마다 다른 데이터 해석 규칙을 저장하고 배포할 수 있도록 데이터베이스를 설계했습니다.",
      ],
      diagram: {
        type: "flow",
        title: "Manage Parsing Rules",
        steps: [
          { title: "해석 규칙 업로드", detail: "엑셀로 관리" },
          {
            title: "앱 로컬 저장소 업데이트",
            detail: "바뀐 규칙만 다운로드",
          },
          { title: "새 규칙 적용", detail: "제품 데이터 해석" },
        ],
      },
    },
  ],
  // 수치 성과는 highlights(Outcome 스탯)에서 보여주므로 여기서는 반복하지 않는다.
  results: ["앱과 관리자 도구를 출시했고, 2025년 7월부터 유지보수에 대응했습니다."],
  links: [
    {
      label: "Google Play",
      url: "https://play.google.com/store/apps/details?id=com.lge.smartcheck&hl=ko",
      kind: ProjectLinkKinds.GOOGLE_PLAY,
    },
  ],
  reflection: {
    items: [
      {
        title: "상태 관리",
        points: [
          "RxDart Stream으로 상태를 관리했습니다.",
          "다음에는 팀이 상태 흐름을 이해하고 수정하기 쉽도록 Riverpod도 검토하려 합니다.",
        ],
      },
      {
        title: "공통 통신 로직",
        points: [
          "모바일 앱을 만든 뒤 웹에서도 통신 로직을 써야 했습니다.",
          "다시 설계한다면 여러 환경에서 쓸 수 있도록 통신 로직을 별도 라이브러리로 분리하려 합니다.",
        ],
      },
      {
        title: "테스트 문화",
        points: [
          "이 프로젝트는 자동화 테스트 없이 운영했습니다.",
          "이 경험을 바탕으로 다니몽과 물류 시뮬레이터에는 자동화 테스트를 도입했습니다.",
        ],
      },
    ],
  },
  gallery: [
    {
      kind: MediaKinds.IMAGE,
      src: "/images/projects/lgsc/app-screens.webp",
      alt: "제품 연결·기능 대시보드·실시간 모니터링·단품 제어 화면을 나열한 실제 앱 화면",
      caption: "실제 화면 (일부 데이터 블러 처리)",
    },
    {
      kind: MediaKinds.IMAGE,
      src: "/images/projects/lgsc/connect-control.webp",
      alt: "Wi-Fi 기반 제품 연결 화면과 원격 단품 제어 화면",
      caption: "제품 연결 · 원격 단품 제어",
    },
    {
      kind: MediaKinds.IMAGE,
      src: "/images/projects/lgsc/monitoring-history.webp",
      alt: "실시간 모니터링 화면과 사용 이력 데이터 조회 화면",
      caption: "실시간 모니터링 · 사용 이력 데이터 조회",
    },
    {
      kind: MediaKinds.IMAGE,
      src: "/images/projects/lgsc/guide-detail.webp",
      alt: "실시간 모니터링 중 표시되는 점검 및 조치 가이드 화면과 확대 상세",
      caption: "실시간 오류 확인 · 조치 가이드",
    },
    {
      kind: MediaKinds.IMAGE,
      src: "/images/projects/lgsc/dashboard-detail.webp",
      alt: "Quick Check와 에러코드·실시간 모니터링 등 기능 대시보드 화면과 확대 상세",
      caption: "제품 기능 대시보드 · Quick Check",
    },
  ],
  cardMedia: {
    kind: MediaKinds.IMAGE,
    src: "/images/projects/lgsc/card.webp",
    alt: "LGSC 앱의 제품 연결·기능 대시보드·실시간 모니터링 화면",
  },
};
