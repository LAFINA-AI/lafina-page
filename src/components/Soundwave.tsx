import React from 'react';

interface SoundwaveProps {
  colorClass?: string; // Tailwind class, e.g. 'bg-white', 'bg-primary', 'bg-slate-400'
  barCount?: number;
  heightClass?: string; // Tailwind height class, e.g. 'h-8', 'h-12'
  isAnimated?: boolean;
}

export const Soundwave: React.FC<SoundwaveProps> = ({
  colorClass = "bg-white",
  barCount = 15,
  heightClass = "h-8",
  isAnimated = true,
}) => {
  const bars = Array.from({ length: barCount });
  
  // Heights for the static state and base multipliers
  const baseHeights = [0.4, 0.7, 0.5, 0.9, 0.6, 0.8, 0.5, 1.0, 0.6, 0.8, 0.5, 0.9, 0.4, 0.7, 0.5];

  return (
    <div className={`flex items-center gap-[3px] md:gap-[4px] justify-center ${heightClass}`} aria-hidden="true">
      {bars.map((_, i) => {
        const heightFactor = baseHeights[i % baseHeights.length];
        // Distribute animation delay and durations to create a natural wave appearance
        const animationDelay = `${(i * 0.08).toFixed(2)}s`;
        const duration = `${(0.8 + (i % 3) * 0.2).toFixed(2)}s`;
        
        return (
          <div
            key={i}
            className={`w-[3px] md:w-[4px] rounded-full transition-colors duration-300 ${colorClass}`}
            style={{
              height: `${heightFactor * 100}%`,
              animation: isAnimated ? `soundwave-pulse ${duration} ease-in-out infinite` : 'none',
              animationDelay: isAnimated ? animationDelay : '0s',
              transformOrigin: 'center',
            }}
          />
        );
      })}
    </div>
  );
};
