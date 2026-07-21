import React, { useEffect } from 'react';
import { LegalPageLayout } from './LegalPageLayout';
import { AccordionItem } from './Accordion';
import { VERSION } from '../config';

export const FAQPage: React.FC = () => {
  useEffect(() => {
    document.title = 'FAQ | LAFINA';
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', 'Frequently asked questions about LAFINA, the offline-first academic scheduling assistant.');

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://lafina-nine.vercel.app/faq');

    return () => {
      document.title = 'LAFINA | Voice-First Academic Assistant';
      metaDesc?.setAttribute('content', 'LAFINA is a voice-first, offline-first scheduling assistant for University students.');
      canonical?.remove();
    };
  }, []);

  return (
    <LegalPageLayout
      title="Frequently Asked Questions"
      lastUpdated="July 22, 2026"
      summary="Got questions? We've got answers. If you're looking for deep technical documentation, please visit our Wiki instead."
    >
      <div className="not-prose space-y-xxxl">
        <section>
          <h2 className="font-headline-md text-2xl text-slate-900 dark:text-white font-bold mb-md">Getting Started</h2>
          <div className="border-t border-border-light dark:border-slate-800">
            <AccordionItem question="What is LAFINA and who is it for?">
              LAFINA is a voice-first, fully offline academic scheduling assistant. It is designed primarily for university students who want proactive reminders without relying on cloud servers or sacrificing their data privacy.
            </AccordionItem>
            <AccordionItem question="What Android version do I need?">
              You need an Android device running Android 10 or higher.
            </AccordionItem>
            <AccordionItem question="Why is the APK ~672MB?">
              The application bundles all the necessary AI models (like Whisper.cpp and SmolLM2) directly into the installation file. This ensures it works completely offline with no network downloads required after installation.
            </AccordionItem>
            <AccordionItem question="Is LAFINA available on iOS?">
              Not currently. We are entirely focused on the Android beta experience and do not have a committed timeline for an iOS release.
            </AccordionItem>
            <AccordionItem question="Is LAFINA free?">
              Yes, the beta version of LAFINA is completely free to use.
            </AccordionItem>
          </div>
        </section>

        <section>
          <h2 className="font-headline-md text-2xl text-slate-900 dark:text-white font-bold mb-md">Privacy &amp; Permissions</h2>
          <div className="border-t border-border-light dark:border-slate-800">
            <AccordionItem question="Does LAFINA need internet access?">
              No. LAFINA is built to be fully offline by design, ensuring your academic schedules and voice commands are never sent to a cloud server.
            </AccordionItem>
            <AccordionItem question="What does LAFINA do with my voice recordings?">
              Your voice is processed entirely on your device and transcripts are stored locally. For full details, please read our <a href="/privacy" className="text-primary dark:text-honey-gold hover:underline">Privacy Policy</a>.
            </AccordionItem>
            <AccordionItem question="Why does LAFINA need microphone/phone permissions?">
              Microphone access is required to process your voice commands and acknowledge simulated phone calls. Phone overlay permissions allow the app to display these full-screen call reminders over other apps.
            </AccordionItem>
          </div>
        </section>

        <section>
          <h2 className="font-headline-md text-2xl text-slate-900 dark:text-white font-bold mb-md">How It Works</h2>
          <div className="border-t border-border-light dark:border-slate-800">
            <AccordionItem question="How do &quot;call reminders&quot; work — will it actually interrupt me like a real phone call?">
              Yes, instead of passive push notifications, LAFINA simulates an incoming phone call to ensure you don't miss critical deadlines. The UI looks and sounds like a real call that you must physically or verbally answer.
            </AccordionItem>
            <AccordionItem question="Can I snooze or reschedule by voice? What does it understand?">
              Yes, once you answer the reminder, you can speak to LAFINA to snooze, reschedule, or dismiss the event using natural language.
            </AccordionItem>
            <AccordionItem question="What happens if I miss/ignore a reminder call?">
              If a call is missed, LAFINA will log it as a missed reminder and can follow up based on your configured fallback settings.
            </AccordionItem>
            <AccordionItem question="Does it work with no signal / airplane mode / basement classrooms?">
              Absolutely. Because everything runs locally on your device, LAFINA works perfectly in airplane mode or deep underground where there is no cellular signal.
            </AccordionItem>
          </div>
        </section>

        <section>
          <h2 className="font-headline-md text-2xl text-slate-900 dark:text-white font-bold mb-md">Beta &amp; Support</h2>
          <div className="border-t border-border-light dark:border-slate-800">
            <AccordionItem question="Is this a finished product?">
              No, LAFINA is currently in beta (v{VERSION}). Features may change, break, or be incomplete while we actively develop and refine the experience.
            </AccordionItem>
            <AccordionItem question="How do I report a bug or request a feature?">
              You can report bugs or suggest features by visiting our <a href="/feedback" className="text-primary dark:text-honey-gold hover:underline">Feedback page</a>.
            </AccordionItem>
            <AccordionItem question="Where can I see what's being built next?">
              Check out the <a href="/#roadmap" className="text-primary dark:text-honey-gold hover:underline">Roadmap section</a> on our homepage for an overview of upcoming features and milestones.
            </AccordionItem>
            <AccordionItem question="I want the deep technical details — where can I read more?">
              For deep research-level documentation, AI architecture, and advanced use cases, please check the "Scenarios &amp; FAQ" and "AI Models" pages on our <a href="https://lafina-wiki.vercel.app" target="_blank" rel="noopener noreferrer" className="text-primary dark:text-honey-gold hover:underline">Wiki Portal</a>.
            </AccordionItem>
          </div>
        </section>
      </div>
    </LegalPageLayout>
  );
};
