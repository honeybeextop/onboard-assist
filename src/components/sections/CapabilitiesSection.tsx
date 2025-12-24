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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

export function CapabilitiesSection() {
  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl md:text-5xl font-medium mb-4">
            Everything you need,{' '}
            <span className="text-gradient-primary">right here.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A living onboarding guide that grows with your organization.
          </p>
        </motion.div>

        {/* Capability cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid md:grid-cols-2 gap-6"
        >
          {capabilities.map((capability, index) => (
            <motion.div
              key={capability.title}
              variants={itemVariants}
              className="group relative p-8 rounded-2xl glass-strong hover:border-primary/30 transition-all duration-500"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-5 group-hover:bg-primary/20 transition-colors duration-300">
                  <capability.icon className="w-6 h-6 text-primary" />
                </div>

                {/* Content */}
                <h3 className="font-serif text-xl font-medium mb-3 group-hover:text-primary transition-colors duration-300">
                  {capability.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {capability.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
