import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Roadmap } from './components/Roadmap';
import { Team } from './components/Team';
import { Footer } from './components/Footer';
import { VoiceDemo } from './components/VoiceDemo';
import { PrivacyPage } from './components/PrivacyPage';
import { TermsPage } from './components/TermsPage';
import { FAQPage } from './components/FAQPage';
import { FeedbackPage } from './components/FeedbackPage';
import { ComparePage } from './components/ComparePage';
import { DOWNLOAD_URL, VERSION } from './config';
import './App.css';

function App() {
  const [isVoiceDemoOpen, setIsVoiceDemoOpen] = useState<boolean>(false);
  const [path, setPath] = useState(typeof window !== 'undefined' ? window.location.pathname : '/');

  useEffect(() => {
    const handleLocationChange = () => setPath(window.location.pathname);
    window.addEventListener('popstate', handleLocationChange);
    
    const handleLinkClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (target && target.href) {
        try {
          const url = new URL(target.href);
          if (
            url.origin === window.location.origin && 
            !target.target && 
            !(url.pathname === window.location.pathname && url.hash)
          ) {
            e.preventDefault();
            window.history.pushState({}, '', url.pathname + url.hash);
            setPath(url.pathname);
            if (!url.hash) {
              window.scrollTo(0, 0);
            } else {
              setTimeout(() => {
                const el = document.getElementById(url.hash.slice(1));
                if (el) el.scrollIntoView();
              }, 100);
            }
          }
        } catch {
          // ignore invalid URLs
        }
      }
    };
    
    document.addEventListener('click', handleLinkClick);
    // Skip scroll reveal during SSG pre-rendering so that text isn't hidden (opacity 0) in the static HTML file
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((window as any).isPrerender) {
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let srInstance: any = null;

    import('scrollreveal').then((module) => {
      const ScrollReveal = module.default;
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
        cleanup: true,
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

      srInstance = sr;
    }).catch(() => {
      console.warn("Failed to load ScrollReveal dynamically");
    });

    return () => {
      if (srInstance) {
        srInstance.destroy();
      }
      window.removeEventListener('popstate', handleLocationChange);
      document.removeEventListener('click', handleLinkClick);
    };
  }, []);


  const handleOpenVoiceDemo = () => {
    setIsVoiceDemoOpen(true);
  };

  const handleCloseVoiceDemo = () => {
    setIsVoiceDemoOpen(false);
  };

  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "LAFINA",
    "operatingSystem": "Android, iOS",
    "applicationCategory": "Academic, Educational, Scheduling, Utilities",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "LAFINA is a voice-first, offline-first scheduling assistant for University students. It replaces passive notifications with simulated call reminders that require a spoken acknowledgment to dismiss.",
    "downloadUrl": DOWNLOAD_URL,
    "softwareVersion": VERSION
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 transition-colors duration-300 overflow-x-hidden">
      {/* Structured Data (JSON-LD Schema) for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />

      {/* Navigation Header */}
      <Header onTryVoice={handleOpenVoiceDemo} />

      {/* Main Sections */}
      <main className="flex-grow">
        {path === '/privacy' ? (
          <PrivacyPage />
        ) : path === '/terms' ? (
          <TermsPage />
        ) : path === '/faq' ? (
          <FAQPage />
        ) : path === '/feedback' ? (
          <FeedbackPage />
        ) : path === '/compare' ? (
          <ComparePage />
        ) : path === '/' || path === '' ? (
          <>
            <Hero onTryVoice={handleOpenVoiceDemo} />
            <About />
            <Roadmap />
            <Team />
          </>
        ) : (
          <div className="flex-grow flex items-center justify-center py-xxxl text-center mt-20">
            <div className="max-w-md mx-auto px-lg">
              <h1 className="text-6xl font-headline-lg font-bold text-primary mb-md">404</h1>
              <h2 className="text-2xl font-headline-md font-bold text-slate-900 dark:text-white mb-lg">Page not found</h2>
              <p className="text-slate-600 dark:text-slate-400 font-body-lg mb-xl">Sorry, we couldn't find the page you're looking for.</p>
              <a href="/" className="inline-flex items-center justify-center bg-primary text-white font-bold px-xl py-md rounded-xl hover:bg-primary/90 transition-transform hover:scale-105 active:scale-95 shadow-md">
                Go back home
              </a>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Voice Call Simulation Modal */}
      <VoiceDemo isOpen={isVoiceDemoOpen} onClose={handleCloseVoiceDemo} />
    </div>
  );
}

export default App;
