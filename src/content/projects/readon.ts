import { MediaKinds, type ProjectContent } from "@/content/types";

export const readon: ProjectContent = {
  slug: "readon",
  number: "02",
  name: "ReadON",
  title: "QA 조직 없이 출시 품질을 만든\n테스트 자동화 체계",
  summary:
    "AI가 생성한 동화를 부모의 합성 목소리로 읽어주는 Android·iOS 애플리케이션",
  period: "2026.04 ~ 현재",
  team: "2인 개발",
  roleLine:
    "앱·백엔드·프로젝트 리드 — 아키텍처 설계부터 스토어 출시, 품질 자동화까지",
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
    "AI 동화 생성과 음성 합성은 분 단위가 걸리는 작업이라, 기다리게 하지 않는 UX가 필요했습니다.",
    "결제로 충전한 재화(씨앗)를 사용하므로 이중 차감·유실이 구조적으로 불가능해야 했습니다.",
    "QA 조직이 없어, 출시 품질을 자동화된 테스트만으로 보증해야 했습니다.",
  ],
  highlights: [
    {
      label: "자동화 테스트",
      value: "459건",
      note: "앱 306 + 서버 153 — QA 조직 없이 스토어 출시",
    },
    {
      label: "출시 전 차단한 크래시성 버그",
      value: "8건",
      note: "테스트 작성 과정에서 발견·수정",
    },
    {
      label: "테스트 스위트 실행",
      value: "94초 → 7초",
      note: "Fake 지연 제어",
    },
  ],
  challenges: [
    {
      id: "quality-without-qa",
      label: "Key Challenge",
      title: "QA 없이\n스토어 품질 만들기",
      problem: [
        "QA 인력이 없는 상태에서 결제·인증·생성 플로우의 회귀를 사람이 다 잡을 수 없었습니다.",
      ],
      approach: [
        "위젯 테스트로 오류·연타·화면 이탈 시나리오까지 포함해 화면 동작을 검증했습니다.",
        "골든 테스트 12장으로 핵심 화면의 시각 회귀를 감지했습니다.",
        "가짜 서버와 실서버 응답의 괴리는 야간 CI의 실서버 계약 테스트가 자동으로 감지하는 3층 구조를 만들었습니다.",
      ],
      results: ["테스트 459건, 출시 전 크래시성 버그 8건 차단"],
    },
    {
      id: "async-ai-ux",
      label: "Challenge 2",
      title: "분 단위 AI 작업의 UX",
      problem: [
        "동화 생성과 음성 합성은 수 분이 걸려, 결과를 동기적으로 기다리는 UX가 불가능했습니다.",
      ],
      approach: [
        "요청을 즉시 접수하고 응답하는 잡 API로 전환하고, 상태 폴링과 FCM 완료 통지를 결합했습니다.",
        "화면을 떠나도 전역 컨트롤러가 완료·실패를 안내하고, 실패 시 재화를 자동으로 환원합니다.",
      ],
      results: [
        "생성 요청 후 자유롭게 앱 사용, 실패 시 자동 환원으로 CS 이슈 예방",
      ],
    },
  ],
  decisions: [
    {
      id: "seed-ledger",
      label: "Key Decision",
      title: "재화 원장 설계",
      body: [
        "모든 충전·차감을 원장 테이블에 기록하고, 멱등키와 DB 행 잠금으로 동시 요청·재시도에도 단 한 번만 차감되게 했습니다.",
        "스토어(App Store/Play) 영수증 검증기를 분리해 플랫폼별 검증 정책을 독립적으로 관리했습니다.",
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
        "12개 도메인 전부 실제 API와 같은 인터페이스의 Fake를 구현해 서버 없이 화면을 개발했고, 같은 Fake를 테스트가 재사용합니다.",
        "Fake와 실서버의 괴리는 야간 실서버 계약 테스트가 감지합니다.",
      ],
      diagram: {
        type: "split",
        title: "Fake API Architecture",
        left: {
          title: "개발·테스트 — Fake API",
          items: [
            "12개 도메인 동일 인터페이스",
            "서버 없이 화면 개발",
            "테스트가 동일 Fake 재사용",
          ],
        },
        right: {
          title: "야간 CI — 실서버 계약 검증",
          items: [
            "실서버 응답 스키마 검증",
            "Fake와의 괴리 자동 감지",
            "괴리 발견 시 알림",
          ],
        },
      },
    },
  ],
  // 수치 성과는 highlights(Outcome 스탯)에서 보여주므로 여기서는 반복하지 않는다.
  results: [
    "3.5개월 만에 결제·소셜 로그인 3종·녹음·오디오 플레이어를 갖춘 앱을 양대 스토어에 출시했습니다.",
    "AI 기반 개발 방식을 활용하되, 산출물은 테스트와 CI로 검증하는 체계를 함께 구축했습니다.",
  ],
  links: [],
  reflection: {
    items: [
      {
        title: "테스트 도입 시점",
        points: [
          "테스트를 출시 후에 소급해서 구축했습니다.",
          "이미 동작하는 화면을 테스트 가능한 구조로 되돌리는 비용이 컸습니다.",
          "다음 프로젝트는 첫 화면부터 테스트 하네스와 함께 시작하려 합니다.",
        ],
      },
      {
        title: "잡 상태 관리",
        points: [
          "폴링과 FCM 통지가 겹치며 상태 전이가 복잡해졌습니다.",
          "다시 설계한다면 잡 상태 머신을 먼저 정의하고 통지를 그 위에 얹고 싶습니다.",
        ],
      },
    ],
  },
  gallery: [
    {
      kind: MediaKinds.IMAGE,
      src: "/images/projects/readon/app-screens.webp",
      alt: "홈·동화 생성·내 책장·목소리 녹음 화면을 나열한 실제 앱 화면",
      caption: "실제 서비스 화면",
    },
    {
      kind: MediaKinds.IMAGE,
      src: "/images/projects/readon/story-player.webp",
      alt: "합성 목소리를 선택해 동화를 읽어주는 플레이어 화면과 페이지 탐색",
      caption: "동화 재생 · 목소리 선택",
    },
    {
      kind: MediaKinds.IMAGE,
      src: "/images/projects/readon/voice-recording.webp",
      alt: "부모 목소리를 녹음해 합성 음성을 만드는 화면",
      caption: "목소리 녹음 · AI 음성 학습",
    },
  ],
  cardMedia: {
    kind: MediaKinds.IMAGE,
    src: "/images/projects/readon/card.webp",
    alt: "ReadON 앱의 홈·동화 생성·내 책장 화면",
  },
};
