import { useEffect, useRef, useState } from "react";

interface LevelSystemProps {
  isFloating: boolean;
}

const levels = [
  {
    id: 0,
    label: "Nivel 0",
    line1: "Nunca has tocado un rocódromo.",
    line2: "Pero llevas 10 minutos mirando esta web.",
    color: "text-muted-foreground",
    accent: "border-muted-foreground/30",
  },
  {
    id: 1,
    label: "Nivel 1",
    line1: "Vienes a probar.",
    line2: "Dices que es por curiosidad.",
    color: "text-accent",
    accent: "border-accent/40",
  },
  {
    id: 2,
    label: "Nivel 2",
    line1: "Ya tienes pies de gato.",
    line2: "Y una excusa para venir 3 veces por semana.",
    color: "text-secondary",
    accent: "border-secondary/40",
  },
  {
    id: 3,
    label: "Nivel 3",
    line1: "Te quejas del setting.",
    line2: "Luego repites el bloque.",
    color: "text-primary",
    accent: "border-primary/40",
  },
];

const LevelSystem = ({ isFloating }: LevelSystemProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeLevel, setActiveLevel] = useState(0);
  const f = isFloating ? "floating" : "";

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const containerTop = -rect.top;
      const containerHeight = container.offsetHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, containerTop / containerHeight));
      const level = Math.min(3, Math.floor(progress * 4));
      setActiveLevel(level);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={containerRef} className="relative" style={{ height: "400vh" }} id="niveles">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className={`absolute inset-0 dotted-grid opacity-30 gravity-layer-grid ${f}`} />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 w-full">
          {/* Title */}
          <h2 className={`font-mono text-lg md:text-xl text-muted-foreground mb-16 text-center gravity-layer-text ${f}`}>
            ¿En qué nivel estás?
          </h2>

          {/* Progress indicator */}
          <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
            {levels.map((level) => (
              <div
                key={level.id}
                className={`w-2 h-2 rounded-full transition-all duration-500 ${
                  activeLevel >= level.id
                    ? "bg-primary scale-125"
                    : "bg-muted-foreground/30 scale-100"
                }`}
              />
            ))}
            <div
              className="w-px bg-primary/50 transition-all duration-500"
              style={{ height: `${(activeLevel / 3) * 60}px` }}
            />
          </div>

          {/* Level content */}
          <div className="text-center relative min-h-[200px] flex items-center justify-center">
            {levels.map((level) => (
              <div
                key={level.id}
                className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ${
                  activeLevel === level.id
                    ? "opacity-100 translate-y-0"
                    : activeLevel > level.id
                    ? "opacity-0 -translate-y-8"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <span className={`font-mono text-sm ${level.color} mb-6 tracking-widest uppercase`}>
                  {level.label}
                </span>
                <p className={`font-mono text-xl md:text-3xl text-foreground mb-2 gravity-layer-text ${f}`}>
                  {level.line1}
                </p>
                <p className={`font-mono text-xl md:text-3xl ${level.color} gravity-layer-text ${f}`}>
                  {level.line2}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LevelSystem;
