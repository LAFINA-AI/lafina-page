import React, { useEffect, useRef, useState } from 'react';
import lafinaLogo from '../assets/lafina_logo.svg';
import desktopDemoVideo from '../assets/desktop_app/lafina_desktop_demo.mp4';
import desktopDemoPoster from '../assets/desktop_app/lafina_desktop_demo_poster.jpg';
import { DESKTOP_DOWNLOAD_URL, DESKTOP_VERSION, DOWNLOAD_URL } from '../config';

// ─── Feature Cards Data ────────────────────────────────────────────────────────
const features = [
  {
    icon: 'graphic_eq',
    title: 'Voice Assistant',
    description:
      'Say "Hey LAFINA" or hit the button in the sidebar. Ask for your schedule, add a task, or start a session without touching the keyboard.',
    accent: 'primary',
  },
  {
    icon: 'calendar_month',
    title: 'Calendar',
    description:
      'Month, week, and day views of everything on your plate. Classes, deadlines, and study blocks in one timeline you can scan at a glance.',
    accent: 'honey-gold',
  },
  {
    icon: 'description',
    title: 'Notes',
    description:
      'A fast, distraction-free place to capture lecture notes and ideas — stored right alongside the schedule they belong to.',
    accent: 'success-mint',
  },
  {
    icon: 'forum',
    title: 'AI Assistant',
    description:
      'Chat with LAFINA about your coursework. Ask it to summarise, explain, or reorganise what you are working on without leaving the app.',
    accent: 'deep-indigo',
  },
  {
    icon: 'timer',
    title: 'Pomodoro Timer',
    description:
      'Focus sessions with short and long breaks, cycle tracking, and a note of what you are working on. Built in, not bolted on.',
    accent: 'primary',
  },
  {
    icon: 'style',
    title: 'Flashcards',
    description:
      'Turn what you are studying into review decks and drill them between focus blocks — all on the same machine, no extra tool required.',
    accent: 'honey-gold',
  },
  {
    icon: 'menu_book',
    title: 'Study Notes',
    description:
      'Drop in a Word or PowerPoint file and get back structured sections, key terms, and definitions you can save to Notes or export.',
    accent: 'success-mint',
  },
  {
    icon: 'wb_twilight',
    title: 'Daily Morning Briefing',
    description:
      'Start the day with a spoken rundown of what is ahead — the same proactive idea as the phone app, on the machine you actually work on.',
    accent: 'deep-indigo',
  },
  {
    icon: 'contrast',
    title: 'Light & Dark Themes',
    description:
      'A full light and dark theme, 24-hour time, and week-start preferences — set per machine so it matches the rest of your desk setup.',
    accent: 'primary',
  },
];

const accentClasses: Record<string, { bg: string; text: string; border: string }> = {
  'primary': {
    bg: 'bg-primary/10 dark:bg-primary/20',
    text: 'text-primary dark:text-coral-red',
    border: 'hover:border-primary/40',
  },
  'honey-gold': {
    bg: 'bg-honey-gold/10 dark:bg-honey-gold/20',
    text: 'text-honey-gold',
    border: 'hover:border-honey-gold/40',
  },
  'success-mint': {
    bg: 'bg-success-mint/10 dark:bg-success-mint/20',
    text: 'text-success-mint',
    border: 'hover:border-success-mint/40',
  },
  'deep-indigo': {
    bg: 'bg-deep-indigo/10 dark:bg-deep-indigo/20',
    text: 'text-deep-indigo dark:text-primary-fixed-dim',
    border: 'hover:border-deep-indigo/40',
  },
};

// ─── Keyboard Shortcuts (as shown in the app sidebar) ──────────────────────────
const shortcuts = [
  { keys: 'Ctrl + 1', label: 'Calendar', icon: 'calendar_month' },
  { keys: 'Ctrl + 2', label: 'Notes', icon: 'description' },
  { keys: 'Ctrl + 3', label: 'Assistant', icon: 'forum' },
  { keys: 'Ctrl + 4', label: 'Pomodoro', icon: 'timer' },
  { keys: 'Ctrl + 5', label: 'Flashcards', icon: 'style' },
  { keys: 'Ctrl + 6', label: 'Study Notes', icon: 'menu_book' },
];

// ─── Demo Video Player ─────────────────────────────────────────────────────────
/**
 * The video is ~17 MB, so it is not fetched until the visitor actually asks for
 * it: `preload="none"` plus a poster frame keeps the initial page load light.
 */
