import type { SiteConfig } from "@/content/types";

// 사이트 전역 콘텐츠.
// 이름, 이메일, 확정 문구는 이 파일에서만 수정한다.
export const siteConfig: SiteConfig = {
  pageTitle: "juhwan976",
  name: "장주환",
  nameEn: "JUHWAN JANG",
  role: "Frontend Engineer",
  email: "juhwan976@gmail.com",
  resumeUrl: "RESUME_URL_PLACEHOLDER",
  githubUrl: "GITHUB_URL_PLACEHOLDER",

  nav: [
    { id: "about", label: "About" },
    { id: "work", label: "Work" },
    { id: "career", label: "Career" },
    { id: "contact", label: "Contact" },
  ],

  hero: {
    headline: "웹과 앱에서 필요한 기능을\n설계하고 구현합니다.",
    description:
      "React와 Flutter를 중심으로 모바일, 웹, TV,\n데스크톱 애플리케이션을 개발해왔습니다.",
    cta: "Selected Work",
  },

  about: {
    title: "Excel VBA로 테트리스를 만들면서\n개발을 시작했습니다.",
    body: [
      "군 전역 무렵 심심풀이로 만든 테트리스가 시작이었습니다.\n생각한 것을 사용자가 경험할 수 있는 실체로 만든다는 점,\n문제를 푸는 방법이 하나가 아니라는 점에 매력을 느꼈습니다.",
      "Android 앱 유지보수로 시작해 Flutter 모바일, webOS TV,\nElectron 데스크톱까지 다루는 플랫폼을 넓혀왔습니다.\n지금은 3D 물류 시뮬레이터를 혼자 만들며 프론트엔드 팀을 리드하고 있습니다.",
      "사용자가 원하는 것은 개발자의 생각과 다를 때가 많고,\n작은 실수 하나가 신뢰를 무너뜨릴 수 있다는 것을 배웠습니다.\n그래서 기능의 목적을 먼저 확인하고 사용자에게 익숙한 방식을 우선하며,\n변경하기 쉬운 구조와 프로젝트에 맞는 기술을 선택합니다.",
    ],
  },
};
