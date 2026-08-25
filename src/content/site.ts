import type { SiteConfig } from "@/content/types";

// 사이트 전역 콘텐츠.
// 이름, 이메일, 확정 문구는 이 파일에서만 수정한다.
export const siteConfig: SiteConfig = {
  pageTitle: "juhwan976",
  name: "장주환",
  nameEn: "JUHWAN JANG",
  role: "Product Engineer",
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
    headline: "출시한 제품 4개,\n자동화 테스트 1,700여 건.",
    description:
      "모바일·TV·데스크톱을 가리지 않고\n설계부터 출시, 품질 검증까지 직접 만듭니다.",
    cta: "Selected Work",
  },

  about: {
    title: "사용자가 느끼는 경험까지가\n구현의 범위라고 생각합니다.",
    body: [
      "인터랙션이 좋아 프론트엔드로 시작했고,\n제품을 출시하다 보니 백엔드·CI·스토어 심사까지 범위가 넓어졌습니다.",
      "문서와 라이브러리가 없는 구간을 직접 뚫는 일에 강합니다.\nTV 리모컨 포커스, TLS 소켓 프로토콜, 스토어 결제 검증을\n밑바닥부터 구현해 제품으로 출시했습니다.",
      "오류 없이 동작하는 것까지가 사용자 경험이라고 생각합니다.\nQA 조직이 없는 환경에서 테스트 1,700여 건과 CI를 직접 구축했습니다.",
    ],
  },
};
