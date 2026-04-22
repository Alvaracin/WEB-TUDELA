import { useEffect, useRef } from "react";
import campus from "@/assets/gallery/campus.png";
import dedos from "@/assets/gallery/dedos.png";
import magnesio from "@/assets/gallery/magnesio.png";
import masmagnesio from "@/assets/gallery/masmagnesio.png";
import metepie from "@/assets/gallery/metepie.png";
import paredes from "@/assets/gallery/paredes.png";
import pies from "@/assets/gallery/pies.png";
import pies2 from "@/assets/gallery/pies2.png";
import sudor from "@/assets/gallery/sudor.png";

interface GallerySectionProps {
  isFloating: boolean;
}

const images = [
  { src: campus, alt: "Campus", aspect: "aspect-[4/5]", span: "", overlay: "Esto es real." },
  { src: dedos, alt: "Dedos", aspect: "aspect-square", span: "", overlay: null },
  { src: paredes, alt: "Paredes", aspect: "aspect-[3/4]", span: "md:col-span-1 md:row-span-2", overlay: "Menuda pasada escalar." },
  { src: magnesio, alt: "Magnesio", aspect: "aspect-[5/4]", span: "md:col-span-2", overlay: null },
  { src: pies, alt: "Pies", aspect: "aspect-square", span: "", overlay: "Luego no sales." },
  { src: metepie, alt: "Mete pie", aspect: "aspect-[4/3]", span: "", overlay: null },
  { src: sudor, alt: "Sudor", aspect: "aspect-[4/3]", span: "", overlay: null },
  { src: pies2, alt: "Pies", aspect: "aspect-square", span: "", overlay: null },
  { src: masmagnesio, alt: "Más magnesio", aspect: "aspect-[4/3]", span: "md:col-span-2", overlay: null },
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
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {/* Black 8% overlay that disappears on hover */}
              <div className="absolute inset-0 bg-black/[0.08] group-hover:bg-black/0 transition-colors duration-500 pointer-events-none" />
              {/* Hover text overlay */}
              {img.overlay && (
                <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <span className="font-mono text-xs text-foreground/90 tracking-wider uppercase drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
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
