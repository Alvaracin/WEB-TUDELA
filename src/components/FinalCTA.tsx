interface FinalCTAProps {
  isFloating: boolean;
}

const FinalCTA = ({ isFloating }: FinalCTAProps) => {
  const f = isFloating ? "floating" : "";

  return (
    <section className="py-32 px-6 relative">
      <div className={`absolute inset-0 dotted-grid opacity-20 gravity-layer-grid ${f}`} />
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <p className={`font-mono text-3xl md:text-3xl text-foreground mb-6 leading-[1.3] gravity-layer-text ${f} uppercase`}>
          ¿HAS LLEGADO HASTA AQUÍ ABAJO, TÚ SOLX?
        </p>
        <p className={`font-mono text-3xl md:text-3xl text-primary leading-[1.3] gravity-layer-text ${f} font-semibold mb-8`}>
          Ven. Te enseñamos a subir.
        </p>
        <a
          href="https://www.instagram.com/zerogescalada/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-sm px-8 py-3 bg-primary text-primary-foreground rounded-sm hover:bg-primary/90 transition-colors inline-block"
        >
          Únete a la comunidad
        </a>
      </div>
    </section>
  );
};

export default FinalCTA;
