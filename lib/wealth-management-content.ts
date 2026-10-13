import type { FinanceLesson } from "./lesson-content";

export const wealthManagementLesson: FinanceLesson = {
  slug: "year-3-wealth-management",
  year: { en: "Year 3 · Applied Finance", fr: "Année 3 · Finance appliquée / Applied Finance" },
  domain: { en: "Portfolio & Risk", fr: "Portefeuille & Risque / Portfolio & Risk" },
  title: { en: "Wealth Management", fr: "Wealth Management / Gestion de patrimoine" },
  subtitle: {
    en: "Learn how wealth managers connect client goals, cash flows, taxes, risk capacity and behavior to asset allocation, portfolio construction, retirement, estate and intergenerational planning.",
    fr: "Comprendre comment les wealth managers relient objectifs clients, cash flows, fiscalité, capacité de risque et comportement à l’asset allocation, la construction de portefeuille, la retraite, la transmission et la planification intergénérationnelle.",
  },
  duration: { en: "185–225 min", fr: "185–225 min" },
  prerequisites: [
    { en: "Risk, Return & Diversification", fr: "Risque, rendement & diversification" },
    { en: "Portfolio Theory & CAPM", fr: "Portfolio Theory & CAPM" },
    { en: "Time Value of Money", fr: "Valeur temps de l’argent / Time Value of Money" },
    { en: "Asset Management", fr: "Asset Management" },
    { en: "Financial Accounting Foundations", fr: "Fondamentaux de comptabilité financière" },
  ],
  objectives: [
    { en: "Translate client goals, liabilities and time horizons into an investment policy.", fr: "Traduire objectifs, passifs et horizons du client en politique d’investissement." },
    { en: "Distinguish risk tolerance, risk capacity and required return.", fr: "Distinguer tolérance au risque, capacité de risque et rendement requis." },
    { en: "Design strategic asset allocation across equities, fixed income, cash and alternatives.", fr: "Construire une allocation stratégique entre actions, fixed income, cash et alternatives." },
    { en: "Evaluate retirement sustainability using cash-flow, inflation and withdrawal assumptions.", fr: "Évaluer la soutenabilité de la retraite avec hypothèses de cash flow, inflation et retraits." },
    { en: "Explain how taxes, liquidity, insurance, estate planning and concentrated wealth affect portfolio decisions.", fr: "Expliquer comment fiscalité, liquidité, assurance, transmission et patrimoine concentré affectent les décisions de portefeuille." },
    { en: "Communicate a recommendation clearly in a client-style interview or advisory meeting.", fr: "Communiquer clairement une recommandation dans un entretien ou rendez-vous client." },
  ],
  overviewFlow: {
    title: { en: "From client discovery to an ongoing wealth plan", fr: "De la découverte client au plan patrimonial continu" },
    steps: [
      { title: { en: "Discover", fr: "Découvrir" }, detail: { en: "Goals · family · balance sheet", fr: "Objectifs · famille · bilan" } },
      { title: { en: "Diagnose", fr: "Diagnostiquer" }, detail: { en: "Risk · cash flow · taxes", fr: "Risque · cash flow · fiscalité" } },
      { title: { en: "Design", fr: "Concevoir" }, detail: { en: "Allocation · liquidity · protection", fr: "Allocation · liquidité · protection" } },
      { title: { en: "Implement", fr: "Implémenter" }, detail: { en: "Accounts · products · execution", fr: "Comptes · produits · exécution" } },
      { title: { en: "Review", fr: "Suivre" }, detail: { en: "Rebalance · update · communicate", fr: "Rebalancer · mettre à jour · communiquer" } },
    ],
  },
  sections: [
    {
      id: "client-discovery",
      kicker: { en: "01 · CLIENT DISCOVERY & BALANCE SHEET", fr: "01 · DÉCOUVERTE CLIENT & BILAN" },
      title: { en: "Wealth management begins with the client, not the portfolio", fr: "Le wealth management commence par le client, pas par le portefeuille" },
      coreFacts: [
        { en: "A wealth plan starts with goals, family structure, assets, liabilities, income, spending and liquidity needs.", fr: "Un plan patrimonial commence par les objectifs, la structure familiale, les actifs, passifs, revenus, dépenses et besoins de liquidité." },
        { en: "Net worth is assets minus liabilities, but liquidity and cash-flow stability matter as much as headline wealth.", fr: "La valeur nette est actifs moins passifs, mais la liquidité et la stabilité des cash flows comptent autant que le patrimoine affiché." },
        { en: "Human capital can be an important economic asset, especially for younger clients.", fr: "Le capital humain peut être un actif économique important, surtout pour les clients jeunes." },
        { en: "A recommendation that ignores debt, taxes or near-term spending can be unsuitable even if the investment itself is attractive.", fr: "Une recommandation qui ignore dette, fiscalité ou dépenses proches peut être inadaptée même si l’investissement est attractif." },
      ],
      explanation: {
        Beginner: { en: "Before recommending investments, the advisor builds a complete picture of the client's financial life.", fr: "Avant de recommander des investissements, le conseiller construit une vision complète de la vie financière du client." },
        Intermediate: { en: "Two clients with the same net worth may need very different portfolios if one has stable salary income and the other depends on portfolio withdrawals.", fr: "Deux clients avec le même patrimoine peuvent avoir des portefeuilles très différents si l’un a un salaire stable et l’autre dépend de retraits du portefeuille." },
        Professional: { en: "Professional discovery integrates household balance sheet, income durability, contingent liabilities, tax location, liquidity segmentation and behavioral constraints before investment optimization begins.", fr: "La découverte professionnelle intègre bilan du ménage, durabilité des revenus, passifs contingents, localisation fiscale, segmentation de liquidité et contraintes comportementales avant l’optimisation." },
      },
      formula: {
        label: { en: "Net worth", fr: "Valeur nette" },
        expression: "Net Worth = Total Assets − Total Liabilities",
        explanation: { en: "Useful starting point, but not a substitute for understanding cash-flow and liquidity.", fr: "Point de départ utile, mais ne remplace pas l’analyse des cash flows et de la liquidité." },
      },
      vocabulary: [
        { en: "Net worth", fr: "valeur nette", definition: { en: "Assets minus liabilities.", fr: "Actifs moins passifs." } },
        { en: "Human capital", fr: "capital humain", definition: { en: "Present economic value of future labor income and earning capacity.", fr: "Valeur économique actuelle des revenus futurs du travail et de la capacité à générer des revenus." } },
        { en: "Liquidity need", fr: "besoin de liquidité", definition: { en: "Cash required for planned or uncertain near-term spending.", fr: "Cash nécessaire pour des dépenses proches planifiées ou incertaines." } },
      ],
    },
    {
      id: "risk-profile",
      kicker: { en: "02 · RISK TOLERANCE, CAPACITY & REQUIRED RETURN", fr: "02 · TOLÉRANCE, CAPACITÉ DE RISQUE & RENDEMENT REQUIS" },
      title: { en: "Willingness to take risk is not the same as ability to absorb it", fr: "Vouloir prendre du risque n’est pas la même chose que pouvoir l’absorber" },
      coreFacts: [
        { en: "Risk tolerance is psychological willingness to accept uncertainty and losses.", fr: "La tolérance au risque est la volonté psychologique d’accepter incertitude et pertes." },
        { en: "Risk capacity is the financial ability to withstand losses without jeopardizing goals.", fr: "La capacité de risque est la capacité financière à supporter des pertes sans mettre les objectifs en danger." },
        { en: "Required return is the return needed to fund objectives; it should not be confused with desired return.", fr: "Le rendement requis est celui nécessaire pour financer les objectifs ; il ne faut pas le confondre avec le rendement souhaité." },
        { en: "The portfolio should usually respect the most binding constraint among tolerance, capacity and required return.", fr: "Le portefeuille doit généralement respecter la contrainte la plus forte entre tolérance, capacité et rendement requis." },
      ],
      explanation: {
        Beginner: { en: "A client may say they are comfortable with risk, but if they need the money next year, they may not have the capacity to take much risk.", fr: "Un client peut dire qu’il accepte le risque, mais s’il a besoin de l’argent l’année prochaine, sa capacité à prendre du risque peut être faible." },
        Intermediate: { en: "A retiree with high spending needs may have low capacity even with moderate tolerance. A young high earner with stable income may have high capacity but low tolerance.", fr: "Un retraité avec de fortes dépenses peut avoir une faible capacité malgré une tolérance moyenne. Un jeune à hauts revenus peut avoir forte capacité mais faible tolérance." },
        Professional: { en: "Suitability requires reconciling behavioral preferences with balance-sheet resilience, horizon, funding ratio and loss consequences. Advisors should not mechanically convert a questionnaire score into an equity percentage.", fr: "L’adéquation exige de réconcilier préférences comportementales, résilience du bilan, horizon, funding ratio et conséquences d’une perte. Un questionnaire ne doit pas mécaniquement devenir un pourcentage d’actions." },
      },
      comparison: {
        title: { en: "Three different questions", fr: "Trois questions différentes" },
        headers: [{ en: "Concept", fr: "Concept" }, { en: "Question", fr: "Question" }, { en: "Example", fr: "Exemple" }],
        rows: [
          { cells: [{ en: "Tolerance", fr: "Tolérance" }, { en: "How much loss can you emotionally accept?", fr: "Quelle perte peux-tu accepter psychologiquement ?" }, { en: "Comfort during a 20% drawdown", fr: "Confort pendant un drawdown de 20 %" }] },
          { cells: [{ en: "Capacity", fr: "Capacité" }, { en: "How much loss can your finances absorb?", fr: "Quelle perte tes finances peuvent-elles absorber ?" }, { en: "No need to sell assets for upcoming expenses", fr: "Pas besoin de vendre pour financer des dépenses proches" }] },
          { cells: [{ en: "Required return", fr: "Rendement requis" }, { en: "What return is needed to fund the plan?", fr: "Quel rendement est nécessaire pour financer le plan ?" }, { en: "Return needed to meet retirement goal", fr: "Rendement nécessaire pour l’objectif retraite" }] },
        ],
      },
      vocabulary: [
        { en: "Suitability", fr: "adéquation", definition: { en: "Whether a recommendation fits the client's objectives, constraints and risk profile.", fr: "Caractère approprié d’une recommandation selon objectifs, contraintes et profil de risque." } },
        { en: "Risk capacity", fr: "capacité de risque", definition: { en: "Financial ability to absorb adverse outcomes.", fr: "Capacité financière à absorber des résultats défavorables." } },
        { en: "Required return", fr: "rendement requis", definition: { en: "Return necessary to meet funded goals under chosen assumptions.", fr: "Rendement nécessaire pour atteindre les objectifs selon les hypothèses retenues." } },
      ],
    },
    {
      id: "asset-allocation",
      kicker: { en: "03 · STRATEGIC ASSET ALLOCATION", fr: "03 · ASSET ALLOCATION STRATÉGIQUE" },
      title: { en: "Asset allocation is where client goals become portfolio risk", fr: "L’asset allocation transforme les objectifs clients en risque de portefeuille" },
      coreFacts: [
        { en: "Strategic allocation sets long-term target weights across major asset classes.", fr: "L’allocation stratégique fixe des poids cibles long terme entre grandes classes d’actifs." },
        { en: "Equities generally drive long-term growth, fixed income can stabilize and fund liabilities, and cash provides liquidity.", fr: "Les actions soutiennent généralement la croissance long terme, le fixed income stabilise et finance les passifs, et le cash fournit la liquidité." },
        { en: "Alternatives may diversify specific risks but can add complexity, fees and illiquidity.", fr: "Les alternatives peuvent diversifier certains risques mais ajoutent complexité, frais et illiquidité." },
        { en: "Diversification depends on correlations and economic drivers, not simply the number of holdings.", fr: "La diversification dépend des corrélations et des drivers économiques, pas seulement du nombre de positions." },
      ],
      explanation: {
        Beginner: { en: "The advisor decides how much of the portfolio belongs in growth assets, defensive assets and liquid reserves.", fr: "Le conseiller décide quelle part du portefeuille va aux actifs de croissance, défensifs et aux réserves liquides." },
        Intermediate: { en: "A 70/25/5 equity-bond-cash allocation may fit a long-horizon accumulator but could be inappropriate for a client funding a home purchase in two years.", fr: "Une allocation 70/25/5 actions-obligations-cash peut convenir à un investisseur long terme mais pas à un client achetant un logement dans deux ans." },
        Professional: { en: "Strategic allocation combines expected capital-market returns, covariance, liabilities, taxes, liquidity and behavioral drawdown tolerance. Robust portfolios should not depend on one precise forecast being correct.", fr: "L’allocation stratégique combine rendements attendus, covariance, passifs, fiscalité, liquidité et tolérance comportementale au drawdown. Un portefeuille robuste ne doit pas dépendre d’une seule prévision précise." },
      },
      formula: {
        label: { en: "Portfolio expected return", fr: "Rendement attendu du portefeuille" },
        expression: "E(Rp) = Σ wi × E(Ri)",
        explanation: { en: "Expected portfolio return is the weighted average of expected asset returns.", fr: "Le rendement attendu du portefeuille est la moyenne pondérée des rendements attendus des actifs." },
      },
      vocabulary: [
        { en: "Strategic asset allocation", fr: "allocation stratégique", definition: { en: "Long-term target mix of asset classes.", fr: "Mix cible long terme des classes d’actifs." } },
        { en: "Tactical allocation", fr: "allocation tactique", definition: { en: "Temporary deviation from strategic weights based on shorter-term views.", fr: "Écart temporaire aux poids stratégiques basé sur des vues plus court terme." } },
        { en: "Correlation", fr: "corrélation", definition: { en: "Degree to which asset returns move together.", fr: "Degré auquel les rendements des actifs évoluent ensemble." } },
      ],
    },
    {
      id: "goals-based-planning",
      kicker: { en: "04 · GOALS-BASED PLANNING & CASH-FLOW SEGMENTATION", fr: "04 · PLANIFICATION PAR OBJECTIFS & SEGMENTATION DES CASH FLOWS" },
      title: { en: "Different goals can justify different risk buckets", fr: "Des objectifs différents peuvent justifier des poches de risque différentes" },
      coreFacts: [
        { en: "Short-horizon essential goals generally require more stable and liquid funding than long-horizon discretionary goals.", fr: "Les objectifs essentiels à court horizon exigent généralement un financement plus stable et liquide que les objectifs discrétionnaires long terme." },
        { en: "A goals-based framework can separate liquidity, stability and growth buckets.", fr: "Une approche par objectifs peut séparer des poches de liquidité, stabilité et croissance." },
        { en: "Mental accounting can be useful for communication even though the household balance sheet remains economically integrated.", fr: "La comptabilité mentale peut aider la communication même si le bilan du ménage reste économiquement intégré." },
        { en: "Funding priority matters when goals compete for limited capital.", fr: "La priorité de financement compte lorsque plusieurs objectifs se disputent un capital limité." },
      ],
      explanation: {
        Beginner: { en: "Money needed soon should usually take less risk than money that can stay invested for decades.", fr: "L’argent nécessaire bientôt devrait généralement prendre moins de risque que l’argent pouvant rester investi pendant des décennies." },
        Intermediate: { en: "An advisor may keep two years of planned spending in cash or short bonds while investing long-term retirement capital more aggressively.", fr: "Un conseiller peut conserver deux années de dépenses prévues en cash ou obligations courtes tout en investissant plus dynamiquement le capital retraite long terme." },
        Professional: { en: "Goals-based planning maps liability timing, priority and flexibility to dedicated funding assets while controlling aggregate household risk. The framework is especially useful when clients struggle to interpret portfolio volatility in abstract terms.", fr: "La planification par objectifs relie timing, priorité et flexibilité des passifs à des actifs dédiés tout en contrôlant le risque global du ménage. Elle est utile lorsque les clients interprètent mal la volatilité abstraite." },
      },
      vocabulary: [
        { en: "Funding ratio", fr: "funding ratio", definition: { en: "Assets available for a goal divided by the estimated present value of the goal.", fr: "Actifs disponibles pour un objectif divisés par la valeur actuelle estimée de cet objectif." } },
        { en: "Liability", fr: "passif / engagement", definition: { en: "Future financial obligation or spending need.", fr: "Obligation financière ou besoin de dépense futur." } },
        { en: "Bucket strategy", fr: "stratégie par poches", definition: { en: "Segmentation of assets according to time horizon or goal function.", fr: "Segmentation des actifs selon horizon ou fonction d’objectif." } },
      ],
    },
    {
      id: "retirement-planning",
      kicker: { en: "05 · RETIREMENT, WITHDRAWALS & SEQUENCE RISK", fr: "05 · RETRAITE, RETRAITS & SEQUENCE RISK" },
      title: { en: "Retirement planning is a cash-flow problem under uncertainty", fr: "La retraite est un problème de cash flow sous incertitude" },
      coreFacts: [
        { en: "Retirement sustainability depends on starting wealth, spending, inflation, returns, horizon and taxes.", fr: "La soutenabilité de la retraite dépend du patrimoine initial, des dépenses, de l’inflation, des rendements, de l’horizon et de la fiscalité." },
        { en: "Sequence-of-returns risk means early losses can be especially damaging when withdrawals are occurring.", fr: "Le sequence-of-returns risk signifie que des pertes précoces peuvent être particulièrement dommageables lorsque des retraits ont lieu." },
        { en: "A withdrawal rate is not a universal safe constant; it depends on assumptions and flexibility.", fr: "Un taux de retrait n’est pas une constante universellement sûre ; il dépend des hypothèses et de la flexibilité." },
        { en: "Dynamic spending rules can improve resilience compared with rigid inflation-adjusted withdrawals.", fr: "Des règles de dépense dynamiques peuvent améliorer la résilience par rapport à des retraits rigides indexés sur l’inflation." },
      ],
      explanation: {
        Beginner: { en: "Retirement planning asks whether the portfolio can keep paying the client's expenses for a long time without running out.", fr: "La planification retraite demande si le portefeuille peut continuer à payer les dépenses du client longtemps sans s’épuiser." },
        Intermediate: { en: "Two retirees can earn the same average return but have different outcomes if one suffers a large market decline in the first years while making withdrawals.", fr: "Deux retraités peuvent avoir le même rendement moyen mais des résultats différents si l’un subit une forte baisse au début tout en retirant de l’argent." },
        Professional: { en: "Retirement analysis should be scenario-based rather than point-estimate based, incorporating inflation regimes, longevity, tax drag, spending flexibility, annuitized income, healthcare costs and sequence risk.", fr: "L’analyse retraite doit être fondée sur des scénarios, intégrant régimes d’inflation, longévité, fiscalité, flexibilité des dépenses, revenus viagers, santé et sequence risk." },
      },
      formula: {
        label: { en: "Simple initial withdrawal rate", fr: "Taux de retrait initial simple" },
        expression: "Initial Withdrawal Rate = First-Year Portfolio Withdrawal / Starting Portfolio Value",
        explanation: { en: "A descriptive measure, not a guarantee of sustainability.", fr: "Une mesure descriptive, pas une garantie de soutenabilité." },
      },
      vocabulary: [
        { en: "Sequence risk", fr: "sequence risk", definition: { en: "Risk that poor returns early in withdrawal years cause disproportionate long-term damage.", fr: "Risque que de mauvais rendements au début des retraits causent des dommages disproportionnés à long terme." } },
        { en: "Withdrawal rate", fr: "taux de retrait", definition: { en: "Portfolio withdrawal divided by portfolio value.", fr: "Retrait du portefeuille divisé par la valeur du portefeuille." } },
        { en: "Longevity risk", fr: "risque de longévité", definition: { en: "Risk of living longer than the assets can sustainably support.", fr: "Risque de vivre plus longtemps que ce que les actifs peuvent financer durablement." } },
      ],
    },
    {
      id: "tax-aware-investing",
      kicker: { en: "06 · TAX-AWARE INVESTING & ASSET LOCATION", fr: "06 · INVESTISSEMENT FISCAL & ASSET LOCATION" },
      title: { en: "After-tax wealth matters more than pre-tax performance", fr: "La richesse après impôts compte plus que la performance avant impôts" },
      coreFacts: [
        { en: "Taxes can materially change the ranking of investment strategies for a taxable client.", fr: "La fiscalité peut modifier fortement le classement des stratégies pour un client imposable." },
        { en: "Asset location asks which investments belong in taxable, tax-deferred or tax-advantaged accounts where applicable.", fr: "L’asset location demande quels investissements placer dans des comptes imposables, différés ou fiscalement avantageux lorsque disponibles." },
        { en: "Turnover, income distributions and realization timing can create tax drag.", fr: "Turnover, distributions de revenus et timing de réalisation peuvent créer du tax drag." },
        { en: "Tax-loss harvesting can create value but should not override portfolio construction or legal rules.", fr: "Le tax-loss harvesting peut créer de la valeur mais ne doit pas remplacer la construction de portefeuille ni ignorer les règles juridiques." },
      ],
      explanation: {
        Beginner: { en: "A portfolio that earns a little less before tax can still leave the client with more money after tax.", fr: "Un portefeuille qui gagne un peu moins avant impôts peut laisser plus d’argent au client après impôts." },
        Intermediate: { en: "A high-turnover strategy may create frequent taxable gains, while a tax-efficient ETF structure may defer realization and improve compounding for some clients.", fr: "Une stratégie à fort turnover peut créer des gains imposables fréquents, tandis qu’une structure ETF fiscalement efficace peut différer la réalisation et améliorer la capitalisation pour certains clients." },
        Professional: { en: "Tax-aware portfolio construction treats tax basis, holding period, account type, embedded gains and charitable or estate objectives as state variables. The relevant objective is often after-tax expected utility, not gross alpha.", fr: "La construction fiscale traite tax basis, durée de détention, type de compte, plus-values latentes et objectifs philanthropiques ou successoraux comme variables d’état. L’objectif pertinent est souvent l’utilité après impôts, pas l’alpha brut." },
      },
      vocabulary: [
        { en: "Asset location", fr: "asset location", definition: { en: "Placement of assets across account types to improve after-tax outcomes.", fr: "Placement des actifs entre types de comptes pour améliorer le résultat après impôts." } },
        { en: "Tax drag", fr: "tax drag", definition: { en: "Reduction in compounding caused by taxes.", fr: "Réduction de la capitalisation causée par les impôts." } },
        { en: "Tax-loss harvesting", fr: "tax-loss harvesting", definition: { en: "Realizing losses to offset taxable gains, subject to applicable rules.", fr: "Réalisation de pertes pour compenser des gains imposables, selon les règles applicables." } },
      ],
    },
    {
      id: "protection-estate",
      kicker: { en: "07 · INSURANCE, ESTATE & INTERGENERATIONAL PLANNING", fr: "07 · ASSURANCE, SUCCESSION & PLANIFICATION INTERGÉNÉRATIONNELLE" },
      title: { en: "Protecting the plan can matter as much as maximizing return", fr: "Protéger le plan peut compter autant que maximiser le rendement" },
      coreFacts: [
        { en: "Insurance transfers selected risks that a household may not be able to absorb efficiently.", fr: "L’assurance transfère certains risques qu’un ménage ne peut pas absorber efficacement." },
        { en: "Estate planning coordinates ownership, beneficiaries, liquidity and transfer intentions.", fr: "La planification successorale coordonne propriété, bénéficiaires, liquidité et intentions de transmission." },
        { en: "Concentrated family wealth can create governance, diversification and succession challenges.", fr: "Un patrimoine familial concentré peut créer des défis de gouvernance, diversification et succession." },
        { en: "Wealth managers coordinate with tax, legal and insurance specialists rather than replacing them.", fr: "Les wealth managers coordonnent avec spécialistes fiscaux, juridiques et assurance plutôt que de les remplacer." },
      ],
      explanation: {
        Beginner: { en: "A financial plan should consider what happens if the client dies, becomes disabled or needs to transfer assets to family.", fr: "Un plan financier doit considérer ce qui se passe si le client décède, devient invalide ou souhaite transmettre ses actifs." },
        Intermediate: { en: "A family may be wealthy on paper but still need liquidity planning if most wealth is tied up in a business or property and taxes or distributions are due at transfer.", fr: "Une famille peut être riche sur le papier mais avoir besoin de liquidité si le patrimoine est concentré dans une entreprise ou de l’immobilier et que des paiements sont dus lors de la transmission." },
        Professional: { en: "Intergenerational planning integrates control, liquidity, tax exposure, beneficiary readiness, governance and concentration risk. The advisor's role is often orchestration across specialists and generations.", fr: "La planification intergénérationnelle intègre contrôle, liquidité, exposition fiscale, préparation des bénéficiaires, gouvernance et concentration. Le conseiller orchestre souvent spécialistes et générations." },
      },
      vocabulary: [
        { en: "Beneficiary", fr: "bénéficiaire", definition: { en: "Person or entity designated to receive assets or benefits.", fr: "Personne ou entité désignée pour recevoir des actifs ou prestations." } },
        { en: "Estate liquidity", fr: "liquidité successorale", definition: { en: "Cash available to meet obligations during wealth transfer.", fr: "Cash disponible pour financer les obligations lors de la transmission." } },
        { en: "Intergenerational planning", fr: "planification intergénérationnelle", definition: { en: "Planning for transfer, governance and stewardship of wealth across generations.", fr: "Planification de la transmission, gouvernance et gestion du patrimoine entre générations." } },
      ],
    },
    {
      id: "concentrated-wealth",
      kicker: { en: "08 · CONCENTRATED STOCK & BUSINESS OWNER WEALTH", fr: "08 · PATRIMOINE CONCENTRÉ & ENTREPRENEURS" },
      title: { en: "The source of wealth can also be the largest source of risk", fr: "La source de richesse peut aussi être la plus grande source de risque" },
      coreFacts: [
        { en: "Executives and founders may have a large share of net worth linked to one company.", fr: "Dirigeants et fondateurs peuvent avoir une grande part de leur patrimoine liée à une seule entreprise." },
        { en: "Concentration risk can be amplified when employment income and portfolio wealth depend on the same business.", fr: "Le risque de concentration augmente lorsque revenu professionnel et patrimoine dépendent de la même entreprise." },
        { en: "Diversification may be constrained by taxes, lockups, insider rules, emotional attachment or control objectives.", fr: "La diversification peut être contrainte par fiscalité, lockups, règles d’initié, attachement émotionnel ou objectifs de contrôle." },
        { en: "A staged diversification plan can balance risk reduction with taxes and client priorities.", fr: "Un plan de diversification progressif peut équilibrer réduction du risque, fiscalité et priorités client." },
      ],
      explanation: {
        Beginner: { en: "If most of someone's wealth and salary come from one company, bad news about that company can hurt both at the same time.", fr: "Si la majorité du patrimoine et du salaire viennent de la même entreprise, une mauvaise nouvelle peut toucher les deux en même temps." },
        Intermediate: { en: "A founder with 80% of net worth in company stock may diversify gradually because selling everything immediately could create a large tax bill and conflict with control or signaling concerns.", fr: "Un fondateur avec 80 % du patrimoine en actions de son entreprise peut diversifier progressivement car tout vendre immédiatement peut créer une forte fiscalité et des problèmes de contrôle ou de signal." },
        Professional: { en: "Concentrated-wealth planning models after-tax diversification paths, downside tolerance, correlation with human capital, liquidity windows, legal restrictions and hedging alternatives where appropriate.", fr: "La planification du patrimoine concentré modélise trajectoires de diversification après impôts, tolérance au downside, corrélation avec capital humain, fenêtres de liquidité, restrictions juridiques et alternatives de hedge lorsque pertinentes." },
      },
      vocabulary: [
        { en: "Concentration risk", fr: "risque de concentration", definition: { en: "Excess dependence on one issuer, asset or economic source.", fr: "Dépendance excessive à un émetteur, actif ou source économique." } },
        { en: "Lockup", fr: "lockup", definition: { en: "Restriction preventing sale of an asset for a period.", fr: "Restriction empêchant la vente d’un actif pendant une période." } },
        { en: "Diversification path", fr: "trajectoire de diversification", definition: { en: "Planned sequence for reducing concentration over time.", fr: "Séquence planifiée pour réduire progressivement la concentration." } },
      ],
    },
    {
      id: "behavior-communication",
      kicker: { en: "09 · BEHAVIORAL COACHING & CLIENT COMMUNICATION", fr: "09 · COACHING COMPORTEMENTAL & COMMUNICATION CLIENT" },
      title: { en: "The best plan fails if the client cannot stay with it", fr: "Le meilleur plan échoue si le client ne peut pas le suivre" },
      coreFacts: [
        { en: "Loss aversion, recency bias, overconfidence and anchoring can distort financial decisions.", fr: "Aversion aux pertes, biais de récence, excès de confiance et anchoring peuvent fausser les décisions." },
        { en: "Client communication should separate market volatility from changes in long-term goals or assumptions.", fr: "La communication doit distinguer volatilité de marché et changements réels des objectifs ou hypothèses long terme." },
        { en: "A written policy and predefined rebalancing rules can reduce emotional decision-making.", fr: "Une politique écrite et des règles de rebalancing prédéfinies peuvent réduire les décisions émotionnelles." },
        { en: "Advisory value includes helping clients avoid destructive timing behavior.", fr: "La valeur du conseil inclut l’aide à éviter des décisions de timing destructrices." },
      ],
      explanation: {
        Beginner: { en: "A client who sells after every market fall may never earn the long-term return their portfolio was designed to deliver.", fr: "Un client qui vend après chaque baisse peut ne jamais obtenir le rendement long terme prévu par son portefeuille." },
        Intermediate: { en: "During a drawdown, an advisor should revisit the plan, liquidity buffer and assumptions before changing strategy simply because prices fell.", fr: "Pendant un drawdown, le conseiller doit revoir plan, réserve de liquidité et hypothèses avant de changer de stratégie simplement parce que les prix ont baissé." },
        Professional: { en: "Behavioral coaching is a risk-management function. Communication should frame probabilities, scenario ranges, decision rules and goal progress rather than encourage false precision or market-timing confidence.", fr: "Le coaching comportemental est une fonction de gestion du risque. La communication doit cadrer probabilités, scénarios, règles de décision et progrès vers les objectifs plutôt que renforcer une fausse précision." },
      },
      vocabulary: [
        { en: "Loss aversion", fr: "aversion aux pertes", definition: { en: "Tendency to feel losses more strongly than equivalent gains.", fr: "Tendance à ressentir les pertes plus fortement que des gains équivalents." } },
        { en: "Recency bias", fr: "biais de récence", definition: { en: "Overweighting recent events when forming expectations.", fr: "Tendance à surpondérer les événements récents dans les anticipations." } },
        { en: "Behavior gap", fr: "behavior gap", definition: { en: "Difference between investment returns and returns actually captured because of investor behavior.", fr: "Écart entre rendement des investissements et rendement réellement capté à cause du comportement de l’investisseur." } },
      ],
    },
    {
      id: "wealth-interviews",
      kicker: { en: "10 · WEALTH MANAGEMENT INTERVIEWS & CLIENT CASES", fr: "10 · ENTRETIENS WEALTH MANAGEMENT & CAS CLIENTS" },
      title: { en: "Strong candidates combine finance with judgment, empathy and communication", fr: "Les bons candidats combinent finance, jugement, empathie et communication" },
      coreFacts: [
        { en: "Wealth-management interviews test suitability logic, portfolio knowledge and communication skills.", fr: "Les entretiens wealth management testent logique d’adéquation, connaissances portefeuille et communication." },
        { en: "Client cases often require asking questions before giving a recommendation.", fr: "Les cas clients exigent souvent de poser des questions avant de recommander." },
        { en: "A strong answer connects goals, risk capacity, liquidity, taxes and portfolio design.", fr: "Une bonne réponse relie objectifs, capacité de risque, liquidité, fiscalité et design du portefeuille." },
        { en: "Technical knowledge matters, but trust and clarity are central to the role.", fr: "La technique compte, mais confiance et clarté sont centrales dans le métier." },
      ],
      explanation: {
        Beginner: { en: "Do not jump straight to 'buy stocks.' First learn what the client needs, when they need it and how much risk they can handle.", fr: "Ne saute pas directement à « acheter des actions ». Comprends d’abord ce dont le client a besoin, quand et quel risque il peut supporter." },
        Intermediate: { en: "A good case answer follows: clarify goals → map balance sheet → assess risk → protect liquidity → build allocation → discuss taxes and estate issues → explain monitoring.", fr: "Une bonne réponse suit : clarifier objectifs → cartographier le bilan → évaluer risque → protéger liquidité → construire allocation → discuter fiscalité/transmission → expliquer le suivi." },
        Professional: { en: "The strongest candidates recognize trade-offs rather than pretending there is one optimal portfolio. They explain why each recommendation exists, what could change it and how they would communicate uncertainty to the client.", fr: "Les meilleurs candidats reconnaissent les arbitrages plutôt que prétendre qu’il existe un portefeuille optimal unique. Ils expliquent pourquoi chaque recommandation existe, ce qui pourrait la changer et comment communiquer l’incertitude." },
      },
      comparison: {
        title: { en: "A strong client-case framework", fr: "Un bon framework de cas client" },
        headers: [{ en: "Step", fr: "Étape" }, { en: "Question", fr: "Question" }],
        rows: [
          { cells: [{ en: "1. Discover", fr: "1. Découvrir" }, { en: "What are the goals, family needs and time horizons?", fr: "Quels sont les objectifs, besoins familiaux et horizons ?" }] },
          { cells: [{ en: "2. Diagnose", fr: "2. Diagnostiquer" }, { en: "What are cash flows, liquidity, debt and tax constraints?", fr: "Quels sont cash flows, liquidité, dette et contraintes fiscales ?" }] },
          { cells: [{ en: "3. Design", fr: "3. Concevoir" }, { en: "What allocation and protection strategy fits?", fr: "Quelle allocation et stratégie de protection convient ?" }] },
          { cells: [{ en: "4. Explain", fr: "4. Expliquer" }, { en: "How do we communicate risk, trade-offs and next steps?", fr: "Comment communiquer risque, arbitrages et prochaines étapes ?" }] },
        ],
      },
      vocabulary: [
        { en: "Client discovery", fr: "découverte client", definition: { en: "Structured process of understanding the client's financial and personal context.", fr: "Processus structuré de compréhension du contexte financier et personnel du client." } },
        { en: "Holistic planning", fr: "planification globale", definition: { en: "Advice integrating investments with cash flow, tax, protection and estate considerations.", fr: "Conseil intégrant investissements, cash flow, fiscalité, protection et transmission." } },
      ],
    },
  ],
  quiz: [
    {
      id: "q1", conceptKey: "net-worth",
      question: { en: "What is net worth?", fr: "Qu’est-ce que la valeur nette ?" },
      options: [
        { id: "a", label: { en: "Assets minus liabilities", fr: "Actifs moins passifs" } },
        { id: "b", label: { en: "Income minus taxes only", fr: "Revenus moins impôts uniquement" } },
        { id: "c", label: { en: "Portfolio return plus salary", fr: "Rendement du portefeuille plus salaire" } },
        { id: "d", label: { en: "Cash only", fr: "Cash uniquement" } },
      ], correctOption: "a",
      explanation: { en: "Net worth equals total assets less total liabilities.", fr: "La valeur nette correspond aux actifs totaux moins les passifs totaux." },
    },
    {
      id: "q2", conceptKey: "risk-capacity",
      question: { en: "What best describes risk capacity?", fr: "Que décrit le mieux la capacité de risque ?" },
      options: [
        { id: "a", label: { en: "Financial ability to absorb losses", fr: "Capacité financière à absorber des pertes" } },
        { id: "b", label: { en: "Emotional desire for high returns", fr: "Désir émotionnel de rendements élevés" } },
        { id: "c", label: { en: "Number of stocks owned", fr: "Nombre d’actions détenues" } },
        { id: "d", label: { en: "Current benchmark level", fr: "Niveau actuel du benchmark" } },
      ], correctOption: "a",
      explanation: { en: "Capacity is about financial resilience, not simply willingness.", fr: "La capacité concerne la résilience financière, pas seulement la volonté." },
    },
    {
      id: "q3", conceptKey: "asset-allocation",
      question: { en: "What is strategic asset allocation?", fr: "Qu’est-ce que l’asset allocation stratégique ?" },
      options: [
        { id: "a", label: { en: "Long-term target mix across asset classes", fr: "Mix cible long terme entre classes d’actifs" } },
        { id: "b", label: { en: "Daily market timing", fr: "Timing quotidien du marché" } },
        { id: "c", label: { en: "Choosing one stock only", fr: "Choisir une seule action" } },
        { id: "d", label: { en: "Ignoring liquidity", fr: "Ignorer la liquidité" } },
      ], correctOption: "a",
      explanation: { en: "Strategic allocation sets the long-term portfolio structure.", fr: "L’allocation stratégique fixe la structure long terme du portefeuille." },
    },
    {
      id: "q4", conceptKey: "sequence-risk",
      question: { en: "Why is sequence risk important in retirement?", fr: "Pourquoi le sequence risk est-il important à la retraite ?" },
      options: [
        { id: "a", label: { en: "Early losses combined with withdrawals can permanently reduce portfolio sustainability", fr: "Des pertes précoces avec retraits peuvent réduire durablement la soutenabilité" } },
        { id: "b", label: { en: "Average return becomes irrelevant", fr: "Le rendement moyen devient inutile" } },
        { id: "c", label: { en: "Inflation disappears", fr: "L’inflation disparaît" } },
        { id: "d", label: { en: "Retirees cannot hold bonds", fr: "Les retraités ne peuvent pas détenir d’obligations" } },
      ], correctOption: "a",
      explanation: { en: "Withdrawals force assets out of the portfolio when depressed prices may otherwise have recovered.", fr: "Les retraits sortent des actifs du portefeuille à des prix bas qui auraient autrement pu se redresser." },
    },
    {
      id: "q5", conceptKey: "tax",
      question: { en: "Why can after-tax return matter more than gross return?", fr: "Pourquoi le rendement après impôts peut-il compter davantage que le rendement brut ?" },
      options: [
        { id: "a", label: { en: "Because taxes affect what the client actually keeps and compounds", fr: "Parce que les impôts affectent ce que le client conserve et capitalise" } },
        { id: "b", label: { en: "Because gross return is always zero", fr: "Parce que le rendement brut est toujours nul" } },
        { id: "c", label: { en: "Because taxes eliminate market risk", fr: "Parce que les impôts éliminent le risque de marché" } },
        { id: "d", label: { en: "Because fees are illegal", fr: "Parce que les frais sont illégaux" } },
      ], correctOption: "a",
      explanation: { en: "Wealth compounds on the amount remaining after taxes and costs.", fr: "Le patrimoine capitalise sur le montant restant après impôts et coûts." },
    },
    {
      id: "q6", conceptKey: "concentration",
      question: { en: "Why can founder wealth be unusually concentrated?", fr: "Pourquoi le patrimoine d’un fondateur peut-il être particulièrement concentré ?" },
      options: [
        { id: "a", label: { en: "Both employment income and net worth can depend on the same company", fr: "Le revenu professionnel et le patrimoine peuvent dépendre de la même entreprise" } },
        { id: "b", label: { en: "Founders cannot own diversified assets", fr: "Les fondateurs ne peuvent pas posséder d’actifs diversifiés" } },
        { id: "c", label: { en: "Private companies have no risk", fr: "Les entreprises privées n’ont aucun risque" } },
        { id: "d", label: { en: "Taxes always force immediate sale", fr: "Les impôts forcent toujours une vente immédiate" } },
      ], correctOption: "a",
      explanation: { en: "Company-specific risk can affect both career income and investment wealth simultaneously.", fr: "Le risque spécifique de l’entreprise peut toucher simultanément revenus professionnels et patrimoine." },
    },
    {
      id: "q7", conceptKey: "estate",
      question: { en: "What is estate liquidity?", fr: "Qu’est-ce que la liquidité successorale ?" },
      options: [
        { id: "a", label: { en: "Cash available to meet obligations during wealth transfer", fr: "Cash disponible pour financer les obligations lors de la transmission" } },
        { id: "b", label: { en: "The stock market closing price", fr: "Le cours de clôture du marché" } },
        { id: "c", label: { en: "A portfolio benchmark", fr: "Un benchmark de portefeuille" } },
        { id: "d", label: { en: "A salary bonus", fr: "Un bonus salarial" } },
      ], correctOption: "a",
      explanation: { en: "Transfers can create expenses or taxes even when family wealth is tied up in illiquid assets.", fr: "Une transmission peut créer des dépenses ou impôts même lorsque le patrimoine est immobilisé dans des actifs illiquides." },
    },
    {
      id: "q8", conceptKey: "behavior",
      question: { en: "What is recency bias?", fr: "Qu’est-ce que le biais de récence ?" },
      options: [
        { id: "a", label: { en: "Giving too much weight to recent events when forming expectations", fr: "Donner trop de poids aux événements récents dans les anticipations" } },
        { id: "b", label: { en: "Diversifying globally", fr: "Diversifier mondialement" } },
        { id: "c", label: { en: "Reducing fees", fr: "Réduire les frais" } },
        { id: "d", label: { en: "Matching assets to liabilities", fr: "Faire correspondre actifs et passifs" } },
      ], correctOption: "a",
      explanation: { en: "Recent performance can dominate judgment even when long-term evidence points elsewhere.", fr: "La performance récente peut dominer le jugement même lorsque les preuves long terme indiquent autre chose." },
    },
    {
      id: "q9", conceptKey: "goals",
      question: { en: "Why might short-term essential goals use lower-risk assets?", fr: "Pourquoi des objectifs essentiels court terme peuvent-ils utiliser des actifs moins risqués ?" },
      options: [
        { id: "a", label: { en: "Because there may not be enough time to recover from a market decline before the money is needed", fr: "Parce qu’il peut ne pas y avoir assez de temps pour récupérer d’une baisse avant le besoin d’argent" } },
        { id: "b", label: { en: "Because low-risk assets always outperform", fr: "Parce que les actifs peu risqués surperforment toujours" } },
        { id: "c", label: { en: "Because long-term investing is illegal", fr: "Parce que l’investissement long terme est illégal" } },
        { id: "d", label: { en: "Because inflation never matters", fr: "Parce que l’inflation ne compte jamais" } },
      ], correctOption: "a",
      explanation: { en: "Time horizon determines how much recovery time is available after losses.", fr: "L’horizon détermine le temps disponible pour récupérer après des pertes." },
    },
    {
      id: "q10", conceptKey: "client-case",
      question: { en: "What should come before a portfolio recommendation in a wealth-management client case?", fr: "Que faut-il faire avant une recommandation de portefeuille dans un cas client wealth management ?" },
      options: [
        { id: "a", label: { en: "Clarify goals, balance sheet, liquidity, risk and constraints", fr: "Clarifier objectifs, bilan, liquidité, risque et contraintes" } },
        { id: "b", label: { en: "Pick the hottest stock", fr: "Choisir l’action la plus populaire" } },
        { id: "c", label: { en: "Assume all clients want maximum return", fr: "Supposer que tous les clients veulent le rendement maximal" } },
        { id: "d", label: { en: "Ignore taxes and family needs", fr: "Ignorer fiscalité et besoins familiaux" } },
      ], correctOption: "a",
      explanation: { en: "A recommendation is only meaningful after the client's objectives and constraints are understood.", fr: "Une recommandation n’a de sens qu’après compréhension des objectifs et contraintes du client." },
    },
  ],
  interviewPrompt: {
    question: {
      en: "A 58-year-old client plans to retire in seven years, has $3 million invested, $500,000 in cash, a concentrated $1.5 million position in employer stock, and expects to spend $150,000 per year in retirement. Walk me through how you would approach the client before making a recommendation.",
      fr: "Un client de 58 ans prévoit de partir à la retraite dans sept ans, possède 3 M$ investis, 500 000 $ de cash, une position concentrée de 1,5 M$ dans l’action de son employeur et prévoit 150 000 $ de dépenses annuelles à la retraite. Explique comment tu aborderais le client avant de faire une recommandation.",
    },
    framework: [
      { en: "Clarify goals, retirement timing, spending flexibility, family needs and legacy objectives.", fr: "Clarifie objectifs, timing de retraite, flexibilité des dépenses, besoins familiaux et transmission." },
      { en: "Map assets, liabilities, income, tax basis, account types and emergency liquidity.", fr: "Cartographie actifs, passifs, revenus, tax basis, types de comptes et liquidité de secours." },
      { en: "Separate risk tolerance from risk capacity and estimate the return actually required by the plan.", fr: "Sépare tolérance et capacité de risque et estime le rendement réellement requis par le plan." },
      { en: "Analyze the employer-stock concentration and design a staged after-tax diversification path subject to legal restrictions.", fr: "Analyse la concentration en actions employeur et conçois une diversification progressive après impôts selon les restrictions juridiques." },
      { en: "Build liquidity, stability and growth allocations that reflect the seven-year transition into retirement.", fr: "Construis des poches de liquidité, stabilité et croissance adaptées aux sept années avant la retraite." },
      { en: "Stress-test retirement spending, inflation, market drawdowns and sequence risk, then explain the monitoring plan.", fr: "Stress-test dépenses retraite, inflation, drawdowns et sequence risk, puis explique le suivi." },
    ],
    sample: {
      en: "I would not start by recommending a percentage in equities. I would first clarify whether the $150,000 spending target is before or after tax, how flexible it is, what other income sources will exist in retirement and whether there are estate or family goals. I would then map the household balance sheet, tax basis and account structure. The employer stock is a major issue because both current income and a large part of wealth depend on the same company, so I would quantify the downside and evaluate a staged diversification plan rather than assume an immediate sale. Because retirement is seven years away, I would also separate near-term liquidity from long-term growth capital and stress-test the plan for inflation and an early retirement drawdown. Only after estimating the required return and risk capacity would I recommend a strategic allocation. I would explain the trade-offs clearly, document rebalancing and review rules, and revisit the plan as retirement gets closer.",
      fr: "Je ne commencerais pas par recommander un pourcentage d’actions. Je clarifierais d’abord si les 150 000 $ de dépenses sont avant ou après impôts, leur flexibilité, les autres sources de revenus à la retraite et les éventuels objectifs familiaux ou successoraux. Je cartographierais ensuite le bilan du ménage, le tax basis et la structure des comptes. L’action employeur est un sujet majeur car le revenu actuel et une grande partie du patrimoine dépendent de la même entreprise ; je quantifierais donc le downside et étudierais une diversification progressive plutôt qu’une vente immédiate par défaut. Comme la retraite est dans sept ans, je séparerais aussi la liquidité proche du capital de croissance long terme et je stress-testerais inflation et drawdown au début de la retraite. Ce n’est qu’après estimation du rendement requis et de la capacité de risque que je proposerais une allocation stratégique. J’expliquerais clairement les arbitrages, formaliserais les règles de rebalancing et de suivi, puis mettrais à jour le plan à mesure que la retraite approche.",
    },
  },
};
