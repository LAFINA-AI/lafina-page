import React, { useEffect, useState } from 'react';
import lafinaLogo from '../assets/lafina_logo.svg';
import { DOWNLOAD_URL } from '../config';

interface HeaderProps {
  onTryVoice: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onTryVoice }) => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('theme') === 'dark';
    }
    return false;
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Scroll listener
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check scroll status on mount

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isDark]);

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
    <header 
      className={`fixed left-1/2 -translate-x-1/2 z-40 transition-all duration-700 ease-in-out overflow-hidden ${
        isScrolled 
          ? 'top-4 w-[calc(100%-2rem)] max-w-7xl bg-white/80 dark:bg-slate-950/80 backdrop-blur-lg border border-border-light/80 dark:border-slate-800/80 rounded-2xl md:rounded-full shadow-lg shadow-slate-200/30 dark:shadow-slate-950/50' 
          : 'top-0 w-full bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-border-light dark:border-slate-800 shadow-sm'
      }`}
    >
      <div 
        className={`flex justify-between items-center transition-all duration-700 ease-in-out ${
          isScrolled 
            ? 'px-md md:px-xl py-sm' 
            : 'px-gutter md:px-xxxl py-md'
        } max-w-7xl mx-auto w-full`}
      >
        
        {/* Brand Logo & Wordmark */}
        <a href="/" className="hover:opacity-95 transition-opacity flex items-center">
          <img 
            src={lafinaLogo} 
            className={`object-contain transition-all duration-700 ease-in-out ${
              isScrolled ? 'h-7 md:h-8' : 'h-8 md:h-10'
            }`} 
            alt="LAFINA" 
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-xxl">
          <a href="/#about" className="nav-link font-body-md text-body-md text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-honey-gold transition-colors duration-200">Mission</a>
          <a href="/#roadmap" className="nav-link font-body-md text-body-md text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-honey-gold transition-colors duration-200">Roadmap</a>
          <a href="/#team" className="nav-link font-body-md text-body-md text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-honey-gold transition-colors duration-200">Team</a>
          <a href="/compare" className="nav-link font-body-md text-body-md text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-honey-gold transition-colors duration-200">Compare</a>
          <a href="/faq" className="nav-link font-body-md text-body-md text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-honey-gold transition-colors duration-200">FAQ</a>
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
            className={`hidden sm:inline-block border border-primary text-primary dark:border-honey-gold dark:text-honey-gold hover:bg-primary/5 rounded-lg font-body-lg text-[13px] active:scale-95 transition-all duration-700 ease-in-out ${
              isScrolled ? 'px-sm py-1.5' : 'px-md py-2'
            }`}
          >
            Voice Simulator
          </button>

          {/* Download Beta Button */}
          <a
            href={DOWNLOAD_URL}
            className={`bg-primary text-white dark:bg-primary rounded-lg font-body-lg active:scale-95 transition-all duration-700 ease-in-out hover:bg-primary/90 shadow-md shadow-primary/20 ${
              isScrolled ? 'px-sm md:px-md py-1.5' : 'px-md md:px-lg py-sm'
            }`}
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
              href="/#about" 
              onClick={() => setMobileMenuOpen(false)}
              className="font-body-md text-body-md text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-honey-gold py-sm border-b border-border-light dark:border-slate-900"
            >
              Mission
            </a>
            <a 
              href="/#roadmap" 
              onClick={() => setMobileMenuOpen(false)}
              className="font-body-md text-body-md text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-honey-gold py-sm border-b border-border-light dark:border-slate-900"
            >
              Roadmap
            </a>
            <a 
              href="/#team" 
              onClick={() => setMobileMenuOpen(false)}
              className="font-body-md text-body-md text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-honey-gold py-sm border-b border-border-light dark:border-slate-900"
            >
              Team
            </a>
            <a 
              href="/compare" 
              onClick={() => setMobileMenuOpen(false)}
              className="font-body-md text-body-md text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-honey-gold py-sm border-b border-border-light dark:border-slate-900"
            >
              Compare
            </a>
            <a 
              href="/faq" 
              onClick={() => setMobileMenuOpen(false)}
              className="font-body-md text-body-md text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-honey-gold py-sm border-b border-border-light dark:border-slate-900"
            >
              FAQ
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
