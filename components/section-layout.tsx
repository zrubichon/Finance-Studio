"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
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
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    try {
      setCollapsed(window.localStorage.getItem("finance-studio-section-sidebar-collapsed") === "1");
    } catch {
      // Keep the expanded default when storage is unavailable.
    }
  }, []);

  function toggleSidebar() {
    setCollapsed((current) => {
      const next = !current;
      try { window.localStorage.setItem("finance-studio-section-sidebar-collapsed", next ? "1" : "0"); } catch { /* optional */ }
      return next;
    });
  }

  return (
    <main className={`section-shell product-section-shell${collapsed ? " section-nav-collapsed" : ""}`}>
      <aside className="section-sidebar">
        <button
          type="button"
          className="section-sidebar-toggle"
          aria-label={collapsed ? (isFrench ? "Ouvrir la navigation" : "Expand navigation") : (isFrench ? "Réduire la navigation" : "Collapse navigation")}
          aria-expanded={!collapsed}
          onClick={toggleSidebar}
        >
          {collapsed ? "›" : "‹"}
        </button>
        <Link className="brand" href="/">
          <span className="brand-mark">FS</span>
          <span>FinanceStudio</span>
        </Link>
        <p className="sidebar-kicker">{isFrench ? "APPRENDRE · MARCHÉS · MÉTIERS" : "LEARN · MARKETS · CAREERS"}</p>
        <nav className="section-nav" aria-label={isFrench ? "Sections FinanceStudio" : "FinanceStudio sections"}>
          <Link className={activeSlug === "home" ? "active" : ""} href="/" title={isFrench ? "Accueil" : "Home"}>
            <span>⌂</span>{isFrench ? "Accueil" : "Home"}
          </Link>
          {navItems.map((item) => (
            <Link className={item.slug === activeSlug ? "active" : ""} href={`/${item.slug}`} key={item.slug} title={isFrench ? item.labelFr : item.label}>
              <span>{item.icon}</span>{isFrench ? item.labelFr : item.label}
            </Link>
          ))}
        </nav>
        <div className="section-sidebar-note" hidden={collapsed}>
          <span className="live-dot" />
          <div>
            <strong>{isFrench ? "Données réelles uniquement" : "Real data only"}</strong>
            <p>{isFrench ? "Les prix et observations affichés proviennent des sources connectées ; FinanceStudio n’invente pas de données de marché." : "Displayed prices and observations come from connected sources; FinanceStudio does not fabricate market data."}</p>
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
