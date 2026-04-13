import { useEffect, useRef } from "react";
import { Check } from "lucide-react";

interface PricingSectionProps {
  isFloating: boolean;
}

const plans = [
  {
    name: "Sesión",
    price: "9,5€",
    period: "día",
    features: ["Acceso al rocódromo", "Material no incluido"],
    highlighted: false,
  },
  {
    name: "Mensual",
    price: "55€",
    period: "mes",
    features: ["Acceso ilimitado", "Zona de entrenamiento", "Eventos incluidos"],
    highlighted: true,
  },
  {
    name: "ANUAL",
    price: "600€",
    period: "12 meses",
    features: ["Acceso ilimitado", "Zona de entrenamiento", "Eventos incluidos", "Mejor precio"],
    highlighted: false,
  },
];

const PricingSection = ({ isFloating }: PricingSectionProps) => {
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
    <section id="precios" className="py-32 px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <h2 className={`reveal font-mono text-3xl md:text-5xl font-bold text-foreground mb-4 text-center gravity-layer-text ${f}`}>
          Precios
        </h2>
        <p className="reveal text-muted-foreground text-center mb-20">
          Con dineros, caramelos.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-6">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              className={`reveal gravity-layer-card ${f}`}
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              <div
                className={`relative w-64 h-64 md:w-72 md:h-72 rounded-full border-2 flex flex-col items-center justify-center text-center p-8 transition-all duration-500 hover:scale-105 ${
                  plan.highlighted
                    ? "border-primary bg-primary/5 shadow-[0_0_40px_-10px_hsl(338,100%,62%,0.3)]"
                    : "border-border bg-card hover:border-foreground/20"
                }`}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 font-mono text-[10px] bg-primary text-primary-foreground px-3 py-1 rounded-full tracking-wider uppercase">
                    Popular
                  </span>
                )}
                <h3 className="font-mono text-sm font-bold text-muted-foreground mb-1 tracking-wider uppercase">
                  {plan.name}
                </h3>
                <div className="mb-3">
                  <span className="font-mono text-3xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground text-xs"> / {plan.period}</span>
                </div>
                <ul className="space-y-1 mb-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Check size={10} className="text-primary flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href="#"
                  className={`font-mono text-xs px-5 py-2 rounded-full transition-colors ${
                    plan.highlighted
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "border border-border text-foreground hover:border-foreground/40"
                  }`}
                >
                  Elegir
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
