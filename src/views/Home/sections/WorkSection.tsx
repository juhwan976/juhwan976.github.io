import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Magnet from '@/components/Magnet/Magnet';
import { buildProjectPath } from '@/constants/route_paths';
import { projects } from '@/content/projects';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { WORK_SCENE_GRAPHICS, WORK_SCENE_TINTS } from './workScenes';
import styles from './WorkSection.module.scss';

gsap.registerPlugin(ScrollTrigger);

// 프로젝트 1개 = 풀스크린 장면 1개.
// 스크롤 진입 시 섹션 배경이 장면 틴트로 전환되고,
// 제목은 마스크 reveal, 그래픽은 느린 패럴랙스로 움직인다.
export default function WorkSection(): React.ReactNode {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isTabletUp = useMediaQuery('(min-width: 768px)');
  const enableMotion = isTabletUp && !prefersReducedMotion;

  useLayoutEffect(() => {
    if (!enableMotion) {
      return;
    }
    const section = sectionRef.current;
    if (!section) {
      return;
    }

    const ctx = gsap.context(() => {
      const scenes = gsap.utils.toArray<HTMLElement>('[data-work-scene]', section);

      scenes.forEach((scene) => {
        const tint = scene.dataset.tint ?? 'var(--scene-bg-base)';

        // 장면 진입 시 섹션 배경 틴트 전환
        ScrollTrigger.create({
          trigger: scene,
          start: 'top 55%',
          end: 'bottom 45%',
          onToggle: (self) => {
            if (self.isActive) {
              gsap.to(section, {
                backgroundColor: tint,
                duration: 0.8,
                ease: 'power2.out',
                overwrite: 'auto',
              });
            }
          },
        });

        // 제목 마스크 reveal (1회)
        const title = scene.querySelector('[data-work-title]');
        if (title) {
          gsap.fromTo(
            title,
            { clipPath: 'inset(0 0 100% 0)', y: 40 },
            {
              clipPath: 'inset(0 0 0% 0)',
              y: 0,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: { trigger: scene, start: 'top 62%', once: true },
            },
          );
        }

        // 그래픽 패럴랙스 — 장면보다 느리게 이동
        const graphic = scene.querySelector('[data-work-graphic]');
        if (graphic) {
          gsap.fromTo(
            graphic,
            { yPercent: 10 },
            {
              yPercent: -10,
              ease: 'none',
              scrollTrigger: {
                trigger: scene,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.8,
              },
            },
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, [enableMotion]);

  return (
    <section
      ref={sectionRef}
      id="work"
      className={styles.section}
      aria-label="대표 프로젝트"
    >
      <header className={styles.heading}>
        <p className={styles.headingEyebrow}>Selected Work</p>
      </header>

      {projects.map((project) => {
        const Graphic = WORK_SCENE_GRAPHICS[project.scene.theme];
        return (
          <article
            key={project.slug}
            data-work-scene
            data-tint={WORK_SCENE_TINTS[project.scene.theme]}
            className={styles.scene}
          >
            <div className={styles.sceneGraphic} data-work-graphic aria-hidden="true">
              <Graphic />
            </div>

            <p className={styles.sceneNumber}>
              {project.number}
              <span className={styles.sceneName}>{project.name}</span>
            </p>

            <h3 data-work-title className={styles.sceneTitle}>
              {project.scene.title}
            </h3>

            <div className={styles.sceneFooter}>
              <div className={styles.sceneInfo}>
                <p className={styles.sceneSummary}>{project.scene.summary}</p>
                <ul className={styles.sceneStats} aria-label="핵심 수치">
                  {project.scene.stats.map((stat) => (
                    <li key={stat} className={styles.sceneStat}>
                      {stat}
                    </li>
                  ))}
                </ul>
                <Magnet>
                  <Link
                    to={buildProjectPath(project.slug)}
                    className={styles.sceneCta}
                  >
                    View Case Study
                    <span aria-hidden="true"> →</span>
                  </Link>
                </Magnet>
              </div>
              <p className={styles.sceneTech}>
                {project.scene.coreTech.join(' · ')}
              </p>
            </div>
          </article>
        );
      })}
    </section>
  );
}
