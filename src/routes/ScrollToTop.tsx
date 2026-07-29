import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

// 라우트 전환 시 스크롤을 맨 위로 되돌린다. (해시 이동은 제외)
// 뒤로/앞으로 이동(POP)은 브라우저 기본 스크롤 복원에 맡긴다.
export default function ScrollToTop(): null {
  const { pathname, hash } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (hash || navigationType === 'POP') {
      return;
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, hash, navigationType]);

  return null;
}
