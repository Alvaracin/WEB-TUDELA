interface CultureSectionProps {
  isFloating: boolean;
}

const CultureSection = ({ isFloating }: CultureSectionProps) => {
  const f = isFloating ? "floating" : "";

  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <p className={`font-mono text-3xl md:text-5xl lg:text-6xl text-foreground leading-[1.4] gravity-layer-text ${f}`}>
          Escala fuerte.
        </p>
        <p className={`font-mono text-3xl md:text-5xl lg:text-6xl text-primary leading-[1.4] gravity-layer-text ${f}`}>
          Y compórtate mejor.
        </p>
      </div>
    </section>
  );
};

export default CultureSection;
