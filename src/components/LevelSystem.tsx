import { useRef, useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const GLITCH_CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`█▓▒░╳╱╲▲▼◆◇○●";
const scrambleText = (target: string, ratio = 1) =>
  target
    .split("")
    .map((c) => {
      if (c === " ") return " ";
      if (Math.random() > ratio) return c;
      return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
    })
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
    scrambleDuration: 0,
    scrambleRatio: 0,
  },
  {
    id: 1,
    label: "Nivel 1",
    line1: "Vienes a probar.",
    line2: "Dices que es por curiosidad.",
    color: "text-accent",
    scrambleDuration: 150,
    scrambleRatio: 0.3,
  },
  {
    id: 2,
    label: "Nivel 2",
    line1: "Ya tienes pies de gato.",
    line2: "Y una excusa para venir 3 veces por semana.",
    color: "text-secondary",
    scrambleDuration: 300,
    scrambleRatio: 0.55,
  },
  {
    id: 3,
    label: "Nivel 3",
    line1: "Te quejas del setting.",
    line2: "Luego repites el bloque.",
    color: "text-[hsl(338,100%,62%)]",
    scrambleDuration: 500,
    scrambleRatio: 0.8,
  },
  {
    id: 4,
    label: "Nivel Final",
    line1: "Te puede el ansia.",
    line2: "Te haces socix fundadorx.",
    color: "text-[hsl(166,82%,56%)]",
    scrambleDuration: 800,
    scrambleRatio: 1,
  },
];

const LevelSystem = ({ isFloating }: LevelSystemProps) => {
  const [activeLevel, setActiveLevel] = useState(0);
  const [glitchText, setGlitchText] = useState<{ id: number; line1: string; line2: string } | null>(null);
  const [showFlash, setShowFlash] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef(0);
  const dragging = useRef(false);
  const f = isFloating ? "floating" : "";

  // Scramble effect for any level (intensity scales with level)
  useEffect(() => {
    const target = levels[activeLevel];
    if (!target || target.scrambleDuration === 0) {
      setGlitchText(null);
      return;
    }
    const start = performance.now();
    const duration = target.scrambleDuration;
    const baseRatio = target.scrambleRatio;
    let raf: number;
    const tick = (now: number) => {
      const t = now - start;
      if (t >= duration) {
        setGlitchText(null);
        return;
      }
      const progress = t / duration;
      // Reveal progressively, but allow ratio to dictate how many chars still flicker
      const reveal = (str: string) =>
        str
          .split("")
          .map((c, i) => {
            if (c === " ") return " ";
            if (i / str.length < progress) return c;
            return Math.random() < baseRatio
              ? GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
              : c;
          })
          .join("");
      setGlitchText({ id: target.id, line1: reveal(target.line1), line2: reveal(target.line2) });
      raf = requestAnimationFrame(tick);
    };
    setGlitchText({
      id: target.id,
      line1: scrambleText(target.line1, baseRatio),
      line2: scrambleText(target.line2, baseRatio),
    });
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [activeLevel]);

  const goTo = useCallback((idx: number) => {
    const clamped = Math.max(0, Math.min(levels.length - 1, idx));
    setActiveLevel(clamped);
  }, []);

  const triggerFinal = useCallback(() => {
    setActiveLevel(4);
    setShowFlash(true);
    window.setTimeout(() => {
      setShowFlash(false);
      const el = document.getElementById("fundador");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 260);
  }, []);

  const handleDotClick = (id: number) => {
    goTo(id);
  };

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

  const renderLine = (level: typeof levels[number], lineKey: "line1" | "line2") => {
    if (glitchText && glitchText.id === level.id && activeLevel === level.id) {
      return glitchText[lineKey];
    }
    return level[lineKey];
  };

  return (
    <section className="py-32 px-6 relative overflow-hidden" id="niveles">
      {/* Micro-flash overlay */}
      {showFlash && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center pointer-events-none">
          <span
            className="font-mono text-6xl md:text-8xl text-foreground"
            style={{ animation: "subliminal-in 0.26s ease-in-out forwards" }}
          >
            Claro.
          </span>
        </div>
      )}

      <div className="max-w-5xl mx-auto">
        <h2 className={`font-mono text-lg md:text-xl text-muted-foreground mb-12 text-center gravity-layer-text ${f}`}>
          ¿En qué nivel estás?
        </h2>

        {/* Progress dots */}
        <div className="flex justify-center gap-3 mb-12">
          {levels.map((level) => (
            <button
              key={level.id}
              onClick={() => handleDotClick(level.id)}
              aria-label={level.label}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                activeLevel === level.id
                  ? level.id === 4
                    ? "bg-[hsl(166,82%,56%)] scale-150"
                    : "bg-primary scale-150"
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
                <p className={`font-mono text-xl md:text-3xl lg:text-4xl text-foreground mb-3 gravity-layer-text ${f}`}>
                  {renderLine(level, "line1")}
                </p>
                <p className={`font-mono text-xl md:text-3xl lg:text-4xl ${level.color} gravity-layer-text ${f}`}>
                  {renderLine(level, "line2")}
                </p>

                {level.id === 4 && activeLevel === 4 && (
                  <button
                    onClick={triggerFinal}
                    className="mt-10 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-[hsl(166,82%,56%)] transition-colors"
                  >
                    → Ver Nivel Fundador
                  </button>
                )}
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
            disabled={activeLevel === levels.length - 1}
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
