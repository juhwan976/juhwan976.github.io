import MediaPanel from "@/components/MediaPanel/MediaPanel";
import { ROUTE_PATHS, buildProjectPath } from "@/constants/route_paths";
import { getAdjacentProjects, getProjectBySlug } from "@/content/projects";
import { siteConfig } from "@/content/site";
import {
  ProjectLinkKinds,
  type ProjectChallenge,
  type ProjectDecision,
  type ProjectLink,
} from "@/content/types";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import DiagramView from "@/views/ProjectDetail/components/DiagramView";
import S from "@/views/ProjectDetail/ProjectDetailPage.styles";
import { useCallback } from "react";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

const ROLE_SUMMARY_LIMIT = 4;

function GooglePlayIcon(): React.ReactNode {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
    </svg>
  );
}

function AppStoreIcon(): React.ReactNode {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
    </svg>
  );
}

function TvIcon(): React.ReactNode {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M21,17H3V5H21M21,3H3A2,2 0 0,0 1,5V17A2,2 0 0,0 3,19H8V21H16V19H21A2,2 0 0,0 23,17V5A2,2 0 0,0 21,3Z" />
    </svg>
  );
}

/** 링크 종류별 스토어 배지. kind가 없으면 일반 외부 링크로 표시한다. */
function StoreLinkBadge({ link }: { readonly link: ProjectLink }): React.ReactNode {
  return (
    <S.ExternalLink href={link.url} target="_blank" rel="noreferrer">
      {link.kind === ProjectLinkKinds.GOOGLE_PLAY && <GooglePlayIcon />}
      {link.kind === ProjectLinkKinds.APP_STORE && <AppStoreIcon />}
      {link.kind === ProjectLinkKinds.LG_APPS && <TvIcon />}
      {link.label}
      <span>↗</span>
    </S.ExternalLink>
  );
}

// 좌측 sticky 레이블 + 우측 본문의 공통 블록 골격.
// featured 블록(Key Challenge)만 패널로 승격한다.
function DetailBlock({
  label,
  featured = false,
  children,
}: {
  readonly label: string;
  readonly featured?: boolean;
  readonly children: React.ReactNode;
}): React.ReactNode {
  return (
    <S.Block>
      <S.BlockAside>
        <S.BlockLabel as="p">{label}</S.BlockLabel>
      </S.BlockAside>
      <S.BlockBody $featured={featured}>{children}</S.BlockBody>
    </S.Block>
  );
}

