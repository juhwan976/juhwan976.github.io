import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteConfig } from '@/content/site';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import styles from './PrinciplesSection.module.scss';

gsap.registerPlugin(ScrollTrigger);

// 원칙 하나가 하나의 큰 문장으로 등장한다.
// 좌/우 번갈아 배치해 비대칭 리듬을 만들고, 설명은 한 줄만 곁들인다.
export default function PrinciplesSection(): React.ReactNode {
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
      gsap
        .utils.toArray<HTMLElement>('[data-principle]', section)
        .forEach((item) => {
          const statement = item.querySelector('[data-principle-statement]');
          if (!statement) {
            return;
          }
          gsap.fromTo(
            statement,
            { clipPath: 'inset(0 0 100% 0)', y: 48 },
            {
              clipPath: 'inset(0 0 0% 0)',
              y: 0,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: { trigger: item, start: 'top 68%', once: true },
            },
          );
        });
    }, section);

    return () => ctx.revert();
  }, [enableMotion]);

  return (
    <section
      ref={sectionRef}
      id="principles"
      className={styles.section}
      aria-label="개발 원칙"
    >
      <p className={styles.eyebrow}>{siteConfig.principlesTitle}</p>

      <ol className={styles.list}>
        {siteConfig.principles.map((principle, index) => (
          <li
            key={principle.id}
            data-principle
            className={index % 2 === 1 ? styles.itemEnd : styles.item}
          >
            <p className={styles.itemLabel}>
              <span className={styles.itemIndex}>
                {String(index + 1).padStart(2, '0')}
              </span>
              {principle.label}
            </p>
            <h3 data-principle-statement className={styles.itemStatement}>
              {principle.title}
            </h3>
            <p className={styles.itemDescription}>{principle.description}</p>
          </li>
        ))}
      </ol>

      <p className={styles.footnote}>{siteConfig.principlesFootnote}</p>
    </section>
  );
}
