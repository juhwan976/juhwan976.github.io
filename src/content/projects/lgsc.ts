import { MediaKinds, type ProjectContent } from "@/content/types";

export const lgsc: ProjectContent = {
  slug: "lgsc",
  number: "02",
  name: "LGSC",
  title: "약 200개 제품군과 오프라인 환경을\n하나의 앱에서 다루다.",
  summary:
    "LG 가전제품을 휴대폰과 연결해 실시간 데이터 확인과 제품 제어를 제공하는 애플리케이션",
  period: "2023.11 ~ 2025.12",
  team: "4인 개발",
  roleLine: "프로젝트 리드 (4인) - 공통 구조·냉장고 제품군 개발, 백엔드 겸임",
  tech: [
    "Flutter",
    "Dart",
    "RxDart",
    "Drift",
    "Wi-Fi Direct",
    "Socket",
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
    "제품군마다 서로 다른 데이터 파싱 구조를 가지고 있었습니다.",
    "초기 시연 제품은 안정적으로 동작해야 했습니다.",
    "이후 추가되는 제품군에도 대응할 수 있는 확장성이 필요했습니다.",
    "인터넷이 없는 환경에서도 실시간 정보 확인과 제어가 필요했습니다.",
    "국가 및 기능별 사용 통계 수집이 필요했습니다.",
  ],
  highlights: [
    { label: "MAU", value: "7,000+" },
    { label: "지원 제품군", value: "약 200개" },
    {
      label: "비정상 종료 발생률",
      value: "약 8% → 약 1%",
      note: "스토어 측정 기준",
    },
    { label: "오프라인 로그 동기화", value: "자체 구현" },
  ],
  challenges: [
    {
      id: "offline-sync",
      label: "Key Challenge",
      title: "로그 동기화 직접 구현",
      problem: [
        "기존 솔루션은 네트워크가 끊기면 요청이 쌓였고,\n오래 쓰면 앱이 꺼졌습니다.",
      ],
      approach: [
        "Drift / SQLite 로컬 데이터베이스에 로그를 행 단위로 저장했습니다.",
        "네트워크 복구 시 순차 전송하고, 전송 완료·재시도 상태를 관리했습니다.",
      ],
      results: ["Crash Rate\n8% → 1%"],
    },
    {
      id: "common-components",
      label: "Challenge",
      title: "공통 컴포넌트",
      problem: [
        "전체 제품군 스펙이 확정되지 않은 상태에서 팀이 쓸 공통 UI가 필요했습니다.",
      ],
      approach: [
        "냉장고 제품군 기준으로 공통 구조를 먼저 구현했습니다.",
        "제품군별 차이는 확장 포인트의 내부 분기로 대응했습니다.",
      ],
      results: ["약 200개 제품군이 하나의 공통 구조를 공유"],
    },
  ],
  decisions: [
    {
      id: "mptcp",
      label: "Important Decision 1",
      title: "MPTCP 기술 검증 및 도입",
      body: [
        "Android / iOS MPTCP 기술을 검증하고 도입했습니다.",
        "외부 솔루션을 그대로 채택하지 않고 내부 동작 원리를 검토했습니다.",
      ],
    },
    {
      id: "parsing-db",
      label: "Important Decision 2",
      title: "파싱 룰 저장 DB 설계",
      body: [
        "사업부와 제품군마다 다른 파싱 룰을 저장할 수 있는 데이터베이스를 설계했습니다.",
      ],
      diagram: {
        type: "flow",
        title: "Manage Parsing Rules",
        steps: [
          { title: "파싱 룰 업로드", detail: "Excel 기반 관리" },
          {
            title: "앱 로컬 저장소 업데이트",
            detail: "변경된 파싱 룰만 다운로드",
          },
          { title: "새로운 파싱룰 적용", detail: "변경된 출력 확인" },
        ],
      },
    },
  ],
  // 수치 성과는 highlights(Outcome 스탯)에서 보여주므로 여기서는 반복하지 않는다.
  results: ["실제 서비스로 배포되어 운영 중입니다."],
  reflection: {
    items: [
      {
        title: "상태 관리",
        points: [
          "당시 RxDart Stream 기반 상태 관리를 사용했습니다.",
          "다시 구현한다면 Riverpod을 검토하고 싶습니다.",
          "초기 학습 곡선과 유지보수성을 개선하고 싶습니다.",
        ],
      },
      {
        title: "공통 통신 로직",
        points: [
          "최초에는 모바일 앱만 고려했습니다.",
          "이후 웹 지원 요구가 발생했습니다.",
          "다시 설계한다면 통신 로직을 독립 라이브러리로 분리하고 싶습니다.",
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
