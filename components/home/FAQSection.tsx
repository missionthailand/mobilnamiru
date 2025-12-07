'use client'

import { useState } from "react";
import { ChevronDownIcon } from "@/components/icons/Icons";

const faqs = [
  {
    question: "Kolik stojí audit a setup?",
    answer: "Audit je zdarma – dostaneš konkrétní report s návrhy. Setup balíčky začínají na Basic (60 min) a liší se rozsahem. Přesné ceny najdeš po vyplnění auditu.",
  },
  {
    question: "Jak dlouho konzultace trvá?",
    answer: "Basic trvá přibližně 60 minut, Pro kolem 90 minut + follow-up za 2 týdny. Family balíček zahrnuje dvě 90minutové sessions pro celou rodinu.",
  },
  {
    question: "Potřebujete přístup k mým účtům?",
    answer: "Ne. Vše nastavujeme společně během video hovoru. Ty máš telefon v ruce, já ti říkám kroky. Nikdy nepotřebujeme tvá hesla ani vzdálený přístup.",
  },
  {
    question: "Funguje to i pro Android?",
    answer: "Momentálně se specializujeme na iPhone (iOS). Podpora Androidu je v plánu – nech nám email a dáme vědět.",
  },
  {
    question: "Co když mi to nepomůže?",
    answer: "Pokud po konzultaci uvidím, že tvůj telefon je už dobře nastavený nebo ti nemůžu pomoct, řeknu ti to narovinu. Nechceme prodávat vzduch.",
  },
  {
    question: "Jak probíhá konzultace?",
    answer: "Přes video hovor (Google Meet nebo Zoom). Sdílíš obrazovku svého telefonu a já tě krok po kroku provedu nastavením. Vše vysvětlím, abys věděl/a proč to děláme.",
  },
  {
    question: "Můžu si to nastavit sám/sama podle reportu?",
    answer: "Jasně! Report z auditu obsahuje konkrétní kroky. Pokud si troufáš, můžeš to zkusit. Setup je pro ty, kdo chtějí jistotu a ušetřit čas.",
  },
  {
    question: "Co je v auditu?",
    answer: "Zeptáme se na to, jak telefon používáš, co tě ruší, jaké máš návyky a obavy. Na základě odpovědí vytvoříme personalizovaný checklist s návrhy.",
  },
  {
    question: "Jsou moje data v bezpečí?",
    answer: "Ano. Odpovědi z auditu používáme jen pro vytvoření reportu. Neukládáme citlivé údaje, nesíťujeme a po 30 dnech vše mažeme. Detaily v zásadách ochrany soukromí.",
  },
  {
    question: "Můžu konzultaci absolvovat i večer nebo o víkendu?",
    answer: "Ano, nabízíme flexibilní časy včetně večerů a víkendů. Při rezervaci si vybereš termín, který ti vyhovuje.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="section-padding">
      <div className="container-narrow">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Časté <span className="gradient-text">otázky</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Odpovědi na to, co nás lidi nejčastěji ptají.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="glass rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
                aria-expanded={openIndex === index}
              >
                <span className="font-medium text-foreground pr-4">{faq.question}</span>
                <ChevronDownIcon
                  className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="px-6 pb-5 text-muted-foreground">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
