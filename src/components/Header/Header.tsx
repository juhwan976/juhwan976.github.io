import { useEffect, useState } from 'react';
import { Link, matchPath, useLocation } from 'react-router-dom';
import { buildProjectPath, ROUTE_PATHS } from '@/constants/route_paths';
import { getAdjacentProjects, getProjectBySlug } from '@/content/projects';
import { siteConfig } from '@/content/site';
import styles from './Header.module.scss';

interface PillLabelProps {
  label: string;
}

/** 호버 시 라벨이 위로 플립되는 이중 라벨 (React Bits Pill Nav 방식) */
function PillLabel({ label }: PillLabelProps): React.ReactNode {
  return (
    <span className={styles.pillStack}>
      <span className={styles.pillLabel}>{label}</span>
      <span className={styles.pillLabelHover} aria-hidden="true">
        {label}
      </span>
    </span>
  );
}

/** 홈에서는 섹션 내비게이션, 프로젝트 상세에서는 이전/다음 이동을 제공한다. */
export default function Header(): React.ReactNode {
  const location = useLocation();
  const detailMatch = matchPath(ROUTE_PATHS.PROJECT_DETAIL, location.pathname);
  const projectSlug = detailMatch?.params.projectSlug;
  const currentProject = projectSlug ? getProjectBySlug(projectSlug) : undefined;
  const adjacent = projectSlug ? getAdjacentProjects(projectSlug) : undefined;
  const isDetail = Boolean(currentProject);

  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    if (isDetail) {
      return;
    }
    const elements = siteConfig.nav
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => element !== null);
    if (elements.length === 0) {
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: '-30% 0px -60% 0px' },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [isDetail, location.pathname]);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to={ROUTE_PATHS.ROOT} className={styles.identity}>
          <span className={styles.name}>{siteConfig.name}</span>
          <span className={styles.role}>{siteConfig.role}</span>
        </Link>

        {isDetail && adjacent && currentProject ? (
          <nav className={styles.nav} aria-label="프로젝트 내비게이션">
            <Link
              to={ROUTE_PATHS.ROOT}
              className={styles.navLink}
              aria-label="홈으로 돌아가기"
            >
              <PillLabel label="← Home" />
            </Link>
            <Link
              to={buildProjectPath(adjacent.previous.slug)}
              className={styles.navLink}
              aria-label={`이전 프로젝트: ${adjacent.previous.name}`}
            >
              <PillLabel label="Prev" />
            </Link>
            <Link
              to={buildProjectPath(adjacent.next.slug)}
              className={styles.navLink}
              aria-label={`다음 프로젝트: ${adjacent.next.name}`}
            >
              <PillLabel label="Next" />
            </Link>
          </nav>
        ) : (
          <nav className={styles.nav} aria-label="섹션 내비게이션">
            {siteConfig.nav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={
                  activeSection === item.id
                    ? `${styles.navLink} ${styles.navLinkActive}`
                    : styles.navLink
                }
                aria-current={activeSection === item.id ? 'true' : undefined}
              >
                <PillLabel label={item.label} />
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
