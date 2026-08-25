import React, { useState, useEffect } from 'react';
import lafinaLogo from '../assets/lafina_logo.svg';

const BUSINESS_CONTACT_URL = 'https://www.facebook.com/lafinaph';

// ─── FAQ Data ──────────────────────────────────────────────────────────────────
const faqs = [
  {
    question: 'What is LAFINA Business?',
    answer:
      'LAFINA Business extends the personal LAFINA assistant into a full team productivity platform. Companies get a shared workspace where managers can assign tasks, schedule employees, record meetings, and collaborate — while each employee still keeps their private personal LAFINA space.',
  },
  {
    question: 'Can employees still use their personal LAFINA?',
    answer:
      'Yes. LAFINA Business is additive, not a replacement. Every employee can switch between their personal space (private tasks, notes, calendar) and the shared company workspace at any time from within the same app.',
  },
  {
    question: 'How does seat-based access work?',
    answer:
      'The business admin pays for and manages access licences for the team. Each licence represents one employee seat. Managers can invite, remove, or reassign seats as the team grows or changes.',
  },
  {
    question: 'Is meeting recording stored on the company server?',
    answer:
      'Meeting transcripts and summaries are synced to the business workspace so relevant team members can review them. Detected action items are surfaced for human review before any task is created — nothing is automatically executed.',
  },
  {
    question: 'Does LAFINA Business require an internet connection?',
    answer:
      'LAFINA Business supports offline work. Business information and tasks cached on the device are still accessible without connectivity. Changes sync automatically once the device reconnects.',
  },
  {
    question: 'How do I connect Gmail for my team?',
    answer:
      'Each employee individually connects their own Gmail account inside LAFINA Business. This means everyone controls their own credentials — the company admin cannot read employee emails. Employees can read, compose, reply, and send emails without leaving the app.',
  },
];

// ─── Comparison Data ───────────────────────────────────────────────────────────
const comparisonRows = [
  { feature: 'Target user', personal: 'Individual', business: 'Teams & companies' },
  { feature: 'Workspace', personal: 'Private personal space', business: 'Shared company workspace + personal space' },
  { feature: 'Task management', personal: 'Personal tasks & reminders', business: 'Assign tasks to one or multiple employees' },
  { feature: 'Roles', personal: 'Single user', business: 'Manager, Employee — different permissions' },
  { feature: 'Team schedules', personal: 'Personal calendar only', business: 'Managers schedule employees & manage work blocks' },
  { feature: 'Chat', personal: 'AI assistant chat', business: 'AI assistant + company-wide chat + task comments' },
  { feature: 'Meeting tools', personal: '—', business: 'Record, transcribe, summarise, detect action items' },
  { feature: 'Email', personal: '—', business: 'Gmail integration per employee' },
  { feature: 'Offline support', personal: 'Full offline AI on-device', business: 'Business data cached; syncs when reconnected' },
  { feature: 'Notes & Calendar', personal: 'Personal only', business: 'Personal + shared business notes and calendar' },
];

