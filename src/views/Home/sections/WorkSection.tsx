import MediaPanel from "@/components/MediaPanel/MediaPanel";
import { SectionLabel } from "@/components/ui/primitives";
import { buildProjectPath } from "@/constants/route_paths";
import { projects } from "@/content/projects";
import type { ProjectContent } from "@/content/types";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import S from "@/views/Home/sections/WorkSection.styles";

const MAIN_TECH_LIMIT = 5;

function WorkBand({
  project,
  tintOnView,
}: {
  readonly project: ProjectContent;
  /** 3D 프로젝트 밴드 — 진입 시 배경 톤이 전환된다 */
  readonly tintOnView: boolean;
}): React.ReactNode {
  const { ref, inView } = useInViewOnce<HTMLElement>(0.2);

  return (
    <S.Band ref={ref} $tinted={tintOnView && inView}>
      <S.BandInner>
        <div>
          <S.Number>{project.number}</S.Number>
          <S.Name>{project.name}</S.Name>
          <S.Summary>{project.summary}</S.Summary>
          <S.RoleLine>{project.roleLine}</S.RoleLine>
          <S.TechLine>
            {project.tech.slice(0, MAIN_TECH_LIMIT).join(" · ")}
          </S.TechLine>
          <S.CaseLink to={buildProjectPath(project.slug)}>
            View Case Study →
          </S.CaseLink>
        </div>
        <MediaPanel media={project.cardMedia} />
      </S.BandInner>
    </S.Band>
  );
}

// Selected Work — 프로젝트 하나가 하나의 큰 영역을 사용한다.
export default function WorkSection(): React.ReactNode {
  return (
    <S.Section id="work" aria-label="Selected Work">
      <S.Head>
        <SectionLabel>Selected Work</SectionLabel>
      </S.Head>
      {projects.map((project, index) => (
        <WorkBand
          key={project.slug}
          project={project}
          tintOnView={index === 0}
        />
      ))}
    </S.Section>
  );
}
