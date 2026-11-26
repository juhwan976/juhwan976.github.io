import { siteConfig } from "@/content/site";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { theme } from "@/styles/theme";
import S from "@/views/Home/sections/HeroSection.styles";
import { Suspense, lazy, useEffect, useState } from "react";

// WebGL(ogl) 셰이더 번들을 초기 로드에서 분리한다.
const HeroBackdrop = lazy(
  () => import("@/components/Backdrop/FerrofluidBackdrop"),
);
const BACKDROP_COLORS = [theme.colors.accent];

// 콘텐츠 첫 페인트가 끝난 뒤에만 배경 청크 로드를 시작한다.
// (프리렌더된 텍스트가 3D 번들 다운로드에 밀리지 않도록)
function useAfterFirstPaint(enabled: boolean): boolean {
  const [painted, setPainted] = useState(false);

  useEffect(() => {
    if (!enabled || painted) return;
    let secondFrame = 0;
    const firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => setPainted(true));
    });
    return () => {
      cancelAnimationFrame(firstFrame);
      cancelAnimationFrame(secondFrame);
    };
  }, [enabled, painted]);

  return painted;
}

interface HeroSectionProps {
  /** 첫 배경 프레임 또는 배경을 생략하는 시점에 호출 */
  readonly onBackdropReady?: () => void;
}

// Hero — 이름, 직무, 확정 문구, Selected Work 링크만 표시한다.
// 3D 배경은 데스크톱에서만 렌더링한다.
export default function HeroSection({
  onBackdropReady,
}: HeroSectionProps): React.ReactNode {
  const isMobile = useMediaQuery(theme.mediaQueries.mobile);
  const prefersReducedMotion = usePrefersReducedMotion();
  const wantsBackdrop = !isMobile && !prefersReducedMotion;
  const canLoadBackdrop = useAfterFirstPaint(wantsBackdrop);

  useEffect(() => {
    if (!wantsBackdrop) onBackdropReady?.();
  }, [wantsBackdrop, onBackdropReady]);

  return (
    <S.Section id="top" aria-label="소개">
      {canLoadBackdrop && (
        <S.Backdrop aria-hidden>
          <Suspense fallback={null}>
            <HeroBackdrop
              speed={0.025}
              shimmer={1.0}
              sharpness={3.5}
              mouseRadius={0.2}
              turbulence={0.2}
              colors={BACKDROP_COLORS}
              onFirstFrame={onBackdropReady}
            />
          </Suspense>
        </S.Backdrop>
      )}
      <S.Inner>
        <S.RoleLabel as="p">{siteConfig.role}</S.RoleLabel>
        <S.Headline>{siteConfig.hero.headline}</S.Headline>
        <S.Description>{siteConfig.hero.description}</S.Description>
        <S.Cta href="#work">{siteConfig.hero.cta} ↓</S.Cta>
      </S.Inner>
    </S.Section>
  );
}
