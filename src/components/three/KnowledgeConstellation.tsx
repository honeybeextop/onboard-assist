import { useRef, useMemo, useState, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Sphere, Line, Html, Text } from '@react-three/drei';
import * as THREE from 'three';

interface KnowledgeNode {
  id: string;
  label: string;
  position: [number, number, number];
  color: string;
  questions: string[];
}

const nodes: KnowledgeNode[] = [
  { 
    id: 'policies', 
    label: 'Policies', 
    position: [-2.8, 1.2, 0.5], 
    color: '#60a5fa',
    questions: ['How do leaves work?', 'What\'s the remote work policy?']
  },
  { 
    id: 'tools', 
    label: 'Tools', 
    position: [2.6, 1.4, -0.3], 
    color: '#60a5fa',
    questions: ['What tools does my team use?', 'How do I access Slack?']
  },
  { 
    id: 'teams', 
    label: 'Teams', 
    position: [-2.4, -1.5, 0.2], 
    color: '#60a5fa',
    questions: ['Who\'s on my team?', 'Who do I report to?']
  },
  { 
    id: 'faqs', 
    label: 'FAQs', 
    position: [2.8, -1.2, 0.4], 
    color: '#60a5fa',
    questions: ['Who approves expenses?', 'How do I book vacation?']
  },
  { 
    id: 'benefits', 
    label: 'Benefits', 
    position: [0.2, 2.4, -0.2], 
    color: '#60a5fa',
    questions: ['What health plans are available?', 'How does 401k work?']
  },
  { 
    id: 'onboarding', 
    label: 'Onboarding', 
    position: [-0.3, -2.2, 0.3], 
    color: '#60a5fa',
    questions: ['What\'s my first week schedule?', 'Where do I find training?']
  },
];

const connections: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0],
  [0, 4], [1, 3], [2, 4], [0, 3], [1, 5], [2, 5],
];

function KnowledgeNodeMesh({ 
  node, 
  onHover, 
  isHovered,
  isAnyHovered,
  onSelect,
  isSelected
}: { 
  node: KnowledgeNode; 
  onHover: (id: string | null) => void;
  isHovered: boolean;
  isAnyHovered: boolean;
  onSelect: (id: string | null) => void;
  isSelected: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const targetScale = useRef(1);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Smooth scale transition
      const scale = isHovered ? 1.4 : (isAnyHovered && !isHovered ? 0.9 : 1);
      targetScale.current = THREE.MathUtils.lerp(targetScale.current, scale, delta * 8);
      meshRef.current.scale.setScalar(targetScale.current);
    }
    if (glowRef.current) {
      // Breathing animation
      const breath = Math.sin(state.clock.elapsedTime * 2) * 0.1 + 1;
      glowRef.current.scale.setScalar(isHovered ? 1.8 : breath * 1.4);
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
      <group position={node.position}>
        {/* Main node sphere */}
        <Sphere
          ref={meshRef}
          args={[0.18, 32, 32]}
          onPointerOver={() => onHover(node.id)}
          onPointerOut={() => onHover(null)}
          onClick={() => onSelect(isSelected ? null : node.id)}
        >
          <meshStandardMaterial
            color={isHovered ? '#93c5fd' : node.color}
            emissive={node.color}
            emissiveIntensity={isHovered ? 1 : 0.4}
            transparent
            opacity={0.95}
          />
        </Sphere>
        
        {/* Outer glow ring */}
        <Sphere ref={glowRef} args={[0.25, 16, 16]}>
          <meshBasicMaterial
            color={node.color}
            transparent
            opacity={isHovered ? 0.35 : 0.12}
          />
        </Sphere>

        {/* Secondary glow for depth */}
        {isHovered && (
          <Sphere args={[0.4, 16, 16]}>
            <meshBasicMaterial
              color="#fbbf24"
              transparent
              opacity={0.08}
            />
          </Sphere>
        )}

        {/* Label on hover */}
        {isHovered && (
          <Html center distanceFactor={6} style={{ pointerEvents: 'none' }}>
            <div className="px-4 py-2 rounded-xl glass-strong text-sm font-sans text-foreground whitespace-nowrap animate-fade-in shadow-elevated">
              <span className="font-medium">{node.label}</span>
              <div className="text-xs text-muted-foreground mt-1">Click to explore</div>
            </div>
          </Html>
        )}

        {/* Expanded questions panel */}
        {isSelected && (
          <Html center distanceFactor={5} style={{ pointerEvents: 'auto' }}>
            <div className="px-5 py-4 rounded-2xl glass-strong text-sm font-sans min-w-[220px] animate-scale-in shadow-elevated border border-primary/20">
              <div className="font-medium text-foreground mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                {node.label}
              </div>
              <div className="space-y-2">
                {node.questions.map((q, i) => (
                  <div 
                    key={i}
                    className="text-xs text-muted-foreground hover:text-foreground cursor-pointer transition-colors p-2 rounded-lg hover:bg-primary/10"
                  >
                    "{q}"
                  </div>
                ))}
              </div>
            </div>
          </Html>
        )}
      </group>
    </Float>
  );
}

