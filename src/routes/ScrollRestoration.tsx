import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** 라우트 전환 시 스크롤을 최상단으로 이동한다. 해시 이동은 브라우저 기본 동작에 맡긴다. */
export default function ScrollRestoration(): null {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      return;
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, hash]);

  return null;
}
