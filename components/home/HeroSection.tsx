'use client'

import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@/components/icons/Icons";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
const benefits = [{
  text: "Notifikace zkroceny",
  color: "text-success"
}, {
  text: "Zálohy aktivní",
  color: "text-secondary"
}, {
  text: "Focus režim",
  color: "text-primary"
}, {
  text: "Hesla v bezpečí",
  color: "text-success"
}, {
  text: "Automatizace běží",
  color: "text-secondary"
}, {
  text: "Obrazovka čistá",
  color: "text-primary"
}, {
  text: "Čas pod kontrolou",
  color: "text-success"
}, {
  text: "Soukromí chráněno",
  color: "text-secondary"
}];
const HeroSection = () => {
  const phoneRef = useRef<HTMLDivElement>(null);
  const [visibleBenefits, setVisibleBenefits] = useState([0, 1, 2]);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, {
      threshold: 0.3
    });
    if (phoneRef.current) {
      observer.observe(phoneRef.current);
    }
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleBenefits(prev => {
        const next = prev.map(i => (i + 1) % benefits.length);
        return next;
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);
  const handleCtaClick = (ctaName: string) => {
    if (typeof window !== "undefined" && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: "cta_click",
        cta_name: ctaName,
        cta_location: "hero"
      });
    }
  };
  return <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px]" />
      </div>

      <div className="container-wide relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          

          {/* H1 */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-in" style={{
          animationDelay: "0.1s"
        }}>
            Tvůj telefon může být{" "}
            <span className="gradient-text">tvůj kokot</span>,{" "}
            ne zdroj stresu
          </h1>

          {/* Subhead */}
          <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-in" style={{
          animationDelay: "0.2s"
        }}>
            Nastavíme ti notifikace, režimy, bezpečnost a workflow přesně na míru. 
            Získáš zpět klid, čas a jistotu, že máš vše pod kontrolou.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 animate-fade-in" style={{
          animationDelay: "0.3s"
        }}>
            <Link href="/audit" onClick={() => handleCtaClick("audit_hero")}>
              <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-secondary to-secondary/80 text-background hover:from-secondary/90 hover:to-secondary/70 shadow-lg shadow-secondary/20 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-secondary/30">
                Chci mobil na míru
                <ArrowRightIcon />
              </Button>
            </Link>
            <a href="#balicky" onClick={() => handleCtaClick("booking_hero")}>
              <Button size="lg" className="w-full sm:w-auto bg-card border border-border text-foreground hover:border-primary/50 hover:bg-card/80">
                Rovnou booking
              </Button>
            </a>
          </div>

          {/* Microcopy */}
          <p className="text-sm text-muted-foreground animate-fade-in" style={{
          animationDelay: "0.4s"
        }}>
            Audit zabere 5 minut. Dostaneš konkrétní checklist na míru.
          </p>
        </div>

        {/* Visual Element */}
        <div ref={phoneRef} className={`mt-16 md:mt-24 relative transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}>
          <div className="max-w-lg mx-auto">
            <div className="relative">
              {/* Phone mockup */}
              <div className="glass rounded-[2.5rem] p-3 mx-auto w-64 sm:w-72 shadow-2xl shadow-primary/10">
                <div className="bg-background rounded-[2rem] aspect-[9/19] flex flex-col items-center justify-center p-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4 animate-pulse">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-background">
                      <path d="M9 12l2 2 4-4" />
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                  </div>
                  <p className="text-foreground font-semibold text-center">Nastaveno na míru</p>
                  <p className="text-muted-foreground text-sm text-center mt-1">Focus, klid, bezpečí</p>
                </div>
              </div>
              
              {/* Floating badges - cycling through benefits */}
              <div className="absolute -left-4 sm:-left-16 top-1/4 glass px-4 py-2 rounded-xl transition-all duration-500" style={{
              animation: "float 3s ease-in-out infinite",
              boxShadow: "0 0 20px hsl(var(--success) / 0.3)"
            }}>
                <span className={`${benefits[visibleBenefits[0]].color} text-sm font-medium drop-shadow-sm`}>
                  ✓ {benefits[visibleBenefits[0]].text}
                </span>
              </div>
              <div className="absolute -right-4 sm:-right-16 top-1/2 glass px-4 py-2 rounded-xl transition-all duration-500" style={{
              animation: "float 3s ease-in-out infinite 0.5s",
              boxShadow: "0 0 20px hsl(var(--secondary) / 0.3)"
            }}>
                <span className={`${benefits[visibleBenefits[1]].color} text-sm font-medium drop-shadow-sm`}>
                  ✓ {benefits[visibleBenefits[1]].text}
                </span>
              </div>
              <div className="absolute -left-4 sm:-left-12 bottom-1/4 glass px-4 py-2 rounded-xl transition-all duration-500" style={{
              animation: "float 3s ease-in-out infinite 1s",
              boxShadow: "0 0 20px hsl(var(--primary) / 0.3)"
            }}>
                <span className={`${benefits[visibleBenefits[2]].color} text-sm font-medium drop-shadow-sm`}>
                  ✓ {benefits[visibleBenefits[2]].text}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;