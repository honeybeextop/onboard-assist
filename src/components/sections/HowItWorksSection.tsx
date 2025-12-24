import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Ask Naturally',
    description: 'New hires type exactly as they think. "How do I set up my health insurance?" No keywords needed.',
  },
  {
    number: '02',
    title: 'Context Match',
    description: 'The constellation engine analyzes thousands of internal docs to find the specific paragraph that applies.',
  },
  {
    number: '03',
    title: 'Actionable Answer',
    description: 'A clear summary is generated with direct links to the source material. Trust is maintained.',
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-32 md:py-40 px-6 relative overflow-hidden">
      {/* Background constellation visual */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]">
          {/* Animated dots */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary/30 rounded-full"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
              }}
              animate={{
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
          {/* Connection lines */}
          <svg className="absolute inset-0 w-full h-full opacity-10">
            <line x1="30%" y1="30%" x2="70%" y2="40%" stroke="hsl(var(--primary))" strokeWidth="0.5" />
            <line x1="70%" y1="40%" x2="50%" y2="70%" stroke="hsl(var(--primary))" strokeWidth="0.5" />
            <line x1="50%" y1="70%" x2="30%" y2="30%" stroke="hsl(var(--primary))" strokeWidth="0.5" />
          </svg>
        </div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center mb-24"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-foreground">
            From question to clarity
          </h2>
          <p className="text-muted-foreground text-base">
            Simplicity by design.
          </p>
        </motion.div>

        {/* Steps - horizontal layout */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
              className="text-center md:text-left"
            >
              {/* Step number */}
              <motion.span 
                className="inline-block text-5xl md:text-6xl font-serif text-primary/20 mb-4"
                whileHover={{ color: 'hsl(var(--primary) / 0.4)', scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                {step.number}
              </motion.span>

              <h3 className="font-sans text-xl font-semibold mb-3 text-foreground">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
