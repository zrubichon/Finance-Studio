"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { navItems } from "@/lib/content";
import { useLanguage } from "@/components/language-provider";

export type LocalizedText = { en: string; fr: string };

type SectionLayoutProps = {
  activeSlug: string;
  eyebrow: string | LocalizedText;
  title: string | LocalizedText;
  description: string | LocalizedText;
  children: ReactNode;
};

function pick(value: string | LocalizedText, french: boolean) {
  return typeof value === "string" ? value : french ? value.fr : value.en;
}

export default function SectionLayout({ activeSlug, eyebrow, title, description, children }: SectionLayoutProps) {
  const { language, setLanguage, isFrench } = useLanguage();

  return (
    <main className="section-shell product-section-shell">
      <aside className="section-sidebar">
        <Link className="brand" href="/">
          <span className="brand-mark">FS</span>
          <span>FinanceStudio</span>
        </Link>
        <p className="sidebar-kicker">{isFrench ? "APPRENDRE · MARCHÉS · MÉTIERS" : "LEARN · MARKETS · CAREERS"}</p>
        <nav className="section-nav" aria-label={isFrench ? "Sections FinanceStudio" : "FinanceStudio sections"}>
          <Link className={activeSlug === "home" ? "active" : ""} href="/">
            <span>⌂</span>{isFrench ? "Accueil" : "Home"}
          </Link>
          {navItems.map((item) => (
            <Link className={item.slug === activeSlug ? "active" : ""} href={`/${item.slug}`} key={item.slug}>
              <span>{item.icon}</span>{isFrench ? item.labelFr : item.label}
            </Link>
          ))}
        </nav>
        <div className="section-sidebar-note">
          <span className="live-dot" />
          <div>
            <strong>{isFrench ? "Version de fondation" : "Foundation build"}</strong>
            <p>{isFrench ? "Uniquement des données réelles. Aucun prix de marché inventé." : "Real data only. No fabricated market prices."}</p>
          </div>
        </div>
      </aside>

      <section className="section-main product-section-main">
        <div className="section-top-row">
          <Link className="back-link" href="/">← {isFrench ? "Tableau de bord" : "Dashboard"}</Link>
          <div className="segmented" aria-label={isFrench ? "Sélecteur de langue" : "Language selector"}>
            {(["EN", "FR"] as const).map((item) => (
              <button className={language === item ? "selected" : ""} onClick={() => setLanguage(item)} key={item} type="button">{item}</button>
            ))}
          </div>
        </div>
        <div className="product-section-hero">
          <p className="eyebrow">{pick(eyebrow, isFrench)}</p>
          <h1>{pick(title, isFrench)}</h1>
          <p>{pick(description, isFrench)}</p>
        </div>
        {children}
      </section>
    </main>
  );
}
