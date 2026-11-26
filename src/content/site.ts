import type { SiteConfig } from "@/content/types";

// 사이트 전역 콘텐츠.
// 이름, 이메일, 확정 문구는 이 파일에서만 수정한다.
export const siteConfig: SiteConfig = {
  pageTitle: "juhwan976",
  documentTitle: "장주환 · Product Engineer",
  name: "장주환",
  nameEn: "JUHWAN JANG",
  role: "Product Engineer",
  email: "juhwan976@gmail.com",
  // 개인정보(전화번호·사진)를 제외한 웹 공개용 — 원본은 별도 resume 저장소에서 빌드한다.
  resumeUrl: "/resume.pdf",

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
    headline: "모바일, TV, 데스크톱 제품을 설계하고 출시합니다.",
    description:
      "화면과 백엔드를 함께 개발하고, 자동화 테스트로 제품의 주요 기능을 검증합니다.",
    cta: "Selected Work",
  },

  about: {
    title: "사용자가 제품을 쓰는 방식부터 생각합니다.",
    body: [
      "프론트엔드 개발로 시작해 제품을 출시하면서 백엔드, 배포 자동화, 스토어 심사까지 담당하게 됐습니다.",
      "TV 리모컨으로 화면을 탐색하는 방법, 가전제품과의 소켓 통신, 앱 스토어 결제 검증처럼 플랫폼마다 다른 문제를 직접 해결했습니다.",
      "다니몽에서는 결제와 동화 생성 흐름을, 물류 시뮬레이터에서는 편집과 운행 결과를 자동화 테스트로 검증했습니다.",
    ],
  },
};
