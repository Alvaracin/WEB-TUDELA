import { useState, useEffect, useCallback } from "react";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  isFloating: boolean;
}

const links = [
  { label: "Escalar", href: "#experiencia" },
  { label: "Precios", href: "#precios" },
  { label: "Qué pasa", href: "#comunidad" },
  { label: "Ven", href: "#contacto" },
];

const Navbar = ({ isFloating }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      // Determine active section
      const sections = links.map((l) => l.href.slice(1));
      let current = "";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) current = `#${id}`;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = useCallback((href: string) => {
    setMenuOpen(false);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 gravity-layer-nav ${isFloating ? "floating" : ""} ${
          scrolled ? "bg-background/95 backdrop-blur-md border-b border-border" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" className="font-mono text-xl font-bold tracking-tighter text-foreground">
            ZER0 G
          </a>

          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`relative font-mono text-sm transition-colors ${
                  activeSection === link.href
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
                {activeSection === link.href && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full transition-all" />
                )}
              </a>
            ))}
            <a
              href="#precios"
              className="font-mono text-sm px-5 py-2 bg-primary text-primary-foreground rounded-sm hover:bg-primary/90 transition-colors"
            >
              Hazte socio
            </a>
          </div>

          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden text-foreground"
            aria-label="Abrir menú"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center gap-8">
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-6 right-6 text-foreground"
            aria-label="Cerrar menú"
          >
            <X size={28} />
          </button>
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => handleClick(link.href)}
              className="font-mono text-2xl text-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#precios"
            onClick={() => handleClick("#precios")}
            className="font-mono text-lg px-8 py-3 bg-primary text-primary-foreground rounded-sm"
          >
            Hazte socio
          </a>
        </div>
      )}
    </>
  );
};

export default Navbar;
