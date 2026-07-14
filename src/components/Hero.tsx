import React from 'react';
import lafinaLogo from '../assets/lafina_logo.svg';
import calendarDayScreen from '../assets/calendar_day_screem.png';
import chatScreen from '../assets/chat_screen.png';
import noteScreen from '../assets/note_screen.png';
import { Soundwave } from './Soundwave';

interface HeroProps {
  onTryVoice: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onTryVoice }) => {
  return (
    <section className="relative min-h-[95vh] flex flex-col items-center justify-center pt-32 pb-24 md:pb-36 lg:pb-44 overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-300">
      
      {/* Background Gradient Accents (Morning energy -> Evening focus) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-honey-gold/10 via-primary/10 to-deep-indigo/10 blur-3xl -z-10 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-gutter md:px-xxxl w-full grid lg:grid-cols-12 gap-xxxl items-center relative z-10">
        
        {/* Left Side: Brand content */}
        <div className="lg:col-span-7 space-y-xl text-center lg:text-left flex flex-col items-center lg:items-start">
          
          {/* Logo */}
          <div className="-mb-6 md:-mb-10 lg:-mb-14">
            <img 
              src={lafinaLogo} 
              alt="LAFINA Logo" 
              className="h-32 md:h-40 lg:h-48 object-contain transition-all duration-300 -ml-4 lg:-ml-6" 
            />
          </div>

          <h1 className="font-headline-lg text-4xl md:text-5xl lg:text-6xl text-on-surface dark:text-white leading-tight font-headline-lg">
            Your Academic Schedule, <br />
            <span className="lafina-gradient-text">Now with a Voice.</span>
          </h1>

          <p className="font-body-lg text-body-lg text-on-surface-variant dark:text-slate-400 max-w-2xl">
            LAFINA is the voice-first, offline-first scheduling assistant built specifically for Filipino university students. It replaces passive notifications with simulated call reminders that require a spoken acknowledgment to dismiss.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-lg pt-md w-full sm:w-auto">
            {/* Download Button */}
            <a 
              href="https://github.com/LAFINA-AI/LAFINA/releases/download/v0.2.0-beta/lafina_v0.2.0_beta.apk"
              className="w-full sm:w-auto bg-primary text-white px-xxxl py-lg rounded-xl font-bold shadow-xl hover:shadow-2xl hover:bg-primary/95 transition-all active:scale-95 flex items-center justify-center gap-sm"
            >
              <span className="material-symbols-outlined">download</span>
              Download Beta APK
            </a>
            
            {/* Try Voice Button */}
            <button 
              onClick={onTryVoice}
              className="w-full sm:w-auto flex items-center justify-center gap-md bg-surface-container dark:bg-slate-900 px-xl py-lg rounded-xl border border-border-light dark:border-slate-800 shadow-sm hover:bg-surface-container-high dark:hover:bg-slate-800 hover:shadow-md transition-all active:scale-95 text-on-surface dark:text-white"
            >
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-lg">
                <span className="material-symbols-outlined text-white text-md" style={{ fontVariationSettings: "'FILL' 1" }}>mic</span>
              </div>
              <span className="font-body-md text-on-surface-variant dark:text-slate-300 font-semibold">Try Voice Assistant</span>
            </button>
          </div>
          
          {/* Waveform graphic representation */}
          <div className="pt-xxl w-full flex flex-col items-center lg:items-start gap-sm">
            <span className="text-caption text-slate-400 uppercase tracking-widest font-semibold">Realtime On-Device VAD + Whisper STT</span>
            <Soundwave colorClass="bg-gradient-to-r from-honey-gold via-primary to-deep-indigo" heightClass="h-10" barCount={29} isAnimated={true} />
          </div>
        </div>

        {/* Right Side: 3D phone screen showcase */}
        <div className="lg:col-span-5 relative flex justify-center items-center h-[500px] md:h-[600px] hero-showcase-container pt-xxl lg:pt-0">
          {/* Main phone screen (Light mode view) */}
          <div className="absolute w-[220px] md:w-[260px] aspect-[9/19] rounded-[2.5rem] border-8 border-slate-900 dark:border-slate-800 bg-slate-950 shadow-2xl overflow-hidden z-20 hero-showcase-card">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-4 bg-slate-900 rounded-b-xl z-20"></div>
            {/* Screen content */}
            <img src={calendarDayScreen} alt="LAFINA calendar day view" className="w-full h-full object-cover" />
          </div>

          {/* Secondary phone screen (Light mode view - overlapping slightly offset) */}
          <div className="absolute w-[180px] md:w-[220px] aspect-[9/19] rounded-[2rem] border-6 border-slate-900 dark:border-slate-800 bg-slate-950 shadow-2xl overflow-hidden z-10 left-6 bottom-4 md:left-12 md:bottom-8 opacity-75 transform -rotate-12 transition-transform duration-500 hover:z-30 hover:opacity-100 hover:rotate-0 hover:scale-105">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-3 bg-slate-900 rounded-b-lg z-40"></div>
            {/* Dark casing overlay to cover the embedded white bezel in the image */}
            <div className="absolute inset-0 border-y-[8px] border-x-[3px] border-slate-900 dark:border-slate-800 rounded-[1.6rem] pointer-events-none z-30"></div>
            {/* Screen content */}
            <img src={chatScreen} alt="LAFINA chat view" className="w-full h-full object-cover scale-100" />
          </div>

          {/* Tertiary phone screen (Light mode view - overlapping symmetrically on the right) */}
          <div className="absolute w-[180px] md:w-[220px] aspect-[9/19] rounded-[2rem] border-6 border-slate-900 dark:border-slate-800 bg-slate-950 shadow-2xl overflow-hidden z-10 right-6 bottom-4 md:right-12 md:bottom-8 opacity-75 transform rotate-12 transition-transform duration-500 hover:z-30 hover:opacity-100 hover:rotate-0 hover:scale-105">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-3 bg-slate-900 rounded-b-lg z-40"></div>
            {/* Dark casing overlay to cover the embedded white bezel in the image */}
            <div className="absolute inset-0 border-y-[8px] border-x-[3px] border-slate-900 dark:border-slate-800 rounded-[1.6rem] pointer-events-none z-30"></div>
            {/* Screen content */}
            <img src={noteScreen} alt="LAFINA note view" className="w-full h-full object-cover scale-100" />
          </div>


        </div>

      </div>
    </section>
  );
};
