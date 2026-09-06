import React, { useEffect } from 'react';
import { LegalPageLayout } from './LegalPageLayout';

export const PrivacyPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Privacy Policy | LAFINA';
    
    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', 'Privacy Policy for LAFINA. Learn how we protect your data with our 100% on-device, offline-first approach.');

    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://lafina-nine.vercel.app/privacy');

    return () => {
      document.title = 'LAFINA | Voice-First Academic Assistant';
      metaDesc?.setAttribute('content', 'LAFINA is a voice-first, offline-first scheduling assistant for University students.');
      canonical?.remove();
    };
  }, []);

  return (
    <LegalPageLayout
      title="Privacy Policy"
      lastUpdated="July 21, 2026"
      summary="LAFINA is built to work without collecting your data. This page explains exactly what stays on your device, what (if anything) leaves it, and why."
    >
      <h2>Table of Contents</h2>
      <ul>
        <li><a href="#data-we-do-not-collect">Data We Do Not Collect</a></li>
        <li><a href="#data-stored-locally">Data Stored Locally</a></li>
        <li><a href="#permissions">Permissions Requested &amp; Why</a></li>
        <li><a href="#future-cloud-sync">Future Cloud Sync (Roadmap)</a></li>
        <li><a href="#third-party-services">Third-Party Services</a></li>
        <li><a href="#childrens-privacy">Children's Privacy</a></li>
        <li><a href="#changes">Changes to This Policy</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>

      <h2 id="data-we-do-not-collect">Data We Do Not Collect</h2>
      <p>
        Because LAFINA operates completely offline, we <strong>do not collect, transmit, or store</strong> your personal information on our servers. Specifically, the following data never leaves your device:
      </p>
      <ul>
        <li>Voice recordings and speech transcripts (processed locally via Whisper.cpp).</li>
        <li>Class schedules, notes, and academic data.</li>
        <li>Location data.</li>
        <li>Contacts and address book information.</li>
      </ul>

      <h2 id="data-stored-locally">Data Stored Locally</h2>
      <p>
        All your data is stored locally on your device using a secure SQLite database. This includes your schedules, notes, and the working data required by our offline AI models (such as SmolLM2 NLU and Kokoro TTS). This data remains on your device and will be permanently deleted if you uninstall the app or clear the app's data in your system settings.
      </p>

      <h2 id="permissions">Permissions Requested &amp; Why</h2>
      <p>LAFINA requires the following permissions, strictly for on-device functionality:</p>
      <div className="overflow-x-auto my-6">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-300 dark:border-slate-700">
              <th className="py-2 pr-4 font-bold">Permission</th>
              <th className="py-2 pr-4 font-bold">Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-200 dark:border-slate-800">
              <td className="py-2 pr-4 font-semibold">Microphone</td>
              <td className="py-2 pr-4">To process voice commands and allow you to acknowledge call reminders. Audio is never sent to the cloud.</td>
            </tr>
            <tr className="border-b border-slate-200 dark:border-slate-800">
              <td className="py-2 pr-4 font-semibold">Phone / Call Overlay</td>
              <td className="py-2 pr-4">To display the simulated call UI over other apps for important reminders.</td>
            </tr>
            <tr className="border-b border-slate-200 dark:border-slate-800">
              <td className="py-2 pr-4 font-semibold">Storage</td>
              <td className="py-2 pr-4">To manage the local SQLite database and store the required offline AI models.</td>
            </tr>
            <tr className="border-b border-slate-200 dark:border-slate-800">
              <td className="py-2 pr-4 font-semibold">Notifications / Alarms</td>
              <td className="py-2 pr-4">To schedule and deliver class and exam reminders accurately.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="future-cloud-sync">Future Cloud Sync (Roadmap)</h2>
      <p>
        Currently, LAFINA is entirely offline-first. A future version may introduce an <strong>optional, opt-in cloud sync</strong> feature to backup your schedules. If and when this is implemented, this privacy policy will be updated first, and users will be explicitly notified in-app before any data leaves the device.
      </p>

      <h2 id="third-party-services">Third-Party Services</h2>
      <p>
        LAFINA currently uses no third-party analytics or tracking SDKs (e.g., no Firebase Analytics, no Sentry crash reporting). Your usage remains completely private.
      </p>

      <h2 id="childrens-privacy">Children's Privacy</h2>
      <p>
        LAFINA is not directed at children under the age of 13. We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal data, please contact us so we can take steps to remove that information.
      </p>

      <h2 id="changes">Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Any changes will be communicated via the app's changelog and an in-app notice upon updating to a new version.
      </p>

      <h2 id="contact">Contact</h2>
      <p>
        If you have any questions or concerns about this Privacy Policy, please contact the development team on our <a href="https://www.facebook.com/lafinaph" target="_blank" rel="noopener noreferrer">Facebook Page</a> or visit our <a href="https://github.com/LAFINA-AI/LAFINA" target="_blank" rel="noopener noreferrer">GitHub repository</a>.
      </p>
    </LegalPageLayout>
  );
};
