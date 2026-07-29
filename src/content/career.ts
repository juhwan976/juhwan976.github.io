import type { CareerCompany } from "@/content/types";

// 회사 단위 경력. 한 회사 안에서 역임한 역할을 최신순으로 쌓는다.
// 프로젝트별 서사는 Work 섹션이 담당하므로 여기서는 기간과 역할만 다룬다.
export const careerCompanies: readonly CareerCompany[] = [
  {
    id: "amuse",
    name: "주식회사 아뮤즈",
    logo: "/images/career/amuse.png",
    start: "2022.11",
    roles: [
      {
        id: "interaction-layer-lead",
        period: "2026.02 — 현재",
        title: "팀장",
        team: "인터랙션레이어",
        summary:
          "물류 시뮬레이터 등 신규 프로젝트 리드와 개발 병행, 디자인 구현 가능 여부 선행 검증",
        current: true,
      },
      {
        id: "advanced-control-lead",
        period: "2024.01 — 2026.01",
        title: "팀장",
        team: "선행제어기술연구팀",
        summary:
          "LGSC·LG Travel+ 프로젝트 리드와 개발 병행, 백엔드·AWS 운영 겸임",
      },
      {
        id: "developer",
        period: "2022.11 — 2023.12",
        title: "개발자",
        team: "개발팀",
        summary: "Android 앱 유지보수와 Flutter 모바일 앱 신규 개발",
      },
    ],
  },
];
