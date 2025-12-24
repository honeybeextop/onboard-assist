import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-20">
      {/* Background gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background pointer-events-none" />
      
      {/* Center glow behind content */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/8 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Trust badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full glass mb-10"
        >
          <span className="h-2 w-2 rounded-full bg-accent animate-pulse shadow-[0_0_8px_hsl(45_90%_60%/0.6)]" />
          <span className="text-sm text-muted-foreground font-medium">Trusted by modern teams</span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight mb-6 leading-[1.1]"
        >
          <span className="text-foreground">Your first day,</span>
          <br />
          <span className="text-gradient-primary">answered.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          ONBOARD AI is your intelligent guide to company policies, processes, and tools. 
          Get instant, accurate answers — from day one and beyond.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button variant="primary" size="lg" className="group min-w-[200px]">
            Start Onboarding
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button variant="ghost" size="lg" className="group min-w-[200px]">
            <Play className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
            View How It Works
          </Button>
        </motion.div>

        {/* Interaction hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="text-xs text-muted-foreground/60 mt-8"
        >
          Hover over the knowledge nodes to explore
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="w-6 h-10 rounded-full border-2 border-muted-foreground/20 flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              className="w-1 h-2 rounded-full bg-primary"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
