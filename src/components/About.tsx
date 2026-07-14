import React, { useState, useEffect } from 'react';

import phoneOnboarding from '../assets/phone_screen/phone_onboarding_screen.png';
import phoneRegistration from '../assets/phone_screen/phone_registration_screen.png';
import phoneLogin from '../assets/phone_screen/phone_login_screen.png';
import phoneCalendarDay from '../assets/phone_screen/phone_calendar_day_screen.png';
import phoneCalendarWeek from '../assets/phone_screen/phone_calendar_week_screen.png';
import phoneCalendarMonth from '../assets/phone_screen/phone_calendar_month_screen.png';
import phoneChat from '../assets/phone_screen/phone_chat_screen.png';
import phoneNote from '../assets/phone_screen/phone_note_screen.png';

const screens = [
  phoneOnboarding,
  phoneRegistration,
  phoneLogin,
  phoneCalendarDay,
  phoneCalendarWeek,
  phoneCalendarMonth,
  phoneChat,
  phoneNote
];

const screenLabels = [
  "Onboarding Setup",
  "Account Registration",
  "User Sign In",
  "Daily Schedule View",
  "Weekly Timeline View",
  "Monthly Calendar View",
  "Offline AI Assistant",
  "Quick Notes Manager"
];

export const About: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % screens.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const leftIndex = (currentIndex - 1 + screens.length) % screens.length;
  const rightIndex = (currentIndex + 1) % screens.length;

  return (
    <section id="about" className="scroll-mt-20 py-xxxl bg-surface-container-low dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-gutter md:px-xxxl space-y-xxxl">
        
        {/* Top: Introduction */}
        <div className="grid lg:grid-cols-12 gap-xxxl items-center">
          <div className="lg:col-span-7 space-y-xl text-left reveal-left">
            <div className="inline-block px-lg py-1 bg-primary/10 dark:bg-primary/20 rounded-full">
              <span className="text-primary dark:text-coral-red font-label-caps text-label-caps uppercase tracking-wider">
                Our Mission
              </span>
            </div>
            <h2 className="font-headline-lg text-3xl md:text-headline-lg text-on-surface dark:text-white leading-tight font-headline-lg">
              Designed for the <br />
              <span className="lafina-gradient-text">Academic Hustle.</span>
            </h2>
            <p className="text-body-lg text-on-surface-variant dark:text-slate-400">
              University students face complex class schedules, exams, and projects that are easily lost in cluttered notifications. LAFINA acts as your on-device personal assistant, using offline AI to transcribe speech and run background alarms.
            </p>
            <p className="text-body-md text-on-surface-variant dark:text-slate-400">
              By running all heavy computations locally (VAD, speech-to-text, scheduling recommendations), the app demands zero cell data or active connection. Your schedule and reminders fire on time, every time, even in basement classrooms or remote campuses.
            </p>
          </div>

          {/* Top Right: App Showcase Mockups (Triple Phone Overlapping Carousel) */}
          <div className="lg:col-span-5 flex flex-col justify-center items-center h-[480px] md:h-[560px] pt-lg lg:pt-0 relative overflow-hidden reveal-right">
            <div className="relative w-full h-[380px] md:h-[460px] flex justify-center items-center">
              {/* Left phone */}
              <div className="absolute w-[130px] md:w-[160px] aspect-[9/20] z-10 -translate-x-[60px] md:-translate-x-[80px] -rotate-12 opacity-40 transition-all duration-500 ease-in-out pointer-events-none">
                <img 
                  key={`left-${leftIndex}`} 
                  src={screens[leftIndex]} 
                  alt="LAFINA screen showcase left" 
                  className="w-full h-full object-contain animate-fadeIn" 
                />
              </div>

              {/* Center phone */}
              <div className="absolute w-[160px] md:w-[200px] aspect-[9/20] z-20 transition-all duration-500 ease-in-out hover:scale-105">
                <img 
                  key={`center-${currentIndex}`} 
                  src={screens[currentIndex]} 
                  alt="LAFINA screen showcase center" 
                  className="w-full h-full object-contain animate-fadeIn" 
                />
              </div>

              {/* Right phone */}
              <div className="absolute w-[130px] md:w-[160px] aspect-[9/20] z-10 translate-x-[60px] md:translate-x-[80px] rotate-12 opacity-40 transition-all duration-500 ease-in-out pointer-events-none">
                <img 
                  key={`right-${rightIndex}`} 
                  src={screens[rightIndex]} 
                  alt="LAFINA screen showcase right" 
                  className="w-full h-full object-contain animate-fadeIn" 
                />
              </div>
            </div>

            {/* Dynamic Label for Active Screen */}
            <div className="text-center mt-md space-y-xs min-h-[48px]">
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                Active View
              </p>
              <h4 className="font-title-sm text-[14px] md:text-[16px] text-on-surface dark:text-white font-bold transition-all duration-300">
                {screenLabels[currentIndex]}
              </h4>
            </div>
          </div>
        </div>

        {/* Bottom: Feature Pillar Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-lg pt-lg">
          
          {/* Card 1: Voice First */}
          <div className="bg-white dark:bg-slate-950 p-xl rounded-2xl border border-border-light dark:border-slate-850 shadow-sm hover:shadow-md hover:border-primary/30 transition-all text-left space-y-md group reveal-stagger">
            <div className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary dark:text-coral-red group-hover:bg-primary group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-2xl">translate</span>
            </div>
            <h3 className="font-title-sm text-title-sm text-on-surface dark:text-white font-bold">Voice First</h3>
            <p className="text-body-md text-on-surface-variant dark:text-slate-400">
              Natural language interaction. Use simple verbal phrases to view, create, or modify deadlines hands-free.
            </p>
          </div>

          {/* Card 2: Offline-First */}
          <div className="bg-white dark:bg-slate-950 p-xl rounded-2xl border border-border-light dark:border-slate-850 shadow-sm hover:shadow-md hover:border-honey-gold/30 transition-all text-left space-y-md group reveal-stagger">
            <div className="w-12 h-12 rounded-xl bg-honey-gold/10 dark:bg-honey-gold/20 flex items-center justify-center text-honey-gold group-hover:bg-honey-gold group-hover:text-slate-950 transition-colors">
              <span className="material-symbols-outlined text-2xl">signal_cellular_nodata</span>
            </div>
            <h3 className="font-title-sm text-title-sm text-on-surface dark:text-white font-bold">Offline-First</h3>
            <p className="text-body-md text-on-surface-variant dark:text-slate-400">
              Whisper.cpp (STT), SmolLM2 (NLU), and SQLite run local. All schedules sync silently only when internet is back.
            </p>
          </div>

          {/* Card 3: Privacy Lock */}
          <div className="bg-white dark:bg-slate-950 p-xl rounded-2xl border border-border-light dark:border-slate-850 shadow-sm hover:shadow-md hover:border-success-mint/30 transition-all text-left space-y-md group reveal-stagger">
            <div className="w-12 h-12 rounded-xl bg-success-mint/10 dark:bg-success-mint/20 flex items-center justify-center text-success-mint group-hover:bg-success-mint group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-2xl">shield</span>
            </div>
            <h3 className="font-title-sm text-title-sm text-on-surface dark:text-white font-bold">100% On-Device</h3>
            <p className="text-body-md text-on-surface-variant dark:text-slate-400">
              No remote database tracking. Your notes, schedules, and recordings remain secure on local SQLite storage.
            </p>
          </div>

          {/* Card 4: Proactive Reminders */}
          <div className="bg-white dark:bg-slate-950 p-xl rounded-2xl border border-border-light dark:border-slate-850 shadow-sm hover:shadow-md hover:border-deep-indigo/30 transition-all text-left space-y-md group reveal-stagger">
            <div className="w-12 h-12 rounded-xl bg-deep-indigo/10 dark:bg-deep-indigo/20 flex items-center justify-center text-deep-indigo dark:text-primary-fixed-dim group-hover:bg-deep-indigo group-hover:text-white dark:group-hover:bg-primary dark:group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-2xl">phone_in_talk</span>
            </div>
            <h3 className="font-title-sm text-title-sm text-on-surface dark:text-white font-bold">Call Reminders</h3>
            <p className="text-body-md text-on-surface-variant dark:text-slate-400">
              Simulated phone call alarms force direct focus on incoming tasks. Acknowledging or snoozing requires speech.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
