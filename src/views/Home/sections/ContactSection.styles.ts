import styled from 'styled-components';
import { SectionShell } from '@/components/ui/primitives';

export const Section = styled(SectionShell)`
  border-top: 1px solid ${({ theme }) => theme.colors.line};
  padding-bottom: 0;
  overflow: hidden;
`;

export const Identity = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.h2};
  font-weight: 700;
  letter-spacing: -0.01em;
  color: ${({ theme }) => theme.colors.text};

  span {
    color: ${({ theme }) => theme.colors.textDim};
    font-weight: 500;
  }

  ${({ theme }) => theme.media.mobile} {
    span {
      display: block;
      margin-top: ${({ theme }) => theme.spacing.xs};
      font-size: ${({ theme }) => theme.fontSizes.bodyLg};
    }
  }
`;

export const Links = styled.ul`
  margin-top: ${({ theme }) => theme.spacing.xl};
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xl};

  ${({ theme }) => theme.media.mobile} {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

export const ContactLink = styled.a<{ $accent?: boolean }>`
  display: inline-block;
  padding-bottom: 6px;
  font-size: ${({ theme }) => theme.fontSizes.small};
  letter-spacing: 0.04em;
  color: ${({ $accent, theme }) =>
    $accent ? theme.colors.accent : theme.colors.text};
  border-bottom: 1px solid
    ${({ $accent, theme }) =>
      $accent ? theme.colors.accent : theme.colors.lineStrong};
  transition: opacity 0.2s ease;

  ${({ theme }) => theme.media.hover} {
    &:hover {
      opacity: 0.75;
    }
  }
`;

export const Watermark = styled.p`
  margin-top: ${({ theme }) => theme.spacing.xxl};
  font-size: ${({ theme }) => theme.fontSizes.watermark};
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 0.95;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.watermark};
  user-select: none;
`;

export const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => `${theme.spacing.lg} 0`};
  border-top: 1px solid ${({ theme }) => theme.colors.line};
  font-size: ${({ theme }) => theme.fontSizes.tiny};
  color: ${({ theme }) => theme.colors.textFaint};
`;

const S = {
  Section,
  Identity,
  Links,
  ContactLink,
  Watermark,
  Footer,
} as const;

export default S;
