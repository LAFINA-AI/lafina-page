import React, { useEffect } from 'react';
import { LegalPageLayout } from './LegalPageLayout';
import { DOWNLOAD_URL } from '../config';

export const FeedbackPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Feedback | LAFINA';
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', 'Report bugs or submit feature ideas for the LAFINA academic scheduler.');

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://lafina-nine.vercel.app/feedback');

    return () => {
      document.title = 'LAFINA | Voice-First Academic Assistant';
      metaDesc?.setAttribute('content', 'LAFINA is a voice-first, offline-first scheduling assistant for University students.');
      canonical?.remove();
    };
  }, []);

  return (
    <LegalPageLayout
      title="Found a bug? Have an idea?"
      summary="LAFINA is in active beta and your feedback directly shapes the next sprint."
    >
      <div className="not-prose max-w-3xl mx-auto space-y-xl">
        <div className="bg-surface-container-low dark:bg-slate-900 rounded-2xl p-xl border border-border-light dark:border-slate-800 text-center shadow-sm">
          <img 
            src="https://img.shields.io/github/issues/LAFINA-AI/LAFINA?style=for-the-badge&color=4f46e5" 
            alt="GitHub Issues" 
            className="mx-auto mb-lg rounded"
          />
          <a
            href="https://github.com/LAFINA-AI/LAFINA/issues/new"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-sm bg-primary hover:bg-primary/90 text-white font-bold py-md px-xl rounded-xl transition-transform hover:scale-105 active:scale-95 shadow-md"
          >
            Report an Issue on GitHub
            <span className="material-symbols-outlined text-[20px]">open_in_new</span>
          </a>
        </div>

        <section>
          <h2 className="font-headline-sm text-2xl text-slate-900 dark:text-white font-bold mb-md">Before you file an issue</h2>
          <ul className="space-y-sm text-slate-700 dark:text-slate-300 font-body-lg">
            <li className="flex items-start gap-sm">
              <span className="material-symbols-outlined text-primary dark:text-honey-gold shrink-0 mt-0.5">check_circle</span>
              <span>Confirm you're on the latest beta version (<a href={DOWNLOAD_URL} className="text-primary dark:text-honey-gold hover:underline font-semibold">download the latest APK here</a>).</span>
            </li>
            <li className="flex items-start gap-sm">
              <span className="material-symbols-outlined text-primary dark:text-honey-gold shrink-0 mt-0.5">check_circle</span>
              <span>Check the <a href="/faq" className="text-primary dark:text-honey-gold hover:underline font-semibold">FAQ</a> first — your question might already be answered.</span>
            </li>
            <li className="flex items-start gap-sm">
              <span className="material-symbols-outlined text-primary dark:text-honey-gold shrink-0 mt-0.5">check_circle</span>
              <span>When reporting a bug, please include your <strong>device model</strong>, <strong>Android version</strong>, and a clear description of the expected vs. actual behavior.</span>
            </li>
          </ul>
        </section>

        <section className="pt-xl border-t border-border-light dark:border-slate-800">
          <h2 className="font-headline-sm text-2xl text-slate-900 dark:text-white font-bold mb-sm">Non-Technical Feedback</h2>
          <p className="text-slate-700 dark:text-slate-300 font-body-lg">
            Just want to chat or have general feedback that isn't a code issue? Message us on our <a href="https://www.facebook.com/lafinaph" target="_blank" rel="noopener noreferrer" className="text-primary dark:text-honey-gold hover:underline font-semibold">Facebook page</a>.
          </p>
        </section>
      </div>
    </LegalPageLayout>
  );
};
