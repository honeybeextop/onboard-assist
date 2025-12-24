import { motion } from 'framer-motion';
import { ArrowRight, FileText, Shield, Linkedin, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';

const footerLinks = [
  { label: 'Docs', href: '#', icon: FileText },
  { label: 'Security', href: '#', icon: Shield },
  { label: 'LinkedIn', href: '#', icon: Linkedin },
  { label: 'X', href: '#', icon: Twitter },
];

export function Footer() {
  return (
    <footer className="py-20 md:py-28 px-6">
      <div className="max-w-4xl mx-auto">
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl md:text-5xl font-medium mb-6">
            Make onboarding{' '}
            <span className="text-gradient-primary">effortless.</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
            Join forward-thinking teams who trust ONBOARD AI to welcome every new hire with confidence.
          </p>
          <Button variant="primary" size="lg" className="group">
            Get Started Today
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-12" />

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">O</span>
            </div>
            <span className="font-serif text-lg font-medium">ONBOARD AI</span>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-6">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <link.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{link.label}</span>
              </a>
            ))}
          </nav>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © 2024 ONBOARD AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
