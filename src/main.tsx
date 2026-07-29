import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '@/App';
import 'pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css';
import '@/styles/global.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
