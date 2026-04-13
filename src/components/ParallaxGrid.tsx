import { useEffect, useRef } from "react";

interface ParallaxGridProps {
  isFloating: boolean;
}

const ParallaxGrid = ({ isFloating }: ParallaxGridProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const scrollRef = useRef(0);
  const rafRef = useRef<number>();

  useEffect(() => {
    const update = () => {
      if (ref.current) {
        const floatOffset = isFloating ? -15 : 0;
        ref.current.style.transform = `translateY(${-scrollRef.current * 0.03 + floatOffset}px) rotate(8deg)`;
      }
    };

    const onScroll = () => {
      scrollRef.current = window.scrollY;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };

    // Initial + floating changes
    scrollRef.current = window.scrollY;
    update();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isFloating]);

  return (
    <div
      ref={ref}
      className={`fixed inset-0 z-[1] pointer-events-none dotted-grid opacity-30 ${isFloating ? "transition-transform duration-[1s]" : ""}`}
      style={{
        transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        transformOrigin: "center center",
        width: "140%",
        height: "140%",
        top: "-20%",
        left: "-20%",
      }}
    />
  );
};

export default ParallaxGrid;
