import { Route, Routes } from 'react-router-dom';
import { ROUTE_PATHS } from '@/constants/route_paths';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import ScrollToTop from '@/routes/ScrollToTop';
import NotFoundPage from '@/views/common/NotFoundPage';
import HomePage from '@/views/Home/HomePage';
import ProjectDetailPage from '@/views/ProjectDetail/ProjectDetailPage';

// Router(BrowserRouter/StaticRouter)는 진입점(main/entry-server)에서 감싼다.
export default function AppRouter(): React.ReactNode {
  useSmoothScroll();

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path={ROUTE_PATHS.ROOT} element={<HomePage />} />
        <Route
          path={ROUTE_PATHS.PROJECT_DETAIL}
          element={<ProjectDetailPage />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
