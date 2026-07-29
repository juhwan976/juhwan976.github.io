import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Page = styled.main`
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.gutter};
`;

export const Code = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.small};
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.accent};
`;

export const Title = styled.h1`
  margin-top: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSizes.h2};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

export const HomeLink = styled(Link)`
  display: inline-block;
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding-bottom: 6px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.accent};
  font-size: ${({ theme }) => theme.fontSizes.small};
`;

const S = {
  Page,
  Code,
  Title,
  HomeLink,
} as const;

export default S;
