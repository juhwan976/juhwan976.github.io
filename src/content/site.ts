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

  // 소셜 바로가기 — url을 채우면 Contact 하단에 노출된다.
  socials: [
    { id: "github", label: "GitHub", url: "https://github.com/juhwan976" },
    {
      id: "linkedin",
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/주환-장-3abbb9424",
    },
    // {
    //   id: "remember",
    //   label: "Remember",
    //   url: "https://connect.rememberapp.co.kr/profile/2027501?internal_path=rc_connect_search_list",
    // },
  ],

  nav: [
    { id: "about", label: "About" },
    { id: "work", label: "Work" },
    { id: "career", label: "Career" },
    { id: "contact", label: "Contact" },
  ],

  hero: {
    headline: "모바일·TV·데스크톱,\n제품을 끝까지 만들어 출시합니다.",
    description:
      "React·Flutter로 출시한 제품 4개.\n자동화 테스트 1,200여 건과 CI로 품질을 지킵니다.",
    cta: "Selected Work",
  },

  about: {
    title: "사용자가 느끼는 경험까지가\n구현의 범위라고 생각합니다.",
    body: [
      "React와 Flutter로 모바일·TV·데스크톱 애플리케이션을 만들어 출시해왔습니다.",
      "디자인 의도와 기기 제약이 부딪힐 때, 구현 가능한 대안을 먼저 제안합니다.",
      "오류 없이 동작하는 것까지가 사용자 경험이라고 생각합니다.\nQA 조직이 없는 환경에서 테스트 1,200여 건과 CI를 직접 구축했습니다.",
    ],
  },
};
