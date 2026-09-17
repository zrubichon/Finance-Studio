import SectionLayout from "@/components/section-layout";

const careerGroups = [
  {
    group: "Markets & Investing",
    roles: [
      { role: "Sales & Trading", mission: "Price risk, execute client flow and understand how macro information moves markets.", knowledge: ["Rates", "FX", "Credit", "Equities", "Derivatives", "Market microstructure"] },
      { role: "Asset Management", mission: "Allocate capital, research securities and build portfolios around client objectives and risk budgets.", knowledge: ["Portfolio theory", "Valuation", "Macro", "Risk", "Performance attribution", "Research"] },
      { role: "Equity Research", mission: "Develop differentiated views on companies, earnings and valuation, then communicate the investment case clearly.", knowledge: ["Accounting", "Valuation", "Industry research", "Modeling", "Earnings", "Writing"] },
      { role: "Hedge Funds", mission: "Generate and manage investment ideas with explicit catalysts, downside cases and portfolio-level risk constraints.", knowledge: ["Security analysis", "Catalysts", "Risk", "Derivatives", "Macro", "Position sizing"] },
    ],
  },
  {
    group: "Deals & Private Capital",
    roles: [
      { role: "Investment Banking", mission: "Advise companies on M&A, capital raising and strategic transactions while building rigorous financial analysis.", knowledge: ["Accounting", "DCF", "Comps", "M&A", "Debt", "Financial modeling"] },
      { role: "Private Equity", mission: "Acquire businesses, use leverage thoughtfully and create value through operations, capital structure and exit strategy.", knowledge: ["LBO", "Debt capacity", "Cash flow", "Valuation", "IRR / MOIC", "Due diligence"] },
      { role: "Venture Capital", mission: "Evaluate early-stage companies, markets, founders and asymmetric upside with limited historical financial data.", knowledge: ["Market sizing", "Unit economics", "Cap tables", "Product", "Growth", "Portfolio construction"] },
    ],
  },
  {
    group: "Clients, Companies & Risk",
    roles: [
      { role: "Wealth Management", mission: "Translate financial markets into long-term plans that fit a client’s goals, constraints and behavior.", knowledge: ["Asset allocation", "Tax awareness", "Risk profiling", "Client communication", "Retirement", "Estate basics"] },
      { role: "Corporate Finance / FP&A", mission: "Help a company plan, budget, allocate capital and understand the financial consequences of operating decisions.", knowledge: ["Budgeting", "Forecasting", "KPIs", "Cash flow", "Variance analysis", "Capital allocation"] },
      { role: "Risk Management", mission: "Measure, challenge and monitor market, credit, liquidity and operational risks before losses become surprises.", knowledge: ["VaR", "Stress tests", "Credit risk", "Liquidity", "Limits", "Scenario analysis"] },
    ],
  },
];

const recruitingStack = [
  "Understand what the team actually does",
  "Master the technical foundation for that role",
  "Know current markets and one recent relevant event",
  "Prepare behavioral stories with evidence",
  "Practice concise answers under follow-up pressure",
  "Build role-specific vocabulary in English and French",
];

export default function CareersPage() {
  return (
    <SectionLayout
      activeSlug="careers"
      eyebrow="CAREERS IN FINANCE"
      title="Choose a career by understanding the work, not just the job title."
      description="Each path connects day-to-day responsibilities, technical knowledge, market awareness, recruiting expectations and the exact FinanceStudio modules you should master before interviewing."
    >
      <div className="workspace-stack">
        <section className="career-intro-grid">
          <article className="career-principle-card">
            <span className="mini-label">ROLE MAP</span>
            <h2>Markets, deals, investing, clients and control functions</h2>
            <p>FinanceStudio separates careers by the decisions you make, the clients you serve and the risks you own so that similar-sounding roles do not blur together.</p>
          </article>
          <article className="career-principle-card">
            <span className="mini-label">LEARNING PATH</span>
            <h2>Every role links back to the curriculum</h2>
            <p>When accounts are connected, your career target will automatically prioritize the courses, quizzes, news and interview questions that matter most for that path.</p>
          </article>
        </section>

        {careerGroups.map((group) => (
          <section className="career-group" key={group.group}>
            <div className="panel-heading">
              <div><span className="mini-label">CAREER FAMILY</span><h2>{group.group}</h2></div>
              <span className="connection-badge">{group.roles.length} paths</span>
            </div>
            <div className="role-grid">
              {group.roles.map((item) => (
                <article className="role-card" key={item.role}>
                  <h3>{item.role}</h3>
                  <p>{item.mission}</p>
                  <span className="control-label">KNOWLEDGE TO MASTER</span>
                  <div className="skill-chip-row">
                    {item.knowledge.map((skill) => <span key={skill}>{skill}</span>)}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}

        <section className="career-recruiting-panel">
          <div>
            <span className="mini-label">RECRUITING SYSTEM</span>
            <h2>From “I want a finance job” to interview-ready</h2>
            <p>The platform will turn a target role into a concrete preparation sequence rather than a random list of concepts.</p>
          </div>
          <div className="numbered-checklist">
            {recruitingStack.map((item, index) => (
              <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong></div>
            ))}
          </div>
        </section>
      </div>
    </SectionLayout>
  );
}