function ChallengeBlock({
  challenge,
}: {
  readonly challenge: ProjectChallenge;
}): React.ReactNode {
  return (
    <DetailBlock
      label={challenge.label}
      featured={challenge.label === 'Key Challenge'}
    >
      <S.BlockTitle>{challenge.title}</S.BlockTitle>
      <S.SubLabel>문제</S.SubLabel>
      <S.Paragraphs>
        {challenge.problem.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </S.Paragraphs>
      <S.SubLabel>접근</S.SubLabel>
      <S.BulletList>
        {challenge.approach.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </S.BulletList>
      {challenge.reasons && (
        <>
          <S.SubLabel>이유</S.SubLabel>
          <S.BulletList>
            {challenge.reasons.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </S.BulletList>
        </>
      )}
      {challenge.results.map((result) => (
        <S.ResultCallout key={result}>{result}</S.ResultCallout>
      ))}
    </DetailBlock>
  );
}

function DecisionBlock({
  decision,
}: {
  readonly decision: ProjectDecision;
}): React.ReactNode {
  return (
    <DetailBlock label={decision.label}>
      <S.BlockTitle>{decision.title}</S.BlockTitle>
      <S.Paragraphs>
        {decision.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </S.Paragraphs>
      {decision.diagram && <DiagramView diagram={decision.diagram} />}
    </DetailBlock>
  );
}

// 프로젝트 상세 (Case Study).
// 메인 페이지에서 다루지 않은 문제 해결 과정과 의사결정을 담는다.
export default function ProjectDetailPage(): React.ReactNode {
  const { projectSlug } = useParams();
  const project = projectSlug ? getProjectBySlug(projectSlug) : undefined;
  const navigate = useNavigate();
  const location = useLocation();

  useDocumentTitle(
    project
      ? `${project.name} · ${siteConfig.pageTitle}`
      : `${siteConfig.name} · ${siteConfig.role}`,
  );

  // 브라우저 뒤로가기와 동일하게 동작한다.
  // 히스토리 없이 직접 진입한 경우(location.key === 'default')에만 홈으로 보낸다.
  const goBack = useCallback(() => {
    if (location.key === "default") {
      void navigate(ROUTE_PATHS.ROOT);
    } else {
      void navigate(-1);
    }
  }, [location.key, navigate]);

  if (!project) {
    return <Navigate to={ROUTE_PATHS.NOT_FOUND} replace />;
  }

  const adjacent = getAdjacentProjects(project.slug);
  const [leadMedia, ...restGallery] = project.gallery;

  return (
    <>
      <S.TopBar>
        <S.TopBarInner>
          <S.BackLink type="button" onClick={goBack}>
            ← Back
          </S.BackLink>
          {/* 이력서 다운로드 기능은 당분간 사용하지 않는다.
          <S.ResumeLink
            href={siteConfig.resumeUrl}
            target="_blank"
            rel="noreferrer"
          >
            Resume ↗
          </S.ResumeLink>
          */}
        </S.TopBarInner>
      </S.TopBar>

      <S.Page>
        <S.Hero>
          <S.Eyebrow>
            {project.number} · {project.name}
          </S.Eyebrow>
          <S.Title>{project.title}</S.Title>
          <S.Summary>{project.summary}</S.Summary>
          {project.links && project.links.length > 0 && (
            <S.LinkRow>
              {project.links.map((link) => (
                <StoreLinkBadge key={link.url} link={link} />
              ))}
            </S.LinkRow>
          )}
          <S.MetaRow>
            <div>
              <dt>기간</dt>
              <dd>{project.period}</dd>
            </div>
            <div>
              <dt>팀</dt>
              <dd>{project.team}</dd>
            </div>
            <div>
              <dt>역할</dt>
              <dd>{project.myRole.slice(0, ROLE_SUMMARY_LIMIT).join(" · ")}</dd>
            </div>
            <div>
              <dt>기술</dt>
              <dd>{project.tech.join(" · ")}</dd>
            </div>
          </S.MetaRow>
        </S.Hero>

        <S.LeadMedia>
          <MediaPanel media={leadMedia} ratio="21 / 9" showCaption zoomable />
        </S.LeadMedia>

        <S.Body>
          <DetailBlock label="Background">
            <S.BulletList>
              {project.background.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </S.BulletList>
          </DetailBlock>

          <DetailBlock label="Role & Users">
            <S.RoleColumns>
              <div>
                <S.SubLabel>담당 범위</S.SubLabel>
                <S.ChipList>
                  {project.myRole.map((role) => (
                    <li key={role}>{role}</li>
                  ))}
                </S.ChipList>
              </div>
              <div>
                <S.SubLabel>사용자</S.SubLabel>
                <S.BulletList>
                  {project.users.map((user) => (
                    <li key={user}>{user}</li>
                  ))}
                </S.BulletList>
              </div>
            </S.RoleColumns>
          </DetailBlock>

          {project.challenges.map((challenge) => (
            <ChallengeBlock key={challenge.id} challenge={challenge} />
          ))}

          {project.decisions.map((decision) => (
            <DecisionBlock key={decision.id} decision={decision} />
          ))}

          <DetailBlock label="Outcome">
            <S.StatTable>
              {project.highlights.map((stat) => (
                <div key={stat.label}>
                  <dt>{stat.label}</dt>
                  <dd>
                    {stat.value}
                    {stat.note && <small>{stat.note}</small>}
                  </dd>
                </div>
              ))}
            </S.StatTable>
            <S.SubLabel>정리</S.SubLabel>
            <S.BulletList>
              {project.results.map((result) => (
                <li key={result}>{result}</li>
              ))}
            </S.BulletList>
          </DetailBlock>

          <DetailBlock label="Reflection">
            {project.reflection.items.length === 0 ? (
              <S.Paragraphs>
                <p>{project.reflection.note}</p>
              </S.Paragraphs>
            ) : (
              project.reflection.items.map((item) => (
                <div key={item.title}>
                  <S.SubLabel>{item.title}</S.SubLabel>
                  <S.BulletList>
                    {item.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </S.BulletList>
                </div>
              ))
            )}
          </DetailBlock>
        </S.Body>

        {restGallery.length > 0 && (
          <S.GalleryGrid>
            {restGallery.map((media) => (
              <MediaPanel key={media.alt} media={media} showCaption zoomable />
            ))}
          </S.GalleryGrid>
        )}

        {adjacent && (
          <S.PagerNav aria-label="다른 프로젝트">
            <S.PagerInner>
              <S.PagerLink to={buildProjectPath(adjacent.previous.slug)}>
                <span>이전</span>← {adjacent.previous.name}
              </S.PagerLink>
              <S.PagerLink to={buildProjectPath(adjacent.next.slug)}>
                <span>다음</span>
                {adjacent.next.name} →
              </S.PagerLink>
            </S.PagerInner>
          </S.PagerNav>
        )}
      </S.Page>
    </>
  );
}
