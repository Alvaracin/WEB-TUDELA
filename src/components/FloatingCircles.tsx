import { useState, useEffect, useCallback, useRef } from "react";

interface Circle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  message?: string;
  speed: number;
}

const messages = [
  "¿SIGUES BAJANDO?",
  "EN ALGÚN MOMENTO TE TOCARÁ SUBIR",
  "BUSCA EL TOP",
  "ESTE ES EL CRUX",
  "METE TALÓN",
  "NO MIRES ABAJO",
  "RESPIRA",
  "CONFÍA EN EL PIE",
];

const colors = [
  "hsl(338, 100%, 62%)",
  "hsl(72, 100%, 56%)",
  "hsl(166, 82%, 56%)",
];

const generateCircles = (): Circle[] => {
  const circles: Circle[] = [];
  const count = 18;
  for (let i = 0; i < count; i++) {
    circles.push({
      id: i,
      x: 5 + Math.random() * 90,
      y: 5 + Math.random() * 300,
      size: 20 + Math.random() * 80,
      color: colors[i % colors.length],
      message: i % 3 === 0 ? messages[i % messages.length] : undefined,
      speed: 0.15 + Math.random() * 0.25,
    });
  }
  return circles;
};

interface FloatingCirclesProps {
  isFloating: boolean;
}

const FloatingCircles = ({ isFloating }: FloatingCirclesProps) => {
  const [circles] = useState(generateCircles);
  const [activeMessage, setActiveMessage] = useState<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const circleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollRef = useRef(0);
  const rafRef = useRef<number>();
  const floatingRef = useRef(isFloating);

  floatingRef.current = isFloating;

  useEffect(() => {
    const update = () => {
      circles.forEach((circle, i) => {
        const el = circleRefs.current[i];
        if (!el) return;
        const parallaxY = scrollRef.current * circle.speed;
        const floatOffset = floatingRef.current ? -(10 + circle.size * 0.15) : 0;
        el.style.transform = `translateY(${-parallaxY + floatOffset}px)`;
      });
    };

    const onScroll = () => {
      scrollRef.current = window.scrollY;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };

    scrollRef.current = window.scrollY;
    update();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [circles]);

  // Re-run update when isFloating changes for gravity effect
  useEffect(() => {
    circles.forEach((circle, i) => {
      const el = circleRefs.current[i];
      if (!el) return;
      const parallaxY = scrollRef.current * circle.speed;
      const floatOffset = isFloating ? -(10 + circle.size * 0.15) : 0;
      el.style.transform = `translateY(${-parallaxY + floatOffset}px)`;
    });
  }, [isFloating, circles]);

  const handleInteraction = useCallback((id: number, hasMessage: boolean) => {
    if (!hasMessage) return;
    setActiveMessage(id);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setActiveMessage(null), 2000);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
      {circles.map((circle, i) => (
        <div
          key={circle.id}
          ref={(el) => { circleRefs.current[i] = el; }}
          className={isFloating ? "absolute transition-transform duration-700" : "absolute"}
          style={{
            left: `${circle.x}%`,
            top: `${circle.y}vh`,
            width: circle.size,
            height: circle.size,
            transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        >
          <div
            className={`w-full h-full rounded-full opacity-20 hover:opacity-40 transition-opacity duration-500 ${circle.message ? "pointer-events-auto cursor-pointer" : ""}`}
            style={{ backgroundColor: circle.color }}
            onMouseEnter={() => handleInteraction(circle.id, !!circle.message)}
            onTouchStart={() => handleInteraction(circle.id, !!circle.message)}
          />
          {circle.message && activeMessage === circle.id && (
            <span className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] tracking-widest text-foreground/60 animate-fade-in">
              {circle.message}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default FloatingCircles;
