import React from 'react';

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'privacy' | 'terms';
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ isOpen, onClose, type }) => {
  if (!isOpen) return null;

  const isPrivacy = type === 'privacy';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-md p-4 animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl border border-border-light dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[85vh] transition-colors duration-300">
        
        {/* Header */}
        <div className="flex justify-between items-center px-xl py-lg border-b border-border-light dark:border-slate-800">
          <h3 className="font-headline-sm text-xl text-on-surface dark:text-white font-bold">
            {isPrivacy ? 'Privacy Policy' : 'Terms of Service'}
          </h3>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-xl overflow-y-auto scrollbar-thin space-y-lg text-body-md text-on-surface-variant dark:text-slate-350 leading-relaxed font-body-md">
          {isPrivacy ? (
            <>
              <p className="text-caption text-slate-500 dark:text-slate-400 font-mono text-[11px]">Last Updated: July 14, 2026</p>
              
              <section className="space-y-sm">
                <h4 className="font-bold text-on-surface dark:text-white text-body-lg">1. Offline-First Privacy Guarantee</h4>
                <p>
                  LAFINA is engineered with a strict offline-first architecture. All core services—including local calendar management, background scheduling, database storage, and notifications—operate with zero network dependency. Your personal academic schedule remains entirely on your device.
                </p>
              </section>

              <section className="space-y-sm">
                <h4 className="font-bold text-on-surface dark:text-white text-body-lg">2. On-Device Voice Processing</h4>
                <p>
                  Unlike traditional voice assistants that upload voice data to cloud servers, LAFINA processes all speech assets locally. 
                  Speech-to-Text (Whisper.cpp), Voice Activity Detection (Silero VAD), and Natural Language Understanding (SmolLM2-135M) execute 100% locally on your smartphone's CPU/GPU. We do not collect, monitor, or upload your voice logs or recordings.
                </p>
              </section>

              <section className="space-y-sm">
                <h4 className="font-bold text-on-surface dark:text-white text-body-lg">3. Local Database & Cloud Sync</h4>
                <p>
                  Your tasks, schedules, and preferences are saved in an on-device SQLite database. If you explicitly activate the optional Cloud Sync feature, calendar snapshots are encrypted and replicated securely to your remote cloud backup database using token-based authentication. If Cloud Sync is disabled, no synchronization queries are dispatched.
                </p>
              </section>

              <section className="space-y-sm">
                <h4 className="font-bold text-on-surface dark:text-white text-body-lg">4. Data Deletion and Control</h4>
                <p>
                  Because your data is stored locally, deleting the LAFINA application from your device permanently purges all calendars, logs, and local databases. You maintain absolute ownership and control over your data.
                </p>
              </section>

              <section className="space-y-sm">
                <h4 className="font-bold text-on-surface dark:text-white text-body-lg">5. Changes to This Policy</h4>
                <p>
                  We may update our Privacy Policy to align with new offline model integrations or feature enhancements. We encourage periodic review of this document to stay informed about our data safeguarding practices.
                </p>
              </section>
            </>
          ) : (
            <>
              <p className="text-caption text-slate-500 dark:text-slate-400 font-mono text-[11px]">Last Updated: July 14, 2026</p>

              <section className="space-y-sm">
                <h4 className="font-bold text-on-surface dark:text-white text-body-lg">1. Agreement to Terms</h4>
                <p>
                  By downloading, installing, or using the LAFINA mobile application, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, do not install or use the application.
                </p>
              </section>

              <section className="space-y-sm">
                <h4 className="font-bold text-on-surface dark:text-white text-body-lg">2. License Grant</h4>
                <p>
                  We grant you a personal, non-exclusive, non-transferable, revocable, and limited license to download and run the LAFINA APK on a supported Android device solely for personal academic scheduling.
                </p>
              </section>

              <section className="space-y-sm">
                <h4 className="font-bold text-on-surface dark:text-white text-body-lg">3. Acceptable Use and Restrictions</h4>
                <p>
                  You agree not to modify, adapt, translate, reverse engineer, decompile, or disassemble the source code or the integrated on-device AI weight binaries (.gguf model weights). The app must be used in compliance with all university regulations and local guidelines.
                </p>
              </section>

              <section className="space-y-sm">
                <h4 className="font-bold text-on-surface dark:text-white text-body-lg">4. Alarm Daemon & System Disclaimer</h4>
                <p>
                  LAFINA schedules phone call notifications using a persistent local background daemon service. Because Android operating systems manage background services aggressively (e.g. Doze mode, OEM battery optimization, RAM limits), we cannot guarantee 100% trigger accuracy if the system forcibly terminates background threads. It is your responsibility to whitelist LAFINA from battery optimization.
                </p>
              </section>

              <section className="space-y-sm">
                <h4 className="font-bold text-on-surface dark:text-white text-body-lg">5. Disclaimer of Warranties</h4>
                <p>
                  The application is provided "as is" and "as available" without any warranties, express or implied. We do not warrant that the application will meet your requirements or that its operation will be completely uninterrupted or error-free.
                </p>
              </section>

              <section className="space-y-sm">
                <h4 className="font-bold text-on-surface dark:text-white text-body-lg">6. Limitation of Liability</h4>
                <p>
                  To the maximum extent permitted by law, the LAFINA development team and its affiliates shall not be liable for any missed exams, classes, assignments, or any other consequential damages arising from the use or inability to use the application.
                </p>
              </section>
            </>
          )}
        </div>

        {/* Footer Action */}
        <div className="px-xl py-lg bg-slate-50 dark:bg-slate-900/60 border-t border-border-light dark:border-slate-800 flex justify-end">
          <button 
            onClick={onClose}
            className="px-xl py-2.5 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold shadow-md shadow-primary/10 active:scale-95 transition-all text-body-md"
          >
            I Acknowledge
          </button>
        </div>

      </div>
    </div>
  );
};
