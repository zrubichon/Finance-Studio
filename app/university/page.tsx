import SectionLayout from "@/components/section-layout";

const years = [
  {
    year: "Year 1",
    name: "Foundations",
    outcome: "Understand the financial system, core instruments, accounting language, economics and quantitative foundations.",
    modules: [
      "Financial system & market structure",
      "Stocks, bonds, ETFs & funds",
      "Money, banking & central banks",
      "Time value of money",
      "Risk, return & diversification",
      "Microeconomics for finance",
      "Macroeconomics for markets",
      "Financial accounting I",
      "Statistics & probability",
      "Excel foundations for finance",
      "Financial vocabulary FR ↔ EN",
      "Reading financial news",
    ],
  },
  {
    year: "Year 2",
    name: "Core Finance",
    outcome: "Build the technical core used in valuation, portfolio analysis, fixed income, derivatives and corporate finance.",
    modules: [
      "Corporate finance",
      "Financial statement analysis",
      "Equity valuation",
      "DCF & relative valuation",
      "Fixed income & yield curves",
      "Duration & convexity",
      "Portfolio theory & CAPM",
      "Derivatives foundations",
      "Options & option Greeks",
      "FX & international finance",
      "Econometrics foundations",
      "Financial modeling I",
    ],
  },
  {
    year: "Year 3",
    name: "Applied Finance",
    outcome: "Apply core theory to professional roles, real securities, transactions and market decisions.",
    modules: [
      "Investment banking",
      "Sales & Trading",
      "Asset management",
      "Wealth management",
      "Equity research",
      "Credit analysis",
      "Private equity",
      "Venture capital",
      "Risk management",
      "M&A analysis",
      "Financial modeling II",
      "Real-company case studies",
    ],
  },
  {
    year: "Year 4",
    name: "Professional Finance",
    outcome: "Reach interview-ready and analyst-level fluency in advanced products, strategy and professional decision-making.",
    modules: [
      "Advanced valuation",
      "Leveraged finance",
      "Advanced fixed income",
      "Advanced derivatives",
      "Macro trading frameworks",
      "Hedge funds & alternatives",
      "Portfolio construction",
      "Behavioral finance",
      "Structured products",
      "Regulation & ethics",
      "Professional market communication",
      "Capstone investment / deal case",
    ],
  },
];

const modes = [
  {
    mode: "Beginner",
    text: "Same knowledge, but with slower explanations, analogies, diagrams, numerical examples and every technical word defined.",
  },
  {
    mode: "Intermediate",
    text: "Same syllabus with tighter explanations, formulas, market links and less repetition of basic definitions.",
  },
  {
    mode: "Professional",
    text: "Same concepts expressed with desk-level vocabulary, assumptions, edge cases, interview framing and cross-asset implications.",
  },
];

export default function UniversityPage() {
  return (
    <SectionLayout
      activeSlug="university"
      eyebrow="FINANCE UNIVERSITY · YEAR 1 → YEAR 4"
      title="Learn finance as if the entire degree lived inside one product."
      description="The curriculum is sequential and prerequisite-based, but every concept can be revisited at Beginner, Intermediate or Professional depth. Beginner mode never removes knowledge; it only teaches it more explicitly."
    >
      <div className="workspace-stack">
        <section className="mode-principle-grid">
          {modes.map((item) => (
            <article className="mode-principle-card" key={item.mode}>
              <span className="mini-label">{item.mode.toUpperCase()}</span>
              <h2>{item.mode} explanation</h2>
              <p>{item.text}</p>
            </article>
          ))}
        </section>

        <section className="curriculum-stack">
          {years.map((item, yearIndex) => (
            <article className="curriculum-year" key={item.year}>
              <div className="curriculum-year-head">
                <div className="year-number">0{yearIndex + 1}</div>
                <div>
                  <span className="mini-label">{item.year}</span>
                  <h2>{item.name}</h2>
                  <p>{item.outcome}</p>
                </div>
              </div>
              <div className="module-grid">
                {item.modules.map((module, index) => (
                  <div className="module-item" key={module}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{module}</strong>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </section>

        <section className="learning-loop-panel">
          <div>
            <span className="mini-label">HOW A LESSON WORKS</span>
            <h2>Concept → intuition → math → market → interview → recall</h2>
          </div>
          <div className="learning-loop-steps">
            <span>1. Explain</span>
            <span>2. Visualize</span>
            <span>3. Calculate</span>
            <span>4. Apply</span>
            <span>5. Interview</span>
            <span>6. Quiz</span>
            <span>7. Revisit weak points</span>
          </div>
        </section>
      </div>
    </SectionLayout>
  );
}
