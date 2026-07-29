import styled from 'styled-components';
import { SectionShell } from '@/components/ui/primitives';

export const Section = styled(SectionShell)`
  display: grid;
  grid-template-columns: minmax(160px, 220px) 1fr;
  gap: ${({ theme }) => theme.spacing.xl};
  border-top: 1px solid ${({ theme }) => theme.colors.line};

  ${({ theme }) => theme.media.mobile} {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.lg};
  }
`;

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.h2};
  font-weight: 700;
  line-height: 1.35;
  letter-spacing: -0.01em;
  white-space: pre-line;
  color: ${({ theme }) => theme.colors.text};
`;

export const Body = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg};
  max-width: ${({ theme }) => theme.layout.proseWidth};

  p {
    font-size: ${({ theme }) => theme.fontSizes.bodyLg};
    line-height: 1.85;
    white-space: pre-line;
    color: ${({ theme }) => theme.colors.textDim};

    & + p {
      margin-top: ${({ theme }) => theme.spacing.md};
    }
  }

  ${({ theme }) => theme.media.mobile} {
    p {
      white-space: normal;
    }
  }
`;

const S = {
  Section,
  Title,
  Body,
} as const;

export default S;
