import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import ClickSpark from '@/components/ClickSpark/ClickSpark';
import AppRouter from '@/routes/AppRouter';
import { theme } from '@/styles/theme';

// 클라이언트와 프리렌더(entry-server)가 같은 트리를 공유해야
// hydration 시 마크업이 어긋나지 않는다. Router만 진입점에서 주입한다.
export function AppShell({
  children,
}: {
  readonly children: React.ReactNode;
}): React.ReactNode {
  return (
    <ThemeProvider theme={theme}>
      {children}
      <ClickSpark sparkColor={theme.colors.accent} />
    </ThemeProvider>
  );
}

export default function App(): React.ReactNode {
  return (
    <AppShell>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AppShell>
  );
}
