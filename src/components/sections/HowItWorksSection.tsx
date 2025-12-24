import { motion } from 'framer-motion';
import { HelpCircle, Cpu, CheckCircle } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: HelpCircle,
    title: 'Ask a question',
    description: 'Type any question about policies, tools, processes, or your role.',
  },
  {
    number: '02',
    icon: Cpu,
    title: 'AI understands context',
    description: 'ONBOARD AI interprets your question using company-specific knowledge.',
  },
  {
    number: '03',
    icon: CheckCircle,
    title: 'Get actionable answers',
    description: 'Receive clear, accurate responses with links to relevant resources.',
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-28 md:py-36 px-6 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[700px] bg-primary/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center mb-24"
        >
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-5">
            <span className="text-shiny text-glow">How it</span>{' '}
            <span className="text-gradient-primary">works</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto font-medium">
            Simple, fast, and designed for the modern workplace.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection line */}
          <motion.div 
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/30 to-transparent origin-top hidden md:block" 
          />

          <div className="space-y-16 md:space-y-0">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: index * 0.2, ease: 'easeOut' }}
                className={`relative md:flex items-center gap-8 md:mb-20 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Step content */}
                <motion.div 
                  className={`md:w-1/2 ${index % 2 === 0 ? 'md:text-right md:pr-16' : 'md:text-left md:pl-16'}`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className={`flex items-center gap-4 mb-4 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                    <span className="text-6xl font-serif font-bold text-primary/20">{step.number}</span>
                  </div>
                  <h3 className="font-serif text-2xl md:text-3xl font-bold mb-4 text-shiny">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-lg font-medium">{step.description}</p>
                </motion.div>

                {/* Center icon */}
                <motion.div 
                  className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center w-18 h-18 rounded-full bg-secondary border-2 border-primary/30"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.3, type: 'spring' }}
                  whileHover={{ scale: 1.15, boxShadow: '0 0 30px hsl(var(--primary) / 0.4)' }}
                >
                  <step.icon className="w-8 h-8 text-primary" />
                </motion.div>

                {/* Spacer for alternating layout */}
                <div className="md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
