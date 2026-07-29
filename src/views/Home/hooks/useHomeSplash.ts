import { useCallback, useEffect, useState } from 'react';

// SPA 수명 동안 스플래시는 첫 진입 1회만 보여준다.
// (라우트 이동 후 홈으로 돌아와도 다시 보이지 않는다)
let hasShownSplash = false;

/** 로딩 신호가 오지 않아도 이 시간이 지나면 강제로 완료 처리한다 */
const READY_TIMEOUT_MS = 5000;

interface HomeSplashState {
  readonly splashVisible: boolean;
  readonly splashReady: boolean;
  readonly markBackdropReady: () => void;
  readonly hideSplash: () => void;
}

// 첫 진입 스플래시의 로딩 신호를 모은다.
// 폰트 로딩 + window load + Hero 배경 셰이더 첫 프레임이 모두 끝나면 ready.
export function useHomeSplash(): HomeSplashState {
  const [visible, setVisible] = useState(() => !hasShownSplash);
  const [backdropReady, setBackdropReady] = useState(false);
  const [fontsReady, setFontsReady] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(
    () => document.readyState === 'complete',
  );
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    if (!visible) return;
    hasShownSplash = true;

    let cancelled = false;
    void document.fonts.ready.then(() => {
      if (!cancelled) setFontsReady(true);
    });

    const onLoad = (): void => setPageLoaded(true);
    window.addEventListener('load', onLoad);

    const timer = window.setTimeout(() => setTimedOut(true), READY_TIMEOUT_MS);

    return () => {
      cancelled = true;
      window.removeEventListener('load', onLoad);
      clearTimeout(timer);
    };
  }, [visible]);

  const markBackdropReady = useCallback(() => setBackdropReady(true), []);
  const hideSplash = useCallback(() => setVisible(false), []);

  return {
    splashVisible: visible,
    splashReady: timedOut || (backdropReady && fontsReady && pageLoaded),
    markBackdropReady,
    hideSplash,
  };
}
