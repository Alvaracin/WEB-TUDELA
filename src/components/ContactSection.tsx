import { MapPin, Instagram, Mail } from "lucide-react";

interface ContactSectionProps {
  isFloating: boolean;
}

const ContactSection = ({ isFloating }: ContactSectionProps) => {
  const f = isFloating ? "floating" : "";

  return (
    <section id="contacto" className="section-accent-cyan py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className={`font-mono text-5xl font-bold text-foreground mb-16 text-center gravity-layer-text ${f}`}>
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

          {/* Map placeholder */}
          <div className={`aspect-square bg-muted rounded-sm flex items-center justify-center gravity-layer-image ${f}`}>
            <span className="font-mono text-xs text-muted-foreground/50">Google Maps</span>
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
