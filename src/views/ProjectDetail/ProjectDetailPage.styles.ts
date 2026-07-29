import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { SectionLabel } from '@/components/ui/primitives';

export const TopBar = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${({ theme }) => theme.zIndexes.header};
  background: color-mix(in srgb, ${({ theme }) => theme.colors.bg} 82%, transparent);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.line};
`;

export const TopBarInner = styled.div`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  height: ${({ theme }) => theme.layout.headerHeight};
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.gutter};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const BackLink = styled(Link)`
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ theme }) => theme.colors.textDim};
  transition: color 0.2s ease;

  ${({ theme }) => theme.media.hover} {
    &:hover {
      color: ${({ theme }) => theme.colors.text};
    }
  }
`;

export const ResumeLink = styled.a`
  font-size: ${({ theme }) => theme.fontSizes.label};
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};

  ${({ theme }) => theme.media.hover} {
    &:hover {
      opacity: 0.75;
    }
  }
`;

/** 페이지 진입 시 1회 fade — 모션 감소 환경에서는 즉시 표시 */
export const Page = styled.main`
  animation: detail-enter 0.4s ease both;

  @keyframes detail-enter {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const Hero = styled.section`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding: ${({ theme }) =>
    `calc(${theme.layout.headerHeight} + ${theme.spacing.xxl}) ${theme.spacing.gutter} ${theme.spacing.xl}`};
`;

export const Eyebrow = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.small};
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.accent};
`;

export const Title = styled.h1`
  margin-top: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSizes.h1};
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: -0.015em;
  white-space: pre-line;
  color: ${({ theme }) => theme.colors.text};
`;

export const Summary = styled.p`
  margin-top: ${({ theme }) => theme.spacing.md};
  max-width: ${({ theme }) => theme.layout.proseWidth};
  font-size: ${({ theme }) => theme.fontSizes.body};
  line-height: 1.75;
  color: ${({ theme }) => theme.colors.textDim};
`;

export const MetaRow = styled.dl`
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.line};
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xxl}`};

  div {
    min-width: 120px;
  }

  dt {
    font-size: ${({ theme }) => theme.fontSizes.tiny};
    color: ${({ theme }) => theme.colors.textFaint};
    margin-bottom: 2px;
  }

  dd {
    font-size: ${({ theme }) => theme.fontSizes.small};
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const LeadMedia = styled.div`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.gutter};
`;

/** 본문 — 좌측 sticky 레이블(220px) + 620px 콘텐츠 컬럼 */
export const Body = styled.div`
  max-width: calc(
    220px + ${({ theme }) => theme.spacing.xl} +
      ${({ theme }) => theme.layout.proseWidth} + 2 *
      ${({ theme }) => theme.spacing.gutter}
  );
  margin: 0 auto;
  padding: ${({ theme }) => `${theme.spacing.xxl} ${theme.spacing.gutter}`};
`;

// 섹션 구분은 헤어라인 대신 여백으로 만든다.
export const Block = styled.section`
  display: grid;
  grid-template-columns: 220px minmax(0, ${({ theme }) => theme.layout.proseWidth});
  column-gap: ${({ theme }) => theme.spacing.xl};
  align-items: start;

  & + & {
    margin-top: clamp(88px, 11vh, 128px);
  }

  ${({ theme }) => theme.media.tablet} {
    grid-template-columns: 1fr;
    row-gap: ${({ theme }) => theme.spacing.md};

    & + & {
      margin-top: ${({ theme }) => theme.spacing.xxl};
    }
  }
`;

/** 스크롤하는 동안 현재 섹션 레이블이 좌측에 고정된다 */
export const BlockAside = styled.div`
  position: sticky;
  top: calc(
    ${({ theme }) => theme.layout.headerHeight} +
      ${({ theme }) => theme.spacing.lg}
  );

  ${({ theme }) => theme.media.tablet} {
    position: static;
  }
`;

/** 핵심 블록(Key Challenge)만 패널로 승격한다 */
export const BlockBody = styled.div<{ $featured: boolean }>`
  ${({ $featured, theme }) =>
    $featured &&
    css`
      background: ${theme.colors.panel};
      border: 1px solid ${theme.colors.line};
      padding: ${theme.spacing.xl};

      ${theme.media.mobile} {
        padding: ${theme.spacing.lg};
      }
    `}
`;

export const BlockLabel = styled(SectionLabel)``;

export const BlockTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.h2};
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: -0.015em;
  white-space: pre-line;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const Paragraphs = styled.div`
  p {
    font-size: ${({ theme }) => theme.fontSizes.body};
    line-height: 1.85;
    white-space: pre-line;
    color: ${({ theme }) => theme.colors.textDim};

    & + p {
      margin-top: ${({ theme }) => theme.spacing.sm};
    }
  }
`;

