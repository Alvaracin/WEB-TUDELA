import { useState, useEffect, useCallback, useRef } from "react";
import hold1 from "@/assets/hold-1.png";
import hold2 from "@/assets/hold-2.png";
import hold3 from "@/assets/hold-3.png";
import hold4 from "@/assets/hold-4.png";
import hold5 from "@/assets/hold-5.png";
import hold6 from "@/assets/hold-6.png";
import hold7 from "@/assets/hold-7.png";
import hold8 from "@/assets/hold-8.png";
import hold9 from "@/assets/hold-9.png";
import hold10 from "@/assets/hold-10.png";

interface Circle {
  id: number;
  x: number;
  y: number;
  size: number;
  image: string;
  message?: string;
  speed: number;
  blur: number;
  driftPhase: number;
  driftSpeed: number;
  driftRadius: number;
  rotation: number;
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

const holdImages = [hold1, hold2, hold3, hold4, hold5, hold6, hold7, hold8, hold9, hold10];

const generateCircles = (): Circle[] => {
  const circles: Circle[] = [];
  const count = 18;
  for (let i = 0; i < count; i++) {
    circles.push({
      id: i,
      x: 5 + Math.random() * 90,
      y: 5 + Math.random() * 300,
      size: 60 + Math.random() * 120,
      image: holdImages[i % holdImages.length],
      message: i % 3 === 0 ? messages[i % messages.length] : undefined,
      speed: 0.15 + Math.random() * 0.25,
      blur: i % 5 === 0 ? 1 + Math.random() * 2 : 0,
      driftPhase: Math.random() * Math.PI * 2,
      driftSpeed: 0.3 + Math.random() * 0.5,
      driftRadius: 3 + Math.random() * 8,
      rotation: Math.random() * 360,
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
    let running = true;

    const update = (now: number) => {
      if (!running) return;
      const elapsed = now / 1000;

      circles.forEach((circle, i) => {
        const el = circleRefs.current[i];
        if (!el) return;
        const parallaxY = scrollRef.current * circle.speed;
        const floatOffset = floatingRef.current ? -(10 + circle.size * 0.15) : 0;
        const driftX = Math.sin(elapsed * circle.driftSpeed + circle.driftPhase) * circle.driftRadius;
        const driftY = Math.cos(elapsed * circle.driftSpeed * 0.7 + circle.driftPhase) * circle.driftRadius * 0.6;
        const spin = circle.rotation + elapsed * (circle.driftSpeed * 2);
        el.style.transform = `translate(${driftX}px, ${-parallaxY + floatOffset + driftY}px) rotate(${spin}deg)`;
      });

      rafRef.current = requestAnimationFrame(update);
    };

    const onScroll = () => {
      scrollRef.current = window.scrollY;
    };

    scrollRef.current = window.scrollY;
    rafRef.current = requestAnimationFrame(update);

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      running = false;
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [circles]);

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
          className="absolute"
          style={{
            left: `${circle.x}%`,
            top: `${circle.y}vh`,
            width: circle.size,
            height: circle.size,
            filter: circle.blur > 0 ? `blur(${circle.blur}px)` : undefined,
          }}
        >
          <img
            src={circle.image}
            alt=""
            aria-hidden="true"
            draggable={false}
            className={`w-full h-full object-contain opacity-50 hover:opacity-80 transition-opacity duration-500 ${circle.message ? "pointer-events-auto cursor-pointer" : ""}`}
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
