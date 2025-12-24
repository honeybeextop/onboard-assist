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
    <section className="py-28 md:py-36 px-6 bg-gradient-to-b from-background to-secondary/30 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

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
            <span className="text-shiny text-glow">Built for</span>{' '}
            <span className="text-gradient-primary">real needs</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto font-medium">
            Whether you're starting fresh or seeking answers, ONBOARD AI adapts to you.
          </p>
        </motion.div>

        {/* Use case cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
              whileHover={{ y: -8, scale: 1.03 }}
              className="group p-7 rounded-2xl glass hover:border-primary/20 transition-all duration-400 cursor-pointer"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                   style={{ boxShadow: '0 0 40px hsl(var(--primary) / 0.15)' }} />

              {/* Icon */}
              <motion.div 
                className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-all duration-300"
                whileHover={{ rotate: -5, scale: 1.1 }}
              >
                <useCase.icon className="w-7 h-7 text-primary" />
              </motion.div>

              <h3 className="font-serif text-xl font-bold mb-3 text-shiny">{useCase.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                {useCase.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
