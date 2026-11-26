import { MediaKinds, type ProjectContent } from "@/content/types";

// 사내망 전용 프로젝트 — 실제 화면·영상은 게시하지 않는다.
// 모든 내용은 설계 문서에서 공개 가능한 수준으로 재구성한 것만 사용한다.
export const logisticsSimulator: ProjectContent = {
  slug: "logistics-simulator",
  number: "01",
  name: "물류 시뮬레이터",
  title: "공장 도면에서 AGV 운행을 검증하는 3D 시뮬레이터",
  summary: "공장 도면에서 무인운반차(AGV)의 이동 경로를 짜고 필요한 차량 대수와 정체 구간을 확인하는 데스크톱 앱",
  period: "2026.07 ~ 현재",
  team: "1인 개발",
  roleLine: "요구사항 분석부터 화면 설계, 구현, 성능 개선까지 혼자 맡았습니다.",
  tech: ["Electron", "React", "Three.js", "Redux Toolkit", "TypeScript"],
  users: ["자재 담당자", "AGV 설비 담당자"],
  myRole: [
    "요구사항 분석",
    "UX 설계",
    "화면 설계",
    "프론트엔드 아키텍처",
    "상태 관리",
    "핵심 기능 개발",
    "성능 최적화",
    "일정 관리",
    "고객사 커뮤니케이션",
  ],
  background: [
    "설비를 도입하기 전에 도면 위에서 필요한 AGV 대수와 동선이 겹치는 구간을 확인할 수 있어야 했습니다.",
    "기존 도구는 사용자가 바꿀 수 있는 설정이 적었고, 경로를 편집하는 데 시간이 오래 걸렸습니다.",
    "향후 실제 AGV의 위치를 실시간으로 표시할 수 있도록 확장도 고려했습니다.",
  ],
  highlights: [
    {
      label: "자동화 테스트",
      value: "3,770건 통과",
      note: "2026년 11월 실행 기준입니다. 색상 토큰과 접근성 규칙도 CI에서 확인합니다.",
    },
    {
      label: "계산 중 보유 메모리",
      value: "372 → 52 MiB",
      note: "AGV 200대가 선로를 공유하는 8시간 시나리오에서 약 86% 줄었습니다. 계산 중 관측한 JS 힙과 ArrayBuffer의 합계입니다.",
    },
    {
      label: "배속 변경 및 구간 이동",
      value: "엔진 재실행 0회",
      note: "저장된 결과 중 재생 위치에 필요한 구간만 불러옵니다.",
    },
    {
      label: "프로토타입 개발 기간",
      value: "약 1개월",
      note: "편집기와 공급계획 가져오기, 시뮬레이션 및 재생을 구현했습니다.",
    },
  ],
  challenges: [
    {
      id: "scale-performance",
      label: "Key Challenge",
      title: "대용량 공급계획과 여러 대의 AGV 처리",
      problem: [
        "2만 행 이상의 공급계획 엑셀 파일을 읽고 여러 대의 AGV를 3D 화면에서 시뮬레이션해야 했습니다.",
      ],
      approach: [
        "엑셀 파일을 한 행씩 읽고, 제외된 행과 사유는 가져오기 결과에 표시했습니다.",
        "Web Worker에서 시뮬레이션을 실행하고 이동 기록을 구간별로 저장했습니다.",
      ],
      results: [
        "메모리 사용을 줄인 뒤에도 전체 결과의 해시가 전과 일치하는지 확인했습니다.",
      ],
    },
    {
      id: "camera-ux",
      label: "Challenge 2",
      title: "편집과 운행 확인에 맞는 시점",
      problem: [
        "도면을 위에서 보면 선로를 편집하기 쉽고, 3D 시점에서는 AGV의 움직임을 여러 각도에서 확인할 수 있습니다.",
      ],
      approach: [
        "위에서 보는 시점과 자유 시점을 버튼으로 전환할 수 있게 했습니다.",
        "자유 시점에서는 카메라가 바닥 아래로 내려가지 않도록 회전 각도와 확대 범위를 제한했습니다.",
      ],
      results: ["편집 중에도 필요에 따라 3D 시점에서 경로와 움직임을 확인할 수 있습니다."],
    },
  ],
  decisions: [
    {
      id: "compute-playback",
      label: "Key Decision",
      title: "한 번 계산한 결과를 재생하는 구조",
      body: [
        "전 구간을 한 번 계산하고 확정된 이동 기록은 구간별로 임시 파일에 저장합니다.",
        "배속을 바꾸거나 다른 시각으로 이동하면, 재생 위치에 해당하는 구간을 읽습니다.",
      ],
      diagram: {
        type: "flow",
        title: "Simulation Pipeline",
        steps: [
          { title: "Document Snapshot", detail: "도면·도로망·지점·시나리오" },
          { title: "Compute", detail: "Web Worker에서 전 구간 1회 계산" },
          {
            title: "Result Timeline",
            detail: "AGV별 궤적 구간 저장 + 상태·이벤트 기록",
          },
          { title: "Playback", detail: "재생 위치의 기록을 불러와 보간" },
        ],
      },
    },
    {
      id: "state-separation",
      label: "Decision 2",
      title: "문서 상태와 런타임 상태 분리",
      body: [
        "저장해야 하는 도면과 설정은 Redux에 두고, 매 프레임 바뀌는 AGV 좌표와 재생 위치는 따로 관리합니다.",
        "문서 변경 이력을 한곳에 모아, 한 번의 실행 취소로 도로망과 지점, 설정을 함께 되돌릴 수 있게 했습니다.",
      ],
      diagram: {
        type: "split",
        title: "State Architecture",
        left: {
          title: "Redux - 문서 상태",
          items: [
            "도로망 (노드·선로)",
            "지점·바인딩",
            "AGV 설정·시나리오",
            "저장·실행 취소 대상",
          ],
        },
        right: {
          title: "Redux 외부 - 런타임 상태",
          items: [
            "실시간 AGV 좌표",
            "시뮬레이션 결과 타임라인",
            "재생 커서·배속",
          ],
        },
      },
    },
    {
      id: "electron-vs-unity",
      label: "Decision 3",
      title: "Electron과 Unity 비교",
      body: [
        "편집기에는 도면 조작과 데이터 입력 화면이 함께 필요했습니다. 기존 웹 UI 개발 경험을 활용해 복잡한 편집 화면을 만들 수 있는 Electron을 선택했습니다.",
      ],
    },
    {
      id: "override-layer",
      label: "Decision 4",
      title: "엑셀 원본과 사용자 수정 사항 관리",
      body: [
        "엑셀 파일은 원본 그대로 보관하고, 사용자가 추가하거나 수정하거나 삭제한 행을 따로 기록합니다.",
        "시뮬레이션에 사용할 때 원본과 변경 내역을 합칩니다.",
      ],
      diagram: {
        type: "flow",
        title: "Data Resolution",
        steps: [
          { title: "Excel Source", detail: "원본 데이터 (불변)" },
          { title: "Override Layer", detail: "사용자 변경 사항 (delta)" },
          { title: "Resolved Simulation Data", detail: "조합된 최종 데이터" },
        ],
      },
    },
    {
      id: "rules-as-ci",
      label: "Decision 5",
      title: "개발 규칙과 성능 변경 검증",
      body: [
        "색상 토큰, 접근성, 커밋 제목, 컴포넌트 작성 규칙을 CI에서 검사합니다.",
        "최적화 전후를 같은 조건에서 측정하고, 채택하거나 되돌린 변경과 그 이유를 기록했습니다.",
      ],
    },
  ],
  // 수치 성과는 highlights(Outcome 스탯)에서 보여주므로 여기서는 반복하지 않는다.
  results: [
    "같은 입력으로 같은 운행 결과를 재현할 수 있도록 엔진을 설계했습니다.",
    "편집, 실행, 재생을 한 도구 안에서 검증할 수 있게 구성했습니다.",
  ],
  reflection: {
    items: [
      {
        title: "편집 화면의 구조",
        points: [
          "편집 기능이 늘며 한 파일이 처리하는 일이 많아졌습니다.",
          "편집 도구와 설정 패널을 나눠 각 화면의 변경 범위를 줄이려 합니다.",
        ],
      },
      {
        title: "파일 파싱 테스트",
        points: [
          "DXF와 엑셀을 읽는 메인 프로세스에는 예외 입력을 더 검증할 여지가 있습니다.",
          "열이 누락되거나 형식이 다른 파일을 중심으로 테스트를 보강하려 합니다.",
        ],
      },
      {
        title: "Electron 전체 흐름 검증",
        points: [
          "실제 Electron 앱에서 편집과 재생 흐름을 확인했습니다.",
          "프로젝트 열기부터 시뮬레이션 재생까지 자주 검증하는 경로의 자동화를 검토하고 있습니다.",
        ],
      },
    ],
  },
  // 사내망 전용이라 실제 화면·영상 대신 재구성한 다이어그램으로 구성한다.
  gallery: [
    {
      kind: MediaKinds.IMAGE,
      src: "/images/projects/logistics-simulator/system-architecture.svg",
      alt: "Electron 프로세스 구성과 데이터 흐름을 재구성한 시스템 구성도",
      caption:
        "시스템 구성도 - 사내 프로젝트 특성상 실제 화면 대신 재구성한 자료입니다",
      placeholderLabel: "System Architecture",
    },
    {
      kind: MediaKinds.IMAGE,
      src: "/images/projects/logistics-simulator/editing-flow.svg",
      alt: "지점 배치, 선로 설치, 시뮬레이션으로 이어지는 편집 3단계 플로우",
      caption: "편집 플로우 - 지점 배치 → 선로 설치 → 시뮬레이션",
      placeholderLabel: "Editing Flow",
    },
    {
      kind: MediaKinds.IMAGE,
      src: "/images/projects/logistics-simulator/simulation-pipeline.svg",
      alt: "계산 1회 후 결과를 재생하는 시뮬레이션 파이프라인 다이어그램",
      caption: "시뮬레이션 파이프라인 - 전 구간 1회 계산 후 결과만 재생",
      placeholderLabel: "Simulation Pipeline",
    },
  ],
  cardMedia: {
    kind: MediaKinds.IMAGE,
    src: "/images/projects/logistics-simulator/card-abstract.svg",
    alt: "노드와 선로, AGV 경로를 추상화한 물류 시뮬레이터 그래픽",
    placeholderLabel: "Logistics Simulator",
  },
};
