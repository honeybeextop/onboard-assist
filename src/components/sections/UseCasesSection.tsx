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
    <section className="py-24 md:py-32 px-6 bg-gradient-to-b from-background to-secondary/30">
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
            Built for <span className="text-gradient-primary">real needs</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Whether you're starting fresh or seeking answers, ONBOARD AI adapts to you.
          </p>
        </motion.div>

        {/* Use case cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-6 rounded-2xl glass hover:border-primary/20 transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <useCase.icon className="w-6 h-6 text-primary" />
              </div>

              <h3 className="font-serif text-lg font-medium mb-2">{useCase.title}</h3>
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
