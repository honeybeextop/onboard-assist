import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Shield, Linkedin, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const footerLinks = [
  { label: 'Docs', href: '#', icon: FileText },
  { label: 'Security', href: '#', icon: Shield },
  { label: 'LinkedIn', href: '#', icon: Linkedin },
  { label: 'X (Twitter)', href: '#', icon: Twitter },
];

export function Footer() {
  const [email, setEmail] = useState('');

  return (
    <footer className="py-20 md:py-24 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mb-16"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8 text-foreground">
            Make onboarding effortless.
          </h2>
          
          {/* Email signup */}
          <div className="flex flex-col sm:flex-row gap-3 max-w-md">
            <Input 
              type="email"
              placeholder="work email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-secondary/50 border-border/30 rounded-lg px-4 py-3 text-sm placeholder:text-muted-foreground/60"
            />
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button 
                variant="secondary"
                className="bg-foreground text-background hover:bg-foreground/90 rounded-lg px-6 font-medium"
              >
                Join
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pt-8 border-t border-border/20"
        >
          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © 2024 ONBOARD AI Inc.
          </p>

          {/* Links */}
          <nav className="flex items-center gap-6">
            {footerLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -2, color: 'hsl(var(--foreground))' }}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {link.label}
              </motion.a>
            ))}
          </nav>

          {/* Tagline */}
          <p className="text-sm text-muted-foreground italic">
            Designed for Humans.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
