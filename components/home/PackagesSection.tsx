'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckIcon, ClockIcon, ArrowRightIcon } from "@/components/icons/Icons";
import { ChevronDown } from "lucide-react";

const packages = [
  {
    name: "Basic",
    tagline: "Pro ty, co chtějí začít",
    forWho: "Jednotlivec, jeden telefon",
    price: "990 Kč",
    results: [
      "Notifikace pod kontrolou",
      "Focus režimy nastavené",
      "Zálohy zkontrolované",
      "Základní bezpečnost",
    ],
    time: "20 min",
    highlight: false,
    details: {
      included: [
        "Audit aktuálního nastavení",
        "Nastavení 2 Focus režimů",
        "Konfigurace notifikací",
        "Kontrola a nastavení záloh",
        "Základní bezpečnostní audit",
        "Shrnutí a doporučení na závěr",
      ],
      process: "Celá konzultace probíhá online přes sdílení obrazovky. Ty ovládáš telefon, já naviguju.",
      ideal: "Ideální pro ty, kdo chtějí rychle začít a mají jasno v tom, co potřebují.",
    },
  },
  {
    name: "Pro",
    tagline: "Nejoblíbenější volba",
    forWho: "Pro náročné uživatele",
    price: "2 990 Kč",
    results: [
      "Vše z Basic +",
      "Automatizace a zkratky",
      "Workflow optimalizace",
      "Screen Time nastavení",
      "Follow-up check za 2 týdny",
    ],
    time: "60 min + follow-up",
    format: "online",
    highlight: true,
    details: {
      included: [
        "Kompletní audit a nastavení z Basic",
        "Vytvoření osobních automatizací a Zkratek",
        "Optimalizace domovské obrazovky a widgetů",
        "Nastavení Screen Time a limitů",
        "Organizace fotek a úložiště",
        "Bezpečnostní hardening (hesla, 2FA)",
        "Follow-up konzultace za 2 týdny (30 min)",
        "Email podpora po dobu 1 měsíce",
      ],
      process: "Hloubková konzultace + follow-up, abychom zkontrolovali, jak ti nové nastavení funguje v praxi.",
      ideal: "Pro ty, kdo chtějí komplexní přeměnu telefonu na nástroj produktivity.",
    },
  },
];

const PackagesSection = () => {
  const [expandedPackage, setExpandedPackage] = useState<string | null>(null);

  const handleCtaClick = (packageName: string) => {
    if (typeof window !== "undefined" && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: "cta_click",
        cta_name: `booking_${packageName.toLowerCase()}`,
        cta_location: "packages",
      });
    }
  };

  const togglePackage = (name: string) => {
    setExpandedPackage(expandedPackage === name ? null : name);
  };

  return (
    <section id="balicky" className="section-padding bg-card/30">
      <div className="container-wide">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Vyber si <span className="gradient-text">balíček</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Každý balíček zahrnuje osobní konzultaci a nastavení na míru. Klikni pro detaily.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-3xl mx-auto">
          {packages.map((pkg) => {
            const isExpanded = expandedPackage === pkg.name;
            return (
              <div
                key={pkg.name}
                className={`relative rounded-2xl p-6 lg:p-8 transition-all duration-300 ${
                  pkg.highlight
                    ? "gradient-border glass bg-card"
                    : "glass hover:border-primary/30"
                }`}
              >
                {pkg.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-primary to-secondary text-primary-foreground text-xs font-semibold px-4 py-1 rounded-full">
                      Nejoblíbenější
                    </span>
                  </div>
                )}

                <div 
                  className="cursor-pointer"
                  onClick={() => togglePackage(pkg.name)}
                >
                  <div className="mb-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold text-foreground mb-1">{pkg.name}</h3>
                      <ChevronDown 
                        className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                    <p className="text-muted-foreground text-sm">{pkg.tagline}</p>
                  </div>

                  <div className="mb-6 pb-6 border-b border-border">
                    <p className="text-sm text-secondary font-medium">{pkg.forWho}</p>
                    <p className="text-3xl font-bold text-foreground mt-3">{pkg.price}</p>
                    {pkg.format && (
                      <span className="text-xs text-muted-foreground">{pkg.format}</span>
                    )}
                  </div>

                  <ul className="space-y-3 mb-4">
                    {pkg.results.map((result) => (
                      <li key={result} className="flex items-start gap-3 text-sm">
                        <CheckIcon className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{result}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
                    <ClockIcon className="w-4 h-4" />
                    <span>{pkg.time}</span>
                  </div>

                  {!isExpanded && (
                    <p className="text-xs text-primary text-center mb-4 flex items-center justify-center gap-1">
                      <ChevronDown className="w-3 h-3 animate-bounce" />
                      Klikni pro kompletní výčet
                    </p>
                  )}
                </div>

                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-border animate-fade-in">
                    <h4 className="text-sm font-semibold text-foreground mb-3">Co přesně dostaneš:</h4>
                    <ul className="space-y-2 mb-4">
                      {pkg.details.included.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckIcon className="w-3 h-3 text-primary flex-shrink-0 mt-1" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <div className="glass rounded-xl p-4 mb-4">
                      <p className="text-sm text-muted-foreground">
                        <span className="text-secondary font-semibold">Proces: </span>
                        {pkg.details.process}
                      </p>
                    </div>

                    <p className="text-xs text-muted-foreground italic mb-4">
                      {pkg.details.ideal}
                    </p>
                  </div>
                )}

                <Button
                  variant={pkg.highlight ? "default" : "outline"}
                  className={`w-full ${pkg.highlight ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/20" : ""}`}
                  onClick={() => handleCtaClick(pkg.name)}
                >
                  Rezervovat {pkg.name}
                  <ArrowRightIcon className="w-4 h-4" />
                </Button>
              </div>
            );
          })}
        </div>

        {/* Guarantee */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground text-sm inline-flex items-center gap-2 glass px-6 py-3 rounded-full">
            <CheckIcon className="w-4 h-4 text-success" />
            Garance: Když ti to nepřinese jasné zlepšení, řekneme ti to narovinu.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;
