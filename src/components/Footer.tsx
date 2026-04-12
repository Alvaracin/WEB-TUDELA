const Footer = () => (
  <footer className="border-t border-border py-8 px-6">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      <span className="font-mono text-sm text-muted-foreground">
        © {new Date().getFullYear()} ZER0 G · Tudela, Navarra
      </span>
      <div className="flex gap-6">
        <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
          Aviso legal
        </a>
        <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
          Privacidad
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
