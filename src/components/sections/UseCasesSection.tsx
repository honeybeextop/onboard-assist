import { motion } from 'framer-motion';
import { UserPlus, HeadphonesIcon, Compass, FileText } from 'lucide-react';

const useCases = [
  {
    icon: UserPlus,
    title: 'New Hires',
    description: 'Navigate your first weeks with confidence. From setting up your laptop to understanding team structures.',
  },
  {
    icon: HeadphonesIcon,
    title: 'HR Support',
    description: 'Reduce repetitive questions. Let ONBOARD AI handle FAQs while your HR team focuses on people.',
  },
  {
    icon: Compass,
    title: 'Tool Discovery',
    description: 'Find the right internal tool for any task. Know who to contact and how to get access.',
  },
  {
    icon: FileText,
    title: 'Policy Clarity',
    description: 'Understand company policies without reading 50-page documents. Just ask.',
  },
];

export function UseCasesSection() {
  return (
    <section id="use-cases" className="py-32 md:py-40 px-6 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Built for real needs
          </h2>
          <p className="text-muted-foreground text-base max-w-lg mx-auto">
            Whether you're starting fresh or seeking answers, ONBOARD AI adapts to you.
          </p>
        </motion.div>

        {/* Use case cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
              whileHover={{ y: -6, borderColor: 'hsl(var(--primary) / 0.2)' }}
              className="group p-6 rounded-xl border border-border/20 bg-card/20 backdrop-blur-sm hover:bg-card/40 transition-all duration-400 cursor-pointer"
            >
              {/* Icon */}
              <motion.div 
                className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5"
                whileHover={{ scale: 1.1, rotate: -5 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <useCase.icon className="w-5 h-5 text-primary" />
              </motion.div>

              <h3 className="font-sans text-base font-semibold mb-2 text-foreground">{useCase.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {useCase.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
