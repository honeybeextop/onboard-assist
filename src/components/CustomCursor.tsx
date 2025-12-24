import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const particleId = useRef(0);
  const lastSpawn = useRef(0);

  const spawnParticle = useCallback((x: number, y: number) => {
    const now = Date.now();
    if (now - lastSpawn.current < 50) return; // Throttle particle spawn
    lastSpawn.current = now;

    const angle = Math.random() * Math.PI * 2;
    const speed = 0.5 + Math.random() * 1;
    
    const newParticle: Particle = {
      id: particleId.current++,
      x: x + (Math.random() - 0.5) * 16,
      y: y + (Math.random() - 0.5) * 16,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
    };
    
    setParticles((prev) => [...prev.slice(-12), newParticle]);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
      
      // Spawn particles while moving
      if (Math.random() > 0.6) {
        spawnParticle(e.clientX, e.clientY);
      }

      // Check if hovering interactive element
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[role="button"]');
      setIsHoveringInteractive(!!isInteractive);
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      // Burst of particles on click
      for (let i = 0; i < 5; i++) {
        setTimeout(() => spawnParticle(e.clientX, e.clientY), i * 20);
      }
    };
    
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [spawnParticle]);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
      {/* Particle trail */}
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{ opacity: 0.9, scale: 1 }}
            animate={{ 
              opacity: 0, 
              scale: 0,
              x: particle.vx * 30,
              y: particle.vy * 30
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="absolute h-1.5 w-1.5 rounded-full bg-accent"
            style={{ 
              left: particle.x - 3, 
              top: particle.y - 3,
              boxShadow: '0 0 6px hsl(45 90% 60% / 0.6)'
            }}
          />
        ))}
      </AnimatePresence>

      {/* Main cursor dot */}
      <motion.div
        className="absolute"
        animate={{
          x: position.x - 5,
          y: position.y - 5,
          scale: isClicking ? 0.6 : isHoveringInteractive ? 1.5 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 600, damping: 30 }}
      >
        <div 
          className="h-2.5 w-2.5 rounded-full bg-accent"
          style={{ boxShadow: '0 0 16px hsl(45 90% 60% / 0.7)' }}
        />
      </motion.div>

      {/* Cursor ring for interactive elements */}
      <motion.div
        className="absolute"
        animate={{
          x: position.x - 20,
          y: position.y - 20,
          scale: isHoveringInteractive ? 1 : 0,
          opacity: isHoveringInteractive ? 0.5 : 0,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        <div className="h-10 w-10 rounded-full border-2 border-accent" />
      </motion.div>

      {/* Click ripple */}
      <AnimatePresence>
        {isClicking && (
          <motion.div
            initial={{ scale: 0.3, opacity: 0.6 }}
            animate={{ scale: 2.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="absolute rounded-full border-2 border-accent"
            style={{ 
              left: position.x - 20, 
              top: position.y - 20,
              width: 40,
              height: 40
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
