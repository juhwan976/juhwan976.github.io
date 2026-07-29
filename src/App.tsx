import { ThemeProvider } from 'styled-components';
import ClickSpark from '@/components/ClickSpark/ClickSpark';
import AppRouter from '@/routes/AppRouter';
import { theme } from '@/styles/theme';

export default function App(): React.ReactNode {
  return (
    <ThemeProvider theme={theme}>
      <AppRouter />
      <ClickSpark sparkColor={theme.colors.accent} />
    </ThemeProvider>
  );
}
