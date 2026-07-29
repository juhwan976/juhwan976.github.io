import {
  IMAGE_PLACEHOLDER,
  MediaKinds,
  VIDEO_PLACEHOLDER,
  type MediaItem,
} from '@/content/types';
import styles from './MediaFrame.module.scss';

interface MediaFrameProps {
  media: MediaItem;
  /** CSS aspect-ratio 값 (기본 16 / 9) */
  ratio?: string;
}

const isPlaceholder = (src: string): boolean =>
  src === IMAGE_PLACEHOLDER || src === VIDEO_PLACEHOLDER;

/** 노드-연결선 와이어프레임 placeholder 그래픽 */
function PlaceholderGraphic(): React.ReactNode {
  return (
    <svg
      className={styles.placeholderSvg}
      viewBox="0 0 400 225"
      aria-hidden="true"
      focusable="false"
    >
      <g stroke="rgba(255, 255, 255, 0.14)" strokeWidth="1" fill="none">
        <path d="M48 176 L120 120 L200 148 L288 84 L352 108" />
        <path d="M120 120 L164 56 L288 84" />
        <path d="M48 176 L164 56" />
        <rect x="230" y="130" width="72" height="44" rx="3" />
        <rect x="70" y="48" width="56" height="36" rx="3" />
      </g>
      <path
        d="M48 176 L120 120 L200 148 L288 84"
        stroke="#ff6a00"
        strokeWidth="1.5"
        fill="none"
        opacity="0.85"
      />
      <g fill="#18181c" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="1">
        <circle cx="48" cy="176" r="4" />
        <circle cx="120" cy="120" r="4" />
        <circle cx="164" cy="56" r="4" />
        <circle cx="200" cy="148" r="4" />
        <circle cx="352" cy="108" r="4" />
      </g>
      <circle cx="288" cy="84" r="4.5" fill="#ff6a00" stroke="none" />
    </svg>
  );
}

/**
 * 이미지/영상 프레임.
 * 에셋 경로가 placeholder이면 레이아웃이 깨지지 않는 추상 와이어프레임 패널을 렌더한다.
 */
export default function MediaFrame({
  media,
  ratio = '16 / 9',
}: MediaFrameProps): React.ReactNode {
  const frameStyle = { aspectRatio: ratio };

  if (isPlaceholder(media.src)) {
    return (
      <figure className={styles.frame} style={frameStyle}>
        <div className={styles.placeholder} role="img" aria-label={media.alt}>
          <PlaceholderGraphic />
          <div className={styles.placeholderMeta}>
            <span className={styles.placeholderKind}>
              {media.kind === MediaKinds.VIDEO ? 'VIDEO' : 'IMAGE'}
            </span>
            {media.placeholderLabel ? (
              <span className={styles.placeholderLabel}>
                {media.placeholderLabel}
              </span>
            ) : null}
          </div>
        </div>
        {media.caption ? (
          <figcaption className={styles.caption}>{media.caption}</figcaption>
        ) : null}
      </figure>
    );
  }

  return (
    <figure className={styles.frame} style={frameStyle}>
      {media.kind === MediaKinds.VIDEO ? (
        <video
          className={styles.media}
          src={media.src}
          poster={media.poster}
          preload="none"
          muted
          playsInline
          controls
          aria-label={media.alt}
        />
      ) : (
        <img
          className={styles.media}
          src={media.src}
          alt={media.alt}
          loading="lazy"
        />
      )}
      {media.caption ? (
        <figcaption className={styles.caption}>{media.caption}</figcaption>
      ) : null}
    </figure>
  );
}
