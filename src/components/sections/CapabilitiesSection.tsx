import { motion } from 'framer-motion';
import { Zap, Users, RefreshCw, MessageSquare } from 'lucide-react';

const capabilities = [
  {
    icon: Zap,
    title: 'Instant Knowledge',
    description: '"What\'s the policy on remote work?" Get instant, cited answers pulled directly from your internal notions, wikis, and PDFs.',
  },
  {
    icon: Users,
    title: 'Role-Specific Flows',
    description: 'Engineers get GitHub setup guides. Sales get CRM protocols. Onboard flows adapt automatically to the user\'s department.',
  },
  {
    icon: RefreshCw,
    title: 'Always Updated',
    description: 'When you update a policy doc, Onboard AI learns it instantly. No manual retraining required. Truth, synchronized.',
  },
  {
    icon: MessageSquare,
    title: 'Human Handoff',
    description: 'Complex emotional questions? The AI gracefully loops in the right HR representative without making the user feel dismissed.',
  },
];

export function CapabilitiesSection() {
  return (
    <section id="features" className="py-32 md:py-40 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Left aligned header */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mb-20 max-w-md"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Calm Intelligence
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed">
            We replaced the robotic chatbot with a context-aware knowledge engine. It doesn't just search; it understands your company's unique dialect.
          </p>
        </motion.div>

        {/* Capability cards - 2x2 grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {capabilities.map((capability, index) => (
            <motion.div
              key={capability.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
              whileHover={{ y: -4, borderColor: 'hsl(var(--primary) / 0.3)' }}
              className="group relative p-8 rounded-xl border border-border/30 bg-card/30 backdrop-blur-sm hover:bg-card/50 transition-all duration-500 cursor-pointer"
            >
              {/* Icon */}
              <motion.div 
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 mb-5"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <capability.icon className="w-5 h-5 text-primary" />
              </motion.div>

              {/* Content */}
              <h3 className="font-sans text-lg font-semibold mb-3 text-foreground">
                {capability.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {capability.description}
              </p>

              {/* Subtle corner accent */}
              <div className="absolute top-4 right-4 w-1 h-1 rounded-full bg-primary/40 group-hover:bg-primary transition-colors duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
