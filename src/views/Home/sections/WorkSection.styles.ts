import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Section = styled.section`
  border-top: 1px solid ${({ theme }) => theme.colors.line};
`;

export const Head = styled.div`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding: ${({ theme }) =>
    `${theme.spacing.sectionY} ${theme.spacing.gutter} 0`};
`;

/** 프로젝트 하나가 하나의 큰 밴드를 차지한다. 01(3D 프로젝트)은 배경 톤이 전환된다. */
export const Band = styled.article<{ $tinted: boolean }>`
  background: ${({ $tinted, theme }) =>
    $tinted
      ? `linear-gradient(180deg, ${theme.colors.accentTint} 0%, transparent 70%)`
      : 'transparent'};
  transition: background 0.9s ease;
`;

/** 밴드마다 텍스트·미디어 좌우를 교차해 단조로운 반복을 깬다 */
export const BandInner = styled.div<{ $flip: boolean }>`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding: ${({ theme }) => `${theme.spacing.xxl} ${theme.spacing.gutter}`};
  display: grid;
  grid-template-columns: ${({ $flip }) =>
    $flip ? '7fr minmax(340px, 5fr)' : 'minmax(340px, 5fr) 7fr'};
  gap: ${({ theme }) => theme.spacing.xxl};
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.colors.line};

  ${({ $flip }) =>
    $flip &&
    `
    & > figure {
      order: -1;
    }
  `}

  ${({ theme }) => theme.media.tablet} {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.xl};

    /* 모바일·태블릿에서는 미디어가 먼저 보인다 */
    & > figure {
      order: -1;
    }
  }
`;

export const Number = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ theme }) => theme.colors.accent};
  letter-spacing: 0.1em;
`;

export const Name = styled.h3`
  margin-top: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.fontSizes.h3};
  font-weight: 700;
  letter-spacing: -0.01em;
  color: ${({ theme }) => theme.colors.text};
`;

export const Summary = styled.p`
  margin-top: ${({ theme }) => theme.spacing.sm};
  max-width: 460px;
  font-size: ${({ theme }) => theme.fontSizes.body};
  line-height: 1.75;
  color: ${({ theme }) => theme.colors.textDim};
`;

/** 이 프로젝트 안에서의 담당 구성 한 줄 */
export const RoleLine = styled.p`
  margin-top: ${({ theme }) => theme.spacing.lg};
  max-width: 460px;
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: 600;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.text};
`;

export const TechLine = styled.p`
  margin-top: ${({ theme }) => theme.spacing.lg};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.tiny};
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.colors.textFaint};
`;

export const CaseLink = styled(Link)`
  display: inline-block;
  margin-top: ${({ theme }) => theme.spacing.lg};
  padding-bottom: 6px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.accent};
  font-size: ${({ theme }) => theme.fontSizes.small};
  letter-spacing: 0.04em;
  transition: opacity 0.2s ease;

  ${({ theme }) => theme.media.hover} {
    &:hover {
      opacity: 0.75;
    }
  }
`;

const S = {
  Section,
  Head,
  Band,
  BandInner,
  Number,
  Name,
  Summary,
  RoleLine,
  TechLine,
  CaseLink,
} as const;

export default S;
