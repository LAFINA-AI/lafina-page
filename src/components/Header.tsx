import React, { useEffect, useState } from 'react';
import lafinaLogo from '../assets/lafina_logo.svg';

interface HeaderProps {
  onTryVoice: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onTryVoice }) => {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    // Check if theme is explicitly set to dark in localStorage. Default to light.
    const isDarkTheme = localStorage.getItem('theme') === 'dark';
    
    setIsDark(isDarkTheme);
    if (isDarkTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-border-light dark:border-slate-800 shadow-sm transition-colors duration-300">
      <div className="flex justify-between items-center px-gutter md:px-xxxl py-md max-w-7xl mx-auto">
        
        {/* Brand Logo & Wordmark */}
        <a href="#" className="hover:opacity-95 transition-opacity flex items-center">
          <img 
            src={lafinaLogo} 
            className="h-8 md:h-10 object-contain transition-all duration-300" 
            alt="LAFINA" 
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-xxl">
          <a href="#about" className="nav-link font-body-md text-body-md text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-honey-gold transition-colors duration-200">Mission</a>
          <a href="#roadmap" className="nav-link font-body-md text-body-md text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-honey-gold transition-colors duration-200">Roadmap</a>
          <a href="#team" className="nav-link font-body-md text-body-md text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-honey-gold transition-colors duration-200">Team</a>
          <a href="https://lafina-wiki.vercel.app/" target="_blank" rel="noopener noreferrer" className="nav-link font-body-md text-body-md text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-honey-gold transition-colors duration-200">Wiki</a>
        </nav>

        {/* Controls and Action */}
        <div className="flex items-center gap-sm md:gap-md">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="p-sm rounded-lg text-on-surface-variant dark:text-slate-400 hover:bg-surface-container dark:hover:bg-slate-900 transition-colors"
            aria-label="Toggle Theme"
          >
            {isDark ? (
              <span className="material-symbols-outlined">light_mode</span>
            ) : (
              <span className="material-symbols-outlined">dark_mode</span>
            )}
          </button>

          {/* Quick Demo Button (Visible on medium screens and up) */}
          <button 
            onClick={onTryVoice}
            className="hidden sm:inline-block px-md py-2 border border-primary text-primary dark:border-honey-gold dark:text-honey-gold hover:bg-primary/5 rounded-lg font-body-lg text-[13px] active:scale-95 transition-all"
          >
            Voice Simulator
          </button>

          {/* Download Beta Button */}
          <a
            href="https://github.com/LAFINA-AI/LAFINA/releases/download/v0.2.0-beta/lafina_v0.2.0_beta.apk"
            className="bg-primary text-white dark:bg-primary px-md md:px-lg py-sm rounded-lg font-body-lg text-body-md md:text-body-lg active:scale-95 transition-transform hover:bg-primary/90 shadow-md shadow-primary/20"
          >
            Download APK
          </a>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-sm text-on-surface-variant dark:text-slate-400 hover:bg-surface-container dark:hover:bg-slate-900 rounded-lg"
          >
            <span className="material-symbols-outlined">{mobileMenuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border-light dark:border-slate-800 bg-white dark:bg-slate-950 p-lg space-y-md animate-fadeIn transition-colors duration-300">
          <nav className="flex flex-col gap-md">
            <a 
              href="#about" 
              onClick={() => setMobileMenuOpen(false)}
              className="font-body-md text-body-md text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-honey-gold py-sm border-b border-border-light dark:border-slate-900"
            >
              Mission
            </a>
            <a 
              href="#roadmap" 
              onClick={() => setMobileMenuOpen(false)}
              className="font-body-md text-body-md text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-honey-gold py-sm border-b border-border-light dark:border-slate-900"
            >
              Roadmap
            </a>
            <a 
              href="#team" 
              onClick={() => setMobileMenuOpen(false)}
              className="font-body-md text-body-md text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-honey-gold py-sm border-b border-border-light dark:border-slate-900"
            >
              Team
            </a>
            <a 
              href="https://lafina-wiki.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="font-body-md text-body-md text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-honey-gold py-sm border-b border-border-light dark:border-slate-900"
            >
              Wiki
            </a>
          </nav>
          <div className="flex flex-col gap-sm pt-sm">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onTryVoice();
              }}
              className="w-full py-md border border-primary text-primary dark:border-honey-gold dark:text-honey-gold text-center rounded-lg font-bold"
            >
              Voice Simulator
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
