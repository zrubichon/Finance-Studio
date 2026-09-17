import SectionLayout from "@/components/section-layout";

const thesisQuestions = [
  "What exactly is the investment thesis?",
  "Which valuation or macro assumption matters most?",
  "What is the catalyst and expected time horizon?",
  "What evidence would prove the thesis wrong?",
  "What is the downside case and how large could the loss be?",
  "How does this position change total portfolio risk?",
];

const attributionSteps = [
  { title: "Return", text: "Measure what the portfolio actually did over the selected period." },
  { title: "Contribution", text: "Identify which positions, sectors and asset classes added or subtracted performance." },
  { title: "Driver", text: "Separate market beta, rates, FX, earnings, valuation and thesis-specific effects." },
  { title: "Lesson", text: "Convert the result into a concept to review, not simply a win or loss label." },
];

export default function InvestingPage() {
  return (
    <SectionLayout
      activeSlug="investing"
      eyebrow="INVESTING LAB · SIMULATION ONLY"
      title="Learn investing by making decisions, documenting them and reviewing the outcome."
      description="The lab is designed around virtual capital only. It teaches portfolio construction, security analysis, risk, attribution and disciplined decision-making without requiring real-money trading."
    >
      <div className="workspace-stack">
        <section className="investing-hero-grid">
          <article className="paper-portfolio-card">
            <span className="mini-label">VIRTUAL PORTFOLIO</span>
            <h2>$100,000 starting simulation capital</h2>
            <p>Future market-data connections will power paper positions across approved asset classes. No order is sent to a broker and no real money is used.</p>
            <div className="portfolio-state-row">
              <div><span>Cash</span><strong>Not initialized</strong></div>
              <div><span>Positions</span><strong>0</strong></div>
              <div><span>Performance</span><strong>—</strong></div>
            </div>
          </article>
          <article className="risk-rules-card">
            <span className="mini-label">LEARNING BEFORE P&L</span>
            <h2>Every decision needs a reason</h2>
            <p>A simulated trade is only useful if you record what you believed before the outcome was known. FinanceStudio will compare your original thesis with what actually happened.</p>
          </article>
        </section>

        <section className="thesis-panel">
          <div className="panel-heading">
            <div><span className="mini-label">THESIS JOURNAL</span><h2>Questions to answer before a simulated investment</h2></div>
            <span className="connection-badge">Required before “buy”</span>
          </div>
          <div className="thesis-question-grid">
            {thesisQuestions.map((question, index) => (
              <div className="thesis-question" key={question}>
                <span>{String(index + 1).padStart(2, "0")}</span><strong>{question}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="attribution-panel">
          <div>
            <span className="mini-label">PERFORMANCE ATTRIBUTION</span>
            <h2>Do not stop at “the portfolio went down.”</h2>
            <p>Performance becomes educational when the platform separates what moved, why it moved and whether the original decision process was sound.</p>
          </div>
          <div className="attribution-grid">
            {attributionSteps.map((item, index) => (
              <article key={item.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="professor-review-strip">
          <div><span className="mini-label">VIRTUAL PROFESSOR REVIEW</span><h2>Mistake → explanation → concept → retry</h2></div>
          <p>If a thesis fails, the future AI layer will identify whether the issue came from valuation, macro assumptions, risk sizing, missing evidence or simple randomness, then link you back to the relevant course.</p>
        </section>
      </div>
    </SectionLayout>
  );
}
