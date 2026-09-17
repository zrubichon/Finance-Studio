import Link from "next/link";
import type { ReactNode } from "react";
import { navItems } from "@/lib/content";

type SectionLayoutProps = {
  activeSlug: string;
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
};

export default function SectionLayout({
  activeSlug,
  eyebrow,
  title,
  description,
  children,
}: SectionLayoutProps) {
  return (
    <main className="section-shell product-section-shell">
      <aside className="section-sidebar">
        <Link className="brand" href="/">
          <span className="brand-mark">FS</span>
          <span>FinanceStudio</span>
        </Link>
        <p className="sidebar-kicker">LEARN · MARKETS · CAREERS</p>
        <nav className="section-nav" aria-label="FinanceStudio sections">
          <Link className={activeSlug === "home" ? "active" : ""} href="/">
            <span>⌂</span>Home
          </Link>
          {navItems.map((item) => (
            <Link className={item.slug === activeSlug ? "active" : ""} href={`/${item.slug}`} key={item.slug}>
              <span>{item.icon}</span>{item.label}
            </Link>
          ))}
        </nav>
        <div className="section-sidebar-note">
          <span className="live-dot" />
          <div>
            <strong>Foundation build</strong>
            <p>Real data only. No fabricated market prices.</p>
          </div>
        </div>
      </aside>

      <section className="section-main product-section-main">
        <Link className="back-link" href="/">← Dashboard</Link>
        <div className="product-section-hero">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        {children}
      </section>
    </main>
  );
}
