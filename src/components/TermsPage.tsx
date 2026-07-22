import React, { useEffect } from 'react';
import { LegalPageLayout } from './LegalPageLayout';
import { VERSION } from '../config';

export const TermsPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Terms of Service | LAFINA';
    
    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', 'Terms of Service for LAFINA. Please read these terms carefully before using the beta software.');

    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://lafina-nine.vercel.app/terms');

    return () => {
      document.title = 'LAFINA | Voice-First Academic Assistant';
      metaDesc?.setAttribute('content', 'LAFINA is a voice-first, offline-first scheduling assistant for University students.');
      canonical?.remove();
    };
  }, []);

  return (
    <LegalPageLayout
      title="Terms of Service"
      lastUpdated="July 21, 2026"
      summary="Please read these terms carefully before using LAFINA. By downloading or using the app, you agree to these terms."
    >
      <h2>Table of Contents</h2>
      <ul>
        <li><a href="#acceptance">Acceptance of Terms</a></li>
        <li><a href="#beta-software">Beta Software Disclaimer</a></li>
        <li><a href="#license">License to Use</a></li>
        <li><a href="#responsibilities">User Responsibilities</a></li>
        <li><a href="#intellectual-property">Intellectual Property</a></li>
        <li><a href="#disclaimer">Disclaimer of Warranty &amp; Limitation of Liability</a></li>
        <li><a href="#termination">Termination</a></li>
        <li><a href="#governing-law">Governing Law</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>

      <h2 id="acceptance">Acceptance of Terms</h2>
      <p>
        By downloading, accessing, or using LAFINA, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the application.
      </p>

      <h2 id="beta-software">Beta Software Disclaimer</h2>
      <p>
        <strong>LAFINA is currently in beta (v{VERSION}).</strong> As beta software, features may change, break, or be incomplete. We are actively developing and refining the app. 
        <strong>LAFINA is not recommended as your sole means of tracking critical deadlines during this beta phase.</strong> Please maintain a secondary backup for your important schedules and exams.
      </p>

      <h2 id="license">License to Use</h2>
      <p>
        There is currently no official license assigned to this project. All rights are reserved by the DreamCachers team.
      </p>

      <h2 id="responsibilities">User Responsibilities</h2>
      <p>
        You are responsible for the data you input into LAFINA. Because LAFINA is an offline-first application, your data is stored solely on your device. You are responsible for ensuring your device is secured and functioning properly. We are not responsible for any data loss resulting from device failure, app uninstallation, or other localized issues.
      </p>

      <h2 id="intellectual-property">Intellectual Property</h2>
      <p>
        The LAFINA name, logo, source code (unless explicitly open-sourced under a separate license), and related content belong to the <strong>DreamCachers team</strong> as part of a USTP capstone project. All rights reserved.
      </p>

      <h2 id="disclaimer">Disclaimer of Warranty &amp; Limitation of Liability</h2>
      <p>
        LAFINA is provided "as is" and "as available" without any warranties of any kind, whether express or implied. To the fullest extent permitted by applicable law, the DreamCachers team disclaims all warranties, including but not limited to implied warranties of merchantability and fitness for a particular purpose.
      </p>
      <p>
        In no event shall the developers of LAFINA be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the application.
      </p>

      <h2 id="termination">Termination</h2>
      <p>
        We reserve the right to suspend or terminate your access to LAFINA at any time, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms of Service.
      </p>

      <h2 id="governing-law">Governing Law</h2>
      <p>
        No specific jurisdiction is established at this time.
      </p>

      <h2 id="contact">Contact</h2>
      <p>
        If you have any questions about these Terms, please contact us on our <a href="https://www.facebook.com/lafinaph" target="_blank" rel="noopener noreferrer">Facebook Page</a> or through our <a href="https://github.com/LAFINA-AI/LAFINA" target="_blank" rel="noopener noreferrer">GitHub repository</a>.
      </p>
    </LegalPageLayout>
  );
};
