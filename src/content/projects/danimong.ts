import {
  MediaKinds,
  ProjectLinkKinds,
  type ProjectContent,
} from "@/content/types";

export const danimong: ProjectContent = {
  slug: "danimong",
  number: "02",
  name: "다니몽",
  title: "결제부터 동화 생성까지 검증하는 자동화 테스트",
  summary:
    "아이를 위한 맞춤 동화를 만들고 부모의 합성 목소리로 읽어주는 모바일 앱",
  period: "2026.04 ~ 2026.11",
  team: "2인 개발",
  roleLine: "프로젝트를 이끌며 앱과 백엔드 개발, 스토어 출시를 맡았습니다.",
  tech: [
    "Flutter",
    "Riverpod",
    "Laravel",
    "MySQL",
    "FCM",
    "In-App Purchase",
    "GitLab CI",
  ],
  users: ["부모", "아이"],
  myRole: [
    "요구사항 분석",
    "앱 아키텍처",
    "백엔드 API 설계",
    "결제·재화 시스템",
    "테스트 자동화 체계",
    "CI 구축",
    "스토어 출시",
    "프로젝트 리드",
  ],
  background: [
    "동화 생성과 음성 합성에 수분이 걸려, 그동안 사용자가 다른 화면을 이용할 수 있어야 했습니다.",
    "결제로 충전하는 앱 내 재화인 씨앗은 요청이 중복되거나 작업이 실패해도 정확히 정산돼야 했습니다.",
    "전담 QA 인력 없이도 결제, 인증, 동화 생성이 새 버전에서 계속 동작하는지 확인할 방법이 필요했습니다.",
  ],
  highlights: [
    {
      label: "자동화 테스트",
      value: "앱 438건 · 서버 275건 통과",
      note: "2026년 9월 통합 검증 기준, 앱 골든 테스트 제외",
    },
    {
      label: "동화 모드 전환 프레임 시간(p95)",
      value: "97.2ms → 14.8ms",
      note: "Galaxy Fold에서 오디오북을 동화 모드로 전환했습니다. 설정별로 3회 측정한 Flutter 전체 프레임 시간 p95의 중앙값입니다.",
    },
    {
      label: "Fake API 적용 범위",
      value: "12개 도메인",
      note: "개발과 테스트에 같은 Fake API를 쓰고, 야간 CI로 실제 서버의 응답 형식을 검증합니다.",
    },
  ],
  challenges: [
    {
      id: "quality-without-qa",
      label: "Key Challenge",
      title: "핵심 기능의 회귀 테스트",
      problem: [
        "앱을 업데이트할 때마다 결제와 인증, 동화 생성의 모든 경우를 수동으로 확인하기 어려웠습니다.",
      ],
      approach: [
        "위젯 테스트로 오류, 버튼 연타, 작업 중 화면 이탈을 검증했습니다.",
        "핵심 화면을 기준 이미지 15장과 비교해 예상치 못한 화면 변경을 감지합니다.",
        "야간 CI에서 실제 서버의 응답 형식을 검증합니다.",
      ],
      results: [
        "초기 출시 후 회귀 테스트를 확대하며 화면 이탈과 서버 응답 파싱에서 발생한 크래시를 수정했습니다.",
      ],
    },
    {
      id: "async-ai-ux",
      label: "Challenge 2",
      title: "동화를 만드는 동안에도 앱을 사용할 수 있게",
      problem: [
        "동화 생성과 음성 합성 결과가 나올 때까지 화면을 열어두면 다른 동화를 읽거나 탐색하기 어렵습니다.",
      ],
      approach: [
        "서버가 요청을 먼저 접수하고 동화 생성과 음성 합성을 백그라운드에서 처리하도록 구성했습니다.",
        "앱에서 진행 상태를 확인할 수 있고, 화면을 떠나도 FCM으로 완료 여부를 알립니다.",
      ],
      results: [
        "동화가 만들어지는 동안 앱을 계속 사용할 수 있습니다. 생성에 실패하면 사용한 씨앗이 자동으로 돌아옵니다.",
      ],
    },
  ],
  decisions: [
    {
      id: "seed-ledger",
      label: "Key Decision",
      title: "재화 원장 설계",
      body: [
        "씨앗을 충전하거나 사용할 때마다 원장에 기록합니다. 멱등키와 DB 행 잠금을 적용해 재시도나 동시 요청에도 한 번만 차감합니다.",
        "App Store와 Google Play의 영수증 검증 로직을 나눠 플랫폼별 정책을 관리했습니다.",
      ],
      diagram: {
        type: "flow",
        title: "Seed Ledger",
        steps: [
          { title: "결제 완료", detail: "App Store / Play 결제" },
          { title: "영수증 검증", detail: "플랫폼별 검증기 분리" },
          { title: "원장 기록", detail: "멱등키 + DB 행 잠금" },
          { title: "잔액 갱신", detail: "원장 합산으로 산출" },
        ],
      },
    },
    {
      id: "fake-api-layer",
      label: "Decision 2",
      title: "Fake API 계층",
      body: [
        "12개 도메인에 실제 API와 인터페이스가 같은 Fake API를 구현했습니다. 서버 없이 화면을 개발하고, 테스트에서도 같은 구현을 재사용합니다.",
        "야간 계약 테스트로 실제 서버의 응답 형식이 달라졌는지 확인합니다.",
      ],
      diagram: {
        type: "split",
        title: "Fake API Architecture",
        left: {
          title: "개발과 테스트에 쓰는 Fake API",
          items: [
            "12개 도메인 동일 인터페이스",
            "서버 없이 화면 개발",
            "개발과 테스트에서 재사용",
          ],
        },
        right: {
          title: "야간 CI의 실제 서버 검증",
          items: [
            "실서버 응답 스키마 검증",
            "응답 형식 변경 감지",
            "검증 실패 시 알림",
          ],
        },
      },
    },
  ],
  // 수치 성과는 highlights(Outcome 스탯)에서 보여주므로 여기서는 반복하지 않는다.
  results: [
    "결제·소셜 로그인·음성 녹음·동화 재생을 구현하고 Android와 iOS 스토어에 출시했습니다.",
    "기능을 추가할 때 위젯 테스트와 시각 회귀 테스트를 함께 운영했습니다.",
  ],
  links: [
    {
      label: "Google Play",
      url: "https://play.google.com/store/apps/details?id=com.readonai.readonai&hl=ko",
      kind: ProjectLinkKinds.GOOGLE_PLAY,
    },
    {
      label: "App Store",
      url: "https://apps.apple.com/kr/app/%EB%A6%AC%EB%93%9C%EC%98%A8-readon/id6756404876",
      kind: ProjectLinkKinds.APP_STORE,
    },
  ],
  reflection: {
    items: [
      {
        title: "테스트 도입 시점",
        points: [
          "초기 출시 뒤에 테스트를 확대하면서 기존 화면의 구조도 손봐야 했습니다.",
          "다음 프로젝트에서는 첫 화면부터 테스트 환경을 갖추고 개발하려 합니다.",
        ],
      },
      {
        title: "생성 요청의 상태 관리",
        points: [
          "상태 조회와 푸시 알림을 함께 처리하면서 상태 전이가 복잡해졌습니다.",
          "다음에는 생성 작업의 상태 전이를 먼저 정의하고, 각 상태에 필요한 알림을 연결하려 합니다.",
        ],
      },
    ],
  },
  gallery: [
    {
      kind: MediaKinds.IMAGE,
      src: "/images/projects/danimong/app-screens.webp",
      alt: "다니몽의 보호자 홈, 나만의 동화 생성, 랜덤 동화 생성, 아이 책장 화면",
      caption: "보호자 홈과 아이 책장, 두 가지 동화 생성 방식",
    },
    {
      kind: MediaKinds.IMAGE,
      src: "/images/projects/danimong/story-player.webp",
      alt: "동화 삽화와 자막이 표시되는 다니몽 플레이어 화면",
      caption: "문장 자막과 함께 재생하는 동화",
    },
    {
      kind: MediaKinds.IMAGE,
      src: "/images/projects/danimong/voice-selection.webp",
      alt: "동화 재생 중 엄마, 아빠, 할머니 목소리를 선택하는 화면",
      caption: "동화를 읽어줄 목소리 선택",
    },
  ],
  cardMedia: {
    kind: MediaKinds.IMAGE,
    src: "/images/projects/danimong/card.webp",
    alt: "다니몽의 보호자 홈, 나만의 동화 생성, 아이 책장 화면",
  },
};
