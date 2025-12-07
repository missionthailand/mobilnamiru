"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, CheckIcon } from "@/components/icons/Icons";
import {
  Crown,
  Download,
  FileText,
  Loader2,
  Share2,
  Sparkles,
  Video,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import Head from "next/head";
import Link from "next/link";
import supabase from "@/supabase/client";

const quickWins = [
  {
    title: "Zkontroluj zálohy hned teď",
    description:
      "Nastavení → [tvé jméno] → iCloud → Záloha na iCloudu. Mělo by svítit Zapnuto a poslední záloha by neměla být starší než 24 hodin.",
  },
  {
    title: "Zapni Find My",
    description:
      "Nastavení → [tvé jméno] → Najít → Najít iPhone. Zapni všechny tři přepínače – chrání tě to při ztrátě nebo krádeži.",
  },
];

const preparation = [
  "Nabij telefon na 100%",
  "Připrav si Apple ID heslo (pro případ potřeby)",
  "Vymez si nerušený čas (60–90 minut podle balíčku)",
  "Připrav seznam aplikací, které nejvíc používáš",
  "Promysli si, jaké situace tě nejvíc ruší (práce, večer, rodina…)",
];

export default function ThankYou() {
  const router = useRouter();
  const { toast } = useToast();
  const [report, setReport] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState<string>("");
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const auditDone = localStorage.getItem("audit_done");
    if (!auditDone) {
      router.push("/audit");
      return;
    }

    const submissionId = localStorage.getItem("audit_submission_id");
    const storedEmail = localStorage.getItem("audit_email");
    const storedName = localStorage.getItem("audit_name");
    if (storedEmail) setEmail(storedEmail);
    if (storedName) setUserName(storedName);

    if (submissionId) {
      fetchReport(submissionId);
    } else {
      setIsLoading(false);
    }
  }, [router]);

  const fetchReport = async (submissionId: string) => {
    try {
      // Use secure edge function to fetch report (RLS blocks direct access)
      const { data, error } = await supabase.functions.invoke("get-report", {
        body: { submissionId },
      });
      if (error) {
        console.error("Error fetching report:", error);
        return;
      }
      if (data?.report) {
        setReport(data.report);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCtaClick = (ctaName: string) => {
    if (typeof window !== "undefined" && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: "cta_click",
        cta_name: ctaName,
        cta_location: "thankyou",
      });
    }
  };

  const handleFullReportClick = () => {
    handleCtaClick("full_report_purchase");
    toast({
      title: "Plná verze reportu",
      description:
        "Platební brána bude brzy k dispozici. Zatím nás kontaktuj přímo.",
    });
  };

  const handleConsultationClick = () => {
    handleCtaClick("consultation_booking");
    toast({
      title: "Rezervace konzultace",
      description:
        "Rezervační systém bude brzy k dispozici. Zatím nás kontaktuj přímo.",
    });
  };

  const handleDownload = () => {
    if (!report) return;

    const blob = new Blob([report], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `mini-audit-report-${new Date().toISOString().split("T")[0]}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Staženo!",
      description: "Report byl uložen do tvého zařízení.",
    });
  };

  const handleShare = async () => {
    if (!report) return;

    const shareData = {
      title: "Můj Mini Audit Telefonu",
      text: "Podívej se na můj personalizovaný audit telefonu!",
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          copyToClipboard();
        }
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Zkopírováno!",
      description: "Odkaz byl zkopírován do schránky.",
    });
  };

  return (
    <>
      <Head>
        <title>Díky za audit! | mobilnamiru.cz</title>
        <meta
          name="description"
          content="Report je na cestě. Mezitím si projdi dva quick wins."
        />
        <meta name="robots" content="noindex" />
      </Head>

      <Header />
      <main className="min-h-screen pt-24 pb-16">
        <div className="container-narrow">
          {/* Success Message */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 rounded-2xl bg-success/20 flex items-center justify-center mx-auto mb-6">
              <CheckIcon className="w-10 h-10 text-success" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {userName ? `Díky, ${userName}!` : "Díky!"} Report je na cestě
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              {email && `Na ${email} posíláme personalizovaný checklist. `}
              Zkontroluj i složku spam.
            </p>
          </div>

          {/* AI Report Section */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <FileText className="w-6 h-6 text-primary" />
                Tvoje 3 personalizované tipy
              </h2>
              {report && (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDownload}
                    className="gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Stáhnout
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleShare}
                    className="gap-2"
                  >
                    <Share2 className="w-4 h-4" />
                    Sdílet
                  </Button>
                </div>
              )}
            </div>

            <div className="glass rounded-2xl p-6 md:p-8">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 text-primary animate-spin mb-4" />
                  <p className="text-muted-foreground">
                    Načítám tvůj report...
                  </p>
                </div>
              ) : report ? (
                <div
                  className="prose prose-sm md:prose-base max-w-none
                    prose-headings:text-foreground prose-headings:font-bold
                    prose-h1:text-2xl prose-h1:mb-6 prose-h1:mt-0
                    prose-h2:text-xl prose-h2:mb-4 prose-h2:mt-8 prose-h2:text-primary
                    prose-h3:text-lg prose-h3:mb-3 prose-h3:mt-6
                    prose-p:text-foreground prose-p:leading-relaxed prose-p:mb-4
                    prose-ul:my-4 prose-li:text-foreground prose-li:my-1
                    prose-strong:text-foreground prose-strong:font-semibold
                    prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
                  dangerouslySetInnerHTML={{ __html: report }}
                />
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">
                    Report se právě generuje a brzy ti přijde na email.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Mezitím si projdi dva quick wins níže.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Upsell Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Chceš <span className="gradient-text">kompletní návod</span>?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Full Report Card */}
              <div className="glass rounded-2xl p-6 md:p-8 relative overflow-hidden group hover:border-primary/50 transition-colors">
                <div className="absolute top-4 right-4">
                  <span className="bg-primary/20 text-primary text-xs font-semibold px-3 py-1 rounded-full">
                    Bestseller
                  </span>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Crown className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">
                      Kompletní Report
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      10-15 tipů + návody
                    </p>
                  </div>
                </div>
                <ul className="space-y-2 mb-6 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckIcon className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">
                      Kompletní 60min návod krok za krokem
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckIcon className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">
                      10-15 personalizovaných tipů
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckIcon className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">Kontrola od experta</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckIcon className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">
                      Doručení do 24 hodin
                    </span>
                  </li>
                </ul>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-foreground">
                      299 Kč
                    </span>
                    <span className="text-sm text-muted-foreground ml-2">
                      jednorázově
                    </span>
                  </div>
                  <Button
                    onClick={handleFullReportClick}
                    className="bg-gradient-to-r from-primary to-primary/80"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Získat report
                  </Button>
                </div>
              </div>

              {/* Consultation Card */}
              <div className="glass rounded-2xl p-6 md:p-8 relative overflow-hidden group hover:border-secondary/50 transition-colors">
                <div className="absolute top-4 right-4">
                  <span className="bg-secondary/20 text-secondary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                    Premium
                  </span>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
                    <Video className="w-6 h-6 text-secondary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">
                      Online Konzultace
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Nastavíme spolu
                    </p>
                  </div>
                </div>
                <ul className="space-y-2 mb-6 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckIcon className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">
                      60-90 min online session
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckIcon className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">
                      Nastavíme telefon společně
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckIcon className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">
                      Kompletní report v ceně
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckIcon className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">
                      30 dní podpora po konzultaci
                    </span>
                  </li>
                </ul>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-foreground">
                      od 990 Kč
                    </span>
                  </div>
                  <Button variant="outline" onClick={handleConsultationClick}>
                    <ArrowRightIcon className="w-4 h-4 mr-2" />
                    Rezervovat
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Wins */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-center">
              2 quick wins, které můžeš udělat{" "}
              <span className="gradient-text">hned teď</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {quickWins.map((win, index) => (
                <div key={win.title} className="glass rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center">
                      <span className="text-secondary-foreground font-bold">
                        {index + 1}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">
                        {win.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {win.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Preparation */}
          <section className="glass rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-bold mb-6">
              Co si připravit na konzultaci
            </h2>
            <ul className="space-y-4">
              {preparation.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckIcon className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Back Link */}
          <div className="text-center mt-12">
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Zpět na hlavní stránku
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
