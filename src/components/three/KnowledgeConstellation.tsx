import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Sphere, Line, Html } from '@react-three/drei';
import * as THREE from 'three';

interface KnowledgeNode {
  id: string;
  label: string;
  position: [number, number, number];
  color: string;
}

const nodes: KnowledgeNode[] = [
  { id: 'policies', label: 'Policies', position: [-2.5, 1.5, 0], color: '#60a5fa' },
  { id: 'tools', label: 'Tools', position: [2.8, 1.2, -0.5], color: '#60a5fa' },
  { id: 'teams', label: 'Teams', position: [-2.2, -1.3, 0.3], color: '#60a5fa' },
  { id: 'faqs', label: 'FAQs', position: [2.5, -1.5, 0.2], color: '#60a5fa' },
  { id: 'benefits', label: 'Benefits', position: [0, 2.2, -0.3], color: '#60a5fa' },
  { id: 'onboarding', label: 'Onboarding', position: [-0.5, -2, 0.5], color: '#60a5fa' },
];

const connections: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0],
  [0, 4], [1, 3], [2, 4], [0, 3], [1, 5],
];

function KnowledgeNodeMesh({ node, onHover }: { node: KnowledgeNode; onHover: (id: string | null) => void }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(hovered ? 1.3 : 1);
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group position={node.position}>
        <Sphere
          ref={meshRef}
          args={[0.15, 32, 32]}
          onPointerOver={() => { setHovered(true); onHover(node.id); }}
          onPointerOut={() => { setHovered(false); onHover(null); }}
        >
          <meshStandardMaterial
            color={node.color}
            emissive={node.color}
            emissiveIntensity={hovered ? 0.8 : 0.3}
            transparent
            opacity={0.9}
          />
        </Sphere>
        {/* Outer glow */}
        <Sphere args={[0.22, 16, 16]}>
          <meshBasicMaterial
            color={node.color}
            transparent
            opacity={hovered ? 0.3 : 0.1}
          />
        </Sphere>
        {hovered && (
          <Html center distanceFactor={8}>
            <div className="px-3 py-1.5 rounded-lg glass text-sm font-sans text-foreground whitespace-nowrap">
              {node.label}
            </div>
          </Html>
        )}
      </group>
    </Float>
  );
}

function ConnectionLine({ start, end, hoveredNode }: { 
  start: [number, number, number]; 
  end: [number, number, number];
  hoveredNode: string | null;
}) {
  const pulseRef = useRef<THREE.Mesh>(null);
  const [pulsePosition, setPulsePosition] = useState(0);

  useFrame((state, delta) => {
    setPulsePosition((prev) => (prev + delta * 0.3) % 1);
    
    if (pulseRef.current) {
      const t = pulsePosition;
      pulseRef.current.position.set(
        start[0] + (end[0] - start[0]) * t,
        start[1] + (end[1] - start[1]) * t,
        start[2] + (end[2] - start[2]) * t
      );
    }
  });

  const points = useMemo(() => [
    new THREE.Vector3(...start),
    new THREE.Vector3(...end)
  ], [start, end]);

  return (
    <group>
      <Line
        points={points}
        color="#60a5fa"
        lineWidth={hoveredNode ? 1.5 : 0.8}
        transparent
        opacity={hoveredNode ? 0.5 : 0.2}
      />
      {/* Energy pulse */}
      <Sphere ref={pulseRef} args={[0.04, 8, 8]}>
        <meshBasicMaterial color="#fbbf24" transparent opacity={0.8} />
      </Sphere>
    </group>
  );
}

function CentralAvatar() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
      <group ref={groupRef} position={[0, 0, -1]}>
        {/* Abstract human silhouette - head */}
        <Sphere args={[0.35, 32, 32]} position={[0, 0.7, 0]}>
          <meshStandardMaterial
            color="#1e3a5f"
            emissive="#3b82f6"
            emissiveIntensity={0.25}
            transparent
            opacity={0.7}
          />
        </Sphere>
        {/* Body */}
        <mesh position={[0, -0.1, 0]}>
          <capsuleGeometry args={[0.28, 0.7, 16, 32]} />
          <meshStandardMaterial
            color="#1e3a5f"
            emissive="#3b82f6"
            emissiveIntensity={0.2}
            transparent
            opacity={0.65}
          />
        </mesh>
        {/* Inner glow sphere */}
        <Sphere args={[1, 32, 32]} position={[0, 0.2, 0]}>
          <meshBasicMaterial
            color="#3b82f6"
            transparent
            opacity={0.03}
          />
        </Sphere>
      </group>
    </Float>
  );
}

function ParallaxCamera() {
  const { camera } = useThree();
  
  useFrame((state) => {
    const mouseX = state.mouse.x * 0.3;
    const mouseY = state.mouse.y * 0.2;
    
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouseX, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, mouseY, 0.05);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function Scene() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  return (
    <>
      <ParallaxCamera />
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.6} />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#60a5fa" />
      
      {/* Central avatar */}
      <CentralAvatar />
      
      {/* Knowledge nodes */}
      {nodes.map((node) => (
        <KnowledgeNodeMesh key={node.id} node={node} onHover={setHoveredNode} />
      ))}
      
      {/* Connection lines */}
      {connections.map(([startIdx, endIdx], i) => (
        <ConnectionLine
          key={i}
          start={nodes[startIdx].position}
          end={nodes[endIdx].position}
          hoveredNode={hoveredNode}
        />
      ))}

      {/* Ambient particles */}
      <AmbientParticles />
    </>
  );
}

function AmbientParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const positions = new Float32Array(100 * 3);
    for (let i = 0; i < 100; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#60a5fa"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

export function KnowledgeConstellation() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
