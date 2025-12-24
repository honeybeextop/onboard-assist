import { useRef, useMemo, useState, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Sphere, Line, Html } from '@react-three/drei';
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
    color: '#22d3ee',
    questions: ['How do leaves work?', 'What\'s the remote work policy?']
  },
  { 
    id: 'tools', 
    label: 'Tools', 
    position: [2.6, 1.4, -0.3], 
    color: '#22d3ee',
    questions: ['What tools does my team use?', 'How do I access Slack?']
  },
  { 
    id: 'teams', 
    label: 'Teams', 
    position: [-2.4, -1.5, 0.2], 
    color: '#22d3ee',
    questions: ['Who\'s on my team?', 'Who do I report to?']
  },
  { 
    id: 'faqs', 
    label: 'FAQs', 
    position: [2.8, -1.2, 0.4], 
    color: '#22d3ee',
    questions: ['Who approves expenses?', 'How do I book vacation?']
  },
  { 
    id: 'benefits', 
    label: 'Benefits', 
    position: [0.2, 2.4, -0.2], 
    color: '#22d3ee',
    questions: ['What health plans are available?', 'How does 401k work?']
  },
  { 
    id: 'onboarding', 
    label: 'Onboarding', 
    position: [-0.3, -2.2, 0.3], 
    color: '#22d3ee',
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
  const ringRef = useRef<THREE.Mesh>(null);
  const targetScale = useRef(1);

  useFrame((state, delta) => {
    if (meshRef.current) {
      const scale = isSelected ? 1.6 : isHovered ? 1.4 : (isAnyHovered && !isHovered ? 0.85 : 1);
      targetScale.current = THREE.MathUtils.lerp(targetScale.current, scale, delta * 8);
      meshRef.current.scale.setScalar(targetScale.current);
    }
    if (glowRef.current) {
      const breath = Math.sin(state.clock.elapsedTime * 2) * 0.15 + 1;
      const glowScale = isSelected ? 2.2 : isHovered ? 1.8 : breath * 1.4;
      glowRef.current.scale.setScalar(glowScale);
    }
    if (ringRef.current && isSelected) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group position={node.position}>
        {/* Main node sphere */}
        <Sphere
          ref={meshRef}
          args={[0.12, 32, 32]}
          onPointerOver={() => onHover(node.id)}
          onPointerOut={() => onHover(null)}
          onClick={() => onSelect(isSelected ? null : node.id)}
        >
          <meshStandardMaterial
            color={isSelected ? '#ffffff' : isHovered ? '#67e8f9' : node.color}
            emissive={isSelected ? '#22d3ee' : node.color}
            emissiveIntensity={isSelected ? 1.5 : isHovered ? 1 : 0.5}
            transparent
            opacity={0.95}
          />
        </Sphere>
        
        {/* Outer glow */}
        <Sphere ref={glowRef} args={[0.18, 16, 16]}>
          <meshBasicMaterial
            color={node.color}
            transparent
            opacity={isSelected ? 0.4 : isHovered ? 0.3 : 0.1}
          />
        </Sphere>

        {/* Selection ring */}
        {isSelected && (
          <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.35, 0.015, 8, 32]} />
            <meshBasicMaterial color="#22d3ee" transparent opacity={0.6} />
          </mesh>
        )}

        {/* Ripple effect on click */}
        {isSelected && (
          <>
            <Sphere args={[0.5, 16, 16]}>
              <meshBasicMaterial color="#22d3ee" transparent opacity={0.08} />
            </Sphere>
            <Sphere args={[0.7, 16, 16]}>
              <meshBasicMaterial color="#22d3ee" transparent opacity={0.04} />
            </Sphere>
          </>
        )}

        {/* Hover label */}
        {(isHovered || isSelected) && (
          <Html center distanceFactor={6} style={{ pointerEvents: isSelected ? 'auto' : 'none' }}>
            <div className={`px-4 py-3 rounded-xl backdrop-blur-xl text-sm font-sans whitespace-nowrap animate-scale-in border ${
              isSelected ? 'bg-card/90 border-primary/30 min-w-[200px]' : 'bg-card/70 border-border/30'
            }`}>
              <div className="flex items-center gap-2 mb-1">
                <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-primary animate-pulse' : 'bg-primary/60'}`} />
                <span className="font-medium text-foreground">{node.label}</span>
              </div>
              {isSelected ? (
                <div className="space-y-1.5 mt-3">
                  {node.questions.map((q, i) => (
                    <div 
                      key={i}
                      className="text-xs text-muted-foreground hover:text-primary cursor-pointer transition-colors p-2 rounded-lg hover:bg-primary/10"
                    >
                      "{q}"
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-xs text-muted-foreground">Click to explore</div>
              )}
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
    setPulseProgress((prev) => (prev + delta * (isActive ? 0.4 : 0.2)) % 1);
    
    if (pulseRef.current) {
      const t = pulseProgress;
      pulseRef.current.position.set(
        start[0] + (end[0] - start[0]) * t,
        start[1] + (end[1] - start[1]) * t,
        start[2] + (end[2] - start[2]) * t
      );
      const opacity = Math.sin(t * Math.PI) * (isActive ? 1 : 0.5);
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
        color={isActive ? '#67e8f9' : '#22d3ee'}
        lineWidth={isActive ? 1.5 : 0.5}
        transparent
        opacity={isActive ? 0.5 : 0.12}
      />
      <Sphere ref={pulseRef} args={[isActive ? 0.04 : 0.025, 8, 8]}>
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.8} />
      </Sphere>
    </group>
  );
}

function CentralAvatar({ isActive }: { isActive: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.08;
    }
    if (bodyRef.current) {
      const breathe = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.02;
      bodyRef.current.scale.set(1, breathe, 1);
    }
  });

  return (
    <Float speed={0.8} rotationIntensity={0.05} floatIntensity={0.2}>
      <group ref={groupRef} position={[0, 0, -0.5]}>
        {/* Head */}
        <Sphere args={[0.32, 32, 32]} position={[0, 0.65, 0]}>
          <meshStandardMaterial
            color="#0c4a6e"
            emissive="#22d3ee"
            emissiveIntensity={isActive ? 0.4 : 0.2}
            transparent
            opacity={0.75}
          />
        </Sphere>
        
        {/* Body */}
        <mesh ref={bodyRef} position={[0, -0.1, 0]}>
          <capsuleGeometry args={[0.25, 0.6, 16, 32]} />
          <meshStandardMaterial
            color="#0c4a6e"
            emissive="#22d3ee"
            emissiveIntensity={isActive ? 0.3 : 0.15}
            transparent
            opacity={0.7}
          />
        </mesh>

        {/* Aura */}
        <Sphere args={[1.0, 32, 32]} position={[0, 0.2, 0]}>
          <meshBasicMaterial
            color="#22d3ee"
            transparent
            opacity={isActive ? 0.06 : 0.03}
          />
        </Sphere>
      </group>
    </Float>
  );
}

function ParallaxCamera() {
  const { camera } = useThree();
  
  useFrame((state) => {
    const mouseX = state.mouse.x * 0.5;
    const mouseY = state.mouse.y * 0.3;
    
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouseX, 0.04);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, mouseY, 0.04);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function AmbientParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  
  const { positions, colors, sizes } = useMemo(() => {
    const count = 200;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
      
      // Cyan-tinted particles
      const isBright = Math.random() > 0.8;
      colors[i * 3] = isBright ? 0.4 : 0.13;
      colors[i * 3 + 1] = isBright ? 0.9 : 0.83;
      colors[i * 3 + 2] = isBright ? 0.93 : 0.93;
      
      sizes[i] = Math.random() * 0.015 + 0.008;
    }
    return { positions, colors, sizes };
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.08) * 0.03;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        vertexColors
        transparent
        opacity={0.6}
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
      <ambientLight intensity={0.3} />
      <pointLight position={[8, 8, 8]} intensity={0.4} color="#ffffff" />
      <pointLight position={[-8, -8, -5]} intensity={0.3} color="#22d3ee" />
      <pointLight position={[0, 5, 3]} intensity={0.15} color="#67e8f9" />
      
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
