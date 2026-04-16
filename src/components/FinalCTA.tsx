interface FinalCTAProps {
  isFloating: boolean;
}

const FinalCTA = ({ isFloating }: FinalCTAProps) => {
  const f = isFloating ? "floating" : "";

  return (
    <section className="py-32 px-6 relative">
      <div className={`absolute inset-0 dotted-grid opacity-20 gravity-layer-grid ${f}`} />
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <p className={`font-mono text-3xl md:text-5xl lg:text-6xl text-foreground mb-6 leading-[1.3] gravity-layer-text ${f}`}>
          ¿Has llegado hasta aquí abajo?
        </p>
        <p className={`font-mono text-3xl md:text-5xl lg:text-6xl text-primary mb-14 leading-[1.3] gravity-layer-text ${f}`}>
          Ven. Te enseñamos a subir.
        </p>
        <a
          href="#precios"
          className={`inline-block font-mono text-base px-10 py-4 bg-primary text-primary-foreground rounded-sm hover:bg-primary/90 transition-colors gravity-layer-button ${f}`}
        >
          Hazte socio
        </a>
      </div>
    </section>
  );
};

export default FinalCTA;
