'use client'

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {useRouter} from "next/navigation";
import Link from "next/link";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = router.pathname === "/";

  const scrollToSection = (id: string) => {
    if (!isHome) {
      window.location.href = `/#${id}`;
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container-wide flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-background">
              <rect x="5" y="2" width="14" height="20" rx="3" />
              <line x1="12" y1="18" x2="12" y2="18.01" strokeLinecap="round" />
            </svg>
          </div>
          <span className="font-bold text-lg text-foreground">mobilnamiru</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <button onClick={() => scrollToSection("jak-to-funguje")} className="text-muted-foreground hover:text-foreground transition-colors text-sm">
            Jak to funguje
          </button>
          <button onClick={() => scrollToSection("co-nastavujeme")} className="text-muted-foreground hover:text-foreground transition-colors text-sm">
            Co nastavujeme
          </button>
          <button onClick={() => scrollToSection("balicky")} className="text-muted-foreground hover:text-foreground transition-colors text-sm">
            Balíčky
          </button>
          <button onClick={() => scrollToSection("faq")} className="text-muted-foreground hover:text-foreground transition-colors text-sm">
            FAQ
          </button>
          <Link href="/audit">
            <Button size="sm">
              Audit zdarma
            </Button>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {isMobileMenuOpen ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <nav className="md:hidden glass mt-2 mx-4 rounded-xl p-4 flex flex-col gap-4">
          <button onClick={() => scrollToSection("jak-to-funguje")} className="text-muted-foreground hover:text-foreground transition-colors text-left py-2">
            Jak to funguje
          </button>
          <button onClick={() => scrollToSection("co-nastavujeme")} className="text-muted-foreground hover:text-foreground transition-colors text-left py-2">
            Co nastavujeme
          </button>
          <button onClick={() => scrollToSection("balicky")} className="text-muted-foreground hover:text-foreground transition-colors text-left py-2">
            Balíčky
          </button>
          <button onClick={() => scrollToSection("faq")} className="text-muted-foreground hover:text-foreground transition-colors text-left py-2">
            FAQ
          </button>
          <Link href="/audit" onClick={() => setIsMobileMenuOpen(false)}>
            <Button className="w-full">
              Audit zdarma
            </Button>
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
