import { useEffect, useRef } from "react";
import { Check } from "lucide-react";

interface PricingSectionProps {
  isFloating: boolean;
}

const plans = [
  {
    name: "Sesión",
    price: "XX €",
    period: "día",
    features: ["Acceso al rocódromo", "Material no incluido"],
    highlighted: false,
  },
  {
    name: "Mensual",
    price: "XX €",
    period: "mes",
    features: ["Acceso ilimitado", "Zona de entrenamiento", "Eventos incluidos"],
    highlighted: true,
  },
  {
    name: "Trimestral",
    price: "XX €",
    period: "3 meses",
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
        <p className="reveal text-muted-foreground text-center mb-16">
          Sin permanencia. Sin letra pequeña. Sin sorpresas.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              className={`reveal p-8 rounded-sm border transition-all duration-500 gravity-layer-card ${f} ${
                plan.highlighted
                  ? "border-primary bg-primary/5 relative"
                  : "border-border bg-card"
              }`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 font-mono text-xs bg-primary text-primary-foreground px-3 py-1 rounded-sm">
                  Popular
                </span>
              )}
              <h3 className="font-mono text-lg font-bold text-foreground mb-2">{plan.name}</h3>
              <div className="mb-6">
                <span className="font-mono text-4xl font-bold text-foreground">{plan.price}</span>
                <span className="text-muted-foreground text-sm"> / {plan.period}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check size={14} className="text-primary flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className={`block text-center font-mono text-sm py-3 rounded-sm transition-colors ${
                  plan.highlighted
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border border-border text-foreground hover:border-foreground/40"
                }`}
              >
                Elegir plan
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
