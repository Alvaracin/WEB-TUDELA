interface CultureSectionProps {
  isFloating: boolean;
}

const CultureSection = ({ isFloating }: CultureSectionProps) => {
  const f = isFloating ? "floating" : "";

  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <p className={`font-mono text-2xl md:text-4xl text-foreground leading-relaxed gravity-layer-text ${f}`}>
          Escala fuerte.
        </p>
        <p className={`font-mono text-2xl md:text-4xl text-primary leading-relaxed gravity-layer-text ${f}`}>
          Y compórtate mejor.
        </p>
      </div>
    </section>
  );
};

export default CultureSection;
