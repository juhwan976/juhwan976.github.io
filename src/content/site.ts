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
    headline: "웹과 앱에서 필요한 기능을\n설계하고 구현합니다.",
    description:
      "React와 Flutter를 중심으로 모바일, 웹, TV,\n데스크톱 애플리케이션을 개발해왔습니다.",
    cta: "Selected Work",
  },

  about: {
    title: "사용자가 느끼는 경험까지가\n구현의 범위라고 생각합니다.",
    body: [
      "UX와 애니메이션, 인터랙션에 관심이 많은 프론트엔드 개발자입니다.\n같은 화면을 만들더라도 흐름과 움직임이 자연스러운지,\n사용자에게 어떻게 느껴질지를 먼저 생각합니다.",
      "디자인을 받은 대로 구현하는 데서 멈추지 않고,\n사용성이나 성능에 더 나은 방향이 보이면 디자이너에게 먼저 제안합니다.\n디자인 의도와 기기 제약 사이에서 함께 답을 찾는 과정을 좋아합니다.",
      "인터랙션은 결국 구조와 성능 위에서 완성된다고 믿습니다.\n상태 관리 설계와 렌더링 최적화에 공을 들이는 이유도,\n끊기지 않는 경험이 좋은 인터랙션의 전제이기 때문입니다.",
    ],
  },
};
