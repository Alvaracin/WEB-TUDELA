interface FounderSectionProps {
  isFloating: boolean;
}

const FounderSection = ({ isFloating }: FounderSectionProps) => {
  const f = isFloating ? "floating" : "";

  return (
    <section id="fundador" className="section-accent-yellow py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <h2
          className={`font-mono text-5xl font-bold text-foreground mb-16 text-center gravity-layer-text terminal-cursor ${f}`}
        >
          Nivel Fundador
        </h2>

        <div className="flex justify-center">
          <div
            className={`group relative w-full max-w-3xl border-2 border-primary bg-card/40 backdrop-blur-sm rounded-sm p-12 md:p-20 text-center transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_60px_-10px_hsl(var(--primary)/0.5)] gravity-layer-card ${f}`}
          >
            <p className="font-mono text-2xl md:text-4xl text-foreground leading-relaxed mb-4">
              Te gustaría saber qué es ésto de fundadores ¿eh?
            </p>
            <p className="font-mono text-2xl md:text-4xl text-primary leading-relaxed">
              Pues te esperas hasta agosto.
            </p>

            <p className="mt-12 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground/60">
              Paciencia.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
