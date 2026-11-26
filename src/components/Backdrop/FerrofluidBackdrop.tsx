import { Mesh, Program, Renderer, Triangle } from "ogl";
import React, { useEffect, useRef } from "react";
import * as S from "./FerrofluidBackdrop.styles";

export interface FerrofluidProps {
  className?: string;
  dpr?: number;
  paused?: boolean;
  colors?: string[];
  speed?: number;
  scale?: number;
  turbulence?: number;
  fluidity?: number;
  rimWidth?: number;
  sharpness?: number;
  shimmer?: number;
  glow?: number;
  flowDirection?: "up" | "down" | "left" | "right";
  opacity?: number;
  mouseInteraction?: boolean;
  mouseStrength?: number;
  mouseRadius?: number;
  mouseDampening?: number;
  mixBlendMode?: string;
  /** 첫 프레임이 그려진 직후 1회 호출 — 로딩 인디케이터 해제용 */
  onFirstFrame?: () => void;
}

type RGB = [number, number, number];

const MAX_COLORS = 8;
const DEFAULT_COLORS = ["#ffffff", "#ffffff", "#ffffff"];
const RESIZE_SETTLE_MS = 120;
const CANVAS_MARGIN_PX = 32;
const CANVAS_GROWTH_PX = 128;
const MAX_FRAME_STEP_MS = 50;

const hexToRGB = (hex: string): RGB => {
  const c = hex.replace("#", "").padEnd(6, "0");
  const r = parseInt(c.slice(0, 2), 16) / 255;
  const g = parseInt(c.slice(2, 4), 16) / 255;
  const b = parseInt(c.slice(4, 6), 16) / 255;
  return [r, g, b];
};

const prepColors = (input?: string[]) => {
  const base = (
    input && input.length ? input : ["#4F46E5", "#06B6D4", "#E0F2FE"]
  ).slice(0, MAX_COLORS);
  const count = base.length;
  const arr: RGB[] = [];
  for (let i = 0; i < MAX_COLORS; i++)
    arr.push(hexToRGB(base[Math.min(i, base.length - 1)]));
  const avg: RGB = [0, 0, 0];
  for (let i = 0; i < count; i++) {
    avg[0] += arr[i][0];
    avg[1] += arr[i][1];
    avg[2] += arr[i][2];
  }
  avg[0] /= count;
  avg[1] /= count;
  avg[2] /= count;
  return { arr, count, avg };
};

const flowVec = (d?: string): [number, number] => {
  switch (d) {
    case "up":
      return [0, 1];
    case "down":
      return [0, -1];
    case "left":
      return [-1, 0];
    case "right":
      return [1, 0];
    default:
      return [0, -1];
  }
};

const vertex = `
attribute vec2 position;
attribute vec2 uv;
uniform vec2 uCanvasSize;
uniform float uReferenceHeight;
varying vec2 vCoord;
void main() {
  // Keep the field anchored to the top-left when the viewport changes.
  vCoord = vec2(uv.x * uCanvasSize.x, uReferenceHeight + (uv.y - 1.0) * uCanvasSize.y);
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `
precision highp float;

uniform float uReferenceHeight;
uniform vec2  iMouse;
uniform float iTime;

uniform vec3  uColor0;
uniform vec3  uColor1;
uniform vec3  uColor2;
uniform vec3  uColor3;
uniform vec3  uColor4;
uniform vec3  uColor5;
uniform vec3  uColor6;
uniform vec3  uColor7;
uniform int   uColorCount;

uniform vec3  uMouseColor;
uniform vec2  uFlow;
uniform float uSpeed;
uniform float uScale;
uniform float uTurbulence;
uniform float uFluidity;
uniform float uRimWidth;
uniform float uSharpness;
uniform float uShimmer;
uniform float uGlow;
uniform float uOpacity;
uniform float uMouseEnabled;
uniform float uMouseStrength;
uniform float uMouseRadius;

varying vec2 vCoord;

#define PI 3.14159265

vec3 palette(float h) {
  int count = uColorCount;
  if (count < 1) count = 1;
  int idx = int(floor(clamp(h, 0.0, 0.999999) * float(count)));
  if (idx <= 0) return uColor0;
  if (idx == 1) return uColor1;
  if (idx == 2) return uColor2;
  if (idx == 3) return uColor3;
  if (idx == 4) return uColor4;
  if (idx == 5) return uColor5;
  if (idx == 6) return uColor6;
  return uColor7;
}

