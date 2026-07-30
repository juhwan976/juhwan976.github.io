import styled, { keyframes } from 'styled-components';

const overlayIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const contentIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.97);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndexes.overlay};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl};
  background: color-mix(in srgb, ${({ theme }) => theme.colors.bg} 92%, transparent);
  backdrop-filter: blur(8px);
  cursor: zoom-out;
  animation: ${overlayIn} 0.2s ease both;

  ${({ theme }) => theme.media.reducedMotion} {
    animation: none;
  }

  ${({ theme }) => theme.media.mobile} {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

export const Content = styled.figure`
  cursor: default;
  animation: ${contentIn} 0.25s cubic-bezier(0.16, 1, 0.3, 1) both;

  img {
    display: block;
    max-width: min(1400px, 92vw);
    max-height: 82vh;
    object-fit: contain;
    border: 1px solid ${({ theme }) => theme.colors.line};
    background: ${({ theme }) => theme.colors.media};
  }

  figcaption {
    margin-top: ${({ theme }) => theme.spacing.sm};
    font-size: ${({ theme }) => theme.fontSizes.tiny};
    color: ${({ theme }) => theme.colors.textDim};
    text-align: center;
  }

  ${({ theme }) => theme.media.reducedMotion} {
    animation: none;
  }
`;

/** 헤더 햄버거 메뉴의 닫기(X)와 동일한 CSS 바 방식의 닫기 버튼 */
export const CloseButton = styled.button`
  position: fixed;
  top: ${({ theme }) => theme.spacing.lg};
  right: ${({ theme }) => theme.spacing.gutter};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;

  span {
    position: relative;
    display: block;
    width: 18px;
    height: 2px;
    background: transparent;

    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 18px;
      height: 2px;
      background: ${({ theme }) => theme.colors.textDim};
      transition: background 0.2s ease;
    }

    &::before {
      transform: rotate(45deg);
    }

    &::after {
      transform: rotate(-45deg);
    }
  }

  ${({ theme }) => theme.media.hover} {
    &:hover span::before,
    &:hover span::after {
      background: ${({ theme }) => theme.colors.text};
    }
  }
`;

const S = {
  Overlay,
  Content,
  CloseButton,
} as const;

export default S;
