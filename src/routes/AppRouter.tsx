import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ClickSpark from '@/components/ClickSpark/ClickSpark';
import Header from '@/components/Header/Header';
import { ROUTE_PATHS } from '@/constants/route_paths';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import ScrollRestoration from '@/routes/ScrollRestoration';
import NotFoundPage from '@/views/common/NotFoundPage';

const HomePage = lazy(() => import('@/views/Home/HomePage'));
const ProjectDetailPage = lazy(
  () => import('@/views/ProjectDetail/ProjectDetailPage'),
);

export default function AppRouter(): React.ReactNode {
  useSmoothScroll();

  return (
    <BrowserRouter>
      <ScrollRestoration />
      <a href="#main" className="skip-link">
        본문으로 건너뛰기
      </a>
      <ClickSpark />
      <Header />
      <Suspense fallback={null}>
        <Routes>
          <Route path={ROUTE_PATHS.ROOT} element={<HomePage />} />
          <Route
            path={ROUTE_PATHS.PROJECT_DETAIL}
            element={<ProjectDetailPage />}
          />
          <Route path={ROUTE_PATHS.NOT_FOUND} element={<NotFoundPage />} />
          <Route
            path="*"
            element={<Navigate to={ROUTE_PATHS.NOT_FOUND} replace />}
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
