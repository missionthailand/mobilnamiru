import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "mobilnamiru.cz – Nastavení telefonu na míru | Klid, čas, bezpečí.",
  description: "Vylaďujeme iPhone na míru: notifikace, Focus režimy, bezpečnost, zálohy, workflow. Získej zpět klid a čas. Audit zdarma.",
  authors: [{url: "mobilnamiru.cz"}],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
