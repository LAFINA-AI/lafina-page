import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Roadmap } from './components/Roadmap';
import { Team } from './components/Team';
import { Footer } from './components/Footer';
import { VoiceDemo } from './components/VoiceDemo';
import './App.css';

function App() {
  const [isVoiceDemoOpen, setIsVoiceDemoOpen] = useState<boolean>(false);

  const handleOpenVoiceDemo = () => {
    setIsVoiceDemoOpen(true);
  };

  const handleCloseVoiceDemo = () => {
    setIsVoiceDemoOpen(false);
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
      <Footer />

      {/* Interactive Voice Call Simulation Modal */}
      <VoiceDemo isOpen={isVoiceDemoOpen} onClose={handleCloseVoiceDemo} />
    </div>
  );
}

export default App;
