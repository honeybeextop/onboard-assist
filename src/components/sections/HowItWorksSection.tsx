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
    <section className="py-24 md:py-32 px-6 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="font-serif text-3xl md:text-5xl font-medium mb-4">
            How it <span className="text-gradient-primary">works</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Simple, fast, and designed for the modern workplace.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent hidden md:block" />

          <div className="space-y-12 md:space-y-0">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative md:flex items-center gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Step content */}
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                  <div className={`flex items-center gap-4 mb-4 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                    <span className="text-5xl font-serif text-primary/20">{step.number}</span>
                  </div>
                  <h3 className="font-serif text-2xl font-medium mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>

                {/* Center icon */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center w-16 h-16 rounded-full bg-secondary border border-primary/20">
                  <step.icon className="w-7 h-7 text-primary" />
                </div>

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
