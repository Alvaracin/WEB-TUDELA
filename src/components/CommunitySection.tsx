import { useEffect, useRef } from "react";

interface CommunitySectionProps {
  isFloating: boolean;
}

const events = [
  { title: "Inauguración", date: "4 de septiembre", desc: "Música, bloques, y gente." },
  { title: "Sesión principiantes", date: "Sábados 10:00", desc: "Para los que acaban de aterrizar." },
  { title: "Comp mensual", date: "Último sábado del mes", desc: "Compite. O anima. Las dos valen." },
];

const CommunitySection = ({ isFloating }: CommunitySectionProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const children = el.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    children.forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, []);

  const f = isFloating ? "floating" : "";

  return (
    <section id="comunidad" className="py-32 px-6" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <div className="reveal text-center mb-20">
          <p className={`font-mono text-xl md:text-3xl text-foreground mb-2 gravity-layer-text ${f}`}>
            En el espacio nadie te oye gritar.
          </p>
          <p className={`font-mono text-xl md:text-3xl text-primary mb-2 gravity-layer-text ${f}`}>
            En ZER0 G te miramos cómo caes.
          </p>
          <p className={`font-mono text-xl md:text-3xl text-muted-foreground gravity-layer-text ${f}`}>
            Y luego te explicamos por qué.
          </p>
        </div>

        <h2 className={`reveal font-mono text-2xl md:text-3xl font-bold text-foreground mb-12 text-center gravity-layer-text ${f}`}>
          ¿Qué pasará en el futuro próximo?
        </h2>

        <div className="space-y-4">
          {events.map((event, i) => (
            <div
              key={event.title}
              className={`reveal p-6 border border-border rounded-sm hover:border-primary/30 transition-all gravity-layer-card ${f}`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <div>
                  <h3 className="font-mono text-base font-bold text-foreground">{event.title}</h3>
                  <p className="text-sm text-muted-foreground">{event.desc}</p>
                </div>
                <span className="font-mono text-xs text-primary whitespace-nowrap">{event.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
