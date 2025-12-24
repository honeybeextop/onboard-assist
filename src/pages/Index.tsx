import { Suspense, lazy } from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/sections/HeroSection';
import { CapabilitiesSection } from '@/components/sections/CapabilitiesSection';
import { HowItWorksSection } from '@/components/sections/HowItWorksSection';
import { UseCasesSection } from '@/components/sections/UseCasesSection';
import { Footer } from '@/components/sections/Footer';
import { CustomCursor } from '@/components/CustomCursor';

// Lazy load the 3D component for performance
const KnowledgeConstellation = lazy(() =>
  import('@/components/three/KnowledgeConstellation').then((m) => ({
    default: m.KnowledgeConstellation,
  }))
);

const Index = () => {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* Custom cursor */}
      <CustomCursor />

      {/* Navigation */}
      <Navbar />

      {/* Hero with 3D background */}
      <div className="relative">
        <Suspense fallback={<div className="absolute inset-0 bg-background" />}>
          <KnowledgeConstellation />
        </Suspense>
        <HeroSection />
      </div>

      {/* Content sections */}
      <section id="features">
        <CapabilitiesSection />
      </section>

      <section id="how-it-works">
        <HowItWorksSection />
      </section>

      <section id="use-cases">
        <UseCasesSection />
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
};

export default Index;
