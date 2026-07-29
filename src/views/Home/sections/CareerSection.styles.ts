import styled from 'styled-components';
import { SectionShell, ThinLink } from '@/components/ui/primitives';

export const Section = styled(SectionShell)`
  border-top: 1px solid ${({ theme }) => theme.colors.line};
`;

export const Company = styled.div`
  & + & {
    margin-top: ${({ theme }) => theme.spacing.xxl};
  }
`;

export const CompanyHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding-bottom: ${({ theme }) => theme.spacing.lg};

  ${({ theme }) => theme.media.mobile} {
    flex-wrap: wrap;
  }
`;

const logoFrame = `
  width: 48px;
  height: 48px;
  border-radius: 10px;
  flex-shrink: 0;
`;

/** 로고 파일이 없을 때 회사 이니셜을 표시하는 박스 */
export const LogoBox = styled.div`
  ${logoFrame}
  display: grid;
  place-items: center;
  background: ${({ theme }) => theme.colors.panel};
  border: 1px solid ${({ theme }) => theme.colors.line};
  font-size: ${({ theme }) => theme.fontSizes.bodyLg};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textDim};
`;

/** 실제 로고 — 다크 테마에 맞춰 기본은 모노크롬, hover 시 원색 */
export const Logo = styled.img`
  ${logoFrame}
  object-fit: contain;
  background: ${({ theme }) => theme.colors.panel};
  border: 1px solid ${({ theme }) => theme.colors.line};
  filter: grayscale(1);
  opacity: 0.85;
  transition: filter 0.2s ease, opacity 0.2s ease;

  ${({ theme }) => theme.media.hover} {
    &:hover {
      filter: none;
      opacity: 1;
    }
  }
`;

export const CompanyName = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.h3};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

export const CompanyPeriod = styled.p`
  margin-left: auto;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.tiny};
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.textDim};

  ${({ theme }) => theme.media.mobile} {
    margin-left: 0;
    width: 100%;
    padding-left: calc(48px + ${({ theme }) => theme.spacing.md});
  }
`;

/* 행 구분은 헤어라인 대신 여백으로 만든다 (상세 페이지와 동일한 언어) */
export const RoleRow = styled.div<{ $current: boolean }>`
  display: grid;
  grid-template-columns: 180px 1fr;
  gap: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => `${theme.spacing.lg} 0`};

  ${({ $current, theme }) =>
    $current &&
    `
    border-left: 2px solid ${theme.colors.accent};
    padding-left: ${theme.spacing.md};
    margin-left: calc(-1 * (${theme.spacing.md} + 2px));
    background: linear-gradient(90deg, ${theme.colors.accentSoft}, transparent 60%);
  `}

  ${({ theme }) => theme.media.mobile} {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.xs};
  }
`;

export const RolePeriod = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.tiny};
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.textDim};
  padding-top: 4px;
`;

export const RoleBody = styled.div`
  h4 {
    font-size: ${({ theme }) => theme.fontSizes.body};
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
  }

  p {
    margin-top: 4px;
    font-size: ${({ theme }) => theme.fontSizes.small};
    color: ${({ theme }) => theme.colors.textDim};
  }
`;

export const ResumeLink = styled(ThinLink)`
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const S = {
  Section,
  Company,
  CompanyHeader,
  LogoBox,
  Logo,
  CompanyName,
  CompanyPeriod,
  RoleRow,
  RolePeriod,
  RoleBody,
  ResumeLink,
} as const;

export default S;
