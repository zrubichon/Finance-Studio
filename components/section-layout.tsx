"use client";

import AppSidebar, {useSidebarState} from "./app-sidebar";
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
  const {collapsed,toggle}=useSidebarState();

  return (
    <main className={`app-shell section-shell product-section-shell${collapsed ? " sidebar-collapsed" : ""}`}>
      <AppSidebar activeSlug={activeSlug} collapsed={collapsed} onToggle={toggle}/>


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
