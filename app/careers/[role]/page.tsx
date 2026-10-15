import Link from "next/link";
import { notFound } from "next/navigation";
import SectionLayout from "@/components/section-layout";
import { careerGuides, getCareerGuide } from "@/lib/career-guides";

export function generateStaticParams() { return careerGuides.map((guide) => ({ role: guide.slug })); }

export default async function CareerRolePage({ params }: { params: Promise<{ role: string }> }) {
  const { role } = await params;
  const guide = getCareerGuide(role);
  if (!guide) notFound();
  return (
    <SectionLayout
      activeSlug="careers"
      eyebrow={{ en: "CAREER DEEP DIVE", fr: "GUIDE MÉTIER COMPLET" }}
      title={{ en: guide.name, fr: guide.fr }}
      description={{ en: guide.mission, fr: guide.missionFr }}
    >
      <div className="workspace-stack career-learning-hub">
        <section className="news-blueprint-panel">
          <span className="mini-label">DAY-TO-DAY WORK</span>
          <h2>What you actually do</h2>
          <div className="analysis-grid">{guide.tasks.map((task, index) => <article className="analysis-card" key={task}><span className="mini-label">{String(index+1).padStart(2,"0")}</span><h3>{task}</h3><p>{guide.tasksFr[index]}</p></article>)}</div>
        </section>
        <section className="news-blueprint-panel">
          <span className="mini-label">KNOWLEDGE TO MASTER</span><h2>Technical foundation</h2>
          <div className="related-row">{guide.concepts.map((concept) => <Link key={concept} href={`/dictionary?q=${encodeURIComponent(concept)}`}>{concept}</Link>)}</div>
          <div className="market-course-links">{guide.lessons.map(([label, slug]) => <Link key={slug} href={`/university/${slug}`}>{label} →</Link>)}</div>
        </section>
        <section className="analysis-grid">
          <article className="analysis-card"><span className="mini-label">RECRUITING</span><h3>How to prepare</h3>{guide.recruiting.map((item) => <p key={item}>• {item}</p>)}</article>
          <article className="analysis-card"><span className="mini-label">INTERNSHIP / STAGE</span><h3>Application workflow</h3>{guide.internship.map((item) => <p key={item}>• {item}</p>)}</article>
          <article className="analysis-card"><span className="mini-label">NETWORKING</span><h3>Who to contact</h3>{guide.networking.map((item) => <p key={item}>• {item}</p>)}</article>
        </section>
        <section className="news-blueprint-panel"><span className="mini-label">FIRMS TO RESEARCH</span><h2>Build a target list, then research the actual team</h2><div className="related-row">{guide.firms.map((firm) => <span key={firm}>{firm}</span>)}</div><p>Firm names are examples for research, not a ranking. Team structure, geography, product mix and internship availability change over time; verify each current program on the employer’s official careers site.</p></section>
        <section className="analysis-grid">
          <article className="analysis-card"><span className="mini-label">INTERVIEW PRACTICE</span><h3>Practice this role directly</h3><Link href={`/interview?track=${encodeURIComponent(guide.name)}`}>Open Interview Studio →</Link></article>
          <article className="analysis-card"><span className="mini-label">AI PROFESSOR</span><h3>Build a personalized preparation plan</h3><Link href={`/professor?question=${encodeURIComponent(`Build me a complete preparation plan for a ${guide.name} internship: knowledge, courses, technicals, behavioral stories, networking, market awareness and weekly practice.`)}`}>Ask AI Professor →</Link></article>
        </section>
      </div>
    </SectionLayout>
  );
}
