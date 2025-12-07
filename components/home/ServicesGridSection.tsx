'use client'

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  FocusIcon,
  NotificationIcon,
  SecurityIcon,
  BackupIcon,
  PhotoIcon,
  WorkflowIcon,
  AutomationIcon,
  FamilyIcon,
} from "@/components/icons/Icons";

const services = [
  {
    icon: FocusIcon,
    title: "Focus režimy",
    description: "Práce, rodina, spánek – každý režim s vlastním nastavením.",
    details: {
      whatWeDo: [
        "Vytvoření režimů pro práci, odpočinek a spánek",
        "Nastavení automatického přepínání podle času/místa",
        "Konfigurace povolených kontaktů a aplikací",
        "Propojení s domovskou obrazovkou",
      ],
      timeSaved: "45 min denně méně rozptýlení",
      example: "Režim 'Práce' automaticky ztlumí sociální sítě 9-17h",
    },
  },
  {
    icon: NotificationIcon,
    title: "Notifikace",
    description: "Jen důležité. Zbytek ztlumený nebo seskupený.",
    details: {
      whatWeDo: [
        "Audit všech notifikací a jejich prioritizace",
        "Nastavení tichých hodin a seskupování",
        "Konfigurace urgentních kontaktů",
        "Odstranění zbytečných upozornění",
      ],
      timeSaved: "60+ přerušení denně méně",
      example: "Zprávy od rodiny projdou vždy, marketing nikdy",
    },
  },
  {
    icon: SecurityIcon,
    title: "Bezpečnost",
    description: "Silná hesla, 2FA, Face ID, ochrana účtů.",
    details: {
      whatWeDo: [
        "Nastavení správce hesel (iCloud Keychain)",
        "Aktivace 2FA na klíčových účtech",
        "Konfigurace Face ID / Touch ID",
        "Kontrola úniku hesel a jejich výměna",
      ],
      timeSaved: "Ochrana před ztrátou dat a účtů",
      example: "Automatické silné heslo pro každou službu",
    },
  },
  {
    icon: BackupIcon,
    title: "Zálohy",
    description: "iCloud nebo lokální záloha – vše automaticky.",
    details: {
      whatWeDo: [
        "Nastavení automatických záloh do iCloudu",
        "Optimalizace úložiště a správa místa",
        "Kontrola co se zálohuje a co ne",
        "Nastavení lokální zálohy na Mac/PC",
      ],
      timeSaved: "Klid: nic neztratíš ani při ztrátě telefonu",
      example: "Každou noc se vše automaticky zálohuje",
    },
  },
  {
    icon: PhotoIcon,
    title: "Fotky",
    description: "Organizace, optimalizace místa, sdílené alba.",
    details: {
      whatWeDo: [
        "Optimalizace úložiště fotek",
        "Nastavení sdílených alb s rodinou",
        "Automatické smazání duplicit",
        "Organizace do alb a vzpomínek",
      ],
      timeSaved: "Až 50% místa v úložišti zpět",
      example: "Fotky v plné kvalitě v cloudu, optimalizované v telefonu",
    },
  },
  {
    icon: WorkflowIcon,
    title: "Workflow",
    description: "Widgety, složky, plocha – vše na dosah.",
    details: {
      whatWeDo: [
        "Reorganizace domovské obrazovky",
        "Nastavení užitečných widgetů",
        "Vytvoření chytrých složek aplikací",
        "Konfigurace zamykací obrazovky",
      ],
      timeSaved: "30 sekund při každém odemčení",
      example: "Nejpoužívanější aplikace na jeden tap",
    },
  },
  {
    icon: AutomationIcon,
    title: "Automatizace",
    description: "Zkratky a automatizace pro rutinní úkoly.",
    details: {
      whatWeDo: [
        "Vytvoření osobních Zkratek (Shortcuts)",
        "Automatizace na základě času/místa",
        "Propojení s chytrou domácností",
        "Zjednodušení opakujících se akcí",
      ],
      timeSaved: "15+ min denně na rutinních úkolech",
      example: "'Odcházím z práce' = navigace domů + zpráva partnerce",
    },
  },
  {
    icon: FamilyIcon,
    title: "Rodina",
    description: "Screen Time pro děti, sdílení polohy, Family Sharing.",
    details: {
      whatWeDo: [
        "Nastavení Screen Time limitů pro děti",
        "Konfigurace Family Sharing",
        "Sdílení polohy mezi členy rodiny",
        "Rodičovská kontrola aplikací a obsahu",
      ],
      timeSaved: "Bezpečí dětí online + méně hádek o telefon",
      example: "Děti mají 2h denně na hry, pak se automaticky zamkne",
    },
  },
];

const ServicesGridSection = () => {
  const [expandedService, setExpandedService] = useState<string | null>(null);

  const toggleService = (title: string) => {
    setExpandedService(expandedService === title ? null : title);
  };

  return (
    <section id="co-nastavujeme" className="section-padding">
      <div className="container-wide">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Co umíme <span className="gradient-text">nastavit</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Přehled oblastí, které pokrýváme. Klikni pro více informací.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {services.map((service) => {
            const isExpanded = expandedService === service.title;
            return (
              <div
                key={service.title}
                onClick={() => toggleService(service.title)}
                className={`glass rounded-2xl p-5 md:p-6 cursor-pointer group transition-all duration-300 ${
                  isExpanded
                    ? "border-primary/50 bg-card col-span-1 sm:col-span-2 lg:col-span-2 row-span-2"
                    : "hover:border-primary/30"
                }`}
              >
                {isExpanded ? (
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors flex-shrink-0">
                      <service.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-foreground">{service.title}</h3>
                        <ChevronDown className="w-4 h-4 text-muted-foreground rotate-180 transition-transform duration-300" />
                      </div>
                      <p className="text-muted-foreground text-sm">{service.description}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors mb-4">
                      <service.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{service.title}</h3>
                    <p className="text-muted-foreground text-sm mb-3">{service.description}</p>
                    <ChevronDown className="w-4 h-4 text-muted-foreground animate-bounce" />
                  </div>
                )}

                {isExpanded && (
                  <div className="mt-6 pt-6 border-t border-border animate-fade-in">
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-foreground mb-3">Co nastavíme:</h4>
                      <ul className="space-y-2">
                        {service.details.whatWeDo.map((item, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="text-primary mt-1">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="glass rounded-xl p-4 mb-4">
                      <p className="text-sm">
                        <span className="text-secondary font-semibold">Výsledek: </span>
                        <span className="text-foreground">{service.details.timeSaved}</span>
                      </p>
                    </div>

                    <div className="text-xs text-muted-foreground italic">
                      <span className="text-primary">Příklad:</span> {service.details.example}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesGridSection;
