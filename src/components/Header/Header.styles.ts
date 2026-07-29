import styled, { keyframes } from 'styled-components';

export const Bar = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${({ theme }) => theme.zIndexes.header};
  background: color-mix(in srgb, ${({ theme }) => theme.colors.bg} 82%, transparent);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.line};
`;

export const Inner = styled.div`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  height: ${({ theme }) => theme.layout.headerHeight};
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.gutter};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const Brand = styled.a`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: 700;
  letter-spacing: 0.08em;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.text};

  ${({ theme }) => theme.media.mobile} {
    font-size: ${({ theme }) => theme.fontSizes.tiny};
    letter-spacing: 0.04em;
  }
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};

  ${({ theme }) => theme.media.mobile} {
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

export const NavLink = styled.a`
  font-size: ${({ theme }) => theme.fontSizes.label};
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.textDim};
  transition: color 0.2s ease;

  /* 모바일에서는 섹션 링크를 드롭다운 메뉴로 옮긴다 */
  ${({ theme }) => theme.media.mobile} {
    display: none;
  }

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
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.accent};
  transition: opacity 0.2s ease;

  ${({ theme }) => theme.media.mobile} {
    letter-spacing: 0.08em;
  }

  ${({ theme }) => theme.media.hover} {
    &:hover {
      opacity: 0.75;
    }
  }
`;

/** 모바일 전용 햄버거 버튼 — 열림 상태에서 X로 전환 */
export const MenuButton = styled.button<{ $open: boolean }>`
  display: none;

  ${({ theme }) => theme.media.mobile} {
    display: inline-flex;
  }

  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-right: -10px;
  padding: 0;
  background: none;
  border: 0;
  cursor: pointer;

  span {
    position: relative;
    display: block;
    width: 18px;
    height: 2px;
    background: ${({ $open, theme }) =>
      $open ? 'transparent' : theme.colors.text};
    transition: background 0.2s ease;

    &::before,
    &::after {
      content: '';
      position: absolute;
      left: 0;
      width: 18px;
      height: 2px;
      background: ${({ theme }) => theme.colors.text};
      transition: transform 0.25s ease, top 0.25s ease, bottom 0.25s ease;
    }

    &::before {
      top: ${({ $open }) => ($open ? '0' : '-6px')};
      transform: rotate(${({ $open }) => ($open ? '45deg' : '0deg')});
    }

    &::after {
      bottom: ${({ $open }) => ($open ? '0' : '-6px')};
      transform: rotate(${({ $open }) => ($open ? '-45deg' : '0deg')});
    }
  }
`;

const menuReveal = keyframes`
  from {
    opacity: 0;
    transform: translateY(-6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

/** 모바일 드롭다운 — 헤더 바로 아래에 섹션 숏컷을 세로로 나열한다 */
export const MobileMenu = styled.nav`
  display: none;

  ${({ theme }) => theme.media.mobile} {
    display: block;
  }

  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: color-mix(in srgb, ${({ theme }) => theme.colors.bg} 94%, transparent);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.line};
  animation: ${menuReveal} 0.25s ease both;

  ${({ theme }) => theme.media.reducedMotion} {
    animation: none;
  }
`;

export const MobileMenuLink = styled.a`
  display: block;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.gutter}`};
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textDim};

  & + & {
    border-top: 1px solid ${({ theme }) => theme.colors.line};
  }

  &:active {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const S = {
  Bar,
  Inner,
  Brand,
  Nav,
  NavLink,
  ResumeLink,
  MenuButton,
  MobileMenu,
  MobileMenuLink,
} as const;

export default S;
