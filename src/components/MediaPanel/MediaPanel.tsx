import {
  IMAGE_PLACEHOLDER,
  MediaKinds,
  VIDEO_PLACEHOLDER,
  type MediaItem,
} from '@/content/types';
import { useInViewOnce } from '@/hooks/useInViewOnce';
import S from '@/components/MediaPanel/MediaPanel.styles';

interface MediaPanelProps {
  readonly media: MediaItem;
  /** CSS aspect-ratio 값 (기본 16 / 10) */
  readonly ratio?: string;
  /** 캡션 노출 여부 */
  readonly showCaption?: boolean;
}

const isPlaceholder = (src: string): boolean =>
  src === IMAGE_PLACEHOLDER || src === VIDEO_PLACEHOLDER;

// 이미지/영상/placeholder를 동일한 프레임으로 렌더링한다.
// viewport 진입 시 mask reveal이 1회 동작한다.
export default function MediaPanel({
  media,
  ratio = '16 / 10',
  showCaption = false,
}: MediaPanelProps): React.ReactNode {
  // clip-path로 가려진 Frame은 교차 면적이 0이므로, 클리핑되지 않는 Figure를 관찰한다.
  const { ref, inView } = useInViewOnce<HTMLElement>(0.25);

  return (
    <S.Figure ref={ref}>
      <S.Frame $revealed={inView} $ratio={ratio}>
        {isPlaceholder(media.src) ? (
          <S.Placeholder role="img" aria-label={media.alt}>
            <S.PlaceholderLabel>
              {media.placeholderLabel ?? 'Coming Soon'}
            </S.PlaceholderLabel>
          </S.Placeholder>
        ) : media.kind === MediaKinds.VIDEO ? (
          <video
            src={media.src}
            poster={media.poster}
            muted
            loop
            autoPlay
            playsInline
            aria-label={media.alt}
          />
        ) : (
          <img src={media.src} alt={media.alt} loading="lazy" />
        )}
      </S.Frame>
      {showCaption && media.caption ? (
        <S.Caption>{media.caption}</S.Caption>
      ) : null}
    </S.Figure>
  );
}
