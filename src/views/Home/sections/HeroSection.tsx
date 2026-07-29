import { siteConfig } from "@/content/site";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { theme } from "@/styles/theme";
import S from "@/views/Home/sections/HeroSection.styles";
import { Suspense, lazy, useEffect } from "react";

// three.js 번들을 초기 로드에서 분리한다.
const HeroBackdrop = lazy(
  () => import("@/components/Backdrop/FerrofluidBackdrop"),
);

interface HeroSectionProps {
  /** 배경 셰이더 첫 프레임(모바일은 즉시) 시점에 호출 — 스플래시 해제용 */
  readonly onBackdropReady?: () => void;
}

// Hero — 이름, 직무, 확정 문구, Selected Work 링크만 표시한다.
// 3D 배경은 데스크톱에서만 렌더링한다.
export default function HeroSection({
  onBackdropReady,
}: HeroSectionProps): React.ReactNode {
  const isMobile = useMediaQuery("(max-width: 767px)");

  // 모바일은 배경을 렌더링하지 않으므로 즉시 준비 완료로 간주한다.
  useEffect(() => {
    if (isMobile) onBackdropReady?.();
  }, [isMobile, onBackdropReady]);

  return (
    <S.Section id="top" aria-label="소개">
      {!isMobile && (
        <S.Backdrop aria-hidden>
          <Suspense fallback={null}>
            <HeroBackdrop
              speed={0.05}
              shimmer={1.0}
              sharpness={3.0}
              mouseRadius={0.2}
              turbulence={0.2}
              colors={[theme.colors.accent]}
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
