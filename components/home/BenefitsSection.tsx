"use client";

import { useState } from "react";
import { CheckIcon } from "@/components/icons/Icons";
import { ChevronDown, Clock, TrendingUp, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const benefits = [
  {
    title: "Méně rušení, víc soustředění",
    description:
      "Notifikace budou chodit jen od toho, co je opravdu důležité. Zbytek počká.",
    details: {
      timeSaved: "45-90 min/den",
      howItWorks: [
        "Nastavíme prioritní kontakty a aplikace",
        "Focus režimy podle denní doby a aktivity",
        "Skupinové notifikace místo každé zvlášť",
        "Tichý režim pro sociální sítě",
      ],
      impact:
        "Průměrný člověk zkontroluje telefon 96× denně. S Focus režimy to klesne na 20-30×.",
    },
  },
  {
    title: "Jistota, že máš zálohy",
    description:
      "Fotky, kontakty, zprávy – vše bezpečně zálohované. Bez stresu, že něco ztratíš.",
    details: {
      timeSaved: "∞ (nevyčíslitelné)",
      howItWorks: [
        "Automatická záloha do iCloud/Google",
        "Kontrola, že záloha opravdu běží",
        "Nastavení optimalizace úložiště",
        "Záloha WhatsApp a dalších chatů",
      ],
      impact:
        "80% lidí nikdy nekontrolovalo, jestli jim záloha funguje. Zjistí to až když je pozdě.",
    },
  },
  {
    title: "Bezpečí pro celou rodinu",
    description:
      "Ochrana účtů, rodičovská kontrola, sdílení polohy s blízkými – klidnější spánek.",
    details: {
      timeSaved: "Klid mysli 24/7",
      howItWorks: [
        "Dvoufaktorové ověření na všech účtech",
        "Screen Time limity pro děti",
        "Sdílení polohy s partnerem/rodinou",
        "Kontrola bezpečnosti hesel",
      ],
      impact:
        "43% lidí používá stejné heslo všude. Jeden únik = přístup ke všemu.",
    },
  },
  {
    title: "Čas navíc každý den",
    description:
      "Automatizace a zkratky udělají rutinní úkoly za tebe. Ty máš čas na důležité věci.",
    details: {
      timeSaved: "30-60 min/den",
      howItWorks: [
        "Zkratky pro opakující se úkony",
        "Automatické akce podle času/místa",
        "Rychlé přepínání mezi režimy",
        "Hlasové ovládání pro běžné úkoly",
      ],
      impact:
        "5 kliknutí denně × 365 dní = 1825 zbytečných kliknutí ročně. Automatizace to dělá za tebe.",
    },
  },
  {
    title: "Telefon jako nástroj, ne závislost",
    description:
      "Screen Time a Focus režimy nastavené tak, abys telefon používal/a vědomě.",
    details: {
      timeSaved: "2-4 hodiny/den",
      howItWorks: [
        "Limity pro návykové aplikace",
        "Downtime před spaním",
        "Černobílý režim večer",
        "Blokování nekonečného scrollování",
      ],
      impact:
        "Průměrný Čech tráví na telefonu 4,5 hodiny denně. 70% z toho je zbytečné scrollování.",
    },
  },
  {
    title: "Know-how, které ti zůstane",
    description:
      "Nejenom nastavíme – vysvětlíme proč a jak. Příště si poradíš sám/sama.",
    details: {
      timeSaved: "Navždy",
      howItWorks: [
        "Vysvětlení každého nastavení",
        "Tipy jak udržet nastavení aktuální",
        "Návod co dělat při nové verzi iOS",
        "Podpora emailem po konzultaci",
      ],
      impact: "Telefon měníš každé 2-3 roky. Know-how využiješ desetiletí.",
    },
  },
];

const BenefitsSection = () => {
  const [expandedBenefit, setExpandedBenefit] = useState<string | null>(null);

  const toggleBenefit = (title: string) => {
    setExpandedBenefit(expandedBenefit === title ? null : title);
  };

  return (
    <section className="section-padding bg-card/30">
      <div className="container-wide">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Co <span className="gradient-text">získáš</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Nejde o technické nastavení. Jde o výsledek – klid, čas a jistotu.
          </p>
          <p className="text-sm text-muted-foreground/70 mt-2">
            Klikni pro detaily a kolik času ušetříš
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit) => {
            const isExpanded = expandedBenefit === benefit.title;

            return (
              <div
                key={benefit.title}
                onClick={() => toggleBenefit(benefit.title)}
                className={cn(
                  "glass rounded-2xl p-6 transition-all duration-300 cursor-pointer group",
                  "hover:border-primary/30",
                  isExpanded && "border-primary/50 shadow-lg shadow-primary/10",
                )}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-success/20 flex items-center justify-center group-hover:bg-success/30 transition-colors">
                    <CheckIcon className="w-5 h-5 text-success" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {benefit.description}
                    </p>
                  </div>
                </div>

                {/* Expand indicator */}
                <div className="flex items-center justify-center mt-4">
                  <ChevronDown
                    className={cn(
                      "w-5 h-5 text-muted-foreground transition-transform duration-300",
                      isExpanded && "rotate-180",
                    )}
                  />
                </div>

                {/* Expanded details */}
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-500",
                    isExpanded
                      ? "max-h-[500px] opacity-100 mt-4"
                      : "max-h-0 opacity-0",
                  )}
                >
                  <div className="border-t border-border/50 pt-4 space-y-4">
                    {/* Time saved badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                      <Clock className="w-4 h-4" />
                      Úspora: {benefit.details.timeSaved}
                    </div>

                    {/* How it works */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-primary" />
                        Jak to uděláme:
                      </h4>
                      <ul className="space-y-1.5">
                        {benefit.details.howItWorks.map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <CheckIcon className="w-4 h-4 text-success shrink-0 mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Impact stat */}
                    <div className="rounded-xl bg-success/5 border border-success/20 p-3">
                      <div className="flex items-start gap-2">
                        <TrendingUp className="w-4 h-4 text-success shrink-0 mt-0.5" />
                        <p className="text-xs text-muted-foreground">
                          {benefit.details.impact}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
