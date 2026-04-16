import { useEffect, useRef } from "react";

interface IntroSectionProps {
  isFloating: boolean;
}

const IntroSection = ({ isFloating }: IntroSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.classList.add("visible");
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const f = isFloating ? "floating" : "";

  return (
    <section className="py-32 px-6">
      <div ref={ref} className="reveal max-w-3xl mx-auto text-center">
        <p className={`font-mono text-3xl md:text-3xl text-foreground leading-[1.4] mb-8 gravity-layer-text ${f} uppercase`}>
          No necesitas ser fuerte.
        </p>
        <p className={`font-mono text-3xl md:text-3xl text-primary leading-[1.4] mb-12 gravity-layer-text ${f} font-semibold`}>
          Necesitas empezar.
        </p>
        <p className={`text-muted-foreground text-base md:text-lg max-w-xl mx-auto gravity-layer-text ${f}`}>
          Da igual si nunca has tocado una presa.
          <br />
          Aquí todos empezamos igual: mirando la pared y pensando "¿por dónde?"
        </p>
      </div>
    </section>
  );
};

export default IntroSection;
