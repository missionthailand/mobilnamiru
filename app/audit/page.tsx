"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@/components/icons/Icons";
import AuditQuestionnaire from "@/components/audit/AuditQuestionnaire";
import { useToast } from "@/hooks/use-toast";
import Head from "next/head";
import { useRouter } from "next/navigation";
import supabase from "@/supabase/client";

export default function Audit() {
  const [isStarted, setIsStarted] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleStart = () => {
    setIsStarted(true);
    if (typeof window !== "undefined" && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: "audit_start",
      });
    }
  };

  const handleComplete = async (submissionId: string) => {
    setIsGenerating(true);

    try {
      // Generate AI report
      const { data, error } = await supabase.functions.invoke(
        "generate-report",
        {
          body: { submissionId },
        },
      );

      if (error) {
        console.error("Error generating report:", error);
        toast({
          title: "Report se generuje",
          description: "Pošleme ti ho na email.",
        });
      }

      router.push("/thankyou");
    } catch (error) {
      console.error("Error:", error);
      router.push("/thankyou");
    }
  };

  return (
    <>
      <Head>
        <title>Audit telefonu zdarma | mobilnamiru.cz</title>
        <meta
          name="description"
          content="Vyplň komplexní audit a zjisti, jak můžeš vylepšit nastavení svého telefonu. Dostaneš personalizovaný AI report zdarma."
        />
        <meta
          property="og:title"
          content="Audit telefonu zdarma | mobilnamiru.cz"
        />
        <meta
          property="og:description"
          content="Komplexní audit + personalizovaný AI report zdarma."
        />
        <link rel="canonical" href="https://mobilnamiru.cz/audit" />
      </Head>

      <Header />
      <main className="min-h-screen pt-24 pb-16">
        <div className="container-narrow">
          <div className="glass rounded-2xl p-6 md:p-10 lg:p-12">
            {!isStarted ? (
              <div className="text-center max-w-xl mx-auto">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-6">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-background"
                  >
                    <path d="M9 11l3 3L22 4" />
                    <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                  </svg>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  Kompletní audit tvého telefonu
                </h1>
                <p className="text-muted-foreground text-lg mb-8">
                  30 otázek, které odhalí, kde má tvůj telefon rezervy. AI ti
                  vytvoří personalizovaný report s konkrétními kroky – co
                  nastavit, proč a jak.
                </p>
                <Button
                  size="lg"
                  onClick={handleStart}
                  className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-secondary/30"
                >
                  Začít audit
                  <ArrowRightIcon />
                </Button>
                <p className="text-sm text-muted-foreground mt-4">
                  Bez registrace. AI report pošleme na email.
                </p>
              </div>
            ) : isGenerating ? (
              <div className="text-center max-w-xl mx-auto py-12">
                <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-6 animate-pulse">
                  <svg
                    className="w-8 h-8 text-primary animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-2">
                  Generuji tvůj report...
                </h2>
                <p className="text-muted-foreground">
                  AI analyzuje tvé odpovědi a připravuje personalizovaná
                  doporučení.
                </p>
              </div>
            ) : (
              <AuditQuestionnaire onComplete={handleComplete} />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
