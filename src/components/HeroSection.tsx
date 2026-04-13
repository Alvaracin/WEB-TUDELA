interface HeroSectionProps {
  isFloating: boolean;
  onPointerDown: () => void;
  onPointerUp: () => void;
  gravityTriggered: boolean;
}

const HeroSection = ({ isFloating, onPointerDown, onPointerUp, gravityTriggered }: HeroSectionProps) => {
  const f = isFloating ? "floating" : "";

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background gradient only — grid is global */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1
          className={`font-mono text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-foreground mb-6 gravity-layer-text ${f}`}
        >
          ZER0 G
        </h1>
        <p
          className={`font-mono text-xl md:text-3xl lg:text-4xl text-foreground mb-4 gravity-layer-text ${f}`}
          style={{ transitionDelay: isFloating ? "0.35s" : "0.1s" }}
        >
          La gravedad es opcional.
        </p>
        <p
          className={`text-base md:text-lg text-muted-foreground mb-10 max-w-xl mx-auto gravity-layer-text ${f}`}
          style={{ transitionDelay: isFloating ? "0.4s" : "0.12s" }}
        >
          Boulder en Tudela. Para el que empieza y para el que aprieta.
        </p>

        <div className={`flex flex-col sm:flex-row gap-4 justify-center gravity-layer-button ${f}`}>
          <a
            href="#precios"
            className="font-mono text-sm px-8 py-3 bg-primary text-primary-foreground rounded-sm hover:bg-primary/90 transition-colors"
          >
            Hazte socio
          </a>
          <a
            href="#experiencia"
            className="font-mono text-sm px-8 py-3 border border-foreground/30 text-foreground rounded-sm hover:border-foreground/60 transition-colors"
          >
            Explorar
          </a>
        </div>

        {/* Gravity trigger */}
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

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-muted-foreground/40" />
      </div>
    </section>
  );
};

export default HeroSection;
