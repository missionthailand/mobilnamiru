import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-border py-12 md:py-16">
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="text-background"
                >
                  <rect x="5" y="2" width="14" height="20" rx="3" />
                  <line
                    x1="12"
                    y1="18"
                    x2="12"
                    y2="18.01"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <span className="font-bold text-lg text-foreground">
                mobilnamiru
              </span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-sm">
              Nastavíme ti telefon tak, aby pracoval pro tebe. Méně rušení, víc
              klidu, víc času na to, co je důležité.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Služby</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/audit"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  Audit zdarma
                </Link>
              </li>
              <li>
                <a
                  href="#balicky"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  Balíčky
                </a>
              </li>
              <li>
                <a
                  href="#co-nastavujeme"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  Co umíme nastavit
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Kontakt</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:ahoj@mobilnamiru.cz"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  ahoj@mobilnamiru.cz
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/mobilnamiru"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm flex items-center gap-2"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="18" cy="6" r="1" fill="currentColor" />
                  </svg>
                  Instagram
                </a>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  Zásady ochrany soukromí
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} mobilnamiru.cz. Všechna práva
            vyhrazena.
          </p>
          <p className="text-muted-foreground text-xs">
            Vytvořeno s ❤️ pro lidi, co chtějí víc klidu
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
