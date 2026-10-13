import type { FinanceLesson } from "./lesson-content";

export const equityResearchLesson: FinanceLesson = {
  slug: "year-3-equity-research",
  year: { en: "Year 3 · Applied Finance", fr: "Année 3 · Finance appliquée / Applied Finance" },
  domain: { en: "Markets & Instruments", fr: "Marchés & Instruments / Markets & Instruments" },
  title: { en: "Equity Research", fr: "Equity Research / Analyse actions" },
  subtitle: {
    en: "Learn how equity research analysts understand businesses, build earnings forecasts, compare expectations with consensus, value stocks, identify catalysts and risks, write research notes and defend an investment view.",
    fr: "Comprendre comment les analystes equity research étudient une entreprise, construisent des prévisions d'earnings, comparent leurs attentes au consensus, valorisent une action, identifient catalysts et risques, rédigent une note et défendent une vue d'investissement.",
  },
  duration: { en: "190–230 min", fr: "190–230 min" },
  prerequisites: [
    { en: "Financial Statement Analysis", fr: "Analyse des états financiers" },
    { en: "Equity Valuation", fr: "Valorisation actions" },
    { en: "DCF & Relative Valuation", fr: "DCF & valorisation relative" },
    { en: "Financial Modeling I", fr: "Financial Modeling I" },
    { en: "Reading Financial News", fr: "Lecture de l'actualité financière" },
  ],
  objectives: [
    { en: "Break a company into business drivers, segments and key KPIs.", fr: "Décomposer une entreprise en drivers, segments et KPI clés." },
    { en: "Build revenue, margin, EPS and free-cash-flow forecasts from operating assumptions.", fr: "Construire des prévisions de chiffre d'affaires, marges, EPS et free cash flow à partir d'hypothèses opérationnelles." },
    { en: "Distinguish reported results, guidance, consensus and your own estimates.", fr: "Distinguer résultats publiés, guidance, consensus et tes propres estimations." },
    { en: "Use DCF and trading multiples to derive a defensible valuation range.", fr: "Utiliser DCF et multiples comparables pour obtenir une fourchette de valorisation défendable." },
    { en: "Identify catalysts, downside risks, variant perception and what is already priced in.", fr: "Identifier catalysts, downside risks, variant perception et ce qui est déjà pricé." },
    { en: "Structure a professional research note and stock pitch.", fr: "Structurer une note de recherche et un stock pitch professionnels." },
  ],
  overviewFlow: {
    title: { en: "From business understanding to an investable research view", fr: "De la compréhension du business à une vue d'investissement" },
    steps: [
      { title: { en: "Understand", fr: "Comprendre" }, detail: { en: "Business · industry · KPIs", fr: "Business · secteur · KPI" } },
      { title: { en: "Forecast", fr: "Prévoir" }, detail: { en: "Revenue · margins · EPS", fr: "CA · marges · EPS" } },
      { title: { en: "Compare", fr: "Comparer" }, detail: { en: "Consensus · guidance · expectations", fr: "Consensus · guidance · attentes" } },
      { title: { en: "Value", fr: "Valoriser" }, detail: { en: "DCF · multiples · scenarios", fr: "DCF · multiples · scénarios" } },
      { title: { en: "Communicate", fr: "Communiquer" }, detail: { en: "Thesis · catalysts · risks", fr: "Thèse · catalysts · risques" } },
    ],
  },
  sections: [
    {
      id: "role-process",
      kicker: { en: "01 · ROLE & RESEARCH PROCESS", fr: "01 · MÉTIER & PROCESSUS DE RECHERCHE" },
      title: { en: "Equity research turns company information into differentiated expectations", fr: "L'equity research transforme l'information d'entreprise en attentes différenciées" },
      coreFacts: [
        { en: "Equity research analysts study companies, industries, financial statements, management commentary and market expectations.", fr: "Les analystes equity research étudient entreprises, secteurs, états financiers, discours du management et attentes du marché." },
        { en: "Sell-side research publishes views for clients; buy-side research uses analysis to make portfolio decisions.", fr: "La recherche sell-side publie des analyses pour les clients ; la recherche buy-side utilise l'analyse pour prendre des décisions de portefeuille." },
        { en: "The job is not simply to predict earnings; it is to understand where your expectations differ from the market and why that difference matters for price.", fr: "Le métier ne consiste pas seulement à prévoir les earnings ; il faut comprendre où tes attentes diffèrent du marché et pourquoi cela compte pour le prix." },
        { en: "A useful research process is repeatable: understand, model, compare, value, test and communicate.", fr: "Un bon processus doit être répétable : comprendre, modéliser, comparer, valoriser, tester et communiquer." },
      ],
      explanation: {
        Beginner: { en: "An equity research analyst studies a company and decides what financial results are likely, what the stock may be worth and what could make the market change its view.", fr: "Un analyste equity research étudie une entreprise pour estimer ses résultats futurs, sa valeur et ce qui pourrait faire changer l'opinion du marché." },
        Intermediate: { en: "The analyst combines company-specific work with industry data, competitor analysis, channel checks, macro variables and valuation. The output is a thesis that can be updated when new information arrives.", fr: "L'analyste combine travail sur l'entreprise, données sectorielles, concurrents, channel checks, variables macro et valorisation. La thèse doit pouvoir être mise à jour lorsque de nouvelles informations arrivent." },
        Professional: { en: "Professional research is an expectations business. The analyst's edge comes from superior interpretation of operating drivers, estimate revisions, probability distributions and market-implied assumptions rather than from collecting facts everyone already knows.", fr: "La recherche professionnelle est un métier d'anticipations. L'edge vient d'une meilleure interprétation des drivers opérationnels, révisions d'estimations, distributions de probabilités et hypothèses implicites du marché, pas de faits déjà connus de tous." },
      },
      vocabulary: [
        { en: "Sell-side research", fr: "recherche sell-side", definition: { en: "Research produced by brokers or banks for investor clients.", fr: "Recherche produite par des brokers ou banques pour leurs clients investisseurs." } },
        { en: "Coverage universe", fr: "univers de couverture", definition: { en: "Set of companies formally followed by an analyst or team.", fr: "Ensemble d'entreprises officiellement suivies par un analyste ou une équipe." } },
        { en: "Variant perception", fr: "variant perception", definition: { en: "A differentiated view from consensus that can matter for price.", fr: "Une vue différente du consensus susceptible d'influencer le prix." } },
      ],
    },
    {
      id: "business-drivers",
      kicker: { en: "02 · BUSINESS MODEL, SEGMENTS & KPIs", fr: "02 · BUSINESS MODEL, SEGMENTS & KPI" },
      title: { en: "A model is only as good as the operating drivers behind it", fr: "Un modèle n'est bon que si ses drivers opérationnels le sont" },
      coreFacts: [
        { en: "Revenue should be modeled from the economic drivers that actually create sales, not from a single arbitrary growth rate.", fr: "Le chiffre d'affaires doit être modélisé à partir des vrais drivers économiques, pas d'un simple taux de croissance arbitraire." },
        { en: "Key KPIs differ by industry: units and price, users and ARPU, stores and same-store sales, volume and yield, bookings and occupancy, or assets and fee rate.", fr: "Les KPI dépendent du secteur : unités/prix, utilisateurs/ARPU, magasins/same-store sales, volume/yield, bookings/occupancy ou actifs/taux de frais." },
        { en: "Segment reporting can reveal growth and profitability differences hidden by consolidated numbers.", fr: "Le reporting par segment peut révéler des différences de croissance et rentabilité cachées dans les chiffres consolidés." },
        { en: "Good analysts know which two or three variables explain most earnings revisions.", fr: "Les bons analystes savent quelles deux ou trois variables expliquent la majorité des révisions d'earnings." },
      ],
      explanation: {
        Beginner: { en: "Instead of saying revenue will grow 10%, explain why: more customers, higher prices, more units sold or a better product mix.", fr: "Au lieu de dire que le CA va croître de 10 %, explique pourquoi : plus de clients, prix plus élevés, plus d'unités ou meilleur mix produit." },
        Intermediate: { en: "For a subscription company, revenue may be modeled as subscribers × average revenue per user. For a retailer, it may come from store count × sales per store. The model should mirror the business.", fr: "Pour une entreprise d'abonnement, le CA peut être abonnés × revenu moyen par utilisateur. Pour un retailer, nombre de magasins × ventes par magasin. Le modèle doit refléter le business." },
        Professional: { en: "Driver trees should isolate volume, price, mix, utilization, capacity, churn, customer acquisition and unit economics where relevant. The goal is to identify the variables that change incremental margins and consensus estimates fastest.", fr: "Les driver trees doivent isoler volume, prix, mix, utilisation, capacité, churn, acquisition client et unit economics lorsque pertinent. Le but est d'identifier les variables qui modifient le plus vite les marges incrémentales et le consensus." },
      },
      formula: {
        label: { en: "Driver-based revenue", fr: "Chiffre d'affaires basé sur les drivers" },
        expression: "Revenue = Volume × Price",
        explanation: { en: "A simple structure that can be adapted into users × ARPU, units × ASP, rooms × occupancy × rate, and many other sector models.", fr: "Structure simple adaptable en utilisateurs × ARPU, unités × ASP, chambres × occupancy × tarif, etc." },
      },
      vocabulary: [
        { en: "KPI", fr: "KPI", definition: { en: "Key performance indicator tied to operating performance.", fr: "Indicateur clé lié à la performance opérationnelle." } },
        { en: "ARPU", fr: "ARPU", definition: { en: "Average revenue per user.", fr: "Revenu moyen par utilisateur." } },
        { en: "Same-store sales", fr: "same-store sales", definition: { en: "Sales growth from stores open in both comparison periods.", fr: "Croissance des ventes des magasins présents sur les deux périodes comparées." } },
      ],
    },
    {
      id: "financial-model",
      kicker: { en: "03 · FINANCIAL MODEL & EARNINGS FORECAST", fr: "03 · MODÈLE FINANCIER & PRÉVISIONS D'EARNINGS" },
      title: { en: "Forecasts should connect operating assumptions to the three statements", fr: "Les prévisions doivent relier hypothèses opérationnelles et trois états financiers" },
      coreFacts: [
        { en: "Revenue growth, gross margin, operating expenses, taxes, share count and financing costs drive EPS.", fr: "Croissance du CA, marge brute, dépenses opérationnelles, impôts, nombre d'actions et coûts de financement déterminent l'EPS." },
        { en: "Working capital, capex and depreciation affect cash conversion and free cash flow.", fr: "Working capital, capex et amortissements affectent la conversion en cash et le free cash flow." },
        { en: "Historical relationships help calibrate assumptions, but structural changes require judgment.", fr: "Les relations historiques aident à calibrer les hypothèses, mais les changements structurels exigent du jugement." },
        { en: "A model should make sensitivities visible rather than hide them in complexity.", fr: "Un modèle doit rendre visibles les sensibilités plutôt que les cacher dans la complexité." },
      ],
      explanation: {
        Beginner: { en: "The analyst turns business assumptions into revenue, profit, EPS and cash flow estimates for future quarters and years.", fr: "L'analyste transforme des hypothèses business en estimations futures de chiffre d'affaires, profit, EPS et cash flow." },
        Intermediate: { en: "If revenue grows faster while fixed costs grow slowly, operating margins can expand. If capex rises sharply, earnings may look strong while free cash flow weakens.", fr: "Si le CA croît plus vite que les coûts fixes, les marges peuvent augmenter. Si le capex grimpe fortement, les earnings peuvent sembler solides alors que le free cash flow faiblit." },
        Professional: { en: "A strong model separates recurring economics from one-offs, normalizes share-based compensation and restructuring where appropriate, tracks dilution, links balance-sheet items and makes scenario switches explicit. Forecast quality is judged by economic coherence, not spreadsheet size.", fr: "Un bon modèle sépare économie récurrente et one-offs, normalise certains éléments lorsque pertinent, suit la dilution, relie les postes du bilan et rend les scénarios explicites. La qualité se juge à la cohérence économique, pas à la taille du fichier." },
      },
      formula: {
        label: { en: "Earnings per share", fr: "Bénéfice par action" },
        expression: "EPS = Net Income / Diluted Weighted Average Shares",
        explanation: { en: "EPS converts company earnings into the amount attributable to each diluted share.", fr: "L'EPS convertit le résultat net en montant attribuable à chaque action diluée." },
      },
      vocabulary: [
        { en: "Estimate", fr: "estimation", definition: { en: "Analyst forecast for a future financial metric.", fr: "Prévision d'un analyste pour une métrique financière future." } },
        { en: "Diluted shares", fr: "actions diluées", definition: { en: "Share count including potential dilution from options and other instruments.", fr: "Nombre d'actions incluant la dilution potentielle d'options et autres instruments." } },
        { en: "Cash conversion", fr: "conversion en cash", definition: { en: "Ability of accounting profit to translate into cash flow.", fr: "Capacité du profit comptable à se transformer en cash flow." } },
      ],
    },
    {
      id: "earnings-consensus",
      kicker: { en: "04 · EARNINGS, GUIDANCE & CONSENSUS", fr: "04 · EARNINGS, GUIDANCE & CONSENSUS" },
      title: { en: "Stocks react to the gap between results and expectations, not to good numbers in isolation", fr: "Les actions réagissent à l'écart entre résultats et attentes, pas à de bons chiffres isolés" },
      coreFacts: [
        { en: "Consensus is the aggregated market estimate for metrics such as revenue, EPS or EBITDA.", fr: "Le consensus est l'estimation agrégée du marché pour le CA, EPS, EBITDA, etc." },
        { en: "A beat or miss matters differently depending on quality, guidance and what investors already expected beyond published consensus.", fr: "Un beat ou miss compte différemment selon sa qualité, la guidance et ce que les investisseurs attendaient réellement au-delà du consensus publié." },
        { en: "Management guidance can reset the earnings path for future periods.", fr: "La guidance du management peut réinitialiser la trajectoire d'earnings des périodes futures." },
        { en: "Estimate revisions often matter more than the absolute level of current-quarter earnings.", fr: "Les révisions d'estimations comptent souvent plus que le niveau absolu des earnings du trimestre courant." },
      ],
      explanation: {
        Beginner: { en: "A company can report record profits and still fall if investors expected even better results or if future guidance disappoints.", fr: "Une entreprise peut publier des profits records et baisser si le marché attendait encore mieux ou si la guidance future déçoit." },
        Intermediate: { en: "Analysts compare reported figures with consensus, prior guidance and their own estimates, then update future assumptions. The stock reaction depends heavily on which part of the earnings path changed.", fr: "Les analystes comparent résultats, consensus, guidance précédente et leurs propres estimations, puis mettent à jour les hypothèses futures. La réaction dépend surtout de la partie de la trajectoire qui change." },
        Professional: { en: "The most important benchmark may be whisper expectations rather than headline consensus. Analysts therefore separate headline beat/miss from revenue quality, gross margin, bookings, backlog, cash conversion and forward revisions to understand why the multiple may re-rate.", fr: "Le benchmark le plus important peut être le whisper number plutôt que le consensus officiel. Il faut donc séparer beat/miss headline de qualité du CA, marge brute, bookings, backlog, cash conversion et révisions futures pour comprendre un éventuel re-rating." },
      },
      vocabulary: [
        { en: "Consensus", fr: "consensus", definition: { en: "Aggregated analyst estimate for a future metric.", fr: "Estimation agrégée des analystes pour une métrique future." } },
        { en: "Beat / miss", fr: "beat / miss", definition: { en: "Reported result above or below the relevant expectation.", fr: "Résultat publié au-dessus ou en dessous de l'attente pertinente." } },
        { en: "Guidance", fr: "guidance", definition: { en: "Forward-looking range or outlook communicated by management.", fr: "Fourchette ou perspective future communiquée par le management." } },
      ],
    },
    {
      id: "valuation",
      kicker: { en: "05 · DCF, MULTIPLES & VALUATION RANGE", fr: "05 · DCF, MULTIPLES & FOURCHETTE DE VALORISATION" },
      title: { en: "A target price should come from explicit assumptions, not from a preferred answer", fr: "Un target price doit venir d'hypothèses explicites, pas d'une réponse préférée" },
      coreFacts: [
        { en: "DCF values a company from future cash flows discounted back to today.", fr: "Le DCF valorise l'entreprise à partir de ses cash flows futurs actualisés." },
        { en: "Trading multiples compare valuation with peers using metrics such as P/E, EV/EBITDA or EV/Sales.", fr: "Les multiples comparables comparent la valorisation aux peers via P/E, EV/EBITDA ou EV/Sales." },
        { en: "The appropriate multiple depends on growth, margins, returns on capital, cyclicality and risk.", fr: "Le multiple approprié dépend de croissance, marges, rendement du capital, cyclicité et risque." },
        { en: "A valuation range is more realistic than a single precise point estimate.", fr: "Une fourchette de valorisation est plus réaliste qu'un point unique très précis." },
      ],
      explanation: {
        Beginner: { en: "Valuation asks what the business is worth under reasonable assumptions, then compares that value with the current stock price.", fr: "La valorisation demande ce que vaut l'entreprise avec des hypothèses raisonnables, puis compare cette valeur au cours actuel." },
        Intermediate: { en: "Analysts often cross-check a DCF with peer multiples. If both methods imply upside under realistic assumptions, confidence may increase; if they disagree, the analyst must understand why.", fr: "Les analystes croisent souvent DCF et multiples. Si les deux indiquent un upside avec des hypothèses réalistes, la conviction peut augmenter ; s'ils divergent, il faut comprendre pourquoi." },
        Professional: { en: "Valuation should be linked to the earnings debate. A premium multiple is justified only if superior growth, durability, margins or returns on capital are not already over-discounted. Analysts should distinguish estimate upside from multiple expansion in the target-price bridge.", fr: "La valorisation doit être reliée au débat sur les earnings. Un multiple premium n'est justifié que si croissance, durabilité, marges ou rendement du capital supérieurs ne sont pas déjà sur-pricés. Il faut distinguer upside d'estimations et expansion du multiple dans le bridge de target price." },
      },
      formula: {
        label: { en: "Simple target price from P/E", fr: "Target price simple via P/E" },
        expression: "Target Price = Forecast EPS × Target P/E Multiple",
        explanation: { en: "Useful only if both the EPS forecast and target multiple are economically justified.", fr: "Utile uniquement si la prévision d'EPS et le multiple cible sont économiquement justifiés." },
      },
      vocabulary: [
        { en: "Target price", fr: "target price", definition: { en: "Analyst estimate of a stock's prospective value over a stated horizon.", fr: "Estimation par l'analyste de la valeur future d'une action sur un horizon donné." } },
        { en: "Re-rating", fr: "re-rating", definition: { en: "Change in the valuation multiple investors assign to a stock.", fr: "Changement du multiple de valorisation attribué à une action." } },
        { en: "Valuation range", fr: "fourchette de valorisation", definition: { en: "Range of plausible values under different assumptions.", fr: "Intervalle de valeurs plausibles selon différentes hypothèses." } },
      ],
    },
    {
      id: "thesis-catalysts",
      kicker: { en: "06 · THESIS, CATALYSTS & EXPECTATION GAP", fr: "06 · THÈSE, CATALYSTS & EXPECTATION GAP" },
      title: { en: "The best research explains what the market is getting wrong and what could change its mind", fr: "La meilleure recherche explique où le marché se trompe et ce qui pourrait le faire changer d'avis" },
      coreFacts: [
        { en: "A thesis should state the differentiated view, not merely describe the company.", fr: "Une thèse doit présenter la vue différenciée, pas simplement décrire l'entreprise." },
        { en: "Catalysts are events or developments that can close the expectation gap.", fr: "Les catalysts sont des événements susceptibles de fermer l'expectation gap." },
        { en: "A catalyst is not always required for long-term value creation, but it helps explain timing.", fr: "Un catalyst n'est pas toujours indispensable à la création de valeur long terme, mais il aide à expliquer le timing." },
        { en: "A strong thesis is falsifiable: the analyst knows what evidence would make it wrong.", fr: "Une bonne thèse est falsifiable : l'analyste sait quelles preuves la rendraient fausse." },
      ],
      explanation: {
        Beginner: { en: "Do not say only 'I like the company.' Explain what investors currently believe, what you believe instead and why the difference could affect the stock.", fr: "Ne dis pas seulement « j'aime l'entreprise ». Explique ce que le marché croit, ce que tu crois différemment et pourquoi cet écart peut affecter l'action." },
        Intermediate: { en: "A thesis might be that gross margins recover faster than consensus expects because input costs normalize and mix improves, creating EPS upside over the next four quarters.", fr: "Une thèse peut être que les marges brutes récupèrent plus vite que prévu grâce à la normalisation des coûts et au mix, créant un upside EPS sur les quatre prochains trimestres." },
        Professional: { en: "The strongest theses identify the exact expectation embedded in price, the measurable leading indicators that challenge it, the catalyst sequence and the probability-weighted impact on earnings and valuation. This creates a research process that can be monitored in real time.", fr: "Les meilleures thèses identifient l'attente exacte intégrée au prix, les indicateurs avancés mesurables qui la contestent, la séquence de catalysts et l'impact probabilisé sur earnings et valorisation. Cela crée un processus de suivi en temps réel." },
      },
      vocabulary: [
        { en: "Catalyst", fr: "catalyst / catalyseur", definition: { en: "Event that can cause investors to revise expectations.", fr: "Événement susceptible de pousser les investisseurs à réviser leurs attentes." } },
        { en: "Expectation gap", fr: "expectation gap", definition: { en: "Difference between market-implied expectations and the analyst's view.", fr: "Écart entre attentes implicites du marché et vue de l'analyste." } },
        { en: "Falsifiable", fr: "falsifiable", definition: { en: "Capable of being disproved by observable evidence.", fr: "Pouvant être invalidé par des preuves observables." } },
      ],
    },
    {
      id: "risk-scenarios",
      kicker: { en: "07 · RISKS, SCENARIOS & SENSITIVITIES", fr: "07 · RISQUES, SCÉNARIOS & SENSIBILITÉS" },
      title: { en: "A recommendation is incomplete until the downside is modeled", fr: "Une recommandation est incomplète tant que le downside n'est pas modélisé" },
      coreFacts: [
        { en: "Risks should be connected to specific operating variables, financial outcomes and valuation impacts.", fr: "Les risques doivent être reliés à des variables opérationnelles, résultats financiers et impacts de valorisation précis." },
        { en: "Bull, base and bear scenarios force assumptions to be explicit.", fr: "Les scénarios bull, base et bear obligent à rendre les hypothèses explicites." },
        { en: "Sensitivity analysis identifies which inputs matter most to valuation and EPS.", fr: "L'analyse de sensibilité identifie quelles hypothèses comptent le plus pour la valorisation et l'EPS." },
        { en: "Probability-weighted valuation can be more informative than a single base case.", fr: "Une valorisation pondérée par probabilités peut être plus informative qu'un seul base case." },
      ],
      explanation: {
        Beginner: { en: "A strong analyst asks not only how much the stock could rise, but what could go wrong and how much it could fall.", fr: "Un bon analyste demande non seulement combien l'action peut monter, mais aussi ce qui peut mal se passer et combien elle peut baisser." },
        Intermediate: { en: "If the thesis depends on 15% volume growth, test what happens at 8% or 0%. Then translate the lower revenue path into margin, EPS and target-price outcomes.", fr: "Si la thèse dépend de 15 % de croissance des volumes, teste 8 % puis 0 %. Traduis ensuite cette trajectoire dans les marges, l'EPS et le target price." },
        Professional: { en: "Scenario design should include path dependency and second-order effects. A demand slowdown can lower revenue, compress utilization, reduce margin and trigger multiple compression simultaneously. Correlated downside variables are often more important than isolated sensitivities.", fr: "Les scénarios doivent intégrer dépendance au chemin et effets de second ordre. Un ralentissement de demande peut réduire le CA, compresser l'utilisation, baisser les marges et déclencher une compression du multiple simultanément. Les variables corrélées comptent souvent plus que des sensibilités isolées." },
      },
      formula: {
        label: { en: "Probability-weighted value", fr: "Valeur pondérée par probabilités" },
        expression: "Expected Value = Σ (Scenario Probability × Scenario Value)",
        explanation: { en: "Combines multiple outcomes into one expected value while keeping uncertainty explicit.", fr: "Combine plusieurs scénarios en une valeur attendue tout en gardant l'incertitude explicite." },
      },
      vocabulary: [
        { en: "Bear case", fr: "bear case", definition: { en: "Downside scenario reflecting weaker assumptions.", fr: "Scénario downside avec hypothèses plus faibles." } },
        { en: "Sensitivity", fr: "sensibilité", definition: { en: "Change in an output caused by changing one or more assumptions.", fr: "Variation d'un résultat provoquée par un changement d'hypothèse." } },
        { en: "Probability weighted", fr: "pondéré par probabilités", definition: { en: "Combined according to assigned scenario probabilities.", fr: "Combiné selon les probabilités attribuées aux scénarios." } },
      ],
    },
    {
      id: "industry-competitive",
      kicker: { en: "08 · INDUSTRY & COMPETITIVE ANALYSIS", fr: "08 · ANALYSE SECTORIELLE & CONCURRENTIELLE" },
      title: { en: "Company forecasts improve when the industry structure is understood", fr: "Les prévisions d'entreprise s'améliorent quand la structure du secteur est comprise" },
      coreFacts: [
        { en: "Industry growth, market share, pricing power and competitive intensity shape company outcomes.", fr: "Croissance sectorielle, parts de marché, pricing power et intensité concurrentielle déterminent les résultats." },
        { en: "A company can grow while losing share if the market grows faster.", fr: "Une entreprise peut croître tout en perdant des parts de marché si le secteur croît plus vite." },
        { en: "Competitive advantages matter when they sustain margins, returns on capital or growth for longer than peers.", fr: "Les avantages compétitifs comptent lorsqu'ils soutiennent marges, rendement du capital ou croissance plus longtemps que les concurrents." },
        { en: "Industry structure helps determine whether a valuation premium is durable.", fr: "La structure du secteur aide à déterminer si un premium de valorisation est durable." },
      ],
      explanation: {
        Beginner: { en: "You cannot understand a company without understanding who it competes with, how large the market is and why customers choose one product over another.", fr: "On ne peut pas comprendre une entreprise sans comprendre ses concurrents, la taille du marché et pourquoi les clients choisissent un produit plutôt qu'un autre." },
        Intermediate: { en: "Track total market growth, company growth and peer growth separately. This shows whether performance comes from industry tailwinds or genuine share gains.", fr: "Suis séparément croissance du marché, de l'entreprise et des peers. Cela montre si la performance vient du secteur ou de vrais gains de parts de marché." },
        Professional: { en: "Industry analysis should incorporate capacity additions, cost curves, switching costs, regulation, distribution, bargaining power and competitive response. The relevant question is whether excess returns can persist after competitors react.", fr: "L'analyse sectorielle doit intégrer nouvelles capacités, cost curves, switching costs, réglementation, distribution, pouvoir de négociation et réaction concurrentielle. La vraie question est de savoir si les rendements excessifs peuvent persister après réaction des concurrents." },
      },
      vocabulary: [
        { en: "Market share", fr: "part de marché", definition: { en: "Company sales as a percentage of total market sales.", fr: "Ventes de l'entreprise en pourcentage des ventes totales du marché." } },
        { en: "Pricing power", fr: "pricing power", definition: { en: "Ability to raise prices without losing excessive demand.", fr: "Capacité à augmenter les prix sans perdre excessivement de demande." } },
        { en: "Moat", fr: "avantage compétitif durable", definition: { en: "Structural advantage that protects returns from competition.", fr: "Avantage structurel protégeant les rendements face à la concurrence." } },
      ],
    },
    {
      id: "research-note",
      kicker: { en: "09 · RESEARCH NOTE & COMMUNICATION", fr: "09 · NOTE DE RECHERCHE & COMMUNICATION" },
      title: { en: "A good research note is concise because the underlying work is deep", fr: "Une bonne note est concise parce que le travail sous-jacent est profond" },
      coreFacts: [
        { en: "A research note should make the thesis, estimate changes, valuation and risks easy to find.", fr: "Une note doit rendre faciles à trouver la thèse, les changements d'estimations, la valorisation et les risques." },
        { en: "The first page should communicate what changed and why it matters.", fr: "La première page doit expliquer ce qui a changé et pourquoi cela compte." },
        { en: "Charts and tables should support a decision rather than decorate the note.", fr: "Graphiques et tableaux doivent soutenir une décision, pas décorer la note." },
        { en: "Research language should distinguish facts, estimates and opinions.", fr: "Le langage de recherche doit distinguer faits, estimations et opinions." },
      ],
      explanation: {
        Beginner: { en: "A reader should quickly understand whether you are positive or negative, why, what the stock is worth and what could prove you wrong.", fr: "Le lecteur doit rapidement comprendre si tu es positif ou négatif, pourquoi, combien vaut l'action et ce qui pourrait te donner tort." },
        Intermediate: { en: "A useful note often follows: key call → what changed → estimate revisions → valuation → catalysts → risks. Detailed model work can sit behind this concise front-end message.", fr: "Une note utile suit souvent : key call → ce qui a changé → révisions d'estimations → valorisation → catalysts → risques. Le travail détaillé reste derrière ce message concis." },
        Professional: { en: "Institutional readers care about information density. The note should isolate the new information set, quantify estimate deltas, identify the market debate, show the target-price bridge and state where the analyst may be wrong. Compliance-sensitive claims must be sourced and phrased carefully.", fr: "Les lecteurs institutionnels recherchent une forte densité d'information. La note doit isoler les nouvelles informations, quantifier les deltas d'estimations, identifier le débat de marché, montrer le bridge de target price et dire où l'analyste peut se tromper. Les affirmations sensibles doivent être sourcées et formulées prudemment." },
      },
      vocabulary: [
        { en: "Initiation report", fr: "rapport d'initiation", definition: { en: "First comprehensive report launching formal coverage of a company.", fr: "Premier rapport complet lançant la couverture officielle d'une entreprise." } },
        { en: "Estimate revision", fr: "révision d'estimation", definition: { en: "Change to a forecast after new information.", fr: "Modification d'une prévision après nouvelle information." } },
        { en: "Investment conclusion", fr: "conclusion d'investissement", definition: { en: "Concise summary of the analyst's actionable view.", fr: "Résumé concis de la vue exploitable de l'analyste." } },
      ],
    },
    {
      id: "interviews-stock-pitch",
      kicker: { en: "10 · EQUITY RESEARCH INTERVIEWS & STOCK PITCH", fr: "10 · ENTRETIENS EQUITY RESEARCH & STOCK PITCH" },
      title: { en: "The interview tests whether you can think like an analyst under pressure", fr: "L'entretien teste ta capacité à penser comme un analyste sous pression" },
      coreFacts: [
        { en: "Candidates are commonly asked for a stock pitch, an earnings reaction, a valuation explanation or a financial-statement question.", fr: "Les candidats doivent souvent faire un stock pitch, analyser des earnings, expliquer une valorisation ou répondre à une question comptable." },
        { en: "A strong pitch separates company quality from stock attractiveness.", fr: "Un bon pitch distingue qualité de l'entreprise et attractivité de l'action." },
        { en: "Interviewers test whether you know what is priced in, not only whether you know the company.", fr: "Les interviewers testent si tu comprends ce qui est pricé, pas seulement si tu connais l'entreprise." },
        { en: "You should be able to defend downside, catalysts, valuation and the evidence that would invalidate the thesis.", fr: "Tu dois pouvoir défendre downside, catalysts, valorisation et preuves qui invalideraient la thèse." },
      ],
      explanation: {
        Beginner: { en: "Use a simple structure: company → thesis → why the market is wrong → valuation → catalyst → risks.", fr: "Utilise une structure simple : entreprise → thèse → pourquoi le marché se trompe → valorisation → catalyst → risques." },
        Intermediate: { en: "Support your pitch with two or three operating drivers, an estimate difference versus consensus and a valuation bridge. Avoid turning the answer into a company-history presentation.", fr: "Soutiens ton pitch avec deux ou trois drivers, un écart d'estimation versus consensus et un bridge de valorisation. Évite de transformer la réponse en historique de l'entreprise." },
        Professional: { en: "The strongest candidates frame the debate probabilistically. They identify the market-implied expectation, quantify their own estimates, show which leading indicators would validate the thesis and explain why the risk-reward remains attractive after considering scenario downside.", fr: "Les meilleurs candidats structurent le débat en probabilités. Ils identifient l'attente implicite du marché, quantifient leurs estimations, montrent quels indicateurs avancés valideraient la thèse et expliquent pourquoi le risk-reward reste attractif après prise en compte du downside." },
      },
      comparison: {
        title: { en: "Professional stock-pitch structure", fr: "Structure professionnelle d'un stock pitch" },
        headers: [{ en: "Step", fr: "Étape" }, { en: "Question", fr: "Question" }],
        rows: [
          { cells: [{ en: "1. Thesis", fr: "1. Thèse" }, { en: "What is your differentiated view?", fr: "Quelle est ta vue différenciée ?" }] },
          { cells: [{ en: "2. Expectations", fr: "2. Attentes" }, { en: "What does consensus or the price imply?", fr: "Qu'implique le consensus ou le prix ?" }] },
          { cells: [{ en: "3. Valuation", fr: "3. Valorisation" }, { en: "What is the stock worth and why?", fr: "Combien vaut l'action et pourquoi ?" }] },
          { cells: [{ en: "4. Catalyst", fr: "4. Catalyst" }, { en: "What could make the market update?", fr: "Qu'est-ce qui peut faire changer le marché ?" }] },
          { cells: [{ en: "5. Risk", fr: "5. Risque" }, { en: "What would make you wrong?", fr: "Qu'est-ce qui te donnerait tort ?" }] },
        ],
      },
      vocabulary: [
        { en: "Stock pitch", fr: "stock pitch", definition: { en: "Concise investment recommendation supported by thesis, valuation, catalysts and risks.", fr: "Recommandation concise soutenue par thèse, valorisation, catalysts et risques." } },
        { en: "Priced in", fr: "pricé", definition: { en: "Expectation already reflected in the current market price.", fr: "Attente déjà reflétée dans le prix de marché." } },
        { en: "Risk-reward", fr: "risk-reward", definition: { en: "Relationship between plausible upside and downside outcomes.", fr: "Relation entre upside et downside plausibles." } },
      ],
    },
  ],
  quiz: [
    {
      id: "q1", conceptKey: "role", question: { en: "What is the core purpose of equity research?", fr: "Quel est l'objectif central de l'equity research ?" },
      options: [
        { id: "a", label: { en: "Turn company information into differentiated expectations and valuation", fr: "Transformer l'information en attentes différenciées et valorisation" } },
        { id: "b", label: { en: "Only summarize press releases", fr: "Seulement résumer les communiqués" } },
        { id: "c", label: { en: "Guarantee stock returns", fr: "Garantir les rendements" } },
        { id: "d", label: { en: "Ignore market expectations", fr: "Ignorer les attentes du marché" } },
      ], correctOption: "a", explanation: { en: "Research is valuable when it interprets information and identifies differences versus expectations.", fr: "La recherche crée de la valeur lorsqu'elle interprète l'information et identifie les écarts versus attentes." },
    },
    {
      id: "q2", conceptKey: "drivers", question: { en: "Why is driver-based revenue modeling superior to applying one arbitrary growth rate?", fr: "Pourquoi modéliser le CA par drivers est-il préférable à un taux arbitraire ?" },
      options: [
        { id: "a", label: { en: "It links the forecast to the economics of the business", fr: "Cela relie la prévision à l'économie réelle du business" } },
        { id: "b", label: { en: "It eliminates uncertainty", fr: "Cela élimine l'incertitude" } },
        { id: "c", label: { en: "It removes the need for industry analysis", fr: "Cela supprime l'analyse sectorielle" } },
        { id: "d", label: { en: "It guarantees consensus accuracy", fr: "Cela garantit l'exactitude du consensus" } },
      ], correctOption: "a", explanation: { en: "Drivers such as volume, price, users or utilization make assumptions economically interpretable.", fr: "Les drivers comme volume, prix, utilisateurs ou utilisation rendent les hypothèses économiquement interprétables." },
    },
    {
      id: "q3", conceptKey: "earnings", question: { en: "Why can a stock fall after reporting record earnings?", fr: "Pourquoi une action peut-elle baisser après des earnings records ?" },
      options: [
        { id: "a", label: { en: "Because results or guidance can still be below market expectations", fr: "Parce que résultats ou guidance peuvent rester inférieurs aux attentes" } },
        { id: "b", label: { en: "Because earnings never matter", fr: "Parce que les earnings ne comptent jamais" } },
        { id: "c", label: { en: "Because good companies always fall", fr: "Parce que les bonnes entreprises baissent toujours" } },
        { id: "d", label: { en: "Because consensus is illegal", fr: "Parce que le consensus est illégal" } },
      ], correctOption: "a", explanation: { en: "Stocks react to outcomes relative to expectations and to revisions in the future earnings path.", fr: "Les actions réagissent aux résultats relatifs aux attentes et aux révisions de la trajectoire future." },
    },
    {
      id: "q4", conceptKey: "eps", question: { en: "What is EPS?", fr: "Qu'est-ce que l'EPS ?" },
      options: [
        { id: "a", label: { en: "Net income divided by diluted weighted average shares", fr: "Résultat net divisé par le nombre moyen pondéré d'actions diluées" } },
        { id: "b", label: { en: "Revenue divided by debt", fr: "CA divisé par dette" } },
        { id: "c", label: { en: "Cash divided by capex", fr: "Cash divisé par capex" } },
        { id: "d", label: { en: "EBITDA divided by assets", fr: "EBITDA divisé par actifs" } },
      ], correctOption: "a", explanation: { en: "EPS measures earnings attributable to each diluted share.", fr: "L'EPS mesure les earnings attribuables à chaque action diluée." },
    },
    {
      id: "q5", conceptKey: "valuation", question: { en: "What does a P/E-based target price require?", fr: "Que nécessite un target price basé sur le P/E ?" },
      options: [
        { id: "a", label: { en: "A justified EPS forecast and target multiple", fr: "Une prévision d'EPS et un multiple cible justifiés" } },
        { id: "b", label: { en: "Only the current share price", fr: "Seulement le cours actuel" } },
        { id: "c", label: { en: "No earnings forecast", fr: "Aucune prévision d'earnings" } },
        { id: "d", label: { en: "Only revenue growth", fr: "Seulement la croissance du CA" } },
      ], correctOption: "a", explanation: { en: "Target price = forecast EPS × target P/E, so both assumptions must be defensible.", fr: "Target price = EPS prévu × P/E cible, donc les deux hypothèses doivent être défendables." },
    },
    {
      id: "q6", conceptKey: "catalyst", question: { en: "What is a catalyst?", fr: "Qu'est-ce qu'un catalyst ?" },
      options: [
        { id: "a", label: { en: "An event that can cause investors to revise expectations", fr: "Un événement pouvant pousser les investisseurs à réviser leurs attentes" } },
        { id: "b", label: { en: "A guaranteed profit", fr: "Un profit garanti" } },
        { id: "c", label: { en: "A historical accounting item only", fr: "Seulement un poste comptable historique" } },
        { id: "d", label: { en: "A benchmark weight", fr: "Un poids de benchmark" } },
      ], correctOption: "a", explanation: { en: "Catalysts can close the gap between market expectations and the analyst's view.", fr: "Les catalysts peuvent fermer l'écart entre attentes du marché et vue de l'analyste." },
    },
    {
      id: "q7", conceptKey: "risk", question: { en: "Why build bull, base and bear cases?", fr: "Pourquoi construire bull, base et bear cases ?" },
      options: [
        { id: "a", label: { en: "To make assumptions and downside explicit", fr: "Pour rendre les hypothèses et le downside explicites" } },
        { id: "b", label: { en: "To eliminate uncertainty", fr: "Pour éliminer l'incertitude" } },
        { id: "c", label: { en: "To avoid valuation", fr: "Pour éviter la valorisation" } },
        { id: "d", label: { en: "To guarantee the base case", fr: "Pour garantir le base case" } },
      ], correctOption: "a", explanation: { en: "Scenario analysis forces the analyst to quantify a range of outcomes.", fr: "L'analyse de scénarios oblige l'analyste à quantifier plusieurs résultats possibles." },
    },
    {
      id: "q8", conceptKey: "industry", question: { en: "Can a company grow while losing market share?", fr: "Une entreprise peut-elle croître tout en perdant des parts de marché ?" },
      options: [
        { id: "a", label: { en: "Yes, if the total market grows faster than the company", fr: "Oui, si le marché total croît plus vite que l'entreprise" } },
        { id: "b", label: { en: "No, never", fr: "Non, jamais" } },
        { id: "c", label: { en: "Only if revenue is negative", fr: "Seulement si le CA est négatif" } },
        { id: "d", label: { en: "Only in fixed income", fr: "Seulement en fixed income" } },
      ], correctOption: "a", explanation: { en: "Company growth below industry growth implies market-share loss.", fr: "Une croissance de l'entreprise inférieure à celle du secteur implique une perte de parts de marché." },
    },
    {
      id: "q9", conceptKey: "research-note", question: { en: "What should the first page of a research note communicate?", fr: "Que doit communiquer la première page d'une note de recherche ?" },
      options: [
        { id: "a", label: { en: "What changed, why it matters, valuation and key risks", fr: "Ce qui a changé, pourquoi cela compte, valorisation et risques clés" } },
        { id: "b", label: { en: "Only company history", fr: "Seulement l'historique de l'entreprise" } },
        { id: "c", label: { en: "Only legal disclaimers", fr: "Seulement les disclaimers" } },
        { id: "d", label: { en: "No investment conclusion", fr: "Aucune conclusion d'investissement" } },
      ], correctOption: "a", explanation: { en: "Institutional readers need the actionable change and its financial impact quickly.", fr: "Les lecteurs institutionnels ont besoin de comprendre rapidement le changement exploitable et son impact financier." },
    },
    {
      id: "q10", conceptKey: "pitch", question: { en: "What makes a stock pitch strong?", fr: "Qu'est-ce qui rend un stock pitch solide ?" },
      options: [
        { id: "a", label: { en: "Differentiated thesis, expectations, valuation, catalyst, downside and invalidation", fr: "Thèse différenciée, attentes, valorisation, catalyst, downside et invalidation" } },
        { id: "b", label: { en: "Naming a famous company", fr: "Nommer une entreprise célèbre" } },
        { id: "c", label: { en: "Ignoring downside", fr: "Ignorer le downside" } },
        { id: "d", label: { en: "Repeating consensus", fr: "Répéter le consensus" } },
      ], correctOption: "a", explanation: { en: "A professional pitch explains both the edge and the risk-reward around that edge.", fr: "Un pitch professionnel explique à la fois l'edge et le risk-reward autour de cet edge." },
    },
  ],
  interviewPrompt: {
    question: {
      en: "Pitch a publicly traded company as if you were interviewing for an equity research role. Explain the business, the key debate, your estimates versus consensus, valuation, catalysts, risks and what would invalidate your thesis.",
      fr: "Pitch une entreprise cotée comme lors d'un entretien equity research. Explique le business, le débat clé, tes estimations versus consensus, la valorisation, les catalysts, les risques et ce qui invaliderait ta thèse.",
    },
    framework: [
      { en: "Start with one sentence on what the company does and the two or three operating drivers that matter most.", fr: "Commence par une phrase sur le business et les deux ou trois drivers les plus importants." },
      { en: "State the market debate and the expectation currently embedded in consensus or valuation.", fr: "Présente le débat de marché et l'attente intégrée au consensus ou à la valorisation." },
      { en: "Explain your differentiated earnings view with specific revenue, margin or EPS assumptions.", fr: "Explique ta vue différenciée sur les earnings avec des hypothèses précises de CA, marge ou EPS." },
      { en: "Value the stock using a primary method and one cross-check, then quantify upside and downside.", fr: "Valorise l'action avec une méthode principale et un cross-check, puis quantifie upside et downside." },
      { en: "Identify the catalysts that could close the expectation gap and the timeline for them.", fr: "Identifie les catalysts susceptibles de fermer l'expectation gap et leur calendrier." },
      { en: "Finish with the two biggest risks and the observable evidence that would invalidate your thesis.", fr: "Termine par les deux principaux risques et les preuves observables qui invalideraient ta thèse." },
    ],
    sample: {
      en: "I would begin by defining the business in one sentence and identifying the operating variables that actually drive earnings. Then I would frame the market debate: what revenue growth, margins and valuation are currently implied by consensus and the share price. My thesis would focus on one or two areas where my estimates differ materially, supported by measurable leading indicators rather than a general view that the company is high quality. I would translate those assumptions into EPS and free cash flow, value the company using the method most appropriate for the sector and cross-check it with peer multiples. I would present bull, base and bear cases, identify the specific catalysts that could force estimate revisions, and finish with the evidence that would make me change the recommendation. The goal is to show not only that I understand the company, but that I understand the expectation gap and the risk-reward in the stock.",
      fr: "Je commencerais par définir le business en une phrase et identifier les variables opérationnelles qui déterminent réellement les earnings. Ensuite je cadrerais le débat de marché : quelles hypothèses de croissance du CA, marges et valorisation sont actuellement intégrées au consensus et au cours. Ma thèse se concentrerait sur un ou deux points où mes estimations diffèrent fortement, soutenus par des indicateurs avancés mesurables plutôt que par une simple opinion sur la qualité de l'entreprise. Je traduirais ces hypothèses en EPS et free cash flow, valoriserais l'entreprise avec la méthode la plus adaptée au secteur et la comparerais aux multiples des peers. Je présenterais des scénarios bull, base et bear, identifierais les catalysts précis susceptibles de provoquer des révisions d'estimations, puis terminerais par les éléments qui me feraient changer de recommandation. Le but est de montrer non seulement que je comprends l'entreprise, mais aussi l'expectation gap et le risk-reward de l'action.",
    },
  },
};