const DemoPlayer: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  const startPlayback = () => {
    setHasStarted(true);
    videoRef.current?.play().catch(() => {
      /* autoplay blocked — the native controls are visible, so the visitor can start it */
    });
  };

  return (
    <div className="relative rounded-3xl border border-border-light dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 p-2 md:p-3 shadow-xl">
      {/* Faux window chrome, so it reads as a desktop app recording */}
      <div className="flex items-center gap-xs px-sm pb-2">
        <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
        <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
        <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
        <span className="ml-auto text-caption text-slate-400 dark:text-slate-500 font-medium">
          LAFINA Personal — Windows
        </span>
      </div>

      <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 shadow-inner">
        <video
          ref={videoRef}
          src={desktopDemoVideo}
          poster={desktopDemoPoster}
          preload="none"
          controls={hasStarted}
          muted
          playsInline
          onPlay={() => setHasStarted(true)}
          className="w-full h-full object-contain"
        />

        {!hasStarted && (
          <button
            onClick={startPlayback}
            aria-label="Play the LAFINA Desktop demo"
            className="absolute inset-0 flex flex-col items-center justify-center gap-md bg-slate-950/40 hover:bg-slate-950/30 backdrop-blur-[1px] transition-colors group"
          >
            <span className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary text-white shadow-2xl shadow-primary/40 transition-transform duration-300 group-hover:scale-110 group-active:scale-95">
              <span className="material-symbols-outlined text-[36px] md:text-[44px] ml-1">
                play_arrow
              </span>
            </span>
            <span className="text-white font-body-lg text-[14px] drop-shadow-lg">
              Watch the {DESKTOP_VERSION} demo — 2:13
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

// ─── Main Component ────────────────────────────────────────────────────────────
export const DesktopPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'LAFINA Desktop | Voice-First Study Workspace for Windows';

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute(
      'content',
      'Watch the LAFINA Desktop demo. Calendar, notes, AI assistant, Pomodoro, flashcards, and study notes in one voice-first Windows workspace that keeps your data on your machine.',
    );

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://lafina-nine.vercel.app/desktop');

    return () => {
      document.title = 'LAFINA | Voice-First Academic Assistant';
      metaDesc?.setAttribute(
        'content',
        'LAFINA is a voice-first, offline-first scheduling assistant for University students.',
      );
      canonical?.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">

      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-32 pb-xxxl bg-white dark:bg-slate-950">
        {/* Decorative gradient blobs */}
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-gradient-to-bl from-honey-gold/8 via-primary/6 to-deep-indigo/8 rounded-full translate-x-1/3 -translate-y-1/2 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-primary/10 via-honey-gold/5 to-transparent rounded-full -translate-x-1/4 translate-y-1/4 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-gutter md:px-xxxl text-center">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-sm px-lg py-sm bg-primary/10 dark:bg-primary/20 rounded-full mb-xl reveal-fade">
            <span className="material-symbols-outlined text-primary dark:text-coral-red text-[18px]">
              desktop_windows
            </span>
            <span className="text-primary dark:text-coral-red font-label-caps text-label-caps uppercase tracking-wider font-bold">
              New — LAFINA Desktop {DESKTOP_VERSION}
            </span>
          </div>

          {/* Logo + wordmark */}
          <div className="flex justify-center mb-lg reveal-bottom">
            <div className="flex items-center gap-md">
              <img src={lafinaLogo} alt="LAFINA" className="h-12 md:h-16 object-contain" />
              <div className="h-10 w-px bg-border-light dark:bg-slate-700" />
              <span className="font-headline-lg text-2xl md:text-3xl text-on-surface dark:text-white font-bold tracking-wide uppercase">
                Desktop
              </span>
            </div>
          </div>

          <h1 className="font-headline-lg text-4xl md:text-5xl lg:text-6xl text-on-surface dark:text-white leading-tight font-bold mb-xl reveal-bottom">
            The Whole Study Workspace,{' '}
            <br className="hidden md:block" />
            <span className="lafina-gradient-text">On Your Desk.</span>
          </h1>

          <p className="text-body-lg text-[16px] md:text-[18px] text-on-surface-variant dark:text-slate-400 max-w-2xl mx-auto mb-xxxl leading-relaxed reveal-bottom">
            LAFINA Desktop brings the voice assistant to Windows and surrounds it with the tools you
            already keep open while you study — calendar, notes, AI chat, Pomodoro, flashcards, and
            document-to-study-notes. Watch it work below.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-lg reveal-bottom">
            <a
              href="#desktop-demo"
              className="inline-flex items-center gap-sm bg-primary hover:bg-primary/90 text-white font-bold px-xxxl py-lg rounded-xl shadow-xl shadow-primary/20 hover:shadow-2xl transition-all active:scale-95 text-[15px]"
            >
              <span className="material-symbols-outlined">play_circle</span>
              Watch the Demo
            </a>
            <a
              href={DESKTOP_DOWNLOAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-sm bg-surface-container dark:bg-slate-900 text-on-surface dark:text-white font-bold px-xxxl py-lg rounded-xl border border-border-light dark:border-slate-800 hover:bg-surface-container-high dark:hover:bg-slate-800 transition-all active:scale-95 text-[15px]"
            >
              <span className="material-symbols-outlined">download</span>
              Get LAFINA Desktop
            </a>
          </div>
        </div>
      </section>

      {/* ── DEMO VIDEO ────────────────────────────────────────────────────────── */}
      <section
        id="desktop-demo"
        className="py-xxxl bg-surface-container-low dark:bg-slate-900 transition-colors duration-300 scroll-mt-24"
      >
        <div className="max-w-5xl mx-auto px-gutter md:px-xxxl space-y-xl">
          <div className="text-center reveal-fade">
            <div className="inline-block px-lg py-1 bg-honey-gold/10 dark:bg-honey-gold/20 rounded-full mb-md">
              <span className="text-honey-gold font-label-caps text-label-caps uppercase tracking-wider font-bold">
                Full Walkthrough
              </span>
            </div>
            <h2 className="font-headline-lg text-3xl md:text-4xl text-on-surface dark:text-white font-bold mb-sm">
              See LAFINA Desktop in Action
            </h2>
            <p className="text-body-md text-on-surface-variant dark:text-slate-400 max-w-xl mx-auto">
              A single unedited run through the app — launching it, moving through the calendar,
              running a focus session, and turning a lecture deck into study notes.
            </p>
          </div>

          <div className="reveal-scale">
            <DemoPlayer />
          </div>

          <p className="text-center text-caption text-slate-500 dark:text-slate-500">
            Recorded on Windows 11 · LAFINA Personal {DESKTOP_VERSION} · no audio
          </p>
        </div>
      </section>

      {/* ── FEATURES ──────────────────────────────────────────────────────────── */}
      <section id="desktop-features" className="py-xxxl bg-white dark:bg-slate-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-gutter md:px-xxxl space-y-xxl">
          <div className="text-center reveal-fade">
            <div className="inline-block px-lg py-1 bg-primary/10 dark:bg-primary/20 rounded-full mb-md">
              <span className="text-primary dark:text-coral-red font-label-caps text-label-caps uppercase tracking-wider font-bold">
                What's Inside
              </span>
            </div>
            <h2 className="font-headline-lg text-3xl md:text-4xl text-on-surface dark:text-white font-bold mb-sm">
              One Window, Everything Open
            </h2>
            <p className="text-body-md text-on-surface-variant dark:text-slate-400 max-w-xl mx-auto">
              Everything a study session needs, reachable from the sidebar — or from a single
              keystroke.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-lg">
            {features.map((feature, i) => {
              const accent = accentClasses[feature.accent];
              return (
                <div
                  key={i}
                  className={`p-xl rounded-2xl bg-white dark:bg-slate-900/50 border border-border-light dark:border-slate-800 ${accent.border} hover:shadow-lg transition-all duration-300 reveal-stagger`}
                >
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-md ${accent.bg}`}
                  >
                    <span className={`material-symbols-outlined ${accent.text}`}>{feature.icon}</span>
                  </div>
                  <h3 className="font-body-lg text-[16px] font-bold text-on-surface dark:text-white mb-xs">
                    {feature.title}
                  </h3>
                  <p className="text-body-md text-on-surface-variant dark:text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── KEYBOARD SHORTCUTS ────────────────────────────────────────────────── */}
      <section className="py-xxxl bg-surface-container-low dark:bg-slate-900 transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-gutter md:px-xxxl space-y-xl">
          <div className="text-center reveal-fade">
            <div className="inline-block px-lg py-1 bg-deep-indigo/10 dark:bg-deep-indigo/20 rounded-full mb-md">
              <span className="text-deep-indigo dark:text-primary-fixed-dim font-label-caps text-label-caps uppercase tracking-wider font-bold">
                Built for Keyboards
              </span>
            </div>
            <h2 className="font-headline-lg text-3xl md:text-4xl text-on-surface dark:text-white font-bold mb-sm">
              Every Section, One Keystroke Away
            </h2>
            <p className="text-body-md text-on-surface-variant dark:text-slate-400 max-w-xl mx-auto">
              Desktop means a real keyboard. Jump straight to any part of the workspace without
              reaching for the mouse.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-md reveal-bottom">
            {shortcuts.map((shortcut, i) => (
              <div
                key={i}
                className="flex items-center gap-md p-lg rounded-xl bg-white dark:bg-slate-950 border border-border-light dark:border-slate-800"
              >
                <span className="material-symbols-outlined text-primary dark:text-honey-gold text-[20px]">
                  {shortcut.icon}
                </span>
                <span className="font-body-lg text-[15px] font-semibold text-on-surface dark:text-white flex-grow">
                  {shortcut.label}
                </span>
                <kbd className="px-sm py-[3px] rounded-md bg-surface-container dark:bg-slate-800 border border-border-light dark:border-slate-700 text-caption font-semibold text-on-surface-variant dark:text-slate-300 whitespace-nowrap">
                  {shortcut.keys}
                </kbd>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRIVACY / LOCAL DATA ──────────────────────────────────────────────── */}
      <section className="py-xxxl bg-white dark:bg-slate-950 transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-gutter md:px-xxxl">
          <div className="grid md:grid-cols-2 gap-xl items-center">
            <div className="reveal-left">
              <div className="inline-block px-lg py-1 bg-success-mint/10 dark:bg-success-mint/20 rounded-full mb-md">
                <span className="text-success-mint font-label-caps text-label-caps uppercase tracking-wider font-bold">
                  Your Machine, Your Data
                </span>
              </div>
              <h2 className="font-headline-lg text-3xl md:text-4xl text-on-surface dark:text-white font-bold mb-md">
                Stored Locally, Visibly
              </h2>
              <p className="text-body-md text-on-surface-variant dark:text-slate-400 leading-relaxed mb-lg">
                LAFINA Desktop keeps your workspace in a database file on your own machine. Settings
                include a <strong className="text-on-surface dark:text-white">Show database file</strong>{' '}
                button so you can see exactly where it lives, and{' '}
                <strong className="text-on-surface dark:text-white">Clear All Data</strong> to wipe it
                whenever you want. Preferences apply to that machine and stay there.
              </p>
              <a
                href="/privacy"
                className="inline-flex items-center gap-xs font-bold text-primary dark:text-honey-gold hover:underline text-body-md"
              >
                Read the privacy policy
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </a>
            </div>

            <div className="grid gap-md reveal-right">
              {[
                {
                  icon: 'folder_open',
                  title: 'Show database file',
                  body: 'Open the folder holding your workspace file at any time.',
                },
                {
                  icon: 'delete_sweep',
                  title: 'Clear all data',
                  body: 'One action removes everything the app has stored locally.',
                },
                {
                  icon: 'devices',
                  title: 'Per-machine settings',
                  body: 'Time format, week start, theme, and voice options stay on this device.',
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-md p-lg rounded-xl bg-surface-container-low dark:bg-slate-900 border border-border-light dark:border-slate-800"
                >
                  <span className="material-symbols-outlined text-success-mint mt-[2px]">
                    {item.icon}
                  </span>
                  <div>
                    <h3 className="font-body-lg text-[15px] font-bold text-on-surface dark:text-white mb-[2px]">
                      {item.title}
                    </h3>
                    <p className="text-body-md text-on-surface-variant dark:text-slate-400 leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────────── */}
      <section className="py-xxxl bg-surface-container-low dark:bg-slate-900 transition-colors duration-300">
        <div className="max-w-3xl mx-auto px-gutter md:px-xxxl text-center reveal-fade">
          <h2 className="font-headline-lg text-3xl md:text-4xl text-on-surface dark:text-white font-bold mb-md">
            Take LAFINA to Your Desk
          </h2>
          <p className="text-body-md text-on-surface-variant dark:text-slate-400 mb-xxl leading-relaxed">
            LAFINA Desktop runs on Windows 10 and 11. The Android app keeps calling you about what's
            next — use both, or pick the one that fits how you study.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-lg">
            <a
              href={DESKTOP_DOWNLOAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-sm bg-primary hover:bg-primary/90 text-white font-bold px-xxxl py-lg rounded-xl shadow-xl shadow-primary/20 hover:shadow-2xl transition-all active:scale-95 text-[15px]"
            >
              <span className="material-symbols-outlined">desktop_windows</span>
              Get LAFINA Desktop
            </a>
            <a
              href={DOWNLOAD_URL}
              className="inline-flex items-center gap-sm bg-white dark:bg-slate-950 text-on-surface dark:text-white font-bold px-xxxl py-lg rounded-xl border border-border-light dark:border-slate-800 hover:bg-surface-container dark:hover:bg-slate-800 transition-all active:scale-95 text-[15px]"
            >
              <span className="material-symbols-outlined">android</span>
              Download the Android Beta
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
