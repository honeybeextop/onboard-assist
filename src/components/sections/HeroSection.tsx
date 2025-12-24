import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-24">
      {/* Background gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/30 to-background pointer-events-none" />
      
      {/* Animated glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px] animate-pulse-soft pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[100px] animate-pulse-soft pointer-events-none" style={{ animationDelay: '1.5s' }} />
      
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Trust badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full glass mb-10"
        >
          <motion.span 
            className="h-2 w-2 rounded-full bg-accent"
            animate={{ 
              boxShadow: ['0 0 8px hsl(45 90% 60% / 0.4)', '0 0 20px hsl(45 90% 60% / 0.8)', '0 0 8px hsl(45 90% 60% / 0.4)']
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-sm text-foreground/80 font-medium tracking-wide">Trusted by modern teams</span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-[1.1]"
        >
          <motion.span 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0, ease: 'easeOut' }}
            className="block text-shiny text-glow"
          >
            Your first day,
          </motion.span>
          <motion.span 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
            className="block text-gradient-primary"
          >
            answered.
          </motion.span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto mb-12 leading-relaxed font-medium"
        >
          ONBOARD AI is your intelligent guide to company policies, processes, and tools. 
          Get instant, accurate answers — from day one and beyond.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button variant="primary" size="lg" className="group min-w-[220px] font-semibold text-base">
            <motion.span
              className="flex items-center"
              whileHover={{ x: 3 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              Start Onboarding
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </motion.span>
          </Button>
          <Button variant="ghost" size="lg" className="group min-w-[220px] font-semibold text-base">
            <motion.span
              className="flex items-center"
              whileHover={{ scale: 1.02 }}
            >
              <Play className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
              View How It Works
            </motion.span>
          </Button>
        </motion.div>

        {/* Interaction hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="text-sm text-foreground/40 mt-12 font-medium"
        >
          ✨ Hover over the knowledge nodes to explore
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-7 h-12 rounded-full border-2 border-foreground/20 flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ opacity: [1, 0.2, 1], y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-3 rounded-full bg-primary"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
