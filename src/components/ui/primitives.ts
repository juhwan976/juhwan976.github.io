import styled from 'styled-components';

/** 섹션 공통 셸 — 전체 폭을 쓰되 maxWidth와 비례 여백을 유지한다. */
export const SectionShell = styled.section`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding: ${({ theme }) => `${theme.spacing.sectionY} ${theme.spacing.gutter}`};
`;

/** 소형 대문자 섹션 라벨 */
export const SectionLabel = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.label};
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textFaint};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

/** 본문 컬럼 — 읽는 텍스트는 이 폭을 넘지 않는다. */
export const Prose = styled.div`
  max-width: ${({ theme }) => theme.layout.proseWidth};
  font-size: ${({ theme }) => theme.fontSizes.body};
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.textDim};
`;

/** 밑줄 하나로 끝나는 얇은 텍스트 링크 */
export const ThinLink = styled.a`
  display: inline-block;
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

/** 얇은 구분선 */
export const HairLine = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.line};
`;
