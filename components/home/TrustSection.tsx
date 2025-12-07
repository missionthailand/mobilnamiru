import { CheckIcon, SecurityIcon } from "@/components/icons/Icons";

const trustPoints = [
  {
    title: "Transparentní proces",
    description:
      "Před konzultací víš přesně, co budeš platit a co dostaneš. Žádné skryté poplatky.",
  },
  {
    title: "Tvoje data zůstanou tvoje",
    description:
      "Nepotřebujeme přístup k tvým účtům. Vše nastavujeme společně na tvém zařízení.",
  },
  {
    title: "Bezpečná komunikace",
    description: "Všechny konzultace probíhají přes šifrované video hovory.",
  },
  {
    title: "GDPR a ochrana soukromí",
    description:
      "Zpracováváme jen nezbytné údaje. Kdykoliv můžeš požádat o jejich smazání.",
  },
];

const checklist = [
  "Ověřená identita konzultanta",
  "Šifrovaná video komunikace",
  "Žádný vzdálený přístup k zařízení",
  "Data auditů mazána po 30 dnech",
  "Možnost okamžitého odhlášení z marketingu",
];

const TrustSection = () => {
  return (
    <section className="section-padding bg-card/30">
      <div className="container-wide">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Proč nám můžeš <span className="gradient-text">důvěřovat</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Bezpečnost a transparentnost jsou základem naší práce.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Trust Points */}
          <div className="space-y-6">
            {trustPoints.map((point) => (
              <div
                key={point.title}
                className="glass rounded-xl p-5 flex gap-4"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <SecurityIcon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    {point.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {point.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Security Checklist */}
          <div className="glass rounded-2xl p-6 lg:p-8">
            <h3 className="text-xl font-semibold text-foreground mb-6">
              Bezpečnostní checklist
            </h3>
            <ul className="space-y-4">
              {checklist.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
                    <CheckIcon className="w-4 h-4 text-success" />
                  </div>
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
