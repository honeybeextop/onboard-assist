import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'How it Works', href: '#how-it-works' },
    { label: 'Capabilities', href: '#features' },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-500 ${
        isScrolled ? 'glass-navbar shadow-lg' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="#"
          className="flex items-center gap-2.5 group"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Orange dot logo */}
          <motion.div 
            className="w-2.5 h-2.5 rounded-full bg-accent"
            animate={{ 
              boxShadow: ['0 0 8px hsl(var(--accent) / 0.5)', '0 0 16px hsl(var(--accent) / 0.8)', '0 0 8px hsl(var(--accent) / 0.5)']
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="font-sans text-base font-semibold text-foreground tracking-tight">ONBOARD AI</span>
        </motion.a>

        {/* Right side - Nav links + CTA */}
        <div className="flex items-center gap-8">
          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -1 }}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {link.label}
              </motion.a>
            ))}
          </nav>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-full px-5 font-medium border-border/50 bg-transparent hover:bg-secondary/50 text-foreground"
            >
              Request Access
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}
