import styled from 'styled-components';

// 미디어 프레임과 같은 재질(media) — 패널(핵심 블록 승격)과 구분한다.
export const Wrap = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg};
  border: 1px solid ${({ theme }) => theme.colors.line};
  background: ${({ theme }) => theme.colors.media};
  padding: ${({ theme }) => theme.spacing.lg};
`;

export const Title = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.tiny};
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textFaint};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const FlowList = styled.ol`
  display: flex;
  align-items: stretch;
  gap: ${({ theme }) => theme.spacing.sm};

  ${({ theme }) => theme.media.mobile} {
    flex-direction: column;
  }
`;

/** 진입 시 순차적으로 나타나는 흐름 단계 */
export const FlowStep = styled.li<{ $visible: boolean; $index: number }>`
  flex: 1;
  position: relative;
  border: 1px solid ${({ theme }) => theme.colors.lineStrong};
  padding: ${({ theme }) => theme.spacing.md};
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: translateY(${({ $visible }) => ($visible ? '0' : '10px')});
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;
  transition-delay: ${({ $index }) => $index * 0.15}s;

  h4 {
    font-size: ${({ theme }) => theme.fontSizes.small};
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
  }

  p {
    margin-top: 4px;
    font-size: ${({ theme }) => theme.fontSizes.tiny};
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.textDim};
  }

  /* 단계 사이 화살표 */
  &:not(:last-child)::after {
    content: '→';
    position: absolute;
    right: -14px;
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.colors.accent};
    font-size: ${({ theme }) => theme.fontSizes.small};
    z-index: ${({ theme }) => theme.zIndexes.content};
  }

  ${({ theme }) => theme.media.mobile} {
    &:not(:last-child)::after {
      content: '↓';
      right: auto;
      left: 50%;
      top: auto;
      bottom: -16px;
      transform: translateX(-50%);
    }
  }
`;

export const SplitGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.sm};

  ${({ theme }) => theme.media.mobile} {
    grid-template-columns: 1fr;
  }
`;

export const SplitPanel = styled.div<{ $visible: boolean; $index: number }>`
  border: 1px solid ${({ theme }) => theme.colors.lineStrong};
  padding: ${({ theme }) => theme.spacing.md};
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: translateY(${({ $visible }) => ($visible ? '0' : '10px')});
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;
  transition-delay: ${({ $index }) => $index * 0.15}s;

  h4 {
    font-size: ${({ theme }) => theme.fontSizes.small};
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }

  li {
    position: relative;
    padding-left: 13px;
    font-size: ${({ theme }) => theme.fontSizes.tiny};
    line-height: 1.9;
    color: ${({ theme }) => theme.colors.textDim};

    &::before {
      content: '·';
      position: absolute;
      left: 0;
      color: ${({ theme }) => theme.colors.accent};
    }
  }
`;

const S = {
  Wrap,
  Title,
  FlowList,
  FlowStep,
  SplitGrid,
  SplitPanel,
} as const;

export default S;
