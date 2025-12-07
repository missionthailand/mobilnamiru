'use client'

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const scenarios = [
  {
    persona: "Podnikatel/ka s přeplněným telefonem",
    before: [
      "Notifikace od všeho, pořád",
      "Důležité zprávy zanikají v šumu",
      "Strach, jestli jsou zálohy OK",
      "Chaotický seznam aplikací",
    ],
    after: [
      "Notifikace jen od klientů a rodiny",
      "Klidná hlava i v 8 večer",
      "Jistota: zálohy běží automaticky",
      "Přehledná plocha, rychlý přístup",
    ],
    stats: {
      timeSaved: 45,
      efficiencyIncrease: 32,
      screenTimeReduction: 28,
      stressReduction: 40,
    },
    expandedContent: {
      title: "Případová studie: Podnikatel",
      description: "Majitel e-shopu, který denně řešil desítky zpráv od klientů, dodavatelů a týmu. Po optimalizaci telefonu získal zpět kontrolu nad svým časem.",
      details: [
        "Nastavení VIP kontaktů pro urgentní zprávy",
        "Automatické třídění e-mailů podle priorit",
        "Focus režimy pro práci, schůzky a volný čas",
        "Automatizované zálohy fotek a dokumentů",
      ],
    },
  },
  {
    persona: "Rodič s dětmi u obrazovek",
    before: [
      "Děti na telefonu neomezeně",
      "Nejistota, co sledují",
      "Hádky o odložení telefonu",
      "Bez přehledu o poloze dětí",
    ],
    after: [
      "Časové limity pro každou appku",
      "Obsah filtrovaný podle věku",
      "Screen Time jako dohoda, ne boj",
      "Sdílení polohy pro klid duše",
    ],
    stats: {
      timeSaved: 60,
      efficiencyIncrease: 45,
      screenTimeReduction: 52,
      stressReduction: 55,
    },
    expandedContent: {
      title: "Případová studie: Rodinná harmonie",
      description: "Rodina se dvěma dětmi (8 a 12 let), kde Screen Time způsoboval denní konflikty. Po nastavení jasných pravidel a limitů se situace výrazně zlepšila.",
      details: [
        "Individuální limity pro každé dítě",
        "Blokace nevhodného obsahu podle věku",
        "Sdílení polohy v rámci rodiny",
        "Společný rodinný kalendář a připomínky",
      ],
    },
  },
  {
    persona: "Člověk zahltěný notifikacemi",
    before: [
      "Nekonečné tečky na ikonách",
      "Reflex: sáhnout po telefonu",
      "Pocit, že něco prošvihneš",
      "Telefon = zdroj stresu",
    ],
    after: [
      "Čistá plocha, žádné tečky",
      "Vědomé používání telefonu",
      "Focus režimy pro práci i odpočinek",
      "Telefon = nástroj, ne pán",
    ],
    stats: {
      timeSaved: 75,
      efficiencyIncrease: 38,
      screenTimeReduction: 45,
      stressReduction: 62,
    },
    expandedContent: {
      title: "Případová studie: Digitální wellbeing",
      description: "Marketingový specialista, který kontroloval telefon 150× denně. Po optimalizaci notifikací a nastavení Focus režimů získal zpět soustředění.",
      details: [
        "Redukce notifikací na minimum",
        "Nastavení tichých hodin",
        "Focus režimy synchronizované s kalendářem",
        "Widgety místo otevírání aplikací",
      ],
    },
  },
];

const CHART_COLORS = {
  primary: "hsl(var(--primary))",
  secondary: "hsl(var(--secondary))",
  success: "hsl(var(--success))",
  muted: "hsl(var(--muted))",
};

