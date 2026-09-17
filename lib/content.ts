export const navItems = [
  { slug: "markets", label: "Markets", labelFr: "Marchés", icon: "↗" },
  { slug: "news", label: "News & Analysis", labelFr: "Actualités & Analyses", icon: "◎" },
  { slug: "university", label: "Finance University", labelFr: "Université de Finance", icon: "◫" },
  { slug: "careers", label: "Careers", labelFr: "Métiers", icon: "◇" },
  { slug: "interview", label: "Interview Studio", labelFr: "Studio d’Entretien", icon: "◌" },
  { slug: "investing", label: "Investing Lab", labelFr: "Laboratoire d’Investissement", icon: "△" },
  { slug: "professor", label: "AI Professor", labelFr: "Professeur IA", icon: "✦" },
  { slug: "dictionary", label: "Dictionary", labelFr: "Dictionnaire", icon: "Aa" },
  { slug: "progress", label: "Progress", labelFr: "Progression", icon: "◔" },
  { slug: "themes", label: "Theme Studio", labelFr: "Studio de Thèmes", icon: "◉" },
] as const;

export const sectionContent: Record<string, { eyebrow: string; title: string; description: string; cards: { title: string; text: string; meta: string }[] }> = {
  markets: {
    eyebrow: "GLOBAL MARKETS",
    title: "See the market. Understand the mechanism.",
    description: "Track equities, rates, FX, commodities, volatility and credit with a teaching layer that explains why each move matters.",
    cards: [
      { title: "Equities", text: "US, Europe, Asia and emerging-market indices with sector context.", meta: "Live provider connection planned" },
      { title: "Rates", text: "Policy rates, sovereign curves, real yields and curve spreads with duration explanations.", meta: "Macro-first view" },
      { title: "FX & Commodities", text: "Currencies, energy, metals and macro links explained in plain language.", meta: "Global coverage" },
    ],
  },
  news: {
    eyebrow: "FINANCE INTELLIGENCE",
    title: "News that teaches you finance.",
    description: "Every major story is broken into facts, causes, market reaction, connected concepts, implications and scenarios to watch next.",
    cards: [
      { title: "What happened?", text: "A concise factual summary with timing, geography and primary actors.", meta: "Facts first" },
      { title: "Why it matters", text: "Asset-class effects, transmission channels and the finance concepts behind the move.", meta: "Beginner → Professional" },
      { title: "What next?", text: "Key data releases, catalysts and scenario branches without presenting speculation as fact.", meta: "Scenario framework" },
    ],
  },
  university: {
    eyebrow: "4-YEAR CURRICULUM",
    title: "A finance degree, rebuilt for active learning.",
    description: "Year 1 foundations through Year 4 professional finance, with the same knowledge available in beginner, intermediate and professional explanation modes.",
    cards: [
      { title: "Year 1 · Foundations", text: "Markets, economics, accounting, statistics, TVM, risk and return.", meta: "Core vocabulary" },
      { title: "Year 2 · Core Finance", text: "Valuation, corporate finance, fixed income, equities, derivatives and portfolio theory.", meta: "Technical core" },
      { title: "Years 3–4 · Professional", text: "IB, S&T, asset management, PE, credit, alternatives, advanced modeling and real cases.", meta: "Career depth" },
    ],
  },
  careers: {
    eyebrow: "CAREER PATHS",
    title: "Learn what each finance job actually requires.",
    description: "Explore responsibilities, day-to-day work, technical knowledge, recruiting expectations and interview preparation by career.",
    cards: [
      { title: "Markets", text: "Sales & Trading, research, asset management and hedge funds.", meta: "Market-facing" },
      { title: "Deals", text: "Investment banking, private equity, venture capital and corporate development.", meta: "Transaction-focused" },
      { title: "Advisory & Control", text: "Wealth management, risk, treasury, corporate finance and more.", meta: "Client & enterprise" },
    ],
  },
  interview: {
    eyebrow: "INTERVIEW STUDIO",
    title: "Practice until your reasoning sounds professional.",
    description: "Technical, behavioral, market, mental-math and case questions with ideal-answer structure, follow-ups and feedback.",
    cards: [
      { title: "Technical", text: "Accounting, valuation, markets, options, bonds, macro and role-specific questions.", meta: "Hundreds planned" },
      { title: "Mock Interview", text: "Answer live prompts and receive feedback on accuracy, structure and vocabulary.", meta: "AI feedback" },
      { title: "Company Prep", text: "Preparation tracks for major banks, asset managers and investment firms.", meta: "Publicly documented formats" },
    ],
  },
  investing: {
    eyebrow: "INVESTING LAB",
    title: "Learn by making decisions with virtual capital.",
    description: "Build a paper portfolio, record your thesis, measure contribution and let the virtual professor turn mistakes into lessons.",
    cards: [
      { title: "$100k Paper Portfolio", text: "Practice allocation and security selection without real money.", meta: "Simulation only" },
      { title: "Thesis Journal", text: "State the catalyst, valuation case, risks and time horizon before each decision.", meta: "Decision discipline" },
      { title: "Professor Review", text: "Understand what drove performance and which concepts you should revisit.", meta: "Learning loop" },
    ],
  },
  professor: {
    eyebrow: "AI PROFESSOR",
    title: "A finance tutor that adapts to how you learn.",
    description: "Ask for a simpler explanation, numerical proof, visual intuition, interview framing or professional vocabulary from any lesson.",
    cards: [
      { title: "Explain it differently", text: "Switch analogy, example, formula and professional framing without losing depth.", meta: "Adaptive teaching" },
      { title: "Diagnose mistakes", text: "The professor identifies the exact misconception and rebuilds the concept step by step.", meta: "Error-based learning" },
      { title: "Check mastery", text: "Follow-up questions verify that you can apply the concept rather than only recognize it.", meta: "Active recall" },
    ],
  },
  dictionary: {
    eyebrow: "FINANCE DICTIONARY",
    title: "Build bilingual professional vocabulary.",
    description: "Definitions connect French and English terms, formulas, examples, related concepts, interview use and real market context.",
    cards: [
      { title: "Duration / duration", text: "Definition, intuition, formula, numerical example and rate-risk connection.", meta: "FR + EN" },
      { title: "Credit spread / écart de crédit", text: "Understand compensation for credit risk and how spreads move through the cycle.", meta: "Connected concepts" },
      { title: "Implied volatility / volatilité implicite", text: "From beginner intuition to option-pricing interpretation.", meta: "Multi-level explanation" },
    ],
  },
  progress: {
    eyebrow: "KNOWLEDGE MAP",
    title: "Know exactly what you know — and what to learn next.",
    description: "Track course completion, quiz accuracy, vocabulary, interview performance, strengths and weak areas.",
    cards: [
      { title: "Mastery", text: "Topic-level confidence across equities, fixed income, accounting, derivatives and more.", meta: "Skill map" },
      { title: "Learning Streak", text: "Build consistency without turning the product into a distraction-heavy game.", meta: "Focused motivation" },
      { title: "Next Best Lesson", text: "Recommendations based on prerequisites and your recent mistakes.", meta: "Personalized path" },
    ],
  },
  themes: {
    eyebrow: "THEME STUDIO",
    title: "Make FinanceStudio feel like your workspace.",
    description: "Customize color, density, dashboard modules and visual tone while preserving professional readability.",
    cards: [
      { title: "Finance Girl", text: "Cream, burgundy, blush and champagne with restrained professional styling.", meta: "Soft editorial" },
      { title: "Wall Street", text: "Dark terminal-inspired workspace with dense information hierarchy.", meta: "High contrast" },
      { title: "Your Theme", text: "Choose accent, background, card radius, density and preferred modules.", meta: "Fully personal" },
    ],
  },
};
