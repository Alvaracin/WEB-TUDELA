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
  "hsl(338, 100%, 62%)",   // #FF3D8E
  "hsl(72, 100%, 56%)",    // #D9FF00
  "hsl(166, 82%, 56%)",    // #30EED0
];

const generateCircles = (): Circle[] => {
  const circles: Circle[] = [];
  const count = 18;
  for (let i = 0; i < count; i++) {
    circles.push({
      id: i,
      x: 5 + Math.random() * 90,
      y: 5 + Math.random() * 300, // spread across tall page
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
  const [scrollY, setScrollY] = useState(0);
  const [activeMessage, setActiveMessage] = useState<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleInteraction = useCallback((id: number, hasMessage: boolean) => {
    if (!hasMessage) return;
    setActiveMessage(id);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setActiveMessage(null), 2000);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
      {circles.map((circle) => {
        const parallaxY = scrollY * circle.speed;
        const floatOffset = isFloating ? -(10 + circle.size * 0.15) : 0;

        return (
          <div
            key={circle.id}
            className="absolute transition-transform duration-700"
            style={{
              left: `${circle.x}%`,
              top: `${circle.y}vh`,
              width: circle.size,
              height: circle.size,
              transform: `translateY(${-parallaxY + floatOffset}px)`,
              transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              transitionDelay: isFloating ? "0.35s" : "0.15s",
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
        );
      })}
    </div>
  );
};

export default FloatingCircles;