float hash(vec3 p3) {
  p3 = fract(p3 * 0.1031);
  p3 += dot(p3, p3.zyx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float smin(float a, float b, float k) {
  float r = exp2(-a / k) + exp2(-b / k);
  return -k * log2(r);
}

float sinlerp(float a, float b, float w) {
  return mix(a, b, (sin(w * PI - PI / 2.0) + 1.0) / 2.0);
}

float vn(vec2 p, float s, float seed) {
  vec2 cellp = floor(p / s);
  vec2 relp = mod(p, s);
  float g1 = hash(vec3(cellp, seed));
  float g2 = hash(vec3(cellp.x + 1.0, cellp.y, seed));
  float g3 = hash(vec3(cellp.x + 1.0, cellp.y + 1.0, seed));
  float g4 = hash(vec3(cellp.x, cellp.y + 1.0, seed));
  float bx = sinlerp(g1, g2, relp.x / s);
  float tx = sinlerp(g4, g3, relp.x / s);
  return sinlerp(bx, tx, relp.y / s);
}

float dbn(vec2 p, float s, float seed) {
  float o = s / 2.0;
  float n0 = vn(p, s, seed);
  float n1 = vn(p + vec2(o, o), s, seed + 0.1);
  float n2 = vn(p + vec2(-o, o), s, seed + 0.2);
  float n3 = vn(p + vec2(o, -o), s, seed + 0.3);
  float n4 = vn(p + vec2(-o, -o), s, seed + 0.4);
  return (2.0 * n0 + 1.5 * n1 + 1.25 * n2 + 1.125 * n3 + n4) / 7.0;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  float ref = 700.0 / max(uScale, 0.05);
  vec2 p = fragCoord / uReferenceHeight * ref;

  float spd = 200.0 * uSpeed;
  float t = iTime;

  vec2 dir = uFlow;
  vec2 perp = vec2(-dir.y, dir.x);

  float distort1 = vn(p + perp * (t * spd), 60.0, 10.0) * 50.0 * uTurbulence;
  float distort2 = vn(p - perp * (t * spd), 120.0, 15.0) * 100.0 * uTurbulence;

  float peaks = dbn(p + distort1 + dir * (t * spd * 0.5), 40.0, 1.0);
  float peaks2 = dbn(p + distort2 - dir * (t * spd * 0.5), 40.0, 0.0);

  float mapeaks = smin(peaks, peaks2, max(uFluidity, 0.001));

  float mGlow = 0.0;
  if (uMouseEnabled > 0.5) {
    vec2 mp = iMouse / uReferenceHeight * ref;
    float md = length(p - mp) / ref;
    float rr = max(uMouseRadius, 0.02);
    mGlow = exp(-md * md / (rr * rr)) * uMouseStrength;
  }

  float band = (uRimWidth - abs((mapeaks - 0.4) * 2.0)) * 5.0;
  float ltn = clamp(band - vn(p + dir * (t * spd * 0.5), 60.0, 12.0) * uShimmer, 0.0, 1.0);
  ltn = pow(ltn, uSharpness) * uGlow;
  ltn *= clamp(1.0 - mGlow, 0.0, 1.0);

  float h = clamp(0.5 + (peaks - peaks2) * 0.8, 0.0, 1.0);
  vec3 col = palette(h);

  vec3 outc = col * ltn;
  float a = clamp(max(outc.r, max(outc.g, outc.b)), 0.0, 1.0);
  fragColor = vec4(outc, a * uOpacity);
}

void main() {
  vec4 color;
  mainImage(color, vCoord);
  gl_FragColor = color;
}
`;

const FerrofluidBackdrop: React.FC<FerrofluidProps> = ({
  dpr,
  paused = false,
  colors = DEFAULT_COLORS,
  speed = 0.5,
  scale = 1.6,
  turbulence = 1,
  fluidity = 0.1,
  rimWidth = 0.2,
  sharpness = 2.5,
  shimmer = 1.5,
  glow = 2,
  flowDirection = "down",
  opacity = 1,
  mouseInteraction = true,
  mouseStrength = 1,
  mouseRadius = 0.35,
  mouseDampening = 0.15,
  mixBlendMode,
  onFirstFrame,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  // 콜백 변경으로 WebGL 컨텍스트가 재생성되지 않도록 ref로 우회한다.
  const onFirstFrameRef = useRef(onFirstFrame);
  const firstFrameNotifiedRef = useRef(false);

  useEffect(() => {
    onFirstFrameRef.current = onFirstFrame;
  }, [onFirstFrame]);
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth;
    let height = container.clientHeight;
    let canvasWidth = width + CANVAS_MARGIN_PX;
    let canvasHeight = height + CANVAS_MARGIN_PX;
    let resizeAfter: number | null = null;
    const pixelRatio = () => dpr ?? Math.min(window.devicePixelRatio || 1, 1.5);
    let appliedRatio = pixelRatio();
    // 화면을 채우는 삼각형 하나를 그리므로 깊이 버퍼와 멀티샘플링이 필요 없다.
    const renderer = new Renderer({
      width: Math.max(1, Math.round(canvasWidth * appliedRatio)),
      height: Math.max(1, Math.round(canvasHeight * appliedRatio)),
      alpha: true,
      depth: false,
      autoClear: false,
    });
    const gl = renderer.gl;
    const canvas = gl.canvas;
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;
    container.appendChild(canvas);

    const { arr, count, avg } = prepColors(colors);

    const uniforms = {
      uCanvasSize: { value: [canvasWidth, canvasHeight] },
      uReferenceHeight: { value: height },
      iMouse: { value: [0, 0] },
      iTime: { value: 0 },
      uColor0: { value: arr[0] },
      uColor1: { value: arr[1] },
      uColor2: { value: arr[2] },
      uColor3: { value: arr[3] },
      uColor4: { value: arr[4] },
      uColor5: { value: arr[5] },
      uColor6: { value: arr[6] },
      uColor7: { value: arr[7] },
      uColorCount: { value: count },
      uMouseColor: { value: avg },
      uFlow: { value: flowVec(flowDirection) },
      uSpeed: { value: speed },
      uScale: { value: scale },
      uTurbulence: { value: turbulence },
      uFluidity: { value: fluidity },
      uRimWidth: { value: rimWidth },
      uSharpness: { value: sharpness },
      uShimmer: { value: shimmer },
      uGlow: { value: glow },
      uOpacity: { value: opacity },
      uMouseEnabled: { value: mouseInteraction ? 1 : 0 },
      uMouseStrength: { value: mouseStrength },
      uMouseRadius: { value: mouseRadius },
    };

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms,
      depthTest: false,
      depthWrite: false,
    });
    const geometry = new Triangle(gl);
    const mesh = new Mesh(gl, { geometry, program });

    const mouseTarget = [0, 0];
    let pendingPointer: PointerEvent | null = null;
    let running = false;
    let frameId: number | null = null;
    let lastFrameTime: number | null = null;
    const onPointerMove = (e: PointerEvent) => {
      if (running) pendingPointer = e;
    };
    // 캔버스를 감싸는 Backdrop에 pointer-events: none이 걸려 있어
    // 캔버스는 이벤트를 받지 못한다. window에서 수신하고 캔버스 좌표로 환산한다.
    if (mouseInteraction) {
      window.addEventListener("pointermove", onPointerMove);
    }

    const sizeCanvas = (nextWidth: number, nextHeight: number, ratio: number) => {
      if (
        nextWidth === canvasWidth &&
        nextHeight === canvasHeight &&
        ratio === appliedRatio
      ) {
        return;
      }
      canvasWidth = nextWidth;
      canvasHeight = nextHeight;
      appliedRatio = ratio;
      const pixelWidth = Math.max(1, Math.round(nextWidth * ratio));
      const pixelHeight = Math.max(1, Math.round(nextHeight * ratio));
      if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
        renderer.setSize(pixelWidth, pixelHeight);
      }
      canvas.style.width = `${nextWidth}px`;
      canvas.style.height = `${nextHeight}px`;
      uniforms.uCanvasSize.value[0] = nextWidth;
      uniforms.uCanvasSize.value[1] = nextHeight;
    };

    const draw = () => {
      if (!uniforms.uReferenceHeight.value) {
        uniforms.uReferenceHeight.value = height;
      }
      try {
        renderer.render({
          scene: mesh,
          update: false,
          sort: false,
          frustumCull: false,
        });
        if (!firstFrameNotifiedRef.current) {
          firstFrameNotifiedRef.current = true;
          onFirstFrameRef.current?.();
        }
      } catch (e) {
        console.error(e);
      }
    };

    const loop = (t: number) => {
      if (!running) return;
      frameId = requestAnimationFrame(loop);
      const dt =
        lastFrameTime === null
          ? 0
          : Math.min(t - lastFrameTime, MAX_FRAME_STEP_MS) / 1000;
      lastFrameTime = t;
      uniforms.iTime.value += dt;

      if (pendingPointer) {
        const rect = container.getBoundingClientRect();
        mouseTarget[0] = pendingPointer.clientX - rect.left;
        mouseTarget[1] =
          uniforms.uReferenceHeight.value - (pendingPointer.clientY - rect.top);
        pendingPointer = null;
      }
      if (mouseInteraction) {
        const factor =
          mouseDampening > 0 ? 1 - Math.exp(-dt / mouseDampening) : 1;
        const mouse = uniforms.iMouse.value;
        mouse[0] += (mouseTarget[0] - mouse[0]) * factor;
        mouse[1] += (mouseTarget[1] - mouse[1]) * factor;
      }

      // 크기 조절이 끝나면 여유 영역을 줄여 가려진 픽셀을 반복해서 그리지 않는다.
      if (resizeAfter !== null && t >= resizeAfter) {
        resizeAfter = null;
        sizeCanvas(
          Math.ceil(width) + CANVAS_MARGIN_PX,
          Math.ceil(height) + CANVAS_MARGIN_PX,
          pixelRatio(),
        );
      } else if (resizeAfter === null) {
        const ratio = pixelRatio();
        if (ratio !== appliedRatio) sizeCanvas(canvasWidth, canvasHeight, ratio);
      }

      draw();
    };

    const startLoop = () => {
      if (running) return;
      running = true;
      lastFrameTime = null;
      frameId = requestAnimationFrame(loop);
    };
    const stopLoop = () => {
      running = false;
      pendingPointer = null;
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
        frameId = null;
      }
    };

    // 화면 밖이거나 탭이 숨겨지면 렌더링을 멈춰
    // 스크롤 합성과의 GPU 경쟁을 없앤다.
    let inView = true;
    const syncRunning = () => {
      if (inView && !document.hidden && !paused && width > 0 && height > 0) {
        startLoop();
      } else {
        stopLoop();
      }
    };
    const ro = new ResizeObserver(([entry]) => {
      if (!entry) return;
      const next = entry.contentRect;
      if (width === next.width && height === next.height) return;
      width = next.width;
      height = next.height;
      resizeAfter = performance.now() + RESIZE_SETTLE_MS;
      syncRunning();
      if (running && (width > canvasWidth || height > canvasHeight)) {
        // 여유 영역을 넘겨 넓어지면 같은 시각의 프레임을 그려 빈 가장자리를 막는다.
        sizeCanvas(
          width > canvasWidth
            ? Math.ceil(width) + CANVAS_GROWTH_PX
            : canvasWidth,
          height > canvasHeight
            ? Math.ceil(height) + CANVAS_GROWTH_PX
            : canvasHeight,
          appliedRatio,
        );
        draw();
      }
    });
    ro.observe(container);
    const io = new IntersectionObserver((entries) => {
      inView = entries[0]?.isIntersecting ?? true;
      syncRunning();
    });
    io.observe(container);
    document.addEventListener("visibilitychange", syncRunning);

    syncRunning();

    return () => {
      stopLoop();
      io.disconnect();
      document.removeEventListener("visibilitychange", syncRunning);
      if (mouseInteraction)
        window.removeEventListener("pointermove", onPointerMove);
      ro.disconnect();
      canvas.remove();
      geometry.remove();
      program.remove();
    };
  }, [
    dpr,
    paused,
    colors,
    speed,
    scale,
    turbulence,
    fluidity,
    rimWidth,
    sharpness,
    shimmer,
    glow,
    flowDirection,
    opacity,
    mouseInteraction,
    mouseStrength,
    mouseRadius,
    mouseDampening,
  ]);

  return (
    <S.Container
      ref={containerRef}
      style={{
        ...(mixBlendMode && {
          mixBlendMode: mixBlendMode as React.CSSProperties["mixBlendMode"],
        }),
      }}
    />
  );
};

export default FerrofluidBackdrop;
