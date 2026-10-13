import type { FinanceLesson } from "./lesson-content";

export const investmentBankingLesson: FinanceLesson = {
  slug: "year-3-investment-banking",
  year: { en: "Year 3 · Applied Finance", fr: "Année 3 · Finance appliquée / Applied Finance" },
  domain: { en: "Investment Banking", fr: "Banque d’investissement / Investment Banking" },
  title: { en: "Investment Banking", fr: "Banque d’investissement / Investment Banking" },
  subtitle: {
    en: "Understand how investment bankers advise companies on M&A, capital raising and strategic transactions — from mandate to valuation, deal execution and interview-ready technical fluency.",
    fr: "Comprendre comment les investment bankers conseillent les entreprises en M&A, levées de capitaux et transactions stratégiques — du mandat à la valorisation, à l’exécution du deal et à la maîtrise technique attendue en entretien.",
  },
  duration: { en: "180–240 min", fr: "180–240 min" },
  prerequisites: [
    { en: "Corporate Finance", fr: "Finance d’entreprise / Corporate Finance" },
    { en: "Financial Statement Analysis", fr: "Analyse des états financiers / Financial Statement Analysis" },
    { en: "DCF & Relative Valuation", fr: "DCF & valorisation relative / Relative Valuation" },
    { en: "Financial Modeling I", fr: "Modélisation financière I / Financial Modeling I" },
  ],
  objectives: [
    { en: "Explain what investment banks do across M&A and capital markets.", fr: "Expliquer le rôle d’une investment bank en M&A et capital markets." },
    { en: "Distinguish coverage, product and capital-markets teams and how they work together.", fr: "Distinguer coverage, product teams et capital-markets teams, et comprendre leur collaboration." },
    { en: "Describe a sell-side and buy-side M&A process from start to finish.", fr: "Décrire un process M&A sell-side et buy-side du début à la fin." },
    { en: "Apply enterprise value, equity value, transaction multiples, DCF and precedent transactions correctly.", fr: "Appliquer correctement enterprise value, equity value, transaction multiples, DCF et precedent transactions." },
    { en: "Understand accretion/dilution, synergies, purchase price and transaction financing.", fr: "Comprendre accretion/dilution, synergies, purchase price et financement d’une transaction." },
    { en: "Explain how IPOs, follow-ons and debt issuance are executed.", fr: "Expliquer l’exécution d’une IPO, d’un follow-on et d’une émission de dette." },
    { en: "Understand the analyst workflow, deliverables and quality standards used on live deals.", fr: "Comprendre le workflow analyst, les livrables et les standards de qualité utilisés sur les live deals." },
    { en: "Answer core investment-banking technical interview questions with clear structure.", fr: "Répondre clairement aux questions techniques essentielles d’entretien en investment banking." },
  ],
  overviewFlow: {
    title: { en: "From client problem to executed transaction", fr: "Du besoin client à la transaction exécutée" },
    steps: [
      { title: { en: "Originate", fr: "Originer" }, detail: { en: "Client need · idea · mandate", fr: "Besoin client · idée · mandat" } },
      { title: { en: "Analyze", fr: "Analyser" }, detail: { en: "Statements · model · valuation", fr: "États financiers · modèle · valuation" } },
      { title: { en: "Position", fr: "Positionner" }, detail: { en: "Story · buyers · investors · structure", fr: "Equity story · acheteurs · investisseurs · structure" } },
      { title: { en: "Execute", fr: "Exécuter" }, detail: { en: "Diligence · negotiation · financing", fr: "Due diligence · négociation · financement" } },
      { title: { en: "Close", fr: "Clôturer" }, detail: { en: "Approvals · settlement · announcement", fr: "Approbations · settlement · annonce" } },
    ],
  },
  sections: [
    {
      id: "what-is-investment-banking",
      kicker: { en: "01 · THE BUSINESS", fr: "01 · LE MÉTIER" },
      title: { en: "Investment banking is advisory plus capital formation", fr: "L’investment banking combine conseil stratégique et levée de capitaux" },
      coreFacts: [
        { en: "Investment banks advise corporations, financial sponsors and governments on major strategic and financing decisions.", fr: "Les investment banks conseillent entreprises, financial sponsors et gouvernements sur leurs grandes décisions stratégiques et de financement." },
        { en: "The main activities are M&A advisory, equity capital markets, debt capital markets and leveraged finance.", fr: "Les principales activités sont M&A advisory, Equity Capital Markets, Debt Capital Markets et Leveraged Finance." },
        { en: "Advisory fees are earned for advice and execution; underwriting fees are earned when the bank helps place securities with investors.", fr: "Les advisory fees rémunèrent le conseil et l’exécution ; les underwriting fees rémunèrent le placement de titres auprès des investisseurs." },
        { en: "Investment banking is distinct from Sales & Trading, Asset Management and Wealth Management, even when all sit inside the same financial group.", fr: "L’investment banking se distingue de Sales & Trading, Asset Management et Wealth Management, même lorsque ces métiers appartiennent au même groupe financier." },
      ],
      explanation: {
        Beginner: {
          en: "Think of an investment bank as a specialist adviser for very large financial decisions. If a company wants to buy a competitor, sell a division, go public or issue billions of dollars of debt, the bank helps analyze the decision, value the business, find counterparties or investors and execute the transaction.",
          fr: "Pense à une investment bank comme à un conseiller spécialisé dans les très grandes décisions financières. Si une entreprise veut acheter un concurrent, vendre une division, entrer en Bourse ou émettre plusieurs milliards de dette, la banque aide à analyser la décision, valoriser le business, trouver des contreparties ou investisseurs et exécuter la transaction.",
        },
        Intermediate: {
          en: "Investment banking combines relationship management, corporate finance, valuation, market judgment and execution. Coverage bankers own the client relationship, while product specialists contribute deeper expertise in M&A, ECM, DCM or leveraged finance.",
          fr: "L’investment banking combine relation client, corporate finance, valuation, jugement de marché et exécution. Les coverage bankers gèrent la relation client, tandis que les product specialists apportent une expertise plus profonde en M&A, ECM, DCM ou leveraged finance.",
        },
        Professional: {
          en: "The core economic function is to reduce information, coordination and execution frictions around large capital-allocation decisions. Senior bankers originate mandates and frame strategic alternatives; execution teams convert the mandate into analysis, materials, process management, investor or buyer outreach, negotiation and closing mechanics.",
          fr: "La fonction économique centrale consiste à réduire les frictions d’information, de coordination et d’exécution autour de grandes décisions d’allocation du capital. Les senior bankers originnent les mandats et cadrent les alternatives stratégiques ; les équipes d’exécution transforment ensuite le mandat en analyses, documents, process management, outreach investisseurs ou acheteurs, négociation et closing mechanics.",
        },
      },
      comparison: {
        title: { en: "Core investment-banking groups", fr: "Principales équipes d’investment banking" },
        headers: [
          { en: "Team", fr: "Équipe" },
          { en: "Primary job", fr: "Mission principale" },
          { en: "Typical output", fr: "Livrable typique" },
        ],
        rows: [
          { cells: [
            { en: "Industry Coverage", fr: "Industry Coverage" },
            { en: "Own sector expertise and client relationships", fr: "Porter l’expertise sectorielle et la relation client" },
            { en: "Strategic ideas, pitches, client dialogue", fr: "Idées stratégiques, pitches, dialogue client" },
          ] },
          { cells: [
            { en: "M&A", fr: "M&A" },
            { en: "Advise on acquisitions, disposals and mergers", fr: "Conseiller acquisitions, cessions et fusions" },
            { en: "Valuation, process materials, merger analysis", fr: "Valuation, process materials, merger analysis" },
          ] },
          { cells: [
            { en: "ECM", fr: "ECM" },
            { en: "Raise equity capital", fr: "Lever des capitaux propres / equity" },
            { en: "IPO, follow-on, block-trade execution", fr: "IPO, follow-on, block trade" },
          ] },
          { cells: [
            { en: "DCM / LevFin", fr: "DCM / LevFin" },
            { en: "Raise debt and structure leverage", fr: "Lever de la dette et structurer le leverage" },
            { en: "Bond, loan and acquisition-financing analysis", fr: "Analyse obligations, loans et acquisition financing" },
          ] },
        ],
      },
      vocabulary: [
        { en: "Mandate", fr: "mandat / mandate", definition: { en: "Formal engagement under which a bank is hired to advise or execute a transaction.", fr: "Engagement formel par lequel une banque est retenue pour conseiller ou exécuter une transaction." } },
        { en: "Underwriting", fr: "prise ferme / underwriting", definition: { en: "Process in which a bank commits to distribute newly issued securities and may assume placement risk.", fr: "Processus par lequel une banque s’engage à distribuer de nouveaux titres et peut assumer un risque de placement." } },
      ],
    },
    {
      id: "analyst-workflow",
      kicker: { en: "02 · ANALYST WORKFLOW", fr: "02 · WORKFLOW ANALYST" },
      title: { en: "The analyst turns raw information into decision-ready materials", fr: "L’analyst transforme l’information brute en supports utilisables pour décider" },
      coreFacts: [
        { en: "Analysts spend significant time on financial modeling, valuation, company and industry research, presentations and process coordination.", fr: "Les analysts passent beaucoup de temps sur financial modeling, valuation, recherche entreprise et secteur, présentations et coordination du process." },
        { en: "Accuracy, source traceability, formatting consistency and version control matter because senior bankers and clients rely on the output.", fr: "Précision, traçabilité des sources, cohérence du format et version control sont essentiels car les senior bankers et clients utilisent directement ces livrables." },
        { en: "A pitch is designed to win or deepen a client relationship; a live-deal workstream is designed to execute an active mandate.", fr: "Un pitch vise à gagner ou approfondir une relation client ; un live-deal workstream vise à exécuter un mandat actif." },
        { en: "Common materials include pitch books, management presentations, information memoranda, valuation pages, buyer lists and process trackers.", fr: "Les livrables courants incluent pitch books, management presentations, information memoranda, valuation pages, buyer lists et process trackers." },
      ],
      explanation: {
        Beginner: {
          en: "A junior banker is not simply 'making PowerPoint'. The job is to make sure numbers are correct, logic is clear, sources are defensible and the whole team can use the same information to make a transaction move forward.",
          fr: "Un junior banker ne fait pas simplement du PowerPoint. Son rôle est de s’assurer que les chiffres sont exacts, la logique claire, les sources défendables et que toute l’équipe utilise la même information pour faire avancer la transaction.",
        },
        Intermediate: {
          en: "A strong analyst builds a repeatable chain: gather source data, normalize it, update the model, refresh valuation outputs, translate the findings into client-ready pages, run quality-control checks and maintain a clean audit trail of assumptions and versions.",
          fr: "Un bon analyst construit une chaîne reproductible : collecter les sources, normaliser les données, mettre à jour le modèle, rafraîchir les valuations, traduire les conclusions en pages client-ready, effectuer les quality checks et maintenir un audit trail propre des hypothèses et versions.",
        },
        Professional: {
          en: "The highest-value junior work is not cosmetic; it is error prevention and decision compression. Analysts create a reliable analytical base so associates and senior bankers can focus on judgment, negotiation and client messaging. A small modeling or source error can propagate into valuation, recommendation and transaction terms, so controls are part of the finance work itself.",
          fr: "Le travail junior à plus forte valeur n’est pas cosmétique ; il consiste à prévenir les erreurs et condenser la décision. Les analysts créent une base analytique fiable afin que associates et senior bankers se concentrent sur jugement, négociation et messaging client. Une petite erreur de modèle ou de source peut contaminer valuation, recommandation et transaction terms ; les contrôles font donc partie intégrante du travail financier.",
        },
      },
      example: {
        en: "Example workflow: update the latest earnings, reconcile revenue and EBITDA to the filed statements, refresh net debt, roll the DCF one quarter forward, update trading comps, check all valuation ranges, then refresh the client deck and run a page-by-page number audit.",
        fr: "Exemple de workflow : intégrer les derniers résultats, réconcilier revenue et EBITDA aux états publiés, actualiser net debt, faire rouler le DCF d’un trimestre, mettre à jour les trading comps, vérifier toutes les ranges de valuation, puis actualiser le deck client et effectuer un audit chiffré page par page.",
      },
      vocabulary: [
        { en: "Pitch book", fr: "pitch book / présentation commerciale", definition: { en: "Presentation used to propose strategic ideas, transaction alternatives or financing solutions to a client.", fr: "Présentation utilisée pour proposer des idées stratégiques, alternatives de transaction ou solutions de financement à un client." } },
        { en: "Live deal", fr: "live deal / transaction active", definition: { en: "Transaction under an active client mandate rather than a prospective pitch.", fr: "Transaction sous mandat client actif, par opposition à un pitch prospectif." } },
      ],
    },
    {
      id: "valuation-toolkit",
      kicker: { en: "03 · VALUATION TOOLKIT", fr: "03 · BOÎTE À OUTILS DE VALUATION" },
      title: { en: "Bankers triangulate value rather than rely on one method", fr: "Les bankers triangulent la valeur plutôt que de dépendre d’une seule méthode" },
      coreFacts: [
        { en: "The core methods are trading comparables, precedent transactions and DCF; other methods are used when relevant to the company or sector.", fr: "Les principales méthodes sont trading comparables, precedent transactions et DCF ; d’autres méthodes sont utilisées selon l’entreprise ou le secteur." },
        { en: "Enterprise-value multiples pair enterprise value with pre-interest metrics such as revenue or EBITDA.", fr: "Les multiples d’enterprise value se combinent avec des métriques avant intérêts comme revenue ou EBITDA." },
        { en: "Equity-value multiples pair equity value with metrics available to common shareholders, such as net income or EPS.", fr: "Les multiples d’equity value se combinent avec des métriques disponibles pour les actionnaires ordinaires, comme net income ou EPS." },
        { en: "Precedent transactions often include a control premium and deal-specific synergies, making them different from unaffected trading comps.", fr: "Les precedent transactions intègrent souvent une control premium et des synergies spécifiques au deal, ce qui les différencie des trading comps unaffected." },
      ],
      explanation: {
        Beginner: {
          en: "No valuation method gives one objectively correct number. Trading comps ask how similar public companies are valued today. Precedents ask what buyers paid in earlier transactions. A DCF asks what the company’s own future cash flows are worth today.",
          fr: "Aucune méthode de valuation ne donne un chiffre objectivement parfait. Les trading comps demandent comment des sociétés comparables cotées sont valorisées aujourd’hui. Les precedents demandent ce que des acheteurs ont payé lors de transactions passées. Le DCF demande combien valent aujourd’hui les futurs cash flows propres à l’entreprise.",
        },
        Intermediate: {
          en: "A banker selects relevant peers, normalizes financial metrics, applies appropriate multiples and checks the implied range against DCF and transaction evidence. The goal is not to average methods blindly; it is to understand why the methods differ and which evidence is most decision-useful.",
          fr: "Un banker sélectionne des peers pertinents, normalise les métriques financières, applique les bons multiples et compare la range implicite au DCF et aux transactions. Le but n’est pas de moyenner aveuglément les méthodes, mais de comprendre pourquoi elles diffèrent et quelles preuves sont les plus utiles à la décision.",
        },
        Professional: {
          en: "Professional valuation work is a judgment exercise around comparability, cyclicality, accounting consistency, capital structure, control, expected synergies and market regime. The banker must distinguish observed price from intrinsic value and explain which assumptions drive the gap between methodologies.",
          fr: "La valuation professionnelle repose sur le jugement autour de la comparabilité, cyclicality, cohérence comptable, structure du capital, contrôle, synergies attendues et régime de marché. Le banker doit distinguer prix observé et intrinsic value et expliquer quelles hypothèses créent les écarts entre méthodes.",
        },
      },
      formula: {
        label: { en: "Enterprise value bridge", fr: "Bridge d’enterprise value" },
        expression: "Enterprise Value = Equity Value + Debt + Preferred Stock + Non-controlling Interest − Cash",
        explanation: { en: "The bridge converts the value attributable to common shareholders into the value of the operating business available to all capital providers.", fr: "Ce bridge transforme la valeur attribuable aux actionnaires ordinaires en valeur du business opérationnel attribuable à l’ensemble des apporteurs de capitaux." },
        workedExample: { en: "If equity value is $2.0bn, debt is $600m and cash is $200m, enterprise value is approximately $2.4bn before other adjustments.", fr: "Si l’equity value est de 2,0 Md$, la dette de 600 M$ et le cash de 200 M$, l’enterprise value est d’environ 2,4 Md$ avant autres ajustements." },
      },
      comparison: {
        title: { en: "What each valuation method tells you", fr: "Ce que dit chaque méthode de valuation" },
        headers: [
          { en: "Method", fr: "Méthode" },
          { en: "Main input", fr: "Input principal" },
          { en: "Best interpretation", fr: "Interprétation" },
        ],
        rows: [
          { cells: [
            { en: "Trading comps", fr: "Trading comps" },
            { en: "Current peer multiples", fr: "Multiples actuels des peers" },
            { en: "How the public market prices comparable businesses", fr: "Comment le marché public valorise des businesses comparables" },
          ] },
          { cells: [
            { en: "Precedent transactions", fr: "Precedent transactions" },
            { en: "Historical deal values", fr: "Valeurs de deals historiques" },
            { en: "What control buyers have paid", fr: "Ce que des acquéreurs de contrôle ont payé" },
          ] },
          { cells: [
            { en: "DCF", fr: "DCF" },
            { en: "Forecast cash flows and discount rate", fr: "Cash flows prévisionnels et discount rate" },
            { en: "Value implied by company-specific economics", fr: "Valeur implicite des economics propres à l’entreprise" },
          ] },
        ],
      },
      vocabulary: [
        { en: "Control premium", fr: "prime de contrôle / control premium", definition: { en: "Premium a buyer may pay to obtain control of a company relative to its unaffected market value.", fr: "Prime qu’un acquéreur peut payer pour obtenir le contrôle d’une entreprise par rapport à sa valeur de marché unaffected." } },
        { en: "Unlevered free cash flow", fr: "free cash flow non endetté / unlevered FCF", definition: { en: "Cash flow generated by operations before interest payments and therefore available to all capital providers.", fr: "Cash flow généré par les opérations avant intérêts et donc disponible pour tous les apporteurs de capitaux." } },
      ],
    },
    {
      id: "sell-side-ma",
      kicker: { en: "04 · SELL-SIDE M&A", fr: "04 · M&A SELL-SIDE" },
      title: { en: "A sell-side process creates competition for an asset", fr: "Un process sell-side cherche à créer de la concurrence pour un actif" },
      coreFacts: [
        { en: "The seller and its advisers prepare the equity story, buyer universe, transaction materials and process timetable.", fr: "Le vendeur et ses advisers préparent l’equity story, la liste d’acheteurs, les transaction materials et le calendrier du process." },
        { en: "Potential buyers typically move through outreach, confidentiality, information access, indications of interest, diligence and binding bids.", fr: "Les acheteurs potentiels passent généralement par outreach, confidentialité, accès à l’information, indications of interest, due diligence et offres engageantes." },
        { en: "Competition, credible alternatives and process discipline can improve price and terms for the seller.", fr: "La concurrence, des alternatives crédibles et une forte process discipline peuvent améliorer prix et conditions pour le vendeur." },
        { en: "Confidentiality, management access, data-room control and consistent information flow are critical to fairness and execution.", fr: "Confidentialité, accès au management, contrôle de la data room et cohérence du flux d’information sont essentiels à l’équité du process et à son exécution." },
      ],
      explanation: {
        Beginner: {
          en: "Imagine selling a company the way you would auction a very valuable asset, except the process is confidential and highly structured. The bank helps identify credible buyers, gives them controlled access to information and manages competing offers so the seller can compare both price and certainty of closing.",
          fr: "Imagine vendre une entreprise comme un actif de très grande valeur, mais dans un process confidentiel et très structuré. La banque aide à identifier les acheteurs crédibles, leur donne un accès contrôlé à l’information et organise les offres concurrentes afin que le vendeur compare prix et certitude de closing.",
        },
        Intermediate: {
          en: "A broad auction maximizes competition but increases confidentiality and execution complexity. A targeted process may protect confidentiality and reduce disruption but can limit competitive tension. The banker helps choose the process design based on seller objectives, buyer universe, market conditions and regulatory constraints.",
          fr: "Une broad auction maximise la concurrence mais augmente les risques de confidentialité et la complexité d’exécution. Un process ciblé protège davantage la confidentialité et réduit la disruption mais peut limiter la competitive tension. Le banker aide à choisir le bon process selon les objectifs du vendeur, le buyer universe, le marché et les contraintes réglementaires.",
        },
        Professional: {
          en: "Sell-side value creation comes from process architecture as much as valuation. Timing, sequencing, information symmetry, management access, bid instructions, financing requirements and credible walk-away alternatives all influence buyer behavior. The winning bid is not necessarily the highest headline price if financing, diligence, regulatory or contractual risks reduce certainty.",
          fr: "La création de valeur en sell-side vient autant de l’architecture du process que de la valuation. Timing, séquencement, symétrie de l’information, accès management, bid instructions, exigences de financement et alternatives crédibles influencent le comportement des acheteurs. L’offre gagnante n’est pas nécessairement le prix facial le plus élevé si financement, due diligence, régulation ou contractual risks réduisent la certitude de closing.",
        },
      },
      example: {
        en: "Example: a seller receives $1.05bn from Buyer A with committed financing and limited conditions, versus $1.10bn from Buyer B subject to uncertain financing and a difficult antitrust review. The board may prefer A if the extra $50m does not compensate for the additional closing risk.",
        fr: "Exemple : un vendeur reçoit 1,05 Md$ de Buyer A avec committed financing et peu de conditions, contre 1,10 Md$ de Buyer B avec financement incertain et un antitrust review complexe. Le board peut préférer A si les 50 M$ supplémentaires ne compensent pas le closing risk additionnel." },
      vocabulary: [
        { en: "CIM", fr: "CIM / Confidential Information Memorandum", definition: { en: "Detailed confidential document describing a company, its market, operations and financial profile to potential buyers.", fr: "Document confidentiel détaillé présentant l’entreprise, son marché, ses opérations et son profil financier aux acheteurs potentiels." } },
        { en: "Indication of interest", fr: "indication d’intérêt / IOI", definition: { en: "Preliminary non-binding indication of price and transaction interest from a potential buyer.", fr: "Indication préliminaire et non engageante du prix et de l’intérêt d’un acheteur potentiel." } },
      ],
    },
    {
      id: "buy-side-ma",
      kicker: { en: "05 · BUY-SIDE M&A", fr: "05 · M&A BUY-SIDE" },
      title: { en: "A buyer must prove that strategic value exceeds the price paid", fr: "Un acheteur doit démontrer que la valeur stratégique dépasse le prix payé" },
      coreFacts: [
        { en: "A buy-side adviser helps identify targets, value them, assess strategic fit, structure the offer and negotiate transaction terms.", fr: "Un buy-side adviser aide à identifier des cibles, les valoriser, évaluer le strategic fit, structurer l’offre et négocier les transaction terms." },
        { en: "Synergies can support a premium, but they must be adjusted for timing, implementation costs, taxes and execution risk.", fr: "Les synergies peuvent justifier une prime, mais doivent être ajustées pour timing, implementation costs, fiscalité et execution risk." },
        { en: "Funding mix — cash, debt, equity or combinations — affects leverage, ownership and EPS outcomes.", fr: "Le funding mix — cash, debt, equity ou combinaison — affecte leverage, ownership et résultats EPS." },
        { en: "Strategic rationale does not remove the need for valuation discipline; overpaying can destroy shareholder value even when the target is attractive.", fr: "Une logique stratégique ne supprime pas la discipline de valuation ; surpayer peut détruire de la shareholder value même si la cible est attractive." },
      ],
      explanation: {
        Beginner: {
          en: "A good acquisition is not simply 'buying a good company'. The buyer has to compare what it pays with what it receives: stand-alone cash flows, synergies and strategic benefits, minus financing and integration risks.",
          fr: "Une bonne acquisition ne consiste pas simplement à acheter une bonne entreprise. L’acheteur doit comparer ce qu’il paie à ce qu’il reçoit : cash flows stand-alone, synergies et bénéfices stratégiques, moins les risques de financement et d’intégration." },
        },
        Intermediate: {
          en: "The banker builds a purchase-price bridge, analyzes premium paid, tests financing alternatives, models pro forma ownership and earnings, and stresses synergy assumptions. A transaction can be EPS accretive while still destroying value if cheap financing masks an excessive purchase price.",
          fr: "Le banker construit un purchase-price bridge, analyse la premium paid, teste plusieurs financements, modélise ownership et earnings pro forma et stresse les synergies. Une transaction peut être EPS accretive tout en détruisant de la valeur si un financement bon marché masque un prix d’acquisition excessif." },
        Professional: {
          en: "Buy-side analysis should separate stand-alone value, control value, synergy value and financing value. The maximum economically defensible price depends on the buyer’s required return and risk-adjusted synergy capture, not just on precedent multiples or EPS optics. Integration complexity and regulatory remedy risk belong in valuation, not only in qualitative commentary.",
          fr: "L’analyse buy-side doit séparer stand-alone value, control value, synergy value et financing value. Le prix maximum économiquement défendable dépend du required return de l’acheteur et de la capture de synergies ajustée du risque, pas seulement des precedent multiples ou de l’optique EPS. Integration complexity et regulatory remedy risk doivent entrer dans la valuation, pas uniquement dans un commentaire qualitatif." },
      },
      formula: {
        label: { en: "Offer premium", fr: "Prime d’offre / offer premium" },
        expression: "Offer Premium = Offer Price ÷ Unaffected Share Price − 1",
        explanation: { en: "Measures how much the proposed price exceeds the target's unaffected share price before the deal became public or leaked.", fr: "Mesure de combien le prix proposé dépasse le cours unaffected de la cible avant l’annonce ou la fuite du deal." },
        workedExample: { en: "A $50 offer versus a $40 unaffected price implies a 25% premium.", fr: "Une offre à 50 $ contre un cours unaffected de 40 $ implique une prime de 25 %." },
      },
      marketConnection: {
        en: "When a deal is announced, investors immediately assess premium, strategic rationale, financing, expected synergies, regulatory risk and whether the buyer is overpaying.",
        fr: "Lorsqu’un deal est annoncé, les investisseurs évaluent immédiatement premium, logique stratégique, financement, synergies attendues, risque réglementaire et risque de surpaiement par l’acheteur." },
      vocabulary: [
        { en: "Synergy", fr: "synergie / synergy", definition: { en: "Incremental value created by combining two businesses, commonly through cost savings or additional revenue.", fr: "Valeur supplémentaire créée par la combinaison de deux businesses, souvent via économies de coûts ou revenus additionnels." } },
        { en: "Pro forma", fr: "pro forma", definition: { en: "Financial view showing the combined company as if the transaction had already occurred.", fr: "Vue financière présentant l’entreprise combinée comme si la transaction avait déjà eu lieu." } },
      ],
    },
    {
      id: "accretion-dilution",
      kicker: { en: "06 · MERGER MODEL", fr: "06 · MERGER MODEL" },
      title: { en: "Accretion/dilution explains the near-term EPS impact of a deal", fr: "L’accretion/dilution mesure l’impact d’un deal sur l’EPS à court terme" },
      coreFacts: [
        { en: "A deal is EPS accretive if the buyer's pro forma EPS is higher than its stand-alone EPS, and dilutive if lower.", fr: "Un deal est EPS accretive si l’EPS pro forma de l’acheteur dépasse son EPS stand-alone, et dilutive dans le cas inverse." },
        { en: "Key drivers include purchase price, target earnings, synergies, financing cost, lost interest income, share issuance and transaction adjustments.", fr: "Les principaux drivers sont purchase price, earnings de la cible, synergies, coût du financement, lost interest income, émissions d’actions et transaction adjustments." },
        { en: "Accretion is an accounting output, not a complete measure of economic value creation.", fr: "L’accretion est un output comptable, pas une mesure complète de création de valeur économique." },
        { en: "Purchase accounting can alter depreciation, amortization and tax effects after closing.", fr: "Le purchase accounting peut modifier depreciation, amortization et effets fiscaux après closing." },
      ],
      explanation: {
        Beginner: {
          en: "Suppose a buyer earns $2.00 per share before a deal. If the combined company earns $2.10 per share after the acquisition, the transaction is 5% accretive. If EPS falls to $1.90, it is 5% dilutive.",
          fr: "Supposons qu’un acheteur gagne 2,00 $ par action avant un deal. Si l’entreprise combinée gagne 2,10 $ après l’acquisition, la transaction est 5 % accretive. Si l’EPS tombe à 1,90 $, elle est 5 % dilutive." },
        Intermediate: {
          en: "The model starts with buyer and target earnings, layers in synergies and purchase-accounting adjustments, subtracts incremental financing costs and divides pro forma net income by the new diluted share count. Cash-funded, debt-funded and stock-funded deals have different earnings mechanics.",
          fr: "Le modèle part des earnings de l’acheteur et de la cible, ajoute synergies et purchase-accounting adjustments, retranche les coûts de financement additionnels puis divise le pro forma net income par le nouveau nombre d’actions diluées. Cash-funded, debt-funded et stock-funded deals ont des mécaniques différentes." },
        Professional: {
          en: "Accretion/dilution is most useful as a diagnostic bridge between valuation, financing and accounting. Experienced bankers separate mechanical EPS accretion from economic return by testing premium paid, return on invested capital, leverage capacity and the probability-adjusted value of synergies.",
          fr: "L’accretion/dilution est surtout utile comme diagnostic reliant valuation, financement et accounting. Les bankers expérimentés séparent l’accretion EPS mécanique du véritable economic return en testant premium paid, return on invested capital, leverage capacity et valeur des synergies ajustée de leur probabilité." },
      },
      formula: {
        label: { en: "EPS accretion / dilution", fr: "Accretion / dilution EPS" },
        expression: "Accretion / Dilution % = Pro Forma EPS ÷ Buyer Stand-alone EPS − 1",
        explanation: { en: "Positive output means accretion; negative output means dilution.", fr: "Un résultat positif signifie accretion ; un résultat négatif signifie dilution." },
        workedExample: { en: "$2.10 ÷ $2.00 − 1 = +5.0% accretion.", fr: "2,10 $ ÷ 2,00 $ − 1 = +5,0 % d’accretion." },
      },
      vocabulary: [
        { en: "Purchase accounting", fr: "purchase accounting / comptabilité d’acquisition", definition: { en: "Accounting framework used to record the acquired assets, liabilities and identifiable intangibles after a business combination.", fr: "Cadre comptable utilisé pour enregistrer actifs, passifs et intangibles identifiables après une combinaison d’entreprises." } },
        { en: "Exchange ratio", fr: "ratio d’échange / exchange ratio", definition: { en: "Number of buyer shares offered for each target share in a stock-funded transaction.", fr: "Nombre d’actions de l’acheteur offertes pour chaque action de la cible dans une transaction financée en actions." } },
      ],
    },
    {
      id: "capital-markets",
      kicker: { en: "07 · CAPITAL MARKETS", fr: "07 · CAPITAL MARKETS" },
      title: { en: "ECM and DCM connect issuers with investors", fr: "ECM et DCM connectent les émetteurs aux investisseurs" },
      coreFacts: [
        { en: "ECM helps companies raise equity through IPOs, follow-ons, rights issues and block trades.", fr: "ECM aide les entreprises à lever de l’equity via IPOs, follow-ons, rights issues et block trades." },
        { en: "DCM helps issuers raise debt through bonds and related capital-markets instruments.", fr: "DCM aide les émetteurs à lever de la dette via obligations et instruments associés." },
        { en: "Execution depends on investor demand, market volatility, pricing, transaction structure, credit quality and issuer objectives.", fr: "L’exécution dépend de la demande investisseur, volatilité du marché, pricing, structure de la transaction, qualité de crédit et objectifs de l’émetteur." },
        { en: "An IPO is both a financing event and a transition to public-market disclosure, governance and investor-relations requirements.", fr: "Une IPO est à la fois une opération de financement et une transition vers les exigences de disclosure, gouvernance et investor relations des marchés publics." },
      ],
      explanation: {
        Beginner: {
          en: "If a company needs money, it can sell ownership through equity or borrow through debt. ECM specializes in equity issuance; DCM specializes in bond markets. Bankers advise on when to issue, how much to raise, how to price the security and how to reach investors.",
          fr: "Si une entreprise a besoin d’argent, elle peut vendre une partie de son ownership via l’equity ou emprunter via la dette. ECM se spécialise dans les émissions d’actions ; DCM dans les marchés obligataires. Les bankers conseillent sur le bon timing, le montant à lever, le pricing et l’accès aux investisseurs." },
        Intermediate: {
          en: "Capital-markets execution is a balance between issuer objectives and investor clearing levels. An issuer wants attractive pricing and sufficient proceeds; investors want compensation for risk. The bank uses market feedback, comparable issuance, investor conversations and bookbuilding to determine the price at which supply and demand clear.",
          fr: "L’exécution capital markets équilibre objectifs de l’émetteur et clearing levels investisseurs. L’émetteur veut un pricing attractif et suffisamment de proceeds ; les investisseurs exigent une rémunération du risque. La banque utilise market feedback, émissions comparables, discussions investisseurs et bookbuilding pour déterminer le prix qui équilibre offre et demande." },
        Professional: {
          en: "A capital-markets banker must understand both corporate-finance objectives and real-time distribution conditions. Window risk matters: valuation, volatility, rates, credit spreads, sector sentiment and competing issuance can determine whether a theoretically attractive transaction is executable on acceptable terms.",
          fr: "Un capital-markets banker doit comprendre à la fois les objectifs de corporate finance et les conditions de distribution en temps réel. Le window risk est essentiel : valuation, volatilité, taux, credit spreads, sentiment sectoriel et émissions concurrentes peuvent déterminer si une transaction théoriquement attractive est exécutable à de bonnes conditions." },
      },
      comparison: {
        title: { en: "Equity versus debt issuance", fr: "Émission equity versus dette" },
        headers: [
          { en: "Dimension", fr: "Dimension" },
          { en: "Equity", fr: "Equity" },
          { en: "Debt", fr: "Dette" },
        ],
        rows: [
          { cells: [
            { en: "Ownership", fr: "Ownership" },
            { en: "Dilutes existing shareholders", fr: "Dilue les actionnaires existants" },
            { en: "No ownership dilution", fr: "Pas de dilution de l’ownership" },
          ] },
          { cells: [
            { en: "Mandatory payment", fr: "Paiement obligatoire" },
            { en: "No contractual interest payment", fr: "Pas d’intérêt contractuel obligatoire" },
            { en: "Interest and principal obligations", fr: "Obligations d’intérêts et de principal" },
          ] },
          { cells: [
            { en: "Risk to issuer", fr: "Risque pour l’émetteur" },
            { en: "Dilution and valuation risk", fr: "Dilution et valuation risk" },
            { en: "Leverage and refinancing risk", fr: "Leverage et refinancing risk" },
          ] },
        ],
      },
      vocabulary: [
        { en: "Bookbuilding", fr: "construction du livre d’ordres / bookbuilding", definition: { en: "Process of collecting investor demand to determine transaction size and pricing.", fr: "Processus de collecte de la demande investisseur pour déterminer taille et pricing d’une émission." } },
        { en: "Follow-on offering", fr: "offre secondaire / follow-on", definition: { en: "Additional equity offering by a company that is already publicly listed.", fr: "Émission supplémentaire d’actions par une entreprise déjà cotée." } },
      ],
    },
    {
      id: "interview-readiness",
      kicker: { en: "08 · INTERVIEW READINESS", fr: "08 · PRÉPARATION ENTRETIEN" },
      title: { en: "Strong answers connect accounting, valuation and transaction logic", fr: "Les bonnes réponses relient accounting, valuation et logique de transaction" },
      coreFacts: [
        { en: "Core interviews test accounting links, enterprise versus equity value, valuation methods, DCF, merger math and basic deal logic.", fr: "Les entretiens testent notamment liens comptables, enterprise versus equity value, méthodes de valuation, DCF, merger math et logique de deal." },
        { en: "Interviewers value structured reasoning more than memorized jargon.", fr: "Les interviewers valorisent davantage un raisonnement structuré qu’un jargon mémorisé." },
        { en: "A strong technical answer states the concept, walks the mechanics and explains the economic intuition.", fr: "Une bonne réponse technique énonce le concept, déroule la mécanique et explique l’intuition économique." },
        { en: "Deal discussion should cover strategic rationale, valuation, financing, synergies, risks and market reaction.", fr: "La discussion d’un deal doit couvrir logique stratégique, valuation, financement, synergies, risques et réaction de marché." },
      ],
      explanation: {
        Beginner: {
          en: "For a technical question, avoid jumping directly to a formula. First say what the concept means, then explain the steps, then give a simple example. This makes your answer easier to follow and shows that you understand rather than recite.",
          fr: "Pour une question technique, évite de réciter directement une formule. Commence par dire ce que signifie le concept, explique ensuite les étapes, puis donne un petit exemple. Ta réponse devient plus claire et montre que tu comprends réellement." },
        Intermediate: {
          en: "Use a three-layer answer: definition, mechanics, intuition. Example for enterprise value: define it as value to all capital providers, give the equity-to-EV bridge, then explain why EV pairs with pre-interest metrics such as EBITDA.",
          fr: "Utilise une réponse en trois couches : définition, mécanique, intuition. Exemple pour enterprise value : définis-la comme la valeur pour l’ensemble des capital providers, donne le bridge equity-to-EV, puis explique pourquoi EV se combine à des métriques avant intérêts comme EBITDA." },
        Professional: {
          en: "At stronger interview levels, add nuance without losing structure. Acknowledge edge cases such as financial institutions, lease treatment, pension deficits, minority interests, negative net debt or purchase-accounting impacts, but only after answering the core question directly.",
          fr: "À un niveau plus avancé, ajoute de la nuance sans perdre la structure. Mentionne les edge cases comme institutions financières, lease treatment, déficits de pension, minority interests, net debt négatif ou purchase-accounting impacts, mais seulement après avoir répondu clairement à la question principale." },
      },
      example: {
        en: "Example answer to 'Why can an acquisition be accretive?': because the earnings acquired plus synergies can exceed the incremental financing and share-issuance cost. Then note that EPS accretion alone does not prove value creation because a buyer can overpay and still manufacture accretion through cheap funding.",
        fr: "Exemple de réponse à « Why can an acquisition be accretive? » : parce que les earnings acquis plus les synergies peuvent dépasser le coût additionnel du financement et de l’émission d’actions. Ajoute ensuite que l’EPS accretion ne prouve pas à elle seule la création de valeur car un acheteur peut surpayer tout en créant mécaniquement de l’accretion grâce à un financement bon marché." },
      vocabulary: [
        { en: "Technical interview", fr: "entretien technique / technical interview", definition: { en: "Interview focused on accounting, valuation, transaction mechanics and finance concepts rather than only behavior or motivation.", fr: "Entretien centré sur accounting, valuation, transaction mechanics et concepts financiers, plutôt que seulement le comportement ou la motivation." } },
        { en: "Deal experience", fr: "expérience transactionnelle / deal experience", definition: { en: "Direct work on a transaction process, often discussed in experienced-hire interviews.", fr: "Travail direct sur un process de transaction, souvent discuté lors des entretiens de profils expérimentés." } },
      ],
    },
  ],
  quiz: [
    {
      id: "q1",
      conceptKey: "ib-business-model",
      question: { en: "Which activity is most directly part of investment banking?", fr: "Quelle activité relève le plus directement de l’investment banking ?" },
      options: [
        { id: "a", label: { en: "Advising a company on an acquisition", fr: "Conseiller une entreprise sur une acquisition" } },
        { id: "b", label: { en: "Managing a retiree's personal portfolio", fr: "Gérer le portefeuille personnel d’un retraité" } },
        { id: "c", label: { en: "Making a market in EUR/USD", fr: "Faire du market making sur EUR/USD" } },
        { id: "d", label: { en: "Running an index fund", fr: "Gérer un fonds indiciel" } },
      ],
      correctOption: "a",
      explanation: { en: "M&A advisory is a core investment-banking function.", fr: "Le conseil M&A est une fonction centrale de l’investment banking." },
    },
    {
      id: "q2",
      conceptKey: "ib-ev-bridge",
      question: { en: "A company has $2.0bn equity value, $600m debt and $200m cash. Ignoring other adjustments, what is enterprise value?", fr: "Une entreprise a 2,0 Md$ d’equity value, 600 M$ de dette et 200 M$ de cash. En ignorant les autres ajustements, quelle est l’enterprise value ?" },
      options: [
        { id: "a", label: { en: "$2.4bn", fr: "2,4 Md$" } },
        { id: "b", label: { en: "$1.6bn", fr: "1,6 Md$" } },
        { id: "c", label: { en: "$2.8bn", fr: "2,8 Md$" } },
        { id: "d", label: { en: "$2.0bn", fr: "2,0 Md$" } },
      ],
      correctOption: "a",
      explanation: { en: "$2.0bn + $0.6bn − $0.2bn = $2.4bn.", fr: "2,0 Md$ + 0,6 Md$ − 0,2 Md$ = 2,4 Md$." },
    },
    {
      id: "q3",
      conceptKey: "ib-valuation-methods",
      question: { en: "Which method is most directly based on company-specific forecast cash flows?", fr: "Quelle méthode repose le plus directement sur les cash flows prévisionnels propres à l’entreprise ?" },
      options: [
        { id: "a", label: { en: "DCF", fr: "DCF" } },
        { id: "b", label: { en: "Trading comps", fr: "Trading comps" } },
        { id: "c", label: { en: "Precedent transactions", fr: "Precedent transactions" } },
        { id: "d", label: { en: "Share-price chart only", fr: "Uniquement le graphique du cours" } },
      ],
      correctOption: "a",
      explanation: { en: "A DCF values projected free cash flows using a discount rate and terminal value.", fr: "Un DCF valorise les free cash flows projetés à l’aide d’un discount rate et d’une terminal value." },
    },
    {
      id: "q4",
      conceptKey: "ib-sell-side-process",
      question: { en: "Why can a competitive sell-side process improve value for a seller?", fr: "Pourquoi un process sell-side compétitif peut-il améliorer la valeur pour un vendeur ?" },
      options: [
        { id: "a", label: { en: "It creates competitive tension among credible buyers", fr: "Il crée une competitive tension entre acheteurs crédibles" } },
        { id: "b", label: { en: "It guarantees every buyer pays the same price", fr: "Il garantit que chaque acheteur paie le même prix" } },
        { id: "c", label: { en: "It removes all closing risk", fr: "Il élimine tout closing risk" } },
        { id: "d", label: { en: "It makes valuation unnecessary", fr: "Il rend la valuation inutile" } },
      ],
      correctOption: "a",
      explanation: { en: "Competition can improve price and terms, although execution and closing risk still matter.", fr: "La concurrence peut améliorer prix et conditions, même si execution risk et closing risk restent importants." },
    },
    {
      id: "q5",
      conceptKey: "ib-buy-side-synergies",
      question: { en: "How should expected deal synergies be valued?", fr: "Comment faut-il valoriser les synergies attendues d’un deal ?" },
      options: [
        { id: "a", label: { en: "Adjust for timing, cost, tax and probability of realization", fr: "Les ajuster pour timing, coûts, fiscalité et probabilité de réalisation" } },
        { id: "b", label: { en: "Count 100% immediately with no discount", fr: "Compter 100 % immédiatement sans ajustement" } },
        { id: "c", label: { en: "Always ignore them", fr: "Toujours les ignorer" } },
        { id: "d", label: { en: "Treat them as cash already on the balance sheet", fr: "Les traiter comme du cash déjà au bilan" } },
      ],
      correctOption: "a",
      explanation: { en: "Synergies are uncertain future benefits and should be risk-adjusted before supporting purchase price.", fr: "Les synergies sont des bénéfices futurs incertains et doivent être ajustées du risque avant de soutenir un purchase price." },
    },
    {
      id: "q6",
      conceptKey: "ib-offer-premium",
      question: { en: "A buyer offers $50 per share for a target whose unaffected price was $40. What is the premium?", fr: "Un acheteur offre 50 $ par action pour une cible dont le cours unaffected était de 40 $. Quelle est la prime ?" },
      options: [
        { id: "a", label: { en: "25%", fr: "25 %" } },
        { id: "b", label: { en: "20%", fr: "20 %" } },
        { id: "c", label: { en: "10%", fr: "10 %" } },
        { id: "d", label: { en: "40%", fr: "40 %" } },
      ],
      correctOption: "a",
      explanation: { en: "$50 ÷ $40 − 1 = 25%.", fr: "50 $ ÷ 40 $ − 1 = 25 %." },
    },
    {
      id: "q7",
      conceptKey: "ib-accretion-dilution",
      question: { en: "Buyer EPS is $2.00 before a deal and $2.10 pro forma. What is the EPS impact?", fr: "L’EPS de l’acheteur est de 2,00 $ avant le deal et 2,10 $ pro forma. Quel est l’impact EPS ?" },
      options: [
        { id: "a", label: { en: "+5% accretive", fr: "+5 % accretive" } },
        { id: "b", label: { en: "−5% dilutive", fr: "−5 % dilutive" } },
        { id: "c", label: { en: "+10% accretive", fr: "+10 % accretive" } },
        { id: "d", label: { en: "No change", fr: "Aucun changement" } },
      ],
      correctOption: "a",
      explanation: { en: "$2.10 ÷ $2.00 − 1 = +5%.", fr: "2,10 $ ÷ 2,00 $ − 1 = +5 %." },
    },
    {
      id: "q8",
      conceptKey: "ib-accretion-value",
      question: { en: "Does EPS accretion by itself prove that an acquisition creates economic value?", fr: "L’EPS accretion prouve-t-elle à elle seule qu’une acquisition crée de la valeur économique ?" },
      options: [
        { id: "a", label: { en: "No — a buyer can overpay and still show mechanical accretion", fr: "Non — un acheteur peut surpayer tout en affichant une accretion mécanique" } },
        { id: "b", label: { en: "Yes — accretion guarantees value creation", fr: "Oui — l’accretion garantit la création de valeur" } },
        { id: "c", label: { en: "Yes — if the deal uses debt", fr: "Oui — si le deal utilise de la dette" } },
        { id: "d", label: { en: "Yes — if synergies exist", fr: "Oui — s’il existe des synergies" } },
      ],
      correctOption: "a",
      explanation: { en: "Accretion is an accounting output; value creation also depends on price paid, risk and return on invested capital.", fr: "L’accretion est un output comptable ; la création de valeur dépend aussi du prix payé, du risque et du return on invested capital." },
    },
    {
      id: "q9",
      conceptKey: "ib-capital-markets",
      question: { en: "Which team is most directly associated with executing an IPO?", fr: "Quelle équipe est la plus directement associée à l’exécution d’une IPO ?" },
      options: [
        { id: "a", label: { en: "Equity Capital Markets", fr: "Equity Capital Markets" } },
        { id: "b", label: { en: "Private Wealth Management", fr: "Private Wealth Management" } },
        { id: "c", label: { en: "Rates Trading", fr: "Rates Trading" } },
        { id: "d", label: { en: "Audit", fr: "Audit" } },
      ],
      correctOption: "a",
      explanation: { en: "ECM specializes in equity issuance, including IPOs and follow-on offerings.", fr: "ECM se spécialise dans les émissions d’equity, notamment IPOs et follow-ons." },
    },
    {
      id: "q10",
      conceptKey: "ib-interview-structure",
      question: { en: "What is the strongest structure for a technical interview answer?", fr: "Quelle est la meilleure structure pour une réponse technique en entretien ?" },
      options: [
        { id: "a", label: { en: "Definition → mechanics → economic intuition", fr: "Définition → mécanique → intuition économique" } },
        { id: "b", label: { en: "Jargon → jargon → jargon", fr: "Jargon → jargon → jargon" } },
        { id: "c", label: { en: "Give only the final number", fr: "Donner uniquement le chiffre final" } },
        { id: "d", label: { en: "Avoid explaining assumptions", fr: "Éviter d’expliquer les hypothèses" } },
      ],
      correctOption: "a",
      explanation: { en: "This structure demonstrates understanding while keeping the answer easy to follow.", fr: "Cette structure démontre la compréhension tout en gardant la réponse facile à suivre." },
    },
  ],
  interviewPrompt: {
    question: {
      en: "Walk me through how an investment bank would advise a company that is considering acquiring a competitor.",
      fr: "Explique-moi comment une investment bank conseillerait une entreprise qui envisage d’acquérir un concurrent.",
    },
    framework: [
      { en: "Start with the buyer's strategic objective and acquisition criteria.", fr: "Commence par l’objectif stratégique de l’acheteur et ses critères d’acquisition." },
      { en: "Assess the target's business, financial statements, valuation and strategic fit.", fr: "Analyse le business de la cible, ses états financiers, sa valuation et le strategic fit." },
      { en: "Value the target using trading comps, precedents and DCF, then frame a defensible purchase-price range.", fr: "Valorise la cible avec trading comps, precedents et DCF, puis établis une purchase-price range défendable." },
      { en: "Model synergies, financing, leverage, pro forma ownership and accretion/dilution.", fr: "Modélise synergies, financement, leverage, ownership pro forma et accretion/dilution." },
      { en: "Evaluate diligence, integration, regulatory and execution risks.", fr: "Évalue les risques de due diligence, intégration, régulation et exécution." },
      { en: "Recommend whether to proceed, at what price and under which conditions.", fr: "Recommande s’il faut poursuivre, à quel prix et sous quelles conditions." },
    ],
    sample: {
      en: "I would begin by clarifying the buyer's strategic objective and what the target must contribute. Next I would analyze the target's operating performance, cash flow and balance sheet, then triangulate value using trading comparables, precedent transactions and a DCF. I would separate stand-alone value from expected synergies and use that to frame a maximum defensible purchase price. Then I would test financing alternatives, leverage, pro forma ownership and EPS accretion or dilution, while remembering that accretion alone does not prove value creation. Finally, I would evaluate diligence, integration, regulatory and closing risks and recommend whether the buyer should proceed, at what price and with what protections.",
      fr: "Je commencerais par clarifier l’objectif stratégique de l’acheteur et ce que la cible doit apporter. J’analyserais ensuite la performance opérationnelle, le cash flow et le bilan de la cible, puis je triangulerais sa valeur avec trading comparables, precedent transactions et DCF. Je séparerais la stand-alone value des synergies attendues afin de définir un prix d’acquisition maximal défendable. Je testerais ensuite les alternatives de financement, le leverage, l’ownership pro forma et l’EPS accretion ou dilution, tout en gardant en tête que l’accretion ne prouve pas à elle seule la création de valeur. Enfin, j’évaluerais les risques de due diligence, intégration, régulation et closing avant de recommander s’il faut poursuivre, à quel prix et avec quelles protections.",
    },
  },
};
