import { useEffect, useState } from "react";

interface ParallaxGridProps {
  isFloating: boolean;
}

const ParallaxGrid = ({ isFloating }: ParallaxGridProps) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const floatOffset = isFloating ? -15 : 0;

  return (
    <div
      className="fixed inset-0 z-[1] pointer-events-none dotted-grid opacity-30 transition-transform duration-[1s]"
      style={{
        transform: `translateY(${-scrollY * 0.03 + floatOffset}px) rotate(8deg)`,
        transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        transitionDelay: isFloating ? "0.4s" : "0.2s",
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
