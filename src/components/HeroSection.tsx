import logoGif from "@/assets/zeroglitch.gif";

interface HeroSectionProps {
  isFloating: boolean;
  onPointerDown: () => void;
  onPointerUp: () => void;
  gravityTriggered: boolean;
}

const LOGO_SHIFT = "-42vh";
const TEXT_SHIFT = "calc(-42vh * 0.89)";
const BUTTON_SHIFT = "calc(-42vh * 0.55)";

const HeroSection = ({ isFloating, onPointerDown, onPointerUp, gravityTriggered }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Logo — biggest movement, tilts 13deg */}
        <div
          className="mb-6"
          style={{
            transform: isFloating ? `translateY(${LOGO_SHIFT}) rotate(13deg)` : "translateY(0) rotate(0deg)",
            transition: isFloating
              ? "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0s"
              : "transform 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s",
          }}
        >
          <img
            src={logoGif}
            alt="ZER0 G"
            className="h-32 md:h-44 lg:h-56 mx-auto"
          />
        </div>

        {/* Main tagline — 89% of logo shift, tilts -8deg */}
        <p
          className="font-mono text-2xl md:text-4xl lg:text-5xl text-foreground mb-6 leading-[1.3]"
          style={{
            transform: isFloating ? `translateY(${TEXT_SHIFT}) rotate(-8deg)` : "translateY(0) rotate(0deg)",
            transition: isFloating
              ? "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.12s"
              : "transform 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.05s",
          }}
        >
          La gravedad es opcional.
        </p>

        {/* Subtitle — same as tagline */}
        <p
          className="text-base md:text-lg text-muted-foreground mb-10 max-w-xl mx-auto"
          style={{
            transform: isFloating ? `translateY(${TEXT_SHIFT}) rotate(-8deg)` : "translateY(0) rotate(0deg)",
            transition: isFloating
              ? "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.18s"
              : "transform 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.08s",
          }}
        >
          El primer boulder de Tudela y la Ribera.
          <br />
          Para el que empieza y para el que aprieta.
        </p>

        {/* Buttons — 55% of logo shift, staggered one by one */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://www.instagram.com/zerogescalada/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm px-8 py-3 bg-primary text-primary-foreground rounded-sm hover:bg-primary/90 transition-colors"
            style={{
              transform: isFloating ? `translateY(${BUTTON_SHIFT})` : "translateY(0)",
              transition: isFloating
                ? "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.28s"
                : "transform 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.1s",
            }}
          >
            Únete a la comunidad
          </a>
          <a
            href="#experiencia"
            className="font-mono text-sm px-8 py-3 border border-foreground/30 text-foreground rounded-sm hover:border-foreground/60 transition-colors"
            style={{
              transform: isFloating ? `translateY(${BUTTON_SHIFT})` : "translateY(0)",
              transition: isFloating
                ? "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.38s"
                : "transform 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.12s",
            }}
          >
            Explorar
          </a>
        </div>

        <div className="mt-16">
          <button
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
            className="font-mono text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors select-none cursor-pointer border border-border/40 px-4 py-2 rounded-sm hover:border-border"
          >
            Comprueba si la gravedad te afecta.
          </button>
          {gravityTriggered && !isFloating && (
            <p className="font-mono text-xs text-primary mt-3 animate-fade-in">
              No es la gravedad. Eres tú.
            </p>
          )}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-muted-foreground/40" />
      </div>
    </section>
  );
};

export default HeroSection;
