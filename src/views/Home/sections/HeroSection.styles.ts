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
  font-size: ${({ theme }) => theme.fontSizes.display};
  font-weight: 700;
  line-height: 1.22;
  letter-spacing: -0.015em;
  white-space: pre-line;
  color: ${({ theme }) => theme.colors.text};

  ${({ theme }) => theme.media.mobile} {
    white-space: normal;
  }
`;

export const Description = styled.p`
  margin-top: ${({ theme }) => theme.spacing.lg};
  max-width: ${({ theme }) => theme.layout.proseWidth};
  font-size: ${({ theme }) => theme.fontSizes.bodyLg};
  line-height: 1.8;
  white-space: pre-line;
  color: ${({ theme }) => theme.colors.textDim};

  ${({ theme }) => theme.media.mobile} {
    white-space: normal;
  }
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
