import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { ServerStyleSheet } from 'styled-components';
import { AppShell } from '@/App';
import AppRouter from '@/routes/AppRouter';

export interface RenderResult {
  /** #root에 주입할 앱 마크업 */
  readonly appHtml: string;
  /** head에 주입할 styled-components 스타일 태그 */
  readonly styleTags: string;
}

// 빌드 시 scripts/prerender.mjs가 라우트별로 호출한다 (SSG 전용).
export function render(url: string): RenderResult {
  const sheet = new ServerStyleSheet();
  try {
    const appHtml = renderToString(
      sheet.collectStyles(
        <StrictMode>
          <AppShell>
            <StaticRouter location={url}>
              <AppRouter />
            </StaticRouter>
          </AppShell>
        </StrictMode>,
      ),
    );
    return { appHtml, styleTags: sheet.getStyleTags() };
  } finally {
    sheet.seal();
  }
}