export const SubLabel = styled.h3`
  margin: ${({ theme }) => `${theme.spacing.lg} 0 ${theme.spacing.xs}`};
  font-size: ${({ theme }) => theme.fontSizes.tiny};
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textFaint};
`;

export const BulletList = styled.ul`
  li {
    position: relative;
    padding-left: 16px;
    font-size: ${({ theme }) => theme.fontSizes.body};
    line-height: 1.85;
    color: ${({ theme }) => theme.colors.textDim};

    &::before {
      content: '·';
      position: absolute;
      left: 0;
      color: ${({ theme }) => theme.colors.accent};
    }
  }
`;

/** Challenge 결과 강조 문구 */
export const ResultCallout = styled.p`
  margin-top: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  border-left: 2px solid ${({ theme }) => theme.colors.accent};
  background: ${({ theme }) => theme.colors.accentSoft};
  font-size: ${({ theme }) => theme.fontSizes.bodyLg};
  font-weight: 700;
  line-height: 1.6;
  white-space: pre-line;
  color: ${({ theme }) => theme.colors.text};
`;

/** 헤어라인 없는 2컬럼 스탯 그리드 — 라벨 위, 수치 아래 */
export const StatTable = styled.dl`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => `${theme.spacing.xl} ${theme.spacing.lg}`};

  dt {
    font-size: ${({ theme }) => theme.fontSizes.small};
    color: ${({ theme }) => theme.colors.textDim};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }

  dd {
    font-size: ${({ theme }) => theme.fontSizes.h3};
    font-weight: 700;
    line-height: 1.3;
    color: ${({ theme }) => theme.colors.text};

    small {
      display: block;
      margin-top: ${({ theme }) => theme.spacing.xs};
      font-size: ${({ theme }) => theme.fontSizes.tiny};
      font-weight: 400;
      color: ${({ theme }) => theme.colors.textFaint};
    }
  }

  ${({ theme }) => theme.media.mobile} {
    grid-template-columns: 1fr;
  }
`;

/** 담당 범위 칩 — 긴 나열을 불릿 벽 대신 칩으로 흘린다 */
export const ChipList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};

  li {
    padding: 5px 12px;
    border: 1px solid ${({ theme }) => theme.colors.line};
    font-size: ${({ theme }) => theme.fontSizes.small};
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.textDim};
    white-space: nowrap;
  }
`;

export const RoleColumns = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.xl};

  ${({ theme }) => theme.media.mobile} {
    grid-template-columns: 1fr;
  }
`;

export const GalleryGrid = styled.div`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding: ${({ theme }) => `0 ${theme.spacing.gutter} ${theme.spacing.xxl}`};
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.lg};

  ${({ theme }) => theme.media.mobile} {
    grid-template-columns: 1fr;
  }
`;

export const PagerNav = styled.nav`
  border-top: 1px solid ${({ theme }) => theme.colors.line};
`;

export const PagerInner = styled.div`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding: ${({ theme }) => `${theme.spacing.xl} ${theme.spacing.gutter}`};
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const PagerLink = styled(Link)`
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ theme }) => theme.colors.textDim};
  transition: color 0.2s ease;

  span {
    display: block;
    font-size: ${({ theme }) => theme.fontSizes.tiny};
    color: ${({ theme }) => theme.colors.textFaint};
    margin-bottom: 2px;
  }

  &:last-child {
    text-align: right;
  }

  ${({ theme }) => theme.media.hover} {
    &:hover {
      color: ${({ theme }) => theme.colors.text};
    }
  }
`;

const S = {
  TopBar,
  TopBarInner,
  BackLink,
  ResumeLink,
  Page,
  Hero,
  Eyebrow,
  Title,
  Summary,
  MetaRow,
  LeadMedia,
  Body,
  Block,
  BlockAside,
  BlockBody,
  BlockLabel,
  BlockTitle,
  ChipList,
  Paragraphs,
  SubLabel,
  BulletList,
  ResultCallout,
  StatTable,
  RoleColumns,
  GalleryGrid,
  PagerNav,
  PagerInner,
  PagerLink,
} as const;

export default S;
