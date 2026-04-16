import { useEffect, useRef } from "react";

interface GallerySectionProps {
  isFloating: boolean;
}

const images = [
  { aspect: "aspect-[4/5]", span: "", overlay: "Esto es real." },
  { aspect: "aspect-square", span: "", overlay: null },
  { aspect: "aspect-[3/4]", span: "md:col-span-1 md:row-span-2", overlay: "Menuda pasada escalar." },
  { aspect: "aspect-[5/4]", span: "md:col-span-2", overlay: null },
  { aspect: "aspect-square", span: "", overlay: "Luego no sales." },
  { aspect: "aspect-[4/3]", span: "", overlay: null },
];

const GallerySection = ({ isFloating }: GallerySectionProps) => {
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
      { threshold: 0.05 }
    );
    children.forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, []);

  const f = isFloating ? "floating" : "";

  return (
    <section className="py-32 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {images.map((img, i) => (
            <div
              key={i}
              className={`reveal ${img.span} ${img.aspect} bg-muted rounded-sm overflow-hidden relative group cursor-pointer gravity-layer-image ${f}`}
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/60" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-mono text-xs text-muted-foreground/50">IMG</span>
              </div>
              {/* Neon overlay */}
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-500 mix-blend-multiply" />
              {/* Hover text overlay */}
              {img.overlay && (
                <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="font-mono text-xs text-foreground/80 tracking-wider uppercase">
                    {img.overlay}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
