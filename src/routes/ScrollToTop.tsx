import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// 라우트 전환 시 스크롤을 맨 위로 되돌린다. (해시 이동은 제외)
export default function ScrollToTop(): null {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      return;
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, hash]);

  return null;
}
