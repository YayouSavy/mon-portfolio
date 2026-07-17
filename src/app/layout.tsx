import type { Metadata } from "next";
import { Bricolage_Grotesque, Krona_One } from "next/font/google";
import MotionProvider from "../components/MotionProvider";
import "./globals.css";

/* Les deux typos imposées de la DA, chargées par next/font (zéro flash) */
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});
const krona = Krona_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-krona",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Illiana Savy · Product Designer",
  description:
    "Product Designer chez Thales. Applications web riches en données, de la recherche utilisateur à la delivery. Design-to-code, design system, accessibilité WCAG 2.2.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${bricolage.variable} ${krona.variable} overflow-x-hidden bg-noir font-display text-lg text-mist antialiased`}>
        <a href="#about" className="skip-link">Aller au contenu</a>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
