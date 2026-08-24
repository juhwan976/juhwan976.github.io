import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from '@/App';
import 'pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css';
import '@fontsource-variable/jetbrains-mono';
import '@/styles/global.scss';

const container = document.getElementById('root')!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// 프리렌더된 HTML(빌드 산출물)은 hydrate하고, 빈 셸(dev)은 새로 렌더링한다.
if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
