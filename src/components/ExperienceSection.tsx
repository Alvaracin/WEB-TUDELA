import { useEffect, useRef } from "react";
import { Mountain, Dumbbell, Users, Calendar } from "lucide-react";

interface ExperienceSectionProps {
  isFloating: boolean;
}

const experiences = [
  {
    icon: Mountain,
    title: "Boulder",
    desc: "Bloques para todos los niveles. Rotación semanal.\nSin cuerdas, sin excusas.",
  },
  {
    icon: Dumbbell,
    title: "Entrenamiento",
    desc: "Top 3 zonas de entrenamiento en Europa:\nCampus, hangboard, Moonboard a 40º, ¡quizá hasta mancuernas!",
  },
  {
    icon: Users,
    title: "Comunidad",
    desc: "Gente que escala, gente que empieza, gente que repite.\nAquí cabemos todxs.",
  },
  {
    icon: Calendar,
    title: "Eventos",
    desc: "Competiciones, quedadas, noches de boulder...\nSiempre pasa algo.",
  },
];

const ExperienceSection = ({ isFloating }: ExperienceSectionProps) => {
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
    <section id="experiencia" className="py-32 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <h2 className={`reveal font-mono text-5xl font-bold text-foreground mb-6 text-center gravity-layer-text ${f}`}>
          Qué vas a encontrar
        </h2>
        <p className={`reveal text-muted-foreground text-center mb-20 gravity-layer-text ${f}`}>
          {"\u200B"}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {experiences.map((exp, i) => (
            <div
              key={exp.title}
              className={`reveal p-8 border border-border rounded-sm bg-card hover:border-primary/30 transition-all duration-500 group gravity-layer-card ${f}`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <exp.icon
                size={32}
                className="text-primary mb-4 group-hover:text-primary transition-colors"
              />
              <h3 className="font-mono text-xl font-bold text-foreground mb-2">
                {exp.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
                {exp.desc}
              </p>
            </div>
          ))}
        </div>

        <p className={`reveal font-mono text-center text-foreground mt-16 text-3xl gravity-layer-text ${f} uppercase`}>
          Bloques nuevos cada semana.
        </p>
        <p className={`reveal font-mono text-center text-primary mt-4 text-3xl gravity-layer-text ${f} font-semibold`}>
          Si te los sabes todos, tenemos un problema.
        </p>
        <p className={`reveal font-mono text-center text-foreground mt-10 text-3xl gravity-layer-text ${f} uppercase`}>
          Si es fácil, está mal puesto.
        </p>
      </div>
    </section>
  );
};

export default ExperienceSection;
