"use client";

import Header from "@/components/Header";
import HeroSection from "@/components/home/HeroSection";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import BenefitsSection from "@/components/home/BenefitsSection";
import BeforeAfterSection from "@/components/home/BeforeAfterSection";
import PackagesSection from "@/components/home/PackagesSection";
import ServicesGridSection from "@/components/home/ServicesGridSection";
import TrustSection from "@/components/home/TrustSection";
import FAQSection from "@/components/home/FAQSection";
import CTASection from "@/components/home/CTASection";
import Footer from "@/components/Footer";
import Head from "next/head";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://mobilnamiru.cz/#organization",
        name: "mobilnamiru.cz",
        url: "https://mobilnamiru.cz",
        logo: "https://mobilnamiru.cz/logo.png",
        contactPoint: {
          "@type": "ContactPoint",
          email: "ahoj@mobilnamiru.cz",
          contactType: "customer service",
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://mobilnamiru.cz/#website",
        url: "https://mobilnamiru.cz",
        name: "mobilnamiru.cz",
        publisher: {
          "@id": "https://mobilnamiru.cz/#organization",
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>
          mobilnamiru.cz – Nastavení telefonu na míru | Klid, čas, bezpečí
        </title>
        <meta
          name="description"
          content="Vylaďujeme iPhone na míru: notifikace, Focus režimy, bezpečnost, zálohy, workflow. Získej zpět klid a čas. Audit zdarma."
        />
        <meta
          property="og:title"
          content="mobilnamiru.cz – Nastavení telefonu na míru"
        />
        <meta
          property="og:description"
          content="Vylaďujeme iPhone na míru: notifikace, Focus režimy, bezpečnost, zálohy. Audit zdarma."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mobilnamiru.cz" />
        <link rel="canonical" href="https://mobilnamiru.cz" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Head>

      <Header />
      <main>
        <HeroSection />
        <AnimatedSection animation="fade-up" delay={0}>
          <HowItWorksSection />
        </AnimatedSection>
        <AnimatedSection animation="fade-up" delay={100}>
          <BenefitsSection />
        </AnimatedSection>
        <AnimatedSection animation="scale" delay={0}>
          <BeforeAfterSection />
        </AnimatedSection>
        <AnimatedSection animation="fade-left" delay={0}>
          <PackagesSection />
        </AnimatedSection>
        <AnimatedSection animation="fade-right" delay={0}>
          <ServicesGridSection />
        </AnimatedSection>
        <AnimatedSection animation="fade-up" delay={0}>
          <TrustSection />
        </AnimatedSection>
        <AnimatedSection animation="blur" delay={0}>
          <FAQSection />
        </AnimatedSection>
        <AnimatedSection animation="scale" delay={0}>
          <CTASection />
        </AnimatedSection>
      </main>
      <Footer />
    </>
  );
}
