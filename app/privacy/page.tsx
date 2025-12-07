import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Head from "next/head";

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Zásady ochrany soukromí | mobilnamiru.cz</title>
        <meta
          name="description"
          content="Informace o zpracování osobních údajů a obchodních sděleních."
        />
        <link rel="canonical" href="https://mobilnamiru.cz/privacy" />
      </Head>

      <Header />
      <main className="min-h-screen pt-24 pb-16">
        <div className="container-narrow">
          <div className="glass rounded-2xl p-6 md:p-10 lg:p-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-8">
              Zásady ochrany soukromí
            </h1>

            <div className="prose prose-invert max-w-none space-y-8">
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  1. Kdo jsme
                </h2>
                <p className="text-muted-foreground">
                  Provozovatelem webu mobilnamiru.cz je [DOPLNIT]. Kontaktovat
                  nás můžeš na emailu ahoj@mobilnamiru.cz.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  2. Jaké údaje sbíráme
                </h2>
                <p className="text-muted-foreground mb-4">
                  Pro poskytování našich služeb zpracováváme tyto osobní údaje:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>
                    <strong>Email</strong> – pro zaslání reportu z auditu a
                    případnou další komunikaci
                  </li>
                  <li>
                    <strong>Odpovědi z auditu</strong> – informace o tom, jak
                    používáš telefon, pro vytvoření personalizovaného reportu
                  </li>
                  <li>
                    <strong>Technické údaje</strong> – IP adresa, typ
                    prohlížeče, pro zajištění funkčnosti webu
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  3. Účel zpracování
                </h2>
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-card border border-border">
                    <h3 className="font-medium text-foreground mb-2">
                      Transakční email (report z auditu)
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Tvůj email použijeme k zaslání personalizovaného reportu.
                      Toto je jednorázový transakční email, který je nezbytný
                      pro splnění služby, kterou jsi požádal/a. Právním základem
                      je plnění smlouvy.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-card border border-border">
                    <h3 className="font-medium text-foreground mb-2">
                      Marketing (tipy a nabídky)
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Pokud jsi zaškrtl/a souhlas s marketingovými sděleními,
                      můžeme ti občas (max 2× měsíčně) poslat tipy na vylepšení
                      telefonu nebo informace o našich službách. Právním
                      základem je tvůj souhlas, který můžeš kdykoliv odvolat.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  4. Doba uchování
                </h2>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Odpovědi z auditu mažeme automaticky po 30 dnech</li>
                  <li>Email pro marketing uchováváme do odvolání souhlasu</li>
                  <li>Technické logy uchováváme maximálně 14 dní</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  5. Tvá práva
                </h2>
                <p className="text-muted-foreground mb-4">Máš právo:</p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Požádat o přístup ke svým údajům</li>
                  <li>Požádat o opravu nebo smazání údajů</li>
                  <li>Odvolat souhlas s marketingem (odkaz v každém emailu)</li>
                  <li>Podat stížnost u Úřadu pro ochranu osobních údajů</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  6. Odhlášení z marketingu
                </h2>
                <p className="text-muted-foreground">
                  Z marketingových emailů se můžeš odhlásit kdykoliv kliknutím
                  na odkaz „Odhlásit se&#34; v patičce každého emailu, nebo nám
                  napiš na ahoj@mobilnamiru.cz.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  7. Sdílení údajů
                </h2>
                <p className="text-muted-foreground">
                  Tvoje údaje neprodáváme ani nesdílíme s třetími stranami pro
                  marketingové účely. Pro provoz služby používáme důvěryhodné
                  poskytovatele (hosting, email), kteří jsou vázáni mlčenlivostí
                  a zpracovávají údaje pouze v rozsahu nezbytném pro fungování
                  služby.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  8. Kontakt
                </h2>
                <p className="text-muted-foreground">
                  S jakýmkoliv dotazem ohledně ochrany soukromí nás kontaktuj
                  na:{" "}
                  <a
                    href="mailto:ahoj@mobilnamiru.cz"
                    className="text-primary hover:underline"
                  >
                    ahoj@mobilnamiru.cz
                  </a>
                </p>
              </section>

              <p className="text-sm text-muted-foreground pt-8 border-t border-border">
                Poslední aktualizace: {new Date().toLocaleDateString("cs-CZ")}
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