// ─── Feature Cards Data ────────────────────────────────────────────────────────
const features = [
  {
    icon: 'corporate_fare',
    title: 'Company Workspaces',
    description: 'Create a dedicated LAFINA workspace for your business. Keep all company tasks, schedules, and communications in one organised hub.',
    accent: 'primary',
  },
  {
    icon: 'manage_accounts',
    title: 'Roles & Permissions',
    description: 'Managers get full control — assign tasks, approve work, and manage schedules. Employees see only what they need to stay focused.',
    accent: 'honey-gold',
  },
  {
    icon: 'task_alt',
    title: 'Team Task Management',
    description: 'Assign tasks to individuals or entire teams. Track progress in real-time and approve completed work — all from a single dashboard.',
    accent: 'success-mint',
  },
  {
    icon: 'calendar_month',
    title: 'Team Calendar',
    description: 'Shared work schedules visible to the whole team. Managers block time, employees see their daily agenda. Fully synced.',
    accent: 'deep-indigo',
  },
  {
    icon: 'forum',
    title: 'Company Chat',
    description: 'Built-in company-wide messaging plus threaded comments inside every task. Keep discussions contextual and searchable.',
    accent: 'primary',
  },
  {
    icon: 'mic',
    title: 'Meeting Recording & Transcription',
    description: 'Record meetings, get automatic transcripts and AI-generated summaries, and surface possible action items — reviewed before any task is created.',
    accent: 'honey-gold',
  },
  {
    icon: 'mail',
    title: 'Gmail Integration',
    description: 'Every employee connects their own Gmail. Read, compose, reply, and send emails without leaving LAFINA — credentials stay personal.',
    accent: 'success-mint',
  },
  {
    icon: 'sync',
    title: 'Offline-First Business',
    description: 'Business data is cached on-device. The team keeps working even without internet — everything syncs automatically when reconnected.',
    accent: 'deep-indigo',
  },
  {
    icon: 'switch_account',
    title: 'Personal ↔ Business Switch',
    description: 'One app, two worlds. Employees instantly switch between their private personal space and the shared company workspace.',
    accent: 'primary',
  },
];

const accentClasses: Record<string, { bg: string; text: string; border: string; hoverBg: string; hoverText: string }> = {
  'primary':    { bg: 'bg-primary/10 dark:bg-primary/20', text: 'text-primary dark:text-coral-red', border: 'hover:border-primary/40', hoverBg: 'group-hover:bg-primary', hoverText: 'group-hover:text-white' },
  'honey-gold': { bg: 'bg-honey-gold/10 dark:bg-honey-gold/20', text: 'text-honey-gold', border: 'hover:border-honey-gold/40', hoverBg: 'group-hover:bg-honey-gold', hoverText: 'group-hover:text-slate-950' },
  'success-mint':{ bg: 'bg-success-mint/10 dark:bg-success-mint/20', text: 'text-success-mint', border: 'hover:border-success-mint/40', hoverBg: 'group-hover:bg-success-mint', hoverText: 'group-hover:text-white' },
  'deep-indigo':{ bg: 'bg-deep-indigo/10 dark:bg-deep-indigo/20', text: 'text-deep-indigo dark:text-primary-fixed-dim', border: 'hover:border-deep-indigo/40', hoverBg: 'group-hover:bg-deep-indigo', hoverText: 'group-hover:text-white' },
};

// ─── How It Works Steps ────────────────────────────────────────────────────────
const steps = [
  {
    step: '01',
    icon: 'add_business',
    title: 'Create a Company Workspace',
    description: 'Register your business inside LAFINA. Set up your company profile, configure roles, and define your team structure in minutes.',
  },
  {
    step: '02',
    icon: 'group_add',
    title: 'Invite Your Team',
    description: 'Send seat-based invitations to employees. Each person gets instant access to the shared workspace while keeping their personal LAFINA space intact.',
  },
  {
    step: '03',
    icon: 'task',
    title: 'Assign, Track & Collaborate',
    description: 'Managers assign tasks, schedule work blocks, and review progress. Employees update status, chat, and connect Gmail — all in one place.',
  },
];

