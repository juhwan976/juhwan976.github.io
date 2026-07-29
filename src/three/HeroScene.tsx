import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// 노드-연결선 시스템 그래픽.
// 여러 개의 노드가 선으로 연결되고, 그중 하나의 활성 경로만 오렌지로 강조된다.
// 마우스 이동에 약하게 반응하며, 화면 밖에서는 렌더링을 중지한다.

const NODE_COUNT = 42;
const ACCENT = new THREE.Color('#ff6a00');
const LINE_COLOR = new THREE.Color('#3a3a40');
const NODE_COLOR = new THREE.Color('#c8c8cc');

/** 시드 기반 의사 난수 (렌더마다 동일한 형태 유지) */
const seeded = (index: number, salt: number): number => {
  const value = Math.sin(index * 127.1 + salt * 311.7) * 43758.5453;
  return value - Math.floor(value);
};

interface GraphObjects {
  group: THREE.Group;
  pathMaterial: THREE.LineBasicMaterial;
  disposables: Array<{ dispose: () => void }>;
}

const buildGraph = (): GraphObjects => {
  const group = new THREE.Group();
  const disposables: Array<{ dispose: () => void }> = [];

  // 노드 배치: 화면을 넓게 가로지르는 납작한 타원 구름 형태
  const nodes: THREE.Vector3[] = [];
  for (let i = 0; i < NODE_COUNT; i += 1) {
    const theta = seeded(i, 1) * Math.PI * 2;
    const radius = 1.6 + seeded(i, 2) * 3.4;
    nodes.push(
      new THREE.Vector3(
        Math.cos(theta) * radius * 1.35,
        (seeded(i, 3) - 0.5) * 3.4,
        Math.sin(theta) * radius * 0.7,
      ),
    );
  }

  // 각 노드를 가까운 2개 노드와 연결
  const edgePositions: number[] = [];
  const seen = new Set<string>();
  nodes.forEach((node, i) => {
    const neighbors = nodes
      .map((other, j) => ({ j, distance: node.distanceTo(other) }))
      .filter((entry) => entry.j !== i)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 2);
    neighbors.forEach(({ j }) => {
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (seen.has(key)) {
        return;
      }
      seen.add(key);
      edgePositions.push(...nodes[i].toArray(), ...nodes[j].toArray());
    });
  });

  const edgeGeometry = new THREE.BufferGeometry();
  edgeGeometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(edgePositions, 3),
  );
  const edgeMaterial = new THREE.LineBasicMaterial({
    color: LINE_COLOR,
    transparent: true,
    opacity: 0.55,
  });
  group.add(new THREE.LineSegments(edgeGeometry, edgeMaterial));
  disposables.push(edgeGeometry, edgeMaterial);

  // 노드 점
  const nodeGeometry = new THREE.BufferGeometry().setFromPoints(nodes);
  const nodeMaterial = new THREE.PointsMaterial({
    color: NODE_COLOR,
    size: 0.06,
    transparent: true,
    opacity: 0.85,
    sizeAttenuation: true,
  });
  group.add(new THREE.Points(nodeGeometry, nodeMaterial));
  disposables.push(nodeGeometry, nodeMaterial);

  // 활성 경로: 서로 떨어진 노드들을 잇는 오렌지 라인
  const pathIndices = [2, 11, 19, 27, 33, 40].map((i) => i % NODE_COUNT);
  const pathPoints = pathIndices.map((i) => nodes[i]);
  const pathGeometry = new THREE.BufferGeometry().setFromPoints(pathPoints);
  const pathMaterial = new THREE.LineBasicMaterial({
    color: ACCENT,
    transparent: true,
    opacity: 0.9,
  });
  group.add(new THREE.Line(pathGeometry, pathMaterial));
  disposables.push(pathGeometry, pathMaterial);

  // 활성 경로 노드 강조점
  const activeGeometry = new THREE.BufferGeometry().setFromPoints(pathPoints);
  const activeMaterial = new THREE.PointsMaterial({
    color: ACCENT,
    size: 0.12,
    transparent: true,
    opacity: 1,
    sizeAttenuation: true,
  });
  group.add(new THREE.Points(activeGeometry, activeMaterial));
  disposables.push(activeGeometry, activeMaterial);

  return { group, pathMaterial, disposables };
};

function Graph(): React.ReactNode {
  const graphRef = useRef<GraphObjects | null>(null);
  graphRef.current ??= buildGraph();
  const graph = graphRef.current;

  useEffect(() => {
    return () => {
      graphRef.current?.disposables.forEach((item) => item.dispose());
      graphRef.current = null;
    };
  }, []);

  useFrame((state, delta) => {
    const current = graphRef.current;
    if (!current) {
      return;
    }
    // 느린 자전 + 마우스에 약하게 반응하는 패럴랙스
    current.group.rotation.y += delta * 0.08;
    const targetX = state.pointer.y * 0.12;
    const targetZ = state.pointer.x * 0.08;
    current.group.rotation.x = THREE.MathUtils.lerp(
      current.group.rotation.x,
      targetX,
      0.04,
    );
    current.group.rotation.z = THREE.MathUtils.lerp(
      current.group.rotation.z,
      targetZ,
      0.04,
    );

    // 활성 경로의 미세한 맥동
    current.pathMaterial.opacity =
      0.7 + Math.sin(state.clock.elapsedTime * 1.4) * 0.2;
  });

  return <primitive object={graph.group} />;
}

export default function HeroScene(): React.ReactNode {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  // 화면 밖에서는 Canvas를 내려 렌더링을 중지한다
  useEffect(() => {
    const element = wrapRef.current;
    if (!element) {
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => setIsVisible(entry.isIntersecting));
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapRef} style={{ position: 'absolute', inset: 0 }}>
      {isVisible ? (
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0.6, 0.2, 6.2], fov: 52 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
        >
          <Graph />
        </Canvas>
      ) : null}
    </div>
  );
}
