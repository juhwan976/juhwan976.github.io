import { MediaKinds, type ProjectContent } from "@/content/types";

// 사내망 전용 프로젝트 — 실제 화면·영상은 게시하지 않는다.
// 모든 내용은 설계 문서에서 공개 가능한 수준으로 재구성한 것만 사용한다.
export const logisticsSimulator: ProjectContent = {
  slug: "logistics-simulator",
  number: "01",
  name: "물류 시뮬레이터",
  title: "제약이 많은 선로 편집기를\n빠른 설계 도구로 바꾸다.",
  summary:
    "공장 도면 위에서 AGV 이동 경로를 설계하고 운행 결과를 검증하는 3D 시뮬레이션 애플리케이션",
  period: "2026.07 ~ 현재",
  team: "1인 개발",
  roleLine: "1인 개발 - 요구사항 분석부터 UX 설계, 구현, 성능 최적화까지",
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
    'AGV를 도입하기 전에는 "이 레이아웃에 몇 대가 필요한가, 동선이 겹쳐 정체가 생기지는 않는가"를 실물 없이 검증할 방법이 필요했습니다.',
    "기존 도구는 시뮬레이션 결과의 정확성이 부족했고, 사용자가 설정할 수 있는 범위가 제한적이었습니다.",
    "사용법이 복잡해 경로 설계에 많은 시간이 필요했습니다.",
    "향후 실시간 AGV 위치 모니터링으로 확장할 수 있는 구조가 필요했습니다.",
  ],
  highlights: [
    {
      label: "주요 기능 프로토타입",
      value: "약 1개월",
      note: "AI 기반 개발 방식 활용, 직접 구현 예상 기간 약 5개월",
    },
    {
      label: "선로 설치 UX",
      value: "설치 과정 약 50% 단축",
      note: "사용자 피드백 적용",
    },
    {
      label: "재생 성능",
      value: "배속·구간 이동 재계산 0회",
      note: "계산 1회 → 결과 재생 구조",
    },
    {
      label: "자동화 테스트",
      value: "746건",
      note: "디자인 토큰·접근성·커밋 컨벤션까지 CI로 검증",
    },
  ],
  challenges: [
    {
      id: "rail-ux",
      label: "Key Challenge",
      title: "선로 설치,\n두 번의 클릭으로.",
      problem: [
        "조각 단위 선로 배치는 시간이 오래 걸렸고,\n사용자는 정밀함보다 빠른 설계와 테스트를 원했습니다.",
      ],
      approach: [
        "선로 조각을 이어 붙이는 방식 대신, 지점을 클릭하면 직전 지점과 자동으로 선로가 연결되도록 바꿨습니다.",
        "분기·합류·교차는 별도 부품이 아니라 교차로 지정 한 번으로 처리해 편집 개념 자체를 줄였습니다.",
      ],
      results: ["배치 과정의 약 50%를 단축했습니다."],
    },
    {
      id: "camera-ux",
      label: "Challenge 2",
      title: "카메라 조작 UX",
      problem: [
        "선로 편집에는 탑뷰가 효율적이지만, 시뮬레이션 확인에는 자유로운 3D 시점도 필요했습니다.",
      ],
      approach: [
        "탑뷰 모드와 자유시점 모드를 분리하고, UI를 통한 명시적인 모드 전환을 제공했습니다.",
        "자유시점에서도 바닥 아래로 뒤집히지 않도록 회전 각도와 줌 범위에 한계를 뒀습니다.",
      ],
      reasons: [
        "하나의 카메라 방식만 제공하면 특정 작업이 불편해집니다.",
        "숨겨진 단축키만 제공할 경우 사용자가 기능을 발견하기 어렵습니다.",
      ],
      results: ["편집과 확인 목적에 맞는 시점을 선택할 수 있게 개선했습니다."],
    },
    {
      id: "scale-performance",
      label: "Challenge 3",
      title: "수만 행 데이터와\n다중 AGV를 한 화면에서.",
      problem: [
        "수만 행 규모의 공급계획 Excel을 읽어야 했고,\n다중 AGV 시뮬레이션과 대규모 3D 씬이 함께 돌아가야 했습니다.",
      ],
      approach: [
        "Excel은 스트리밍 방식으로 행 단위 파싱하고, 문제 행은 사유와 함께 리포트로 보여준 뒤 제외하고 계속 진행할 수 있게 했습니다.",
        "시뮬레이션 계산은 Web Worker로 분리하고, 반복되는 3D 객체는 InstancedMesh로 병합했으며, 근접 판정에는 공간 인덱스를 사용했습니다.",
      ],
      results: [
        "대규모 데이터를 불러온 상태에서도 편집·재생 프레임을 유지했습니다.",
      ],
    },
  ],
  decisions: [
    {
      id: "compute-playback",
      label: "Key Decision",
      title: "계산은 한 번,\n재생은 조회만.",
      body: [
        "시뮬레이션은 정해진 운영 구간을 다루므로, 전 구간을 한 번 계산해 결과 타임라인을 만들고 재생은 그 결과만 읽도록 설계했습니다.",
        "배속을 올리거나 시간을 건너뛰어도 재계산이 없고, 동일한 입력은 항상 동일한 결과를 재현하는 결정론적 구조라 검증에도 유리합니다.",
      ],
      diagram: {
        type: "flow",
        title: "Simulation Pipeline",
        steps: [
          { title: "Document Snapshot", detail: "도면·도로망·지점·시나리오" },
          { title: "Compute", detail: "Web Worker에서 전 구간 1회 계산" },
          {
            title: "Result Timeline",
            detail: "AGV별 궤적 세그먼트 + 이벤트",
          },
          { title: "Playback", detail: "이진탐색 + 보간, 재계산 없음" },
        ],
      },
    },
    {
      id: "state-separation",
      label: "Decision 2",
      title: "문서 상태와 런타임 상태 분리",
      body: [
        "저장과 실행 취소의 대상이 되는 문서 상태는 Redux에 두고, 프레임 단위로 변경되는 런타임 상태는 Redux 외부에서 관리하도록 분리했습니다.",
        "문서 상태의 히스토리를 하나로 묶어, 실행 취소 한 번이 도로망·지점·설정을 일관되게 되돌리도록 했습니다.",
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
        "프로젝트의 핵심은 고사양 게임 렌더링보다 선로와 지점 편집, 데이터 입력, 시뮬레이션 조작이었습니다.",
        "웹 기반 UI 개발 경험과 복잡한 편집 화면 구현 효율을 고려해 Electron을 선택했습니다.",
      ],
    },
    {
      id: "override-layer",
      label: "Decision 4",
      title: "Override Layer",
      body: [
        "Excel 원본 데이터는 변경하지 않고 유지합니다.",
        "사용자의 행 추가, 수정, 삭제는 delta 형태로 별도 저장합니다.",
        "원본 데이터와 사용자 변경 사항을 조합해 최종 데이터를 생성합니다.",
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
      title: "규칙은 문서가 아니라 CI로",
      body: [
        "색 토큰, 접근성, 커밋 제목, 컴포넌트 규약을 문서로 남기는 대신 테스트로 강제했습니다. 규칙을 어긴 코드는 CI에서 바로 실패합니다.",
        "성능은 측정 → 수정 → 재측정 원장으로 관리합니다. 채택한 변경(keep)과 되돌린 변경(revert)을 모두 기록해 같은 시도를 반복하지 않게 했습니다.",
      ],
    },
  ],
  // 수치 성과는 highlights(Outcome 스탯)에서 보여주므로 여기서는 반복하지 않는다.
  results: [
    "1인 개발로 진행했습니다.",
    "AI 기반 개발 방식을 구현 속도를 높이는 도구로 활용했습니다.",
    "동일한 입력이면 항상 같은 결과를 재현하는 결정론적 엔진으로 설계해, 시뮬레이션 결과를 신뢰할 수 있게 했습니다.",
  ],
  reflection: {
    items: [
      {
        title: "UI 레이어 구조",
        points: [
          "편집 화면의 UI 레이어 파일이 기능이 늘며 비대해졌습니다.",
          "섹션 단위로 분리해 파일 크기와 책임을 줄일 필요가 있습니다.",
        ],
      },
      {
        title: "main 프로세스 테스트",
        points: [
          "DXF·Excel 파싱을 담당하는 main 프로세스의 테스트가 renderer 대비 얇습니다.",
          "파싱 경계 케이스 중심으로 테스트를 보강하려 합니다.",
        ],
      },
      {
        title: "Electron 통합 E2E",
        points: [
          "프로세스 간 경계를 관통하는 통합 E2E 테스트가 없습니다.",
          "핵심 시나리오에 한해 도입을 검토하고 있습니다.",
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
      caption: "시뮬레이션 파이프라인 - 계산은 한 번, 재생은 조회만",
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
