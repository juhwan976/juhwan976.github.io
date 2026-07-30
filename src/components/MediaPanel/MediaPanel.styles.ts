import styled, { css } from 'styled-components';

export const Figure = styled.figure`
  margin: 0;
`;

export const Frame = styled.div<{ $revealed: boolean; $ratio: string }>`
  position: relative;
  overflow: hidden;
  aspect-ratio: ${({ $ratio }) => $ratio};
  background: ${({ theme }) => theme.colors.media};
  border: 1px solid ${({ theme }) => theme.colors.line};

  /* mask reveal — 진입 시 1회만 동작하고, 모션 감소 환경에서는 즉시 최종 상태가 된다. */
  clip-path: ${({ $revealed }) =>
    $revealed ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)'};
  transition: clip-path 0.9s cubic-bezier(0.65, 0, 0.35, 1);

  img,
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: ${({ $revealed }) => ($revealed ? 'scale(1)' : 'scale(1.05)')};
    transition: transform 1.1s cubic-bezier(0.65, 0, 0.35, 1);
  }
`;

/** 클릭하면 확대 뷰어가 열리는 이미지 래퍼 */
export const ZoomTrigger = styled.button`
  display: block;
  width: 100%;
  height: 100%;
  padding: 0;
  cursor: zoom-in;
`;

export const Placeholder = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ theme }) => css`
    background:
      linear-gradient(
        135deg,
        transparent 49.7%,
        ${theme.colors.line} 49.7%,
        ${theme.colors.line} 50.3%,
        transparent 50.3%
      ),
      linear-gradient(
        45deg,
        transparent 49.7%,
        ${theme.colors.line} 49.7%,
        ${theme.colors.line} 50.3%,
        transparent 50.3%
      ),
      ${theme.colors.media};
  `}
`;

export const PlaceholderLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.tiny};
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textFaint};
  background: ${({ theme }) => theme.colors.bg};
  border: 1px solid ${({ theme }) => theme.colors.line};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
`;

export const Caption = styled.figcaption`
  margin-top: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.fontSizes.tiny};
  color: ${({ theme }) => theme.colors.textFaint};
`;

const S = {
  Figure,
  Frame,
  ZoomTrigger,
  Placeholder,
  PlaceholderLabel,
  Caption,
} as const;

export default S;
