import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteConfig } from '@/content/site';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import type { ScrollStoryScene } from '@/content/types';
import { STORY_GRAPHICS } from './scrollStoryScenes';
import styles from './ScrollStorySection.module.scss';

gsap.registerPlugin(ScrollTrigger);

/** 장면당 스크롤 길이 (vh) */
const SCENE_SCROLL_VH = 130;

interface SceneContentProps {
  scene: ScrollStoryScene;
  index: number;
}

function SceneText({ scene, index }: SceneContentProps): React.ReactNode {
  return (
    <div className={styles.sceneText}>
      <p data-story-text className={styles.sceneLabel}>
        <span className={styles.sceneIndex}>
          {String(index + 1).padStart(2, '0')}
        </span>
        {scene.label}
      </p>
      <h3 data-story-text className={styles.sceneTitle}>
        {scene.title}
      </h3>
      <p data-story-text className={styles.sceneDescription}>
        {scene.description}
      </p>
    </div>
  );
}

/** 데스크톱/태블릿: 핀 고정 + 스크럽 스크롤텔링 */
function ScrubStory(): React.ReactNode {
  const rootRef = useRef<HTMLDivElement>(null);
  const scenes = siteConfig.scrollStory;

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const ctx = gsap.context(() => {
      // 선 그리기 준비: 전체 길이만큼 dash를 걸어둔다
      root
        .querySelectorAll<SVGGeometryElement>('[data-fx="draw"]')
        .forEach((element) => {
          const length = element.getTotalLength();
          element.style.strokeDasharray = `${length}`;
          element.style.strokeDashoffset = `${length}`;
        });

      const sceneElements = gsap.utils.toArray<HTMLElement>(
        '[data-scene]',
        root,
      );
      const total = sceneElements.length;
      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
        },
      });

      sceneElements.forEach((sceneElement, index) => {
        const at = index;
        const texts = sceneElement.querySelectorAll('[data-story-text]');
        const drops = sceneElement.querySelectorAll('[data-fx="drop"]');
        const fades = sceneElement.querySelectorAll('[data-fx="fade"]');
        const draws = sceneElement.querySelectorAll('[data-fx="draw"]');

        // 장면 등장 (첫 장면은 즉시 표시)
        if (index === 0) {
          gsap.set(sceneElement, { opacity: 1 });
        } else {
          gsap.set(sceneElement, { opacity: 0 });
          timeline.to(sceneElement, { opacity: 1, duration: 0.12 }, at);
        }

        if (texts.length > 0) {
          gsap.set(texts, { opacity: 0, y: 24 });
          timeline.to(
            texts,
            { opacity: 1, y: 0, duration: 0.18, stagger: 0.09 },
            at + (index === 0 ? 0.03 : 0.1),
          );
        }
        if (drops.length > 0) {
          gsap.set(drops, { opacity: 0, y: -72 });
          timeline.to(
            drops,
            { opacity: 1, y: 0, duration: 0.22, stagger: 0.045 },
            at + 0.08,
          );
        }
        if (draws.length > 0) {
          timeline.to(
            draws,
            { strokeDashoffset: 0, duration: 0.34, stagger: 0.05 },
            at + 0.08,
          );
        }
        if (fades.length > 0) {
          gsap.set(fades, { opacity: 0 });
          timeline.to(
            fades,
            { opacity: 1, duration: 0.16, stagger: 0.04 },
            at + 0.22,
          );
        }

        // 장면 퇴장 (마지막 장면은 유지)
        if (index < total - 1) {
          timeline.to(sceneElement, { opacity: 0, duration: 0.12 }, at + 0.86);
        }
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className={styles.scrub}
      style={{ height: `${scenes.length * SCENE_SCROLL_VH}vh` }}
    >
      <div className={styles.viewport}>
        {scenes.map((scene, index) => {
          const Graphic = STORY_GRAPHICS[scene.graphic];
          return (
            <div key={scene.id} data-scene className={styles.scene}>
              <div className={styles.sceneInner}>
                <SceneText scene={scene} index={index} />
                <div className={styles.sceneGraphic} aria-hidden="true">
                  <Graphic />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** 모바일/모션 감소: 장면을 세로로 나열하는 정적 버전 */
function StaticStory(): React.ReactNode {
  const scenes = siteConfig.scrollStory;

  return (
    <div className={styles.staticList}>
      {scenes.map((scene, index) => {
        const Graphic = STORY_GRAPHICS[scene.graphic];
        return (
          <div key={scene.id} className={styles.staticScene}>
            <div className={styles.staticGraphic} aria-hidden="true">
              <Graphic />
            </div>
            <SceneText scene={scene} index={index} />
          </div>
        );
      })}
    </div>
  );
}

export default function ScrollStorySection(): React.ReactNode {
  const prefersReducedMotion = usePrefersReducedMotion();
  const isTabletUp = useMediaQuery('(min-width: 768px)');
  const enableScrub = isTabletUp && !prefersReducedMotion;

  return (
    <section id="about" className={styles.section} aria-label="개발자 이야기">
      {enableScrub ? <ScrubStory /> : <StaticStory />}
    </section>
  );
}
