import React, { useState } from 'react';

interface AccordionItemProps {
  question: string;
  children: React.ReactNode;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({ question, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-border-light dark:border-slate-800">
      <details 
        className="group" 
        open={isOpen} 
        onToggle={(e) => setIsOpen((e.currentTarget as HTMLDetailsElement).open)}
      >
        <summary 
          className="flex justify-between items-center font-title-sm font-semibold cursor-pointer list-none py-lg text-slate-900 dark:text-white hover:text-primary dark:hover:text-honey-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:focus-visible:ring-honey-gold dark:focus-visible:ring-offset-slate-950 rounded-md"
          aria-expanded={isOpen}
        >
          {question}
          <span className="transition-transform duration-300 group-open:rotate-180">
            <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
          </span>
        </summary>
        <div className="text-slate-700 dark:text-slate-300 pb-lg font-body-lg leading-relaxed animate-fadeIn">
          {children}
        </div>
      </details>
    </div>
  );
};
