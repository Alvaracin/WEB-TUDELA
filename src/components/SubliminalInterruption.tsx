import { useState, useEffect, useRef } from "react";

const SubliminalInterruption = () => {
  const [triggered, setTriggered] = useState(false);
  const [visible, setVisible] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || triggered) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          setTriggered(true);
          setVisible(true);
          setTimeout(() => setVisible(false), 350);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [triggered]);

  return (
    <>
      {/* Invisible sentinel — placed between sections to trigger mid-scroll */}
      <div ref={sentinelRef} className="h-px w-full" />

      {visible && (
        <div className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center animate-subliminal">
          <div className="absolute inset-0 bg-background/80" />
          <p className="relative font-mono text-2xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-[0.3em] uppercase animate-glitch-flicker select-none">
            ROJEM OL RALACSE
          </p>
        </div>
      )}
    </>
  );
};

export default SubliminalInterruption;
