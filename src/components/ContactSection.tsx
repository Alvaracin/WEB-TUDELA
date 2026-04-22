import { MapPin, Instagram, Mail } from "lucide-react";

interface ContactSectionProps {
  isFloating: boolean;
}

const ContactSection = ({ isFloating }: ContactSectionProps) => {
  const f = isFloating ? "floating" : "";

  return (
    <section id="contacto" className="section-accent-cyan py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className={`font-mono text-5xl font-bold text-foreground mb-16 text-center gravity-layer-text terminal-cursor ${f}`}>
          Visítanos
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Info */}
          <div className="space-y-8">
            <div className={`flex items-start gap-4 gravity-layer-card ${f}`}>
              <MapPin size={20} className="text-primary flex-shrink-0 mt-1" />
              <div>
                <p className="font-mono text-sm font-bold text-foreground">Dirección</p>
                <p className="text-sm text-muted-foreground">
                  Tudela, Navarra
                  <br />
                  <span className="text-muted-foreground/60">(pol. Las Labradas)</span>
                </p>
              </div>
            </div>

            <div className={`flex items-start gap-4 gravity-layer-card ${f}`}>
              <Mail size={20} className="text-primary flex-shrink-0 mt-1" />
              <div>
                <p className="font-mono text-sm font-bold text-foreground">Contacto</p>
                <p className="text-sm text-muted-foreground">aupa@zerogescalada.com</p>
              </div>
            </div>

            <div className={`flex items-start gap-4 gravity-layer-card ${f}`}>
              <Instagram size={20} className="text-primary flex-shrink-0 mt-1" />
              <div>
                <p className="font-mono text-sm font-bold text-foreground">Instagram</p>
                <a href="https://www.instagram.com/zerogescalada/" className="text-sm text-primary hover:text-primary/80 transition-colors">
                  @zerogescalada
                </a>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className={`relative aspect-square rounded-sm overflow-hidden border border-border gravity-layer-image ${f}`}>
            <iframe
              title="ZER0 G — Tudela"
              src="https://www.google.com/maps?q=Pol%C3%ADgono+Las+Labradas+Tudela+Navarra&hl=es&z=16&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full grayscale contrast-125 brightness-[0.55] invert-[0.92] hue-rotate-180 saturate-[0.4]"
              style={{ border: 0 }}
              allowFullScreen
            />
            {/* Tint overlay to blend with brand bg */}
            <div className="pointer-events-none absolute inset-0 bg-background/20 mix-blend-multiply" />
            {/* Custom marker */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 -m-3 rounded-full bg-primary/30 blur-md animate-pulse" />
                <div className="relative w-4 h-4 rounded-full bg-primary shadow-[0_0_20px_hsl(var(--primary))] ring-2 ring-background" />
              </div>
            </div>
            {/* Open in maps */}
            <a
              href="https://maps.app.goo.gl/vvVfkxHHtxwwxUvf8"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-3 right-3 font-mono text-[10px] uppercase tracking-widest bg-background/80 backdrop-blur px-3 py-1.5 rounded-sm text-foreground hover:text-primary transition-colors"
            >
              Abrir en Maps ↗
            </a>
          </div>
        </div>

        {/* Reviews placeholder */}
        <div className={`mt-20 p-8 border border-border rounded-sm text-center gravity-layer-card ${f}`}>
          <p className="font-mono text-sm text-muted-foreground/60">
            Reseñas de Google · Próximamente
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
