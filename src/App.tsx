import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Roadmap } from './components/Roadmap';
import { Team } from './components/Team';
import { Footer } from './components/Footer';
import { VoiceDemo } from './components/VoiceDemo';
import { PolicyModal } from './components/PolicyModal';
import './App.css';

function App() {
  const [isVoiceDemoOpen, setIsVoiceDemoOpen] = useState<boolean>(false);
  const [isPolicyOpen, setIsPolicyOpen] = useState<boolean>(false);
  const [policyType, setPolicyType] = useState<'privacy' | 'terms'>('privacy');

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
