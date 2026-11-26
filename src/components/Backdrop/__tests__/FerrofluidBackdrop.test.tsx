import { afterEach, expect, it, vi } from 'vitest';
import { act } from 'react';
import { createRoot } from 'react-dom/client';
import FerrofluidBackdrop from '../FerrofluidBackdrop';

const ogl = vi.hoisted(() => ({
  createRenderer: vi.fn(),
  setSize: vi.fn(),
  draw: vi.fn(),
  uniforms: {
    uCanvasSize: { value: [0, 0] },
    uReferenceHeight: { value: 0 },
    iTime: { value: 0 },
  },
}));

vi.mock('ogl', () => ({
  Renderer: class {
    gl = { canvas: document.createElement('canvas') };

    constructor({ width, height }: { width: number; height: number }) {
      ogl.createRenderer();
      this.gl.canvas.width = width;
      this.gl.canvas.height = height;
    }

    setSize(width: number, height: number) {
      ogl.setSize(width, height);
      this.gl.canvas.width = width;
      this.gl.canvas.height = height;
    }

    render() {
      ogl.draw();
    }
  },
  Program: class {
    constructor(_gl: unknown, { uniforms }: { uniforms: typeof ogl.uniforms }) {
      ogl.uniforms = uniforms;
    }

    remove() {}
  },
  Triangle: class {
    remove() {}
  },
  Mesh: class {},
}));

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

it('crops the same field during resize and draws newly exposed edges before paint', () => {
  const frames = new Map<number, FrameRequestCallback>();
  let nextFrameId = 0;
  let now = 0;
  let resize = (_width: number, _height: number) => {};
  vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true);
  vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => {
    frames.set(++nextFrameId, callback);
    return nextFrameId;
  });
  vi.stubGlobal('cancelAnimationFrame', (id: number) => frames.delete(id));
  vi.stubGlobal('ResizeObserver', class {
    constructor(callback: (entries: { contentRect: DOMRectReadOnly }[]) => void) {
      resize = (width, height) => callback([{ contentRect: new DOMRectReadOnly(0, 0, width, height) }]);
    }
    observe() {}
    disconnect() {}
  });
  vi.stubGlobal('IntersectionObserver', class {
    observe() {}
    disconnect() {}
  });
  vi.spyOn(performance, 'now').mockImplementation(() => now);
  vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(1440);
  vi.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockReturnValue(900);

  function renderFrame(time: number) {
    now = time;
    const callbacks = [...frames.values()];
    frames.clear();
    callbacks.forEach((callback) => callback(time));
  }

  const host = document.createElement('div');
  const root = createRoot(host);
  const onFirstFrame = vi.fn();

  try {
    act(() => root.render(<FerrofluidBackdrop dpr={1} onFirstFrame={onFirstFrame} />));
    const canvas = host.querySelector('canvas');
    renderFrame(0);
    resize(1350, 850);
    renderFrame(40);
    resize(1200, 800);
    renderFrame(100);

    expect(canvas?.width).toBe(1472);
    expect(canvas?.style.width).toBe('1472px');
    expect(canvas?.style.height).toBe('932px');
    expect(ogl.setSize).not.toHaveBeenCalled();
    expect(ogl.uniforms.uCanvasSize.value).toEqual([1472, 932]);
    expect(ogl.uniforms.uReferenceHeight.value).toBe(900);
    expect(ogl.uniforms.iTime.value).toBeCloseTo(0.09);

    renderFrame(170);
    expect(ogl.setSize).toHaveBeenCalledExactlyOnceWith(1232, 832);
    resize(1200, 800);
    renderFrame(300);
    expect(ogl.setSize).toHaveBeenCalledTimes(1);

    const drawCount = ogl.draw.mock.calls.length;
    const timeBeforeGrowth = ogl.uniforms.iTime.value;
    resize(1296, 860);
    expect(ogl.setSize).toHaveBeenLastCalledWith(1424, 988);
    expect(ogl.draw).toHaveBeenCalledTimes(drawCount + 1);
    expect(ogl.uniforms.iTime.value).toBe(timeBeforeGrowth);
    resize(1360, 920);
    expect(ogl.setSize).toHaveBeenCalledTimes(2);
    renderFrame(350);
    renderFrame(430);
    expect(ogl.setSize).toHaveBeenLastCalledWith(1392, 952);
    expect(ogl.uniforms.iTime.value).toBeCloseTo(timeBeforeGrowth + 0.1);

    const timeBeforePause = ogl.uniforms.iTime.value;
    resize(0, 0);
    expect(frames.size).toBe(0);
    now = 2000;
    resize(1360, 920);
    renderFrame(2000);

    expect(host.querySelector('canvas')).toBe(canvas);
    expect(ogl.createRenderer).toHaveBeenCalledTimes(1);
    expect(ogl.uniforms.iTime.value).toBe(timeBeforePause);
    expect(onFirstFrame).toHaveBeenCalledTimes(1);
  } finally {
    act(() => root.unmount());
  }

  expect(frames.size).toBe(0);
});
