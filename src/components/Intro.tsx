import { useEffect, useRef } from 'react';
import './Intro.css';

interface IntroProps { onComplete: () => void }

export function Intro({ onComplete }: IntroProps) {
  const root = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduced.matches) { onComplete(); return; }
    let disposed = false;
    let destroy: (() => void) | undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const content = document.querySelector<HTMLElement>('.website-content');
    if (content) content.inert = true;
    const finish = () => onComplete();
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') finish(); };
    window.addEventListener('keydown', onKey);
    reduced.addEventListener('change', finish);
    // Fail open if rendering is unavailable or the module takes too long to load.
    const timeout = window.setTimeout(finish, 5200);
    import('./introScene').then(({ createIntroScene }) => {
      if (disposed || !canvas.current || !root.current) return;
      destroy = createIntroScene(canvas.current, root.current, finish);
    }).catch(finish);
    return () => {
      disposed = true;
      destroy?.();
      clearTimeout(timeout);
      document.body.style.overflow = previousOverflow;
      if (content) content.inert = false;
      window.removeEventListener('keydown', onKey);
      reduced.removeEventListener('change', finish);
    };
  }, [onComplete]);

  return (
    <div className="lafina-intro" ref={root} role="dialog" aria-modal="true" aria-label="Welcome to LAFINA">
      <div className="intro-halo" aria-hidden="true" />
      <div className="intro-caption" aria-hidden="true">A LITTLE MORE IN TUNE.</div>
      <canvas ref={canvas} className="intro-canvas" aria-label="A three-dimensional sound wave transforms into LAFINA" role="img" />
      <div className="intro-signature" aria-hidden="true">YOUR DAY. YOUR VOICE.</div>
      <button className="intro-skip" onClick={onComplete}>Skip intro <span aria-hidden="true">↗</span></button>
    </div>
  );
}
