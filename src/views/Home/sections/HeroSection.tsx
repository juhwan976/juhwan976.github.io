import { lazy, Suspense } from 'react';
import Magnet from '@/components/Magnet/Magnet';
import { siteConfig } from '@/content/site';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import styles from './HeroSection.module.scss';

const HeroScene = lazy(() => import('@/three/HeroScene'));

/** 3D를 사용할 수 없는 환경을 위한 정적 노드-연결선 그래픽 */
function StaticWireframe(): React.ReactNode {
  return (
    <svg
      className={styles.staticWireframe}
      viewBox="0 0 480 480"
      aria-hidden="true"
      focusable="false"
    >
      <g stroke="rgba(255, 255, 255, 0.14)" strokeWidth="1" fill="none">
        <path d="M60 380 L160 300 L240 340 L330 220 L420 260" />
        <path d="M160 300 L200 160 L330 220" />
        <path d="M60 380 L200 160" />
        <path d="M240 340 L420 260" />
        <rect x="280" y="120" width="120" height="76" rx="4" />
        <rect x="90" y="120" width="88" height="56" rx="4" />
        <rect x="300" y="310" width="96" height="60" rx="4" />
      </g>
      <path
        d="M60 380 L160 300 L240 340 L330 220"
        stroke="#ff6a00"
        strokeWidth="1.5"
        fill="none"
      />
      <g fill="#18181c" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1">
        <circle cx="60" cy="380" r="5" />
        <circle cx="160" cy="300" r="5" />
        <circle cx="200" cy="160" r="5" />
        <circle cx="240" cy="340" r="5" />
        <circle cx="420" cy="260" r="5" />
      </g>
      <circle cx="330" cy="220" r="6" fill="#ff6a00" />
    </svg>
  );
}

export default function HeroSection(): React.ReactNode {
  const isTabletUp = useMediaQuery('(min-width: 768px)');
  const prefersReducedMotion = usePrefersReducedMotion();
  const { hero } = siteConfig;
  const use3d = isTabletUp && !prefersReducedMotion;

  return (
    <section className={styles.hero} aria-label="소개">
      {/* 텍스트 뒤를 관통하는 하나의 장면으로 렌더 */}
      <div className={styles.visual} aria-hidden="true">
        {use3d ? (
          <Suspense fallback={<StaticWireframe />}>
            <HeroScene />
          </Suspense>
        ) : (
          <StaticWireframe />
        )}
      </div>

      <div className={styles.stage}>
        <h1 className={styles.headline}>{hero.headline}</h1>
      </div>

      <div className={styles.edgeBottom}>
        <p className={styles.roles}>
          {hero.roles.map((role) => (
            <span key={role} className={styles.roleLine}>
              {role}
            </span>
          ))}
          <span className={styles.techLine}>{hero.techLine}</span>
        </p>
        <Magnet>
          <a href="#work" className={styles.cta}>
            {hero.cta}
            <span aria-hidden="true"> ↓</span>
          </a>
        </Magnet>
      </div>
    </section>
  );
}
