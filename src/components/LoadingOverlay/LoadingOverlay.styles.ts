import styled from 'styled-components';

export const Overlay = styled.div<{ $leaving: boolean }>`
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndexes.overlay};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.bg};
  opacity: ${({ $leaving }) => ($leaving ? 0 : 1)};
  pointer-events: ${({ $leaving }) => ($leaving ? 'none' : 'auto')};
  transition: opacity 0.45s ease;

  ${({ theme }) => theme.media.reducedMotion} {
    transition: none;
  }
`;

export const MarkFrame = styled.div`
  position: relative;
  width: 72px;
  height: 72px;
`;

/** 마크 실루엣 — 채워지기 전 상태 */
export const MarkBase = styled.div`
  position: absolute;
  inset: 0;

  svg {
    display: block;
    width: 100%;
    height: 100%;
    fill: ${({ theme }) => theme.colors.line};
  }
`;

/** 진행률만큼 아래에서 위로 드러나는 채움 레이어 */
export const MarkFill = styled.div`
  position: absolute;
  inset: 0;

  svg {
    display: block;
    width: 100%;
    height: 100%;
    fill: ${({ theme }) => theme.colors.accent};
  }
`;

export const Percent = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.tiny};
  letter-spacing: 0.14em;
  color: ${({ theme }) => theme.colors.textFaint};
`;

const S = {
  Overlay,
  MarkFrame,
  MarkBase,
  MarkFill,
  Percent,
} as const;

export default S;
