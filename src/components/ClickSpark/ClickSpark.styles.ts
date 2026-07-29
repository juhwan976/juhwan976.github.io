import styled from 'styled-components';

/** 클릭 스파크 전용 오버레이 캔버스 — 이벤트를 가로채지 않는다 */
export const Canvas = styled.canvas`
  position: fixed;
  inset: 0;
  /* 비트맵 크기와 무관하게 표시 크기를 뷰포트(스크롤바 제외)에 고정한다.
     전역 max-width: 100% 리셋에 의한 수평 압축(우측 드리프트)을 방지. */
  width: 100%;
  height: 100%;
  z-index: ${({ theme }) => theme.zIndexes.overlay};
  pointer-events: none;
`;

const S = {
  Canvas,
} as const;

export default S;
