import React, { useState } from 'react';

import angeloImg from '../assets/team/angelo_Chief_Executive_Officer.png';
import lemarImg from '../assets/team/Lemar_Chief_Technology_Officer.png';
import noelImg from '../assets/team/noel_chief_innovation_officer.png';
import austinImg from '../assets/team/Austin_Front_End_Developer.png';
import finnahImg from '../assets/team/Finnah_Technical_Writer.png';

interface Member {
  name: string;
  role: string;
  image: string;
  initials: string;
}

export const Team: React.FC = () => {
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const members: Member[] = [
    {
      name: "John Michael Angelo C. Binonggo ", 
      role: "Chief Executive Officer",
      image: angeloImg,
      initials: "A"
    },
    {
      name: "John Lemar L. Gonzalez",
      role: "Chief Technology Officer",
      image: lemarImg,
      initials: "L"
    },
    {
      name: "Noel Jhumel G. Blanco",
      role: "Chief Innovation Officer",
      image: noelImg,
      initials: "N"
    },
    {
      name: "Austin Dilan Datan",
      role: "Front End Developer",
      image: austinImg,
      initials: "AU"
    },
    {
      name: "Finnah Marie G. Bajas",
      role: "Technical Writer",
      image: finnahImg,
      initials: "F"
    }
  ];

  const handleImageError = (index: number) => {
    setImageErrors((prev) => ({ ...prev, [index]: true }));
  };

  // Duplicate the list of members to create the seamless infinite scroll marquee
  const duplicatedMembers = [...members, ...members, ...members];

  return (
    <section id="team" className="scroll-mt-20 py-xxxl bg-surface-container-low dark:bg-slate-900 transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-gutter md:px-xxxl">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-xxxl gap-lg text-center md:text-left reveal-left">
          <div className="max-w-xl mx-auto md:mx-0 space-y-xs">
            <div className="inline-block px-lg py-1 bg-primary/10 dark:bg-primary/20 rounded-full">
              <span className="text-primary dark:text-coral-red font-label-caps text-label-caps uppercase tracking-wider">
                The Team
              </span>
            </div>
            <h2 className="font-headline-lg text-3xl md:text-headline-lg text-on-surface dark:text-white font-headline-lg">
              Meet the Visionaries
            </h2>
            <p className="text-on-surface-variant dark:text-slate-400 font-body-md">
              The developers, designers, and AI researchers engineering the future of on-device student productivity.
            </p>
          </div>
        </div>
      </div>

      {/* Infinite Horizontal Scrolling Marquee */}
      <div className="max-w-7xl mx-auto px-gutter md:px-xxxl reveal-bottom">
        <div className="relative w-full overflow-hidden py-md">
          {/* Gradients to fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-surface-container-low dark:from-slate-900 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-surface-container-low dark:from-slate-900 to-transparent z-10 pointer-events-none"></div>

        <div className="animate-marquee flex gap-xl px-xl">
          {duplicatedMembers.map((member, i) => {
            const isErrored = imageErrors[i];
            
            return (
              <div 
                key={i} 
                className="flex-shrink-0 w-[240px] md:w-[280px] group transition-all duration-300 rounded-3xl p-2 bg-white dark:bg-slate-950 border border-border-light dark:border-slate-850 shadow-sm hover:shadow-lg hover:-translate-y-1"
              >
                {/* Image / Avatar Container */}
                <div className="relative rounded-2xl overflow-hidden mb-lg aspect-[4/5] bg-surface-container dark:bg-slate-850 shadow-sm transition-all">
                  
                  {isErrored ? (
                    // Offline Fallback Avatar
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 text-slate-400 dark:text-slate-500">
                      <div className="w-20 h-20 rounded-full lafina-gradient-bg p-[2px] flex items-center justify-center shadow-lg mb-sm">
                        <div className="w-full h-full rounded-full bg-white dark:bg-slate-900 flex items-center justify-center font-headline-lg text-headline-lg font-bold text-on-surface dark:text-white">
                          {member.initials}
                        </div>
                      </div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Offline Profile</span>
                    </div>
                  ) : (
                    // Member Photo with hover transitions
                    <img 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                      src={member.image} 
                      alt={member.name}
                      onError={() => handleImageError(i)}
                    />
                  )}

                  {/* Gradient Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"></div>
                </div>

                {/* Info */}
                <div className="space-y-xs text-left px-2 py-1">
                  <h3 className="font-title-sm text-title-sm text-on-surface dark:text-white font-bold group-hover:text-primary dark:group-hover:text-honey-gold transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-caption text-primary dark:text-coral-red font-bold uppercase tracking-wider">
                    {member.role}
                  </p>
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
