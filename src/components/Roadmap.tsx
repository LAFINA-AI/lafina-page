import React, { useState, useEffect, useRef } from 'react';
import lafinaPromotionalVideo from '../assets/lafina_promotional_video.mp4';

interface Milestone {
  sprint: number;
  dates: string;
  deliverable: string;
  testing: string;
  status: 'done' | 'in_progress' | 'planned';
}

export const Roadmap: React.FC = () => {
  const [isInView, setIsInView] = useState(false);
  const [activeSprint, setActiveSprint] = useState<number>(4);
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const milestones: Milestone[] = [
    {
      sprint: 1,
      dates: "June 15 – 21",
      deliverable: "App skeleton + voice recording",
      testing: "Unit tests (Jest)",
      status: "done"
    },
    {
      sprint: 2,
      dates: "June 22 – 28",
      deliverable: "Offline STT (Whisper.cpp)",
      testing: "Accuracy on golden dataset",
      status: "done"
    },
    {
      sprint: 3,
      dates: "June 29 – July 5",
      deliverable: "NLU with SmolLM2",
      testing: "Intent extraction (≥85%)",
      status: "done"
    },
    {
      sprint: 4,
      dates: "July 6 – 12",
      deliverable: "Local DB + scheduler",
      testing: "Trigger fidelity (≥95%)",
      status: "done"
    },
    {
      sprint: 5,
      dates: "July 13 – 19",
      deliverable: "Proactive call reminder (core)",
      testing: "End-to-end call flow",
      status: "in_progress"
    },
    {
      sprint: 6,
      dates: "July 20 – 26",
      deliverable: "Onboarding + preferences",
      testing: "User flow test (10 users)",
      status: "planned"
    },
    {
      sprint: 7,
      dates: "July 27 – Aug 2",
      deliverable: "Cloud backend + sync",
      testing: "Cross-device sync",
      status: "planned"
    },
    {
      sprint: 8,
      dates: "Aug 3 – 9",
      deliverable: "Advanced LAFINA Skills",
      testing: "RAG + doc gen + transcription",
      status: "planned"
    },
    {
      sprint: 9,
      dates: "Aug 10 – 16",
      deliverable: "Pilot testing + evaluation",
      testing: "SUS + ISO 25010 metrics",
      status: "planned"
    }
  ];

  const scrollToCard = (index: number) => {
    if (scrollRef.current) {
      const cardWidth = 320 + 24; // Card width (320) + gap (24)
      const containerWidth = scrollRef.current.clientWidth || 1000;
      const targetScroll = (index * cardWidth) - (containerWidth / 2) + (cardWidth / 2);
      
      scrollRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  const handleNext = () => {
    setActiveSprint((prev) => {
      const nextIdx = (prev + 1) % milestones.length;
      scrollToCard(nextIdx);
      return nextIdx;
    });
  };

  const handlePrev = () => {
    setActiveSprint((prev) => {
      const prevIdx = (prev - 1 + milestones.length) % milestones.length;
      scrollToCard(prevIdx);
      return prevIdx;
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (sectionRef.current) {
            observer.unobserve(sectionRef.current);
          }
        }
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -20px 0px"
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Scroll to active sprint (Sprint 5) on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToCard(4);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="roadmap" ref={sectionRef} className="scroll-mt-20 py-xxxl bg-white dark:bg-slate-950 transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-gutter md:px-xxxl">
        
        {/* Header with Navigation Controls */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-xxxl gap-lg text-center md:text-left">
          <div className="max-w-xl mx-auto md:mx-0 space-y-xs">
            <div className="inline-block px-lg py-1 bg-primary/10 dark:bg-primary/20 rounded-full">
              <span className="text-primary dark:text-coral-red font-label-caps text-label-caps uppercase tracking-wider">
                Roadmap
              </span>
            </div>
            <h2 className="font-headline-lg text-3xl md:text-headline-lg text-on-surface dark:text-white font-headline-lg">
              The Journey So Far
            </h2>
            <p className="text-on-surface-variant dark:text-slate-400 font-body-md">
              Charting the evolution of LAFINA's development cycle and sprint milestones.
            </p>
          </div>

          {/* Slider Controls */}
          <div className="flex gap-sm mx-auto md:mx-0 z-10">
            <button 
              onClick={handlePrev}
              className="w-12 h-12 rounded-full border border-border-light dark:border-slate-800 bg-white dark:bg-slate-950 flex items-center justify-center hover:bg-surface-container dark:hover:bg-slate-900 text-on-surface dark:text-white transition-colors active:scale-95"
              aria-label="Previous Sprint"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <button 
              onClick={handleNext}
              className="w-12 h-12 rounded-full border border-border-light dark:border-slate-800 bg-white dark:bg-slate-950 flex items-center justify-center hover:bg-surface-container dark:hover:bg-slate-900 text-on-surface dark:text-white transition-colors active:scale-95"
              aria-label="Next Sprint"
            >
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Promotional Video Player */}
        <div className="max-w-4xl mx-auto mb-xxxl relative group rounded-3xl border border-border-light dark:border-slate-850 bg-slate-50 dark:bg-slate-900/40 p-2 md:p-3 shadow-xl transition-all duration-300 hover:shadow-2xl">
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 shadow-inner">
            <video 
              src={lafinaPromotionalVideo} 
              controls 
              muted 
              playsInline 
              className="w-full h-full object-cover" 
            />
          </div>
        </div>

        {/* Timeline Slider Container */}
        <div className="relative w-full overflow-hidden py-md">
          {/* Gradients to fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white dark:from-slate-950 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white dark:from-slate-950 to-transparent z-10 pointer-events-none"></div>

          <div 
            ref={scrollRef}
            className="flex flex-row gap-xl overflow-x-auto scrollbar-none pb-md scroll-smooth"
          >
            {milestones.map((item, index) => {
              const isActive = activeSprint === index;
              return (
                <div 
                  key={index} 
                  className={`flex-shrink-0 w-[280px] md:w-[320px] relative group p-6 rounded-2xl border-t-4 transition-all duration-500 ease-out transform ${
                    isActive 
                      ? 'border-honey-gold bg-white dark:bg-slate-900 shadow-md ring-2 ring-honey-gold/30 scale-[1.02] opacity-100' 
                      : item.status === 'done' 
                        ? 'border-primary bg-surface-container-low dark:bg-slate-900/40 opacity-80' 
                        : 'border-slate-350 dark:border-slate-800 bg-surface-container-lowest dark:bg-slate-950/20 opacity-60'
                  } border border-x-border-light border-b-border-light dark:border-x-slate-800/80 dark:border-b-slate-800/80 shadow-sm hover:shadow-lg hover:opacity-100 hover:scale-[1.01] ${
                    isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                  onClick={() => {
                    setActiveSprint(index);
                    scrollToCard(index);
                  }}
                >
                  
                  <div className="space-y-md flex flex-col justify-between h-full">
                    <div className="space-y-xs">
                      
                      {/* Header: Sprint & Date */}
                      <div className="flex justify-between items-center">
                        <span className={`font-label-caps text-label-caps font-bold text-xs uppercase tracking-wider ${
                          item.status === 'done' 
                            ? 'text-primary dark:text-coral-red' 
                            : item.status === 'in_progress' 
                              ? 'text-honey-gold' 
                              : 'text-slate-450 dark:text-slate-500'
                        }`}>
                          Sprint {item.sprint}
                        </span>
                        <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                          {item.dates}
                        </span>
                      </div>

                      {/* Divider */}
                      <div className="h-[1px] bg-border-light dark:bg-slate-800/50 w-full my-sm"></div>

                      {/* Deliverable info */}
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500">Key Deliverable</span>
                        <h4 className="font-title-sm text-body-md text-on-surface dark:text-white font-bold leading-snug">
                          {item.deliverable}
                        </h4>
                      </div>

                      {/* Testing Focus info */}
                      <div className="space-y-1 pt-xs">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500">Testing Focus</span>
                        <p className="text-caption text-on-surface-variant dark:text-slate-400 leading-normal">
                          {item.testing}
                        </p>
                      </div>

                    </div>

                    {/* Status Indicator */}
                    <div className="mt-md pt-sm border-t border-border-light/40 dark:border-slate-800/40 flex items-center gap-xs">
                      {item.status === 'done' && (
                        <div className="flex items-center gap-xs text-success-mint font-semibold">
                          <span className="material-symbols-outlined text-[16px]">check_circle</span>
                          <span className="font-caption text-[10px] uppercase tracking-wider">Completed</span>
                        </div>
                      )}
                      {item.status === 'in_progress' && (
                        <div className="flex items-center gap-xs text-honey-gold font-semibold">
                          <span className="material-symbols-outlined text-[16px] animate-spin">autorenew</span>
                          <span className="font-caption text-[10px] uppercase tracking-wider">Active Sprint</span>
                        </div>
                      )}
                      {item.status === 'planned' && (
                        <div className="flex items-center gap-xs text-slate-450 font-semibold">
                          <span className="material-symbols-outlined text-[16px]">schedule</span>
                          <span className="font-caption text-[10px] uppercase tracking-wider">Planned</span>
                        </div>
                      )}
                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
