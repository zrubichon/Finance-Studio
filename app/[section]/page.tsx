import Link from "next/link";
import { notFound } from "next/navigation";
import { navItems, sectionContent } from "@/lib/content";

type SectionPageProps = {
  params: Promise<{ section: string }>;
};

export default async function SectionPage({ params }: SectionPageProps) {
  const { section } = await params;
  const data = sectionContent[section];

  if (!data) notFound();

  return (
    <main className="section-shell">
      <aside className="section-sidebar">
        <Link className="brand" href="/">
          <span className="brand-mark">FS</span>
          <span>FinanceStudio</span>
        </Link>
        <nav className="section-nav" aria-label="FinanceStudio sections">
          {navItems.map((item) => (
            <Link className={item.slug === section ? "active" : ""} href={`/${item.slug}`} key={item.slug}>
              <span>{item.icon}</span>{item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <section className="section-main">
        <Link className="back-link" href="/">← Back to dashboard</Link>
        <p className="eyebrow">{data.eyebrow}</p>
        <h1>{data.title}</h1>
        <p className="section-lead">{data.description}</p>
        <div className="section-grid">
          {data.cards.map((card) => (
            <article className="feature-card" key={card.title}>
              <span className="mini-label">{card.meta}</span>
              <h2>{card.title}</h2>
              <p>{card.text}</p>
              <button type="button">Explore module <span>→</span></button>
            </article>
          ))}
        </div>
        <div className="build-note">
          <span className="live-dot" />
          <div>
            <strong>Foundation build</strong>
            <p>This module is structurally ready. Live data, accounts and adaptive AI are being connected in the next product layers.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
