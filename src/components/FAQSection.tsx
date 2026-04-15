import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQSectionProps {
  isFloating: boolean;
}

const faqs = [
  {
    q: "¿Me voy a caer?",
    a: "Sí. Y te va a encantar.",
  },
  {
    q: "¿Necesito experiencia previa?",
    a: "Cero. Nada. Nula. Vienes, te explicamos, venga p'arriba.",
  },
  {
    q: "¿Qué necesito llevar?",
    a: "Ropa cómoda. Los pies de gato los puedes alquilar aquí. El magnesio también.",
  },
  {
    q: "¿Qué es boulder?",
    a: "Escalada sin cuerdas sobre colchonetas. Bloques cortos, intensos, y adictivos. La pared no pasa de 4,5 metros.",
  },
  {
    q: "¿Hay clases?",
    a: "Sí. Para empezar, para mejorar, y para los que creen que ya no pueden mejorar.",
  },
  {
    q: "¿Puedo ir con niños?",
    a: "​¡Claro! Pero ten en cuenta que van a escalar mejor que tú.",
  },
];

const FAQSection = ({ isFloating }: FAQSectionProps) => {
  const f = isFloating ? "floating" : "";

  return (
    <section className="py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className={`font-mono text-3xl md:text-4xl font-bold text-foreground mb-16 text-center gravity-layer-text ${f}`}>
          Preguntas frecuentes
        </h2>

        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className={`border border-border rounded-sm px-6 gravity-layer-card ${f}`}
            >
              <AccordionTrigger className="font-mono text-sm md:text-base text-foreground hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