function ConnectionLine({ 
  start, 
  end, 
  isActive,
  delay 
}: { 
  start: [number, number, number]; 
  end: [number, number, number];
  isActive: boolean;
  delay: number;
}) {
  const pulseRef = useRef<THREE.Mesh>(null);
  const [pulseProgress, setPulseProgress] = useState(delay);

  useFrame((state, delta) => {
    // Animate pulse along the line
    setPulseProgress((prev) => (prev + delta * 0.25) % 1);
    
    if (pulseRef.current) {
      const t = pulseProgress;
      pulseRef.current.position.set(
        start[0] + (end[0] - start[0]) * t,
        start[1] + (end[1] - start[1]) * t,
        start[2] + (end[2] - start[2]) * t
      );
      // Fade pulse at edges
      const opacity = Math.sin(t * Math.PI) * (isActive ? 1 : 0.6);
      (pulseRef.current.material as THREE.MeshBasicMaterial).opacity = opacity;
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
        color={isActive ? '#93c5fd' : '#60a5fa'}
        lineWidth={isActive ? 2 : 0.6}
        transparent
        opacity={isActive ? 0.6 : 0.15}
      />
      {/* Traveling energy pulse */}
      <Sphere ref={pulseRef} args={[0.035, 8, 8]}>
        <meshBasicMaterial color="#fbbf24" transparent opacity={0.8} />
      </Sphere>
    </group>
  );
}

function CentralAvatar({ isActive }: { isActive: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle idle rotation
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.08;
    }
    if (bodyRef.current) {
      // Breathing animation
      const breathe = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.02;
      bodyRef.current.scale.set(1, breathe, 1);
    }
  });

  return (
    <Float speed={0.8} rotationIntensity={0.05} floatIntensity={0.2}>
      <group ref={groupRef} position={[0, 0, -0.5]}>
        {/* Abstract human silhouette - head */}
        <Sphere args={[0.38, 32, 32]} position={[0, 0.75, 0]}>
          <meshStandardMaterial
            color="#1a365d"
            emissive="#3b82f6"
            emissiveIntensity={isActive ? 0.35 : 0.2}
            transparent
            opacity={0.75}
          />
        </Sphere>
        
        {/* Body */}
        <mesh ref={bodyRef} position={[0, -0.15, 0]}>
          <capsuleGeometry args={[0.3, 0.75, 16, 32]} />
          <meshStandardMaterial
            color="#1a365d"
            emissive="#3b82f6"
            emissiveIntensity={isActive ? 0.25 : 0.15}
            transparent
            opacity={0.7}
          />
        </mesh>

        {/* Inner aura glow */}
        <Sphere args={[1.1, 32, 32]} position={[0, 0.2, 0]}>
          <meshBasicMaterial
            color="#3b82f6"
            transparent
            opacity={isActive ? 0.06 : 0.03}
          />
        </Sphere>

        {/* Outer atmosphere */}
        <Sphere args={[1.6, 16, 16]} position={[0, 0.2, 0]}>
          <meshBasicMaterial
            color="#60a5fa"
            transparent
            opacity={0.015}
          />
        </Sphere>
      </group>
    </Float>
  );
}

function ParallaxCamera() {
  const { camera } = useThree();
  
  useFrame((state) => {
    const mouseX = state.mouse.x * 0.4;
    const mouseY = state.mouse.y * 0.25;
    
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouseX, 0.03);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, mouseY, 0.03);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function AmbientParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  
  const { positions, colors } = useMemo(() => {
    const count = 150;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
      
      // Mix of sky blue and subtle yellow particles
      const isYellow = Math.random() > 0.85;
      colors[i * 3] = isYellow ? 0.98 : 0.38;
      colors[i * 3 + 1] = isYellow ? 0.75 : 0.63;
      colors[i * 3 + 2] = isYellow ? 0.14 : 0.98;
    }
    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.015;
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.02;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        vertexColors
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
}

function Scene() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const handleHover = useCallback((id: string | null) => {
    setHoveredNode(id);
  }, []);

  const handleSelect = useCallback((id: string | null) => {
    setSelectedNode(id);
  }, []);

  const isAnyActive = hoveredNode !== null || selectedNode !== null;

  return (
    <>
      <ParallaxCamera />
      
      {/* Lighting */}
      <ambientLight intensity={0.35} />
      <pointLight position={[8, 8, 8]} intensity={0.5} color="#ffffff" />
      <pointLight position={[-8, -8, -5]} intensity={0.25} color="#60a5fa" />
      <pointLight position={[0, 5, 3]} intensity={0.2} color="#fbbf24" />
      
      {/* Central avatar */}
      <CentralAvatar isActive={isAnyActive} />
      
      {/* Knowledge nodes */}
      {nodes.map((node) => (
        <KnowledgeNodeMesh 
          key={node.id} 
          node={node} 
          onHover={handleHover}
          isHovered={hoveredNode === node.id}
          isAnyHovered={hoveredNode !== null}
          onSelect={handleSelect}
          isSelected={selectedNode === node.id}
        />
      ))}
      
      {/* Connection lines */}
      {connections.map(([startIdx, endIdx], i) => (
        <ConnectionLine
          key={i}
          start={nodes[startIdx].position}
          end={nodes[endIdx].position}
          isActive={
            hoveredNode === nodes[startIdx].id || 
            hoveredNode === nodes[endIdx].id ||
            selectedNode === nodes[startIdx].id ||
            selectedNode === nodes[endIdx].id
          }
          delay={i * 0.08}
        />
      ))}

      {/* Ambient particles */}
      <AmbientParticles />
    </>
  );
}

export function KnowledgeConstellation() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 48 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
