import type { FinanceLesson } from "./lesson-content";

export const salesTradingLesson: FinanceLesson = {
  slug: "year-3-sales-trading",
  year: { en: "Year 3 · Applied Finance", fr: "Année 3 · Finance appliquée / Applied Finance" },
  domain: { en: "Markets & Trading", fr: "Marchés & Trading / Markets & Trading" },
  title: { en: "Sales & Trading", fr: "Sales & Trading" },
  subtitle: {
    en: "Understand how institutional markets work in practice: client flow, market making, execution, equities, FICC, commodities, derivatives, Greeks, desk P&L, hedging, macro catalysts and interview-ready trade logic.",
    fr: "Comprendre le fonctionnement pratique des marchés institutionnels : client flow, market making, exécution, equities, FICC, commodities, dérivés, Greeks, P&L de desk, hedging, catalyseurs macro et logique de trade pour les entretiens.",
  },
  duration: { en: "180–220 min", fr: "180–220 min" },
  prerequisites: [
    { en: "Financial System & Market Structure", fr: "Système financier & structure de marché" },
    { en: "Fixed Income & Yield Curves", fr: "Fixed Income & Yield Curves" },
    { en: "Derivatives Foundations", fr: "Fondamentaux des dérivés / Derivatives Foundations" },
    { en: "Options & Option Greeks", fr: "Options & Greeks" },
    { en: "FX & International Finance", fr: "FX & finance internationale" },
  ],
  objectives: [
    { en: "Explain how sales, trading, structuring, research and electronic execution fit together.", fr: "Expliquer comment sales, trading, structuring, research et electronic execution travaillent ensemble." },
    { en: "Interpret bid, ask, spread, liquidity, order flow, market depth and price discovery.", fr: "Interpréter bid, ask, spread, liquidité, order flow, market depth et price discovery." },
    { en: "Understand how desks manage inventory, hedge exposures and generate P&L.", fr: "Comprendre comment les desks gèrent inventory, hedgent leurs expositions et génèrent du P&L." },
    { en: "Compare equities, rates, credit, FX and commodities desks and their main risk factors.", fr: "Comparer les desks equities, rates, credit, FX et commodities ainsi que leurs principaux facteurs de risque." },
    { en: "Use delta, gamma, vega, DV01 and spread risk to reason about derivatives and fixed-income positions.", fr: "Utiliser delta, gamma, vega, DV01 et spread risk pour raisonner sur les positions dérivées et fixed income." },
    { en: "Translate macro surprises into cross-asset market moves and build an interview-ready trade pitch.", fr: "Traduire les surprises macro en mouvements cross-asset et construire un trade pitch prêt pour les entretiens." },
  ],
  overviewFlow: {
    title: { en: "From client need to priced, hedged and monitored risk", fr: "Du besoin client au risque pricé, hedgé et suivi" },
    steps: [
      { title: { en: "Client", fr: "Client" }, detail: { en: "Need · view · order", fr: "Besoin · vue · ordre" } },
      { title: { en: "Price", fr: "Price" }, detail: { en: "Bid · ask · liquidity", fr: "Bid · ask · liquidité" } },
      { title: { en: "Execute", fr: "Exécuter" }, detail: { en: "Trade · inventory · flow", fr: "Trade · inventory · flow" } },
      { title: { en: "Hedge", fr: "Hedger" }, detail: { en: "Delta · DV01 · spread · vega", fr: "Delta · DV01 · spread · vega" } },
      { title: { en: "Monitor", fr: "Suivre" }, detail: { en: "P&L · limits · catalysts", fr: "P&L · limits · catalysts" } },
    ],
  },
  sections: [
    {
      id: "desk-structure",
      kicker: { en: "01 · HOW A TRADING FLOOR WORKS", fr: "01 · COMMENT FONCTIONNE UN TRADING FLOOR" },
      title: { en: "Sales & Trading is a client franchise built around pricing and managing risk", fr: "Sales & Trading est une franchise client construite autour du pricing et de la gestion du risque" },
      coreFacts: [
        { en: "Salespeople own client relationships, market color and trade idea communication.", fr: "Les sales gèrent les relations clients, le market color et la communication des trade ideas." },
        { en: "Traders quote prices, execute trades, manage inventory and hedge exposures.", fr: "Les traders quotent des prix, exécutent les trades, gèrent l’inventory et hedgent les expositions." },
        { en: "Structurers design payoff profiles; researchers produce views; quants and electronic teams improve pricing and execution.", fr: "Les structurers conçoivent les payoffs ; research produit les vues ; quants et équipes électroniques améliorent pricing et exécution." },
        { en: "The bank earns revenue by intermediating risk, serving flow and using balance sheet efficiently—not only by taking directional views.", fr: "La banque gagne de l’argent en intermédiant le risque, en servant le flow et en utilisant efficacement son bilan—not only en prenant des vues directionnelles." },
      ],
      explanation: {
        Beginner: { en: "Sales understands what the client wants. Trading decides what price the bank can offer and what risk the bank will hold after the trade.", fr: "Sales comprend ce que veut le client. Trading décide quel prix la banque peut offrir et quel risque elle portera après le trade." },
        Intermediate: { en: "A salesperson may bring a hedge request or market idea from a hedge fund, asset manager or corporate. The trader evaluates liquidity, inventory, volatility, hedge cost and capital usage before quoting.", fr: "Un sales peut apporter une demande de hedge ou une idée de marché d’un hedge fund, asset manager ou corporate. Le trader évalue liquidité, inventory, volatilité, coût du hedge et usage du capital avant de quoter." },
        Professional: { en: "A markets franchise monetizes client access, information, technology, balance sheet and risk intermediation. The strongest desks combine competitive pricing with disciplined inventory, capital and franchise management.", fr: "Une franchise markets monétise accès client, information, technologie, bilan et intermédiation du risque. Les meilleurs desks combinent pricing compétitif avec discipline d’inventory, de capital et de franchise." },
      },
      comparison: {
        title: { en: "Who does what on a markets platform?", fr: "Qui fait quoi sur une plateforme markets ?" },
        headers: [{ en: "Role", fr: "Rôle" }, { en: "Primary focus", fr: "Focus principal" }, { en: "Typical output", fr: "Output typique" }],
        rows: [
          { cells: [{ en: "Sales", fr: "Sales" }, { en: "Clients and ideas", fr: "Clients et idées" }, { en: "Market color, trade ideas, execution requests", fr: "Market color, trade ideas, demandes d’exécution" }] },
          { cells: [{ en: "Trading", fr: "Trading" }, { en: "Pricing and risk", fr: "Pricing et risque" }, { en: "Quotes, hedges, P&L and inventory decisions", fr: "Quotes, hedges, P&L et décisions d’inventory" }] },
          { cells: [{ en: "Structuring", fr: "Structuring" }, { en: "Customized payoff design", fr: "Design de payoffs" }, { en: "Structured trades and scenarios", fr: "Structured trades et scénarios" }] },
          { cells: [{ en: "Research", fr: "Research" }, { en: "Views and analysis", fr: "Vues et analyse" }, { en: "Themes, forecasts and catalysts", fr: "Themes, forecasts et catalysts" }] },
        ],
      },
      vocabulary: [
        { en: "FICC", fr: "FICC", definition: { en: "Fixed Income, Currencies and Commodities.", fr: "Fixed Income, Currencies and Commodities." } },
        { en: "Flow", fr: "flow", definition: { en: "Client trading activity passing through a desk.", fr: "Activité de trading des clients passant par un desk." } },
        { en: "Market color", fr: "market color", definition: { en: "Qualitative information about flows, positioning, liquidity and market tone.", fr: "Information qualitative sur flows, positioning, liquidité et ton de marché." } },
      ],
    },
    {
      id: "microstructure",
      kicker: { en: "02 · BID, ASK, SPREAD & LIQUIDITY", fr: "02 · BID, ASK, SPREAD & LIQUIDITÉ" },
      title: { en: "The bid-ask spread is the price of immediacy and risk transfer", fr: "Le bid-ask spread est le prix de l’immédiateté et du transfert de risque" },
      coreFacts: [
        { en: "Bid is the dealer's buy price; ask is the dealer's sell price.", fr: "Le bid est le prix d’achat du dealer ; l’ask est son prix de vente." },
        { en: "Tighter spreads usually indicate better liquidity, all else equal.", fr: "Des spreads plus serrés indiquent généralement une meilleure liquidité, toutes choses égales par ailleurs." },
        { en: "Spread width reflects volatility, market depth, inventory risk, adverse selection and hedging cost.", fr: "La largeur du spread reflète volatilité, market depth, inventory risk, adverse selection et coût du hedge." },
        { en: "Liquidity can deteriorate sharply during stress even before headline volatility peaks.", fr: "La liquidité peut se détériorer fortement en période de stress avant même que la volatilité headline ne culmine." },
      ],
      explanation: {
        Beginner: { en: "If a stock is 99.90 bid / 100.10 ask, a client can sell near 99.90 or buy near 100.10. The 0.20 difference is the spread.", fr: "Si une action cote 99,90 bid / 100,10 ask, un client peut vendre près de 99,90 ou acheter près de 100,10. La différence de 0,20 est le spread." },
        Intermediate: { en: "A dealer needs compensation because taking the other side of a client trade creates inventory and the risk that the market moves before the position is hedged or offset.", fr: "Un dealer doit être rémunéré car prendre l’autre côté d’un trade client crée de l’inventory et le risque que le marché bouge avant le hedge ou l’offset." },
        Professional: { en: "Quote formation reflects expected hedge slippage, information asymmetry, capital usage, inventory concentration and competitive pressure. Quote skew can be used to attract flow that reduces an unwanted position.", fr: "La formation des quotes reflète hedge slippage attendu, asymétrie d’information, usage du capital, concentration d’inventory et pression concurrentielle. Le quote skew peut attirer du flow réduisant une position indésirable." },
      },
      formula: {
        label: { en: "Bid-ask spread", fr: "Bid-ask spread" },
        expression: "Spread = Ask − Bid; Relative Spread = (Ask − Bid) / Midpoint",
        explanation: { en: "Relative spread makes liquidity comparable across different price levels.", fr: "Le spread relatif permet de comparer la liquidité entre différents niveaux de prix." },
        workedExample: { en: "99.90 / 100.10 → absolute spread 0.20; midpoint 100.00; relative spread 0.20%.", fr: "99,90 / 100,10 → spread absolu 0,20 ; midpoint 100,00 ; spread relatif 0,20 %." },
      },
      vocabulary: [
        { en: "Market depth", fr: "profondeur de marché", definition: { en: "Executable quantity available around current prices.", fr: "Quantité exécutable disponible autour des prix actuels." } },
        { en: "Adverse selection", fr: "adverse selection", definition: { en: "Risk of trading against a better-informed counterparty.", fr: "Risque de trader face à une contrepartie mieux informée." } },
        { en: "Slippage", fr: "slippage", definition: { en: "Difference between expected execution price and actual execution price.", fr: "Écart entre prix d’exécution attendu et prix réellement obtenu." } },
      ],
    },
    {
      id: "market-making",
      kicker: { en: "03 · MARKET MAKING & INVENTORY", fr: "03 · MARKET MAKING & INVENTORY" },
      title: { en: "Market makers provide liquidity while constantly reshaping risk", fr: "Les market makers fournissent de la liquidité tout en remodelant constamment le risque" },
      coreFacts: [
        { en: "Client trades can leave the desk long or short inventory.", fr: "Les trades clients peuvent laisser le desk long ou short en inventory." },
        { en: "The desk can warehouse risk, hedge it or offset it with opposite client flow.", fr: "Le desk peut warehouse le risque, le hedger ou l’offset avec un flow client opposé." },
        { en: "Inventory changes quoting behavior because the dealer may prefer one direction of flow over the other.", fr: "L’inventory modifie le comportement de quote car le dealer peut préférer un sens de flow à l’autre." },
        { en: "Good market making balances competitiveness, client service and risk-adjusted profitability.", fr: "Un bon market making équilibre compétitivité, service client et profitabilité ajustée du risque." },
      ],
      explanation: {
        Beginner: { en: "If a client urgently sells bonds, the dealer may buy them before another buyer appears. The dealer provides liquidity but now owns the bonds and the risk.", fr: "Si un client vend urgemment des obligations, le dealer peut les acheter avant qu’un autre acheteur n’apparaisse. Il fournit de la liquidité mais détient maintenant les obligations et le risque." },
        Intermediate: { en: "A corporate-bond trader who buys $20m from a client may hedge rate duration with Treasuries or futures, hedge broad credit beta with an index, then look for another client to take the specific bond risk.", fr: "Un trader crédit achetant 20 M$ à un client peut hedger la duration taux avec Treasuries ou futures, hedger le beta crédit via un index, puis chercher un autre client pour reprendre le risque spécifique de l’obligation." },
        Professional: { en: "Inventory management is dynamic: quote width, skew and hedge urgency depend on liquidity, volatility, correlation, balance-sheet consumption, risk limits and expected client flow.", fr: "La gestion d’inventory est dynamique : quote width, skew et urgence du hedge dépendent de liquidité, volatilité, corrélation, consommation de bilan, risk limits et client flow attendu." },
      },
      vocabulary: [
        { en: "Warehouse risk", fr: "warehouse risk", definition: { en: "Risk temporarily held before being offset or hedged.", fr: "Risque temporairement détenu avant d’être offset ou hedgé." } },
        { en: "Quote skew", fr: "quote skew", definition: { en: "Asymmetric pricing intended to influence the direction of incoming flow.", fr: "Pricing asymétrique visant à influencer le sens du flow entrant." } },
      ],
    },
    {
      id: "risk-pnl",
      kicker: { en: "04 · P&L, LIMITS & HEDGING", fr: "04 · P&L, LIMITS & HEDGING" },
      title: { en: "A desk is judged on P&L only in the context of the risk used to earn it", fr: "Un desk est jugé sur son P&L seulement dans le contexte du risque utilisé pour le générer" },
      coreFacts: [
        { en: "Desk P&L can come from spread capture, directional moves, carry, financing, client flow and hedging outcomes.", fr: "Le P&L du desk peut venir du spread capture, mouvements directionnels, carry, financement, client flow et résultats de hedging." },
        { en: "Risk limits may constrain delta, DV01, vega, spread risk, gross position and stress loss.", fr: "Les risk limits peuvent contraindre delta, DV01, vega, spread risk, gross position et stress loss." },
        { en: "Hedging reduces selected sensitivities but creates basis, liquidity or execution risk.", fr: "Le hedging réduit certaines sensibilités mais crée basis, liquidity ou execution risk." },
        { en: "A high P&L trade can be unattractive if it consumes too much capital or tail risk.", fr: "Un trade à fort P&L peut être peu attractif s’il consomme trop de capital ou de tail risk." },
      ],
      explanation: {
        Beginner: { en: "The trader asks two questions together: how much money did the desk make, and how much risk did it take to make it?", fr: "Le trader pose deux questions ensemble : combien le desk a-t-il gagné, et combien de risque a-t-il pris pour gagner cet argent ?" },
        Intermediate: { en: "A bond desk may hedge rates but keep credit spread risk. An options desk may hedge delta but remain exposed to gamma and vega. A hedge changes the shape of risk rather than making risk vanish.", fr: "Un desk obligataire peut hedger les taux mais garder le credit spread risk. Un desk options peut hedger delta mais rester exposé à gamma et vega. Un hedge transforme la forme du risque plutôt que de le faire disparaître." },
        Professional: { en: "Professional risk management combines Greeks or curve sensitivities with stress tests, scenario P&L, liquidity assumptions, concentration limits and capital usage. The most dangerous exposures often appear in correlations or non-linear moves rather than in one headline metric.", fr: "La gestion professionnelle du risque combine Greeks ou sensibilités de courbe avec stress tests, scenario P&L, hypothèses de liquidité, limites de concentration et usage du capital. Les expositions les plus dangereuses apparaissent souvent dans les corrélations ou mouvements non linéaires plutôt que dans une seule métrique headline." },
      },
      formula: {
        label: { en: "Simplified desk P&L", fr: "P&L de desk simplifié" },
        expression: "P&L ≈ Spread Revenue + Carry + Market Move P&L − Hedging Costs − Funding Costs",
        explanation: { en: "Actual P&L attribution is product-specific and decomposes individual risk factors.", fr: "L’attribution réelle du P&L dépend du produit et décompose les facteurs de risque individuellement." },
      },
      vocabulary: [
        { en: "DV01", fr: "DV01", definition: { en: "Approximate dollar change in value for a 1 bp move in yield.", fr: "Variation approximative en dollars de la valeur pour un mouvement de 1 bp du yield." } },
        { en: "Basis risk", fr: "basis risk", definition: { en: "Risk that the hedge and the underlying position do not move perfectly together.", fr: "Risque que le hedge et la position sous-jacente n’évoluent pas parfaitement ensemble." } },
        { en: "Stress loss", fr: "stress loss", definition: { en: "Estimated loss under an adverse scenario rather than a small normal move.", fr: "Perte estimée dans un scénario défavorable plutôt que pour un petit mouvement normal." } },
      ],
    },
    {
      id: "asset-classes",
      kicker: { en: "05 · EQUITIES, RATES, CREDIT, FX & COMMODITIES", fr: "05 · EQUITIES, RATES, CREDIT, FX & COMMODITIES" },
      title: { en: "Each desk expresses a different economic risk", fr: "Chaque desk exprime un risque économique différent" },
      coreFacts: [
        { en: "Equities trade company earnings, valuation, flows, volatility and corporate events.", fr: "Les equities tradent earnings, valuation, flows, volatilité et corporate events." },
        { en: "Rates trade policy expectations, inflation, growth, yield curves and duration.", fr: "Les rates tradent policy expectations, inflation, croissance, yield curves et duration." },
        { en: "Credit trades default risk, spread compensation, recovery, leverage and liquidity.", fr: "Le credit trade default risk, spread compensation, recovery, leverage et liquidité." },
        { en: "FX trades relative macro outcomes across countries; commodities add physical supply, inventories, seasonality and geopolitics.", fr: "Le FX trade les résultats macro relatifs entre pays ; les commodities ajoutent offre physique, inventories, saisonnalité et géopolitique." },
      ],
      explanation: {
        Beginner: { en: "Different markets answer different questions: stocks ask what a company is worth; rates ask where interest rates are going; credit asks whether a borrower can repay; FX compares economies; commodities connect finance to physical supply and demand.", fr: "Les marchés répondent à des questions différentes : les actions demandent combien vaut une entreprise ; les rates où vont les taux ; le credit si l’emprunteur peut rembourser ; le FX compare les économies ; les commodities relient finance et offre-demande physique." },
        Intermediate: { en: "A hot inflation print can push bond yields higher, strengthen a currency if relative policy becomes more hawkish, compress equity multiples and widen credit spreads. Oil can move differently if the same inflation shock reflects an energy supply disruption.", fr: "Une inflation forte peut faire monter les yields, renforcer une devise si la policy relative devient plus hawkish, comprimer les multiples equity et élargir les credit spreads. Le pétrole peut réagir différemment si le même choc d’inflation vient d’une rupture d’offre énergétique." },
        Professional: { en: "Cross-asset trading requires identifying the dominant transmission channel. The same shock can be growth-positive, inflationary, liquidity-negative or geopolitically driven, producing different correlations across regimes.", fr: "Le cross-asset trading exige d’identifier le canal de transmission dominant. Le même choc peut être positif pour la croissance, inflationniste, négatif pour la liquidité ou géopolitique, produisant des corrélations différentes selon les régimes." },
      },
      comparison: {
        title: { en: "What each major desk watches", fr: "Ce que surveille chaque grand desk" },
        headers: [{ en: "Desk", fr: "Desk" }, { en: "Core risk", fr: "Risque clé" }, { en: "Typical drivers", fr: "Drivers typiques" }],
        rows: [
          { cells: [{ en: "Equities", fr: "Equities" }, { en: "Earnings / valuation / volatility", fr: "Earnings / valuation / volatilité" }, { en: "Company news, flows, macro", fr: "News entreprise, flows, macro" }] },
          { cells: [{ en: "Rates", fr: "Rates" }, { en: "Duration / curve / policy", fr: "Duration / curve / policy" }, { en: "Inflation, growth, central banks", fr: "Inflation, croissance, banques centrales" }] },
          { cells: [{ en: "Credit", fr: "Credit" }, { en: "Spread / default / liquidity", fr: "Spread / défaut / liquidité" }, { en: "Leverage, cash flow, risk appetite", fr: "Leverage, cash flow, risk appetite" }] },
          { cells: [{ en: "FX", fr: "FX" }, { en: "Relative macro / rates", fr: "Macro relative / taux" }, { en: "Policy, flows, growth differentials", fr: "Policy, flows, différentiels de croissance" }] },
          { cells: [{ en: "Commodities", fr: "Commodities" }, { en: "Physical balance / curve", fr: "Balance physique / courbe" }, { en: "Supply, inventories, weather, geopolitics", fr: "Offre, inventories, météo, géopolitique" }] },
        ],
      },
      vocabulary: [
        { en: "Term structure", fr: "term structure", definition: { en: "Relationship between prices or yields across maturities.", fr: "Relation entre prix ou yields selon les maturités." } },
        { en: "Contango", fr: "contango", definition: { en: "Futures curve where later maturities trade above nearer maturities.", fr: "Courbe futures où les maturités lointaines cotent au-dessus des maturités proches." } },
        { en: "Backwardation", fr: "backwardation", definition: { en: "Futures curve where nearer maturities trade above later maturities.", fr: "Courbe futures où les maturités proches cotent au-dessus des maturités lointaines." } },
      ],
    },
    {
      id: "options-greeks",
      kicker: { en: "06 · OPTIONS, VOLATILITY & GREEKS", fr: "06 · OPTIONS, VOLATILITÉ & GREEKS" },
      title: { en: "Options desks trade both direction and the shape of uncertainty", fr: "Les desks options tradent à la fois la direction et la forme de l’incertitude" },
      coreFacts: [
        { en: "Delta measures first-order sensitivity to the underlying price.", fr: "Delta mesure la sensibilité de premier ordre au prix du sous-jacent." },
        { en: "Gamma measures how delta changes when the underlying moves.", fr: "Gamma mesure comment delta change lorsque le sous-jacent bouge." },
        { en: "Vega measures sensitivity to implied volatility.", fr: "Vega mesure la sensibilité à la volatilité implicite." },
        { en: "Theta captures time decay; options positions can be delta-hedged while retaining gamma, vega and other risks.", fr: "Theta capture la dépréciation temporelle ; une position options peut être delta-hedged tout en gardant gamma, vega et d’autres risques." },
      ],
      explanation: {
        Beginner: { en: "Buying an option is not only a bet on up or down. It is also a bet on how much the market may move and when.", fr: "Acheter une option n’est pas seulement parier sur hausse ou baisse. C’est aussi parier sur l’ampleur du mouvement et son timing." },
        Intermediate: { en: "A trader can hedge delta by trading the underlying, but if gamma is large the required hedge changes as spot moves. A vega-heavy position is sensitive to changes in implied volatility even if spot is unchanged.", fr: "Un trader peut hedger delta avec le sous-jacent, mais si gamma est élevé, le hedge requis change quand le spot bouge. Une position fortement vega est sensible aux changements de volatilité implicite même si le spot ne bouge pas." },
        Professional: { en: "Options market making requires managing a portfolio of non-linear exposures across strike and maturity. Surface dynamics, skew, term structure, realized versus implied volatility and event risk matter as much as simple delta direction.", fr: "Le market making options exige de gérer un portefeuille d’expositions non linéaires selon strike et maturité. Dynamics de surface, skew, term structure, volatilité réalisée vs implicite et event risk comptent autant que la simple direction delta." },
      },
      formula: {
        label: { en: "First-order options P&L intuition", fr: "Intuition de P&L options au premier ordre" },
        expression: "ΔOption ≈ Delta×ΔSpot + 0.5×Gamma×(ΔSpot)^2 + Vega×ΔIV + Theta×ΔTime",
        explanation: { en: "This is an approximation used to understand which sensitivities are driving option P&L.", fr: "C’est une approximation utilisée pour comprendre quelles sensibilités déterminent le P&L d’une option." },
      },
      vocabulary: [
        { en: "Implied volatility", fr: "volatilité implicite", definition: { en: "Volatility level embedded in option prices.", fr: "Niveau de volatilité incorporé dans les prix des options." } },
        { en: "Volatility skew", fr: "volatility skew", definition: { en: "Difference in implied volatility across strikes.", fr: "Différence de volatilité implicite selon les strikes." } },
        { en: "Delta hedge", fr: "delta hedge", definition: { en: "Offsetting first-order directional exposure with the underlying or another instrument.", fr: "Offset de l’exposition directionnelle de premier ordre avec le sous-jacent ou un autre instrument." } },
      ],
    },
    {
      id: "execution",
      kicker: { en: "07 · EXECUTION & ORDER FLOW", fr: "07 · EXÉCUTION & ORDER FLOW" },
      title: { en: "Execution quality is a trade-off between speed, certainty and market impact", fr: "La qualité d’exécution arbitre entre vitesse, certitude et market impact" },
      coreFacts: [
        { en: "Large orders can move prices by consuming available liquidity.", fr: "Les gros ordres peuvent déplacer les prix en consommant la liquidité disponible." },
        { en: "Fast execution reduces timing risk but can increase market impact.", fr: "Une exécution rapide réduit le timing risk mais peut augmenter le market impact." },
        { en: "Slow execution can reduce immediate impact but increases information leakage and market-move risk.", fr: "Une exécution lente peut réduire l’impact immédiat mais augmente information leakage et risque de mouvement du marché." },
        { en: "Voice execution remains relevant in complex or illiquid products; electronic execution dominates many standardized liquid markets.", fr: "Le voice execution reste pertinent sur les produits complexes ou illiquides ; l’électronique domine de nombreux marchés standardisés et liquides." },
      ],
      explanation: {
        Beginner: { en: "Buying one share rarely moves the market. Buying millions of shares quickly can consume all available sellers near the current price and push the price higher.", fr: "Acheter une action bouge rarement le marché. Acheter des millions d’actions rapidement peut consommer tous les vendeurs disponibles près du prix actuel et faire monter le prix." },
        Intermediate: { en: "Execution choices depend on order size, urgency, benchmark, liquidity and whether revealing the order could make future fills more expensive.", fr: "Les choix d’exécution dépendent de la taille, urgence, benchmark, liquidité et du risque que révéler l’ordre rende les futurs fills plus chers." },
        Professional: { en: "Execution analytics assess spread cost, market impact, timing risk, venue selection, fill probability and benchmark slippage. Optimal execution is objective-specific rather than universally fastest or cheapest.", fr: "Les execution analytics évaluent spread cost, market impact, timing risk, venue selection, fill probability et benchmark slippage. L’exécution optimale dépend de l’objectif plutôt que d’être toujours la plus rapide ou la moins chère." },
      },
      vocabulary: [
        { en: "Market impact", fr: "market impact", definition: { en: "Price movement caused by the act of executing the order.", fr: "Mouvement de prix causé par l’exécution de l’ordre." } },
        { en: "Fill", fr: "fill", definition: { en: "Execution of part or all of an order.", fr: "Exécution de tout ou partie d’un ordre." } },
        { en: "VWAP", fr: "VWAP", definition: { en: "Volume-weighted average price, often used as an execution benchmark.", fr: "Prix moyen pondéré par les volumes, souvent utilisé comme benchmark d’exécution." } },
      ],
    },
    {
      id: "macro-cross-asset",
      kicker: { en: "08 · MACRO CATALYSTS & CROSS-ASSET", fr: "08 · CATALYSEURS MACRO & CROSS-ASSET" },
      title: { en: "Markets move on surprises versus expectations, then through transmission channels", fr: "Les marchés bougent sur les surprises versus attentes, puis via des canaux de transmission" },
      coreFacts: [
        { en: "Central-bank decisions, inflation, jobs and growth data can move rates, FX, equities, credit and commodities together.", fr: "Banques centrales, inflation, emploi et croissance peuvent bouger ensemble rates, FX, equities, credit et commodities." },
        { en: "The headline matters less than the difference between actual outcomes and what was priced in.", fr: "Le headline compte moins que l’écart entre le résultat réel et ce qui était pricé." },
        { en: "Positioning and liquidity determine whether an initial move is amplified or faded.", fr: "Le positioning et la liquidité déterminent si le mouvement initial est amplifié ou retracé." },
        { en: "Correlations change by regime; a stronger economy can be positive or negative for equities depending on inflation and policy implications.", fr: "Les corrélations changent selon le régime ; une économie plus forte peut être positive ou négative pour les equities selon les implications inflation/policy." },
      ],
      explanation: {
        Beginner: { en: "A strong jobs number can hurt stocks if investors think it means interest rates will stay high. Markets react to what the data means for future policy, not just whether the number looks good.", fr: "Un bon chiffre d’emploi peut faire baisser les actions si les investisseurs pensent qu’il signifie des taux élevés plus longtemps. Les marchés réagissent à ce que la donnée implique pour la policy future, pas seulement au fait que le chiffre paraît bon." },
        Intermediate: { en: "A hawkish surprise often pushes front-end yields higher first. That can support the currency, pressure high-duration equities and tighten financial conditions. Credit may widen if the market interprets the move as growth-negative or balance-sheet restrictive.", fr: "Une surprise hawkish fait souvent monter les yields courts d’abord. Cela peut soutenir la devise, peser sur les equities à forte duration et resserrer les conditions financières. Le credit peut s’élargir si le marché interprète le mouvement comme négatif pour la croissance ou restrictif pour les bilans." },
        Professional: { en: "A good cross-asset explanation separates shock, expectation gap, first-order repricing, second-order transmission and positioning. This is more robust than memorizing fixed relationships such as 'rates up = stocks down'.", fr: "Une bonne explication cross-asset sépare choc, expectation gap, repricing de premier ordre, transmission de second ordre et positioning. C’est plus robuste que mémoriser des relations fixes comme « rates up = stocks down »." },
      },
      marketConnection: { en: "For every catalyst ask: what was expected, what happened, what changed in the path, and where was positioning vulnerable?", fr: "Pour chaque catalyst : qu’attendait le marché, qu’est-il arrivé, qu’est-ce qui a changé dans la trajectoire, et où le positioning était-il vulnérable ?" },
      vocabulary: [
        { en: "Priced in", fr: "pricé", definition: { en: "Already reflected in current prices.", fr: "Déjà intégré dans les prix actuels." } },
        { en: "Hawkish", fr: "hawkish", definition: { en: "More restrictive monetary-policy stance or communication.", fr: "Orientation ou communication monétaire plus restrictive." } },
        { en: "Dovish", fr: "dovish", definition: { en: "More accommodative monetary-policy stance or communication.", fr: "Orientation ou communication monétaire plus accommodante." } },
      ],
    },
    {
      id: "trade-pitch",
      kicker: { en: "09 · BUILDING A TRADE IDEA", fr: "09 · CONSTRUIRE UNE TRADE IDEA" },
      title: { en: "A trade idea needs a view, a mispricing, a catalyst, implementation and an invalidation point", fr: "Une trade idea a besoin d’une vue, d’un mispricing, d’un catalyst, d’une implémentation et d’un point d’invalidation" },
      coreFacts: [
        { en: "A thesis explains why current pricing is wrong or incomplete.", fr: "Une thèse explique pourquoi le pricing actuel est erroné ou incomplet." },
        { en: "A catalyst explains what may cause repricing.", fr: "Un catalyst explique ce qui peut provoquer le repricing." },
        { en: "Implementation determines which instrument best expresses the view.", fr: "L’implémentation détermine quel instrument exprime le mieux la vue." },
        { en: "Risk management requires a clear invalidation condition and downside scenario.", fr: "La gestion du risque exige une condition d’invalidation claire et un scénario downside." },
      ],
      explanation: {
        Beginner: { en: "Do not say only 'I think this stock will rise.' Explain why the market is wrong, what can change the price, what you would buy or sell and what would prove you wrong.", fr: "Ne dis pas seulement « je pense que cette action va monter ». Explique pourquoi le marché se trompe, ce qui peut changer le prix, ce que tu achèterais ou vendrais et ce qui prouverait que tu as tort." },
        Intermediate: { en: "A clean pitch is: instrument, direction, thesis, catalyst, current pricing, target, time horizon, key risks and invalidation. Strong pitches explicitly compare your view with consensus expectations.", fr: "Un pitch propre suit : instrument, direction, thèse, catalyst, pricing actuel, target, horizon, risques clés et invalidation. Les bons pitches comparent explicitement ta vue au consensus." },
        Professional: { en: "Institutional trade construction adds sizing, liquidity, carry, convexity, event risk, hedge design and asymmetry. A correct thesis can still be a bad trade if the entry level or instrument choice is poor.", fr: "La construction institutionnelle ajoute sizing, liquidité, carry, convexity, event risk, design du hedge et asymétrie. Une thèse correcte peut rester un mauvais trade si le niveau d’entrée ou le choix d’instrument est mauvais." },
      },
      vocabulary: [
        { en: "Catalyst", fr: "catalyseur", definition: { en: "Event or information expected to trigger repricing.", fr: "Événement ou information censé provoquer un repricing." } },
        { en: "Invalidation", fr: "invalidation", definition: { en: "Evidence that would make the thesis no longer valid.", fr: "Élément qui rendrait la thèse invalide." } },
        { en: "Asymmetry", fr: "asymétrie", definition: { en: "Difference between expected upside and downside distributions.", fr: "Différence entre distributions d’upside et de downside attendues." } },
      ],
    },
    {
      id: "interviews",
      kicker: { en: "10 · SALES & TRADING INTERVIEWS", fr: "10 · ENTRETIENS SALES & TRADING" },
      title: { en: "Interviews test market logic, technical fluency and the ability to think under uncertainty", fr: "Les entretiens testent logique de marché, technique et capacité à réfléchir sous incertitude" },
      coreFacts: [
        { en: "Candidates are commonly asked what is moving markets and why.", fr: "Les candidats doivent souvent expliquer ce qui fait bouger les marchés et pourquoi." },
        { en: "Technical questions often cover bonds, curves, FX, options, volatility, bid-ask spreads and hedging.", fr: "Les questions techniques couvrent souvent bonds, curves, FX, options, volatilité, bid-ask spreads et hedging." },
        { en: "Mental math and probability questions test speed and structured thinking more than memorized formulas.", fr: "Les questions de calcul mental et probabilité testent vitesse et raisonnement structuré plus que mémorisation de formules." },
        { en: "A strong answer separates observation from inference and states what could make the view wrong.", fr: "Une bonne réponse sépare observation et interprétation et dit ce qui pourrait rendre la vue fausse." },
      ],
      explanation: {
        Beginner: { en: "You do not need perfect predictions. You need to explain the drivers, what the market expected and why your conclusion follows logically.", fr: "Tu n’as pas besoin de prédictions parfaites. Tu dois expliquer les drivers, ce que le marché attendait et pourquoi ta conclusion suit logiquement." },
        Intermediate: { en: "For a market question use: what happened → what was expected → what surprised → transmission into asset prices → key risk to the view.", fr: "Pour une question de marché : ce qui s’est passé → ce qui était attendu → la surprise → transmission vers les prix → principal risque à la vue." },
        Professional: { en: "Strong candidates can discuss current markets without overclaiming certainty, connect products across asset classes and explain how a desk would price, hedge or express the view in a tradeable form.", fr: "Les bons candidats discutent des marchés sans prétendre à la certitude, connectent les produits cross-asset et expliquent comment un desk pourrait pricer, hedger ou exprimer la vue sous une forme tradable." },
      },
      comparison: {
        title: { en: "A strong market answer", fr: "Une bonne réponse marché" },
        headers: [{ en: "Step", fr: "Étape" }, { en: "Question", fr: "Question" }],
        rows: [
          { cells: [{ en: "1. Observe", fr: "1. Observer" }, { en: "What moved?", fr: "Qu’est-ce qui a bougé ?" }] },
          { cells: [{ en: "2. Benchmark", fr: "2. Comparer" }, { en: "What was expected?", fr: "Qu’est-ce qui était attendu ?" }] },
          { cells: [{ en: "3. Explain", fr: "3. Expliquer" }, { en: "What was the transmission mechanism?", fr: "Quel était le mécanisme de transmission ?" }] },
          { cells: [{ en: "4. Challenge", fr: "4. Challenger" }, { en: "What could reverse the move?", fr: "Qu’est-ce qui pourrait inverser le mouvement ?" }] },
        ],
      },
      vocabulary: [
        { en: "Risk-reward", fr: "risk-reward", definition: { en: "Relationship between potential gain and potential loss.", fr: "Relation entre gain potentiel et perte potentielle." } },
        { en: "Conviction", fr: "conviction", definition: { en: "Strength of a view based on evidence, not certainty.", fr: "Force d’une vue fondée sur les preuves, pas sur la certitude." } },
      ],
    },
  ],
  quiz: [
    { id: "q1", conceptKey: "desk-roles", question: { en: "What is the clearest distinction between sales and trading?", fr: "Quelle est la distinction la plus claire entre sales et trading ?" }, options: [
      { id: "a", label: { en: "Sales focuses on clients; trading focuses on pricing and risk", fr: "Sales se concentre sur les clients ; trading sur pricing et risque" } },
      { id: "b", label: { en: "Sales manages accounting; trading manages taxes", fr: "Sales gère accounting ; trading gère les taxes" } },
      { id: "c", label: { en: "There is no difference", fr: "Il n’y a aucune différence" } },
      { id: "d", label: { en: "Sales only trades personal accounts", fr: "Sales trade uniquement des comptes personnels" } },
    ], correctOption: "a", explanation: { en: "Sales owns client relationships; trading prices and manages risk.", fr: "Sales gère la relation client ; trading price et gère le risque." } },
    { id: "q2", conceptKey: "spread", question: { en: "Bid = 99.90 and ask = 100.10. What is the absolute spread?", fr: "Bid = 99,90 et ask = 100,10. Quel est le spread absolu ?" }, options: [
      { id: "a", label: { en: "0.20", fr: "0,20" } }, { id: "b", label: { en: "100.00", fr: "100,00" } }, { id: "c", label: { en: "0.02", fr: "0,02" } }, { id: "d", label: { en: "200.00", fr: "200,00" } },
    ], correctOption: "a", explanation: { en: "Ask − bid = 0.20.", fr: "Ask − bid = 0,20." } },
    { id: "q3", conceptKey: "inventory", question: { en: "A dealer buys bonds from a client and has not offset them. What is happening?", fr: "Un dealer achète des obligations à un client sans les offset. Que se passe-t-il ?" }, options: [
      { id: "a", label: { en: "The dealer is warehousing inventory risk", fr: "Le dealer porte temporairement de l’inventory risk" } }, { id: "b", label: { en: "The risk disappears", fr: "Le risque disparaît" } }, { id: "c", label: { en: "The bonds become equity", fr: "Les obligations deviennent de l’equity" } }, { id: "d", label: { en: "There is no balance-sheet impact", fr: "Il n’y a aucun impact bilan" } },
    ], correctOption: "a", explanation: { en: "The dealer owns the position until it is sold, offset or hedged.", fr: "Le dealer détient la position jusqu’à sa revente, son offset ou son hedge." } },
    { id: "q4", conceptKey: "dv01", question: { en: "What does DV01 measure?", fr: "Que mesure DV01 ?" }, options: [
      { id: "a", label: { en: "Approximate dollar value change for a 1 bp move in yield", fr: "Variation approximative en dollars pour 1 bp de mouvement du yield" } }, { id: "b", label: { en: "Equity dividend growth only", fr: "Uniquement la croissance des dividendes" } }, { id: "c", label: { en: "FX spot volume", fr: "Le volume spot FX" } }, { id: "d", label: { en: "Option time decay", fr: "Le time decay d’une option" } },
    ], correctOption: "a", explanation: { en: "DV01 is a core rates sensitivity measure.", fr: "DV01 est une mesure centrale de sensibilité aux taux." } },
    { id: "q5", conceptKey: "greeks", question: { en: "Which Greek measures sensitivity to implied volatility?", fr: "Quel Greek mesure la sensibilité à la volatilité implicite ?" }, options: [
      { id: "a", label: { en: "Vega", fr: "Vega" } }, { id: "b", label: { en: "Delta", fr: "Delta" } }, { id: "c", label: { en: "Theta", fr: "Theta" } }, { id: "d", label: { en: "DV01", fr: "DV01" } },
    ], correctOption: "a", explanation: { en: "Vega measures sensitivity to changes in implied volatility.", fr: "Vega mesure la sensibilité aux changements de volatilité implicite." } },
    { id: "q6", conceptKey: "gamma", question: { en: "Why can a delta-hedged option position still have directional risk?", fr: "Pourquoi une position option delta-hedged peut-elle encore avoir du risque directionnel ?" }, options: [
      { id: "a", label: { en: "Because gamma changes delta as spot moves", fr: "Parce que gamma change delta lorsque le spot bouge" } }, { id: "b", label: { en: "Because delta never changes", fr: "Parce que delta ne change jamais" } }, { id: "c", label: { en: "Because options have no volatility risk", fr: "Parce que les options n’ont aucun risque de volatilité" } }, { id: "d", label: { en: "Because hedging eliminates all risk", fr: "Parce que le hedging élimine tout le risque" } },
    ], correctOption: "a", explanation: { en: "Gamma means delta itself changes with the underlying.", fr: "Gamma signifie que delta change avec le sous-jacent." } },
    { id: "q7", conceptKey: "macro", question: { en: "Why can a strong economic release make equities fall?", fr: "Pourquoi une bonne donnée économique peut-elle faire baisser les actions ?" }, options: [
      { id: "a", label: { en: "It may imply tighter monetary policy than markets had priced", fr: "Elle peut impliquer une policy plus restrictive que ce que le marché avait pricé" } }, { id: "b", label: { en: "Strong data always lowers earnings", fr: "Une bonne donnée réduit toujours les earnings" } }, { id: "c", label: { en: "Markets ignore expectations", fr: "Les marchés ignorent les attentes" } }, { id: "d", label: { en: "Strong data eliminates volatility", fr: "Une bonne donnée élimine la volatilité" } },
    ], correctOption: "a", explanation: { en: "Markets react to the surprise and its policy implications, not the headline alone.", fr: "Les marchés réagissent à la surprise et à ses implications de policy, pas seulement au headline." } },
    { id: "q8", conceptKey: "commodities", question: { en: "What does backwardation describe?", fr: "Que décrit la backwardation ?" }, options: [
      { id: "a", label: { en: "Nearer futures priced above later maturities", fr: "Des futures proches pricés au-dessus des maturités lointaines" } }, { id: "b", label: { en: "Every futures maturity at the same price", fr: "Toutes les maturités futures au même prix" } }, { id: "c", label: { en: "Later maturities always above spot", fr: "Les maturités lointaines toujours au-dessus du spot" } }, { id: "d", label: { en: "An equity dividend policy", fr: "Une politique de dividende equity" } },
    ], correctOption: "a", explanation: { en: "Backwardation means the front of the futures curve is elevated relative to later maturities.", fr: "Backwardation signifie que le front de la courbe futures est élevé par rapport aux maturités lointaines." } },
    { id: "q9", conceptKey: "execution", question: { en: "Why can a large order create market impact?", fr: "Pourquoi un gros ordre peut-il créer du market impact ?" }, options: [
      { id: "a", label: { en: "It consumes available liquidity and can reveal supply-demand imbalance", fr: "Il consomme la liquidité disponible et peut révéler un déséquilibre offre-demande" } }, { id: "b", label: { en: "Large orders never interact with the market", fr: "Les gros ordres n’interagissent jamais avec le marché" } }, { id: "c", label: { en: "Prices are legally fixed", fr: "Les prix sont légalement fixes" } }, { id: "d", label: { en: "All orders execute at one price forever", fr: "Tous les ordres s’exécutent toujours au même prix" } },
    ], correctOption: "a", explanation: { en: "Large orders consume depth and can signal directional demand or supply.", fr: "Les gros ordres consomment la profondeur et peuvent signaler une demande ou offre directionnelle." } },
    { id: "q10", conceptKey: "trade-pitch", question: { en: "What should a strong trade pitch include?", fr: "Que doit inclure un bon trade pitch ?" }, options: [
      { id: "a", label: { en: "Thesis, catalyst, pricing, implementation, horizon, risks and invalidation", fr: "Thèse, catalyst, pricing, implémentation, horizon, risques et invalidation" } }, { id: "b", label: { en: "Only direction", fr: "Seulement la direction" } }, { id: "c", label: { en: "Only the asset name", fr: "Seulement le nom de l’actif" } }, { id: "d", label: { en: "No downside discussion", fr: "Aucune discussion du downside" } },
    ], correctOption: "a", explanation: { en: "A professional pitch needs both upside logic and a disciplined risk framework.", fr: "Un pitch professionnel a besoin d’une logique d’upside et d’un cadre de risque discipliné." } },
  ],
  interviewPrompt: {
    question: {
      en: "A central bank is more hawkish than expected. Walk me through the likely first-order and second-order market reactions, then give one trade expression and its main risk.",
      fr: "Une banque centrale est plus hawkish qu’attendu. Explique les réactions de marché de premier et second ordre, puis donne une expression de trade et son principal risque.",
    },
    framework: [
      { en: "Start with what was priced into the policy path before the decision.", fr: "Commence par ce qui était pricé dans la trajectoire de policy avant la décision." },
      { en: "Identify the surprise in rates, guidance or balance-sheet policy.", fr: "Identifie la surprise dans les taux, la guidance ou la politique de bilan." },
      { en: "Explain first-order repricing in front-end rates and the yield curve.", fr: "Explique le repricing de premier ordre sur les taux courts et la yield curve." },
      { en: "Translate into FX, equities and credit through relative rates, discount rates and financial conditions.", fr: "Traduis ensuite vers FX, equities et credit via taux relatifs, discount rates et conditions financières." },
      { en: "Check positioning and liquidity to judge whether the move may overshoot.", fr: "Vérifie positioning et liquidité pour juger si le mouvement peut overshoot." },
      { en: "Finish with a trade expression, horizon, invalidation condition and main risk.", fr: "Termine avec une expression de trade, horizon, condition d’invalidation et principal risque." },
    ],
    sample: {
      en: "I would begin with what the market had already priced. If the central bank is more hawkish than expected, front-end yields should usually rise first because the expected policy path shifts higher. The curve may flatten if the market sees tighter policy as reducing future growth and inflation. The currency can strengthen through wider relative-rate support, while long-duration equities may come under pressure as discount rates rise. Credit could widen if tighter conditions increase refinancing and growth risk. I would then check positioning because a market already heavily short bonds or long the currency may react less cleanly. One possible expression would be short front-end duration if I believe the market is still underpricing the policy path. The main risk is that incoming inflation or labor data weakens quickly and forces the market to reverse the hawkish repricing.",
      fr: "Je commencerais par ce que le marché avait déjà pricé. Si la banque centrale est plus hawkish qu’attendu, les yields courts devraient généralement monter d’abord car la trajectoire attendue de policy se déplace vers le haut. La curve peut s’aplatir si le marché considère qu’une policy plus restrictive réduit la croissance et l’inflation futures. La devise peut se renforcer via le soutien des différentiels de taux, tandis que les equities à forte duration peuvent être sous pression car les discount rates montent. Le credit peut s’élargir si les conditions plus strictes augmentent le risque de refinancement et de croissance. Je regarderais ensuite le positioning car un marché déjà fortement short bonds ou long devise peut réagir moins nettement. Une expression possible serait short front-end duration si je pense que le marché sous-price encore la trajectoire de policy. Le principal risque est que les prochaines données inflation ou emploi ralentissent rapidement et forcent le marché à inverser le repricing hawkish.",
    },
  },
};
