"use client";

import { useState } from "react";
import { ChevronDown, Clock, CheckCircle2, Euro, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    number: "01",
    title: "Vyplníš audit",
    description:
      "5 minut dotazník o tom, jak telefon používáš, co tě ruší a co bys chtěl/a zlepšit.",
    accent: "primary",
    details: {
      duration: "5 minut",
      price: "Zdarma",
      process: [
        "30 otázek o tvém používání telefonu",
        "Zjistíme tvé návyky, bolesti a cíle",
        "Dotazník funguje na počítači i mobilu",
        "Odpovědi jsou důvěrné a bezpečně uložené",
      ],
      outcome:
        "Na základě odpovědí připravíme personalizovaný mini-report s 3 rychlými tipy.",
    },
  },
  {
    number: "02",
    title: "Dostaneš report",
    description:
      "Na mail ti přijde konkrétní checklist s návrhy změn a vysvětlením, proč dávají smysl.",
    accent: "secondary",
    details: {
      duration: "Do 24 hodin",
      price: "Zdarma (mini) / 299 Kč (kompletní)",
      process: [
        "Mini-report: 3 rychlé změny do 10 minut",
        "Kompletní report: 10-15 detailních tipů",
        "Vysvětlení proč a jak každou změnu udělat",
        "Prioritizované podle dopadu na tvůj život",
      ],
      outcome: "Konkrétní kroky, které můžeš hned začít aplikovat.",
    },
  },
  {
    number: "03",
    title: "Nastavíme to společně",
    description:
      "Během online hovoru projdeme telefon a vše nastavíme. Ty se díváš, ptáš a učíš se.",
    accent: "success",
    details: {
      duration: "60-90 minut",
      price: "Od 990 Kč",
      process: [
        "Online hovor přes Google Meet / Zoom",
        "Sdílíš obrazovku, já ti ukazuji co a jak",
        "Nastavíme Focus režimy, notifikace, zálohy",
        "Vysvětlím každý krok, abys pochopil/a proč",
        "Prostor pro tvé otázky a přání",
      ],
      outcome:
        "Telefon nastavený přesně podle tvých potřeb + know-how jak to udržet.",
    },
  },
];

const HowItWorksSection = () => {
  const [expandedStep, setExpandedStep] = useState<string | null>(null);

  const toggleStep = (stepNumber: string) => {
    setExpandedStep(expandedStep === stepNumber ? null : stepNumber);
  };

  return (
    <section id="jak-to-funguje" className="section-padding">
      <div className="container-narrow">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Jak to <span className="gradient-text">funguje</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Tři jednoduché kroky k telefonu, který ti slouží místo toho, aby tě
            rušil.
          </p>
          <p className="text-sm text-muted-foreground/70 mt-2">
            Klikni na kartu pro detaily a transparentní ceny
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {steps.map((step, index) => {
            const isExpanded = expandedStep === step.number;

            return (
              <div
                key={step.number}
                className="relative group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Connection line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-[2px] bg-gradient-to-r from-border to-transparent z-0" />
                )}

                <div
                  onClick={() => toggleStep(step.number)}
                  className={cn(
                    "glass rounded-2xl p-6 md:p-8 relative z-10 transition-all duration-300 cursor-pointer",
                    "hover:border-primary/30",
                    isExpanded &&
                      "border-primary/50 shadow-lg shadow-primary/10",
                  )}
                >
                  {/* Number */}
                  <div
                    className={cn(
                      "inline-flex items-center justify-center w-12 h-12 rounded-xl mb-6",
                      step.accent === "primary" && "bg-primary/20 text-primary",
                      step.accent === "secondary" &&
                        "bg-secondary/20 text-secondary",
                      step.accent === "success" && "bg-success/20 text-success",
                    )}
                  >
                    <span className="font-bold text-lg text-primary">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground">{step.description}</p>

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
                        ? "max-h-[600px] opacity-100 mt-6"
                        : "max-h-0 opacity-0",
                    )}
                  >
                    <div className="border-t border-border/50 pt-6 space-y-4">
                      {/* Duration & Price badges */}
                      <div className="flex flex-wrap gap-2">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm">
                          <Clock className="w-3.5 h-3.5" />
                          {step.details.duration}
                        </div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-success/10 text-success text-sm">
                          <Euro className="w-3.5 h-3.5" />
                          {step.details.price}
                        </div>
                      </div>

                      {/* Process steps */}
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
                          <Zap className="w-4 h-4 text-primary" />
                          Co se stane:
                        </h4>
                        <ul className="space-y-2">
                          {step.details.process.map((item, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-sm text-muted-foreground"
                            >
                              <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Outcome */}
                      <div className="rounded-xl bg-primary/5 border border-primary/20 p-4">
                        <p className="text-sm text-foreground">
                          <span className="font-medium">Výsledek: </span>
                          {step.details.outcome}
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

export default HowItWorksSection;
