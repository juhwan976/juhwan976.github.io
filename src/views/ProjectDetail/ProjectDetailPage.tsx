import { Link, Navigate, useParams } from 'react-router-dom';
import MediaFrame from '@/components/MediaFrame/MediaFrame';
import { buildProjectPath, ROUTE_PATHS } from '@/constants/route_paths';
import { getAdjacentProjects, getProjectBySlug } from '@/content/projects';
import { siteConfig } from '@/content/site';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import DiagramView from '@/views/ProjectDetail/components/DiagramView';
import styles from './ProjectDetailPage.module.scss';

interface SectionLabelProps {
  children: string;
}

function SectionLabel({ children }: SectionLabelProps): React.ReactNode {
  return <h2 className={styles.sectionLabel}>{children}</h2>;
}

export default function ProjectDetailPage(): React.ReactNode {
  const { projectSlug } = useParams();
  const project = projectSlug ? getProjectBySlug(projectSlug) : undefined;
  const adjacent = projectSlug ? getAdjacentProjects(projectSlug) : undefined;

  useDocumentTitle(
    project ? `${project.name} — ${siteConfig.name}` : siteConfig.name,
  );

  if (!project || !adjacent) {
    return <Navigate to={ROUTE_PATHS.NOT_FOUND} replace />;
  }

  const keyChallenge = project.challenges[0];

  // 미디어 배치: 대표 화면은 Context, Before/After는 Key Challenge,
  // 나머지는 Visuals 그리드에 배치한다.
  const contextMedia = project.gallery[0];
  const challengeMedia = project.gallery.find(
    (media) =>
      media !== contextMedia && media.placeholderLabel?.includes('Before'),
  );
  const remainingMedia = project.gallery.filter(
    (media) => media !== contextMedia && media !== challengeMedia,
  );

  return (
    <main id="main" className={styles.root}>
      {/* 1. Project Hero — 풀블리드 장면 */}
      <header className={styles.hero}>
        <p className={styles.heroNumber}>
          {project.number}
          <span className={styles.heroName}>{project.name}</span>
        </p>
        <h1 className={styles.heroTitle}>{project.scene.title}</h1>
        <div className={styles.heroFooter}>
          <div className={styles.heroInfo}>
            <p className={styles.heroSummary}>{project.scene.summary}</p>
            <ul className={styles.heroStats} aria-label="핵심 수치">
              {project.scene.stats.map((stat) => (
                <li key={stat} className={styles.heroStat}>
                  {stat}
                </li>
              ))}
            </ul>
          </div>
          <p className={styles.heroMeta}>
            <span>{project.period}</span>
            <span>{project.team}</span>
            <span>{project.scene.coreTech.join(' · ')}</span>
          </p>
        </div>
      </header>

      {/* 2. Context */}
      <section className={styles.section} aria-label="배경">
        <SectionLabel>Context</SectionLabel>
        <div className={styles.contextSplit}>
          <div className={styles.contextBody}>
            <ul className={styles.contextList}>
              {project.background.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className={styles.roleLine}>
              Role — {project.myRole.join(' · ')}
            </p>
          </div>
          {contextMedia ? (
            <div className={styles.contextMedia}>
              <MediaFrame media={contextMedia} ratio="4 / 3" />
            </div>
          ) : null}
        </div>
      </section>

      {/* 3. Key Challenge — 대표 문제 하나만 크게 */}
      {keyChallenge ? (
        <section className={styles.challenge} aria-label="핵심 과제">
          <SectionLabel>Key Challenge</SectionLabel>
          <h3 className={styles.challengeTitle}>{keyChallenge.title}</h3>
          <p className={styles.challengeProblem}>{keyChallenge.problem[0]}</p>
          <div className={styles.challengeSplit}>
            <div className={styles.challengeApproach}>
              <p className={styles.splitLabel}>Approach</p>
              <ul className={styles.splitList}>
                {keyChallenge.approach.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <p className={styles.challengeResult}>{keyChallenge.results[0]}</p>
          </div>
          {challengeMedia ? (
            <div className={styles.challengeMedia}>
              <MediaFrame media={challengeMedia} ratio="21 / 9" />
            </div>
          ) : null}
        </section>
      ) : null}

      {/* 4. Key Decisions */}
      <section className={styles.section} aria-label="설계 결정">
        <SectionLabel>Key Decisions</SectionLabel>
        <div className={styles.decisionList}>
          {project.decisions.map((decision) => (
            <article key={decision.id} className={styles.decision}>
              <h3 className={styles.decisionTitle}>{decision.title}</h3>
              <div className={styles.decisionBody}>
                {decision.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              {decision.diagram ? (
                <DiagramView diagram={decision.diagram} />
              ) : null}
            </article>
          ))}
        </div>
      </section>

      {/* 5. Results — 큰 수치 중심 + 보조 성과 */}
      <section className={styles.section} aria-label="결과">
        <SectionLabel>Results</SectionLabel>
        <dl className={styles.resultGrid}>
          {project.highlights.slice(0, 3).map((stat) => (
            <div key={stat.label} className={styles.resultItem}>
              <dt className={styles.resultLabel}>{stat.label}</dt>
              <dd className={styles.resultValue}>{stat.value}</dd>
              {stat.note ? (
                <dd className={styles.resultNote}>{stat.note}</dd>
              ) : null}
            </div>
          ))}
        </dl>
        <ul className={styles.resultProse}>
          {project.results.slice(0, 4).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      {/* Visuals — 나머지 화면·다이어그램 미디어 */}
      {remainingMedia.length > 0 ? (
        <section className={styles.section} aria-label="화면과 자료">
          <SectionLabel>Visuals</SectionLabel>
          <div className={styles.visualGrid}>
            {remainingMedia.map((media) => (
              <MediaFrame key={media.alt} media={media} />
            ))}
          </div>
        </section>
      ) : null}

      {/* 6. Reflection */}
      <section className={styles.section} aria-label="회고">
        <SectionLabel>Reflection</SectionLabel>
        {project.reflection.note ? (
          <p className={styles.reflectionNote}>{project.reflection.note}</p>
        ) : null}
        {project.reflection.items.length > 0 ? (
          <div className={styles.reflectionGrid}>
            {project.reflection.items.map((item) => (
              <div key={item.title} className={styles.reflectionItem}>
                <h3 className={styles.reflectionTitle}>{item.title}</h3>
                <ul className={styles.reflectionList}>
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : null}
      </section>

      {/* Next Project */}
      <nav className={styles.nextNav} aria-label="다른 프로젝트">
        <Link
          to={buildProjectPath(adjacent.previous.slug)}
          className={styles.nextLink}
        >
          <span className={styles.nextDirection}>← Previous</span>
          <span className={styles.nextName}>
            {adjacent.previous.number} — {adjacent.previous.name}
          </span>
        </Link>
        <Link
          to={buildProjectPath(adjacent.next.slug)}
          className={`${styles.nextLink} ${styles.nextLinkEnd}`}
        >
          <span className={styles.nextDirection}>Next →</span>
          <span className={styles.nextName}>
            {adjacent.next.number} — {adjacent.next.name}
          </span>
        </Link>
      </nav>
    </main>
  );
}
