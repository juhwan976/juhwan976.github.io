import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  canvas {
    position: absolute;
    inset: 0 auto auto 0;
    display: block;
    max-width: none;
  }
`;
