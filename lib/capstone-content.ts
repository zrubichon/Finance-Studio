import type { FinanceLesson } from "./lesson-content";

export const capstoneInvestmentDealCaseLesson: FinanceLesson = {
  slug: "year-4-capstone-investment-deal-case",
  year: { en: "Year 4 · Professional Finance", fr: "Année 4 · Finance professionnelle / Professional Finance" },
  domain: { en: "Capstone Investment / Deal Case", fr: "Cas final d’investissement / Capstone investment & deal case" },
  title: { en: "Capstone Investment / Deal Case", fr: "Cas final d’investissement / Capstone investment & deal case" },
  subtitle: {
    en: "Synthesize accounting, valuation, markets, portfolio thinking, deal analysis, risk and professional communication into one end-to-end decision.",
    fr: "Synthétiser comptabilité / accounting, valorisation / valuation, marchés, portefeuille / portfolio, analyse de transaction / deal analysis, risque et communication professionnelle dans une décision de bout en bout.",
  },
  duration: { en: "210–270 min", fr: "210–270 min" },
  prerequisites: [
    { en: "Financial Statement Analysis", fr: "Analyse des états financiers / Financial Statement Analysis" },
    { en: "DCF & Relative Valuation", fr: "DCF & valorisation relative / Relative Valuation" },
    { en: "M&A Analysis", fr: "Analyse M&A / M&A Analysis" },
    { en: "Leveraged Finance", fr: "Finance à effet de levier / Leveraged Finance" },
    { en: "Portfolio Construction", fr: "Construction de portefeuille / Portfolio Construction" },
    { en: "Regulation & Ethics", fr: "Réglementation & éthique / Regulation & Ethics" },
    { en: "Professional Market Communication", fr: "Communication professionnelle de marché / Professional Market Communication" },
  ],
  objectives: [
    { en: "Turn an ambiguous finance brief into a structured decision process.", fr: "Transformer un brief financier ambigu en processus de décision structuré." },
    { en: "Diagnose a company using operating, accounting and cash-flow evidence.", fr: "Diagnostiquer une entreprise à partir des données opérationnelles, comptables / accounting et de cash flow." },
    { en: "Build a coherent forecast and identify the assumptions that truly drive value.", fr: "Construire un forecast cohérent et identifier les hypothèses qui déterminent réellement la valeur." },
    { en: "Triangulate DCF, trading comps and transaction logic rather than relying on one valuation output.", fr: "Croiser DCF, trading comps et logique de transaction plutôt que dépendre d’une seule valorisation." },
    { en: "Evaluate financing, leverage, accretion/dilution and downside risk.", fr: "Évaluer financement, leverage, accretion/dilution et downside risk." },
    { en: "Translate macro and market conditions into company-specific implications.", fr: "Traduire les conditions macro et de marché en implications spécifiques à l’entreprise." },
    { en: "Make a recommendation with explicit catalysts, risks, scenarios and invalidation conditions.", fr: "Formuler une recommandation avec catalysts, risques, scénarios et conditions d’invalidation explicites." },
    { en: "Defend the recommendation in an investment-committee or interview-style discussion.", fr: "Défendre la recommandation dans un investment committee ou une discussion de type entretien / interview." },
  ],
  overviewFlow: {
    title: { en: "From raw case file to defendable decision", fr: "Du dossier brut à une décision défendable" },
    steps: [
      { title: { en: "Frame", fr: "Cadrer" }, detail: { en: "Decision · constraints · evidence", fr: "Décision · contraintes · preuves" } },
      { title: { en: "Analyze", fr: "Analyser" }, detail: { en: "Business · statements · cash flow", fr: "Business · états financiers · cash flow" } },
      { title: { en: "Value", fr: "Valoriser" }, detail: { en: "DCF · comps · deal math", fr: "DCF · comparables / comps · deal math" } },
      { title: { en: "Stress", fr: "Tester" }, detail: { en: "Scenarios · financing · risk", fr: "Scénarios · financement · risque" } },
      { title: { en: "Decide", fr: "Décider" }, detail: { en: "Recommendation · catalysts · invalidation", fr: "Recommandation · catalysts · invalidation" } },
      { title: { en: "Communicate", fr: "Communiquer" }, detail: { en: "Memo · pitch · challenge", fr: "Memo · pitch · challenge" } },
    ],
  },
  sections: [
    {
      id: "case-brief",
      kicker: { en: "01 · CASE BRIEF", fr: "01 · BRIEF DU CAS" },
      title: { en: "Start with the decision, not the spreadsheet", fr: "Commence par la décision, pas par le spreadsheet" },
      coreFacts: [
        { en: "The capstone company is Asterion Payments, a fictional payments platform used to make the case self-contained.", fr: "L’entreprise du capstone est Asterion Payments, une plateforme de paiements fictive afin que le cas soit entièrement autonome." },
        { en: "Asterion has $1.20bn revenue, $240m EBITDA, $180m EBIT, $150m free cash flow and $360m net debt.", fr: "Asterion affiche 1,20 Md$ de revenue, 240 M$ d’EBITDA, 180 M$ d’EBIT, 150 M$ de free cash flow et 360 M$ de net debt." },
        { en: "With 100m diluted shares at $28, equity value is $2.80bn and enterprise value is approximately $3.16bn.", fr: "Avec 100 M d’actions diluées à 28 $, l’equity value est de 2,80 Md$ et l’enterprise value d’environ 3,16 Md$." },
        { en: "A strategic buyer is considering a $35-per-share cash offer, while your investment committee is also deciding whether to own the stock independently.", fr: "Un acquéreur stratégique envisage une offre cash de 35 $ par action, tandis que ton investment committee doit aussi décider s’il faut détenir l’action indépendamment." },
      ],
      explanation: {
        Beginner: {
          en: "Before calculating anything, write down the exact decisions: is the stock attractive at $28, and is a $35 acquisition price financially defensible? Every analysis that follows must help answer one of those questions.",
          fr: "Avant tout calcul, écris les décisions exactes : l’action est-elle attractive à 28 $, et un prix d’acquisition de 35 $ est-il financièrement défendable ? Toute l’analyse qui suit doit aider à répondre à l’une de ces questions.",
        },
        Intermediate: {
          en: "Convert the brief into a decision tree: stand-alone value, strategic value, financing capacity, downside protection and catalysts. This prevents the model from becoming a collection of unrelated calculations.",
          fr: "Transforme le brief en arbre de décision : stand-alone value, strategic value, capacité de financement, downside protection et catalysts. Cela évite que le modèle devienne une collection de calculs sans lien.",
        },
        Professional: {
          en: "A professional case begins with mandate, decision owner, time horizon, constraints, required return and evidence standard. The same company can produce different recommendations for a long-only PM, merger-arb desk or strategic acquirer because the decisions differ.",
          fr: "Un cas professionnel commence par le mandat, le decision owner, l’horizon, les contraintes, le required return et le niveau de preuve exigé. La même entreprise peut conduire à des recommandations différentes pour un long-only PM, un merger-arb desk ou un acquéreur stratégique car les décisions diffèrent.",
        },
      },
      vocabulary: [
        { en: "Decision owner", fr: "decision owner / décideur", definition: { en: "Person or committee accountable for the final financial decision.", fr: "Personne ou comité responsable de la décision financière finale." } },
        { en: "Enterprise value", fr: "enterprise value / valeur d’entreprise", definition: { en: "Value of the operating business attributable to debt and equity capital providers.", fr: "Valeur de l’activité opérationnelle attribuable aux apporteurs de dette et de capitaux propres / equity." } },
      ],
    },
    {
      id: "business-quality",
      kicker: { en: "02 · BUSINESS QUALITY", fr: "02 · QUALITÉ DU BUSINESS" },
      title: { en: "Understand how the company makes money before forecasting it", fr: "Comprends comment l’entreprise gagne de l’argent avant de la prévoir" },
      coreFacts: [
        { en: "Asterion earns transaction fees and recurring software revenue from merchants.", fr: "Asterion génère des transaction fees et du recurring software revenue auprès des commerçants." },
        { en: "Revenue growth is 14%, but payment-volume growth is 11%, implying some benefit from pricing and mix.", fr: "La croissance du revenue est de 14 %, contre 11 % pour le payment volume, ce qui implique un effet positif de pricing et de mix." },
        { en: "Gross retention is 94% and net revenue retention is 108%, showing expansion within the installed customer base.", fr: "La gross retention est de 94 % et la net revenue retention de 108 %, indiquant une expansion au sein de la base clients existante." },
        { en: "The largest ten customers represent 24% of revenue, creating meaningful but not dominant concentration risk.", fr: "Les dix plus gros clients représentent 24 % du revenue, créant un concentration risk significatif mais non dominant." },
      ],
      explanation: {
        Beginner: {
          en: "A forecast should come from the business engine. For Asterion, ask how payment volume, take rate, software subscriptions, retention and customer wins combine to create revenue.",
          fr: "Un forecast doit venir du moteur économique. Pour Asterion, demande comment payment volume, take rate, abonnements software, retention et nouveaux clients se combinent pour créer le revenue.",
        },
        Intermediate: {
          en: "Separate structural drivers from temporary ones. Pricing can support revenue for a period, but long-run growth needs durable volume, customer growth or product expansion.",
          fr: "Sépare les drivers structurels des drivers temporaires. Le pricing peut soutenir le revenue pendant un temps, mais la croissance long terme exige du volume durable, de nouveaux clients ou une expansion produit.",
        },
        Professional: {
          en: "Map unit economics and competitive advantage to forecast persistence. High retention, embedded workflows and switching costs can support durable margins, but regulation, platform disintermediation and customer bargaining power can compress economics.",
          fr: "Relie unit economics et avantage concurrentiel à la persistance du forecast. Une retention élevée, des workflows intégrés et des switching costs peuvent soutenir les marges, mais regulation, désintermédiation des plateformes et pouvoir de négociation client peuvent comprimer l’économie.",
        },
      },
      marketConnection: {
        en: "Payments companies often re-rate when investors change assumptions about durable growth, margin scalability or competitive intensity rather than because of one quarter alone.",
        fr: "Les sociétés de paiements se re-ratent souvent lorsque les investisseurs modifient leurs hypothèses de croissance durable, de margin scalability ou d’intensité concurrentielle, et pas seulement à cause d’un trimestre.",
      },
      vocabulary: [
        { en: "Take rate", fr: "take rate / taux de prélèvement", definition: { en: "Revenue captured as a percentage of processed payment volume.", fr: "Revenue capté en pourcentage du payment volume traité." } },
        { en: "Net revenue retention", fr: "net revenue retention / rétention nette", definition: { en: "Revenue retained from an existing cohort after churn, contraction and expansion.", fr: "Revenue conservé sur une cohorte existante après churn, contraction et expansion." } },
      ],
    },
    {
      id: "financial-diagnostics",
      kicker: { en: "03 · FINANCIAL DIAGNOSTICS", fr: "03 · DIAGNOSTIC FINANCIER" },
      title: { en: "Reconcile earnings, cash flow and balance-sheet risk", fr: "Réconcilie earnings, cash flow et risque de bilan / balance sheet" },
      coreFacts: [
        { en: "EBITDA margin is 20% and EBIT margin is 15%, implying $60m of depreciation and amortization.", fr: "La marge EBITDA est de 20 % et la marge EBIT de 15 %, impliquant 60 M$ de depreciation & amortization." },
        { en: "Free cash flow of $150m equals 62.5% of EBITDA, so cash conversion is good but not perfect.", fr: "Le free cash flow de 150 M$ représente 62,5 % de l’EBITDA ; la cash conversion est donc bonne mais imparfaite." },
        { en: "Net debt / EBITDA is 1.5x at the current capital structure.", fr: "Net debt / EBITDA est de 1,5x dans la structure de capital actuelle." },
        { en: "Working-capital needs and capitalized software costs are the two areas most likely to distort simple earnings comparisons.", fr: "Les besoins en working capital et les capitalized software costs sont les deux zones les plus susceptibles de fausser une comparaison simple des earnings." },
      ],
      explanation: {
        Beginner: {
          en: "Profit is not the same as cash. Check whether reported earnings become cash after working capital, capital expenditure, taxes and interest.",
          fr: "Le profit n’est pas la même chose que le cash. Vérifie si les earnings comptables deviennent réellement du cash après working capital, capex, taxes et intérêts.",
        },
        Intermediate: {
          en: "Bridge EBITDA to free cash flow and identify recurring versus non-recurring adjustments. A valuation built on adjusted EBITDA is only useful if the adjustments are economically justified.",
          fr: "Fais le bridge de l’EBITDA vers le free cash flow et distingue les ajustements récurrents des non-récurrents. Une valorisation fondée sur adjusted EBITDA n’est utile que si les ajustements sont économiquement justifiés.",
        },
        Professional: {
          en: "Quality of earnings is a valuation input. Aggressive capitalization, acquisition-related add-backs or structurally rising working-capital needs can make headline EBITDA overstate distributable economics and sustainable leverage capacity.",
          fr: "La quality of earnings est un input de valorisation. Une capitalisation agressive, des acquisition add-backs ou des besoins structurellement croissants en working capital peuvent faire surestimer l’économie distribuable et la sustainable leverage capacity par l’EBITDA publié.",
        },
      },
      formula: {
        label: { en: "Cash conversion", fr: "Cash conversion / conversion en trésorerie" },
        expression: "FCF conversion = Free cash flow ÷ EBITDA",
        explanation: { en: "Shows how much EBITDA becomes free cash flow after cash costs and investment.", fr: "Montre quelle part de l’EBITDA devient du free cash flow après coûts cash et investissements." },
        workedExample: { en: "$150m ÷ $240m = 62.5% FCF conversion.", fr: "150 M$ ÷ 240 M$ = 62,5 % de FCF conversion." },
      },
      vocabulary: [
        { en: "Quality of earnings", fr: "quality of earnings / qualité des résultats", definition: { en: "Assessment of how sustainable and cash-backed reported earnings are.", fr: "Évaluation du caractère durable et soutenu par du cash des earnings publiés." } },
        { en: "Add-back", fr: "add-back / réintégration", definition: { en: "Expense added back to reported profit to create an adjusted metric.", fr: "Charge réintégrée au profit publié afin de produire une métrique ajustée." } },
      ],
    },
    {
      id: "forecast",
      kicker: { en: "04 · FORECAST", fr: "04 · PRÉVISIONS / FORECAST" },
      title: { en: "Make the forecast internally consistent before making it optimistic", fr: "Rends le forecast cohérent avant de le rendre optimiste" },
      coreFacts: [
        { en: "Base case assumes revenue growth fades from 14% to 10%, 9%, 8%, 7% and 6% over five years.", fr: "Le base case suppose que la croissance du revenue ralentit de 14 % à 10 %, 9 %, 8 %, 7 % puis 6 % sur cinq ans." },
        { en: "Base EBITDA margin expands gradually from 20% to 23% as software mix and scale improve.", fr: "La marge EBITDA du base case progresse graduellement de 20 % à 23 % grâce au mix software et aux économies d’échelle." },
        { en: "Bear case combines 4–6% growth, a 19% terminal EBITDA margin and weaker cash conversion.", fr: "Le bear case combine une croissance de 4–6 %, une marge EBITDA terminale de 19 % et une cash conversion plus faible." },
        { en: "Bull case assumes stronger cross-sell, 9% terminal growth and a 25% EBITDA margin.", fr: "Le bull case suppose davantage de cross-sell, une croissance terminale de 9 % et une marge EBITDA de 25 %." },
      ],
      explanation: {
        Beginner: {
          en: "A forecast is a set of connected assumptions. If growth slows but margins rise, explain why. If margins rise because of scale, make sure operating costs grow more slowly than revenue.",
          fr: "Un forecast est un ensemble d’hypothèses liées. Si la croissance ralentit mais que les marges montent, explique pourquoi. Si les marges montent grâce à l’échelle, les coûts opérationnels doivent croître plus lentement que le revenue.",
        },
        Intermediate: {
          en: "Identify the two or three variables that dominate value. For Asterion they are sustainable revenue growth, EBITDA margin and cash conversion; false precision elsewhere matters less.",
          fr: "Identifie les deux ou trois variables qui dominent la valeur. Pour Asterion, il s’agit de la croissance durable du revenue, de la marge EBITDA et de la cash conversion ; la fausse précision ailleurs compte moins.",
        },
        Professional: {
          en: "Forecasting discipline means linking operating drivers to accounting outputs, preserving balance-sheet logic and avoiding circular assumptions. Scenario design should capture different economic regimes, not just arbitrary percentage changes.",
          fr: "La discipline de forecasting consiste à relier operating drivers et outputs comptables, préserver la logique du balance sheet et éviter les hypothèses circulaires. Les scénarios doivent représenter différents régimes économiques, pas seulement des variations arbitraires de pourcentage.",
        },
      },
      vocabulary: [
        { en: "Driver-based forecast", fr: "driver-based forecast / prévision fondée sur les drivers", definition: { en: "Forecast built from underlying operating variables rather than top-down percentage guesses.", fr: "Prévision construite à partir des variables opérationnelles plutôt que de simples pourcentages top-down." } },
        { en: "False precision", fr: "false precision / fausse précision", definition: { en: "Using more numerical detail than the evidence can justify.", fr: "Utiliser davantage de précision numérique que ce que les preuves peuvent justifier." } },
      ],
    },
    {
      id: "valuation",
      kicker: { en: "05 · VALUATION TRIANGULATION", fr: "05 · TRIANGULATION DE VALORISATION / VALUATION" },
      title: { en: "Use several valuation lenses and understand why they disagree", fr: "Utilise plusieurs méthodes de valuation et comprends pourquoi elles divergent" },
      coreFacts: [
        { en: "At $28, Asterion trades at approximately 13.2x current EV / EBITDA.", fr: "À 28 $, Asterion se traite à environ 13,2x EV / EBITDA actuel." },
        { en: "At the proposed $35 offer, implied enterprise value is approximately $3.86bn, or 16.1x current EBITDA.", fr: "À l’offre proposée de 35 $, l’enterprise value implicite est d’environ 3,86 Md$, soit 16,1x l’EBITDA actuel." },
        { en: "Relevant peer trading multiples are assumed at 12x–15x forward EBITDA, while high-quality precedent transactions cluster at higher control multiples.", fr: "Les trading multiples des peers pertinents sont supposés à 12x–15x l’EBITDA forward, tandis que les precedent transactions de qualité se situent à des control multiples plus élevés." },
        { en: "The DCF base case uses a 9.0% WACC and 2.5% terminal growth rate; sensitivity to WACC and long-run margin is material.", fr: "Le DCF du base case utilise un WACC de 9,0 % et un terminal growth rate de 2,5 % ; la sensibilité au WACC et à la marge long terme est significative." },
      ],
      explanation: {
        Beginner: {
          en: "DCF asks what future cash flows are worth today. Comps ask how similar assets are priced. Transaction multiples ask what buyers paid for control. None is automatically correct.",
          fr: "Le DCF demande ce que valent aujourd’hui les cash flows futurs. Les comps regardent comment des actifs comparables sont pricés. Les transaction multiples regardent ce que des acheteurs ont payé pour le contrôle. Aucune méthode n’est automatiquement correcte.",
        },
        Intermediate: {
          en: "Triangulate ranges, not point estimates. If DCF supports $31–$37 and peer analysis supports $29–$34, a $35 offer may be defendable only with credible strategic synergies or a control premium.",
          fr: "Croise des ranges, pas des point estimates. Si le DCF soutient 31–37 $ et les peers 29–34 $, une offre à 35 $ peut être défendable seulement avec des synergies stratégiques crédibles ou un control premium.",
        },
        Professional: {
          en: "Differences between methods contain information. A high transaction value relative to unaffected trading value may reflect synergies, scarcity, control or overpayment. The analyst must decompose the bridge rather than average outputs mechanically.",
          fr: "Les différences entre méthodes contiennent de l’information. Une transaction value élevée par rapport à l’unaffected trading value peut refléter synergies, rareté, contrôle ou overpayment. L’analyste doit décomposer ce bridge plutôt que moyenner mécaniquement les outputs.",
        },
      },
      formula: {
        label: { en: "Current EV / EBITDA", fr: "EV / EBITDA actuel" },
        expression: "EV / EBITDA = ($2.80bn equity value + $0.36bn net debt) ÷ $0.24bn EBITDA",
        explanation: { en: "The multiple compares total operating-business value with a pre-interest operating earnings proxy.", fr: "Le multiple compare la valeur totale de l’activité opérationnelle avec un proxy de résultat avant intérêts." },
        workedExample: { en: "$3.16bn ÷ $0.24bn ≈ 13.2x.", fr: "3,16 Md$ ÷ 0,24 Md$ ≈ 13,2x." },
      },
      comparison: {
        title: { en: "What each method is really telling you", fr: "Ce que chaque méthode te dit réellement" },
        headers: [
          { en: "Method", fr: "Méthode" },
          { en: "Primary question", fr: "Question principale" },
          { en: "Main weakness", fr: "Faiblesse principale" },
        ],
        rows: [
          { cells: [
            { en: "DCF", fr: "DCF" },
            { en: "What are the company's future cash flows worth?", fr: "Combien valent les cash flows futurs de l’entreprise ?" },
            { en: "Highly sensitive to long-run assumptions", fr: "Très sensible aux hypothèses long terme" },
          ] },
          { cells: [
            { en: "Trading comps", fr: "Trading comps / comparables boursiers" },
            { en: "How does the market price similar companies?", fr: "Comment le marché price-t-il des entreprises similaires ?" },
            { en: "Peer selection and cycle can distort the range", fr: "La sélection des peers et le cycle peuvent fausser le range" },
          ] },
          { cells: [
            { en: "Precedent transactions", fr: "Precedent transactions / transactions comparables" },
            { en: "What have buyers paid for control?", fr: "Que paient les acheteurs pour le contrôle ?" },
            { en: "Deal-specific synergies and market regimes differ", fr: "Synergies et régimes de marché diffèrent selon les deals" },
          ] },
        ],
      },
      vocabulary: [
        { en: "Unaffected price", fr: "unaffected price / cours non affecté", definition: { en: "Share price before takeover speculation or transaction information moves the stock.", fr: "Cours de l’action avant que la spéculation ou l’information de transaction ne le fasse bouger." } },
        { en: "Control premium", fr: "control premium / prime de contrôle", definition: { en: "Premium paid to obtain control of a company relative to its unaffected market value.", fr: "Prime payée pour obtenir le contrôle d’une entreprise par rapport à sa valeur de marché non affectée." } },
      ],
    },
    {
      id: "deal-financing",
      kicker: { en: "06 · DEAL & FINANCING", fr: "06 · TRANSACTION & FINANCEMENT" },
      title: { en: "A good asset can still be a bad deal at the wrong price or financing mix", fr: "Un bon actif peut devenir un mauvais deal au mauvais prix ou avec le mauvais financement" },
      coreFacts: [
        { en: "The $35 offer implies a 25% premium to the $28 unaffected share price.", fr: "L’offre à 35 $ implique une prime de 25 % par rapport au cours unaffected de 28 $." },
        { en: "The buyer expects $90m of run-rate pre-tax synergies by year three.", fr: "L’acheteur prévoit 90 M$ de run-rate pre-tax synergies d’ici la troisième année." },
        { en: "If financed mostly with debt, the buyer must test pro-forma leverage, interest coverage and refinancing risk.", fr: "Si le deal est financé principalement par dette, l’acheteur doit tester le pro-forma leverage, l’interest coverage et le refinancing risk." },
        { en: "Synergy value should be discounted for timing, execution cost, tax and probability of realization.", fr: "La valeur des synergies doit être ajustée pour le timing, les coûts d’exécution, la fiscalité et la probabilité de réalisation." },
      ],
      explanation: {
        Beginner: {
          en: "A buyer can pay more than the stand-alone value if combining the businesses creates real additional cash flow. But expected synergies are not free money; they must be achievable and worth more than the premium paid.",
          fr: "Un acheteur peut payer plus que la stand-alone value si la combinaison crée réellement du cash flow additionnel. Mais les synergies attendues ne sont pas de l’argent gratuit : elles doivent être réalisables et valoir plus que la prime payée.",
        },
        Intermediate: {
          en: "Bridge purchase premium to synergy value, integration costs and financing effects. Then test whether the transaction is accretive for the right economic reasons rather than because of accounting mechanics.",
          fr: "Relie purchase premium, valeur des synergies, integration costs et effets de financement. Teste ensuite si la transaction est accretive pour de vraies raisons économiques plutôt qu’à cause de mécanismes comptables.",
        },
        Professional: {
          en: "Deal quality depends on return on invested capital relative to funding cost and opportunity cost. EPS accretion can coexist with value destruction when a buyer overpays, especially when cheap debt masks weak underlying returns.",
          fr: "La qualité du deal dépend du return on invested capital par rapport au coût du financement et à l’opportunity cost. L’EPS accretion peut coexister avec une destruction de valeur lorsqu’un acheteur surpaye, surtout lorsque de la dette bon marché masque de faibles returns sous-jacents.",
        },
      },
      formula: {
        label: { en: "Offer premium", fr: "Offer premium / prime d’offre" },
        expression: "Premium = Offer price ÷ Unaffected price − 1",
        explanation: { en: "Measures how much the buyer offers above the pre-deal share price.", fr: "Mesure combien l’acheteur offre au-dessus du cours avant deal." },
        workedExample: { en: "$35 ÷ $28 − 1 = 25%.", fr: "35 $ ÷ 28 $ − 1 = 25 %." },
      },
      vocabulary: [
        { en: "Pro forma leverage", fr: "pro forma leverage / leverage après transaction", definition: { en: "Leverage ratio after giving effect to the contemplated transaction and financing.", fr: "Ratio de leverage après prise en compte de la transaction et de son financement." } },
        { en: "Accretion / dilution", fr: "accretion / dilution", definition: { en: "Increase or decrease in a buyer's per-share financial metric after a transaction.", fr: "Hausse ou baisse d’une métrique par action de l’acheteur après transaction." } },
      ],
    },
    {
      id: "macro-market",
      kicker: { en: "07 · MACRO & MARKET CONTEXT", fr: "07 · CONTEXTE MACRO & MARCHÉ" },
      title: { en: "Connect rates, growth and risk appetite to the company and the deal", fr: "Relie taux, croissance et risk appetite à l’entreprise et au deal" },
      coreFacts: [
        { en: "Higher risk-free rates raise discount rates and can reduce the present value of long-duration growth cash flows.", fr: "Des risk-free rates plus élevés augmentent les discount rates et peuvent réduire la present value des cash flows de croissance à longue duration." },
        { en: "Tighter credit spreads or lower base rates can improve acquisition financing economics.", fr: "Des credit spreads plus serrés ou des base rates plus faibles peuvent améliorer l’économie du financement d’acquisition." },
        { en: "A slowdown can hurt merchant payment volumes, while inflation can affect both nominal payment volume and operating costs.", fr: "Un ralentissement peut réduire les merchant payment volumes, tandis que l’inflation peut affecter à la fois le payment volume nominal et les operating costs." },
        { en: "Market risk appetite influences the multiple investors are willing to pay even if near-term earnings are unchanged.", fr: "Le market risk appetite influence le multiple que les investisseurs acceptent de payer même si les earnings court terme ne changent pas." },
      ],
      explanation: {
        Beginner: {
          en: "Macro matters only when you can explain the transmission channel. Do not say 'rates are bad for tech' and stop; explain how rates change discounting, financing, demand or valuation.",
          fr: "La macro ne compte que si tu peux expliquer le transmission channel. Ne dis pas simplement « les taux sont mauvais pour la tech » ; explique comment ils changent discounting, financement, demande ou valuation.",
        },
        Intermediate: {
          en: "Separate first-order and second-order effects. Higher inflation can raise nominal payments volume but also costs and rates; the net result depends on pricing power and valuation sensitivity.",
          fr: "Sépare les effets de premier et second ordre. Une inflation plus élevée peut augmenter le payment volume nominal mais aussi les coûts et les taux ; le résultat net dépend du pricing power et de la sensibilité de valuation.",
        },
        Professional: {
          en: "Frame macro through scenario-conditioned cash flows and discount rates. The relevant question is not whether the macro variable rises or falls, but how the surprise relative to expectations changes earnings, financing and the risk premium embedded in the security.",
          fr: "Cadre la macro via des cash flows et discount rates conditionnés par scénario. La vraie question n’est pas si la variable macro monte ou baisse, mais comment la surprise par rapport aux attentes change earnings, financement et risk premium intégré au titre.",
        },
      },
      vocabulary: [
        { en: "Transmission channel", fr: "transmission channel / canal de transmission", definition: { en: "Mechanism through which a macro or market change affects a company or security.", fr: "Mécanisme par lequel un changement macro ou de marché affecte une entreprise ou un titre." } },
        { en: "Risk premium", fr: "risk premium / prime de risque", definition: { en: "Additional return investors demand for bearing risk beyond a risk-free benchmark.", fr: "Rendement additionnel exigé par les investisseurs pour porter un risque au-delà d’un benchmark sans risque." } },
      ],
    },
    {
      id: "scenarios-risk",
      kicker: { en: "08 · SCENARIOS & RISK", fr: "08 · SCÉNARIOS & RISQUE" },
      title: { en: "A recommendation is incomplete until you know what would prove it wrong", fr: "Une recommandation est incomplète tant que tu ne sais pas ce qui la rendrait fausse" },
      coreFacts: [
        { en: "Base, bull and bear scenarios should change coherent groups of assumptions, not isolated cells.", fr: "Les scénarios base, bull et bear doivent modifier des groupes cohérents d’hypothèses, pas des cellules isolées." },
        { en: "Key downside risks are competitive price pressure, weaker payment volumes, regulatory cost and failed synergy execution.", fr: "Les principaux downside risks sont la pression concurrentielle sur les prix, des payment volumes plus faibles, le coût réglementaire et l’échec d’exécution des synergies." },
        { en: "Key upside catalysts are stronger software mix, durable retention, faster margin expansion and credible strategic interest.", fr: "Les principaux upside catalysts sont un meilleur mix software, une retention durable, une expansion de marge plus rapide et un intérêt stratégique crédible." },
        { en: "An invalidation condition is stronger than a generic risk because it tells you when to change the thesis.", fr: "Une invalidation condition est plus utile qu’un risque générique car elle indique quand modifier la thèse." },
      ],
      explanation: {
        Beginner: {
          en: "A risk list says what can go wrong. An invalidation rule says what evidence would make you stop believing your thesis.",
          fr: "Une liste de risques dit ce qui peut mal tourner. Une invalidation rule dit quelles preuves te feraient arrêter de croire à ta thèse.",
        },
        Intermediate: {
          en: "Tie each scenario to revenue, margin, cash conversion, multiple and financing assumptions. Then calculate how much of the current price depends on optimistic outcomes.",
          fr: "Relie chaque scénario aux hypothèses de revenue, marge, cash conversion, multiple et financement. Calcule ensuite quelle part du cours actuel dépend de résultats optimistes.",
        },
        Professional: {
          en: "Risk management is position- and path-dependent. Even if intrinsic value is attractive, leverage, liquidity, event timing and correlation with the rest of a portfolio can make the trade inappropriate at a given size.",
          fr: "Le risk management dépend de la position et du path. Même si l’intrinsic value est attractive, leverage, liquidité, timing de l’événement et corrélation avec le reste du portefeuille peuvent rendre le trade inadapté à une certaine taille.",
        },
      },
      vocabulary: [
        { en: "Invalidation condition", fr: "invalidation condition / condition d’invalidation", definition: { en: "Predefined evidence that would materially weaken or overturn an investment thesis.", fr: "Preuve prédéfinie qui affaiblirait ou renverserait significativement une investment thesis." } },
        { en: "Scenario analysis", fr: "scenario analysis / analyse de scénarios", definition: { en: "Assessment of outcomes under internally coherent alternative sets of assumptions.", fr: "Évaluation des résultats sous différents ensembles cohérents d’hypothèses." } },
      ],
    },
    {
      id: "recommendation",
      kicker: { en: "09 · RECOMMENDATION", fr: "09 · RECOMMANDATION" },
      title: { en: "Convert analysis into an explicit, conditional decision", fr: "Transforme l’analyse en décision explicite et conditionnelle" },
      coreFacts: [
        { en: "A strong recommendation states action, valuation range, expected return logic, catalysts, risks and invalidation conditions.", fr: "Une recommandation solide précise action, valuation range, logique de return attendu, catalysts, risques et invalidation conditions." },
        { en: "For the stand-alone stock, the analyst should compare expected upside with downside and required return rather than asking only whether fair value exceeds price.", fr: "Pour l’action stand-alone, l’analyste doit comparer expected upside, downside et required return plutôt que demander seulement si la fair value dépasse le prix." },
        { en: "For the buyer, the analyst should compare strategic value and synergy-adjusted returns with the purchase price and financing burden.", fr: "Pour l’acheteur, l’analyste doit comparer strategic value et returns ajustés des synergies avec le purchase price et la charge de financement." },
        { en: "A conclusion can be conditional when evidence is incomplete, but the condition must be explicit and decision-relevant.", fr: "Une conclusion peut être conditionnelle lorsque les preuves sont incomplètes, mais la condition doit être explicite et utile à la décision." },
      ],
      explanation: {
        Beginner: {
          en: "Do not end with 'it depends.' Say what you would do under the stated assumptions, then explain what would make you change that decision.",
          fr: "Ne termine pas par « ça dépend ». Dis ce que tu ferais avec les hypothèses posées, puis explique ce qui te ferait changer la décision.",
        },
        Intermediate: {
          en: "Use a compact structure: recommendation, three reasons, valuation, catalyst, principal risk and invalidation. This makes the conclusion testable.",
          fr: "Utilise une structure compacte : recommandation, trois raisons, valuation, catalyst, risque principal et invalidation. Cela rend la conclusion testable.",
        },
        Professional: {
          en: "Decision quality requires separating expected value from confidence. A high-upside thesis with low evidence quality can deserve a smaller position or more diligence, while a modest-upside idea with strong asymmetry can be superior on a risk-adjusted basis.",
          fr: "La qualité de décision exige de séparer expected value et confidence. Une thèse à fort upside mais faible qualité de preuve peut justifier une position plus petite ou davantage de diligence, tandis qu’une idée à upside modéré avec forte asymétrie peut être meilleure en risk-adjusted terms.",
        },
      },
      vocabulary: [
        { en: "Expected value", fr: "expected value / valeur espérée", definition: { en: "Probability-weighted average of possible outcomes.", fr: "Moyenne pondérée par les probabilités des résultats possibles." } },
        { en: "Asymmetry", fr: "asymmetry / asymétrie", definition: { en: "Relationship between potential upside and downside across scenarios.", fr: "Relation entre upside et downside potentiels selon les scénarios." } },
      ],
    },
    {
      id: "committee-defense",
      kicker: { en: "10 · INVESTMENT COMMITTEE DEFENSE", fr: "10 · DÉFENSE EN INVESTMENT COMMITTEE" },
      title: { en: "The final test is whether the thesis survives good questions", fr: "Le test final est de savoir si la thèse résiste aux bonnes questions" },
      coreFacts: [
        { en: "Lead with the recommendation and the one or two facts that matter most.", fr: "Commence par la recommandation et les un ou deux faits les plus importants." },
        { en: "Know which assumption contributes most to valuation sensitivity.", fr: "Sache quelle hypothèse contribue le plus à la sensibilité de valuation." },
        { en: "When challenged, distinguish new evidence from a different opinion.", fr: "Lorsqu’on te challenge, distingue une nouvelle preuve d’une opinion différente." },
        { en: "A professional answer can acknowledge uncertainty without losing clarity.", fr: "Une réponse professionnelle peut reconnaître l’incertitude sans perdre en clarté." },
      ],
      explanation: {
        Beginner: {
          en: "A good defense is not about winning an argument. It is about showing that your recommendation follows from evidence and that you understand what could make it wrong.",
          fr: "Une bonne défense ne consiste pas à gagner un débat. Elle consiste à montrer que ta recommandation découle de preuves et que tu comprends ce qui pourrait la rendre fausse.",
        },
        Intermediate: {
          en: "Prepare answers to five questions: why now, what is mispriced, what is the biggest assumption, what is the downside, and what changes your mind.",
          fr: "Prépare cinq réponses : pourquoi maintenant, qu’est-ce qui est mispriced, quelle est l’hypothèse principale, quel est le downside et qu’est-ce qui te fait changer d’avis.",
        },
        Professional: {
          en: "Senior reviewers often attack the weakest causal link rather than the headline conclusion. Defend the model by tracing evidence through driver, forecast, valuation and decision; update the thesis if the evidence chain breaks.",
          fr: "Les reviewers seniors attaquent souvent le maillon causal le plus faible plutôt que la conclusion principale. Défends le modèle en retraçant evidence → driver → forecast → valuation → décision ; mets à jour la thèse si cette chaîne se brise.",
        },
      },
      example: {
        en: "Example opening: 'At $28, I would own Asterion only if our base-case assumptions on 8–10% medium-term growth and margin expansion remain intact. I would not justify a $35 strategic offer on stand-alone value alone; the buyer needs credible, risk-adjusted synergies to earn an acceptable return on the premium.'",
        fr: "Exemple d’ouverture : « À 28 $, je détiendrais Asterion seulement si nos hypothèses de base case de croissance moyen terme à 8–10 % et d’expansion de marge restent intactes. Je ne justifierais pas une offre stratégique à 35 $ sur la stand-alone value seule ; l’acheteur a besoin de synergies crédibles et ajustées du risque pour obtenir un return acceptable sur la prime. »",
      },
      vocabulary: [
        { en: "Investment committee", fr: "investment committee / comité d’investissement", definition: { en: "Group that reviews and authorizes investment decisions or capital allocations.", fr: "Groupe qui examine et autorise les décisions d’investissement ou allocations de capital." } },
        { en: "Evidence chain", fr: "evidence chain / chaîne de preuve", definition: { en: "Logical link from facts to assumptions, forecast, valuation and decision.", fr: "Lien logique entre faits, hypothèses, forecast, valuation et décision." } },
      ],
    },
  ],
  quiz: [
    {
      id: "q1",
      conceptKey: "capstone-frame-decision",
      question: { en: "What should be defined before building the model?", fr: "Que faut-il définir avant de construire le modèle ?" },
      options: [
        { id: "a", label: { en: "The exact decision, constraints and evidence needed", fr: "La décision exacte, les contraintes et les preuves nécessaires" } },
        { id: "b", label: { en: "The chart colors", fr: "Les couleurs des graphiques" } },
        { id: "c", label: { en: "A target price chosen in advance", fr: "Un target price choisi à l’avance" } },
        { id: "d", label: { en: "The longest possible spreadsheet", fr: "Le spreadsheet le plus long possible" } },
      ],
      correctOption: "a",
      explanation: { en: "A case should be designed around the decision rather than around calculations for their own sake.", fr: "Un cas doit être conçu autour de la décision, pas autour de calculs sans objectif." },
    },
    {
      id: "q2",
      conceptKey: "capstone-ev-ebitda",
      question: { en: "Approximately what is Asterion's current EV / EBITDA at $28 per share?", fr: "Quel est approximativement l’EV / EBITDA actuel d’Asterion à 28 $ par action ?" },
      options: [
        { id: "a", label: { en: "13.2x", fr: "13,2x" } },
        { id: "b", label: { en: "6.0x", fr: "6,0x" } },
        { id: "c", label: { en: "20.0x", fr: "20,0x" } },
        { id: "d", label: { en: "2.4x", fr: "2,4x" } },
      ],
      correctOption: "a",
      explanation: { en: "EV is about $3.16bn and EBITDA is $240m, producing approximately 13.2x.", fr: "L’EV est d’environ 3,16 Md$ et l’EBITDA de 240 M$, soit environ 13,2x." },
    },
    {
      id: "q3",
      conceptKey: "capstone-cash-conversion",
      question: { en: "Why is free-cash-flow conversion important?", fr: "Pourquoi la free-cash-flow conversion est-elle importante ?" },
      options: [
        { id: "a", label: { en: "It tests how much reported operating earnings become distributable cash", fr: "Elle teste quelle part des operating earnings devient réellement du cash distribuable" } },
        { id: "b", label: { en: "It replaces all valuation work", fr: "Elle remplace tout le travail de valuation" } },
        { id: "c", label: { en: "It measures only share-price momentum", fr: "Elle mesure uniquement le momentum du cours" } },
        { id: "d", label: { en: "It ignores capital expenditure", fr: "Elle ignore le capital expenditure" } },
      ],
      correctOption: "a",
      explanation: { en: "Cash conversion helps test the economic quality of reported earnings.", fr: "La cash conversion aide à tester la qualité économique des earnings publiés." },
    },
    {
      id: "q4",
      conceptKey: "capstone-forecast-drivers",
      question: { en: "Which variables are the most important value drivers in the Asterion case?", fr: "Quelles variables sont les principaux value drivers du cas Asterion ?" },
      options: [
        { id: "a", label: { en: "Sustainable revenue growth, EBITDA margin and cash conversion", fr: "Croissance durable du revenue, marge EBITDA et cash conversion" } },
        { id: "b", label: { en: "Logo design, office size and ticker symbol", fr: "Logo, taille des bureaux et ticker" } },
        { id: "c", label: { en: "Only the historical share price", fr: "Uniquement l’historique du cours" } },
        { id: "d", label: { en: "Only depreciation", fr: "Uniquement la depreciation" } },
      ],
      correctOption: "a",
      explanation: { en: "Those variables dominate the operating and valuation outcome in this case.", fr: "Ces variables dominent le résultat opérationnel et la valuation dans ce cas." },
    },
    {
      id: "q5",
      conceptKey: "capstone-valuation-triangulation",
      question: { en: "Why use DCF, trading comps and transaction analysis together?", fr: "Pourquoi utiliser ensemble DCF, trading comps et transaction analysis ?" },
      options: [
        { id: "a", label: { en: "They answer different valuation questions and expose assumption risk", fr: "Ils répondent à différentes questions de valuation et exposent le risque d’hypothèses" } },
        { id: "b", label: { en: "Because averaging any three numbers is always correct", fr: "Parce que moyenner trois nombres est toujours correct" } },
        { id: "c", label: { en: "To avoid understanding the business", fr: "Pour éviter de comprendre le business" } },
        { id: "d", label: { en: "Because DCF cannot use cash flows", fr: "Parce qu’un DCF ne peut pas utiliser les cash flows" } },
      ],
      correctOption: "a",
      explanation: { en: "Triangulation is useful because each method highlights different assumptions and market information.", fr: "La triangulation est utile car chaque méthode met en évidence des hypothèses et informations de marché différentes." },
    },
    {
      id: "q6",
      conceptKey: "capstone-offer-premium",
      question: { en: "What premium does a $35 offer represent over a $28 unaffected price?", fr: "Quelle prime représente une offre à 35 $ sur un cours unaffected de 28 $ ?" },
      options: [
        { id: "a", label: { en: "25%", fr: "25 %" } },
        { id: "b", label: { en: "7%", fr: "7 %" } },
        { id: "c", label: { en: "35%", fr: "35 %" } },
        { id: "d", label: { en: "80%", fr: "80 %" } },
      ],
      correctOption: "a",
      explanation: { en: "$35 / $28 - 1 = 25%.", fr: "35 $ / 28 $ - 1 = 25 %." },
    },
    {
      id: "q7",
      conceptKey: "capstone-synergy-value",
      question: { en: "How should expected synergies be treated in deal valuation?", fr: "Comment faut-il traiter les synergies attendues dans la valuation d’un deal ?" },
      options: [
        { id: "a", label: { en: "Adjust for timing, cost, tax and probability of realization", fr: "Ajuster pour timing, coûts, fiscalité et probabilité de réalisation" } },
        { id: "b", label: { en: "Count 100% immediately with no risk adjustment", fr: "Compter 100 % immédiatement sans ajustement de risque" } },
        { id: "c", label: { en: "Ignore them in every transaction", fr: "Les ignorer dans toutes les transactions" } },
        { id: "d", label: { en: "Treat them as existing cash", fr: "Les traiter comme du cash déjà existant" } },
      ],
      correctOption: "a",
      explanation: { en: "Synergies are uncertain future benefits and need economic adjustment before supporting a premium.", fr: "Les synergies sont des bénéfices futurs incertains et doivent être ajustées économiquement avant de justifier une prime." },
    },
    {
      id: "q8",
      conceptKey: "capstone-macro-channel",
      question: { en: "What is the correct way to incorporate a macro view?", fr: "Quelle est la bonne manière d’intégrer une vue macro ?" },
      options: [
        { id: "a", label: { en: "Explain the transmission into cash flows, financing or discount rates", fr: "Expliquer la transmission vers cash flows, financement ou discount rates" } },
        { id: "b", label: { en: "Repeat a headline without linking it to the company", fr: "Répéter un headline sans le relier à l’entreprise" } },
        { id: "c", label: { en: "Assume every rate move has the same effect on every company", fr: "Supposer que tout mouvement de taux a le même effet sur toutes les entreprises" } },
        { id: "d", label: { en: "Ignore market expectations", fr: "Ignorer les attentes du marché" } },
      ],
      correctOption: "a",
      explanation: { en: "Macro analysis becomes useful when the mechanism into company value is explicit.", fr: "L’analyse macro devient utile lorsque le mécanisme vers la valeur de l’entreprise est explicite." },
    },
    {
      id: "q9",
      conceptKey: "capstone-invalidation",
      question: { en: "What makes an invalidation condition useful?", fr: "Qu’est-ce qui rend une invalidation condition utile ?" },
      options: [
        { id: "a", label: { en: "It specifies evidence that would make you change the thesis", fr: "Elle précise quelles preuves te feraient changer la thèse" } },
        { id: "b", label: { en: "It guarantees the thesis is correct", fr: "Elle garantit que la thèse est correcte" } },
        { id: "c", label: { en: "It removes the need for downside analysis", fr: "Elle supprime le besoin d’analyser le downside" } },
        { id: "d", label: { en: "It is another name for a target price", fr: "C’est un autre nom pour un target price" } },
      ],
      correctOption: "a",
      explanation: { en: "Invalidation conditions make a thesis falsifiable and improve decision discipline.", fr: "Les invalidation conditions rendent la thèse falsifiable et améliorent la discipline de décision." },
    },
    {
      id: "q10",
      conceptKey: "capstone-committee-defense",
      question: { en: "What is the strongest opening in an investment-committee defense?", fr: "Quelle est la meilleure ouverture lors d’une défense en investment committee ?" },
      options: [
        { id: "a", label: { en: "State the recommendation and the evidence that matters most", fr: "Énoncer la recommandation et les preuves qui comptent le plus" } },
        { id: "b", label: { en: "Begin with every historical detail you collected", fr: "Commencer par tous les détails historiques collectés" } },
        { id: "c", label: { en: "Hide the main risk until the end", fr: "Cacher le risque principal jusqu’à la fin" } },
        { id: "d", label: { en: "Avoid taking a position", fr: "Éviter de prendre position" } },
      ],
      correctOption: "a",
      explanation: { en: "Front-loading the decision and strongest evidence makes the discussion focused and testable.", fr: "Front-loader la décision et les preuves les plus fortes rend la discussion ciblée et testable." },
    },
  ],
  interviewPrompt: {
    question: {
      en: "You have five minutes with an investment committee. Present your Asterion recommendation and explain whether the $35 strategic offer is economically justified.",
      fr: "Tu as cinq minutes devant un investment committee. Présente ta recommandation sur Asterion et explique si l’offre stratégique à 35 $ est économiquement justifiée.",
    },
    framework: [
      { en: "Open with the recommendation for the stand-alone stock and the strategic deal.", fr: "Commence par la recommandation sur l’action stand-alone et sur le strategic deal." },
      { en: "State the two or three operating drivers that determine value.", fr: "Présente les deux ou trois operating drivers qui déterminent la valeur." },
      { en: "Triangulate DCF, trading comps and transaction value, explaining the major differences.", fr: "Croise DCF, trading comps et transaction value en expliquant les écarts majeurs." },
      { en: "Explain how synergies and financing affect the buyer's return.", fr: "Explique comment synergies et financement affectent le return de l’acheteur." },
      { en: "Give base, bull and bear logic with the most important downside risk.", fr: "Présente la logique base, bull et bear avec le downside risk le plus important." },
      { en: "Finish with catalysts and the evidence that would invalidate your thesis.", fr: "Termine par les catalysts et les preuves qui invalideraient ta thèse." },
    ],
    sample: {
      en: "At $28, Asterion is potentially attractive, but my recommendation depends on our confidence that medium-term revenue can remain in the high single digits while EBITDA margin expands from 20% toward the low twenties. The current enterprise value is roughly $3.16bn, or 13.2x EBITDA, which sits within our assumed peer framework. I would not justify the $35 strategic offer from stand-alone value alone: it implies about a 25% premium and roughly 16.1x current EBITDA. The buyer therefore needs real strategic value, particularly the $90m synergy plan, and those synergies must be discounted for timing, execution cost and probability. My base case is constructive because retention, software mix and cash conversion support durable economics, while the bear case is driven by payment-volume weakness, pricing pressure and lower margins. The biggest valuation sensitivities are sustainable growth, margin and discount rate. I would change the thesis if net revenue retention fell materially below 100%, if cash conversion deteriorated structurally, or if competitive pricing prevented margin expansion. So the stock can be attractive at the unaffected price, but the acquisition only creates value if synergy realization and financing economics more than compensate for the premium paid.",
      fr: "À 28 $, Asterion peut être attractive, mais ma recommandation dépend de notre confiance dans une croissance moyen terme du revenue en high single digits et une expansion de la marge EBITDA depuis 20 % vers le bas de la vingtaine. L’enterprise value actuelle est d’environ 3,16 Md$, soit 13,2x l’EBITDA, ce qui se situe dans notre framework de peers. Je ne justifierais pas l’offre stratégique à 35 $ par la stand-alone value seule : elle implique environ 25 % de prime et près de 16,1x l’EBITDA actuel. L’acheteur a donc besoin d’une vraie strategic value, en particulier du plan de 90 M$ de synergies, et ces synergies doivent être ajustées pour timing, execution cost et probabilité. Mon base case est constructif car retention, software mix et cash conversion soutiennent une économie durable, tandis que le bear case vient d’un affaiblissement des payment volumes, d’une pression sur le pricing et de marges plus faibles. Les sensibilités de valuation principales sont croissance durable, marge et discount rate. Je changerais de thèse si la net revenue retention tombait nettement sous 100 %, si la cash conversion se détériorait structurellement ou si la concurrence sur les prix empêchait l’expansion des marges. L’action peut donc être attractive au cours unaffected, mais l’acquisition ne crée de valeur que si la réalisation des synergies et l’économie du financement compensent plus que la prime payée.",
    },
  },
};
