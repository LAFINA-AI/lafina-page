import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Roadmap } from './components/Roadmap';
import { Team } from './components/Team';
import { Footer } from './components/Footer';
import { VoiceDemo } from './components/VoiceDemo';
import { PolicyModal } from './components/PolicyModal';
import ScrollReveal from 'scrollreveal';
import './App.css';

function App() {
  const [isVoiceDemoOpen, setIsVoiceDemoOpen] = useState<boolean>(false);
  const [isPolicyOpen, setIsPolicyOpen] = useState<boolean>(false);
  const [policyType, setPolicyType] = useState<'privacy' | 'terms'>('privacy');

  useEffect(() => {
    const sr = ScrollReveal({
      origin: 'bottom',
      distance: '40px',
      duration: 1000,
      delay: 200,
      opacity: 0,
      scale: 1,
      easing: 'cubic-bezier(0.5, 0, 0, 1)',
      mobile: true,
      reset: false,
      viewFactor: 0.1,
    });

    // Simple fade reveal
    sr.reveal('.reveal-fade', {
      distance: '0px',
      duration: 850,
      delay: 150
    });

    // Bottom slide reveal
    sr.reveal('.reveal-bottom', {
      origin: 'bottom',
      distance: '40px',
      duration: 1000
    });

    // Left slide reveal
    sr.reveal('.reveal-left', {
      origin: 'left',
      distance: '40px',
      duration: 1000
    });

    // Right slide reveal
    sr.reveal('.reveal-right', {
      origin: 'right',
      distance: '40px',
      duration: 1000
    });

    // Zoom / Scale reveal
    sr.reveal('.reveal-scale', {
      scale: 0.95,
      duration: 1000,
      distance: '0px'
    });

    // Stagger/sequence reveal for list / grids
    sr.reveal('.reveal-stagger', {
      origin: 'bottom',
      distance: '30px',
      duration: 800,
    }, 150);

    return () => {
      sr.destroy();
    };
  }, []);


  const handleOpenVoiceDemo = () => {
    setIsVoiceDemoOpen(true);
  };

  const handleCloseVoiceDemo = () => {
    setIsVoiceDemoOpen(false);
  };

  const handleOpenPolicy = (type: 'privacy' | 'terms') => {
    setPolicyType(type);
    setIsPolicyOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* Navigation Header */}
      <Header onTryVoice={handleOpenVoiceDemo} />

      {/* Main Sections */}
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero onTryVoice={handleOpenVoiceDemo} />

        {/* About / Mission Section */}
        <About />

        {/* Roadmap / Timeline Section */}
        <Roadmap />

        {/* Team Grid Section */}
        <Team />
      </main>

      {/* Footer */}
      <Footer onOpenPolicy={handleOpenPolicy} />

      {/* Interactive Voice Call Simulation Modal */}
      <VoiceDemo isOpen={isVoiceDemoOpen} onClose={handleCloseVoiceDemo} />

      {/* Policy & Terms Modal */}
      <PolicyModal isOpen={isPolicyOpen} onClose={() => setIsPolicyOpen(false)} type={policyType} />
    </div>
  );
}

export default App;
