import type { FinanceLesson } from "./lesson-content";

export const investmentBankingLesson: FinanceLesson = {
  slug: "year-3-investment-banking",
  year: { en: "Year 3 · Applied Finance", fr: "Année 3 · Finance appliquée / Applied Finance" },
  domain: { en: "Investment Banking", fr: "Banque d’investissement / Investment Banking" },
  title: { en: "Investment Banking", fr: "Banque d’investissement / Investment Banking" },
  subtitle: {
    en: "Learn how investment bankers advise companies on M&A, valuation, capital raising and transaction execution — with the technical depth expected in interviews.",
    fr: "Apprends comment les investment bankers conseillent les entreprises en M&A, valuation, levée de capitaux et exécution de transactions — avec le niveau technique attendu en entretien.",
  },
  duration: { en: "180–240 min", fr: "180–240 min" },
  prerequisites: [
    { en: "Corporate Finance", fr: "Finance d’entreprise / Corporate Finance" },
    { en: "Financial Statement Analysis", fr: "Analyse des états financiers / Financial Statement Analysis" },
    { en: "DCF & Relative Valuation", fr: "DCF & valorisation relative / Relative Valuation" },
    { en: "Financial Modeling I", fr: "Modélisation financière I / Financial Modeling I" },
  ],
  objectives: [
    { en: "Explain the role of investment banks in M&A and capital markets.", fr: "Expliquer le rôle des investment banks en M&A et capital markets." },
    { en: "Understand coverage, M&A, ECM, DCM and leveraged-finance teams.", fr: "Comprendre les équipes coverage, M&A, ECM, DCM et leveraged finance." },
    { en: "Describe a sell-side and buy-side M&A process from mandate to closing.", fr: "Décrire un process M&A sell-side et buy-side du mandat au closing." },
    { en: "Apply enterprise value, equity value, trading comps, precedents and DCF correctly.", fr: "Appliquer correctement enterprise value, equity value, trading comps, precedents et DCF." },
    { en: "Understand purchase price, synergies, financing and accretion/dilution.", fr: "Comprendre purchase price, synergies, financement et accretion/dilution." },
    { en: "Explain how IPOs and debt issuance connect issuers with investors.", fr: "Expliquer comment IPOs et émissions de dette connectent émetteurs et investisseurs." },
    { en: "Understand the analyst workflow and common transaction materials.", fr: "Comprendre le workflow analyst et les principaux transaction materials." },
    { en: "Answer core investment-banking interview questions clearly.", fr: "Répondre clairement aux principales questions d’entretien en investment banking." },
  ],
  overviewFlow: {
    title: { en: "From client need to executed transaction", fr: "Du besoin client à la transaction exécutée" },
    steps: [
      { title: { en: "Originate", fr: "Originer" }, detail: { en: "Client need · idea · mandate", fr: "Besoin client · idée · mandat" } },
      { title: { en: "Analyze", fr: "Analyser" }, detail: { en: "Statements · model · valuation", fr: "États financiers · modèle · valuation" } },
      { title: { en: "Structure", fr: "Structurer" }, detail: { en: "Price · financing · process", fr: "Prix · financement · process" } },
      { title: { en: "Execute", fr: "Exécuter" }, detail: { en: "Diligence · negotiation · marketing", fr: "Due diligence · négociation · marketing" } },
      { title: { en: "Close", fr: "Clôturer" }, detail: { en: "Approvals · settlement · announcement", fr: "Approbations · settlement · annonce" } },
    ],
  },
  sections: [
    {
      id: "business-model",
      kicker: { en: "01 · THE BUSINESS", fr: "01 · LE MÉTIER" },
      title: { en: "Investment banking combines advisory, financing and execution", fr: "L’investment banking combine conseil, financement et exécution" },
      coreFacts: [
        { en: "Investment banks advise corporations, financial sponsors and governments on major strategic and financing decisions.", fr: "Les investment banks conseillent entreprises, financial sponsors et gouvernements sur de grandes décisions stratégiques et de financement." },
        { en: "Core activities include M&A advisory, Equity Capital Markets, Debt Capital Markets and Leveraged Finance.", fr: "Les principales activités incluent M&A advisory, Equity Capital Markets, Debt Capital Markets et Leveraged Finance." },
        { en: "Coverage teams own sector expertise and client relationships, while product teams bring transaction specialization.", fr: "Les coverage teams portent l’expertise sectorielle et la relation client, tandis que les product teams apportent une spécialisation transactionnelle." },
        { en: "Investment banking is different from Sales & Trading, Asset Management and Wealth Management even within the same bank.", fr: "L’investment banking est distinct de Sales & Trading, Asset Management et Wealth Management même au sein de la même banque." },
      ],
      explanation: {
        Beginner: {
          en: "Think of an investment bank as a specialist adviser for very large financial decisions. If a company wants to buy a competitor, sell a division, go public or issue billions of debt, bankers help analyze the decision, value the business, find counterparties or investors and execute the transaction.",
          fr: "Pense à une investment bank comme à un conseiller spécialisé dans les très grandes décisions financières. Si une entreprise veut acheter un concurrent, vendre une division, entrer en Bourse ou émettre plusieurs milliards de dette, les bankers aident à analyser la décision, valoriser le business, trouver contreparties ou investisseurs et exécuter la transaction.",
        },
        Intermediate: {
          en: "Investment banking mixes relationship management, valuation, market judgment and execution. Senior bankers originate ideas and mandates; junior teams turn them into analysis, models, presentations, process management and transaction documentation.",
          fr: "L’investment banking combine relation client, valuation, jugement de marché et exécution. Les senior bankers originnent les idées et mandats ; les équipes juniors les transforment en analyses, modèles, présentations, process management et documentation transactionnelle.",
        },
        Professional: {
          en: "The bank reduces information, coordination and execution frictions around large capital-allocation decisions. Advisory economics come from judgment, process design and execution certainty; underwriting economics come from helping issuers place securities with investors and assuming distribution risk where relevant.",
          fr: "La banque réduit les frictions d’information, de coordination et d’exécution autour des grandes décisions d’allocation du capital. L’économie de l’advisory vient du jugement, du process design et de l’execution certainty ; celle de l’underwriting vient de l’aide au placement des titres auprès des investisseurs et, lorsque pertinent, de la prise de distribution risk.",
        },
      },
      comparison: {
        title: { en: "Core teams", fr: "Principales équipes" },
        headers: [
          { en: "Team", fr: "Équipe" },
          { en: "Main role", fr: "Rôle principal" },
          { en: "Typical output", fr: "Livrable typique" },
        ],
        rows: [
          { cells: [
            { en: "Coverage", fr: "Coverage" },
            { en: "Client relationship and sector expertise", fr: "Relation client et expertise sectorielle" },
            { en: "Strategic ideas and pitches", fr: "Idées stratégiques et pitches" },
          ] },
          { cells: [
            { en: "M&A", fr: "M&A" },
            { en: "Acquisitions, disposals and mergers", fr: "Acquisitions, cessions et fusions" },
            { en: "Valuation and deal execution", fr: "Valuation et deal execution" },
          ] },
          { cells: [
            { en: "ECM", fr: "ECM" },
            { en: "Raise equity capital", fr: "Lever de l’equity" },
            { en: "IPO and follow-on execution", fr: "IPO et follow-on" },
          ] },
          { cells: [
            { en: "DCM / LevFin", fr: "DCM / LevFin" },
            { en: "Raise and structure debt", fr: "Lever et structurer de la dette" },
            { en: "Bonds, loans and acquisition financing", fr: "Obligations, loans et acquisition financing" },
          ] },
        ],
      },
      vocabulary: [
        { en: "Mandate", fr: "mandat / mandate", definition: { en: "Formal engagement under which a bank is hired to advise or execute a transaction.", fr: "Engagement formel par lequel une banque est retenue pour conseiller ou exécuter une transaction." } },
        { en: "Underwriting", fr: "prise ferme / underwriting", definition: { en: "Process in which a bank helps distribute newly issued securities and may assume placement risk.", fr: "Processus par lequel une banque aide à distribuer de nouveaux titres et peut assumer un risque de placement." } },
      ],
    },
    {
      id: "analyst-workflow",
      kicker: { en: "02 · ANALYST WORKFLOW", fr: "02 · WORKFLOW ANALYST" },
      title: { en: "Analysts turn raw information into decision-ready materials", fr: "Les analysts transforment l’information brute en supports utilisables pour décider" },
      coreFacts: [
        { en: "Analysts work on financial modeling, valuation, research, presentations and process coordination.", fr: "Les analysts travaillent sur financial modeling, valuation, recherche, présentations et coordination du process." },
        { en: "Accuracy, traceable sources, formatting consistency and version control are essential.", fr: "Précision, sources traçables, cohérence du format et version control sont essentiels." },
        { en: "A pitch is designed to win business; a live deal is an active client mandate that must be executed.", fr: "Un pitch vise à gagner un mandat ; un live deal est un mandat client actif à exécuter." },
        { en: "Common outputs include pitch books, valuation pages, management presentations, CIMs, buyer lists and process trackers.", fr: "Les livrables courants incluent pitch books, valuation pages, management presentations, CIMs, buyer lists et process trackers." },
      ],
      explanation: {
        Beginner: {
          en: "Junior bankers are not simply making PowerPoint. Their job is to make sure numbers are correct, logic is clear and every page can be relied on by senior bankers and clients.",
          fr: "Les junior bankers ne font pas simplement du PowerPoint. Leur rôle est de s’assurer que les chiffres sont exacts, la logique claire et que chaque page peut être utilisée en confiance par les senior bankers et les clients.",
        },
        Intermediate: {
          en: "A strong workflow is: gather source data, normalize it, update the model, refresh valuation outputs, translate findings into client-ready pages, run quality checks and maintain a clean audit trail of assumptions and versions.",
          fr: "Un bon workflow est : collecter les sources, normaliser les données, mettre à jour le modèle, rafraîchir les valuations, traduire les résultats en pages client-ready, effectuer les quality checks et maintenir un audit trail propre des hypothèses et versions.",
        },
        Professional: {
          en: "The highest-value analyst work is error prevention and decision compression. Small source or modeling mistakes can propagate into valuation, negotiation and transaction terms, so controls and version discipline are part of the finance work itself.",
          fr: "Le travail analyst à plus forte valeur repose sur la prévention des erreurs et la compression de la décision. Une petite erreur de source ou de modèle peut contaminer valuation, négociation et transaction terms ; les contrôles et la version discipline font donc partie intégrante du travail financier.",
        },
      },
      example: {
        en: "Example workflow: update the latest earnings, reconcile revenue and EBITDA to reported statements, refresh net debt, roll the DCF forward, update trading comps, check every valuation range and then refresh the client deck.",
        fr: "Exemple : intégrer les derniers résultats, réconcilier revenue et EBITDA aux états publiés, actualiser net debt, faire rouler le DCF, mettre à jour les trading comps, vérifier chaque range de valuation puis actualiser le deck client.",
      },
      vocabulary: [
        { en: "Pitch book", fr: "pitch book / présentation commerciale", definition: { en: "Presentation proposing strategic ideas, transaction alternatives or financing solutions to a client.", fr: "Présentation proposant des idées stratégiques, alternatives de transaction ou solutions de financement à un client." } },
        { en: "Live deal", fr: "live deal / transaction active", definition: { en: "Transaction under an active client mandate rather than a prospective pitch.", fr: "Transaction sous mandat client actif, par opposition à un pitch prospectif." } },
      ],
    },
    {
      id: "valuation",
      kicker: { en: "03 · VALUATION", fr: "03 · VALUATION" },
      title: { en: "Bankers triangulate value using several methods", fr: "Les bankers triangulent la valeur avec plusieurs méthodes" },
      coreFacts: [
        { en: "The main methods are trading comparables, precedent transactions and DCF.", fr: "Les principales méthodes sont trading comparables, precedent transactions et DCF." },
        { en: "Enterprise-value multiples pair EV with pre-interest metrics such as revenue or EBITDA.", fr: "Les multiples d’enterprise value se combinent avec des métriques avant intérêts comme revenue ou EBITDA." },
        { en: "Equity-value multiples pair equity value with metrics available to common shareholders, such as net income or EPS.", fr: "Les multiples d’equity value se combinent avec des métriques disponibles pour les actionnaires ordinaires, comme net income ou EPS." },
        { en: "Precedent transactions often include control premiums and deal-specific synergies.", fr: "Les precedent transactions intègrent souvent control premiums et synergies spécifiques au deal." },
      ],
      explanation: {
        Beginner: {
          en: "Trading comps ask how similar public companies are valued today. Precedent transactions ask what buyers paid in earlier deals. A DCF asks what the company’s own future cash flows are worth today.",
          fr: "Les trading comps demandent comment des entreprises comparables cotées sont valorisées aujourd’hui. Les precedent transactions demandent ce que des acheteurs ont payé lors de deals passés. Le DCF demande combien valent aujourd’hui les futurs cash flows propres à l’entreprise.",
        },
        Intermediate: {
          en: "A banker selects relevant peers, normalizes financial metrics, applies appropriate multiples and compares the implied range with DCF and transaction evidence. The goal is to understand why methods differ, not to average them blindly.",
          fr: "Un banker sélectionne des peers pertinents, normalise les métriques, applique les bons multiples et compare la range implicite au DCF et aux transactions. Le but est de comprendre pourquoi les méthodes diffèrent, pas de les moyenner aveuglément.",
        },
        Professional: {
          en: "Professional valuation requires judgment around comparability, cyclicality, accounting consistency, capital structure, control, expected synergies and market regime. The banker must explain which assumptions drive the gap between observed market price and implied value.",
          fr: "La valuation professionnelle demande du jugement autour de la comparabilité, cyclicality, cohérence comptable, structure du capital, contrôle, synergies attendues et régime de marché. Le banker doit expliquer quelles hypothèses créent l’écart entre prix observé et valeur implicite.",
        },
      },
      formula: {
        label: { en: "Enterprise value bridge", fr: "Bridge d’enterprise value" },
        expression: "Enterprise Value = Equity Value + Debt + Preferred Stock + Non-controlling Interest − Cash",
        explanation: { en: "This converts the value attributable to common shareholders into the value of the operating business available to all capital providers.", fr: "Ce bridge transforme la valeur attribuable aux actionnaires ordinaires en valeur du business opérationnel attribuable à l’ensemble des apporteurs de capitaux." },
        workedExample: { en: "If equity value is $2.0bn, debt is $600m and cash is $200m, EV is approximately $2.4bn before other adjustments.", fr: "Si l’equity value est de 2,0 Md$, la dette de 600 M$ et le cash de 200 M$, l’EV est d’environ 2,4 Md$ avant autres ajustements." },
      },
      comparison: {
        title: { en: "What each method tells you", fr: "Ce que dit chaque méthode" },
        headers: [
          { en: "Method", fr: "Méthode" },
          { en: "Main input", fr: "Input principal" },
          { en: "Interpretation", fr: "Interprétation" },
        ],
        rows: [
          { cells: [
            { en: "Trading comps", fr: "Trading comps" },
            { en: "Current peer multiples", fr: "Multiples actuels des peers" },
            { en: "How the public market prices comparable businesses", fr: "Comment le marché public valorise des businesses comparables" },
          ] },
          { cells: [
            { en: "Precedents", fr: "Precedents" },
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
        { en: "Control premium", fr: "prime de contrôle / control premium", definition: { en: "Premium a buyer may pay to obtain control relative to unaffected market value.", fr: "Prime qu’un acheteur peut payer pour obtenir le contrôle par rapport à la valeur de marché unaffected." } },
        { en: "Unlevered free cash flow", fr: "unlevered free cash flow / FCF non endetté", definition: { en: "Operating cash flow before interest and therefore available to all capital providers.", fr: "Cash flow opérationnel avant intérêts et donc disponible pour tous les apporteurs de capitaux." } },
      ],
    },
    {
      id: "ma-process",
      kicker: { en: "04 · M&A PROCESS", fr: "04 · PROCESS M&A" },
      title: { en: "Sell-side and buy-side processes solve different problems", fr: "Les process sell-side et buy-side répondent à des objectifs différents" },
      coreFacts: [
        { en: "A sell-side adviser helps a seller prepare materials, identify buyers, create competition and manage bids.", fr: "Un sell-side adviser aide le vendeur à préparer les documents, identifier les acheteurs, créer de la concurrence et gérer les offres." },
        { en: "A buy-side adviser helps a buyer identify targets, assess strategic fit, value the target and structure the offer.", fr: "Un buy-side adviser aide l’acheteur à identifier des cibles, évaluer le strategic fit, valoriser la cible et structurer l’offre." },
        { en: "Due diligence, financing certainty, regulatory risk and contractual terms can be as important as headline price.", fr: "Due diligence, certitude du financement, risque réglementaire et contractual terms peuvent être aussi importants que le prix facial." },
        { en: "Competition can improve seller outcomes, but broad processes create more confidentiality and execution complexity.", fr: "La concurrence peut améliorer le résultat vendeur, mais les broad processes créent davantage de risques de confidentialité et de complexité d’exécution." },
      ],
      explanation: {
        Beginner: {
          en: "On the sell-side, the bank helps the owner sell the company at attractive terms. On the buy-side, the bank helps an acquirer decide what to buy, how much to pay and how to structure the deal.",
          fr: "En sell-side, la banque aide le propriétaire à vendre l’entreprise à de bonnes conditions. En buy-side, elle aide l’acquéreur à décider quoi acheter, combien payer et comment structurer le deal.",
        },
        Intermediate: {
          en: "A typical sell-side process moves through preparation, buyer outreach, confidentiality agreements, information access, first-round bids, management meetings, due diligence and final bids. A buy-side process focuses more on target assessment, valuation, financing, diligence and negotiation.",
          fr: "Un process sell-side typique passe par préparation, buyer outreach, confidentiality agreements, accès à l’information, first-round bids, management meetings, due diligence et final bids. Un process buy-side se concentre davantage sur target assessment, valuation, financement, due diligence et négociation.",
        },
        Professional: {
          en: "Process architecture itself can create or destroy value. Timing, sequencing, information symmetry, management access, bid instructions, financing requirements and credible alternatives all shape buyer behavior and closing certainty.",
          fr: "L’architecture du process peut elle-même créer ou détruire de la valeur. Timing, séquencement, symétrie de l’information, accès management, bid instructions, exigences de financement et alternatives crédibles influencent tous le comportement des acheteurs et la certitude du closing.",
        },
      },
      example: {
        en: "A seller may prefer a $1.05bn bid with committed financing and limited conditions over a $1.10bn bid with uncertain financing and difficult antitrust risk if the extra price does not compensate for the lower closing probability.",
        fr: "Un vendeur peut préférer une offre à 1,05 Md$ avec committed financing et peu de conditions à une offre à 1,10 Md$ avec financement incertain et antitrust risk élevé si le prix additionnel ne compense pas la plus faible probabilité de closing." },
      vocabulary: [
        { en: "CIM", fr: "CIM / Confidential Information Memorandum", definition: { en: "Detailed confidential document presenting a company to potential buyers.", fr: "Document confidentiel détaillé présentant une entreprise aux acheteurs potentiels." } },
        { en: "IOI", fr: "IOI / indication of interest", definition: { en: "Preliminary non-binding indication of price and interest from a potential buyer.", fr: "Indication préliminaire et non engageante du prix et de l’intérêt d’un acheteur potentiel." } },
      ],
    },
    {
      id: "merger-model",
      kicker: { en: "05 · MERGER MODEL", fr: "05 · MERGER MODEL" },
      title: { en: "Purchase price, synergies and financing determine deal economics", fr: "Purchase price, synergies et financement déterminent l’économie du deal" },
      coreFacts: [
        { en: "A buyer compares purchase price with stand-alone value, expected synergies and strategic benefits.", fr: "Un acheteur compare purchase price à stand-alone value, synergies attendues et bénéfices stratégiques." },
        { en: "Synergies should be adjusted for timing, implementation cost, tax and probability of realization.", fr: "Les synergies doivent être ajustées pour timing, implementation cost, fiscalité et probabilité de réalisation." },
        { en: "Cash, debt and stock financing affect leverage, ownership and EPS differently.", fr: "Cash, dette et equity financing affectent différemment leverage, ownership et EPS." },
        { en: "EPS accretion is useful but does not by itself prove value creation.", fr: "L’EPS accretion est utile mais ne prouve pas à elle seule la création de valeur." },
      ],
      explanation: {
        Beginner: {
          en: "A good acquisition is not simply buying a good company. The buyer must compare what it pays with what it receives. If the buyer pays too much, even a strong target can destroy value.",
          fr: "Une bonne acquisition ne consiste pas simplement à acheter une bonne entreprise. L’acheteur doit comparer ce qu’il paie à ce qu’il reçoit. S’il paie trop cher, même une excellente cible peut détruire de la valeur.",
        },
        Intermediate: {
          en: "A merger model combines buyer earnings, target earnings, synergies, purchase-accounting adjustments, financing costs and the new share count to estimate pro forma EPS and leverage.",
          fr: "Un merger model combine earnings de l’acheteur, earnings de la cible, synergies, purchase-accounting adjustments, coûts de financement et nouveau nombre d’actions afin d’estimer l’EPS et le leverage pro forma.",
        },
        Professional: {
          en: "Strong buy-side analysis separates stand-alone value, control value, synergy value and financing value. Maximum defensible price depends on risk-adjusted synergy capture and required return, not simply on precedent multiples or EPS optics.",
          fr: "Une bonne analyse buy-side sépare stand-alone value, control value, synergy value et financing value. Le prix maximum défendable dépend de la capture de synergies ajustée du risque et du required return, pas simplement des precedent multiples ou de l’optique EPS.",
        },
      },
      formula: {
        label: { en: "EPS accretion / dilution", fr: "Accretion / dilution EPS" },
        expression: "Accretion / Dilution % = Pro Forma EPS ÷ Buyer Stand-alone EPS − 1",
        explanation: { en: "A positive result means accretion; a negative result means dilution.", fr: "Un résultat positif signifie accretion ; un résultat négatif signifie dilution." },
        workedExample: { en: "$2.10 ÷ $2.00 − 1 = +5.0% accretion.", fr: "2,10 $ ÷ 2,00 $ − 1 = +5,0 % d’accretion." },
      },
      marketConnection: {
        en: "When a deal is announced, investors immediately assess premium, strategic rationale, financing, synergies, regulatory risk and whether the buyer is overpaying.",
        fr: "Lorsqu’un deal est annoncé, les investisseurs évaluent immédiatement premium, logique stratégique, financement, synergies, risque réglementaire et risque de surpaiement par l’acheteur." },
      vocabulary: [
        { en: "Synergy", fr: "synergie / synergy", definition: { en: "Incremental value created by combining two businesses, usually through cost savings or additional revenue.", fr: "Valeur supplémentaire créée par la combinaison de deux businesses, généralement via économies de coûts ou revenus additionnels." } },
        { en: "Pro forma", fr: "pro forma", definition: { en: "Financial view showing the combined company as if the transaction had already occurred.", fr: "Vue financière présentant l’entreprise combinée comme si la transaction avait déjà eu lieu." } },
      ],
    },
    {
      id: "capital-markets",
      kicker: { en: "06 · CAPITAL MARKETS", fr: "06 · CAPITAL MARKETS" },
      title: { en: "ECM and DCM connect companies with investors", fr: "ECM et DCM connectent les entreprises aux investisseurs" },
      coreFacts: [
        { en: "ECM helps companies raise equity through IPOs, follow-ons, rights issues and block trades.", fr: "ECM aide les entreprises à lever de l’equity via IPOs, follow-ons, rights issues et block trades." },
        { en: "DCM helps issuers raise debt through bonds and related instruments.", fr: "DCM aide les émetteurs à lever de la dette via obligations et instruments associés." },
        { en: "Execution depends on investor demand, valuation, volatility, rates, credit spreads and issuer objectives.", fr: "L’exécution dépend de la demande investisseur, valuation, volatilité, taux, credit spreads et objectifs de l’émetteur." },
        { en: "An IPO is both a financing event and a transition to public-market disclosure and governance requirements.", fr: "Une IPO est à la fois une opération de financement et une transition vers les exigences de disclosure et gouvernance des marchés publics." },
      ],
      explanation: {
        Beginner: {
          en: "If a company needs money, it can sell ownership through equity or borrow through debt. ECM specializes in equity issuance; DCM specializes in bond markets.",
          fr: "Si une entreprise a besoin d’argent, elle peut vendre une partie de son ownership via l’equity ou emprunter via la dette. ECM se spécialise dans les émissions d’actions ; DCM dans les marchés obligataires.",
        },
        Intermediate: {
          en: "Capital-markets execution balances issuer objectives with investor clearing levels. The bank uses market feedback, comparable issuance, investor conversations and bookbuilding to determine transaction size and pricing.",
          fr: "L’exécution capital markets équilibre objectifs de l’émetteur et clearing levels investisseurs. La banque utilise market feedback, émissions comparables, discussions investisseurs et bookbuilding pour déterminer taille et pricing de la transaction.",
        },
        Professional: {
          en: "Capital-markets bankers must understand both corporate-finance objectives and real-time distribution conditions. Window risk matters because volatility, rates, spreads, sector sentiment and competing issuance can determine whether a transaction is executable on acceptable terms.",
          fr: "Les capital-markets bankers doivent comprendre à la fois les objectifs de corporate finance et les conditions de distribution en temps réel. Le window risk compte car volatilité, taux, spreads, sentiment sectoriel et émissions concurrentes peuvent déterminer si une transaction est exécutable à de bonnes conditions.",
        },
      },
      comparison: {
        title: { en: "Equity versus debt", fr: "Equity versus dette" },
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
            { en: "Cash obligation", fr: "Obligation cash" },
            { en: "No contractual interest payment", fr: "Pas d’intérêt contractuel obligatoire" },
            { en: "Interest and principal obligations", fr: "Obligations d’intérêts et de principal" },
          ] },
          { cells: [
            { en: "Main issuer risk", fr: "Risque principal" },
            { en: "Dilution and valuation risk", fr: "Dilution et valuation risk" },
            { en: "Leverage and refinancing risk", fr: "Leverage et refinancing risk" },
          ] },
        ],
      },
      vocabulary: [
        { en: "Bookbuilding", fr: "construction du livre d’ordres / bookbuilding", definition: { en: "Process of collecting investor demand to determine transaction size and pricing.", fr: "Processus de collecte de la demande investisseur pour déterminer taille et pricing d’une émission." } },
        { en: "Follow-on", fr: "follow-on / émission secondaire", definition: { en: "Additional equity offering by a company that is already publicly listed.", fr: "Émission supplémentaire d’actions par une entreprise déjà cotée." } },
      ],
    },
    {
      id: "interview-readiness",
      kicker: { en: "07 · INTERVIEW READINESS", fr: "07 · PRÉPARATION ENTRETIEN" },
      title: { en: "Technical answers should connect definition, mechanics and intuition", fr: "Les réponses techniques doivent relier définition, mécanique et intuition" },
      coreFacts: [
        { en: "Core interviews test accounting links, enterprise versus equity value, valuation, DCF, merger math and deal logic.", fr: "Les entretiens testent liens comptables, enterprise versus equity value, valuation, DCF, merger math et logique de deal." },
        { en: "Structured reasoning matters more than memorized jargon.", fr: "Un raisonnement structuré compte davantage qu’un jargon mémorisé." },
        { en: "A strong answer states the concept, walks through the mechanics and explains the economic intuition.", fr: "Une bonne réponse énonce le concept, déroule la mécanique et explique l’intuition économique." },
        { en: "Deal discussion should cover strategic rationale, valuation, financing, synergies, risks and market reaction.", fr: "La discussion d’un deal doit couvrir logique stratégique, valuation, financement, synergies, risques et réaction de marché." },
      ],
      explanation: {
        Beginner: {
          en: "Do not jump straight to a formula. First say what the concept means, then explain the steps, then give a small example. This makes the answer easier to follow and proves understanding.",
          fr: "Ne saute pas directement à une formule. Dis d’abord ce que signifie le concept, explique ensuite les étapes, puis donne un petit exemple. Cela rend la réponse plus claire et démontre la compréhension.",
        },
        Intermediate: {
          en: "Use a three-layer answer: definition, mechanics, intuition. For enterprise value, define the concept, give the equity-to-EV bridge, then explain why EV pairs with pre-interest metrics such as EBITDA.",
          fr: "Utilise une réponse en trois couches : définition, mécanique, intuition. Pour enterprise value, définis le concept, donne le bridge equity-to-EV, puis explique pourquoi EV se combine à des métriques avant intérêts comme EBITDA.",
        },
        Professional: {
          en: "At stronger interview levels, add nuance after answering the core question directly. Relevant edge cases can include financial institutions, lease treatment, pension deficits, minority interests, negative net debt and purchase-accounting effects.",
          fr: "À un niveau plus avancé, ajoute de la nuance après avoir répondu clairement à la question centrale. Les edge cases pertinents peuvent inclure institutions financières, lease treatment, déficits de pension, minority interests, net debt négatif et purchase-accounting effects.",
        },
      },
      example: {
        en: "A strong answer to 'Why can an acquisition be accretive?' is: because acquired earnings plus synergies can exceed incremental financing and share-issuance costs. Then add that accretion alone does not prove value creation because a buyer can overpay and still manufacture EPS accretion with cheap funding.",
        fr: "Une bonne réponse à « Why can an acquisition be accretive? » est : parce que les earnings acquis plus les synergies peuvent dépasser les coûts additionnels de financement et d’émission d’actions. Ajoute ensuite que l’accretion ne prouve pas à elle seule la création de valeur car un acheteur peut surpayer tout en créant une accretion EPS mécanique grâce à un financement bon marché.",
      },
      vocabulary: [
        { en: "Technical interview", fr: "entretien technique / technical interview", definition: { en: "Interview focused on accounting, valuation, transaction mechanics and finance concepts.", fr: "Entretien centré sur accounting, valuation, transaction mechanics et concepts financiers." } },
        { en: "Deal rationale", fr: "logique du deal / deal rationale", definition: { en: "Strategic and financial explanation for why a transaction should create value.", fr: "Explication stratégique et financière de la raison pour laquelle une transaction devrait créer de la valeur." } },
      ],
    },
  ],
  quiz: [
    {
      id: "q1",
      conceptKey: "ib-role",
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
      conceptKey: "ib-ev",
      question: { en: "A company has $2.0bn equity value, $600m debt and $200m cash. Ignoring other adjustments, what is enterprise value?", fr: "Une entreprise a 2,0 Md$ d’equity value, 600 M$ de dette et 200 M$ de cash. Quelle est l’enterprise value ?" },
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
      conceptKey: "ib-valuation",
      question: { en: "Which valuation method is based most directly on company-specific forecast cash flows?", fr: "Quelle méthode repose le plus directement sur les cash flows prévisionnels propres à l’entreprise ?" },
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
      conceptKey: "ib-sell-side",
      question: { en: "Why can a competitive sell-side process improve seller outcomes?", fr: "Pourquoi un process sell-side compétitif peut-il améliorer le résultat pour le vendeur ?" },
      options: [
        { id: "a", label: { en: "It creates competitive tension among credible buyers", fr: "Il crée une competitive tension entre acheteurs crédibles" } },
        { id: "b", label: { en: "It removes all closing risk", fr: "Il élimine tout closing risk" } },
        { id: "c", label: { en: "It guarantees identical bids", fr: "Il garantit des offres identiques" } },
        { id: "d", label: { en: "It makes valuation unnecessary", fr: "Il rend la valuation inutile" } },
      ],
      correctOption: "a",
      explanation: { en: "Competition can improve price and terms, although execution and closing risk remain important.", fr: "La concurrence peut améliorer prix et conditions, même si execution risk et closing risk restent importants." },
    },
    {
      id: "q5",
      conceptKey: "ib-synergies",
      question: { en: "How should expected synergies be treated in deal valuation?", fr: "Comment faut-il traiter les synergies attendues dans la valuation d’un deal ?" },
      options: [
        { id: "a", label: { en: "Adjust for timing, cost, tax and probability of realization", fr: "Les ajuster pour timing, coûts, fiscalité et probabilité de réalisation" } },
        { id: "b", label: { en: "Count 100% immediately with no adjustment", fr: "Compter 100 % immédiatement sans ajustement" } },
        { id: "c", label: { en: "Always ignore them", fr: "Toujours les ignorer" } },
        { id: "d", label: { en: "Treat them as existing cash", fr: "Les traiter comme du cash déjà existant" } },
      ],
      correctOption: "a",
      explanation: { en: "Synergies are uncertain future benefits and should be risk-adjusted before supporting purchase price.", fr: "Les synergies sont des bénéfices futurs incertains et doivent être ajustées du risque avant de soutenir un purchase price." },
    },
    {
      id: "q6",
      conceptKey: "ib-accretion",
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
      id: "q7",
      conceptKey: "ib-ecm",
      question: { en: "Which team is most directly associated with executing an IPO?", fr: "Quelle équipe est la plus directement associée à l’exécution d’une IPO ?" },
      options: [
        { id: "a", label: { en: "Equity Capital Markets", fr: "Equity Capital Markets" } },
        { id: "b", label: { en: "Private Wealth Management", fr: "Private Wealth Management" } },
        { id: "c", label: { en: "Rates Trading", fr: "Rates Trading" } },
        { id: "d", label: { en: "Audit", fr: "Audit" } },
      ],
      correctOption: "a",
      explanation: { en: "ECM specializes in equity issuance, including IPOs and follow-ons.", fr: "ECM se spécialise dans les émissions d’equity, notamment IPOs et follow-ons." },
    },
    {
      id: "q8",
      conceptKey: "ib-interview",
      question: { en: "What is the strongest structure for a technical interview answer?", fr: "Quelle est la meilleure structure pour une réponse technique en entretien ?" },
      options: [
        { id: "a", label: { en: "Definition → mechanics → economic intuition", fr: "Définition → mécanique → intuition économique" } },
        { id: "b", label: { en: "Only the final number", fr: "Uniquement le chiffre final" } },
        { id: "c", label: { en: "Maximum jargon with no explanation", fr: "Un maximum de jargon sans explication" } },
        { id: "d", label: { en: "Avoid assumptions", fr: "Éviter les hypothèses" } },
      ],
      correctOption: "a",
      explanation: { en: "This structure demonstrates understanding while keeping the answer easy to follow.", fr: "Cette structure démontre la compréhension tout en gardant la réponse facile à suivre." },
    },
  ],
  interviewPrompt: {
    question: {
      en: "Walk me through how an investment bank would advise a company considering the acquisition of a competitor.",
      fr: "Explique-moi comment une investment bank conseillerait une entreprise envisageant l’acquisition d’un concurrent.",
    },
    framework: [
      { en: "Clarify the buyer's strategic objective and acquisition criteria.", fr: "Clarifie l’objectif stratégique de l’acheteur et ses critères d’acquisition." },
      { en: "Analyze the target's business, financial statements and strategic fit.", fr: "Analyse le business de la cible, ses états financiers et le strategic fit." },
      { en: "Value the target using trading comps, precedents and DCF.", fr: "Valorise la cible avec trading comps, precedents et DCF." },
      { en: "Model synergies, financing, leverage and accretion/dilution.", fr: "Modélise synergies, financement, leverage et accretion/dilution." },
      { en: "Evaluate diligence, integration, regulatory and execution risks.", fr: "Évalue les risques de due diligence, intégration, régulation et exécution." },
      { en: "Recommend whether to proceed, at what price and under which conditions.", fr: "Recommande s’il faut poursuivre, à quel prix et sous quelles conditions." },
    ],
    sample: {
      en: "I would start by clarifying the buyer's strategic objective and acquisition criteria. Then I would assess the target's business, financial statements and strategic fit, and triangulate value using trading comparables, precedent transactions and a DCF. I would separate stand-alone value from expected synergies to frame a maximum defensible purchase price. Next I would test financing alternatives, leverage and EPS accretion or dilution, while remembering that accretion alone does not prove value creation. Finally, I would evaluate diligence, integration, regulatory and closing risks and recommend whether the buyer should proceed, at what price and with what protections.",
      fr: "Je commencerais par clarifier l’objectif stratégique de l’acheteur et ses critères d’acquisition. J’analyserais ensuite le business de la cible, ses états financiers et le strategic fit, puis je triangulerais sa valeur avec trading comparables, precedent transactions et DCF. Je séparerais la stand-alone value des synergies attendues afin de définir un prix d’acquisition maximal défendable. Je testerais ensuite les alternatives de financement, le leverage et l’EPS accretion ou dilution, tout en gardant en tête que l’accretion ne prouve pas à elle seule la création de valeur. Enfin, j’évaluerais les risques de due diligence, intégration, régulation et closing avant de recommander s’il faut poursuivre, à quel prix et avec quelles protections.",
    },
  },
};
