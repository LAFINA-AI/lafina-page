import React, { useEffect } from 'react';

interface LegalPageLayoutProps {
  title: string;
  lastUpdated?: string;
  summary?: string;
  children: React.ReactNode;
}

export const LegalPageLayout: React.FC<LegalPageLayoutProps> = ({
  title,
  lastUpdated,
  summary,
  children
}) => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-gutter md:px-xxxl py-xxxl mt-20">
      <div className="mb-xxl">
        <h1 className="font-headline-lg text-4xl text-slate-900 dark:text-white font-bold mb-md">
          {title}
        </h1>
        {lastUpdated && (
          <p className="text-body-md text-slate-500 dark:text-slate-400 font-medium mb-lg">
            Last updated: {lastUpdated}
          </p>
        )}
        {summary && (
          <p className="text-body-lg text-slate-700 dark:text-slate-300 leading-relaxed border-l-4 border-primary pl-md">
            {summary}
          </p>
        )}
      </div>
      <div className="prose prose-slate dark:prose-invert max-w-none 
                      prose-headings:font-headline-md prose-headings:text-slate-900 dark:prose-headings:text-white
                      prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-p:leading-relaxed
                      prose-a:text-primary dark:prose-a:text-honey-gold hover:prose-a:underline
                      prose-li:text-slate-700 dark:prose-li:text-slate-300
                      prose-strong:text-slate-900 dark:prose-strong:text-white">
        {children}
      </div>
    </div>
  );
};
