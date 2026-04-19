import { useRef, useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const GLITCH_CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`█▓▒░╳╱╲▲▼◆◇○●";
const scrambleText = (target: string) =>
  target
    .split("")
    .map((c) => (c === " " ? " " : GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]))
    .join("");


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
  },
  {
    id: 1,
    label: "Nivel 1",
    line1: "Vienes a probar.",
    line2: "Dices que es por curiosidad.",
    color: "text-accent",
  },
  {
    id: 2,
    label: "Nivel 2",
    line1: "Ya tienes pies de gato.",
    line2: "Y una excusa para venir 3 veces por semana.",
    color: "text-secondary",
  },
  {
    id: 3,
    label: "Nivel 3",
    line1: "Te quejas del setting.",
    line2: "Luego repites el bloque.",
    color: "text-[hsl(338,100%,62%)]",
  },
];

const LevelSystem = ({ isFloating }: LevelSystemProps) => {
  const [activeLevel, setActiveLevel] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef(0);
  const dragging = useRef(false);
  const f = isFloating ? "floating" : "";

  const goTo = useCallback((idx: number) => {
    setActiveLevel(Math.max(0, Math.min(3, idx)));
  }, []);

  // Keyboard support
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goTo(activeLevel + 1);
      if (e.key === "ArrowLeft") goTo(activeLevel - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeLevel, goTo]);

  // Drag/swipe
  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    dragStartX.current = e.clientX;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    dragging.current = false;
    const diff = e.clientX - dragStartX.current;
    if (Math.abs(diff) > 50) {
      goTo(activeLevel + (diff < 0 ? 1 : -1));
    }
  };

  return (
    <section className="py-32 px-6 relative overflow-hidden" id="niveles">
      <div className="max-w-5xl mx-auto">
        <h2 className={`font-mono text-lg md:text-xl text-muted-foreground mb-12 text-center gravity-layer-text ${f}`}>
          ¿En qué nivel estás?
        </h2>

        {/* Progress dots */}
        <div className="flex justify-center gap-3 mb-12">
          {levels.map((level) => (
            <button
              key={level.id}
              onClick={() => goTo(level.id)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                activeLevel === level.id
                  ? "bg-primary scale-150"
                  : activeLevel > level.id
                  ? "bg-primary/50"
                  : "bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>

        {/* Slider track */}
        <div
          ref={trackRef}
          className="relative touch-pan-y select-none cursor-grab active:cursor-grabbing"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
        >
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${activeLevel * 100}%)` }}
          >
            {levels.map((level) => (
              <div
                key={level.id}
                className="min-w-full flex flex-col items-center justify-center text-center px-4 py-16"
              >
                <span className={`font-mono text-sm ${level.color} mb-6 tracking-widest uppercase`}>
                  {level.label}
                </span>
                <p className={`font-mono text-xl md:text-3xl lg:text-4xl text-foreground mb-3 gravity-layer-text ${f} ${
                  level.id === 3 && activeLevel === 3 ? "animate-glitch" : ""
                }`}>
                  {level.line1}
                </p>
                <p className={`font-mono text-xl md:text-3xl lg:text-4xl ${level.color} gravity-layer-text ${f} ${
                  level.id === 3 && activeLevel === 3 ? "animate-glitch" : ""
                }`}>
                  {level.line2}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Arrow controls */}
        <div className="flex justify-center gap-6 mt-8">
          <button
            onClick={() => goTo(activeLevel - 1)}
            disabled={activeLevel === 0}
            className="p-2 border border-border rounded-sm text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => goTo(activeLevel + 1)}
            disabled={activeLevel === 3}
            className="p-2 border border-border rounded-sm text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default LevelSystem;
