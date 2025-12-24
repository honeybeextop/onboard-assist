import { motion } from 'framer-motion';
import { Sparkles, MessageSquare, Brain, RefreshCw } from 'lucide-react';

const capabilities = [
  {
    icon: Sparkles,
    title: 'Smart Onboarding',
    description: 'Personalized onboarding flows tailored to each role, department, and location.',
  },
  {
    icon: MessageSquare,
    title: 'Instant HR Q&A',
    description: 'Ask about policies, leave balances, benefits, tools — get clear answers instantly.',
  },
  {
    icon: Brain,
    title: 'Context-Aware',
    description: 'Understands your company\'s unique language, culture, and organizational structure.',
  },
  {
    icon: RefreshCw,
    title: 'Always Updated',
    description: 'Automatically syncs with your internal documentation and knowledge bases.',
  },
];

export function CapabilitiesSection() {
  return (
    <section className="py-28 md:py-36 px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center mb-20"
        >
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-5">
            <span className="text-shiny text-glow">Everything you need,</span>{' '}
            <span className="text-gradient-primary">right here.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-medium">
            A living onboarding guide that grows with your organization.
          </p>
        </motion.div>

        {/* Capability cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {capabilities.map((capability, index) => (
            <motion.div
              key={capability.title}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group relative p-8 rounded-2xl glass-strong hover:border-primary/30 transition-all duration-500 cursor-pointer"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Animated border glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
                   style={{ boxShadow: '0 0 30px hsl(var(--primary) / 0.2)' }} />
              
              <div className="relative z-10">
                {/* Icon */}
                <motion.div 
                  className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 mb-6 group-hover:bg-primary/20 transition-all duration-300"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                >
                  <capability.icon className="w-7 h-7 text-primary" />
                </motion.div>

                {/* Content */}
                <h3 className="font-serif text-2xl font-bold mb-3 text-shiny group-hover:text-gradient-primary transition-all duration-300">
                  {capability.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed font-medium">
                  {capability.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