const BeforeAfterSection = () => {
  const [selectedScenario, setSelectedScenario] = useState<typeof scenarios[0] | null>(null);

  const getBarChartData = (stats: typeof scenarios[0]["stats"]) => [
    { name: "Ušetřený čas", value: stats.timeSaved, unit: "min/den" },
    { name: "Efektivita", value: stats.efficiencyIncrease, unit: "%" },
    { name: "Méně obrazovky", value: stats.screenTimeReduction, unit: "%" },
    { name: "Méně stresu", value: stats.stressReduction, unit: "%" },
  ];

  const getPieChartData = (stats: typeof scenarios[0]["stats"]) => [
    { name: "Produktivní čas", value: 100 - stats.screenTimeReduction + stats.efficiencyIncrease },
    { name: "Ušetřený čas", value: stats.timeSaved },
  ];

  return (
    <section className="section-padding">
      <div className="container-wide">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Příklady: <span className="gradient-text">před a po</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Reálné situace, které řešíme. Klikni pro detaily a statistiky.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {scenarios.map((scenario) => (
            <div
              key={scenario.persona}
              className="glass rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/10"
              onClick={() => setSelectedScenario(scenario)}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-primary/20 to-secondary/20 px-6 py-4">
                <h3 className="font-semibold text-foreground text-center">
                  {scenario.persona}
                </h3>
              </div>

              <div className="p-6">
                {/* Before */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-destructive">Před</span>
                    <div className="flex-1 h-px bg-border" />
                  </div>
                  <ul className="space-y-2">
                    {scenario.before.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-destructive mt-0.5">×</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* After */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-success">Po</span>
                    <div className="flex-1 h-px bg-border" />
                  </div>
                  <ul className="space-y-2">
                    {scenario.after.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                        <span className="text-success mt-0.5">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Click hint */}
                <div className="mt-4 pt-4 border-t border-border/50 text-center">
                  <span className="text-xs text-muted-foreground">Klikni pro detailní statistiky →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Dialog */}
      <Dialog open={!!selectedScenario} onOpenChange={() => setSelectedScenario(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedScenario && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl gradient-text">
                  {selectedScenario.expandedContent.title}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                <p className="text-muted-foreground">
                  {selectedScenario.expandedContent.description}
                </p>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="glass rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-secondary">{selectedScenario.stats.timeSaved}</div>
                    <div className="text-xs text-muted-foreground">min/den ušetřeno</div>
                  </div>
                  <div className="glass rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-success">+{selectedScenario.stats.efficiencyIncrease}%</div>
                    <div className="text-xs text-muted-foreground">efektivita</div>
                  </div>
                  <div className="glass rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-primary">-{selectedScenario.stats.screenTimeReduction}%</div>
                    <div className="text-xs text-muted-foreground">čas u obrazovky</div>
                  </div>
                  <div className="glass rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-secondary">-{selectedScenario.stats.stressReduction}%</div>
                    <div className="text-xs text-muted-foreground">stres</div>
                  </div>
                </div>

                {/* Bar Chart */}
                <div className="glass rounded-xl p-4">
                  <h4 className="font-semibold mb-4 text-foreground">Přehled zlepšení</h4>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={getBarChartData(selectedScenario.stats)} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <YAxis dataKey="name" type="category" width={100} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <Bar dataKey="value" fill="hsl(var(--secondary))" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Pie Chart */}
                <div className="glass rounded-xl p-4">
                  <h4 className="font-semibold mb-4 text-foreground">Rozložení času</h4>
                  <div className="flex items-center justify-center">
                    <ResponsiveContainer width="100%" height={180}>
                      <PieChart>
                        <Pie
                          data={getPieChartData(selectedScenario.stats)}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          <Cell fill="hsl(var(--primary))" />
                          <Cell fill="hsl(var(--secondary))" />
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex justify-center gap-6 mt-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-primary" />
                      <span className="text-xs text-muted-foreground">Produktivní čas</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-secondary" />
                      <span className="text-xs text-muted-foreground">Ušetřený čas</span>
                    </div>
                  </div>
                </div>

                {/* What we did */}
                <div className="glass rounded-xl p-4">
                  <h4 className="font-semibold mb-3 text-foreground">Co jsme nastavili</h4>
                  <ul className="space-y-2">
                    {selectedScenario.expandedContent.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-success mt-0.5">✓</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default BeforeAfterSection;
