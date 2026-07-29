import styled from 'styled-components';

/** 클릭 스파크 전용 오버레이 캔버스 — 이벤트를 가로채지 않는다 */
export const Canvas = styled.canvas`
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndexes.overlay};
  pointer-events: none;
`;

const S = {
  Canvas,
} as const;

export default S;
