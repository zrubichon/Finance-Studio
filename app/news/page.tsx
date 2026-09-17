import SectionLayout from "@/components/section-layout";

const analysisSteps = [
  ["01", "What happened?", "Facts, time, geography, institutions, companies and the exact market event."],
  ["02", "What caused it?", "Separate the immediate catalyst from deeper macro, policy, earnings, positioning or geopolitical drivers."],
  ["03", "Why does it matter?", "Explain the financial mechanism instead of assuming the reader already knows it."],
  ["04", "What moved?", "Map the reaction across equities, rates, FX, commodities, volatility and credit."],
  ["05", "Why did each asset react?", "Connect price action to discount rates, growth, inflation, cash flows, risk premia and expectations."],
  ["06", "What is connected?", "Link the story to previous events, companies, countries, sectors and Finance University lessons."],
  ["07", "What comes next?", "List the next data, speeches, earnings, votes, policy decisions or other catalysts to monitor."],
  ["08", "Scenario map", "Show plausible branches and what evidence would support each one, without presenting a forecast as fact."],
];

const coverage = [
  "Central banks & monetary policy",
  "Inflation, labor & growth",
  "Equities & earnings",
  "Rates & sovereign debt",
  "Credit markets",
  "FX & currencies",
  "Energy & commodities",
  "M&A, IPOs & capital markets",
  "Banking & financial institutions",
  "Private markets",
  "Regulation",
  "Geopolitics with financial impact",
  "Technology & AI in markets",
  "Digital assets",
];

const sourceLayers = [
  { title: "Primary", text: "Central banks, regulators, statistical agencies, company filings, earnings releases and investor relations." },
  { title: "High-quality reporting", text: "Reputable financial journalism used for context, interviews and verified reporting around the primary facts." },
  { title: "FinanceStudio analysis", text: "Original educational synthesis that clearly separates facts, interpretation and possible scenarios." },
];

export default function NewsPage() {
  return (
    <SectionLayout
      activeSlug="news"
      eyebrow="FINANCE INTELLIGENCE"
      title="Do not just read the news. Learn the financial system through it."
      description="FinanceStudio is designed to turn major market stories into complete learning objects: facts, causes, mechanisms, cross-asset reaction, linked concepts, next catalysts and clearly labeled scenarios."
    >
      <div className="workspace-stack">
        <section className="news-blueprint-panel">
          <div className="panel-heading">
            <div>
              <span className="mini-label">ARTICLE BLUEPRINT</span>
              <h2>Every important story follows the same reasoning architecture</h2>
            </div>
            <span className="connection-badge"><span className="status-dot" /> news ingestion pending</span>
          </div>
          <div className="news-analysis-grid">
            {analysisSteps.map(([number, title, text]) => (
              <article className="news-analysis-step" key={number}>
                <span>{number}</span>
                <div><strong>{title}</strong><p>{text}</p></div>
              </article>
            ))}
          </div>
        </section>

        <section className="news-two-column">
          <article className="coverage-panel">
            <span className="mini-label">GLOBAL COVERAGE</span>
            <h2>USA + Europe priority, with a global lens</h2>
            <div className="coverage-chips">
              {coverage.map((item) => <span key={item}>{item}</span>)}
            </div>
          </article>
          <article className="coverage-panel">
            <span className="mini-label">REGION FILTERS</span>
            <h2>Choose what you want to follow</h2>
            <div className="coverage-chips">
              {["Global", "USA", "Europe", "UK", "Asia", "China", "Japan", "Emerging Markets", "My Markets"].map((item) => <span key={item}>{item}</span>)}
            </div>
          </article>
        </section>

        <section className="source-panel">
          <div>
            <span className="mini-label">SOURCE DISCIPLINE</span>
            <h2>Facts and analysis must never be blended invisibly.</h2>
          </div>
          <div className="source-layer-grid">
            {sourceLayers.map((layer, index) => (
              <article key={layer.title}>
                <span>0{index + 1}</span>
                <strong>{layer.title}</strong>
                <p>{layer.text}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </SectionLayout>
  );
}
