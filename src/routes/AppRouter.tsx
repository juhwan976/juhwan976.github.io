import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ROUTE_PATHS } from '@/constants/route_paths';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import ScrollToTop from '@/routes/ScrollToTop';
import NotFoundPage from '@/views/common/NotFoundPage';
import HomePage from '@/views/Home/HomePage';
import ProjectDetailPage from '@/views/ProjectDetail/ProjectDetailPage';

export default function AppRouter(): React.ReactNode {
  useSmoothScroll();

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path={ROUTE_PATHS.ROOT} element={<HomePage />} />
        <Route
          path={ROUTE_PATHS.PROJECT_DETAIL}
          element={<ProjectDetailPage />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
