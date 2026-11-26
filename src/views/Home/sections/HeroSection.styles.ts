import styled from 'styled-components';
import { SectionLabel, ThinLink } from '@/components/ui/primitives';

export const Section = styled.section`
  position: relative;
  min-height: 100svh;
  display: flex;
  align-items: center;
  overflow: hidden;
`;

export const Backdrop = styled.div`
  position: absolute;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndexes.backdrop};
  pointer-events: none;

  // 한 번 만든 캔버스는 작은 창에서 숨기고, 다시 넓어지면 그대로 사용한다.
  @media ${({ theme }) => theme.mediaQueries.mobile}, ${({ theme }) => theme.mediaQueries.reducedMotion} {
    display: none;
  }

  /* 텍스트 가독성 스크림 — 헤드라인 영역 뒤로만 은은하게 어두워진다 */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(
      ellipse 52% 62% at 27% 54%,
      color-mix(in srgb, ${({ theme }) => theme.colors.bg} 68%, transparent),
      transparent 72%
    );
  }
`;

export const Inner = styled.div`
  position: relative;
  z-index: ${({ theme }) => theme.zIndexes.content};
  width: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding: ${({ theme }) =>
    `calc(${theme.layout.headerHeight} + ${theme.spacing.xxl}) ${theme.spacing.gutter} ${theme.spacing.xxl}`};
`;

export const RoleLabel = styled(SectionLabel)`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.textDim};
`;

export const Headline = styled.h1`
  max-inline-size: 15em;
  font-size: ${({ theme }) => theme.fontSizes.display};
  font-weight: 700;
  line-height: 1.22;
  letter-spacing: -0.015em;
  text-wrap: balance;
  color: ${({ theme }) => theme.colors.text};
`;

export const Description = styled.p`
  margin-top: ${({ theme }) => theme.spacing.lg};
  max-width: ${({ theme }) => theme.layout.proseWidth};
  font-size: ${({ theme }) => theme.fontSizes.bodyLg};
  line-height: 1.8;
  text-wrap: pretty;
  color: ${({ theme }) => theme.colors.textDim};
`;

export const Cta = styled(ThinLink)`
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const S = {
  Section,
  Backdrop,
  Inner,
  RoleLabel,
  Headline,
  Description,
  Cta,
} as const;

export default S;
