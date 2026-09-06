import React, { useEffect } from 'react';
import { LegalPageLayout } from './LegalPageLayout';
import { DOWNLOAD_URL } from '../config';

export const ComparePage: React.FC = () => {
  useEffect(() => {
    document.title = 'Compare LAFINA | LAFINA';
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', 'See how LAFINA compares to typical schedule and reminder apps.');

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://lafina-nine.vercel.app/compare');

    return () => {
      document.title = 'LAFINA | Voice-First Academic Assistant';
      metaDesc?.setAttribute('content', 'LAFINA is a voice-first, offline-first scheduling assistant for University students.');
      canonical?.remove();
    };
  }, []);

  const comparisonData = [
    {
      dimension: 'Alert type',
      lafina: 'Simulated phone call requiring spoken acknowledgment',
      typical: 'Silent push notification banner',
    },
    {
      dimension: 'Dismissal',
      lafina: 'Must respond verbally to snooze/acknowledge',
      typical: 'Swipe away, often ignored',
    },
    {
      dimension: 'Internet requirement',
      lafina: 'Fully offline — works with zero connectivity',
      typical: 'Often requires sync/connectivity',
    },
    {
      dimension: 'Where processing happens',
      lafina: '100% on-device (STT, NLU, TTS all local)',
      typical: 'Cloud-dependent for smart features',
    },
    {
      dimension: 'Data leaves device?',
      lafina: 'Never (current version)',
      typical: 'Often, for account sync/cloud features',
    },
    {
      dimension: 'Built for',
      lafina: 'University students specifically',
      typical: 'General-purpose',
    },
  ];

  return (
    <LegalPageLayout
      title="How LAFINA Compares"
      summary="Most schedule apps notify you. LAFINA makes sure you actually respond."
    >
      <div className="not-prose space-y-xxxl">
        
        {/* Table Section */}
        <section>
          <div className="overflow-hidden rounded-2xl border border-border-light dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900/50">
            <table className="w-full text-left border-collapse">
              <thead className="hidden md:table-header-group bg-surface-container-low dark:bg-slate-900 border-b border-border-light dark:border-slate-800">
                <tr>
                  <th className="p-xl font-bold text-slate-900 dark:text-white w-[28%]">Dimension</th>
                  <th className="p-xl font-bold text-primary dark:text-honey-gold w-[36%]">LAFINA</th>
                  <th className="p-xl font-semibold text-slate-500 dark:text-slate-400 w-[36%]">Typical Reminder Apps</th>
                </tr>
              </thead>
              <tbody className="block md:table-row-group divide-y divide-border-light dark:divide-slate-800">
                {comparisonData.map((row, idx) => (
                  <tr key={idx} className="block md:table-row p-lg md:p-0 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="block md:table-cell p-0 md:p-xl font-bold text-slate-900 dark:text-white md:text-slate-700 md:dark:text-slate-300 bg-surface-container-lowest dark:bg-slate-950 md:bg-transparent text-xl md:text-base mb-4 md:mb-0 rounded-lg md:rounded-none px-md py-sm border border-border-light dark:border-slate-700 md:border-0">
                      {row.dimension}
                    </td>
                    <td className="block md:table-cell p-0 md:p-xl mb-4 md:mb-0">
                      <span className="inline-block md:hidden text-xs font-bold uppercase tracking-widest text-primary dark:text-honey-gold mb-1">LAFINA</span>
                      <div className="font-semibold text-slate-900 dark:text-white text-lg md:text-base leading-relaxed">{row.lafina}</div>
                    </td>
                    <td className="block md:table-cell p-0 md:p-xl">
                      <span className="inline-block md:hidden text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-1">Typical Apps</span>
                      <div className="text-slate-600 dark:text-slate-400 text-lg md:text-base leading-relaxed">{row.typical}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Why call reminders work better */}
        <section className="bg-primary/5 dark:bg-primary/10 rounded-2xl p-xl border border-primary/10 dark:border-primary/20">
          <h2 className="font-headline-sm text-2xl text-slate-900 dark:text-white font-bold mb-md flex items-center gap-sm">
            <span className="material-symbols-outlined text-primary dark:text-honey-gold">psychology</span>
            Why call reminders work better
          </h2>
          <p className="text-slate-700 dark:text-slate-300 font-body-lg leading-relaxed mb-md">
            The reactive paradigm breaks down at scale due to <strong>alert fatigue</strong>. Humans easily ignore silent banners, but we are psychologically conditioned to answer phone calls. In healthcare literature, switching from text reminders to telephone call reminders yielded a <strong>39% relative reduction</strong> in missed appointments (Mehranbod et al.).
          </p>
          <a href="https://lafina-wiki.vercel.app/proactive-vs-reactive" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-xs font-bold text-primary dark:text-honey-gold hover:underline">
            For the full research comparison and methodology, see Proactive vs. Reactive on the Wiki
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </a>
        </section>

        {/* Honest Limitations */}
        <section>
          <h2 className="font-headline-sm text-2xl text-slate-900 dark:text-white font-bold mb-md">The Tradeoffs</h2>
          <p className="text-slate-700 dark:text-slate-300 font-body-lg leading-relaxed mb-lg">
            Complete privacy and offline processing require different engineering choices. Here is why the tradeoffs are worth it:
          </p>
          <div className="grid md:grid-cols-2 gap-lg">
            <div className="bg-surface-container-low dark:bg-slate-900 p-lg rounded-xl border border-border-light dark:border-slate-800">
              <h3 className="font-bold text-slate-900 dark:text-white mb-xs text-lg">Large APK Size (~672MB)</h3>
              <p className="text-slate-600 dark:text-slate-400">Because we don't rely on the cloud, all AI models (Whisper, SmolLM2, Kokoro) are bundled directly into the app so it works flawlessly offline.</p>
            </div>
            <div className="bg-surface-container-low dark:bg-slate-900 p-lg rounded-xl border border-border-light dark:border-slate-800">
              <h3 className="font-bold text-slate-900 dark:text-white mb-xs text-lg">Android Only (Beta)</h3>
              <p className="text-slate-600 dark:text-slate-400">We are hyper-focused on perfecting the Android 10+ experience first. There is no iOS version available at this time.</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center pt-xl border-t border-border-light dark:border-slate-800">
          <h2 className="font-headline-sm text-2xl text-slate-900 dark:text-white font-bold mb-lg">Ready to try a proactive schedule?</h2>
          <a
            href={DOWNLOAD_URL}
            className="inline-flex items-center justify-center gap-sm bg-primary hover:bg-primary/90 text-white font-bold py-md px-xxl rounded-xl transition-transform hover:scale-105 active:scale-95 shadow-md text-lg"
          >
            <span className="material-symbols-outlined">download</span>
            Download Beta APK
          </a>
        </section>
      </div>
    </LegalPageLayout>
  );
};
