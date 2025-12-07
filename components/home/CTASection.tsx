import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@/components/icons/Icons";
import Link from "next/link";

const CTASection = () => {
  const handleCtaClick = (ctaName: string) => {
    if (typeof window !== "undefined" && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: "cta_click",
        cta_name: ctaName,
        cta_location: "bottom_cta",
      });
    }
  };

  return (
    <section className="section-padding">
      <div className="container-narrow">
        <div className="relative glass rounded-3xl p-8 md:p-12 lg:p-16 text-center overflow-hidden">
          {/* Background glow */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-[80px]" />
            <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-secondary/20 rounded-full blur-[60px]" />
          </div>

          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Připraven/a na{" "}
              <span className="gradient-text">klidnější telefon</span>?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              Začni auditem zdarma. Za 5 minut budeš vědět, co se dá zlepšit.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Link
                href="/audit"
                onClick={() => handleCtaClick("audit_bottom")}
              >
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-secondary to-secondary/80 text-background hover:from-secondary/90 hover:to-secondary/70 shadow-lg shadow-secondary/20 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-secondary/30"
                >
                  Chci mobil na míru
                  <ArrowRightIcon />
                </Button>
              </Link>
              <a
                href="#balicky"
                onClick={() => handleCtaClick("booking_bottom")}
              >
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-card border border-border text-foreground hover:border-primary/50 hover:bg-card/80"
                >
                  Prohlédnout balíčky
                </Button>
              </a>
            </div>

            <p className="text-sm text-muted-foreground">
              Zabere 5 minut. Dostaneš konkrétní checklist na míru.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
