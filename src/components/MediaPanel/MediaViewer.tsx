import { useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import S from '@/components/MediaPanel/MediaViewer.styles';
import { getActiveLenis } from '@/hooks/useSmoothScroll';

interface MediaViewerProps {
  readonly src: string;
  readonly alt: string;
  readonly caption?: string;
  readonly onClose: () => void;
}

// 이미지 확대 뷰어 모달.
// Escape·배경 클릭으로 닫히고, 떠 있는 동안 뒷 페이지 스크롤을 잠근다.
export default function MediaViewer({
  src,
  alt,
  caption,
  onClose,
}: MediaViewerProps): React.ReactNode {
  const closeRef = useRef<HTMLButtonElement | null>(null);

  // 이미지 영역 클릭은 배경(Overlay)의 닫기 클릭으로 전파되지 않게 한다.
  const stopPropagation = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  useEffect(() => {
    const previouslyFocused =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    closeRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      // 포커스 트랩 — 뷰어 안의 포커스 가능한 요소는 닫기 버튼 하나뿐이다.
      if (e.key === 'Tab') {
        e.preventDefault();
        closeRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);

    // Lenis가 활성일 때는 stop이 휠 스크롤까지 차단한다.
    const lenis = getActiveLenis();
    lenis?.stop();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      lenis?.start();
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [onClose]);

  return createPortal(
    <S.Overlay role="dialog" aria-modal="true" aria-label={alt} onClick={onClose}>
      <S.CloseButton ref={closeRef} type="button" aria-label="뷰어 닫기">
        <span aria-hidden="true" />
      </S.CloseButton>
      <S.Content onClick={stopPropagation}>
        <img src={src} alt={alt} />
        {caption ? <figcaption>{caption}</figcaption> : null}
      </S.Content>
    </S.Overlay>,
    document.body,
  );
}
