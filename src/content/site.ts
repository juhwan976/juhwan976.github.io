import type { SiteConfig } from '@/content/types';

// 사이트 전역 콘텐츠.
// 이름, 이메일, 카피는 이 파일에서만 수정한다.
export const siteConfig: SiteConfig = {
  name: '장주환',
  role: 'Frontend Engineer / UX Engineer',
  email: 'EMAIL_PLACEHOLDER',
  resumeUrl: 'RESUME_URL_PLACEHOLDER',

  nav: [
    { id: 'work', label: 'Work' },
    { id: 'contact', label: 'Contact' },
  ],

  hero: {
    headline: '복잡한 요구사항을 정리해서,\n사용자가 이해할 수 있는\n제품으로 만듭니다.',
    roles: ['Frontend Engineer', 'UX Engineer'],
    techLine: 'React · Flutter · Electron',
    cta: 'Selected Work',
  },

  scrollStory: [
    {
      id: 'origin',
      label: '시작',
      graphic: 'blocks',
      title: '시작은\n작은 게임이었습니다.',
      description:
        '전역을 앞두고 Excel VBA로 테트리스를 만들었습니다.\n그게 첫 코드였습니다.',
    },
    {
      id: 'perspective',
      label: '관점',
      graphic: 'branches',
      title: '답은 하나가 아닙니다.',
      description:
        '여러 방법을 놓고 비교해서 지금 상황에 맞는 답을 고릅니다.\n그 과정이 가장 재미있습니다.',
    },
    {
      id: 'users',
      label: '사용자',
      graphic: 'paths',
      title: '만드는 사람과\n쓰는 사람은 다릅니다.',
      description:
        'LGSC를 만들면서 배웠습니다.\n코드보다 사용자의 환경을 먼저 봐야 한다는 걸.',
    },
    {
      id: 'now',
      label: '지금',
      graphic: 'system',
      title: '그래서\n이렇게 만듭니다.',
      description:
        '왜 필요한지 확인하고, 쓰는 사람을 먼저 생각하고,\n나중에 고칠 수 있게 만듭니다.',
    },
  ],

  principlesTitle: 'Principles',
  principles: [
    {
      id: 'start-with-why',
      label: 'Start with Why',
      title: '만들기 전에\n왜 필요한지 묻습니다.',
      description: '같은 기능이라도 목적에 따라 구현이 달라집니다.',
    },
    {
      id: 'follow-user-expectations',
      label: 'Follow Expectations',
      title: '사용자가 예상한 대로\n동작하게 만듭니다.',
      description: '새 사용법을 학습시키기보다 익숙한 위치와 방식을 존중합니다.',
    },
    {
      id: 'build-for-change',
      label: 'Build for Change',
      title: '빨리 만드는 것보다\n고칠 수 있게 만듭니다.',
      description: '상태의 책임을 구분하고 변경 가능성을 기준으로 설계합니다.',
    },
    {
      id: 'choose-for-the-problem',
      label: 'Choose for the Problem',
      title: '익숙한 기술보다\n문제에 맞는 기술을 씁니다.',
      description: '환경, 유지보수성, 라이선스를 검토해 도구를 고릅니다.',
    },
  ],
  principlesFootnote:
    'React · Flutter · Electron · webOS · Architecture · UX Engineering · Project Lead',

  contact: {
    title: '실제로 쓰이는 제품을\n함께 만들고 싶습니다.',
  },
};
