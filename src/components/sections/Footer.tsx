import { motion } from 'framer-motion';
import { ArrowRight, FileText, Shield, Linkedin, Twitter, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const footerLinks = [
  { label: 'Docs', href: '#', icon: FileText },
  { label: 'Security', href: '#', icon: Shield },
  { label: 'LinkedIn', href: '#', icon: Linkedin },
  { label: 'X', href: '#', icon: Twitter },
];

export function Footer() {
  return (
    <footer className="py-24 md:py-32 px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center mb-20"
        >
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-shiny text-glow">Make onboarding</span>{' '}
            <span className="text-gradient-primary">effortless.</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto font-medium">
            Join forward-thinking teams who trust ONBOARD AI to welcome every new hire with confidence.
          </p>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button variant="primary" size="lg" className="group font-semibold text-base min-w-[220px]">
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-16" 
        />

        {/* Bottom section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col md:flex-row items-center justify-between gap-8"
        >
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center shadow-glow">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-serif text-xl font-bold text-shiny">ONBOARD AI</span>
          </motion.div>

          {/* Links */}
          <nav className="flex items-center gap-8">
            {footerLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -2, color: 'hsl(var(--primary))' }}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium"
              >
                <link.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{link.label}</span>
              </motion.a>
            ))}
          </nav>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground font-medium">
            © 2024 ONBOARD AI
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