// ─── FAQ Accordion ─────────────────────────────────────────────────────────────
const FAQItem: React.FC<{ q: string; a: string; isOpen: boolean; onToggle: () => void }> = ({ q, a, isOpen, onToggle }) => (
  <div className="border border-border-light dark:border-slate-800 rounded-xl overflow-hidden">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between gap-md p-xl text-left bg-white dark:bg-slate-900/50 hover:bg-surface-container-low dark:hover:bg-slate-800/50 transition-colors"
      aria-expanded={isOpen}
    >
      <span className="font-body-lg text-[15px] font-semibold text-on-surface dark:text-white pr-md">{q}</span>
      <span
        className={`material-symbols-outlined text-primary dark:text-honey-gold flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
      >
        expand_more
      </span>
    </button>
    <div
      className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
    >
      <p className="px-xl pb-xl text-body-md text-on-surface-variant dark:text-slate-400 leading-relaxed border-t border-border-light dark:border-slate-800 pt-md">
        {a}
      </p>
    </div>
  </div>
);

// ─── Main Component ────────────────────────────────────────────────────────────
export const BusinessPage: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  useEffect(() => {
    document.title = 'LAFINA Business | Team Productivity Platform';

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute(
      'content',
      'LAFINA Business turns LAFINA into a full team productivity platform — company workspaces, task assignment, meeting recording, Gmail integration, and more.',
    );

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://lafina-nine.vercel.app/business');

    return () => {
      document.title = 'LAFINA | Voice-First Academic Assistant';
      metaDesc?.setAttribute('content', 'LAFINA is a voice-first, offline-first scheduling assistant for University students.');
      canonical?.remove();
    };
  }, []);

  const toggleFAQ = (idx: number) => setOpenFAQ(prev => (prev === idx ? null : idx));

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">

      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-32 pb-24 md:pb-36 bg-white dark:bg-slate-950">
        {/* Decorative gradient blobs */}
        <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-gradient-to-br from-primary/8 via-honey-gold/6 to-deep-indigo/8 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-deep-indigo/10 via-primary/5 to-transparent rounded-full translate-x-1/4 translate-y-1/4 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-gutter md:px-xxxl text-center">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-sm px-lg py-sm bg-primary/10 dark:bg-primary/20 rounded-full mb-xl reveal-fade">
            <span className="material-symbols-outlined text-primary dark:text-coral-red text-[18px]">corporate_fare</span>
            <span className="text-primary dark:text-coral-red font-label-caps text-label-caps uppercase tracking-wider font-bold">
              Coming Soon — LAFINA Business
            </span>
          </div>

          {/* Logo + headline */}
          <div className="flex justify-center mb-lg reveal-bottom">
            <div className="flex items-center gap-md">
              <img src={lafinaLogo} alt="LAFINA" className="h-12 md:h-16 object-contain" />
              <div className="h-10 w-px bg-border-light dark:bg-slate-700" />
              <span className="font-headline-lg text-2xl md:text-3xl text-on-surface dark:text-white font-bold tracking-wide uppercase">
                Business
              </span>
            </div>
          </div>

          <h1 className="font-headline-lg text-4xl md:text-5xl lg:text-6xl text-on-surface dark:text-white leading-tight font-bold mb-xl reveal-bottom">
            Your Team's Productivity,{' '}
            <br className="hidden md:block" />
            <span className="lafina-gradient-text">All in One Workspace.</span>
          </h1>

          <p className="text-body-lg text-[16px] md:text-[18px] text-on-surface-variant dark:text-slate-400 max-w-2xl mx-auto mb-xxxl leading-relaxed reveal-bottom">
            LAFINA Business transforms the personal AI assistant you know into a powerful company platform —
            with team workspaces, task management, meeting recording, Gmail integration, and more. Each employee
            keeps their personal LAFINA space.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-lg reveal-bottom">
            <a
              href={BUSINESS_CONTACT_URL}
              target="_blank"
              rel="noopener noreferrer"
              id="business-contact-cta"
              className="inline-flex items-center gap-sm bg-primary hover:bg-primary/90 text-white font-bold px-xxxl py-lg rounded-xl shadow-xl shadow-primary/20 hover:shadow-2xl transition-all active:scale-95 text-[15px]"
            >
              <span className="material-symbols-outlined">chat</span>
              Contact Us on Facebook
            </a>
            <a
              href="#business-features"
              className="inline-flex items-center gap-sm bg-surface-container dark:bg-slate-900 text-on-surface dark:text-white font-bold px-xxxl py-lg rounded-xl border border-border-light dark:border-slate-800 hover:bg-surface-container-high dark:hover:bg-slate-800 transition-all active:scale-95 text-[15px]"
            >
              <span className="material-symbols-outlined">expand_more</span>
              See Features
            </a>
          </div>
        </div>
      </section>

      {/* ── PERSONAL vs BUSINESS COMPARISON TABLE ─────────────────────────────── */}
      <section className="py-xxxl bg-surface-container-low dark:bg-slate-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-gutter md:px-xxxl space-y-xl">
          <div className="text-center reveal-fade">
            <div className="inline-block px-lg py-1 bg-honey-gold/10 dark:bg-honey-gold/20 rounded-full mb-md">
              <span className="text-honey-gold font-label-caps text-label-caps uppercase tracking-wider font-bold">
                Side by Side
              </span>
            </div>
            <h2 className="font-headline-lg text-3xl md:text-4xl text-on-surface dark:text-white font-bold mb-sm">
              Personal LAFINA vs LAFINA Business
            </h2>
            <p className="text-body-md text-on-surface-variant dark:text-slate-400 max-w-xl mx-auto">
              LAFINA Business is a superset — everything in personal LAFINA, plus team collaboration tools built for companies.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border-light dark:border-slate-800 shadow-sm reveal-bottom">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[560px]">
                <thead className="bg-surface-container dark:bg-slate-950 border-b border-border-light dark:border-slate-800">
                  <tr>
                    <th className="px-xl py-lg font-bold text-slate-500 dark:text-slate-400 w-[32%] text-body-md">Feature</th>
                    <th className="px-xl py-lg font-bold text-on-surface dark:text-white w-[34%] text-body-md">
                      <span className="inline-flex items-center gap-xs">
                        <span className="material-symbols-outlined text-[16px] text-on-surface-variant dark:text-slate-400">person</span>
                        Personal LAFINA
                      </span>
                    </th>
                    <th className="px-xl py-lg font-bold text-primary dark:text-honey-gold w-[34%] text-body-md">
                      <span className="inline-flex items-center gap-xs">
                        <span className="material-symbols-outlined text-[16px]">corporate_fare</span>
                        LAFINA Business
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-slate-900/50 divide-y divide-border-light dark:divide-slate-800">
                  {comparisonRows.map((row, i) => (
                    <tr key={i} className="hover:bg-surface-container-low dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-xl py-md font-semibold text-slate-700 dark:text-slate-300 text-body-md">{row.feature}</td>
                      <td className="px-xl py-md text-on-surface-variant dark:text-slate-400 text-body-md">
                        {row.personal === '—' ? (
                          <span className="text-slate-300 dark:text-slate-600">—</span>
                        ) : (
                          <span className="inline-flex items-start gap-xs">
                            <span className="material-symbols-outlined text-[14px] text-slate-400 mt-[2px] flex-shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                            {row.personal}
                          </span>
                        )}
                      </td>
                      <td className="px-xl py-md text-on-surface dark:text-white text-body-md font-semibold">
                        {row.business === '—' ? (
                          <span className="text-slate-300 dark:text-slate-600">—</span>
                        ) : (
                          <span className="inline-flex items-start gap-xs">
                            <span className="material-symbols-outlined text-[14px] text-primary dark:text-honey-gold mt-[2px] flex-shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                            {row.business}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES GRID ─────────────────────────────────────────────────────── */}
      <section id="business-features" className="scroll-mt-24 py-xxxl bg-white dark:bg-slate-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-gutter md:px-xxxl space-y-xl">
          <div className="text-center reveal-fade">
            <div className="inline-block px-lg py-1 bg-primary/10 dark:bg-primary/20 rounded-full mb-md">
              <span className="text-primary dark:text-coral-red font-label-caps text-label-caps uppercase tracking-wider font-bold">
                Built for Teams
              </span>
            </div>
            <h2 className="font-headline-lg text-3xl md:text-4xl text-on-surface dark:text-white font-bold mb-sm">
              Everything Your Team Needs
            </h2>
            <p className="text-body-md text-on-surface-variant dark:text-slate-400 max-w-xl mx-auto">
              Powerful collaboration tools layered on top of the personal AI assistant your team already knows.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-lg">
            {features.map((f, i) => {
              const a = accentClasses[f.accent];
              return (
                <div
                  key={i}
                  className={`bg-white dark:bg-slate-900 p-xl rounded-2xl border border-border-light dark:border-slate-800 shadow-sm hover:shadow-md ${a.border} transition-all text-left space-y-md group reveal-stagger`}
                >
                  <div className={`w-12 h-12 rounded-xl ${a.bg} flex items-center justify-center ${a.text} ${a.hoverBg} ${a.hoverText} transition-colors`}>
                    <span className="material-symbols-outlined text-2xl">{f.icon}</span>
                  </div>
                  <h3 className="font-body-lg text-[15px] text-on-surface dark:text-white font-bold">{f.title}</h3>
                  <p className="text-body-md text-on-surface-variant dark:text-slate-400 leading-relaxed">{f.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────────────── */}
      <section className="py-xxxl bg-surface-container-low dark:bg-slate-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-gutter md:px-xxxl space-y-xl">
          <div className="text-center reveal-fade">
            <div className="inline-block px-lg py-1 bg-success-mint/10 dark:bg-success-mint/20 rounded-full mb-md">
              <span className="text-success-mint font-label-caps text-label-caps uppercase tracking-wider font-bold">
                Simple Setup
              </span>
            </div>
            <h2 className="font-headline-lg text-3xl md:text-4xl text-on-surface dark:text-white font-bold mb-sm">
              Get Your Team Started in 3 Steps
            </h2>
            <p className="text-body-md text-on-surface-variant dark:text-slate-400 max-w-xl mx-auto">
              No complex IT setup. No lengthy onboarding. LAFINA Business is designed for teams that want to move fast.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-lg relative">
            {/* Connector line (desktop only) */}
            <div className="hidden md:block absolute top-[52px] left-[calc(16.67%+16px)] right-[calc(16.67%+16px)] h-px bg-gradient-to-r from-primary/30 via-honey-gold/50 to-success-mint/30 z-0" />

            {steps.map((s, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center text-center space-y-md reveal-stagger">
                {/* Step circle */}
                <div className="relative">
                  <div className="w-[104px] h-[104px] rounded-full bg-white dark:bg-slate-950 border-2 border-border-light dark:border-slate-800 shadow-md flex flex-col items-center justify-center gap-xs">
                    <span className="material-symbols-outlined text-primary dark:text-honey-gold text-3xl">{s.icon}</span>
                    <span className="font-headline-lg text-xs text-on-surface-variant dark:text-slate-500 font-bold tracking-widest">{s.step}</span>
                  </div>
                </div>
                <h3 className="font-body-lg text-[15px] text-on-surface dark:text-white font-bold">{s.title}</h3>
                <p className="text-body-md text-on-surface-variant dark:text-slate-400 leading-relaxed max-w-xs">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ───────────────────────────────────────────────────────────── */}
      <section className="py-xxxl bg-white dark:bg-slate-950 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-gutter md:px-xxxl">
          <div className="relative overflow-hidden rounded-3xl border border-border-light dark:border-slate-800 bg-gradient-to-br from-surface-container-low via-white to-primary/5 dark:from-slate-900 dark:via-slate-950 dark:to-primary/10 p-xxxl md:p-[48px] text-center shadow-xl reveal-scale">
            {/* Decorative top-right blob */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-honey-gold/10 to-transparent rounded-full translate-x-1/4 -translate-y-1/4 blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-primary/8 to-transparent rounded-full -translate-x-1/4 translate-y-1/4 blur-2xl pointer-events-none" />

            <div className="relative z-10 space-y-xl">
              <div className="inline-flex items-center gap-sm px-lg py-sm bg-deep-indigo/10 dark:bg-deep-indigo/20 rounded-full">
                <span className="material-symbols-outlined text-deep-indigo dark:text-primary-fixed-dim text-[18px]">payments</span>
                <span className="text-deep-indigo dark:text-primary-fixed-dim font-label-caps text-label-caps uppercase tracking-wider font-bold">
                  Seat-Based Pricing
                </span>
              </div>

              <h2 className="font-headline-lg text-3xl md:text-4xl text-on-surface dark:text-white font-bold">
                Flexible Plans for Every Team Size
              </h2>

              <p className="text-body-lg text-[15px] text-on-surface-variant dark:text-slate-400 max-w-lg mx-auto leading-relaxed">
                LAFINA Business uses seat-based licensing — you pay for the number of employees you invite.
                Pricing is tailored to your team size and needs. Reach out and we'll put together the right plan for you.
              </p>

              {/* Included highlights */}
              <div className="grid sm:grid-cols-3 gap-md text-left">
                {[
                  { icon: 'groups', label: 'Team workspaces' },
                  { icon: 'task_alt', label: 'Unlimited task assignments' },
                  { icon: 'mic', label: 'Meeting recording & AI summaries' },
                  { icon: 'mail', label: 'Gmail integration per seat' },
                  { icon: 'sync', label: 'Offline sync & support' },
                  { icon: 'support_agent', label: 'Priority support' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-sm py-sm px-md rounded-xl bg-surface-container-low dark:bg-slate-900 border border-border-light dark:border-slate-800">
                    <span className="material-symbols-outlined text-primary dark:text-honey-gold text-[18px] flex-shrink-0">{item.icon}</span>
                    <span className="text-body-md text-on-surface dark:text-white font-semibold">{item.label}</span>
                  </div>
                ))}
              </div>

              <a
                href={BUSINESS_CONTACT_URL}
                target="_blank"
                rel="noopener noreferrer"
                id="business-pricing-cta"
                className="inline-flex items-center gap-sm bg-primary hover:bg-primary/90 text-white font-bold px-xxxl py-lg rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl transition-all active:scale-95 text-[15px]"
              >
                <span className="material-symbols-outlined">chat</span>
                Contact Us for Pricing
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────────── */}
      <section className="py-xxxl bg-surface-container-low dark:bg-slate-900 transition-colors duration-300">
        <div className="max-w-3xl mx-auto px-gutter md:px-xxxl space-y-xl">
          <div className="text-center reveal-fade">
            <div className="inline-block px-lg py-1 bg-honey-gold/10 dark:bg-honey-gold/20 rounded-full mb-md">
              <span className="text-honey-gold font-label-caps text-label-caps uppercase tracking-wider font-bold">
                FAQ
              </span>
            </div>
            <h2 className="font-headline-lg text-3xl md:text-4xl text-on-surface dark:text-white font-bold mb-sm">
              Common Questions
            </h2>
            <p className="text-body-md text-on-surface-variant dark:text-slate-400 max-w-md mx-auto">
              Everything you need to know about LAFINA Business before getting started.
            </p>
          </div>

          <div className="space-y-md reveal-bottom">
            {faqs.map((faq, i) => (
              <FAQItem
                key={i}
                q={faq.question}
                a={faq.answer}
                isOpen={openFAQ === i}
                onToggle={() => toggleFAQ(i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────────────── */}
      <section className="py-xxxl bg-white dark:bg-slate-950 transition-colors duration-300">
        <div className="max-w-3xl mx-auto px-gutter md:px-xxxl text-center space-y-xl reveal-bottom">
          <h2 className="font-headline-lg text-3xl md:text-4xl text-on-surface dark:text-white font-bold">
            Ready to bring LAFINA to{' '}
            <span className="lafina-gradient-text">your whole team?</span>
          </h2>
          <p className="text-body-lg text-[15px] text-on-surface-variant dark:text-slate-400 max-w-md mx-auto leading-relaxed">
            LAFINA Business is currently in development. Reach out on Facebook to express interest and be among the first teams to get access.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-lg">
            <a
              href={BUSINESS_CONTACT_URL}
              target="_blank"
              rel="noopener noreferrer"
              id="business-footer-cta"
              className="inline-flex items-center gap-sm bg-primary hover:bg-primary/90 text-white font-bold px-xxxl py-lg rounded-xl shadow-xl shadow-primary/20 hover:shadow-2xl transition-all active:scale-95 text-[15px]"
            >
              <span className="material-symbols-outlined">chat</span>
              Contact Us on Facebook
            </a>
            <a
              href="/"
              className="inline-flex items-center gap-sm text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-honey-gold font-semibold transition-colors text-body-md"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              Back to LAFINA
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
