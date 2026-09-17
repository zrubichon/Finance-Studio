import SectionLayout from "@/components/section-layout";

const domains = [
  { name: "Markets & Instruments", state: "Not started", detail: "Equities, fixed income, FX, commodities and market structure" },
  { name: "Accounting & Statements", state: "Not started", detail: "Income statement, balance sheet, cash flow and analysis" },
  { name: "Corporate Finance & Valuation", state: "Not started", detail: "TVM, WACC, DCF, comps, capital structure and M&A" },
  { name: "Portfolio & Risk", state: "Not started", detail: "Diversification, CAPM, allocation, attribution and risk measures" },
  { name: "Derivatives", state: "Not started", detail: "Forwards, futures, options, Greeks and hedging" },
  { name: "Macro & Economics", state: "Not started", detail: "Inflation, growth, central banks, cycles and cross-asset links" },
  { name: "Interview Readiness", state: "Not started", detail: "Technical, behavioral, markets, math and case practice" },
  { name: "Professional Vocabulary", state: "Not started", detail: "Bilingual English/French finance terminology" },
];

const metrics = [
  { label: "Lessons completed", value: "0", note: "Will sync with user account" },
  { label: "Concepts mastered", value: "0", note: "Mastery requires successful recall" },
  { label: "Interview drills", value: "0", note: "Scoring backend comes next" },
  { label: "Current streak", value: "0 days", note: "No artificial progress prefilled" },
];

export default function ProgressPage() {
  return (
    <SectionLayout
      activeSlug="progress"
      eyebrow="KNOWLEDGE MAP"
      title="See what you know, what you only recognize and what you should learn next."
      description="Progress will be based on completed lessons, active recall, quizzes, interview performance and repeated mistakes. This foundation page intentionally starts at zero until authentication and persistence are connected."
    >
      <div className="workspace-stack">
        <section className="progress-metric-grid">
          {metrics.map((item) => (
            <article className="progress-metric-card" key={item.label}>
              <span className="control-label">{item.label.toUpperCase()}</span>
              <strong>{item.value}</strong>
              <p>{item.note}</p>
            </article>
          ))}
        </section>

        <section className="knowledge-map-panel">
          <div className="panel-heading">
            <div><span className="mini-label">FINANCE KNOWLEDGE MAP</span><h2>Your mastery by domain</h2></div>
            <span className="connection-badge">Account persistence not connected yet</span>
          </div>
          <div className="knowledge-domain-grid">
            {domains.map((domain, index) => (
              <article className="knowledge-domain-card" key={domain.name}>
                <div className="knowledge-domain-head"><span>{String(index + 1).padStart(2, "0")}</span><strong>{domain.state}</strong></div>
                <h3>{domain.name}</h3>
                <p>{domain.detail}</p>
                <div className="empty-progress-bar"><span /></div>
              </article>
            ))}
          </div>
        </section>

        <section className="next-best-panel">
          <div><span className="mini-label">NEXT BEST LESSON</span><h2>Start with Year 1 · Financial system & market structure</h2></div>
          <p>Once learning data exists, this recommendation will be generated from prerequisites, weak concepts, spaced-repetition timing and the career track the user selects.</p>
        </section>
      </div>
    </SectionLayout>
  );
}
