import {
  IMAGE_PLACEHOLDER,
  MediaKinds,
  SceneThemes,
  VIDEO_PLACEHOLDER,
  type ProjectContent,
} from '@/content/types';

export const logisticsSimulator: ProjectContent = {
  slug: 'logistics-simulator',
  number: '01',
  name: '물류 시뮬레이터',
  title: '제약이 많은 선로 편집기를\n빠른 설계 도구로 바꾸다.',
  summary:
    '공장 도면 위에서 AGV 이동 경로를 설계하고 운행 결과를 검증하는 3D 시뮬레이션 애플리케이션',
  period: '2026.07 ~ 현재',
  team: '1인 개발',
  tags: [
    'Frontend Architecture',
    'UX Design',
    'Performance Optimization',
    '1인 개발',
  ],
  tech: ['Electron', 'React', 'Three.js', 'Redux Toolkit', 'TypeScript'],
  users: ['자재 담당자', 'AGV 설비 담당자'],
  myRole: [
    '요구사항 분석',
    'UX 설계',
    '화면 설계',
    '프론트엔드 아키텍처',
    '상태 관리',
    '핵심 기능 개발',
    '성능 최적화',
    '일정 관리',
    '고객사 커뮤니케이션',
  ],
  background: [
    '기존 시뮬레이션 결과의 정확성이 부족했습니다.',
    '사용자가 설정할 수 있는 범위가 제한적이었습니다.',
    '사용법이 복잡하고 경로 설계에 많은 시간이 필요했습니다.',
    '향후 실시간 AGV 위치 모니터링 기능 확장이 필요했습니다.',
  ],
  highlights: [
    {
      label: '주요 기능 프로토타입',
      value: '약 1개월',
      note: 'AI 기반 개발 방식 활용, 직접 구현 예상 기간 약 5개월',
    },
    { label: '선로 설치 UX', value: '개선', note: '사용자 피드백 확보' },
    { label: '카메라 모드', value: '탑뷰 / 자유시점', note: '명시적 모드 전환 제공' },
  ],
  challenges: [
    {
      id: 'rail-ux',
      label: 'Key Challenge',
      title: '선로 설치,\n두 번의 클릭으로.',
      problem: [
        '조각 단위 선로 배치는 시간이 오래 걸렸고,\n사용자는 정밀함보다 빠른 설계와 테스트를 원했다.',
      ],
      approach: [
        '두 지점을 클릭하면 사이에 선로를 자동 생성하도록 바꿨습니다.',
        '교차로와 특수 선로만 수동 편집으로 남겼습니다.',
      ],
      results: ['배치 과정 단축\n사용성 개선 피드백 확보'],
    },
    {
      id: 'camera-ux',
      label: 'Challenge 2',
      title: '카메라 조작 UX',
      problem: [
        '선로 편집에는 탑뷰가 효율적이지만, 시뮬레이션 확인에는 자유로운 3D 시점도 필요했습니다.',
      ],
      approach: [
        '탑뷰 모드와 자유시점 모드를 분리했습니다.',
        'UI를 통한 명시적인 모드 전환을 제공했습니다.',
      ],
      reasons: [
        '하나의 카메라 방식만 제공하면 특정 작업이 불편해집니다.',
        '숨겨진 단축키만 제공할 경우 사용자가 기능을 발견하기 어렵습니다.',
      ],
      results: [
        '편집과 확인 목적에 맞는 카메라를 사용할 수 있게 됐습니다.',
        '카메라 시점이 편리하다는 피드백을 확보했습니다.',
      ],
    },
  ],
  decisions: [
    {
      id: 'electron-vs-unity',
      label: 'Key Decision 1',
      title: 'Electron과 Unity 비교',
      body: [
        '프로젝트의 핵심은 고사양 게임 렌더링보다 선로와 지점 편집, 데이터 입력, 시뮬레이션 조작이었습니다.',
        '웹 기반 UI 개발 경험과 복잡한 편집 화면 구현 효율을 고려해 Electron을 선택했습니다.',
      ],
    },
    {
      id: 'state-separation',
      label: 'Key Decision 2',
      title: '문서 상태와 런타임 상태 분리',
      body: [
        '저장과 실행 취소의 대상이 되는 문서 상태는 Redux에 두고, 프레임 단위로 변경되는 런타임 상태는 Redux 외부에서 관리하도록 분리했습니다.',
      ],
      diagram: {
        type: 'split',
        title: 'State Architecture',
        left: {
          title: 'Redux — 문서 상태',
          items: [
            '도로망',
            '지점',
            'AGV 설정',
            '저장 대상 데이터',
            '실행 취소 대상 데이터',
          ],
        },
        right: {
          title: 'Redux 외부 — 런타임 상태',
          items: [
            '실시간 AGV 좌표',
            '시뮬레이션 중간 결과',
            '프레임 단위로 변경되는 데이터',
          ],
        },
      },
    },
    {
      id: 'override-layer',
      label: 'Key Decision 3',
      title: 'Override Layer',
      body: [
        'Excel 원본 데이터는 변경하지 않고 유지합니다.',
        '사용자의 행 추가, 수정, 삭제는 delta 형태로 별도 저장합니다.',
        '원본 데이터와 사용자 변경 사항을 조합해 최종 데이터를 생성합니다.',
      ],
      diagram: {
        type: 'flow',
        title: 'Data Resolution',
        steps: [
          { title: 'Excel Source', detail: '원본 데이터 (불변)' },
          { title: 'Override Layer', detail: '사용자 변경 사항 (delta)' },
          { title: 'Resolved Simulation Data', detail: '조합된 최종 데이터' },
        ],
      },
    },
  ],
  results: [
    '1인 개발로 진행했습니다.',
    'AI 기반 개발 방식을 구현 속도를 높이는 도구로 활용했습니다.',
    '약 1개월 만에 주요 기능 프로토타입을 구현했습니다. 직접 개발 예상 기간은 약 5개월이었습니다.',
  ],
  reflection: {
    note: '프로젝트 완료 후 성능, 사용성, 유지보수성 관점에서 최종 회고를 추가할 예정입니다.',
    items: [],
  },
  gallery: [
    {
      kind: MediaKinds.IMAGE,
      src: IMAGE_PLACEHOLDER,
      alt: '가상 공장 도면을 사용한 실제 애플리케이션 화면',
      caption: '가상 공장 도면 기반 편집 화면',
      placeholderLabel: 'Editor Screen',
    },
    {
      kind: MediaKinds.VIDEO,
      src: VIDEO_PLACEHOLDER,
      alt: '선로 편집과 시뮬레이션 실행 화면 녹화 영상',
      caption: '화면 녹화 — 선로 편집과 시뮬레이션 실행',
      placeholderLabel: 'Screen Recording',
    },
    {
      kind: MediaKinds.IMAGE,
      src: IMAGE_PLACEHOLDER,
      alt: '시스템 구성도',
      caption: '시스템 구성도',
      placeholderLabel: 'System Diagram',
    },
    {
      kind: MediaKinds.IMAGE,
      src: IMAGE_PLACEHOLDER,
      alt: '선로 설치 방식 개선 전후 비교',
      caption: '선로 설치 Before / After',
      placeholderLabel: 'Before / After',
    },
    {
      kind: MediaKinds.IMAGE,
      src: IMAGE_PLACEHOLDER,
      alt: '탑뷰 모드와 자유시점 모드 비교',
      caption: '카메라 모드 비교',
      placeholderLabel: 'Camera Modes',
    },
  ],
  cardMedia: {
    kind: MediaKinds.IMAGE,
    src: IMAGE_PLACEHOLDER,
    alt: '물류 시뮬레이터 편집 화면',
    placeholderLabel: 'Logistics Simulator',
  },
  scene: {
    title: '도면에 그리면,\n바로 움직인다.',
    summary:
      '공장 도면 위에서 AGV 경로를 설계하고\n운행 결과를 검증하는 3D 시뮬레이터.',
    stats: ['1 Person', '1 Month Prototype', '3D Editor'],
    coreTech: ['Electron', 'React', 'Three.js', 'Redux Toolkit', 'TypeScript'],
    theme: SceneThemes.BLUEPRINT,
  },
};
