import React from 'react';
import lafinaLogo from '../assets/lafina_logo.svg';
import { Soundwave } from './Soundwave';
import { DOWNLOAD_URL, DISPLAY_VERSION } from '../config';

interface FooterProps {
  onOpenPolicy: (type: 'privacy' | 'terms') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPolicy }) => {
  return (
    <footer id="download" className="bg-slate-dark text-white py-xxxl border-t border-white/5 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-gutter md:px-xxxl space-y-xxxl">
        
        {/* Top: Description & Links */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-xxl">
          
          {/* Logo & Description */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-md max-w-sm">
            <div className="flex items-center gap-xs">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center p-[1px]">
                <img src={lafinaLogo} alt="LAFINA logo" className="h-6 w-auto object-contain" />
              </div>
              <span className="font-headline-lg text-title-sm tracking-wider font-bold uppercase">
                LAFINA
              </span>
            </div>
            <p className="text-caption text-slate-400 opacity-80 leading-relaxed">
              Revolutionizing academic scheduling for university students through proactive voice technology. Keep organized, protect your privacy, and never miss an class alarm or exam deadline.
            </p>
            
            {/* Beta APK Download Container (for the #download anchor) */}
            <div className="pt-sm w-full">
              <a 
                href={DOWNLOAD_URL} 
                className="inline-flex items-center gap-sm bg-white text-slate-950 px-lg py-sm rounded-lg font-bold text-caption uppercase hover:bg-slate-200 transition-colors shadow-lg active:scale-95"
              >
                <span className="material-symbols-outlined text-[16px]">download</span>
                Download Beta {DISPLAY_VERSION} APK
              </a>
              <span className="block text-[9px] text-slate-500 mt-2 font-mono">Requires Android 10+ | Size: ~672MB</span>
            </div>
          </div>

          {/* Links Column Grid */}
          <div className="flex gap-xxl">
            
            {/* Column 1: Explore */}
            <div className="flex flex-col items-center md:items-start gap-sm">
              <span className="font-label-caps text-label-caps text-white/40 uppercase tracking-widest font-bold">Explore</span>
              <a href="https://lafina-wiki.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-primary dark:hover:text-honey-gold transition-colors text-body-md text-slate-400">Wiki Portal</a>
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  onOpenPolicy('privacy');
                }}
                className="hover:text-primary dark:hover:text-honey-gold transition-colors text-body-md text-slate-400"
              >
                Privacy Policy
              </a>
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  onOpenPolicy('terms');
                }}
                className="hover:text-primary dark:hover:text-honey-gold transition-colors text-body-md text-slate-400"
              >
                Terms of Service
              </a>
            </div>
            
            {/* Column 2: Socials */}
            <div className="flex flex-col items-center md:items-start gap-sm">
              <span className="font-label-caps text-label-caps text-white/40 uppercase tracking-widest font-bold">Socials</span>
              <a href="https://github.com/LAFINA-AI" target="_blank" className="hover:text-primary dark:hover:text-honey-gold transition-colors text-body-md text-slate-400">GitHub</a>
              {/* <a href="#" target="_blank" className="hover:text-primary dark:hover:text-honey-gold transition-colors text-body-md text-slate-400">LinkedIn</a> */}
              <a href="https://www.facebook.com/lafinaph" target="_blank" className="hover:text-primary dark:hover:text-honey-gold transition-colors text-body-md text-slate-400">Facebook Page</a>
            </div>

          </div>

        </div>

        {/* Bottom: Copyright & Soundwave Indicator */}
        <div className="pt-xxl border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-lg">
          
          <div className="flex items-center gap-md opacity-40 hover:opacity-80 transition-opacity">
            <div className="h-8">
              <Soundwave colorClass="bg-white" heightClass="h-7" barCount={13} isAnimated={true} />
            </div>
            <span className="font-caption text-caption uppercase tracking-widest text-white font-semibold">
              LAFINA | DreamCachers
            </span>
          </div>

          <p className="font-caption text-caption text-slate-500">
            © 2026 LAFINA. On-device academic voice assistant.
          </p>

        </div>

      </div>
    </footer>
  );
};
