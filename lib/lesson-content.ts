export type TeachingMode = "Beginner" | "Intermediate" | "Professional";

export type LocalizedText = {
  en: string;
  fr: string;
};

export type VocabularyItem = {
  en: string;
  fr: string;
  definition: LocalizedText;
};

export type LessonFormula = {
  label: LocalizedText;
  expression: string;
  explanation: LocalizedText;
  workedExample?: LocalizedText;
};

export type LessonComparison = {
  title: LocalizedText;
  headers: LocalizedText[];
  rows: { cells: LocalizedText[] }[];
};

export type LessonSection = {
  id: string;
  title: LocalizedText;
  kicker: LocalizedText;
  coreFacts: LocalizedText[];
  explanation: Record<TeachingMode, LocalizedText>;
  example?: LocalizedText;
  formula?: LessonFormula;
  comparison?: LessonComparison;
  marketConnection?: LocalizedText;
  vocabulary?: VocabularyItem[];
};

export type QuizQuestion = {
  id: string;
  conceptKey: string;
  question: LocalizedText;
  options: { id: string; label: LocalizedText }[];
  correctOption: string;
  explanation: LocalizedText;
};

export type FinanceLesson = {
  slug: string;
  year: LocalizedText;
  domain: LocalizedText;
  title: LocalizedText;
  subtitle: LocalizedText;
  duration: LocalizedText;
  prerequisites: LocalizedText[];
  objectives: LocalizedText[];
  overviewFlow?: {
    title: LocalizedText;
    steps: { title: LocalizedText; detail: LocalizedText }[];
  };
  sections: LessonSection[];
  quiz: QuizQuestion[];
  interviewPrompt: {
    question: LocalizedText;
    framework: LocalizedText[];
    sample: LocalizedText;
  };
};

export const financialSystemLesson: FinanceLesson = {
  slug: "year-1-financial-system-market-structure",
  year: { en: "Year 1 · Foundations", fr: "Année 1 · Fondations" },
  domain: { en: "Markets & Instruments", fr: "Marchés & instruments / Markets & Instruments" },
  title: {
    en: "Financial System & Market Structure",
    fr: "Système financier & structure de marché / Financial System & Market Structure",
  },
  subtitle: {
    en: "Understand how money moves from savers to borrowers, how securities are issued and traded, and which institutions make modern markets function.",
    fr: "Comprendre comment l’argent circule des épargnants vers les emprunteurs, comment les titres sont émis puis échangés, et quelles institutions font fonctionner les marchés modernes.",
  },
  duration: { en: "45–60 min", fr: "45–60 min" },
  prerequisites: [
    { en: "No finance prerequisite", fr: "Aucun prérequis en finance" },
    { en: "Basic percentages are helpful", fr: "Les pourcentages de base sont utiles" },
  ],
  objectives: [
    {
      en: "Explain the economic purpose of the financial system and why capital markets exist.",
      fr: "Expliquer le rôle économique du système financier et pourquoi les marchés de capitaux / capital markets existent.",
    },
    {
      en: "Distinguish primary from secondary markets and exchanges from OTC markets.",
      fr: "Distinguer marché primaire / primary market et marché secondaire / secondary market, ainsi que bourse / exchange et marché de gré à gré / OTC.",
    },
    {
      en: "Identify the roles of investors, issuers, banks, brokers, dealers, market makers, clearing houses and custodians.",
      fr: "Identifier le rôle des investisseurs, émetteurs, banques, courtiers / brokers, dealers, teneurs de marché / market makers, chambres de compensation / clearing houses et dépositaires / custodians.",
    },
    {
      en: "Read a basic bid-ask quote and connect spreads, liquidity and market depth.",
      fr: "Lire une cotation acheteur-vendeur / bid-ask et relier spread, liquidité / liquidity et profondeur de marché / market depth.",
    },
    {
      en: "Describe what happens between trade execution and final settlement.",
      fr: "Décrire ce qui se passe entre l’exécution d’une transaction / trade execution et son règlement-livraison / settlement.",
    },
  ],
  overviewFlow: {
    title: { en: "How capital moves through the financial system", fr: "Comment le capital circule dans le système financier" },
    steps: [
      {
        title: { en: "Savers & investors", fr: "Épargnants & investisseurs" },
        detail: { en: "Households · funds · institutions", fr: "Ménages · fonds · institutions" },
      },
      {
        title: { en: "Banks & capital markets", fr: "Banques & marchés de capitaux" },
        detail: { en: "Loans · stocks · bonds · funds", fr: "Prêts · actions · obligations · fonds" },
      },
      {
        title: { en: "Users of capital", fr: "Utilisateurs du capital" },
        detail: { en: "Companies · governments · households", fr: "Entreprises · États · ménages" },
      },
    ],
  },
  sections: [
    {
      id: "purpose",
      kicker: { en: "01 · THE BIG PICTURE", fr: "01 · VUE D’ENSEMBLE" },
      title: { en: "Why a financial system exists", fr: "Pourquoi un système financier existe" },
      coreFacts: [
        {
          en: "Some economic agents have surplus cash while others need funding. Finance connects the two.",
          fr: "Certains agents économiques disposent d’un excédent de trésorerie alors que d’autres ont besoin de financement. La finance relie les deux.",
        },
        {
          en: "Capital can flow directly through securities markets or indirectly through financial intermediaries such as banks and funds.",
          fr: "Le capital peut circuler directement via les marchés de titres / securities markets ou indirectement via des intermédiaires financiers comme les banques et les fonds.",
        },
        {
          en: "The system performs four core functions: funding, payments, risk transfer and price discovery.",
          fr: "Le système remplit quatre fonctions centrales : financement / funding, paiements / payments, transfert de risque / risk transfer et découverte des prix / price discovery.",
        },
        {
          en: "A market price is not simply a fact about value; it is the clearing result of supply, demand, expectations, information, liquidity and constraints.",
          fr: "Un prix de marché n’est pas une vérité absolue sur la valeur : il résulte de la rencontre entre offre, demande, anticipations, information, liquidité et contraintes.",
        },
      ],
      explanation: {
        Beginner: {
          en: "Imagine a company wants to build a factory but does not have enough cash today. At the same time, households, pension funds and other investors have savings they want to put to work. The financial system creates the channels that allow those savings to fund productive activity. In return, investors receive a financial claim such as a bond or a share.",
          fr: "Imagine une entreprise qui veut construire une usine mais qui n’a pas assez de trésorerie aujourd’hui. En parallèle, des ménages, fonds de pension et autres investisseurs possèdent de l’épargne qu’ils souhaitent faire travailler. Le système financier crée les canaux permettant à cette épargne de financer l’activité productive. En échange, les investisseurs reçoivent un titre financier / financial claim, par exemple une obligation / bond ou une action / share.",
        },
        Intermediate: {
          en: "The financial system channels savings toward investment, enables payment and settlement, creates instruments for transferring risk and generates observable prices through trading. It can operate through balance-sheet intermediation, such as bank lending, or market-based finance, such as issuing bonds and equity.",
          fr: "Le système financier canalise l’épargne vers l’investissement, permet les paiements et le règlement-livraison / settlement, crée des instruments de transfert de risque et fait émerger des prix observables par le trading. Il fonctionne soit par intermédiation de bilan / balance-sheet intermediation, par exemple un prêt bancaire, soit par financement de marché / market-based finance, par exemple une émission d’obligations ou d’actions.",
        },
        Professional: {
          en: "Modern finance is a network for allocating capital, transforming maturities and liquidity, transferring risk and discovering prices. The architecture spans bank balance sheets, public and private capital markets, collateral networks, payment rails and post-trade infrastructure. Frictions such as information asymmetry, capital requirements, liquidity constraints and transaction costs shape how efficiently capital is allocated.",
          fr: "La finance moderne est un réseau d’allocation du capital, de transformation des maturités et de la liquidité, de transfert de risque et de formation des prix / price discovery. Son architecture couvre les bilans bancaires, marchés publics et privés, réseaux de collatéral / collateral, infrastructures de paiement et systèmes post-trade. Les frictions — asymétrie d’information, exigences de capital, contraintes de liquidité et coûts de transaction — influencent l’efficacité de l’allocation du capital.",
        },
      },
      example: {
        en: "A household deposits $10,000 at a bank. The bank can use its funding base to make loans. Alternatively, that household can buy a corporate bond, funding the company through the capital market.",
        fr: "Un ménage dépose 10 000 $ dans une banque. La banque peut utiliser sa base de financement pour accorder des prêts. Autre possibilité : le ménage achète une obligation d’entreprise / corporate bond et finance directement l’entreprise via le marché des capitaux.",
      },
      marketConnection: {
        en: "When confidence, liquidity or funding conditions deteriorate, this transmission mechanism can weaken. That is why central-bank liquidity, bank capital and market functioning matter during stress.",
        fr: "Lorsque la confiance, la liquidité ou les conditions de financement se détériorent, ce mécanisme de transmission peut s’affaiblir. C’est pourquoi la liquidité des banques centrales, le capital bancaire et le bon fonctionnement des marchés deviennent essentiels en période de stress.",
      },
      vocabulary: [
        { en: "Capital allocation", fr: "allocation du capital", definition: { en: "Directing funds toward different uses or investments.", fr: "Répartition des fonds entre différents usages ou investissements." } },
        { en: "Price discovery", fr: "découverte / formation des prix", definition: { en: "The process through which trading reveals a market-clearing price.", fr: "Processus par lequel les échanges font émerger un prix d’équilibre de marché." } },
        { en: "Financial intermediary", fr: "intermédiaire financier", definition: { en: "An institution that connects providers and users of capital.", fr: "Institution qui relie apporteurs et utilisateurs de capitaux." } },
      ],
    },
    {
      id: "participants",
      kicker: { en: "02 · WHO DOES WHAT?", fr: "02 · QUI FAIT QUOI ?" },
      title: { en: "The main market participants", fr: "Les principaux acteurs du marché / market participants" },
      coreFacts: [
        { en: "Issuers raise capital; investors supply capital.", fr: "Les émetteurs / issuers lèvent du capital ; les investisseurs apportent le capital." },
        { en: "Asset managers invest on behalf of clients or funds, while banks may lend, advise, underwrite, intermediate or make markets.", fr: "Les gestionnaires d’actifs / asset managers investissent pour des clients ou fonds, tandis que les banques peuvent prêter, conseiller, souscrire / underwrite, intermédier ou faire du market making." },
        { en: "Brokers execute client orders as agents; dealers trade as principals using their own balance sheet.", fr: "Les courtiers / brokers exécutent les ordres des clients comme agents ; les dealers négocient en principal avec leur propre bilan." },
        { en: "Market makers continuously quote prices and help provide liquidity, but they also manage inventory and risk.", fr: "Les teneurs de marché / market makers cotent des prix et contribuent à la liquidité, tout en gérant un inventaire et des risques." },
      ],
      explanation: {
        Beginner: {
          en: "Think of a market as an ecosystem. Companies and governments need money. Investors want returns. Banks and brokers help transactions happen. Market makers stand ready to buy or sell so that investors do not always need to find the exact opposite person at the same moment.",
          fr: "Pense au marché comme à un écosystème. Les entreprises et les États ont besoin de financement. Les investisseurs recherchent un rendement / return. Les banques et courtiers / brokers facilitent les transactions. Les market makers se tiennent prêts à acheter ou vendre afin qu’un investisseur n’ait pas toujours besoin de trouver exactement la contrepartie opposée au même instant.",
        },
        Intermediate: {
          en: "Participants differ by economic objective and balance-sheet role. Issuers seek funding, buy-side investors allocate capital, sell-side firms provide execution and intermediation, and market infrastructure handles matching, clearing, settlement and safekeeping.",
          fr: "Les acteurs se distinguent par leur objectif économique et leur rôle de bilan. Les émetteurs recherchent du financement, les investisseurs buy-side allouent le capital, les acteurs sell-side fournissent exécution et intermédiation, tandis que l’infrastructure de marché gère appariement, compensation / clearing, règlement / settlement et conservation / custody.",
        },
        Professional: {
          en: "Market structure reflects incentives across issuers, buy-side institutions, dealers, agency brokers, proprietary liquidity providers, exchanges, alternative trading systems and post-trade utilities. Balance-sheet capacity, inventory risk, capital charges and client flow determine when liquidity is abundant or fragile.",
          fr: "La structure de marché reflète les incitations des émetteurs, institutions buy-side, dealers, agency brokers, fournisseurs de liquidité propriétaires, bourses, systèmes alternatifs de négociation et infrastructures post-trade. La capacité de bilan / balance-sheet capacity, le risque d’inventaire, les exigences de capital et les flux clients déterminent quand la liquidité est abondante ou fragile.",
        },
      },
      example: {
        en: "A pension fund wants to sell a large bond position. A dealer may buy the bonds onto its balance sheet immediately, then gradually redistribute that risk to other investors.",
        fr: "Un fonds de pension veut vendre une importante position obligataire. Un dealer peut acheter immédiatement les obligations sur son bilan puis redistribuer progressivement ce risque à d’autres investisseurs.",
      },
      vocabulary: [
        { en: "Buy side", fr: "buy side / côté investisseur", definition: { en: "Institutions that deploy capital, such as asset managers, pension funds and hedge funds.", fr: "Institutions qui investissent le capital, comme les asset managers, fonds de pension et hedge funds." } },
        { en: "Sell side", fr: "sell side / côté intermédiaire", definition: { en: "Banks and brokers that provide research, execution, financing and market access.", fr: "Banques et brokers fournissant recherche, exécution, financement et accès au marché." } },
        { en: "Principal trading", fr: "négociation en principal", definition: { en: "Trading using the firm's own balance sheet.", fr: "Négociation réalisée avec le propre bilan de l’établissement." } },
      ],
    },
    {
      id: "primary-secondary",
      kicker: { en: "03 · RAISING VS TRADING CAPITAL", fr: "03 · LEVER VS ÉCHANGER DU CAPITAL" },
      title: { en: "Primary and secondary markets", fr: "Marché primaire / primary market et marché secondaire / secondary market" },
      coreFacts: [
        { en: "In a primary-market transaction, newly issued securities are sold and proceeds flow to the issuer.", fr: "Sur le marché primaire / primary market, de nouveaux titres sont émis et le produit de l’émission revient à l’émetteur." },
        { en: "In the secondary market, existing securities trade between investors; the issuer usually receives no proceeds from that trade.", fr: "Sur le marché secondaire / secondary market, des titres existants s’échangent entre investisseurs ; l’émetteur ne reçoit généralement aucun produit de cette transaction." },
        { en: "Secondary-market liquidity matters to primary issuance because investors value the ability to exit or adjust positions later.", fr: "La liquidité du marché secondaire influence les émissions primaires car les investisseurs valorisent la possibilité de revendre ou ajuster leurs positions plus tard." },
        { en: "Underwriters help price and distribute many new securities issues.", fr: "Les banques introductrices / underwriters aident à fixer le prix et distribuer de nombreuses nouvelles émissions." },
      ],
      explanation: {
        Beginner: {
          en: "If a company sells newly created shares to raise money, that is the primary market. If you later buy those shares from another investor, that is the secondary market. The second trade changes who owns the share, but normally does not give the company new cash.",
          fr: "Si une entreprise vend de nouvelles actions pour lever de l’argent, c’est le marché primaire / primary market. Si tu achètes ensuite ces actions à un autre investisseur, tu es sur le marché secondaire / secondary market. La deuxième transaction change le propriétaire de l’action, mais n’apporte normalement pas de nouvel argent à l’entreprise.",
        },
        Intermediate: {
          en: "Primary markets create and distribute securities through processes such as IPOs, follow-on equity offerings and bond issuance. Secondary markets provide ongoing transferability, observable pricing and liquidity, which can lower the required return demanded by new investors.",
          fr: "Les marchés primaires créent et distribuent des titres via des IPO / introductions en bourse, augmentations de capital / follow-on offerings ou émissions obligataires. Les marchés secondaires fournissent transférabilité, prix observables et liquidité, ce qui peut réduire le rendement exigé / required return par les nouveaux investisseurs.",
        },
        Professional: {
          en: "Primary execution combines issuer funding needs, investor demand, syndication, bookbuilding and price discovery. Secondary-market depth, volatility and comparable valuations feed directly into issuance windows, concessions and expected aftermarket performance.",
          fr: "L’exécution primaire combine besoins de financement de l’émetteur, demande investisseur, syndication, construction du livre d’ordres / bookbuilding et price discovery. La profondeur du marché secondaire, sa volatilité et les valorisations comparables influencent directement les fenêtres d’émission, concessions et performance attendue après placement / aftermarket.",
        },
      },
      example: {
        en: "Company X issues $500 million of new bonds. Investors buying at issuance fund Company X. The next day, one investor sells $5 million of those bonds to another investor: that second trade is secondary-market activity.",
        fr: "L’entreprise X émet 500 M$ de nouvelles obligations. Les investisseurs qui participent à l’émission financent X. Le lendemain, un investisseur revend 5 M$ de ces obligations à un autre investisseur : cette seconde transaction appartient au marché secondaire.",
      },
      marketConnection: {
        en: "When secondary liquidity is poor or volatility is high, issuers may postpone deals or offer a larger yield or valuation discount to attract buyers.",
        fr: "Lorsque la liquidité secondaire est faible ou la volatilité élevée, les émetteurs peuvent reporter une opération ou offrir un rendement plus élevé / higher yield ou une décote de valorisation pour attirer les investisseurs.",
      },
      vocabulary: [
        { en: "IPO", fr: "introduction en bourse / IPO", definition: { en: "The first public sale of a company's shares.", fr: "Première vente publique des actions d’une entreprise." } },
        { en: "Underwriting", fr: "souscription / underwriting", definition: { en: "The process of arranging and distributing a securities issue.", fr: "Processus d’organisation et de distribution d’une émission de titres." } },
        { en: "Bookbuilding", fr: "construction du livre / bookbuilding", definition: { en: "Gathering investor demand to help determine allocation and pricing.", fr: "Collecte de la demande investisseur afin d’aider à déterminer allocation et prix." } },
      ],
    },
    {
      id: "venues",
      kicker: { en: "04 · WHERE TRADES HAPPEN", fr: "04 · OÙ LES TRANSACTIONS ONT LIEU" },
      title: { en: "Exchanges, electronic venues and OTC markets", fr: "Bourses / exchanges, plateformes électroniques et marchés OTC" },
      coreFacts: [
        { en: "An exchange centralizes orders under a defined rulebook and matching process.", fr: "Une bourse / exchange centralise les ordres selon des règles et un mécanisme d’appariement définis." },
        { en: "OTC means over-the-counter: counterparties transact bilaterally or through dealer networks rather than one centralized exchange order book.", fr: "OTC / over-the-counter signifie gré à gré : les contreparties négocient bilatéralement ou via des réseaux de dealers plutôt que dans un carnet d’ordres centralisé unique." },
        { en: "Different asset classes have different market structures; equities are often exchange-centric while many bonds and derivatives remain dealer- or OTC-oriented.", fr: "Les classes d’actifs ont des structures différentes : les actions sont souvent centrées sur les bourses, tandis que de nombreuses obligations et dérivés restent orientés dealers ou OTC." },
        { en: "Venue structure affects transparency, liquidity, execution quality and counterparty exposure.", fr: "La structure du lieu de négociation influence transparence, liquidité, qualité d’exécution et exposition à la contrepartie." },
      ],
      explanation: {
        Beginner: {
          en: "An exchange is like an organized marketplace with common rules and a visible process for matching buyers and sellers. OTC trading is more like negotiating directly through a dealer network. Neither structure is automatically better; each is suited to different products and client needs.",
          fr: "Une bourse / exchange ressemble à un marché organisé avec des règles communes et un processus visible d’appariement entre acheteurs et vendeurs. Le trading OTC ressemble davantage à une négociation via un réseau de dealers. Aucun modèle n’est automatiquement meilleur : chacun convient à certains produits et besoins.",
        },
        Intermediate: {
          en: "Centralized order books support standardized matching and often strong pre-trade transparency. OTC markets allow more flexible trade sizes and structures, but price discovery can be more fragmented and dealer intermediation more important.",
          fr: "Les carnets d’ordres centralisés / central limit order books permettent un appariement standardisé et souvent davantage de transparence pré-trade. Les marchés OTC autorisent des tailles ou structures plus flexibles, mais la découverte des prix peut être plus fragmentée et l’intermédiation des dealers plus importante.",
        },
        Professional: {
          en: "Execution quality depends on venue fragmentation, queue priority, tick size, transparency rules, RFQ protocols, dealer balance-sheet incentives and information leakage. Market structure therefore changes transaction costs even when the underlying security is identical.",
          fr: "La qualité d’exécution dépend de la fragmentation des plateformes, priorité dans la file / queue priority, taille minimale de cotation / tick size, règles de transparence, protocoles RFQ / request for quote, incitations de bilan des dealers et fuite d’information / information leakage. La structure de marché modifie donc les coûts de transaction même pour un titre identique.",
        },
      },
      vocabulary: [
        { en: "Exchange", fr: "bourse / exchange", definition: { en: "A regulated venue with rules for listing and/or trading securities.", fr: "Plateforme réglementée avec des règles d’admission et/ou de négociation des titres." } },
        { en: "OTC", fr: "gré à gré / OTC", definition: { en: "Trading outside a centralized exchange, commonly through dealers or bilateral negotiation.", fr: "Négociation hors bourse centralisée, souvent via dealers ou négociation bilatérale." } },
        { en: "RFQ", fr: "demande de cotation / request for quote", definition: { en: "A request sent to dealers asking for executable prices.", fr: "Demande envoyée à des dealers afin d’obtenir des prix exécutables." } },
      ],
    },
    {
      id: "liquidity",
      kicker: { en: "05 · HOW PRICES MEET ORDERS", fr: "05 · COMMENT PRIX ET ORDRES SE RENCONTRENT" },
      title: { en: "Bid, ask, spread, order book and liquidity", fr: "Bid, ask, spread, carnet d’ordres / order book et liquidité / liquidity" },
      coreFacts: [
        { en: "The bid is the highest displayed price a buyer is willing to pay; the ask is the lowest displayed price a seller is willing to accept.", fr: "Le bid est le prix affiché le plus élevé qu’un acheteur accepte de payer ; l’ask est le prix affiché le plus bas qu’un vendeur accepte de recevoir." },
        { en: "The bid-ask spread is a transaction-cost measure, not a guaranteed dealer profit.", fr: "Le bid-ask spread est une mesure du coût de transaction, pas un profit garanti pour le dealer." },
        { en: "Liquidity has several dimensions: spread, depth, immediacy and price impact.", fr: "La liquidité possède plusieurs dimensions : spread, profondeur / depth, immédiateté / immediacy et impact de prix / price impact." },
        { en: "A market can show a tight top-of-book spread but still be fragile if little size is available behind those quotes.", fr: "Un marché peut afficher un spread serré au meilleur prix mais rester fragile si peu de volume est disponible derrière ces cotations." },
      ],
      explanation: {
        Beginner: {
          en: "Suppose a stock is quoted 99.90 bid and 100.10 ask. If you want to sell immediately, you may hit the 99.90 bid. If you want to buy immediately, you may pay 100.10. The 0.20 difference is the spread. A more liquid market usually lets you trade more size with a smaller spread and less movement in price.",
          fr: "Supposons qu’une action cote 99,90 au bid et 100,10 à l’ask. Si tu veux vendre immédiatement, tu peux vendre au bid de 99,90. Si tu veux acheter immédiatement, tu peux payer l’ask de 100,10. La différence de 0,20 est le spread. Un marché plus liquide permet généralement de négocier davantage de volume avec un spread plus faible et moins d’impact sur le prix.",
        },
        Intermediate: {
          en: "Displayed spread captures only the best quoted prices. Execution cost also depends on available depth, order size, volatility and whether the order consumes multiple price levels. Large orders can create slippage relative to the initial quote.",
          fr: "Le spread affiché ne reflète que les meilleurs prix. Le coût d’exécution dépend aussi de la profondeur disponible / depth, de la taille de l’ordre, de la volatilité et du nombre de niveaux de prix consommés. Les gros ordres peuvent créer du slippage par rapport à la cotation initiale.",
        },
        Professional: {
          en: "Liquidity is state-dependent and endogenous. Quoted spread, effective spread, realized spread, market depth and price impact capture different dimensions. During stress, adverse-selection risk and inventory uncertainty can cause liquidity providers to widen quotes or reduce displayed size precisely when demand for immediacy rises.",
          fr: "La liquidité dépend de l’état du marché et est endogène. Spread coté / quoted spread, spread effectif / effective spread, realized spread, profondeur / market depth et impact de prix mesurent des dimensions différentes. En période de stress, le risque de sélection adverse / adverse selection et l’incertitude d’inventaire peuvent pousser les fournisseurs de liquidité à élargir les cotations ou réduire les volumes précisément lorsque la demande d’immédiateté augmente.",
        },
      },
      example: {
        en: "Quote: 99.90 bid / 100.10 ask. Mid-price = 100.00. Spread = 0.20, or 20 basis points of the mid-price approximately. Buying 1 share immediately costs 100.10 before fees; selling immediately receives 99.90.",
        fr: "Cotation : bid 99,90 / ask 100,10. Mid-price = 100,00. Spread = 0,20, soit environ 20 points de base / basis points du mid-price. Acheter immédiatement 1 action coûte 100,10 avant frais ; vendre immédiatement rapporte 99,90.",
      },
      marketConnection: {
        en: "Liquidity often deteriorates when volatility jumps. This can amplify price moves because the same order size has a larger market impact.",
        fr: "La liquidité se détériore souvent lorsque la volatilité augmente fortement. Cela peut amplifier les mouvements de prix car une même taille d’ordre produit davantage d’impact de marché.",
      },
      vocabulary: [
        { en: "Bid", fr: "prix acheteur / bid", definition: { en: "Best displayed buying price.", fr: "Meilleur prix d’achat affiché." } },
        { en: "Ask", fr: "prix vendeur / ask", definition: { en: "Best displayed selling price.", fr: "Meilleur prix de vente affiché." } },
        { en: "Market depth", fr: "profondeur de marché / market depth", definition: { en: "Quantity available to trade at and around quoted prices.", fr: "Quantité disponible à la négociation aux différents niveaux de prix." } },
        { en: "Slippage", fr: "glissement / slippage", definition: { en: "Difference between expected and achieved execution price.", fr: "Écart entre le prix d’exécution attendu et celui réellement obtenu." } },
      ],
    },
    {
      id: "orders",
      kicker: { en: "06 · EXECUTION CHOICES", fr: "06 · CHOIX D’EXÉCUTION" },
      title: { en: "Market orders, limit orders and execution trade-offs", fr: "Ordres au marché / market orders, ordres limites / limit orders et compromis d’exécution" },
      coreFacts: [
        { en: "A market order prioritizes immediacy but does not guarantee the final execution price.", fr: "Un ordre au marché / market order privilégie l’immédiateté mais ne garantit pas le prix final d’exécution." },
        { en: "A limit order controls the worst acceptable price but may not execute.", fr: "Un ordre limite / limit order contrôle le pire prix acceptable mais peut ne jamais être exécuté." },
        { en: "Execution is a trade-off among price, speed, certainty and information leakage.", fr: "L’exécution implique un compromis entre prix, vitesse, certitude et fuite d’information / information leakage." },
        { en: "Order size relative to available liquidity strongly influences execution strategy.", fr: "La taille de l’ordre par rapport à la liquidité disponible influence fortement la stratégie d’exécution." },
      ],
      explanation: {
        Beginner: {
          en: "A market order says: execute now at the best available prices. A limit order says: execute only at my chosen price or better. The first gives more certainty of execution; the second gives more control over price.",
          fr: "Un ordre au marché / market order signifie : exécute maintenant aux meilleurs prix disponibles. Un ordre limite / limit order signifie : exécute seulement à mon prix choisi ou à un meilleur prix. Le premier offre davantage de certitude d’exécution ; le second davantage de contrôle sur le prix.",
        },
        Intermediate: {
          en: "Aggressive orders consume liquidity while passive limit orders provide displayed liquidity. The choice depends on urgency, expected price movement, spread, depth and the opportunity cost of not executing.",
          fr: "Les ordres agressifs consomment la liquidité alors que les ordres limites passifs fournissent de la liquidité affichée. Le choix dépend de l’urgence, du mouvement de prix attendu, du spread, de la profondeur et du coût d’opportunité d’une non-exécution.",
        },
        Professional: {
          en: "Institutional execution optimizes implementation shortfall, market impact, timing risk and information leakage. Slicing algorithms, venue selection and passive/aggressive participation adapt to liquidity state and alpha decay rather than treating every order identically.",
          fr: "L’exécution institutionnelle cherche à optimiser l’implementation shortfall, l’impact de marché, le risque de timing et la fuite d’information. Les algorithmes de fractionnement, le choix des plateformes et la participation passive/agressive s’adaptent à l’état de la liquidité et à la décroissance de l’alpha / alpha decay.",
        },
      },
      example: {
        en: "If the best ask is 100.10 but only 50 shares are offered there, a market buy for 500 shares may execute across higher price levels. A 100.10 limit buy would avoid paying more, but the remaining quantity might not fill.",
        fr: "Si le meilleur ask est 100,10 mais que seulement 50 actions y sont disponibles, un achat au marché de 500 actions peut s’exécuter sur des niveaux de prix plus élevés. Un ordre limite à 100,10 évite de payer davantage, mais une partie de l’ordre peut rester non exécutée.",
      },
    },
    {
      id: "post-trade",
      kicker: { en: "07 · AFTER THE CLICK", fr: "07 · APRÈS LE CLIC" },
      title: { en: "Clearing, settlement and custody", fr: "Compensation / clearing, règlement-livraison / settlement et conservation / custody" },
      coreFacts: [
        { en: "Execution is the agreement to trade; settlement is the later exchange of cash and securities.", fr: "L’exécution / execution est l’accord de transaction ; le règlement-livraison / settlement est l’échange ultérieur du cash et des titres." },
        { en: "Clearing confirms obligations, may net exposures and can insert a central counterparty between buyers and sellers.", fr: "La compensation / clearing confirme les obligations, peut compenser / net les expositions et peut insérer une contrepartie centrale / CCP entre acheteurs et vendeurs." },
        { en: "Custodians safeguard securities and maintain ownership records and asset servicing.", fr: "Les dépositaires / custodians conservent les titres, maintiennent les registres de propriété et assurent l’asset servicing." },
        { en: "Post-trade infrastructure reduces operational and counterparty risk but does not eliminate all risk.", fr: "L’infrastructure post-trade réduit les risques opérationnels et de contrepartie sans éliminer tout risque." },
      ],
      explanation: {
        Beginner: {
          en: "When you press buy, the trade is agreed, but the system still has to make sure the buyer delivers money and the seller delivers the security. Clearing organizes who owes what. Settlement completes the exchange. Custody records and safeguards the assets afterward.",
          fr: "Quand tu cliques sur acheter, la transaction est convenue, mais le système doit encore s’assurer que l’acheteur livre l’argent et que le vendeur livre le titre. Le clearing organise qui doit quoi. Le settlement finalise l’échange. La custody conserve ensuite les actifs et les registres.",
        },
        Intermediate: {
          en: "Post-trade infrastructure converts executed trades into final obligations. Netting can reduce the gross amount of cash and securities that must move. Central counterparties can mutualize and manage counterparty exposure using margin and default-management frameworks.",
          fr: "L’infrastructure post-trade transforme les transactions exécutées en obligations finales. La compensation / netting peut réduire les montants bruts de cash et titres à transférer. Les contreparties centrales / CCP peuvent gérer et mutualiser le risque de contrepartie grâce aux marges / margin et procédures de défaut.",
        },
        Professional: {
          en: "Clearing architecture affects counterparty credit exposure, liquidity needs and systemic risk. CCP margining, default funds, netting sets, settlement cycles, fails management and custody chains are integral to market plumbing and can become binding constraints during stress.",
          fr: "L’architecture de clearing influence exposition au risque de crédit de contrepartie, besoins de liquidité et risque systémique. Appels de marge / margining des CCP, fonds de défaut / default funds, ensembles de netting, cycles de settlement, gestion des défauts de livraison / fails et chaînes de custody constituent la plomberie du marché et peuvent devenir des contraintes critiques en période de stress.",
        },
      },
      marketConnection: {
        en: "Shorter settlement cycles reduce the time an exposure remains unsettled, but can increase operational and funding pressure because participants must mobilize cash and securities faster.",
        fr: "Des cycles de settlement plus courts réduisent la durée pendant laquelle une exposition reste non réglée, mais peuvent accroître la pression opérationnelle et de financement car cash et titres doivent être mobilisés plus vite.",
      },
      vocabulary: [
        { en: "Clearing", fr: "compensation / clearing", definition: { en: "Determining and managing obligations after execution and before settlement.", fr: "Détermination et gestion des obligations après exécution et avant règlement." } },
        { en: "Settlement", fr: "règlement-livraison / settlement", definition: { en: "Final transfer of cash and securities between parties.", fr: "Transfert final du cash et des titres entre les parties." } },
        { en: "Custodian", fr: "dépositaire / custodian", definition: { en: "Institution that safeguards assets and provides recordkeeping and asset servicing.", fr: "Institution qui conserve les actifs, tient les registres et assure l’asset servicing." } },
      ],
    },
    {
      id: "system-risk",
      kicker: { en: "08 · WHY STRUCTURE MATTERS", fr: "08 · POURQUOI LA STRUCTURE COMPTE" },
      title: { en: "Market structure, stability and systemic risk", fr: "Structure de marché, stabilité et risque systémique / systemic risk" },
      coreFacts: [
        { en: "Leverage, maturity mismatch, concentrated exposures and liquidity mismatch can amplify shocks.", fr: "Le levier / leverage, décalage de maturité / maturity mismatch, expositions concentrées et mismatch de liquidité peuvent amplifier les chocs." },
        { en: "A problem in one institution can propagate through funding, collateral, derivatives, payment or confidence channels.", fr: "Un problème dans une institution peut se propager via le financement, le collatéral / collateral, les dérivés, les paiements ou la confiance." },
        { en: "Regulation, capital, liquidity buffers, clearing rules and central-bank backstops aim to improve resilience, but can also change incentives.", fr: "Réglementation, capital, coussins de liquidité / liquidity buffers, règles de clearing et dispositifs des banques centrales visent à renforcer la résilience mais modifient aussi les incitations." },
        { en: "Market structure is therefore part of risk analysis, not merely operational plumbing.", fr: "La structure de marché fait donc partie de l’analyse du risque, et n’est pas seulement de la plomberie opérationnelle." },
      ],
      explanation: {
        Beginner: {
          en: "Markets are connected. If one important participant cannot pay, other participants may suddenly question who else is exposed. They may demand more cash, refuse to lend or sell assets. That can turn a local problem into a broader market shock.",
          fr: "Les marchés sont connectés. Si un acteur important ne peut plus payer, les autres peuvent se demander qui est exposé. Ils peuvent exiger davantage de cash, refuser de prêter ou vendre des actifs. Un problème local peut alors devenir un choc de marché plus large.",
        },
        Intermediate: {
          en: "Systemic stress often propagates through feedback loops: falling prices reduce collateral values, margin calls create liquidity needs, forced selling pressures prices further and funding providers become more defensive.",
          fr: "Le stress systémique se propage souvent par boucles de rétroaction : baisse des prix → valeur du collatéral plus faible → appels de marge / margin calls → besoins de liquidité → ventes forcées → pression supplémentaire sur les prix et retrait des fournisseurs de financement.",
        },
        Professional: {
          en: "Systemic risk emerges from network effects, procyclical leverage, collateral dynamics, run incentives and common exposures. Resilience depends not only on individual solvency but on the interaction of balance sheets, market liquidity, funding liquidity and operational infrastructure under stress.",
          fr: "Le risque systémique / systemic risk naît des effets de réseau, du levier procyclique, de la dynamique du collatéral, des incitations aux retraits / runs et des expositions communes. La résilience dépend non seulement de la solvabilité individuelle mais aussi de l’interaction entre bilans, liquidité de marché, liquidité de financement / funding liquidity et infrastructure opérationnelle sous stress.",
        },
      },
      marketConnection: {
        en: "This framework will reappear throughout FinanceStudio in banking, credit, derivatives, repo, liquidity crises and central-bank policy.",
        fr: "Ce cadre reviendra dans FinanceStudio en banque, crédit, dérivés, repo, crises de liquidité et politique des banques centrales.",
      },
    },
  ],
  quiz: [
    {
      id: "q1",
      conceptKey: "primary-vs-secondary-market",
      question: {
        en: "A company sells newly issued bonds and receives the proceeds. Which market is this?",
        fr: "Une entreprise vend de nouvelles obligations et reçoit le produit de l’émission. De quel marché s’agit-il ?",
      },
      options: [
        { id: "a", label: { en: "Secondary market", fr: "Marché secondaire / secondary market" } },
        { id: "b", label: { en: "Primary market", fr: "Marché primaire / primary market" } },
        { id: "c", label: { en: "Custody market", fr: "Marché de custody" } },
        { id: "d", label: { en: "Settlement market", fr: "Marché de settlement" } },
      ],
      correctOption: "b",
      explanation: {
        en: "New securities are being issued and cash flows to the issuer, so this is a primary-market transaction.",
        fr: "De nouveaux titres sont émis et le cash revient à l’émetteur : il s’agit donc d’une transaction de marché primaire / primary market.",
      },
    },
    {
      id: "q2",
      conceptKey: "bid-ask",
      question: {
        en: "A stock is quoted 49.95 bid / 50.05 ask. What price would an immediate buyer most likely pay before fees?",
        fr: "Une action cote 49,95 bid / 50,05 ask. Quel prix un acheteur immédiat paiera-t-il le plus probablement avant frais ?",
      },
      options: [
        { id: "a", label: { en: "49.95", fr: "49,95" } },
        { id: "b", label: { en: "50.00", fr: "50,00" } },
        { id: "c", label: { en: "50.05", fr: "50,05" } },
        { id: "d", label: { en: "It is impossible to know anything", fr: "Impossible de savoir quoi que ce soit" } },
      ],
      correctOption: "c",
      explanation: {
        en: "An immediate buyer crosses the spread and normally trades at the best ask, assuming enough size is available there.",
        fr: "Un acheteur immédiat traverse le spread et négocie normalement au meilleur ask, si suffisamment de volume est disponible à ce prix.",
      },
    },
    {
      id: "q3",
      conceptKey: "liquidity",
      question: {
        en: "Which statement best describes a liquid market?",
        fr: "Quelle proposition décrit le mieux un marché liquide / liquid market ?",
      },
      options: [
        { id: "a", label: { en: "Prices never fall", fr: "Les prix ne baissent jamais" } },
        { id: "b", label: { en: "Large trades can usually occur with limited price impact", fr: "De gros volumes peuvent généralement être négociés avec un impact de prix limité" } },
        { id: "c", label: { en: "Every security has the same price", fr: "Tous les titres ont le même prix" } },
        { id: "d", label: { en: "Only market orders are allowed", fr: "Seuls les ordres au marché sont autorisés" } },
      ],
      correctOption: "b",
      explanation: {
        en: "Liquidity concerns the ability to transact size quickly and at reasonable cost without moving the price excessively.",
        fr: "La liquidité mesure la capacité à négocier rapidement des volumes à un coût raisonnable sans déplacer excessivement le prix.",
      },
    },
    {
      id: "q4",
      conceptKey: "broker-vs-dealer",
      question: {
        en: "What is the key distinction between a broker and a dealer?",
        fr: "Quelle est la distinction essentielle entre un broker et un dealer ?",
      },
      options: [
        { id: "a", label: { en: "A broker acts as agent; a dealer can trade as principal", fr: "Un broker agit comme agent ; un dealer peut négocier en principal" } },
        { id: "b", label: { en: "A dealer cannot hold inventory", fr: "Un dealer ne peut pas détenir d’inventaire" } },
        { id: "c", label: { en: "A broker always guarantees prices", fr: "Un broker garantit toujours les prix" } },
        { id: "d", label: { en: "There is no distinction", fr: "Il n’existe aucune distinction" } },
      ],
      correctOption: "a",
      explanation: {
        en: "A broker primarily executes on behalf of clients, while a dealer may use its own balance sheet and take principal risk.",
        fr: "Un broker exécute principalement pour le compte de clients, alors qu’un dealer peut utiliser son propre bilan et prendre un risque en principal.",
      },
    },
    {
      id: "q5",
      conceptKey: "market-vs-limit-order",
      question: {
        en: "Which order type prioritizes price control over certainty of execution?",
        fr: "Quel type d’ordre privilégie le contrôle du prix plutôt que la certitude d’exécution ?",
      },
      options: [
        { id: "a", label: { en: "Market order", fr: "Ordre au marché / market order" } },
        { id: "b", label: { en: "Limit order", fr: "Ordre limite / limit order" } },
        { id: "c", label: { en: "Settlement instruction", fr: "Instruction de settlement" } },
        { id: "d", label: { en: "Custody instruction", fr: "Instruction de custody" } },
      ],
      correctOption: "b",
      explanation: {
        en: "A limit order specifies the worst acceptable price, but the trade may never execute.",
        fr: "Un ordre limite fixe le pire prix acceptable, mais la transaction peut ne jamais être exécutée.",
      },
    },
    {
      id: "q6",
      conceptKey: "clearing-settlement",
      question: {
        en: "What is settlement?",
        fr: "Qu’est-ce que le règlement-livraison / settlement ?",
      },
      options: [
        { id: "a", label: { en: "The marketing of an IPO", fr: "Le marketing d’une IPO" } },
        { id: "b", label: { en: "The final transfer of cash and securities", fr: "Le transfert final du cash et des titres" } },
        { id: "c", label: { en: "A valuation method", fr: "Une méthode de valorisation" } },
        { id: "d", label: { en: "A measure of volatility", fr: "Une mesure de volatilité" } },
      ],
      correctOption: "b",
      explanation: {
        en: "Settlement completes the trade by transferring the agreed cash and securities between the parties.",
        fr: "Le settlement finalise la transaction par le transfert du cash et des titres convenus entre les parties.",
      },
    },
  ],
  interviewPrompt: {
    question: {
      en: "Explain the difference between the primary and secondary markets, then tell me why secondary-market liquidity matters to an issuer.",
      fr: "Explique la différence entre marché primaire / primary market et marché secondaire / secondary market, puis explique pourquoi la liquidité secondaire est importante pour un émetteur.",
    },
    framework: [
      { en: "Define primary market: new issuance, proceeds to issuer.", fr: "Définir le marché primaire : nouvelle émission, produit versé à l’émetteur." },
      { en: "Define secondary market: existing securities trade between investors.", fr: "Définir le marché secondaire : titres existants échangés entre investisseurs." },
      { en: "Connect secondary liquidity to investors' required return and willingness to buy new issues.", fr: "Relier la liquidité secondaire au rendement exigé / required return et à la volonté d’acheter de nouvelles émissions." },
      { en: "Add that weak liquidity can increase issuance concessions or delay a deal.", fr: "Ajouter qu’une faible liquidité peut augmenter la concession d’émission ou retarder une opération." },
    ],
    sample: {
      en: "The primary market is where new securities are issued and capital flows to the issuer. The secondary market is where existing securities trade between investors. Secondary liquidity matters because investors value the ability to exit or resize a position later. If that liquidity is poor, they may demand a higher return or a larger discount in the primary deal, raising the issuer's cost of capital.",
      fr: "Le marché primaire / primary market est le lieu où de nouveaux titres sont émis et où le capital revient à l’émetteur. Le marché secondaire / secondary market est celui où les titres existants s’échangent entre investisseurs. La liquidité secondaire est importante car les investisseurs valorisent la possibilité de sortir ou redimensionner une position plus tard. Si cette liquidité est faible, ils peuvent exiger un rendement plus élevé / higher required return ou une décote plus importante lors de l’émission, ce qui augmente le coût du capital de l’émetteur.",
    },
  },
};


export const stocksBondsFundsLesson: FinanceLesson = {
  slug: "year-1-stocks-bonds-etfs-funds",
  year: { en: "Year 1 · Foundations", fr: "Année 1 · Fondations" },
  domain: { en: "Markets & Instruments", fr: "Marchés & instruments / Markets & Instruments" },
  title: {
    en: "Stocks, Bonds, ETFs & Funds",
    fr: "Actions / Stocks, obligations / Bonds, ETF & fonds / Funds",
  },
  subtitle: {
    en: "Learn what investors actually own, where returns come from, how stocks and bonds differ, how funds package exposures, and how prices connect to cash flows, risk and interest rates.",
    fr: "Comprendre ce que l’investisseur possède réellement, d’où vient le rendement / return, comment actions et obligations diffèrent, comment les fonds regroupent les expositions et comment les prix se relient aux flux de trésorerie, au risque et aux taux d’intérêt.",
  },
  duration: { en: "70–90 min", fr: "70–90 min" },
  prerequisites: [
    {
      en: "Financial System & Market Structure",
      fr: "Système financier & structure de marché / Financial System & Market Structure",
    },
    {
      en: "Basic percentages and simple present-value intuition",
      fr: "Pourcentages de base et intuition simple de valeur actuelle / present value",
    },
  ],
  objectives: [
    {
      en: "Explain the economic and legal difference between equity ownership and debt claims.",
      fr: "Expliquer la différence économique et juridique entre propriété en actions / equity ownership et créance obligataire / debt claim.",
    },
    {
      en: "Calculate market capitalization, simple stock total return, dividend yield and bond coupon cash flows.",
      fr: "Calculer capitalisation boursière / market capitalization, rendement total simple d’une action / stock total return, rendement du dividende / dividend yield et flux de coupon obligataire.",
    },
    {
      en: "Explain why fixed-rate bond prices generally move inversely to market yields.",
      fr: "Expliquer pourquoi le prix d’une obligation à taux fixe évolue généralement en sens inverse des rendements de marché / market yields.",
    },
    {
      en: "Distinguish ETFs, mutual funds, index funds and actively managed funds.",
      fr: "Distinguer ETF, fonds communs / mutual funds, fonds indiciels / index funds et fonds actifs / actively managed funds.",
    },
    {
      en: "Compare stocks, bonds and diversified funds by claim, return source, risk, liquidity and role in a portfolio.",
      fr: "Comparer actions, obligations et fonds diversifiés selon le type de créance / claim, la source de rendement, le risque, la liquidité et le rôle en portefeuille.",
    },
    {
      en: "Recognize common beginner errors such as confusing stock price with company size or coupon with bond yield.",
      fr: "Reconnaître les erreurs fréquentes comme confondre prix d’une action et taille de l’entreprise, ou coupon et rendement obligataire / bond yield.",
    },
  ],
  overviewFlow: {
    title: {
      en: "From your cash to an economic exposure",
      fr: "De ton cash à une exposition économique / economic exposure",
    },
    steps: [
      {
        title: { en: "Investor capital", fr: "Capital de l’investisseur" },
        detail: { en: "Cash available to deploy", fr: "Cash disponible à investir" },
      },
      {
        title: { en: "Instrument", fr: "Instrument financier" },
        detail: { en: "Stock · bond · ETF · fund", fr: "Action · obligation · ETF · fonds" },
      },
      {
        title: { en: "Underlying claim", fr: "Créance / claim sous-jacente" },
        detail: { en: "Ownership · lending · pooled exposure", fr: "Propriété · prêt · exposition mutualisée" },
      },
      {
        title: { en: "Return & risk", fr: "Rendement & risque" },
        detail: { en: "Income · price change · default · market risk", fr: "Revenu · variation de prix · défaut · risque de marché" },
      },
    ],
  },
  sections: [
    {
      id: "equity-vs-debt",
      kicker: { en: "01 · THE FIRST DISTINCTION", fr: "01 · LA PREMIÈRE DISTINCTION" },
      title: {
        en: "Equity means ownership. Debt means lending.",
        fr: "Equity = propriété. Debt = prêt.",
      },
      coreFacts: [
        {
          en: "A common stock represents a residual ownership interest in a company; a bond is a contractual debt claim on an issuer.",
          fr: "Une action ordinaire / common stock représente une participation résiduelle dans une entreprise ; une obligation / bond est une créance contractuelle / debt claim sur un émetteur.",
        },
        {
          en: "Bondholders are promised contractual payments subject to the issuer's ability to pay; common shareholders are not promised a fixed return.",
          fr: "Les obligataires / bondholders reçoivent des paiements contractuellement prévus sous réserve de la capacité de l’émetteur à payer ; les actionnaires ordinaires n’ont pas de rendement fixe garanti.",
        },
        {
          en: "In a liquidation, creditors generally rank ahead of common equity holders; common equity is the residual claim.",
          fr: "En liquidation, les créanciers sont généralement prioritaires sur les actionnaires ordinaires ; l’equity est la créance résiduelle / residual claim.",
        },
        {
          en: "Higher priority does not mean risk-free: bondholders still face interest-rate, credit, liquidity and sometimes call or reinvestment risk.",
          fr: "Une priorité plus élevée ne signifie pas absence de risque : les obligataires restent exposés au risque de taux, de crédit, de liquidité et parfois de remboursement anticipé / call ou de réinvestissement.",
        },
      ],
      explanation: {
        Beginner: {
          en: "Buying a stock is like owning a tiny slice of a business. If the business becomes much more valuable, your slice can become more valuable too, but you are last in line after creditors if the company fails. Buying a bond is different: you are lending money under a contract that specifies when interest and principal should be paid.",
          fr: "Acheter une action, c’est posséder une petite part d’une entreprise. Si l’entreprise devient beaucoup plus précieuse, ta part peut prendre de la valeur, mais en cas de faillite tu arrives derrière les créanciers. Acheter une obligation est différent : tu prêtes de l’argent selon un contrat qui précise quand intérêts et principal doivent être payés.",
        },
        Intermediate: {
          en: "Equity absorbs business outcomes after contractual claims are met, which creates asymmetric upside but also residual downside. Debt has a more defined cash-flow schedule and higher priority, so valuation focuses heavily on discount rates, default probability, recovery and contractual features.",
          fr: "L’equity absorbe les résultats de l’entreprise après paiement des créances contractuelles, ce qui crée un potentiel de hausse asymétrique mais aussi un risque résiduel. La dette possède des flux plus définis et une priorité supérieure ; sa valorisation dépend donc fortement des taux d’actualisation, de la probabilité de défaut, du taux de recouvrement / recovery et des clauses contractuelles.",
        },
        Professional: {
          en: "Capital structure allocates enterprise risk across claims with different seniority, duration, optionality and control rights. Common equity is a perpetual residual claim; debt is senior contractual capital whose spread and recovery profile depend on leverage, asset coverage, covenant package, maturity and structural subordination.",
          fr: "La structure du capital / capital structure répartit le risque de l’entreprise entre des créances ayant différentes séniorités, durations, optionalités et droits de contrôle. L’action ordinaire est une créance résiduelle perpétuelle ; la dette est un capital contractuel prioritaire dont le spread et le profil de recovery dépendent du levier, de la couverture par les actifs, des covenants, de la maturité et de la subordination structurelle.",
        },
      },
      comparison: {
        title: { en: "Equity vs debt at a glance", fr: "Equity vs dette / debt en un coup d’œil" },
        headers: [
          { en: "Feature", fr: "Caractéristique" },
          { en: "Common stock", fr: "Action ordinaire / Common stock" },
          { en: "Bond", fr: "Obligation / Bond" },
        ],
        rows: [
          { cells: [
            { en: "Economic claim", fr: "Type de créance / claim" },
            { en: "Ownership / residual claim", fr: "Propriété / créance résiduelle" },
            { en: "Contractual debt claim", fr: "Créance contractuelle de dette" },
          ]},
          { cells: [
            { en: "Cash flows", fr: "Flux de trésorerie / cash flows" },
            { en: "Dividends are discretionary for common equity", fr: "Dividendes discrétionnaires pour l’action ordinaire" },
            { en: "Coupons and principal defined by contract", fr: "Coupons et principal définis par contrat" },
          ]},
          { cells: [
            { en: "Liquidation priority", fr: "Priorité en liquidation" },
            { en: "Usually last", fr: "Généralement en dernier" },
            { en: "Ahead of common equity", fr: "Avant l’action ordinaire" },
          ]},
          { cells: [
            { en: "Upside", fr: "Potentiel de hausse / upside" },
            { en: "Not contractually capped", fr: "Pas contractuellement plafonné" },
            { en: "Usually more limited by promised cash flows", fr: "Généralement plus limité par les flux promis" },
          ]},
        ],
      },
      vocabulary: [
        {
          en: "Residual claim",
          fr: "créance résiduelle",
          definition: {
            en: "A claim on what remains after higher-priority obligations are satisfied.",
            fr: "Droit sur ce qui reste après paiement des obligations prioritaires.",
          },
        },
        {
          en: "Seniority",
          fr: "séniorité / seniority",
          definition: {
            en: "The order in which claims are paid when a borrower is restructured or liquidated.",
            fr: "Ordre de priorité des créances lors d’une restructuration ou liquidation.",
          },
        },
      ],
    },
    {
      id: "stocks",
      kicker: { en: "02 · HOW A STOCK WORKS", fr: "02 · COMMENT FONCTIONNE UNE ACTION" },
      title: {
        en: "Shares, market capitalization, dividends and voting rights",
        fr: "Actions / shares, capitalisation boursière, dividendes et droits de vote",
      },
      coreFacts: [
        {
          en: "A company's share price alone does not tell you how large or valuable the whole company is.",
          fr: "Le prix d’une action à lui seul ne dit pas quelle est la taille ou la valeur totale de l’entreprise.",
        },
        {
          en: "Market capitalization equals share price multiplied by shares outstanding.",
          fr: "La capitalisation boursière / market capitalization correspond au prix par action multiplié par le nombre d’actions en circulation / shares outstanding.",
        },
        {
          en: "Stock splits change the number of shares and price per share mechanically, but do not by themselves create enterprise value.",
          fr: "Un fractionnement d’actions / stock split modifie mécaniquement le nombre d’actions et le prix par action, mais ne crée pas en lui-même de valeur d’entreprise.",
        },
        {
          en: "Common shares may carry voting rights and may receive dividends, but dividends are generally not contractual obligations like bond coupons.",
          fr: "Les actions ordinaires peuvent donner des droits de vote et recevoir des dividendes, mais les dividendes ne sont généralement pas des obligations contractuelles comme les coupons obligataires.",
        },
      ],
      explanation: {
        Beginner: {
          en: "If a company has 200 million shares and each trades at $50, investors collectively value its equity at $10 billion. A $500 stock is not automatically 'more expensive' than a $50 stock because the number of shares can be completely different.",
          fr: "Si une entreprise possède 200 millions d’actions et que chaque action vaut 50 $, la valeur boursière totale de ses capitaux propres est de 10 milliards de dollars. Une action à 500 $ n’est pas automatiquement « plus chère » qu’une action à 50 $, car le nombre d’actions peut être totalement différent.",
        },
        Intermediate: {
          en: "Market capitalization measures the market value of common equity, not the value of the entire operating business. Enterprise value adjusts equity value for net debt and certain other claims. Share count can also change through issuance, employee compensation and buybacks.",
          fr: "La capitalisation boursière mesure la valeur de marché des capitaux propres ordinaires, pas la valeur totale de l’activité. La valeur d’entreprise / enterprise value ajuste l’equity value notamment pour la dette nette et certaines autres créances. Le nombre d’actions peut évoluer via émissions, rémunération en actions et rachats / buybacks.",
        },
        Professional: {
          en: "Equity analysis distinguishes basic and diluted share count, free float, insider ownership, treasury shares and potential dilution. Market cap is a snapshot of equity value; valuation work usually links equity value to enterprise value, operating forecasts, capital structure and per-share claims.",
          fr: "L’analyse equity distingue nombre d’actions de base et dilué / diluted, flottant / free float, détention des insiders, treasury shares et dilution potentielle. La market cap est une photographie de l’equity value ; la valorisation relie généralement equity value, enterprise value, prévisions opérationnelles, structure du capital et droits par action.",
        },
      },
      formula: {
        label: { en: "Market capitalization", fr: "Capitalisation boursière / Market capitalization" },
        expression: "Market Cap = Share Price × Shares Outstanding",
        explanation: {
          en: "Use the current equity price and the number of common shares outstanding.",
          fr: "Utilise le prix de marché actuel de l’action et le nombre d’actions ordinaires en circulation.",
        },
        workedExample: {
          en: "$50 × 200 million shares = $10 billion market capitalization.",
          fr: "50 $ × 200 millions d’actions = 10 milliards de dollars de capitalisation boursière.",
        },
      },
      marketConnection: {
        en: "Index weights, valuation multiples and corporate actions often depend on market capitalization, free float or enterprise value rather than the absolute share price.",
        fr: "Les pondérations d’indices, multiples de valorisation et opérations sur capital dépendent souvent de la market cap, du free float ou de l’enterprise value plutôt que du prix absolu de l’action.",
      },
      vocabulary: [
        {
          en: "Shares outstanding",
          fr: "actions en circulation / shares outstanding",
          definition: {
            en: "Common shares currently issued and held by investors, excluding treasury shares under common conventions.",
            fr: "Actions ordinaires émises et détenues par les investisseurs, hors treasury shares selon les conventions usuelles.",
          },
        },
        {
          en: "Buyback",
          fr: "rachat d’actions / buyback",
          definition: {
            en: "A company repurchasing its own shares.",
            fr: "Opération par laquelle une entreprise rachète ses propres actions.",
          },
        },
      ],
    },
    {
      id: "stock-returns",
      kicker: { en: "03 · WHERE STOCK RETURNS COME FROM", fr: "03 · D’OÙ VIENT LE RENDEMENT D’UNE ACTION" },
      title: {
        en: "Price change, dividends and expectations",
        fr: "Variation de prix, dividendes et anticipations",
      },
      coreFacts: [
        {
          en: "A stock investor's holding-period return combines price appreciation or depreciation with cash distributions such as dividends.",
          fr: "Le rendement de détention / holding-period return d’une action combine variation du prix et distributions en cash comme les dividendes.",
        },
        {
          en: "Stock prices respond to expected future cash flows and the return investors require for bearing risk, not only to current earnings.",
          fr: "Les prix des actions réagissent aux flux futurs anticipés et au rendement exigé par les investisseurs pour supporter le risque, pas uniquement aux bénéfices actuels.",
        },
        {
          en: "A company can report strong earnings and still see its stock fall if expectations had been even higher.",
          fr: "Une entreprise peut publier d’excellents résultats et voir son action baisser si les attentes du marché étaient encore plus élevées.",
        },
        {
          en: "Dividends are one use of corporate cash; reinvestment and buybacks can also affect shareholder value.",
          fr: "Les dividendes sont une utilisation du cash de l’entreprise ; le réinvestissement et les rachats d’actions peuvent également influencer la valeur pour l’actionnaire.",
        },
      ],
      explanation: {
        Beginner: {
          en: "If you buy at $40, later sell at $44 and receive a $1 dividend, you made $5 on a $40 starting investment: a 12.5% simple holding-period return. The key idea is that return is not just the change in the screen price.",
          fr: "Si tu achètes à 40 $, revends à 44 $ et reçois 1 $ de dividende, tu as gagné 5 $ sur un investissement initial de 40 $, soit 12,5 % de rendement simple. L’idée essentielle : le rendement ne correspond pas uniquement à la variation du prix affiché.",
        },
        Intermediate: {
          en: "Equity returns reflect revisions to expected earnings and cash flows, changes in valuation multiples and distributions to shareholders. A higher discount rate can compress the present value investors assign to distant cash flows even if operational forecasts are unchanged.",
          fr: "Les rendements actions reflètent les révisions des bénéfices et cash flows attendus, les variations de multiples de valorisation et les distributions aux actionnaires. Une hausse du taux d’actualisation / discount rate peut réduire la valeur actuelle attribuée aux cash flows lointains même si les prévisions opérationnelles ne changent pas.",
        },
        Professional: {
          en: "Observed equity returns can be decomposed conceptually into fundamental growth, income, multiple expansion or compression and changes in expectations. Cross-sectional performance often reflects factor exposures such as size, value, quality, momentum and duration-like sensitivity to real yields.",
          fr: "Les rendements actions peuvent être décomposés conceptuellement en croissance fondamentale, revenu, expansion/compression des multiples et révisions d’anticipations. La performance relative reflète souvent des expositions factorielles telles que size, value, quality, momentum et sensibilité de type duration aux taux réels / real yields.",
        },
      },
      formula: {
        label: { en: "Simple stock total return", fr: "Rendement total simple d’une action / Stock total return" },
        expression: "Return = (Ending Price − Starting Price + Dividends) ÷ Starting Price",
        explanation: {
          en: "This is a simple holding-period return before taxes, fees and reinvestment effects.",
          fr: "Il s’agit d’un rendement simple sur période, avant fiscalité, frais et effets de réinvestissement.",
        },
        workedExample: {
          en: "($44 − $40 + $1) ÷ $40 = 12.5%.",
          fr: "(44 $ − 40 $ + 1 $) ÷ 40 $ = 12,5 %.",
        },
      },
      vocabulary: [
        {
          en: "Dividend yield",
          fr: "rendement du dividende / dividend yield",
          definition: {
            en: "Annual dividends per share divided by the share price, using the chosen dividend convention.",
            fr: "Dividendes annuels par action divisés par le prix de l’action, selon la convention de dividende utilisée.",
          },
        },
        {
          en: "Multiple compression",
          fr: "compression des multiples / multiple compression",
          definition: {
            en: "A decline in the valuation multiple investors are willing to pay.",
            fr: "Baisse du multiple de valorisation que les investisseurs acceptent de payer.",
          },
        },
      ],
    },
    {
      id: "bond-anatomy",
      kicker: { en: "04 · HOW A BOND WORKS", fr: "04 · COMMENT FONCTIONNE UNE OBLIGATION" },
      title: {
        en: "Face value, coupon, maturity and repayment",
        fr: "Valeur nominale / face value, coupon, maturité et remboursement",
      },
      coreFacts: [
        {
          en: "A bond normally specifies a face or par value, coupon terms, maturity date and legal priority.",
          fr: "Une obligation précise généralement une valeur nominale / face or par value, les modalités du coupon, une date de maturité et une priorité juridique.",
        },
        {
          en: "Coupon rate is applied to face value, not to the bond's current market price.",
          fr: "Le taux de coupon / coupon rate s’applique à la valeur nominale, pas au prix de marché actuel de l’obligation.",
        },
        {
          en: "At maturity, a plain-vanilla bond typically repays principal if the issuer has not defaulted and no special feature changes the outcome.",
          fr: "À maturité, une obligation standard rembourse généralement le principal si l’émetteur n’a pas fait défaut et qu’aucune clause particulière ne modifie le résultat.",
        },
        {
          en: "Coupon, current yield and yield to maturity are related but different concepts.",
          fr: "Coupon, rendement courant / current yield et rendement à maturité / yield to maturity sont des concepts liés mais différents.",
        },
      ],
      explanation: {
        Beginner: {
          en: "A $1,000 bond with a 6% annual coupon pays $60 of coupon interest per year, regardless of whether the bond currently trades at $950 or $1,050. If coupons are paid semiannually, that $60 is typically split into two $30 payments.",
          fr: "Une obligation de 1 000 $ avec un coupon annuel de 6 % verse 60 $ d’intérêt par an, que son prix de marché soit 950 $ ou 1 050 $. Si les coupons sont semestriels, les 60 $ sont généralement divisés en deux paiements de 30 $.",
        },
        Intermediate: {
          en: "A bond packages contractual cash flows whose value depends on the appropriate discount rate. Credit quality, benchmark rates, spread, maturity, seniority, embedded options and liquidity all influence the market price and yield investors demand.",
          fr: "Une obligation regroupe des flux contractuels dont la valeur dépend du taux d’actualisation approprié. Qualité de crédit, taux de référence, spread, maturité, séniorité, options intégrées et liquidité influencent le prix et le rendement exigé par les investisseurs.",
        },
        Professional: {
          en: "Bond cash flows are valued against a term structure plus compensation for credit, liquidity, optionality and technical factors. Coupon determines contractual cash flow; yield is an endogenous market return measure implied by price and assumptions. Spread analysis separates benchmark rate risk from issuer and security-specific compensation.",
          fr: "Les flux obligataires sont valorisés par rapport à une structure par terme / term structure, à laquelle s’ajoutent compensations pour crédit, liquidité, optionalité et facteurs techniques. Le coupon détermine le cash flow contractuel ; le yield est une mesure de rendement de marché impliquée par le prix et certaines hypothèses. L’analyse de spread sépare le risque de taux de référence de la rémunération propre à l’émetteur et au titre.",
        },
      },
      formula: {
        label: { en: "Annual coupon cash flow", fr: "Flux annuel de coupon / Annual coupon cash flow" },
        expression: "Annual Coupon = Face Value × Coupon Rate",
        explanation: {
          en: "Coupon frequency changes the timing of payments, not the stated annual coupon amount.",
          fr: "La fréquence de coupon modifie le calendrier des paiements, pas le montant annuel indiqué.",
        },
        workedExample: {
          en: "$1,000 face value × 6% = $60 annual coupon.",
          fr: "1 000 $ de nominal × 6 % = 60 $ de coupon annuel.",
        },
      },
      vocabulary: [
        {
          en: "Par value",
          fr: "valeur nominale / par value",
          definition: {
            en: "Contractual principal amount used to determine repayment and usually coupon calculations.",
            fr: "Montant principal contractuel utilisé pour le remboursement et généralement pour calculer le coupon.",
          },
        },
        {
          en: "Maturity",
          fr: "maturité / maturity",
          definition: {
            en: "The date on which principal is scheduled to be repaid for a standard bond.",
            fr: "Date prévue de remboursement du principal pour une obligation standard.",
          },
        },
      ],
    },
    {
      id: "bond-price-yield",
      kicker: { en: "05 · PRICE AND YIELD", fr: "05 · PRIX ET RENDEMENT" },
      title: {
        en: "Why bond prices and yields move in opposite directions",
        fr: "Pourquoi prix obligataires et rendements / yields évoluent en sens inverse",
      },
      coreFacts: [
        {
          en: "For a plain fixed-rate bond, higher required market yields generally imply a lower present value and therefore a lower price.",
          fr: "Pour une obligation simple à taux fixe, une hausse du rendement exigé par le marché implique généralement une valeur actuelle plus faible et donc un prix plus bas.",
        },
        {
          en: "The inverse relationship is mathematical: existing fixed cash flows become less attractive when new opportunities offer higher yields.",
          fr: "La relation inverse est mathématique : des cash flows fixes existants deviennent moins attractifs lorsque de nouvelles opportunités offrent des rendements plus élevés.",
        },
        {
          en: "Longer maturity and lower coupon generally increase sensitivity to changes in yields, all else equal.",
          fr: "Une maturité plus longue et un coupon plus faible augmentent généralement la sensibilité aux variations de yield, toutes choses égales par ailleurs.",
        },
        {
          en: "Yield to maturity is not a guaranteed realized return; it depends on holding, payment and reinvestment assumptions.",
          fr: "Le yield to maturity n’est pas un rendement réalisé garanti ; il dépend d’hypothèses de détention, de paiement et de réinvestissement.",
        },
      ],
      explanation: {
        Beginner: {
          en: "Imagine your bond pays $50 next year plus $1,000 back. If investors now demand 6% on comparable risk, they will not pay $1,000 today for cash flows worth only $1,050 next year. Discounting $1,050 by 6% gives about $990.57, so the bond trades below par.",
          fr: "Imagine que ton obligation verse 50 $ l’an prochain plus le remboursement de 1 000 $. Si les investisseurs exigent maintenant 6 % sur un risque comparable, ils ne paieront pas 1 000 $ aujourd’hui pour recevoir seulement 1 050 $ dans un an. Actualiser 1 050 $ à 6 % donne environ 990,57 $ : l’obligation cote donc sous le pair / below par.",
        },
        Intermediate: {
          en: "Bond price equals the present value of promised cash flows discounted at a market-required yield appropriate to timing and risk. A shift in that yield changes every discounted cash flow, creating the inverse price-yield relationship. Duration later formalizes first-order sensitivity.",
          fr: "Le prix obligataire correspond à la valeur actuelle des flux promis, actualisés à un yield de marché adapté au timing et au risque. Une variation de ce yield modifie la valeur actualisée de chaque flux, créant la relation inverse prix-yield. La duration formalise ensuite cette sensibilité de premier ordre.",
        },
        Professional: {
          en: "Price-yield convexity means the relationship is inverse but nonlinear. Parallel rate shifts are only one scenario: curve shape, spread, optionality and liquidity can move simultaneously. For credit bonds, total yield changes can reflect both benchmark rates and spread repricing.",
          fr: "La convexité de la relation prix-yield signifie que la relation est inverse mais non linéaire. Un déplacement parallèle des taux n’est qu’un scénario : forme de courbe, spread, optionalité et liquidité peuvent évoluer simultanément. Pour le crédit, la variation du yield total peut venir à la fois du taux de référence et du repricing du spread.",
        },
      },
      formula: {
        label: { en: "Basic bond present value", fr: "Valeur actuelle simple d’une obligation / Bond present value" },
        expression: "Price = Σ [Couponₜ ÷ (1 + y)ᵗ] + Face Value ÷ (1 + y)ⁿ",
        explanation: {
          en: "This simplified formula assumes one discount yield per period and no embedded option. Real fixed-income analytics can use full spot curves, spreads and day-count conventions.",
          fr: "Cette formule simplifiée suppose un seul taux d’actualisation par période et aucune option intégrée. L’analyse obligataire réelle peut utiliser une courbe spot complète, des spreads et des conventions de calcul de jours.",
        },
        workedExample: {
          en: "One-year bond: ($50 coupon + $1,000 principal) ÷ 1.06 = about $990.57.",
          fr: "Obligation à un an : (50 $ de coupon + 1 000 $ de principal) ÷ 1,06 ≈ 990,57 $.",
        },
      },
      marketConnection: {
        en: "When government yields jump, fixed-rate bond prices can fall immediately. Credit bonds may move even more if credit spreads widen at the same time.",
        fr: "Lorsque les rendements souverains montent fortement, les prix des obligations à taux fixe peuvent baisser immédiatement. Les obligations de crédit peuvent bouger davantage si les spreads de crédit s’élargissent en même temps.",
      },
      vocabulary: [
        {
          en: "Yield to maturity",
          fr: "rendement à maturité / yield to maturity",
          definition: {
            en: "The single discount rate that equates a bond's price with the present value of its scheduled cash flows under standard assumptions.",
            fr: "Taux d’actualisation unique qui égalise le prix d’une obligation avec la valeur actuelle de ses flux prévus selon des hypothèses standard.",
          },
        },
        {
          en: "Discount bond",
          fr: "obligation sous le pair / discount bond",
          definition: {
            en: "A bond trading below its face or par value.",
            fr: "Obligation négociée sous sa valeur nominale / par.",
          },
        },
      ],
    },
    {
      id: "funds-etfs",
      kicker: { en: "06 · POOLED INVESTING", fr: "06 · INVESTISSEMENT COLLECTIF" },
      title: {
        en: "ETFs, mutual funds, index funds and active funds",
        fr: "ETF, fonds communs / mutual funds, fonds indiciels et fonds actifs",
      },
      coreFacts: [
        {
          en: "A fund pools investor capital to hold a portfolio of underlying assets according to a mandate.",
          fr: "Un fonds mutualise le capital des investisseurs pour détenir un portefeuille d’actifs sous-jacents selon un mandat.",
        },
        {
          en: "An ETF is a fund whose shares generally trade intraday on an exchange; a traditional open-end mutual fund is commonly transacted at a calculated NAV under its dealing rules.",
          fr: "Un ETF est un fonds dont les parts se négocient généralement en séance sur une bourse ; un fonds commun ouvert traditionnel / open-end mutual fund est généralement souscrit ou racheté à une NAV calculée selon ses règles de dealing.",
        },
        {
          en: "Passive funds seek to track an index or rule set; active funds allow managers to deviate from a benchmark or choose securities based on a strategy.",
          fr: "Les fonds passifs cherchent à répliquer un indice ou un ensemble de règles ; les fonds actifs permettent au gérant de s’écarter d’un benchmark ou de sélectionner les titres selon une stratégie.",
        },
        {
          en: "An ETF is not automatically diversified, low-risk or passive: those properties depend on the underlying portfolio and mandate.",
          fr: "Un ETF n’est pas automatiquement diversifié, peu risqué ou passif : tout dépend du portefeuille sous-jacent et du mandat.",
        },
      ],
      explanation: {
        Beginner: {
          en: "Instead of buying 100 separate stocks yourself, you can buy one fund that holds many securities. An ETF packages that portfolio into exchange-traded shares. You still own the ETF share, while the fund owns the underlying basket under its legal structure.",
          fr: "Au lieu d’acheter toi-même 100 actions différentes, tu peux acheter une part d’un fonds qui détient de nombreux titres. Un ETF transforme ce portefeuille en parts négociées en bourse. Tu possèdes la part de l’ETF tandis que le fonds détient le panier sous-jacent selon sa structure juridique.",
        },
        Intermediate: {
          en: "ETFs combine pooled portfolio exposure with secondary-market trading. Authorized participants and creation-redemption mechanisms help connect ETF share supply with underlying asset value. Tracking difference reflects fees, implementation, taxes, cash drag and other frictions.",
          fr: "Les ETF combinent exposition mutualisée et négociation sur marché secondaire. Les participants autorisés / authorized participants et le mécanisme de création-rachat / creation-redemption contribuent à relier l’offre de parts à la valeur des actifs sous-jacents. Le tracking difference reflète frais, implémentation, fiscalité, cash drag et autres frictions.",
        },
        Professional: {
          en: "ETF analysis separates primary creation-redemption liquidity from secondary exchange liquidity and underlying basket liquidity. Spreads, premiums/discounts, index rebalances, securities lending, tax structure and replication method can all affect realized investor outcomes.",
          fr: "L’analyse ETF distingue liquidité primaire de creation-redemption, liquidité secondaire en bourse et liquidité du panier sous-jacent. Spreads, primes/décotes, rebalancements d’indice, securities lending, structure fiscale et méthode de réplication peuvent tous influencer le résultat réellement obtenu par l’investisseur.",
        },
      },
      formula: {
        label: { en: "Simple annual expense estimate", fr: "Estimation simple des frais annuels / Expense estimate" },
        expression: "Approx. Annual Fund Fee = Investment Value × Expense Ratio",
        explanation: {
          en: "The actual expense ratio is generally reflected through fund NAV over time rather than billed as a separate flat invoice to the investor.",
          fr: "En pratique, l’expense ratio est généralement reflété progressivement dans la NAV du fonds plutôt que facturé comme une facture séparée forfaitaire.",
        },
        workedExample: {
          en: "$20,000 × 0.20% = about $40 per year before changes in portfolio value and other costs.",
          fr: "20 000 $ × 0,20 % ≈ 40 $ par an avant variation de valeur du portefeuille et autres coûts.",
        },
      },
      marketConnection: {
        en: "During stressed markets, an ETF's quoted spread and premium or discount can change as underlying liquidity deteriorates. The ETF price can also provide price discovery when some underlying instruments trade less frequently.",
        fr: "En période de stress, le spread coté d’un ETF et sa prime/décote peuvent évoluer lorsque la liquidité des actifs sous-jacents se détériore. Le prix de l’ETF peut aussi contribuer au price discovery lorsque certains actifs sous-jacents se négocient moins fréquemment.",
      },
      vocabulary: [
        {
          en: "NAV",
          fr: "valeur liquidative / net asset value (NAV)",
          definition: {
            en: "The fund's net asset value, generally assets minus liabilities divided by fund shares under the applicable methodology.",
            fr: "Valeur nette du fonds, généralement actifs moins passifs divisés par le nombre de parts selon la méthodologie applicable.",
          },
        },
        {
          en: "Expense ratio",
          fr: "ratio de frais / expense ratio",
          definition: {
            en: "Annual operating expenses expressed as a percentage of fund assets under the stated convention.",
            fr: "Frais d’exploitation annuels exprimés en pourcentage des actifs du fonds selon la convention indiquée.",
          },
        },
        {
          en: "Tracking difference",
          fr: "écart de suivi / tracking difference",
          definition: {
            en: "The difference between a fund's realized return and the return of the benchmark it aims to track.",
            fr: "Écart entre le rendement réalisé par le fonds et celui du benchmark qu’il cherche à suivre.",
          },
        },
      ],
    },
    {
      id: "diversification",
      kicker: { en: "07 · DIVERSIFICATION", fr: "07 · DIVERSIFICATION" },
      title: {
        en: "What diversification can — and cannot — do",
        fr: "Ce que la diversification peut — et ne peut pas — faire",
      },
      coreFacts: [
        {
          en: "Diversification can reduce exposure to security-specific or idiosyncratic risk when holdings are not perfectly correlated.",
          fr: "La diversification peut réduire le risque spécifique / idiosyncratic risk lorsque les positions ne sont pas parfaitement corrélées.",
        },
        {
          en: "Diversification does not eliminate systematic market risk shared by many assets.",
          fr: "La diversification n’élimine pas le risque systématique / systematic market risk partagé par de nombreux actifs.",
        },
        {
          en: "Owning many securities does not guarantee meaningful diversification if they share the same sector, factor, geography or macro sensitivity.",
          fr: "Détenir de nombreux titres ne garantit pas une vraie diversification s’ils partagent le même secteur, facteur, zone géographique ou sensibilité macro.",
        },
        {
          en: "A broad ETF can diversify security-specific risk efficiently, while a narrow thematic or leveraged ETF can remain highly concentrated.",
          fr: "Un ETF large peut diversifier efficacement le risque spécifique, alors qu’un ETF thématique étroit ou à levier peut rester très concentré.",
        },
      ],
      explanation: {
        Beginner: {
          en: "If all your money is in one company, one bad event can damage your whole portfolio. If you spread money across many unrelated companies, one company matters less. But if the whole market falls because interest rates or economic expectations change, many holdings can still fall together.",
          fr: "Si tout ton argent est placé dans une seule entreprise, un seul mauvais événement peut toucher tout ton portefeuille. Si tu répartis l’investissement entre de nombreuses entreprises différentes, une entreprise compte moins. Mais si tout le marché baisse à cause des taux ou de l’économie, de nombreuses positions peuvent quand même baisser ensemble.",
        },
        Intermediate: {
          en: "Portfolio risk depends not only on each asset's volatility but also on correlations between assets. Diversification works best when return drivers differ. Concentrated factor or macro exposures can remain hidden inside a portfolio that looks diversified by security count.",
          fr: "Le risque de portefeuille dépend non seulement de la volatilité de chaque actif mais aussi des corrélations entre actifs. La diversification fonctionne mieux lorsque les moteurs de rendement diffèrent. Des expositions concentrées à un facteur ou au macro peuvent rester cachées dans un portefeuille qui semble diversifié par le nombre de titres.",
        },
        Professional: {
          en: "Diversification is a covariance problem, not a ticker-count problem. Marginal contribution to risk, factor decomposition, regime-dependent correlation and liquidity commonality matter more than the raw number of positions. Correlations can also rise during stress.",
          fr: "La diversification est un problème de covariance, pas de nombre de tickers. Contribution marginale au risque, décomposition factorielle, corrélations dépendantes du régime et liquidité commune importent davantage que le nombre brut de positions. Les corrélations peuvent aussi augmenter en période de stress.",
        },
      },
      marketConnection: {
        en: "A portfolio diversified across company names can still be concentrated in long-duration growth, one currency, one country or one rate regime.",
        fr: "Un portefeuille diversifié par noms d’entreprises peut rester très concentré sur la croissance longue duration, une devise, un pays ou un régime de taux.",
      },
      vocabulary: [
        {
          en: "Idiosyncratic risk",
          fr: "risque spécifique / idiosyncratic risk",
          definition: {
            en: "Risk specific to an individual company or security rather than the broader market.",
            fr: "Risque propre à une entreprise ou un titre plutôt qu’au marché dans son ensemble.",
          },
        },
        {
          en: "Systematic risk",
          fr: "risque systématique / systematic risk",
          definition: {
            en: "Risk driven by broad market factors that diversification across similar risky assets cannot fully eliminate.",
            fr: "Risque provenant de facteurs de marché larges qu’une diversification entre actifs risqués similaires ne peut pas éliminer complètement.",
          },
        },
      ],
    },
    {
      id: "compare-instruments",
      kicker: { en: "08 · CHOOSING THE CLAIM", fr: "08 · CHOISIR LE TYPE D’EXPOSITION" },
      title: {
        en: "Comparing stocks, bonds and funds in a portfolio",
        fr: "Comparer actions, obligations et fonds dans un portefeuille",
      },
      coreFacts: [
        {
          en: "Instrument choice should begin with the economic exposure and claim you want, not with whether the ticker looks familiar.",
          fr: "Le choix d’un instrument doit commencer par l’exposition économique et le type de créance recherchés, pas par la familiarité d’un ticker.",
        },
        {
          en: "Stocks typically provide direct equity exposure; bonds provide contractual debt exposure; funds package one or many underlying exposures.",
          fr: "Les actions fournissent généralement une exposition directe à l’equity ; les obligations une exposition contractuelle à la dette ; les fonds regroupent une ou plusieurs expositions sous-jacentes.",
        },
        {
          en: "Liquidity, fees, taxes, currency, duration, credit, concentration and structure can all change the practical risk of an instrument.",
          fr: "Liquidité, frais, fiscalité, devise, duration, crédit, concentration et structure peuvent tous modifier le risque pratique d’un instrument.",
        },
        {
          en: "There is no universally superior instrument; suitability depends on objective, horizon, risk capacity and the rest of the portfolio.",
          fr: "Il n’existe pas d’instrument universellement supérieur ; l’adéquation dépend de l’objectif, de l’horizon, de la capacité de risque et du reste du portefeuille.",
        },
      ],
      explanation: {
        Beginner: {
          en: "A stock is a direct bet on an owner's share of a company. A bond is a loan to an issuer. A fund is a wrapper that may contain many stocks, bonds or other assets. The right question is not 'Which one is best?' but 'What exposure, cash flows and risks does this instrument give me?'",
          fr: "Une action est une participation directe dans une entreprise. Une obligation est un prêt à un émetteur. Un fonds est une enveloppe qui peut contenir de nombreuses actions, obligations ou autres actifs. La bonne question n’est pas « lequel est le meilleur ? », mais « quelle exposition, quels cash flows et quels risques cet instrument me donne-t-il ? »",
        },
        Intermediate: {
          en: "Instrument selection maps portfolio objectives to return drivers. Equity increases exposure to business growth and valuation risk; bonds can add contractual income and rate/credit exposure; diversified funds can efficiently package beta or active strategy, with fees and structure becoming part of the return equation.",
          fr: "La sélection d’instruments relie les objectifs du portefeuille aux moteurs de rendement. L’equity augmente l’exposition à la croissance des entreprises et au risque de valorisation ; les obligations ajoutent revenu contractuel et risque taux/crédit ; les fonds diversifiés peuvent fournir efficacement du beta ou une stratégie active, avec frais et structure intégrés dans l’équation de rendement.",
        },
        Professional: {
          en: "Portfolio construction treats securities as bundles of factor, liquidity, cash-flow and optionality exposures. A nominally diversified vehicle may embed duration, convexity, credit beta, equity beta, currency or leverage. Security selection should therefore be exposure-aware and implementation-aware.",
          fr: "La construction de portefeuille traite les titres comme des ensembles d’expositions factorielles, de liquidité, de cash flows et d’optionalité. Un véhicule apparemment diversifié peut embarquer duration, convexité, beta crédit, beta equity, devise ou levier. La sélection doit donc intégrer les expositions et la qualité d’implémentation.",
        },
      },
      comparison: {
        title: { en: "Instrument comparison", fr: "Comparaison des instruments" },
        headers: [
          { en: "Dimension", fr: "Dimension" },
          { en: "Stock", fr: "Action / Stock" },
          { en: "Bond", fr: "Obligation / Bond" },
          { en: "ETF / fund", fr: "ETF / fonds" },
        ],
        rows: [
          { cells: [
            { en: "Underlying claim", fr: "Créance sous-jacente" },
            { en: "Direct equity ownership", fr: "Propriété equity directe" },
            { en: "Debt claim", fr: "Créance de dette" },
            { en: "Claim on pooled portfolio structure", fr: "Part dans une structure de portefeuille mutualisé" },
          ]},
          { cells: [
            { en: "Main return sources", fr: "Principales sources de rendement" },
            { en: "Price change + dividends", fr: "Variation de prix + dividendes" },
            { en: "Coupon + price change + principal repayment", fr: "Coupon + variation de prix + remboursement du principal" },
            { en: "Returns of holdings minus fees/frictions", fr: "Rendement des actifs détenus moins frais/frictions" },
          ]},
          { cells: [
            { en: "Key risks", fr: "Risques clés" },
            { en: "Business + valuation + market", fr: "Entreprise + valorisation + marché" },
            { en: "Rates + credit + liquidity", fr: "Taux + crédit + liquidité" },
            { en: "Depends on holdings + structure + tracking", fr: "Dépend des actifs + structure + tracking" },
          ]},
          { cells: [
            { en: "Diversification", fr: "Diversification" },
            { en: "Single company unless portfolio built", fr: "Une entreprise sauf portefeuille construit" },
            { en: "Single issuer unless portfolio built", fr: "Un émetteur sauf portefeuille construit" },
            { en: "Can be broad or highly concentrated", fr: "Peut être large ou très concentré" },
          ]},
        ],
      },
    },
    {
      id: "capital-structure",
      kicker: { en: "09 · PUTTING IT TOGETHER", fr: "09 · RELIER TOUT ENSEMBLE" },
      title: {
        en: "Capital structure, default and the investor's place in the stack",
        fr: "Structure du capital, défaut et place de l’investisseur dans la hiérarchie",
      },
      coreFacts: [
        {
          en: "Companies can finance themselves with combinations of debt, preferred securities and common equity.",
          fr: "Les entreprises peuvent se financer par combinaison de dette, titres préférentiels / preferred securities et actions ordinaires.",
        },
        {
          en: "More debt can increase financial leverage: equity holders may benefit more when enterprise outcomes are strong but can also absorb greater downside volatility.",
          fr: "Davantage de dette peut accroître le levier financier / financial leverage : les actionnaires peuvent davantage bénéficier de bons résultats mais aussi subir une volatilité baissière plus forte.",
        },
        {
          en: "Credit analysis asks whether contractual debt payments can be met; equity analysis focuses on the residual value after all claims and reinvestment needs.",
          fr: "L’analyse crédit demande si les paiements contractuels de dette peuvent être honorés ; l’analyse equity se concentre sur la valeur résiduelle après toutes les créances et besoins de réinvestissement.",
        },
        {
          en: "Funds do not remove the economics of the underlying assets: a bond ETF still contains bond risk and an equity ETF still contains equity risk.",
          fr: "Les fonds ne suppriment pas l’économie des actifs sous-jacents : un ETF obligataire contient toujours du risque obligataire et un ETF actions toujours du risque equity.",
        },
      ],
      explanation: {
        Beginner: {
          en: "Picture the company as a stack. Cash generated by the business must first support operating needs and contractual obligations. Creditors have claims defined by contracts. Common shareholders own what is left. This is why the same company can be a very different investment depending on whether you own its stock or its bond.",
          fr: "Imagine l’entreprise comme une pile / capital stack. Le cash généré doit d’abord soutenir l’activité et les obligations contractuelles. Les créanciers ont des droits définis par contrat. Les actionnaires ordinaires possèdent ce qui reste. C’est pourquoi la même entreprise peut représenter un investissement très différent selon que tu détiens son action ou son obligation.",
        },
        Intermediate: {
          en: "Capital structure changes how enterprise value is distributed across securities. Debt service creates fixed claims, while equity captures residual outcomes. Leverage therefore magnifies the sensitivity of equity value to changes in enterprise value, especially when debt is large relative to the business.",
          fr: "La structure du capital modifie la répartition de l’enterprise value entre titres. Le service de la dette crée des créances fixes, tandis que l’equity capte le résultat résiduel. Le levier amplifie donc la sensibilité de l’equity value aux variations de l’enterprise value, surtout lorsque la dette est élevée par rapport à la taille de l’activité.",
        },
        Professional: {
          en: "Security analysis is claim-specific. Structural and contractual subordination, secured versus unsecured status, maturity walls, covenant protection, refinancing access and recovery value shape credit. Equity behaves like a residual leveraged claim on enterprise value, with dilution and capital allocation affecting per-share outcomes.",
          fr: "L’analyse doit être spécifique à la créance. Subordination structurelle et contractuelle, dette garantie/non garantie, mur de maturité / maturity wall, protection des covenants, accès au refinancement et valeur de recovery façonnent le crédit. L’equity agit comme une créance résiduelle à effet de levier sur l’enterprise value, avec dilution et allocation du capital influençant la valeur par action.",
        },
      },
      marketConnection: {
        en: "The same macro shock can affect securities differently: higher rates may pressure long-duration equities, lower fixed-rate bond prices and raise refinancing costs for leveraged issuers at the same time.",
        fr: "Un même choc macro peut toucher les titres différemment : une hausse des taux peut peser sur les actions longue duration, faire baisser le prix des obligations à taux fixe et augmenter le coût de refinancement des émetteurs endettés.",
      },
      vocabulary: [
        {
          en: "Capital structure",
          fr: "structure du capital / capital structure",
          definition: {
            en: "The mix and priority of financing claims used by a company.",
            fr: "Composition et priorité des sources de financement utilisées par une entreprise.",
          },
        },
        {
          en: "Recovery",
          fr: "taux de recouvrement / recovery",
          definition: {
            en: "Value creditors recover after a default or restructuring, expressed under the chosen convention.",
            fr: "Valeur récupérée par les créanciers après défaut ou restructuration selon la convention choisie.",
          },
        },
      ],
    },
  ],
  quiz: [
    {
      id: "q1",
      conceptKey: "equity-vs-debt",
      question: {
        en: "Which statement best distinguishes a common stock from a bond?",
        fr: "Quelle proposition distingue le mieux une action ordinaire d’une obligation ?",
      },
      options: [
        { id: "a", label: { en: "A stock is a residual ownership claim; a bond is contractual debt", fr: "Une action est une créance résiduelle de propriété ; une obligation est une dette contractuelle" } },
        { id: "b", label: { en: "A stock guarantees a coupon; a bond guarantees dividends", fr: "Une action garantit un coupon ; une obligation garantit des dividendes" } },
        { id: "c", label: { en: "They are legally identical claims", fr: "Ce sont juridiquement les mêmes créances" } },
        { id: "d", label: { en: "Bondholders are always paid after common shareholders", fr: "Les obligataires sont toujours payés après les actionnaires ordinaires" } },
      ],
      correctOption: "a",
      explanation: {
        en: "Common equity is a residual ownership interest, while a bond represents contractual debt with defined terms and generally higher priority.",
        fr: "L’action ordinaire est une participation résiduelle ; l’obligation est une dette contractuelle aux modalités définies et généralement prioritaire.",
      },
    },
    {
      id: "q2",
      conceptKey: "market-cap",
      question: {
        en: "A company has 400 million shares outstanding at $25 per share. What is its market capitalization?",
        fr: "Une entreprise possède 400 millions d’actions en circulation à 25 $ par action. Quelle est sa capitalisation boursière ?",
      },
      options: [
        { id: "a", label: { en: "$1 billion", fr: "1 milliard $" } },
        { id: "b", label: { en: "$10 billion", fr: "10 milliards $" } },
        { id: "c", label: { en: "$100 billion", fr: "100 milliards $" } },
        { id: "d", label: { en: "$425 million", fr: "425 millions $" } },
      ],
      correctOption: "b",
      explanation: {
        en: "$25 × 400 million = $10 billion.",
        fr: "25 $ × 400 millions = 10 milliards $.",
      },
    },
    {
      id: "q3",
      conceptKey: "stock-total-return",
      question: {
        en: "You buy a stock at $40, sell at $44 and receive a $1 dividend. What is the simple total return?",
        fr: "Tu achètes une action à 40 $, la revends à 44 $ et reçois 1 $ de dividende. Quel est le rendement total simple ?",
      },
      options: [
        { id: "a", label: { en: "10.0%", fr: "10,0 %" } },
        { id: "b", label: { en: "11.0%", fr: "11,0 %" } },
        { id: "c", label: { en: "12.5%", fr: "12,5 %" } },
        { id: "d", label: { en: "15.0%", fr: "15,0 %" } },
      ],
      correctOption: "c",
      explanation: {
        en: "($44 − $40 + $1) ÷ $40 = 12.5%.",
        fr: "(44 − 40 + 1) ÷ 40 = 12,5 %.",
      },
    },
    {
      id: "q4",
      conceptKey: "bond-coupon",
      question: {
        en: "A $1,000 face-value bond has a 6% annual coupon. How much annual coupon interest does it pay?",
        fr: "Une obligation de nominal 1 000 $ a un coupon annuel de 6 %. Quel montant de coupon annuel verse-t-elle ?",
      },
      options: [
        { id: "a", label: { en: "$6", fr: "6 $" } },
        { id: "b", label: { en: "$30", fr: "30 $" } },
        { id: "c", label: { en: "$60", fr: "60 $" } },
        { id: "d", label: { en: "$600", fr: "600 $" } },
      ],
      correctOption: "c",
      explanation: {
        en: "$1,000 × 6% = $60 annual coupon.",
        fr: "1 000 $ × 6 % = 60 $ de coupon annuel.",
      },
    },
    {
      id: "q5",
      conceptKey: "bond-price-yield",
      question: {
        en: "All else equal, what generally happens to the price of an existing fixed-rate bond when the market-required yield rises?",
        fr: "Toutes choses égales par ailleurs, que devient généralement le prix d’une obligation à taux fixe existante lorsque le rendement exigé par le marché augmente ?",
      },
      options: [
        { id: "a", label: { en: "It rises", fr: "Il augmente" } },
        { id: "b", label: { en: "It falls", fr: "Il baisse" } },
        { id: "c", label: { en: "It must stay exactly at par", fr: "Il doit rester exactement au pair" } },
        { id: "d", label: { en: "The coupon rate changes automatically", fr: "Le taux de coupon change automatiquement" } },
      ],
      correctOption: "b",
      explanation: {
        en: "Existing fixed cash flows become less valuable when the discount yield investors require rises, so price generally falls.",
        fr: "Les cash flows fixes existants valent moins lorsque le yield d’actualisation exigé augmente ; le prix baisse donc généralement.",
      },
    },
    {
      id: "q6",
      conceptKey: "etf-structure",
      question: {
        en: "Which statement about ETFs is correct?",
        fr: "Quelle proposition concernant les ETF est correcte ?",
      },
      options: [
        { id: "a", label: { en: "Every ETF is passive and broadly diversified", fr: "Tous les ETF sont passifs et largement diversifiés" } },
        { id: "b", label: { en: "An ETF is a fund wrapper whose risk depends on its underlying exposures and structure", fr: "Un ETF est une enveloppe de fonds dont le risque dépend des expositions sous-jacentes et de sa structure" } },
        { id: "c", label: { en: "ETF shares cannot trade during the day", fr: "Les parts d’ETF ne peuvent pas se négocier en séance" } },
        { id: "d", label: { en: "An ETF cannot hold bonds", fr: "Un ETF ne peut pas détenir d’obligations" } },
      ],
      correctOption: "b",
      explanation: {
        en: "ETF is a vehicle type, not a guarantee of diversification, passivity or low risk.",
        fr: "ETF désigne un type de véhicule, pas une garantie de diversification, de gestion passive ou de faible risque.",
      },
    },
    {
      id: "q7",
      conceptKey: "diversification",
      question: {
        en: "What can diversification reduce most directly?",
        fr: "Quel risque la diversification peut-elle réduire le plus directement ?",
      },
      options: [
        { id: "a", label: { en: "All market risk", fr: "Tout le risque de marché" } },
        { id: "b", label: { en: "Security-specific idiosyncratic risk", fr: "Le risque spécifique / idiosyncratic d’un titre" } },
        { id: "c", label: { en: "Every possible loss", fr: "Toute perte possible" } },
        { id: "d", label: { en: "Inflation permanently", fr: "L’inflation de manière permanente" } },
      ],
      correctOption: "b",
      explanation: {
        en: "Holding imperfectly correlated securities can reduce security-specific risk, but broad systematic risk remains.",
        fr: "Détenir des titres imparfaitement corrélés peut réduire le risque spécifique, mais le risque systématique global demeure.",
      },
    },
    {
      id: "q8",
      conceptKey: "fund-expense-ratio",
      question: {
        en: "A fund has a 0.20% expense ratio and you invest $20,000. What is the simple approximate annual expense before portfolio-value changes?",
        fr: "Un fonds a un expense ratio de 0,20 % et tu investis 20 000 $. Quelle est l’estimation simple des frais annuels avant variation de valeur du portefeuille ?",
      },
      options: [
        { id: "a", label: { en: "$4", fr: "4 $" } },
        { id: "b", label: { en: "$20", fr: "20 $" } },
        { id: "c", label: { en: "$40", fr: "40 $" } },
        { id: "d", label: { en: "$400", fr: "400 $" } },
      ],
      correctOption: "c",
      explanation: {
        en: "$20,000 × 0.20% = about $40.",
        fr: "20 000 $ × 0,20 % ≈ 40 $.",
      },
    },
  ],
  interviewPrompt: {
    question: {
      en: "Compare a stock, a bond and an ETF. Then explain how a rise in interest rates could affect each.",
      fr: "Compare une action / stock, une obligation / bond et un ETF. Puis explique comment une hausse des taux d’intérêt peut affecter chacun.",
    },
    framework: [
      {
        en: "Define the claims: equity ownership, contractual debt, pooled fund exposure.",
        fr: "Définir les créances : propriété equity, dette contractuelle, exposition mutualisée via fonds.",
      },
      {
        en: "Explain return sources: price/dividends for stocks, coupon/price/principal for bonds, underlying portfolio return minus costs for funds.",
        fr: "Expliquer les sources de rendement : prix/dividendes pour l’action, coupon/prix/principal pour l’obligation, rendement du portefeuille sous-jacent moins les coûts pour le fonds.",
      },
      {
        en: "State that higher yields generally lower prices of existing fixed-rate bonds, all else equal.",
        fr: "Indiquer qu’une hausse des yields réduit généralement le prix des obligations à taux fixe existantes, toutes choses égales par ailleurs.",
      },
      {
        en: "For stocks, avoid a mechanical claim: higher rates can raise discount rates and financing costs, but the effect depends on earnings, growth expectations and sector.",
        fr: "Pour les actions, éviter une réponse mécanique : des taux plus élevés peuvent augmenter discount rates et coûts de financement, mais l’effet dépend des bénéfices, anticipations de croissance et du secteur.",
      },
      {
        en: "For an ETF, trace through to what it actually owns: bond ETF, equity ETF or mixed portfolio.",
        fr: "Pour un ETF, revenir aux actifs réellement détenus : ETF obligataire, ETF actions ou portefeuille mixte.",
      },
    ],
    sample: {
      en: "A stock is a residual ownership claim on a company; a bond is contractual debt; an ETF is a pooled vehicle whose risk comes from its underlying holdings and structure. A stock investor earns from price changes and possibly dividends, while a bond investor receives contractual coupons and principal subject to credit risk. If market yields rise, an existing fixed-rate bond generally falls in price. Stocks may also face pressure because discount rates and financing costs can rise, but the response is not automatic because earnings expectations and sector sensitivity matter. For an ETF, I would first identify the underlying assets: a bond ETF should reflect bond-rate exposure, while an equity ETF should reflect the characteristics of its stock portfolio.",
      fr: "Une action / stock est une créance résiduelle de propriété sur une entreprise ; une obligation / bond est une dette contractuelle ; un ETF est un véhicule mutualisé dont le risque provient des actifs sous-jacents et de sa structure. L’investisseur en actions gagne via la variation du prix et éventuellement les dividendes, tandis que l’investisseur obligataire reçoit coupons et principal sous réserve du risque de crédit. Si les yields de marché montent, le prix d’une obligation à taux fixe existante baisse généralement. Les actions peuvent aussi subir une pression car les taux d’actualisation et coûts de financement augmentent, mais l’effet n’est pas automatique : attentes de bénéfices et sensibilité sectorielle comptent. Pour un ETF, je regarde d’abord ce qu’il détient réellement : un ETF obligataire reflète une exposition aux taux et au crédit, tandis qu’un ETF actions reflète les caractéristiques du portefeuille d’actions.",
    },
  },
};


export const moneyBankingCentralBanksLesson: FinanceLesson = {
  slug: "year-1-money-banking-central-banks",
  year: { en: "Year 1 · Foundations", fr: "Année 1 · Fondations" },
  domain: { en: "Macro & Economics", fr: "Macro & économie / Macro & Economics" },
  title: {
    en: "Money, Banking & Central Banks",
    fr: "Monnaie, banques & banques centrales / Money, Banking & Central Banks",
  },
  subtitle: {
    en: "Understand what money is, how commercial banks create deposits through lending, why reserves matter, how central banks influence financial conditions, and how policy moves transmit into bonds, equities, credit, FX and the real economy.",
    fr: "Comprendre ce qu’est la monnaie, comment les banques commerciales créent des dépôts en accordant des crédits, pourquoi les réserves bancaires sont importantes, comment les banques centrales influencent les conditions financières et comment leurs décisions se transmettent aux obligations, actions, au crédit, au FX et à l’économie réelle.",
  },
  duration: { en: "75–95 min", fr: "75–95 min" },
  prerequisites: [
    {
      en: "Financial System & Market Structure",
      fr: "Système financier & structure de marché / Financial System & Market Structure",
    },
    {
      en: "Stocks, Bonds, ETFs & Funds",
      fr: "Actions / Stocks, obligations / Bonds, ETF & fonds / Funds",
    },
  ],
  objectives: [
    {
      en: "Distinguish cash, bank deposits, central-bank reserves and broader measures of money.",
      fr: "Distinguer espèces / cash, dépôts bancaires / bank deposits, réserves de banque centrale / central-bank reserves et agrégats monétaires plus larges.",
    },
    {
      en: "Explain how bank lending can create deposits without relying on the simplistic idea that banks merely lend out existing deposits one-for-one.",
      fr: "Expliquer comment le crédit bancaire peut créer des dépôts sans utiliser l’idée trop simpliste selon laquelle les banques prêteraient uniquement les dépôts existants un pour un.",
    },
    {
      en: "Read a basic commercial-bank balance sheet and identify capital, liquidity and funding constraints.",
      fr: "Lire un bilan bancaire simple et identifier les contraintes de capital, de liquidité et de financement / funding.",
    },
    {
      en: "Explain how a policy rate affects short-term market rates and then broader financial conditions.",
      fr: "Expliquer comment un taux directeur / policy rate influence les taux de marché à court terme puis les conditions financières plus larges.",
    },
    {
      en: "Connect inflation, nominal rates and real rates.",
      fr: "Relier inflation, taux nominaux / nominal rates et taux réels / real rates.",
    },
    {
      en: "Describe why monetary-policy changes can affect government bonds, credit, equities, banks and currencies differently.",
      fr: "Décrire pourquoi les changements de politique monétaire peuvent affecter différemment obligations souveraines, crédit, actions, banques et devises.",
    },
  ],
  overviewFlow: {
    title: {
      en: "How monetary policy reaches markets and the economy",
      fr: "Comment la politique monétaire se transmet aux marchés et à l’économie",
    },
    steps: [
      {
        title: { en: "Central bank", fr: "Banque centrale" },
        detail: { en: "Policy rate · reserves · balance sheet", fr: "Taux directeur · réserves · bilan" },
      },
      {
        title: { en: "Money markets & banks", fr: "Marchés monétaires & banques" },
        detail: { en: "Funding · lending · deposit rates", fr: "Funding · crédit · taux de dépôt" },
      },
      {
        title: { en: "Financial conditions", fr: "Conditions financières" },
        detail: { en: "Bond yields · credit · FX · equity valuations", fr: "Yields obligataires · crédit · FX · valorisations actions" },
      },
      {
        title: { en: "Real economy", fr: "Économie réelle" },
        detail: { en: "Consumption · investment · hiring · inflation", fr: "Consommation · investissement · emploi · inflation" },
      },
    ],
  },
  sections: [
    {
      id: "what-is-money",
      kicker: { en: "01 · WHAT MONEY REALLY IS", fr: "01 · CE QU’EST VRAIMENT LA MONNAIE" },
      title: {
        en: "Cash, deposits, reserves and the functions of money",
        fr: "Espèces, dépôts, réserves et fonctions de la monnaie",
      },
      coreFacts: [
        {
          en: "Money is commonly described by three functions: medium of exchange, unit of account and store of value.",
          fr: "La monnaie est généralement décrite par trois fonctions : moyen d’échange / medium of exchange, unité de compte / unit of account et réserve de valeur / store of value.",
        },
        {
          en: "Physical currency and commercial-bank deposits are both used by households and firms as money, but they are different liabilities issued by different institutions.",
          fr: "Les espèces et les dépôts bancaires commerciaux sont tous deux utilisés comme monnaie par ménages et entreprises, mais ce sont des passifs différents émis par des institutions différentes.",
        },
        {
          en: "Central-bank reserves are generally held by eligible financial institutions at the central bank; households do not normally use reserves directly for everyday payments.",
          fr: "Les réserves de banque centrale / central-bank reserves sont généralement détenues par des institutions financières éligibles auprès de la banque centrale ; les ménages ne les utilisent normalement pas directement pour leurs paiements quotidiens.",
        },
        {
          en: "Monetary aggregates classify different forms of money according to liquidity and institutional definitions; definitions can differ by jurisdiction.",
          fr: "Les agrégats monétaires classent différentes formes de monnaie selon leur liquidité et les définitions institutionnelles ; ces définitions peuvent varier selon les juridictions.",
        },
      ],
      explanation: {
        Beginner: {
          en: "The dollars in your checking account feel like cash, but technically they are a claim on your bank. The bank owes you that deposit. Separately, the bank may hold reserves at the central bank. Those reserves are part of the payment plumbing between banks, while your deposit is the money you use in daily life.",
          fr: "Les dollars sur ton compte courant ressemblent à du cash, mais techniquement ce sont une créance sur ta banque : la banque te doit ce dépôt. De son côté, la banque peut détenir des réserves auprès de la banque centrale. Ces réserves servent à la plomberie des paiements entre banques, alors que ton dépôt est la monnaie que tu utilises au quotidien.",
        },
        Intermediate: {
          en: "The monetary system is layered. Central-bank money includes currency and reserve balances. Commercial-bank money consists largely of deposits created on bank balance sheets. Convertibility between these layers, supported by payment systems, regulation and confidence, allows users to treat deposits as money.",
          fr: "Le système monétaire est organisé en couches. La monnaie de banque centrale comprend billets et réserves. La monnaie bancaire commerciale est constituée en grande partie de dépôts créés dans les bilans bancaires. La convertibilité entre ces couches, soutenue par les systèmes de paiement, la réglementation et la confiance, permet aux utilisateurs de traiter les dépôts comme de la monnaie.",
        },
        Professional: {
          en: "Money is best understood as a hierarchy of liquid liabilities distinguished by issuer, convertibility, settlement finality and credit risk. Central-bank liabilities sit at the core of interbank settlement, while deposit money is a private-sector liability whose par convertibility depends on bank solvency, liquidity arrangements, deposit protection frameworks and central-bank backstops.",
          fr: "La monnaie peut être comprise comme une hiérarchie de passifs liquides distingués par l’émetteur, la convertibilité, la finalité du règlement / settlement finality et le risque de crédit. Les passifs de banque centrale se situent au cœur du règlement interbancaire, tandis que les dépôts sont des passifs privés dont la convertibilité à par dépend de la solvabilité bancaire, de la liquidité, des mécanismes de protection des dépôts et des dispositifs de banque centrale.",
        },
      },
      comparison: {
        title: { en: "Different forms of money", fr: "Différentes formes de monnaie" },
        headers: [
          { en: "Form", fr: "Forme" },
          { en: "Issuer", fr: "Émetteur" },
          { en: "Typical holder", fr: "Détenteur habituel" },
          { en: "Main use", fr: "Utilisation principale" },
        ],
        rows: [
          { cells: [
            { en: "Currency", fr: "Espèces / currency" },
            { en: "Central bank", fr: "Banque centrale" },
            { en: "Public", fr: "Public" },
            { en: "Payments / store of value", fr: "Paiements / réserve de valeur" },
          ]},
          { cells: [
            { en: "Bank deposit", fr: "Dépôt bancaire / bank deposit" },
            { en: "Commercial bank", fr: "Banque commerciale" },
            { en: "Households & firms", fr: "Ménages & entreprises" },
            { en: "Payments / saving", fr: "Paiements / épargne" },
          ]},
          { cells: [
            { en: "Reserve balance", fr: "Réserve / reserve balance" },
            { en: "Central bank", fr: "Banque centrale" },
            { en: "Eligible financial institutions", fr: "Institutions financières éligibles" },
            { en: "Interbank settlement / liquidity", fr: "Règlement interbancaire / liquidité" },
          ]},
        ],
      },
      vocabulary: [
        {
          en: "Unit of account",
          fr: "unité de compte / unit of account",
          definition: {
            en: "The standard in which prices, contracts and accounting values are expressed.",
            fr: "Unité standard dans laquelle sont exprimés prix, contrats et valeurs comptables.",
          },
        },
        {
          en: "Monetary aggregate",
          fr: "agrégat monétaire / monetary aggregate",
          definition: {
            en: "A statistical measure grouping selected forms of money according to an official definition.",
            fr: "Mesure statistique regroupant certaines formes de monnaie selon une définition officielle.",
          },
        },
      ],
    },
    {
      id: "bank-balance-sheet",
      kicker: { en: "02 · BANK BALANCE SHEETS", fr: "02 · BILAN D’UNE BANQUE" },
      title: {
        en: "Loans are assets. Deposits are liabilities.",
        fr: "Les prêts sont des actifs. Les dépôts sont des passifs.",
      },
      coreFacts: [
        {
          en: "For a commercial bank, customer loans are assets because borrowers owe the bank money.",
          fr: "Pour une banque commerciale, les prêts aux clients sont des actifs car les emprunteurs doivent de l’argent à la banque.",
        },
        {
          en: "Customer deposits are liabilities because the bank owes those balances to depositors.",
          fr: "Les dépôts des clients sont des passifs car la banque doit ces soldes aux déposants.",
        },
        {
          en: "Bank equity or capital absorbs losses before depositors and senior creditors under the applicable capital structure and legal framework.",
          fr: "Les capitaux propres / bank capital absorbent les pertes avant déposants et créanciers seniors selon la structure du capital et le cadre juridique applicable.",
        },
        {
          en: "A bank can be solvent but illiquid, or liquid but economically weak; solvency and liquidity are related but different.",
          fr: "Une banque peut être solvable mais illiquide, ou liquide mais économiquement fragile ; solvabilité et liquidité sont liées mais différentes.",
        },
      ],
      explanation: {
        Beginner: {
          en: "If a bank lends you $100,000 for a mortgage, that loan is valuable to the bank because you owe it future payments. On the other side, if you keep $10,000 in your checking account, the bank owes you $10,000, so your deposit is one of its liabilities.",
          fr: "Si une banque te prête 100 000 $ pour un crédit immobilier, ce prêt est un actif pour la banque car tu lui dois des paiements futurs. À l’inverse, si tu conserves 10 000 $ sur ton compte courant, la banque te doit 10 000 $ : ton dépôt est donc l’un de ses passifs.",
        },
        Intermediate: {
          en: "Bank balance sheets transform funding into earning assets. Profitability depends on asset yields, funding costs, credit losses, operating expenses and capital intensity. Liquidity management ensures the bank can meet withdrawals, payments, collateral calls and maturing obligations.",
          fr: "Le bilan bancaire transforme le financement / funding en actifs rémunérateurs. La rentabilité dépend du rendement des actifs, du coût du funding, des pertes de crédit, des charges opérationnelles et de l’intensité en capital. La gestion de liquidité permet de faire face aux retraits, paiements, appels de collatéral et échéances.",
        },
        Professional: {
          en: "Banking is balance-sheet intermediation constrained by capital, liquidity, funding stability, collateral availability, asset quality and regulation. Net interest income reflects repricing mismatches across assets and liabilities, while economic value can be exposed to duration gaps, deposit beta, credit migration and wholesale funding conditions.",
          fr: "La banque est une activité d’intermédiation de bilan contrainte par le capital, la liquidité, la stabilité du funding, la disponibilité du collatéral, la qualité des actifs et la réglementation. Le revenu net d’intérêt / net interest income reflète les écarts de repricing entre actifs et passifs, tandis que la valeur économique peut être exposée au gap de duration, au deposit beta, à la migration du crédit et aux conditions de funding wholesale.",
        },
      },
      formula: {
        label: { en: "Basic balance-sheet identity", fr: "Identité de bilan / Balance-sheet identity" },
        expression: "Assets = Liabilities + Equity",
        explanation: {
          en: "Every bank balance sheet must balance. A loss reduces asset value and, before other adjustments, reduces equity.",
          fr: "Tout bilan bancaire doit s’équilibrer. Une perte réduit la valeur des actifs et, avant autres ajustements, réduit les capitaux propres.",
        },
        workedExample: {
          en: "If assets are $120 and liabilities are $110, equity is $10. A $6 loss on assets reduces equity to about $4 if nothing else changes.",
          fr: "Si les actifs valent 120 et les passifs 110, les capitaux propres valent 10. Une perte de 6 sur les actifs réduit les capitaux propres à environ 4 si rien d’autre ne change.",
        },
      },
      vocabulary: [
        {
          en: "Solvency",
          fr: "solvabilité / solvency",
          definition: {
            en: "The ability of an institution to absorb losses and maintain positive economic or regulatory capital under the relevant framework.",
            fr: "Capacité d’une institution à absorber les pertes et maintenir un capital économique ou réglementaire suffisant selon le cadre applicable.",
          },
        },
        {
          en: "Liquidity",
          fr: "liquidité / liquidity",
          definition: {
            en: "The ability to meet cash and settlement obligations when they fall due.",
            fr: "Capacité à honorer les obligations de cash et de règlement à leur échéance.",
          },
        },
      ],
    },
    {
      id: "deposit-creation",
      kicker: { en: "03 · HOW BANK LENDING CREATES DEPOSITS", fr: "03 · COMMENT LE CRÉDIT CRÉE DES DÉPÔTS" },
      title: {
        en: "Banks do not simply pass existing deposits from one customer to another",
        fr: "Les banques ne se contentent pas de redistribuer des dépôts déjà existants",
      },
      coreFacts: [
        {
          en: "When a bank grants a new loan and credits the borrower's account, it can create a new bank asset and a new deposit liability simultaneously.",
          fr: "Lorsqu’une banque accorde un nouveau prêt et crédite le compte de l’emprunteur, elle peut créer simultanément un nouvel actif bancaire et un nouveau dépôt au passif.",
        },
        {
          en: "This does not mean banks can create unlimited money: capital, liquidity, funding, credit risk, regulation, profitability and loan demand constrain lending.",
          fr: "Cela ne signifie pas que les banques peuvent créer de la monnaie sans limite : capital, liquidité, funding, risque de crédit, réglementation, rentabilité et demande de crédit limitent les prêts.",
        },
        {
          en: "If the borrower spends the deposit and funds move to another bank, reserve or wholesale-funding needs can shift between banks.",
          fr: "Si l’emprunteur dépense le dépôt et que les fonds partent vers une autre banque, les besoins en réserves ou en financement wholesale peuvent se déplacer entre banques.",
        },
        {
          en: "The textbook money-multiplier story can be useful as a simplified historical model but should not be treated as a literal mechanical description of modern bank lending.",
          fr: "Le modèle scolaire du multiplicateur monétaire / money multiplier peut être utile comme simplification historique, mais ne doit pas être traité comme une description mécanique exacte du crédit bancaire moderne.",
        },
      ],
      explanation: {
        Beginner: {
          en: "Suppose Bank A approves a $5,000 loan. It can record a $5,000 loan asset and credit the borrower's deposit account by $5,000. The borrower now has a new deposit to spend, while also owing the bank $5,000. The bank did not need to take exactly $5,000 from another customer's checking account first.",
          fr: "Supposons que la Banque A accorde un prêt de 5 000 $. Elle peut enregistrer un actif « prêt » de 5 000 $ et créditer le compte du client de 5 000 $. Le client dispose alors d’un nouveau dépôt à dépenser tout en devant 5 000 $ à la banque. La banque n’a pas eu besoin de retirer exactement 5 000 $ du compte d’un autre client au préalable.",
        },
        Intermediate: {
          en: "Credit creation expands both sides of the banking system's balance sheet. The subsequent use of deposits determines interbank settlement flows. Banks therefore manage lending jointly with capital planning, liquidity buffers, deposit strategy, secured and unsecured funding and central-bank facilities.",
          fr: "La création de crédit augmente simultanément les deux côtés du bilan bancaire. L’utilisation ultérieure des dépôts détermine les flux de règlement interbancaire. Les banques gèrent donc le crédit avec leur planification du capital, les buffers de liquidité, la stratégie de dépôts, le funding garanti/non garanti et les facilités de banque centrale.",
        },
        Professional: {
          en: "Endogenous money creation is balance-sheet constrained rather than reserve-multiplier constrained in a simple mechanical sense. Marginal lending depends on expected risk-adjusted return on capital, funding transfer prices, liquidity metrics, borrower demand, underwriting standards, collateral, supervisory constraints and the policy-rate environment.",
          fr: "La création monétaire endogène est contrainte par le bilan plutôt que par un multiplicateur de réserves mécanique. Le crédit marginal dépend du rendement ajusté du risque sur capital, des funding transfer prices, métriques de liquidité, demande des emprunteurs, standards de crédit, collatéral, contraintes prudentielles et environnement de taux directeurs.",
        },
      },
      example: {
        en: "At origination: +$5,000 loan asset and +$5,000 customer deposit liability. If the customer later pays someone at another bank, Bank A may need to transfer reserves or obtain funding to settle the payment.",
        fr: "À l’octroi : +5 000 $ d’actif de prêt et +5 000 $ de dépôt client au passif. Si le client paie ensuite quelqu’un dans une autre banque, la Banque A peut devoir transférer des réserves ou obtenir du funding pour régler le paiement.",
      },
      marketConnection: {
        en: "Tighter bank lending standards can slow credit creation even if central-bank reserves are abundant, which is why loan surveys and bank funding conditions matter to macro investors.",
        fr: "Des standards de crédit plus stricts peuvent ralentir la création de crédit même si les réserves bancaires sont abondantes ; c’est pourquoi les enquêtes de crédit et les conditions de funding bancaire intéressent les investisseurs macro.",
      },
      vocabulary: [
        {
          en: "Credit creation",
          fr: "création de crédit / credit creation",
          definition: {
            en: "The expansion of credit claims, often accompanied by creation of bank deposits when commercial banks lend.",
            fr: "Expansion des créances de crédit, souvent accompagnée de création de dépôts lorsque les banques commerciales prêtent.",
          },
        },
        {
          en: "Funding",
          fr: "financement bancaire / funding",
          definition: {
            en: "The liabilities and capital sources used to finance a bank's assets.",
            fr: "Passifs et sources de capital utilisés pour financer les actifs d’une banque.",
          },
        },
      ],
    },
    {
      id: "reserves-settlement",
      kicker: { en: "04 · RESERVES & PAYMENT PLUMBING", fr: "04 · RÉSERVES & PLOMBERIE DES PAIEMENTS" },
      title: {
        en: "Why reserves matter even though households do not spend them",
        fr: "Pourquoi les réserves comptent même si les ménages ne les dépensent pas",
      },
      coreFacts: [
        {
          en: "Banks use central-bank money to settle many obligations with each other.",
          fr: "Les banques utilisent la monnaie de banque centrale pour régler de nombreuses obligations entre elles.",
        },
        {
          en: "Reserve balances can support settlement, liquidity management and implementation of monetary policy.",
          fr: "Les réserves peuvent soutenir le règlement / settlement, la gestion de liquidité et la mise en œuvre de la politique monétaire.",
        },
        {
          en: "The quantity of reserves and the framework used to remunerate or supply them influence short-term money-market conditions.",
          fr: "La quantité de réserves et le cadre utilisé pour les rémunérer ou les fournir influencent les conditions du marché monétaire à court terme.",
        },
        {
          en: "A payment from Bank A to Bank B can shift reserves between banks even when total reserves in the banking system are unchanged.",
          fr: "Un paiement de la Banque A vers la Banque B peut déplacer les réserves entre banques même si le total des réserves du système bancaire reste inchangé.",
        },
      ],
      explanation: {
        Beginner: {
          en: "If you pay someone who uses another bank, your bank reduces your deposit and the receiving bank increases the recipient's deposit. Behind the scenes, the two banks may settle the payment using reserve balances at the central bank.",
          fr: "Si tu paies quelqu’un qui utilise une autre banque, ta banque réduit ton dépôt et la banque du bénéficiaire augmente le sien. En coulisses, les deux banques peuvent régler le paiement à l’aide de leurs réserves auprès de la banque centrale.",
        },
        Intermediate: {
          en: "Reserves are settlement assets and a source of system liquidity. Central banks can operate with different frameworks, including scarce-reserve or ample-reserve systems. The operational design influences how policy rates are transmitted into overnight money markets.",
          fr: "Les réserves sont des actifs de règlement et une source de liquidité du système. Les banques centrales peuvent utiliser différents cadres, avec réserves rares ou abondantes. Le design opérationnel influence la manière dont les taux directeurs se transmettent au marché monétaire overnight.",
        },
        Professional: {
          en: "The reserve regime determines the marginal value of central-bank balances and shapes the money-market corridor or floor. Standing facilities, reserve remuneration, repo operations, collateral policy and reserve demand interact to keep overnight rates near the intended policy stance.",
          fr: "Le régime de réserves détermine la valeur marginale des balances de banque centrale et façonne le corridor ou floor du marché monétaire. Facilités permanentes, rémunération des réserves, opérations repo, politique de collatéral et demande de réserves interagissent pour maintenir les taux overnight proches de l’orientation monétaire visée.",
        },
      },
      vocabulary: [
        {
          en: "Interbank settlement",
          fr: "règlement interbancaire / interbank settlement",
          definition: {
            en: "The process through which financial institutions discharge obligations to each other.",
            fr: "Processus par lequel les institutions financières règlent leurs obligations mutuelles.",
          },
        },
        {
          en: "Standing facility",
          fr: "facilité permanente / standing facility",
          definition: {
            en: "A central-bank facility available to eligible counterparties under predefined terms.",
            fr: "Facilité de banque centrale accessible à des contreparties éligibles selon des conditions prédéfinies.",
          },
        },
      ],
    },
    {
      id: "central-bank-mandate-tools",
      kicker: { en: "05 · CENTRAL BANK TOOLKIT", fr: "05 · BOÎTE À OUTILS DES BANQUES CENTRALES" },
      title: {
        en: "Policy rates, balance sheets and communication",
        fr: "Taux directeurs, bilan et communication",
      },
      coreFacts: [
        {
          en: "Central banks influence monetary and financial conditions through policy rates and operational frameworks; many also use balance-sheet tools and communication.",
          fr: "Les banques centrales influencent les conditions monétaires et financières via les taux directeurs et leur cadre opérationnel ; beaucoup utilisent également leur bilan et leur communication.",
        },
        {
          en: "A policy-rate change most directly affects very short-term rates; longer-term yields also depend on expectations of future policy, inflation, growth, risk premia and supply-demand conditions.",
          fr: "Une variation du taux directeur affecte le plus directement les taux très courts ; les yields plus longs dépendent aussi des anticipations de politique future, de l’inflation, de la croissance, des primes de risque et de l’offre/demande.",
        },
        {
          en: "Central-bank asset purchases can alter the composition and quantity of assets held by the private sector and can affect term premia and market functioning; the effects are not identical to a simple rate cut.",
          fr: "Les achats d’actifs par une banque centrale peuvent modifier la composition et la quantité d’actifs détenus par le secteur privé et influencer les primes de terme / term premia et le fonctionnement de marché ; leurs effets ne sont pas identiques à une simple baisse de taux.",
        },
        {
          en: "Forward guidance attempts to influence expectations about future policy, but market participants may interpret guidance differently as data evolve.",
          fr: "La forward guidance cherche à influencer les anticipations de politique future, mais les marchés peuvent l’interpréter différemment lorsque les données évoluent.",
        },
      ],
      explanation: {
        Beginner: {
          en: "A central bank does not directly set every mortgage rate, bond yield or stock price. It sets or steers important short-term monetary conditions. Banks and markets then reprice borrowing costs, savings rates, bond yields and asset values based partly on that signal and on expectations about what comes next.",
          fr: "Une banque centrale ne fixe pas directement chaque taux immobilier, yield obligataire ou prix d’action. Elle fixe ou pilote surtout certaines conditions monétaires à court terme. Les banques et les marchés ajustent ensuite coûts d’emprunt, taux d’épargne, yields obligataires et valorisations en fonction de ce signal et des anticipations sur la suite.",
        },
        Intermediate: {
          en: "Policy operates through a reaction function and an implementation framework. The central bank changes the expected path of short rates, while communication and balance-sheet tools can influence term premia, liquidity and risk-taking. The macro effect depends on pass-through to households, firms and financial markets.",
          fr: "La politique monétaire fonctionne via une fonction de réaction / reaction function et un cadre opérationnel. La banque centrale modifie la trajectoire anticipée des taux courts, tandis que communication et outils de bilan peuvent influencer primes de terme, liquidité et prise de risque. L’effet macro dépend du pass-through vers ménages, entreprises et marchés.",
        },
        Professional: {
          en: "Monetary policy is priced through the expected policy path plus term premia, with asset-purchase programs, liquidity facilities, collateral frameworks and communication changing the distribution of duration, liquidity and risk in private portfolios. Market pricing reflects both the policy decision and the information content investors infer from it.",
          fr: "La politique monétaire est valorisée via la trajectoire attendue des taux directeurs plus les primes de terme, tandis que programmes d’achats d’actifs, facilités de liquidité, cadres de collatéral et communication modifient la distribution de duration, liquidité et risque dans les portefeuilles privés. Les prix de marché reflètent à la fois la décision et l’information que les investisseurs pensent en déduire.",
        },
      },
      comparison: {
        title: { en: "Main monetary-policy tools", fr: "Principaux outils de politique monétaire" },
        headers: [
          { en: "Tool", fr: "Outil" },
          { en: "Primary channel", fr: "Canal principal" },
          { en: "What markets watch", fr: "Ce que les marchés observent" },
        ],
        rows: [
          { cells: [
            { en: "Policy rate", fr: "Taux directeur / policy rate" },
            { en: "Short-term financing conditions", fr: "Conditions de financement court terme" },
            { en: "Current rate + expected future path", fr: "Taux actuel + trajectoire future anticipée" },
          ]},
          { cells: [
            { en: "Asset purchases / runoff", fr: "Achats d’actifs / réduction du bilan" },
            { en: "Duration, liquidity, term premium", fr: "Duration, liquidité, term premium" },
            { en: "Pace, composition, reinvestment", fr: "Rythme, composition, réinvestissement" },
          ]},
          { cells: [
            { en: "Forward guidance", fr: "Forward guidance" },
            { en: "Expectations", fr: "Anticipations" },
            { en: "Conditions, language, credibility", fr: "Conditions, langage, crédibilité" },
          ]},
          { cells: [
            { en: "Liquidity facilities", fr: "Facilités de liquidité" },
            { en: "Funding & market functioning", fr: "Funding & fonctionnement de marché" },
            { en: "Access, collateral, pricing", fr: "Accès, collatéral, tarification" },
          ]},
        ],
      },
      vocabulary: [
        {
          en: "Policy rate",
          fr: "taux directeur / policy rate",
          definition: {
            en: "A rate used by a central bank to signal or implement its monetary-policy stance.",
            fr: "Taux utilisé par une banque centrale pour signaler ou mettre en œuvre son orientation monétaire.",
          },
        },
        {
          en: "Forward guidance",
          fr: "indications prospectives / forward guidance",
          definition: {
            en: "Communication intended to shape expectations about future policy.",
            fr: "Communication destinée à influencer les anticipations concernant la politique future.",
          },
        },
      ],
    },
    {
      id: "transmission",
      kicker: { en: "06 · THE TRANSMISSION MECHANISM", fr: "06 · LE MÉCANISME DE TRANSMISSION" },
      title: {
        en: "From a policy-rate move to households, firms and markets",
        fr: "Du taux directeur aux ménages, entreprises et marchés",
      },
      coreFacts: [
        {
          en: "Monetary-policy transmission is a chain, not an instant one-step effect.",
          fr: "La transmission monétaire est une chaîne de mécanismes, pas un effet instantané en une seule étape.",
        },
        {
          en: "Key channels include market rates, bank lending conditions, asset prices, exchange rates, expectations and confidence.",
          fr: "Les principaux canaux incluent taux de marché, conditions de crédit bancaire, prix d’actifs, taux de change, anticipations et confiance.",
        },
        {
          en: "The strength and speed of transmission vary by financial structure, borrower mix, mortgage conventions, bank health, market expectations and the economic cycle.",
          fr: "La force et la vitesse de transmission varient selon la structure financière, le type d’emprunteurs, les conventions de crédit immobilier, la santé des banques, les attentes du marché et le cycle économique.",
        },
        {
          en: "Markets often move before an official decision because investors price expected future policy.",
          fr: "Les marchés bougent souvent avant la décision officielle car les investisseurs valorisent la politique monétaire future anticipée.",
        },
      ],
      explanation: {
        Beginner: {
          en: "If markets expect higher policy rates, short-term borrowing costs may rise. Banks can raise loan rates. Some households borrow less and some companies delay projects. Bond yields and stock valuations can also change. These reactions can slow demand, which may eventually affect inflation.",
          fr: "Si les marchés anticipent des taux directeurs plus élevés, les coûts d’emprunt court terme peuvent augmenter. Les banques peuvent relever leurs taux de crédit. Certains ménages empruntent moins et certaines entreprises reportent leurs projets. Les yields obligataires et valorisations actions peuvent aussi évoluer. Ces réactions peuvent ralentir la demande puis, avec le temps, influencer l’inflation.",
        },
        Intermediate: {
          en: "Transmission combines direct repricing and behavioral responses. Floating-rate borrowers may feel the effect quickly, while fixed-rate borrowers may only face higher costs when refinancing. Asset-price and FX channels can respond almost immediately, while investment, hiring and inflation respond with longer and uncertain lags.",
          fr: "La transmission combine repricing direct et réponses comportementales. Les emprunteurs à taux variable peuvent ressentir rapidement l’effet, tandis que ceux à taux fixe le ressentent surtout au refinancement. Les canaux prix d’actifs et FX peuvent réagir presque immédiatement, alors qu’investissement, emploi et inflation réagissent avec des délais plus longs et incertains.",
        },
        Professional: {
          en: "Transmission is heterogeneous and state-dependent. Pass-through varies across the OIS curve, sovereign yields, swap rates, bank funding curves, deposit betas, mortgage resets, corporate spreads and FX. Financial conditions can ease despite a restrictive policy-rate setting if risk premia compress or long-end yields decline.",
          fr: "La transmission est hétérogène et dépend du régime. Le pass-through varie entre courbe OIS, yields souverains, swaps, courbes de funding bancaire, deposit betas, resets immobiliers, spreads corporate et FX. Les conditions financières peuvent s’assouplir malgré un taux directeur restrictif si les primes de risque se compressent ou si les taux longs baissent.",
        },
      },
      marketConnection: {
        en: "This is why traders distinguish the policy decision itself from the market's prior expectation and from the change in the expected future path.",
        fr: "C’est pourquoi les traders distinguent la décision elle-même, ce que le marché avait déjà anticipé et la modification de la trajectoire future attendue.",
      },
      vocabulary: [
        {
          en: "Pass-through",
          fr: "transmission / pass-through",
          definition: {
            en: "The degree to which a change in one rate or cost is transmitted into other rates, prices or behavior.",
            fr: "Degré auquel une variation de taux ou de coût se transmet à d’autres taux, prix ou comportements.",
          },
        },
        {
          en: "Financial conditions",
          fr: "conditions financières / financial conditions",
          definition: {
            en: "The combined ease or tightness of financing reflected in rates, spreads, asset prices, FX and credit availability.",
            fr: "Ensemble des conditions de financement reflétées par taux, spreads, prix d’actifs, FX et disponibilité du crédit.",
          },
        },
      ],
    },
    {
      id: "inflation-real-rates",
      kicker: { en: "07 · INFLATION & REAL RATES", fr: "07 · INFLATION & TAUX RÉELS" },
      title: {
        en: "Nominal returns are not the same as purchasing-power returns",
        fr: "Rendement nominal ≠ rendement en pouvoir d’achat",
      },
      coreFacts: [
        {
          en: "Inflation measures the rate of change in a defined price index; different indices cover different baskets and methodologies.",
          fr: "L’inflation mesure le taux de variation d’un indice de prix défini ; différents indices utilisent différents paniers et méthodologies.",
        },
        {
          en: "A nominal interest rate is quoted in money terms; a real rate adjusts for inflation.",
          fr: "Un taux nominal / nominal rate est exprimé en monnaie ; un taux réel / real rate ajuste pour l’inflation.",
        },
        {
          en: "For moderate rates, real rate is often approximated as nominal rate minus inflation, though the exact Fisher relation is multiplicative.",
          fr: "Pour des taux modérés, le taux réel est souvent approximé par taux nominal moins inflation, même si la relation exacte de Fisher est multiplicative.",
        },
        {
          en: "Markets care about expected inflation as well as realized inflation because asset prices discount future cash flows.",
          fr: "Les marchés s’intéressent à l’inflation attendue autant qu’à l’inflation réalisée car les prix d’actifs actualisent des flux futurs.",
        },
      ],
      explanation: {
        Beginner: {
          en: "If your savings account pays 4% but prices rise 3%, your purchasing power has increased by only about 1% before taxes. A positive nominal return can therefore still be weak in real terms.",
          fr: "Si ton compte d’épargne rapporte 4 % mais que les prix augmentent de 3 %, ton pouvoir d’achat n’a augmenté que d’environ 1 % avant fiscalité. Un rendement nominal positif peut donc rester faible en termes réels.",
        },
        Intermediate: {
          en: "Expected real rates influence saving, borrowing and valuation. Higher real discount rates reduce the present value of distant cash flows, which can pressure long-duration assets. Inflation surprises can also change expectations for the policy path and risk premia.",
          fr: "Les taux réels anticipés influencent épargne, emprunt et valorisation. Des taux réels plus élevés réduisent la valeur actuelle des cash flows lointains, ce qui peut peser sur les actifs longue duration. Les surprises d’inflation peuvent également modifier les anticipations de politique monétaire et les primes de risque.",
        },
        Professional: {
          en: "Macro pricing separates nominal yields into expected real-rate components, expected inflation and risk premia. Inflation-linked bonds can help infer market pricing of inflation compensation, but breakevens also embed liquidity and inflation-risk premia and are not pure forecasts.",
          fr: "La valorisation macro décompose les yields nominaux en composante de taux réel anticipé, inflation attendue et primes de risque. Les obligations indexées sur l’inflation peuvent aider à observer la compensation d’inflation pricée par le marché, mais les breakevens incluent aussi primes de liquidité et de risque d’inflation : ce ne sont pas des prévisions pures.",
        },
      },
      formula: {
        label: { en: "Approximate real interest rate", fr: "Taux d’intérêt réel approximatif / Approximate real rate" },
        expression: "Real Rate ≈ Nominal Rate − Inflation",
        explanation: {
          en: "Useful for intuition at moderate rates. Exact Fisher relation: (1 + nominal) = (1 + real) × (1 + inflation).",
          fr: "Approximation utile pour l’intuition lorsque les taux restent modérés. Relation exacte de Fisher : (1 + nominal) = (1 + réel) × (1 + inflation).",
        },
        workedExample: {
          en: "Nominal rate 4% − inflation 3% ≈ 1% real rate.",
          fr: "Taux nominal 4 % − inflation 3 % ≈ taux réel 1 %.",
        },
      },
      vocabulary: [
        {
          en: "Real rate",
          fr: "taux réel / real rate",
          definition: {
            en: "An interest rate adjusted for inflation or expected inflation depending on context.",
            fr: "Taux d’intérêt ajusté de l’inflation ou de l’inflation attendue selon le contexte.",
          },
        },
        {
          en: "Inflation breakeven",
          fr: "point mort d’inflation / inflation breakeven",
          definition: {
            en: "A market-based inflation compensation measure derived from nominal and inflation-linked bonds, subject to risk and liquidity premia.",
            fr: "Mesure de compensation d’inflation dérivée des obligations nominales et indexées, avec primes de risque et de liquidité.",
          },
        },
      ],
    },
    {
      id: "yield-curve-expectations",
      kicker: { en: "08 · THE YIELD CURVE", fr: "08 · LA COURBE DES TAUX" },
      title: {
        en: "Why the whole curve matters more than one policy rate",
        fr: "Pourquoi toute la courbe des taux / yield curve compte davantage qu’un seul taux directeur",
      },
      coreFacts: [
        {
          en: "A yield curve compares yields across maturities for a defined class of instruments.",
          fr: "Une courbe des taux / yield curve compare les rendements de différentes maturités pour une catégorie d’instruments définie.",
        },
        {
          en: "Short maturities are strongly influenced by near-term policy expectations; longer maturities reflect expected future rates, inflation, growth, supply-demand and term premia.",
          fr: "Les maturités courtes sont fortement influencées par les anticipations de politique proche ; les maturités longues reflètent taux futurs attendus, inflation, croissance, offre/demande et primes de terme.",
        },
        {
          en: "A curve can steepen or flatten through changes at the front end, long end or both.",
          fr: "Une courbe peut se pentifier / steepen ou s’aplatir / flatten via des mouvements du front end, du long end ou des deux.",
        },
        {
          en: "An inverted curve is an observed pricing configuration, not a mechanical guarantee of any specific future economic outcome.",
          fr: "Une courbe inversée / inverted curve est une configuration de prix observée, pas une garantie mécanique d’un résultat économique futur précis.",
        },
      ],
      explanation: {
        Beginner: {
          en: "Imagine the 2-year government yield is 4% and the 10-year yield is 3.5%. The curve is inverted between those points. That tells you something about market pricing across time, but it does not by itself explain exactly why or guarantee what the economy will do next.",
          fr: "Imagine que le yield souverain 2 ans soit 4 % et le 10 ans 3,5 %. La courbe est inversée entre ces points. Cela donne une information sur la manière dont le marché price le temps, mais cela n’explique pas à lui seul exactement pourquoi ni ne garantit ce que fera l’économie ensuite.",
        },
        Intermediate: {
          en: "Curve shape embeds the expected path of short rates plus term premia. A bull steepener, bear steepener, bull flattener or bear flattener describes combinations of level and slope moves. These moves matter to bank margins, duration trades, mortgages and valuation.",
          fr: "La forme de courbe intègre la trajectoire anticipée des taux courts plus les primes de terme. Bull steepener, bear steepener, bull flattener et bear flattener décrivent différentes combinaisons de mouvement du niveau et de la pente. Ces mouvements affectent marges bancaires, trades de duration, crédits immobiliers et valorisations.",
        },
        Professional: {
          en: "Curve analysis decomposes spot, forward and par structures and separates expected policy from term premium. Relative-value investors monitor key-rate duration, curve spreads such as 2s10s or 5s30s, swap spreads and cross-market differentials rather than treating the yield curve as a single number.",
          fr: "L’analyse de courbe distingue structures spot, forward et par et sépare politique attendue et term premium. Les investisseurs relative value suivent key-rate duration, spreads de courbe comme 2s10s ou 5s30s, swap spreads et écarts entre marchés plutôt que de traiter la yield curve comme un seul nombre.",
        },
      },
      formula: {
        label: { en: "Simple 2s10s curve spread", fr: "Spread de courbe 2s10s simple" },
        expression: "2s10s Spread = 10Y Yield − 2Y Yield",
        explanation: {
          en: "Positive means the 10-year yield is above the 2-year yield; negative means this segment is inverted.",
          fr: "Un résultat positif signifie que le 10 ans est au-dessus du 2 ans ; un résultat négatif signifie que ce segment de courbe est inversé.",
        },
        workedExample: {
          en: "3.50% − 4.00% = −0.50%, or −50 basis points.",
          fr: "3,50 % − 4,00 % = −0,50 %, soit −50 points de base / basis points.",
        },
      },
      marketConnection: {
        en: "A central-bank meeting can move the front end sharply while the long end moves in the opposite direction if investors revise growth, inflation or term-premium expectations.",
        fr: "Une réunion de banque centrale peut faire fortement bouger le front end tandis que le long end évolue dans le sens opposé si les investisseurs révisent leurs attentes de croissance, inflation ou term premium.",
      },
      vocabulary: [
        {
          en: "Yield curve",
          fr: "courbe des taux / yield curve",
          definition: {
            en: "A representation of yields across maturities for comparable instruments.",
            fr: "Représentation des rendements selon les maturités pour des instruments comparables.",
          },
        },
        {
          en: "Term premium",
          fr: "prime de terme / term premium",
          definition: {
            en: "Compensation investors may require for holding longer-duration exposure beyond expected future short rates.",
            fr: "Compensation que les investisseurs peuvent exiger pour détenir une exposition plus longue au-delà des taux courts futurs attendus.",
          },
        },
      ],
    },
    {
      id: "cross-asset",
      kicker: { en: "09 · CROSS-ASSET TRANSMISSION", fr: "09 · TRANSMISSION MULTI-ACTIFS" },
      title: {
        en: "How monetary shocks can move bonds, credit, equities, banks and FX",
        fr: "Comment un choc monétaire peut déplacer obligations, crédit, actions, banques et FX",
      },
      coreFacts: [
        {
          en: "There is no universal one-direction rule for all assets after a central-bank decision because market reaction depends on what was already priced and why policy changed.",
          fr: "Il n’existe pas de règle universelle donnant une direction certaine à tous les actifs après une décision de banque centrale : la réaction dépend de ce qui était déjà pricé et de la raison du changement de politique.",
        },
        {
          en: "A more restrictive rate path can raise short-term yields, tighten credit conditions and increase discount rates, but growth and inflation expectations may change simultaneously.",
          fr: "Une trajectoire de taux plus restrictive peut relever les taux courts, durcir le crédit et augmenter les discount rates, tandis que les attentes de croissance et d’inflation peuvent évoluer simultanément.",
        },
        {
          en: "Currencies react to relative monetary policy, relative growth, risk sentiment, capital flows and positioning rather than one domestic rate in isolation.",
          fr: "Les devises réagissent à la politique monétaire relative, à la croissance relative, au sentiment de risque, aux flux de capitaux et au positionnement plutôt qu’à un seul taux domestique isolé.",
        },
        {
          en: "Bank equities can benefit from some rate environments through margins but suffer if funding costs, deposit competition, credit losses or duration losses dominate.",
          fr: "Les actions bancaires peuvent bénéficier de certains environnements de taux via les marges mais souffrir si coûts de funding, concurrence sur les dépôts, pertes de crédit ou pertes de duration dominent.",
        },
      ],
      explanation: {
        Beginner: {
          en: "Suppose a central bank unexpectedly sounds more restrictive. Short-term bond yields might rise. Some growth stocks might fall because future cash flows are discounted at higher rates. A currency might strengthen if markets expect relatively higher rates, but it could also weaken if investors think the policy will damage growth badly. Context matters.",
          fr: "Supposons qu’une banque centrale paraisse soudainement plus restrictive que prévu. Les yields courts peuvent monter. Certaines actions de croissance peuvent baisser car les cash flows futurs sont actualisés à des taux plus élevés. Une devise peut se renforcer si le marché anticipe des taux relativement plus élevés, mais elle peut aussi faiblir si les investisseurs pensent que la politique dégradera fortement la croissance. Le contexte compte.",
        },
        Intermediate: {
          en: "Cross-asset reaction is an expectations problem. Rates markets reprice the policy path, credit prices refinancing and default risk, equities reprice earnings and discount rates, banks reprice margins and asset quality, and FX reprices relative policy and capital-flow incentives.",
          fr: "La réaction multi-actifs est un problème d’anticipations. Les marchés de taux repricent la trajectoire monétaire, le crédit repricе le refinancement et le risque de défaut, les actions repricent bénéfices et discount rates, les banques repricent marges et qualité des actifs, et le FX repricе politique relative et incitations de flux de capitaux.",
        },
        Professional: {
          en: "The cleanest framework is surprise decomposition: policy-rate surprise, path surprise and information shock. Asset reaction then depends on duration, leverage, convexity, credit beta, earnings sensitivity, relative-rate differentials, positioning and liquidity. The same nominal hike can therefore produce very different cross-asset outcomes across regimes.",
          fr: "Le cadre le plus propre consiste à décomposer la surprise : surprise de taux directeur, surprise de trajectoire / path surprise et choc d’information. La réaction dépend ensuite de duration, levier, convexité, beta crédit, sensibilité des bénéfices, différentiels de taux relatifs, positionnement et liquidité. Une même hausse nominale de taux peut donc produire des résultats multi-actifs très différents selon les régimes.",
        },
      },
      comparison: {
        title: {
          en: "First-pass cross-asset framework",
          fr: "Cadre multi-actifs de premier niveau",
        },
        headers: [
          { en: "Asset", fr: "Actif" },
          { en: "Key monetary channel", fr: "Canal monétaire clé" },
          { en: "Important caveat", fr: "Nuance importante" },
        ],
        rows: [
          { cells: [
            { en: "Government bonds", fr: "Obligations souveraines" },
            { en: "Expected policy + inflation + term premium", fr: "Politique attendue + inflation + term premium" },
            { en: "Different maturities can move differently", fr: "Les maturités peuvent bouger différemment" },
          ]},
          { cells: [
            { en: "Credit", fr: "Crédit" },
            { en: "Risk-free rates + spread + refinancing", fr: "Taux sans risque + spread + refinancement" },
            { en: "Spread can offset rate move", fr: "Le spread peut compenser le mouvement de taux" },
          ]},
          { cells: [
            { en: "Equities", fr: "Actions / equities" },
            { en: "Discount rate + earnings + risk appetite", fr: "Discount rate + bénéfices + appétit pour le risque" },
            { en: "Sector and duration sensitivity differ", fr: "Sensibilités sectorielles et duration différentes" },
          ]},
          { cells: [
            { en: "FX", fr: "Devises / FX" },
            { en: "Relative rates + relative growth + flows", fr: "Taux relatifs + croissance relative + flux" },
            { en: "Relative, not absolute, pricing matters", fr: "Le relatif compte plus que l’absolu" },
          ]},
        ],
      },
    },
  ],
  quiz: [
    {
      id: "q1",
      conceptKey: "forms-of-money",
      question: {
        en: "Which statement correctly distinguishes a bank deposit from a central-bank reserve balance?",
        fr: "Quelle proposition distingue correctement un dépôt bancaire d’une réserve de banque centrale ?",
      },
      options: [
        { id: "a", label: { en: "They are always the exact same liability", fr: "Ce sont toujours exactement le même passif" } },
        { id: "b", label: { en: "A deposit is generally a commercial-bank liability; reserves are central-bank liabilities held by eligible institutions", fr: "Un dépôt est généralement un passif de banque commerciale ; les réserves sont des passifs de banque centrale détenus par des institutions éligibles" } },
        { id: "c", label: { en: "Households normally settle coffee purchases directly with reserve balances", fr: "Les ménages règlent normalement leur café directement en réserves de banque centrale" } },
        { id: "d", label: { en: "Deposits can never be used for payments", fr: "Les dépôts ne peuvent jamais être utilisés pour les paiements" } },
      ],
      correctOption: "b",
      explanation: {
        en: "Commercial-bank deposits and central-bank reserves are different liabilities issued by different institutions and used in different layers of the payment system.",
        fr: "Dépôts de banques commerciales et réserves de banque centrale sont des passifs différents, émis par des institutions différentes et utilisés à différents niveaux du système de paiement.",
      },
    },
    {
      id: "q2",
      conceptKey: "bank-balance-sheet",
      question: {
        en: "On a commercial bank's balance sheet, a customer loan is usually what?",
        fr: "Dans le bilan d’une banque commerciale, un prêt accordé à un client est généralement quoi ?",
      },
      options: [
        { id: "a", label: { en: "An asset", fr: "Un actif" } },
        { id: "b", label: { en: "A customer-deposit liability", fr: "Un passif de dépôt client" } },
        { id: "c", label: { en: "Equity", fr: "Des capitaux propres" } },
        { id: "d", label: { en: "A tax expense", fr: "Une charge fiscale" } },
      ],
      correctOption: "a",
      explanation: {
        en: "The borrower owes future payments to the bank, so the loan is a bank asset.",
        fr: "L’emprunteur doit des paiements futurs à la banque : le prêt est donc un actif bancaire.",
      },
    },
    {
      id: "q3",
      conceptKey: "deposit-creation",
      question: {
        en: "When a bank originates a new loan and credits the borrower's deposit account, what can happen initially?",
        fr: "Lorsqu’une banque accorde un nouveau prêt et crédite le compte de dépôt de l’emprunteur, que peut-il se passer initialement ?",
      },
      options: [
        { id: "a", label: { en: "A loan asset and deposit liability are created together", fr: "Un actif de prêt et un passif de dépôt sont créés ensemble" } },
        { id: "b", label: { en: "The bank must physically print banknotes first", fr: "La banque doit d’abord imprimer physiquement des billets" } },
        { id: "c", label: { en: "Bank capital automatically doubles", fr: "Le capital bancaire double automatiquement" } },
        { id: "d", label: { en: "No balance-sheet entry occurs", fr: "Aucune écriture de bilan n’a lieu" } },
      ],
      correctOption: "a",
      explanation: {
        en: "Loan origination can expand both sides of the bank's balance sheet: the loan is an asset and the new deposit is a liability.",
        fr: "L’octroi du prêt peut augmenter les deux côtés du bilan : le prêt est un actif et le nouveau dépôt un passif.",
      },
    },
    {
      id: "q4",
      conceptKey: "real-rate",
      question: {
        en: "A nominal rate is 5% and inflation is 3%. What is the approximate real rate?",
        fr: "Un taux nominal vaut 5 % et l’inflation 3 %. Quel est le taux réel approximatif ?",
      },
      options: [
        { id: "a", label: { en: "8%", fr: "8 %" } },
        { id: "b", label: { en: "5%", fr: "5 %" } },
        { id: "c", label: { en: "3%", fr: "3 %" } },
        { id: "d", label: { en: "2%", fr: "2 %" } },
      ],
      correctOption: "d",
      explanation: {
        en: "Using the approximation: 5% − 3% = 2%.",
        fr: "Avec l’approximation : 5 % − 3 % = 2 %.",
      },
    },
    {
      id: "q5",
      conceptKey: "policy-transmission",
      question: {
        en: "Which statement about monetary-policy transmission is most accurate?",
        fr: "Quelle proposition sur la transmission de politique monétaire est la plus juste ?",
      },
      options: [
        { id: "a", label: { en: "A policy-rate move instantly changes every borrowing rate by exactly the same amount", fr: "Une variation du taux directeur modifie instantanément tous les taux d’emprunt exactement du même montant" } },
        { id: "b", label: { en: "Transmission works through several channels and can vary in speed and strength", fr: "La transmission passe par plusieurs canaux et peut varier en vitesse et en intensité" } },
        { id: "c", label: { en: "Financial markets cannot move before the official decision", fr: "Les marchés ne peuvent pas bouger avant la décision officielle" } },
        { id: "d", label: { en: "Only banks are affected by monetary policy", fr: "Seules les banques sont affectées par la politique monétaire" } },
      ],
      correctOption: "b",
      explanation: {
        en: "Transmission operates through rates, lending, asset prices, FX, expectations and confidence, with different lags and pass-through.",
        fr: "La transmission passe par taux, crédit, prix d’actifs, FX, anticipations et confiance, avec différents délais et degrés de pass-through.",
      },
    },
    {
      id: "q6",
      conceptKey: "yield-curve",
      question: {
        en: "If the 10-year yield is 3.5% and the 2-year yield is 4.0%, what is the 2s10s spread using 10Y minus 2Y?",
        fr: "Si le yield 10 ans est 3,5 % et le 2 ans 4,0 %, quel est le spread 2s10s calculé comme 10Y moins 2Y ?",
      },
      options: [
        { id: "a", label: { en: "+50 bp", fr: "+50 pb" } },
        { id: "b", label: { en: "0 bp", fr: "0 pb" } },
        { id: "c", label: { en: "−50 bp", fr: "−50 pb" } },
        { id: "d", label: { en: "−350 bp", fr: "−350 pb" } },
      ],
      correctOption: "c",
      explanation: {
        en: "3.5% − 4.0% = −0.5%, equal to −50 basis points.",
        fr: "3,5 % − 4,0 % = −0,5 %, soit −50 points de base.",
      },
    },
    {
      id: "q7",
      conceptKey: "central-bank-tools",
      question: {
        en: "Which is a common channel through which central-bank communication can affect markets?",
        fr: "Quel est un canal courant par lequel la communication d’une banque centrale peut affecter les marchés ?",
      },
      options: [
        { id: "a", label: { en: "Changing expectations about future policy", fr: "Modifier les anticipations concernant la politique future" } },
        { id: "b", label: { en: "Guaranteeing every stock price", fr: "Garantir le prix de chaque action" } },
        { id: "c", label: { en: "Eliminating all credit risk", fr: "Éliminer tout risque de crédit" } },
        { id: "d", label: { en: "Fixing all long-term yields permanently", fr: "Fixer définitivement tous les yields longs" } },
      ],
      correctOption: "a",
      explanation: {
        en: "Forward guidance and communication can change the market's expected path of policy, which can reprice rates and other assets.",
        fr: "La forward guidance et la communication peuvent modifier la trajectoire de politique attendue par le marché, ce qui peut repricer les taux et d’autres actifs.",
      },
    },
    {
      id: "q8",
      conceptKey: "cross-asset-policy",
      question: {
        en: "Why can the same rate hike produce different market reactions on different days?",
        fr: "Pourquoi une même hausse de taux peut-elle produire des réactions de marché différentes selon les jours ?",
      },
      options: [
        { id: "a", label: { en: "Because markets react to surprises, expectations, information and positioning, not only the headline rate", fr: "Parce que les marchés réagissent aux surprises, anticipations, informations et positionnements, pas seulement au taux annoncé" } },
        { id: "b", label: { en: "Because bond mathematics changes every day", fr: "Parce que les mathématiques obligataires changent chaque jour" } },
        { id: "c", label: { en: "Because central banks directly choose every asset price", fr: "Parce que les banques centrales choisissent directement chaque prix d’actif" } },
        { id: "d", label: { en: "There is no relationship between rates and markets", fr: "Il n’existe aucun lien entre taux et marchés" } },
      ],
      correctOption: "a",
      explanation: {
        en: "Markets price the difference between what happened and what was expected, plus the information embedded in the decision and changes in the future path.",
        fr: "Les marchés pricent l’écart entre ce qui s’est produit et ce qui était attendu, l’information contenue dans la décision et les changements de trajectoire future.",
      },
    },
  ],
  interviewPrompt: {
    question: {
      en: "Walk me through what happens across markets if a central bank becomes more hawkish than expected.",
      fr: "Explique-moi ce qui peut se passer sur les marchés si une banque centrale devient plus restrictive / hawkish que prévu.",
    },
    framework: [
      {
        en: "Start with expectations: the key is more hawkish than what was already priced.",
        fr: "Commencer par les anticipations : l’important est d’être plus hawkish que ce qui était déjà pricé.",
      },
      {
        en: "Rates: front-end yields may rise as the expected policy path reprices; the long end depends on inflation, growth and term-premium expectations.",
        fr: "Taux : les yields courts peuvent monter avec le repricing de la trajectoire monétaire ; le long end dépend des anticipations d’inflation, croissance et term premium.",
      },
      {
        en: "Credit: higher risk-free yields and tighter financing can pressure borrowers, but spread reaction depends on growth and risk sentiment.",
        fr: "Crédit : taux sans risque plus élevés et financement plus strict peuvent peser sur les emprunteurs, mais le spread dépend aussi de la croissance et du sentiment de risque.",
      },
      {
        en: "Equities: higher discount rates can pressure valuations, especially long-duration exposures, while earnings expectations can change at the same time.",
        fr: "Actions : des discount rates plus élevés peuvent peser sur les valorisations, surtout les expositions longue duration, tandis que les anticipations de bénéfices peuvent aussi évoluer.",
      },
      {
        en: "FX: think relative policy, relative growth and positioning rather than assuming the currency must always strengthen.",
        fr: "FX : raisonner en politique relative, croissance relative et positionnement plutôt que supposer que la devise doit toujours se renforcer.",
      },
    ],
    sample: {
      en: "If the central bank is more hawkish than expected, I would first look at how the expected policy path changes rather than just the headline decision. Front-end yields would often reprice higher, while the long end could rise or fall depending on whether investors focus more on inflation persistence or weaker future growth. Credit can face tighter refinancing conditions, and equities can see valuation pressure through higher discount rates, particularly in long-duration sectors. For FX, I would compare the revised rate path with other countries and also consider growth and positioning. The important point is that market reaction depends on the surprise relative to expectations, not simply on whether rates went up.",
      fr: "Si la banque centrale est plus hawkish que prévu, je regarde d’abord comment la trajectoire anticipée des taux évolue plutôt que seulement la décision headline. Les yields du front end peuvent généralement être repricés à la hausse, tandis que le long end peut monter ou baisser selon que les investisseurs se concentrent davantage sur la persistance de l’inflation ou sur une croissance future plus faible. Le crédit peut subir des conditions de refinancement plus strictes et les actions une pression de valorisation via des discount rates plus élevés, particulièrement dans les secteurs longue duration. Pour le FX, je compare la nouvelle trajectoire de taux avec celle des autres pays et j’intègre aussi croissance et positionnement. Le point essentiel est que la réaction dépend de la surprise par rapport aux attentes, pas simplement du fait que les taux aient augmenté.",
    },
  },
};


export const timeValueOfMoneyLesson: FinanceLesson = {
  slug: "year-1-time-value-of-money",
  year: { en: "Year 1 · Foundations", fr: "Année 1 · Fondations" },
  domain: {
    en: "Corporate Finance & Valuation",
    fr: "Finance d’entreprise & valorisation / Corporate Finance & Valuation",
  },
  title: {
    en: "Time Value of Money",
    fr: "Valeur temps de l’argent / Time Value of Money",
  },
  subtitle: {
    en: "Learn why a dollar today is worth more than a dollar later, how compounding and discounting work, and how present value, annuities, perpetuities and NPV become the mathematical foundation of valuation.",
    fr: "Comprendre pourquoi un dollar aujourd’hui vaut davantage qu’un dollar reçu plus tard, comment fonctionnent capitalisation / compounding et actualisation / discounting, et comment valeur actuelle / present value, annuités, perpétuités et NPV deviennent la base mathématique de la valorisation.",
  },
  duration: { en: "80–100 min", fr: "80–100 min" },
  prerequisites: [
    {
      en: "Basic percentages and exponent rules",
      fr: "Pourcentages de base et règles simples sur les puissances",
    },
    {
      en: "Stocks, Bonds, ETFs & Funds",
      fr: "Actions / Stocks, obligations / Bonds, ETF & fonds / Funds",
    },
  ],
  objectives: [
    {
      en: "Explain economically why timing changes the value of cash.",
      fr: "Expliquer économiquement pourquoi le timing modifie la valeur du cash.",
    },
    {
      en: "Calculate future value and present value for single cash flows.",
      fr: "Calculer valeur future / future value et valeur actuelle / present value pour un flux unique.",
    },
    {
      en: "Distinguish simple interest from compound interest and compare compounding frequencies.",
      fr: "Distinguer intérêt simple / simple interest et intérêt composé / compound interest et comparer différentes fréquences de capitalisation.",
    },
    {
      en: "Value ordinary annuities, annuities due and simple perpetuities.",
      fr: "Valoriser annuités ordinaires / ordinary annuities, annuités à terme à échoir / annuities due et perpétuités simples / perpetuities.",
    },
    {
      en: "Calculate and interpret net present value.",
      fr: "Calculer et interpréter la valeur actuelle nette / net present value (NPV).",
    },
    {
      en: "Connect discount rates to opportunity cost, inflation and risk.",
      fr: "Relier taux d’actualisation / discount rate au coût d’opportunité, à l’inflation et au risque.",
    },
  ],
  overviewFlow: {
    title: {
      en: "The valuation chain",
      fr: "La chaîne de valorisation / valuation",
    },
    steps: [
      {
        title: { en: "Cash flow", fr: "Flux de trésorerie / Cash flow" },
        detail: { en: "Amount + timing", fr: "Montant + timing" },
      },
      {
        title: { en: "Discount rate", fr: "Taux d’actualisation / Discount rate" },
        detail: { en: "Time + opportunity cost + risk", fr: "Temps + coût d’opportunité + risque" },
      },
      {
        title: { en: "Present value", fr: "Valeur actuelle / Present value" },
        detail: { en: "Comparable value today", fr: "Valeur comparable aujourd’hui" },
      },
      {
        title: { en: "Decision", fr: "Décision" },
        detail: { en: "Price · invest · reject · compare", fr: "Prix · investir · rejeter · comparer" },
      },
    ],
  },
  sections: [
    {
      id: "why-time-matters",
      kicker: { en: "01 · WHY TIME CHANGES VALUE", fr: "01 · POURQUOI LE TEMPS CHANGE LA VALEUR" },
      title: {
        en: "A dollar today and a dollar tomorrow are not economically identical",
        fr: "Un dollar aujourd’hui et un dollar demain ne sont pas économiquement identiques",
      },
      coreFacts: [
        {
          en: "Cash received today can be invested, consumed or used to avoid borrowing, so it has an opportunity value.",
          fr: "Du cash reçu aujourd’hui peut être investi, consommé ou utilisé pour éviter un emprunt ; il possède donc une valeur d’opportunité.",
        },
        {
          en: "Inflation can reduce future purchasing power, while uncertainty and credit risk can make future cash flows less certain.",
          fr: "L’inflation peut réduire le pouvoir d’achat futur, tandis que l’incertitude et le risque de crédit peuvent rendre les flux futurs moins certains.",
        },
        {
          en: "Finance therefore compares cash flows at different dates by moving them to a common point in time.",
          fr: "La finance compare donc des flux reçus à différentes dates en les ramenant à un même point dans le temps.",
        },
        {
          en: "Compounding moves value forward through time; discounting moves value backward to the present.",
          fr: "La capitalisation / compounding déplace une valeur vers le futur ; l’actualisation / discounting la ramène vers aujourd’hui.",
        },
      ],
      explanation: {
        Beginner: {
          en: "If I offer you $1,000 today or $1,000 in one year, the money today is generally more useful because you can invest it immediately. At 5%, $1,000 today could become $1,050 in one year. So receiving only $1,000 next year means giving up that potential return.",
          fr: "Si je te propose 1 000 $ aujourd’hui ou 1 000 $ dans un an, l’argent aujourd’hui est généralement plus utile car tu peux l’investir immédiatement. À 5 %, 1 000 $ aujourd’hui pourraient devenir 1 050 $ dans un an. Recevoir seulement 1 000 $ l’an prochain signifie donc renoncer à ce rendement potentiel.",
        },
        Intermediate: {
          en: "Time value reflects opportunity cost, inflation, liquidity preference and risk. Discounting converts future cash flows into economically comparable present values by applying a rate that represents the return required for waiting and bearing uncertainty.",
          fr: "La valeur temps reflète coût d’opportunité, inflation, préférence pour la liquidité et risque. L’actualisation convertit les flux futurs en valeurs actuelles comparables en appliquant un taux représentant le rendement exigé pour attendre et supporter l’incertitude.",
        },
        Professional: {
          en: "TVM is the pricing bridge between dated cash flows. The discount factor embeds the relevant opportunity-cost curve and, depending on the application, compensation for inflation, credit, liquidity and systematic risk. Modern valuation is fundamentally a problem of mapping state-contingent future cash flows into present prices.",
          fr: "La TVM est le pont de valorisation entre flux datés. Le facteur d’actualisation incorpore la courbe de coût d’opportunité pertinente et, selon l’application, une rémunération pour inflation, crédit, liquidité et risque systématique. La valorisation moderne consiste fondamentalement à convertir des cash flows futurs dépendant des états du monde en prix présents.",
        },
      },
      comparison: {
        title: { en: "Compounding vs discounting", fr: "Capitalisation vs actualisation" },
        headers: [
          { en: "Process", fr: "Processus" },
          { en: "Direction", fr: "Direction" },
          { en: "Question answered", fr: "Question posée" },
        ],
        rows: [
          { cells: [
            { en: "Compounding", fr: "Capitalisation / compounding" },
            { en: "Present → future", fr: "Présent → futur" },
            { en: "What will today's money become?", fr: "Que deviendra l’argent d’aujourd’hui ?" },
          ]},
          { cells: [
            { en: "Discounting", fr: "Actualisation / discounting" },
            { en: "Future → present", fr: "Futur → présent" },
            { en: "What is future money worth today?", fr: "Que vaut aujourd’hui l’argent futur ?" },
          ]},
        ],
      },
      vocabulary: [
        {
          en: "Opportunity cost",
          fr: "coût d’opportunité / opportunity cost",
          definition: {
            en: "The value of the best alternative use or return forgone.",
            fr: "Valeur de la meilleure alternative à laquelle on renonce.",
          },
        },
        {
          en: "Discount factor",
          fr: "facteur d’actualisation / discount factor",
          definition: {
            en: "The multiplier used to convert a future cash flow into present value.",
            fr: "Coefficient utilisé pour convertir un flux futur en valeur actuelle.",
          },
        },
      ],
    },
    {
      id: "future-value",
      kicker: { en: "02 · FUTURE VALUE", fr: "02 · VALEUR FUTURE" },
      title: {
        en: "Compounding turns today's capital into a future amount",
        fr: "La capitalisation transforme le capital d’aujourd’hui en montant futur",
      },
      coreFacts: [
        {
          en: "Future value depends on starting capital, return per period and number of compounding periods.",
          fr: "La valeur future dépend du capital initial, du rendement par période et du nombre de périodes de capitalisation.",
        },
        {
          en: "Compound interest earns returns on prior accumulated returns as well as on original principal.",
          fr: "L’intérêt composé / compound interest génère des rendements sur les gains déjà accumulés en plus du principal initial.",
        },
        {
          en: "The effect of compounding becomes more powerful as the rate or time horizon increases.",
          fr: "L’effet de capitalisation devient plus puissant lorsque le taux ou l’horizon augmente.",
        },
        {
          en: "The periodic rate and number of periods must use consistent units.",
          fr: "Le taux périodique et le nombre de périodes doivent utiliser des unités cohérentes.",
        },
      ],
      explanation: {
        Beginner: {
          en: "Invest $1,000 at 8% for three years. After year one you have $1,080. In year two, you earn 8% on $1,080, not just on the original $1,000. After three years you have about $1,259.71.",
          fr: "Investis 1 000 $ à 8 % pendant trois ans. Après un an, tu as 1 080 $. La deuxième année, tu gagnes 8 % sur 1 080 $, pas seulement sur les 1 000 $ initiaux. Après trois ans, tu obtiens environ 1 259,71 $.",
        },
        Intermediate: {
          en: "Exponential compounding means the growth factor is multiplied repeatedly. This makes horizon a nonlinear driver of ending wealth. The same formula applies to many settings, including investment growth, accumulated interest and reinvested returns.",
          fr: "La capitalisation exponentielle signifie que le facteur de croissance est multiplié à chaque période. L’horizon devient donc un moteur non linéaire de la valeur finale. La même formule s’applique à la croissance d’un investissement, aux intérêts accumulés ou aux rendements réinvestis.",
        },
        Professional: {
          en: "Compounding is path-independent only under the assumed fixed periodic rate. With variable realized returns, terminal wealth is the product of period-by-period gross returns, which is why arithmetic average return and geometric compound return are not interchangeable.",
          fr: "La capitalisation n’est indépendante du chemin que sous l’hypothèse d’un taux périodique fixe. Avec des rendements variables, la richesse finale est le produit des rendements bruts période par période, d’où la différence entre moyenne arithmétique et rendement composé géométrique.",
        },
      },
      formula: {
        label: { en: "Future value of one cash flow", fr: "Valeur future d’un flux unique / Future value" },
        expression: "FV = PV × (1 + r)ⁿ",
        explanation: {
          en: "PV is today's amount, r is the return per period and n is the number of periods.",
          fr: "PV est le montant aujourd’hui, r le rendement par période et n le nombre de périodes.",
        },
        workedExample: {
          en: "$1,000 × (1.08)³ = $1,259.71.",
          fr: "1 000 $ × (1,08)³ = 1 259,71 $.",
        },
      },
      vocabulary: [
        {
          en: "Compounding",
          fr: "capitalisation / compounding",
          definition: {
            en: "Earning returns on principal and previously accumulated returns.",
            fr: "Génération de rendement sur le principal et les rendements déjà accumulés.",
          },
        },
        {
          en: "Growth factor",
          fr: "facteur de croissance / growth factor",
          definition: {
            en: "The multiplicative factor, such as 1 + r, applied across periods.",
            fr: "Facteur multiplicatif, comme 1 + r, appliqué au fil des périodes.",
          },
        },
      ],
    },
    {
      id: "present-value",
      kicker: { en: "03 · PRESENT VALUE", fr: "03 · VALEUR ACTUELLE" },
      title: {
        en: "Discounting asks what future cash is worth today",
        fr: "L’actualisation demande ce qu’un cash futur vaut aujourd’hui",
      },
      coreFacts: [
        {
          en: "Present value is the amount today that is economically equivalent to a future cash flow at a chosen discount rate.",
          fr: "La valeur actuelle / present value est le montant aujourd’hui économiquement équivalent à un flux futur pour un taux d’actualisation donné.",
        },
        {
          en: "A higher discount rate lowers present value, all else equal.",
          fr: "Un taux d’actualisation plus élevé réduit la valeur actuelle, toutes choses égales par ailleurs.",
        },
        {
          en: "A cash flow received further in the future has a lower present value when the discount rate is positive.",
          fr: "Un flux reçu plus loin dans le futur possède une valeur actuelle plus faible lorsque le taux d’actualisation est positif.",
        },
        {
          en: "Discounting and compounding are inverse operations.",
          fr: "Actualisation et capitalisation sont des opérations inverses.",
        },
      ],
      explanation: {
        Beginner: {
          en: "If you will receive $1,210 in two years and a comparable return is 10% per year, that future amount is worth $1,000 today because $1,000 compounded at 10% for two years becomes $1,210.",
          fr: "Si tu dois recevoir 1 210 $ dans deux ans et qu’un rendement comparable est de 10 % par an, ce montant futur vaut 1 000 $ aujourd’hui car 1 000 $ capitalisés à 10 % pendant deux ans deviennent 1 210 $.",
        },
        Intermediate: {
          en: "Present value is the core language of valuation because it lets us compare cash flows occurring at different dates. Discounting each future cash flow separately is essential when timing differs.",
          fr: "La present value est le langage fondamental de la valorisation car elle permet de comparer des flux reçus à des dates différentes. Chaque cash flow futur doit être actualisé séparément lorsque le timing diffère.",
        },
        Professional: {
          en: "PV is determined by the term structure of discount factors appropriate to the cash flow's timing and risk. A single flat discount rate is a simplifying assumption; professional fixed-income and derivative valuation often uses maturity-specific curves and state-dependent pricing.",
          fr: "La PV dépend de la structure par terme des facteurs d’actualisation adaptée au timing et au risque du cash flow. Utiliser un taux plat unique est une simplification ; la valorisation professionnelle en fixed income et dérivés utilise souvent des courbes spécifiques aux maturités et des prix dépendant des états du monde.",
        },
      },
      formula: {
        label: { en: "Present value of one future cash flow", fr: "Valeur actuelle d’un flux futur / Present value" },
        expression: "PV = FV ÷ (1 + r)ⁿ",
        explanation: {
          en: "The denominator is the cumulative discounting factor across n periods.",
          fr: "Le dénominateur est le facteur d’actualisation cumulé sur n périodes.",
        },
        workedExample: {
          en: "$1,210 ÷ (1.10)² = $1,000.",
          fr: "1 210 $ ÷ (1,10)² = 1 000 $.",
        },
      },
      marketConnection: {
        en: "When market discount rates rise, present values fall. This logic sits behind the sensitivity of bond prices and long-duration equity valuations to interest rates.",
        fr: "Lorsque les taux d’actualisation de marché augmentent, les present values diminuent. Cette logique explique la sensibilité des prix obligataires et des valorisations d’actions longue duration aux taux d’intérêt.",
      },
    },
    {
      id: "frequency-ear",
      kicker: { en: "04 · COMPOUNDING FREQUENCY", fr: "04 · FRÉQUENCE DE CAPITALISATION" },
      title: {
        en: "Nominal rate and effective annual rate are not always the same",
        fr: "Taux nominal et taux annuel effectif ne sont pas toujours identiques",
      },
      coreFacts: [
        {
          en: "If interest compounds more than once per year, the effective annual rate can exceed the quoted nominal annual rate.",
          fr: "Si les intérêts sont capitalisés plusieurs fois par an, le taux annuel effectif / effective annual rate peut dépasser le taux nominal annuel annoncé.",
        },
        {
          en: "The periodic rate must be matched to the number of compounding periods.",
          fr: "Le taux périodique doit être cohérent avec le nombre de périodes de capitalisation.",
        },
        {
          en: "APR-style nominal quotations and effective annual yields answer different questions and should not be compared blindly.",
          fr: "Les cotations nominales de type APR et les taux annuels effectifs répondent à des questions différentes et ne doivent pas être comparés sans ajustement.",
        },
        {
          en: "Continuous compounding is a mathematical limiting case and is useful in some areas of finance, but many real contracts use discrete conventions.",
          fr: "La capitalisation continue / continuous compounding est un cas limite mathématique utile dans certains domaines, mais de nombreux contrats utilisent des conventions discrètes.",
        },
      ],
      explanation: {
        Beginner: {
          en: "A quoted 12% annual rate compounded monthly means 1% per month. Because each month's interest can itself earn interest, the effective annual return is about 12.68%, not exactly 12%.",
          fr: "Un taux annuel annoncé de 12 % capitalisé mensuellement signifie 1 % par mois. Comme les intérêts de chaque mois peuvent eux-mêmes produire des intérêts, le rendement annuel effectif est d’environ 12,68 %, et non exactement 12 %.",
        },
        Intermediate: {
          en: "Effective annual rate standardizes returns across compounding conventions. This is essential when comparing loans, deposits or investments quoted with different frequencies.",
          fr: "Le taux annuel effectif standardise les rendements entre différentes conventions de capitalisation. C’est essentiel pour comparer prêts, dépôts ou investissements annoncés avec des fréquences différentes.",
        },
        Professional: {
          en: "Rate convention is part of the instrument definition. Money-market, bond, swap and derivative products can use different day-count, compounding and quoting conventions, so professional comparison requires normalization rather than headline-rate comparison.",
          fr: "La convention de taux fait partie de la définition de l’instrument. Produits monétaires, obligataires, swaps et dérivés peuvent utiliser différentes conventions de day count, capitalisation et cotation ; une comparaison professionnelle nécessite donc une normalisation.",
        },
      },
      formula: {
        label: { en: "Effective annual rate", fr: "Taux annuel effectif / Effective annual rate" },
        expression: "EAR = (1 + Nominal Rate ÷ m)ᵐ − 1",
        explanation: {
          en: "m is the number of compounding periods per year.",
          fr: "m est le nombre de périodes de capitalisation par an.",
        },
        workedExample: {
          en: "12% nominal compounded monthly: (1 + 0.12/12)¹² − 1 ≈ 12.68%.",
          fr: "12 % nominal capitalisé mensuellement : (1 + 0,12/12)¹² − 1 ≈ 12,68 %.",
        },
      },
      vocabulary: [
        {
          en: "Effective annual rate",
          fr: "taux annuel effectif / effective annual rate",
          definition: {
            en: "The one-year rate that includes the effect of within-year compounding.",
            fr: "Taux sur un an intégrant l’effet de la capitalisation intra-annuelle.",
          },
        },
        {
          en: "Nominal rate",
          fr: "taux nominal / nominal rate",
          definition: {
            en: "A stated annualized rate before adjusting for the effect of compounding frequency.",
            fr: "Taux annualisé annoncé avant prise en compte de l’effet de la fréquence de capitalisation.",
          },
        },
      ],
    },
    {
      id: "annuities",
      kicker: { en: "05 · ANNUITIES", fr: "05 · ANNUITÉS" },
      title: {
        en: "A stream of equal payments has a compact valuation formula",
        fr: "Une série de paiements égaux possède une formule de valorisation compacte",
      },
      coreFacts: [
        {
          en: "An ordinary annuity pays equal cash flows at the end of each period.",
          fr: "Une annuité ordinaire / ordinary annuity verse des flux égaux à la fin de chaque période.",
        },
        {
          en: "An annuity due pays at the beginning of each period, so its value is higher than an otherwise identical ordinary annuity when rates are positive.",
          fr: "Une annuité à terme à échoir / annuity due paie au début de chaque période ; sa valeur est donc supérieure à une annuité ordinaire identique lorsque les taux sont positifs.",
        },
        {
          en: "The annuity formula is a shortcut for discounting each equal cash flow separately.",
          fr: "La formule d’annuité est un raccourci pour actualiser séparément chaque flux égal.",
        },
        {
          en: "Payment timing must be identified correctly before using a formula.",
          fr: "Le timing des paiements doit être identifié correctement avant d’utiliser une formule.",
        },
      ],
      explanation: {
        Beginner: {
          en: "Imagine receiving $100 at the end of each year for three years. You cannot simply say the stream is worth $300 today because the second and third payments arrive later. At a 5% discount rate, the present value is about $272.32.",
          fr: "Imagine recevoir 100 $ à la fin de chaque année pendant trois ans. Tu ne peux pas dire que la série vaut 300 $ aujourd’hui car les deuxième et troisième paiements arrivent plus tard. Avec un taux d’actualisation de 5 %, la valeur actuelle est d’environ 272,32 $.",
        },
        Intermediate: {
          en: "Annuity factors compress a geometric series of discount factors. Ordinary-annuity PV is useful for level payment streams, while an annuity due is simply shifted one period earlier and therefore multiplied by 1 + r.",
          fr: "Les facteurs d’annuité condensent une série géométrique de facteurs d’actualisation. La PV d’une ordinary annuity s’applique aux paiements constants, tandis qu’une annuity due est simplement décalée d’une période plus tôt et donc multipliée par 1 + r.",
        },
        Professional: {
          en: "Annuity formulas are special cases of discounted cash-flow algebra. Real contracts may include irregular dates, amortization, reset rates, prepayment or indexation, at which point explicit cash-flow modeling replaces the closed-form shortcut.",
          fr: "Les formules d’annuité sont des cas particuliers de l’algèbre DCF. Les contrats réels peuvent inclure dates irrégulières, amortissement, taux révisables, remboursement anticipé ou indexation ; dans ce cas, une modélisation explicite des cash flows remplace la formule fermée.",
        },
      },
      formula: {
        label: { en: "Present value of an ordinary annuity", fr: "Valeur actuelle d’une annuité ordinaire / Ordinary annuity PV" },
        expression: "PV = C × [1 − (1 + r)⁻ⁿ] ÷ r",
        explanation: {
          en: "C is the equal end-of-period payment, r the periodic discount rate and n the number of payments.",
          fr: "C est le paiement égal de fin de période, r le taux d’actualisation périodique et n le nombre de paiements.",
        },
        workedExample: {
          en: "$100 for 3 years at 5%: $100 × [1 − 1.05⁻³] / 0.05 ≈ $272.32.",
          fr: "100 $ pendant 3 ans à 5 % : 100 × [1 − 1,05⁻³] / 0,05 ≈ 272,32 $.",
        },
      },
      comparison: {
        title: { en: "Ordinary annuity vs annuity due", fr: "Ordinary annuity vs annuity due" },
        headers: [
          { en: "Type", fr: "Type" },
          { en: "Payment timing", fr: "Timing du paiement" },
          { en: "Relative PV if r > 0", fr: "PV relative si r > 0" },
        ],
        rows: [
          { cells: [
            { en: "Ordinary annuity", fr: "Annuité ordinaire / ordinary annuity" },
            { en: "End of each period", fr: "Fin de chaque période" },
            { en: "Lower", fr: "Plus faible" },
          ]},
          { cells: [
            { en: "Annuity due", fr: "Annuité à échoir / annuity due" },
            { en: "Beginning of each period", fr: "Début de chaque période" },
            { en: "Higher", fr: "Plus élevée" },
          ]},
        ],
      },
    },
    {
      id: "perpetuities",
      kicker: { en: "06 · PERPETUITIES", fr: "06 · PERPÉTUITÉS" },
      title: {
        en: "A perpetual stream can still have a finite present value",
        fr: "Une série de paiements infinie peut avoir une valeur actuelle finie",
      },
      coreFacts: [
        {
          en: "A simple perpetuity pays the same cash flow forever, beginning one period from now.",
          fr: "Une perpétuité simple / perpetuity verse le même cash flow pour toujours, à partir d’une période dans le futur.",
        },
        {
          en: "Its present value is finite when the discount rate is positive.",
          fr: "Sa valeur actuelle est finie lorsque le taux d’actualisation est positif.",
        },
        {
          en: "A growing perpetuity assumes cash flow grows at a constant rate forever and requires discount rate greater than growth rate for the standard formula.",
          fr: "Une perpétuité croissante / growing perpetuity suppose une croissance constante du cash flow à l’infini et nécessite un taux d’actualisation supérieur au taux de croissance pour la formule standard.",
        },
        {
          en: "Perpetuity formulas are powerful but extremely sensitive to discount-rate and growth assumptions.",
          fr: "Les formules de perpétuité sont puissantes mais extrêmement sensibles aux hypothèses de taux d’actualisation et de croissance.",
        },
      ],
      explanation: {
        Beginner: {
          en: "If an asset pays $50 every year forever and the appropriate discount rate is 5%, its value is $1,000. Why? Because 5% of $1,000 is $50, so the annual cash flow matches the required return on that capital.",
          fr: "Si un actif verse 50 $ chaque année pour toujours et que le taux d’actualisation approprié est 5 %, sa valeur est 1 000 $. Pourquoi ? Parce que 5 % de 1 000 $ = 50 $, donc le flux annuel correspond au rendement exigé sur ce capital.",
        },
        Intermediate: {
          en: "The perpetuity formula is the infinite-horizon limit of an annuity. Growing perpetuity extends the logic by allowing cash flow to grow at a stable rate, a concept that later becomes important in terminal-value methods.",
          fr: "La formule de perpétuité est la limite à horizon infini d’une annuité. La growing perpetuity étend la logique en autorisant une croissance stable du cash flow, concept qui deviendra important pour la terminal value.",
        },
        Professional: {
          en: "Perpetuity valuation is structurally fragile when r and g are close because the denominator becomes small. Terminal values based on Gordon growth therefore require economically sustainable long-run growth and a discount rate consistent with the risk and currency of the cash flows.",
          fr: "La valorisation par perpétuité devient structurellement fragile lorsque r et g sont proches car le dénominateur devient faible. Les terminal values utilisant Gordon growth exigent donc une croissance long terme économiquement soutenable et un discount rate cohérent avec le risque et la devise des cash flows.",
        },
      },
      formula: {
        label: { en: "Simple perpetuity", fr: "Perpétuité simple / Simple perpetuity" },
        expression: "PV = C ÷ r",
        explanation: {
          en: "C is the constant cash flow beginning one period from now.",
          fr: "C est le cash flow constant commençant dans une période.",
        },
        workedExample: {
          en: "$50 / 5% = $1,000.",
          fr: "50 $ / 5 % = 1 000 $.",
        },
      },
      marketConnection: {
        en: "Perpetuity logic appears later in dividend-discount models, terminal value and real-estate capitalization methods.",
        fr: "La logique de perpétuité réapparaît ensuite dans les dividend-discount models, terminal value et méthodes de capitalisation immobilière.",
      },
      vocabulary: [
        {
          en: "Terminal value",
          fr: "valeur terminale / terminal value",
          definition: {
            en: "An estimate of the value of cash flows beyond an explicit forecast period.",
            fr: "Estimation de la valeur des cash flows au-delà de la période de prévision explicite.",
          },
        },
        {
          en: "Gordon growth",
          fr: "croissance de Gordon / Gordon growth",
          definition: {
            en: "A constant-growth perpetuity framework often written as next-period cash flow divided by r minus g.",
            fr: "Cadre de perpétuité à croissance constante souvent écrit cash flow de la période suivante divisé par r moins g.",
          },
        },
      ],
    },
    {
      id: "npv",
      kicker: { en: "07 · NET PRESENT VALUE", fr: "07 · VALEUR ACTUELLE NETTE" },
      title: {
        en: "NPV turns a sequence of future cash flows into an investment decision",
        fr: "La NPV transforme une série de cash flows futurs en décision d’investissement",
      },
      coreFacts: [
        {
          en: "NPV equals the present value of future cash inflows and outflows, including the initial investment.",
          fr: "La NPV correspond à la valeur actuelle de tous les flux futurs entrants et sortants, y compris l’investissement initial.",
        },
        {
          en: "A positive NPV means the project's discounted value exceeds its cost under the chosen assumptions and discount rate.",
          fr: "Une NPV positive signifie que la valeur actualisée du projet dépasse son coût selon les hypothèses et le discount rate choisis.",
        },
        {
          en: "NPV is expressed in currency units, not as a percentage return.",
          fr: "La NPV s’exprime en unité monétaire, pas en pourcentage de rendement.",
        },
        {
          en: "An NPV result is only as reliable as the projected cash flows and discount rate.",
          fr: "Une NPV n’est fiable que dans la mesure où les projections de cash flows et le taux d’actualisation le sont.",
        },
      ],
      explanation: {
        Beginner: {
          en: "Suppose a project costs $1,000 today and pays $600 in year one and $600 in year two. At a 10% discount rate, those future payments are worth about $1,041.32 today. Subtract the $1,000 cost and NPV is about +$41.32.",
          fr: "Supposons qu’un projet coûte 1 000 $ aujourd’hui et rapporte 600 $ dans un an puis 600 $ dans deux ans. Avec un taux d’actualisation de 10 %, ces paiements valent environ 1 041,32 $ aujourd’hui. En retirant le coût de 1 000 $, la NPV vaut environ +41,32 $.",
        },
        Intermediate: {
          en: "NPV directly measures value creation relative to the required return embedded in the discount rate. For independent projects under consistent assumptions, positive NPV indicates value above the opportunity cost of capital.",
          fr: "La NPV mesure directement la création de valeur par rapport au rendement exigé intégré dans le discount rate. Pour des projets indépendants sous hypothèses cohérentes, une NPV positive indique une valeur supérieure au coût d’opportunité du capital.",
        },
        Professional: {
          en: "NPV is the canonical DCF decision rule, but implementation requires consistency across nominal versus real cash flows, currency, leverage treatment, taxes, timing conventions and risk adjustment. Scenario analysis and sensitivity analysis are essential because point-estimate NPV can conceal model fragility.",
          fr: "La NPV est la règle canonique de décision DCF, mais son application exige de la cohérence entre cash flows nominaux/réels, devise, traitement du levier, fiscalité, conventions de timing et ajustement du risque. Scenario analysis et sensitivity analysis sont essentiels car une NPV ponctuelle peut masquer la fragilité du modèle.",
        },
      },
      formula: {
        label: { en: "Net present value", fr: "Valeur actuelle nette / Net present value" },
        expression: "NPV = Σ [CFₜ ÷ (1 + r)ᵗ]",
        explanation: {
          en: "Include the initial investment as a time-zero cash flow, typically negative.",
          fr: "Inclure l’investissement initial comme cash flow à t = 0, généralement négatif.",
        },
        workedExample: {
          en: "−$1,000 + $600/1.10 + $600/1.10² ≈ +$41.32.",
          fr: "−1 000 $ + 600/1,10 + 600/1,10² ≈ +41,32 $.",
        },
      },
      marketConnection: {
        en: "DCF equity valuation, capital budgeting, bond pricing and many real-asset decisions are all variations on the same present-value logic.",
        fr: "Valorisation DCF d’actions, capital budgeting, prix obligataires et de nombreuses décisions sur actifs réels utilisent tous des variantes de cette même logique de present value.",
      },
    },
    {
      id: "discount-rate",
      kicker: { en: "08 · CHOOSING THE DISCOUNT RATE", fr: "08 · CHOISIR LE TAUX D’ACTUALISATION" },
      title: {
        en: "The rate must match the cash flow",
        fr: "Le taux doit être cohérent avec le cash flow",
      },
      coreFacts: [
        {
          en: "The discount rate represents the opportunity cost and risk appropriate to the cash flow being valued.",
          fr: "Le taux d’actualisation représente le coût d’opportunité et le risque appropriés au cash flow valorisé.",
        },
        {
          en: "Nominal cash flows should generally be paired with nominal discount rates, while real cash flows require real-rate consistency.",
          fr: "Les cash flows nominaux doivent généralement être associés à des taux nominaux, tandis que les cash flows réels nécessitent des taux réels cohérents.",
        },
        {
          en: "Riskier cash flows generally require a higher expected return, but risk adjustment should be conceptually consistent rather than arbitrary.",
          fr: "Des cash flows plus risqués exigent généralement un rendement attendu plus élevé, mais l’ajustement du risque doit rester conceptuellement cohérent et non arbitraire.",
        },
        {
          en: "The currency of the discount rate should match the currency of the cash flows.",
          fr: "La devise du discount rate doit correspondre à la devise des cash flows.",
        },
      ],
      explanation: {
        Beginner: {
          en: "Do not discount every cash flow at the same random rate. A nearly certain government payment and a risky startup cash flow do not have the same risk. The discount rate is how the valuation reflects the return you would demand for waiting and taking that risk.",
          fr: "Il ne faut pas actualiser tous les cash flows avec un taux choisi au hasard. Un paiement presque certain d’un État et un cash flow risqué de startup n’ont pas le même risque. Le discount rate reflète le rendement que tu exigerais pour attendre et supporter ce risque.",
        },
        Intermediate: {
          en: "Discount-rate selection combines a time-value benchmark with compensation for relevant risk. In corporate finance this eventually leads to concepts such as cost of equity, cost of debt and WACC.",
          fr: "Le choix du discount rate combine une référence de valeur temps avec une compensation pour le risque pertinent. En corporate finance, cela conduit ensuite aux concepts de cost of equity, cost of debt et WACC.",
        },
        Professional: {
          en: "The discount rate must be claim-consistent, currency-consistent and risk-consistent. Enterprise free cash flow is commonly paired with a WACC framework, while equity cash flow is paired with cost of equity. In asset pricing, some risks are better handled through state-contingent cash flows or discount factors rather than ad hoc additive premiums.",
          fr: "Le discount rate doit être cohérent avec la créance, la devise et le risque. Le free cash flow to firm est souvent associé au WACC, tandis que le cash flow equity est associé au cost of equity. En asset pricing, certains risques sont mieux traités via cash flows dépendants des états ou facteurs d’actualisation plutôt que via des primes arbitraires ajoutées au taux.",
        },
      },
      comparison: {
        title: { en: "Consistency rules", fr: "Règles de cohérence" },
        headers: [
          { en: "Cash-flow feature", fr: "Caractéristique du cash flow" },
          { en: "Discount-rate match", fr: "Taux cohérent" },
        ],
        rows: [
          { cells: [
            { en: "Nominal cash flow", fr: "Cash flow nominal" },
            { en: "Nominal discount rate", fr: "Taux nominal / nominal rate" },
          ]},
          { cells: [
            { en: "Real cash flow", fr: "Cash flow réel" },
            { en: "Real discount rate", fr: "Taux réel / real rate" },
          ]},
          { cells: [
            { en: "USD cash flow", fr: "Cash flow en USD" },
            { en: "USD-consistent rate", fr: "Taux cohérent USD" },
          ]},
          { cells: [
            { en: "Riskier claim", fr: "Créance plus risquée" },
            { en: "Risk-consistent required return", fr: "Rendement exigé cohérent avec le risque" },
          ]},
        ],
      },
      vocabulary: [
        {
          en: "Required return",
          fr: "rendement exigé / required return",
          definition: {
            en: "The return investors require to hold an exposure given its alternatives and risk.",
            fr: "Rendement exigé par les investisseurs compte tenu des alternatives et du risque.",
          },
        },
        {
          en: "WACC",
          fr: "coût moyen pondéré du capital / weighted average cost of capital",
          definition: {
            en: "A corporate-finance discount-rate framework combining after-tax debt and equity financing costs by capital weights.",
            fr: "Cadre de discount rate combinant coûts après impôt de la dette et de l’equity selon leurs poids dans le financement.",
          },
        },
      ],
    },
    {
      id: "timeline-errors",
      kicker: { en: "09 · MODELING DISCIPLINE", fr: "09 · DISCIPLINE DE MODÉLISATION" },
      title: {
        en: "Most TVM errors come from timing, units or inconsistent assumptions",
        fr: "La plupart des erreurs TVM viennent du timing, des unités ou d’hypothèses incohérentes",
      },
      coreFacts: [
        {
          en: "Drawing a timeline before calculating prevents many timing errors.",
          fr: "Dessiner une timeline avant le calcul évite de nombreuses erreurs de timing.",
        },
        {
          en: "Annual, monthly and quarterly rates cannot be mixed without conversion.",
          fr: "Taux annuels, mensuels et trimestriels ne peuvent pas être mélangés sans conversion.",
        },
        {
          en: "Time zero cash flows are not discounted because they occur today.",
          fr: "Les cash flows à t = 0 ne sont pas actualisés car ils ont lieu aujourd’hui.",
        },
        {
          en: "A formula is only a shortcut for a cash-flow pattern; when the pattern changes, explicit cash-flow modeling is safer.",
          fr: "Une formule n’est qu’un raccourci correspondant à une structure de cash flows ; lorsque cette structure change, modéliser explicitement chaque flux est plus sûr.",
        },
      ],
      explanation: {
        Beginner: {
          en: "Before touching the calculator, write: t=0 today, t=1 one year from now, t=2 two years from now. Place each cash flow on the timeline. Then ask whether you are moving money forward or backward in time. This simple habit prevents a huge number of mistakes.",
          fr: "Avant de toucher à la calculatrice, écris : t=0 aujourd’hui, t=1 dans un an, t=2 dans deux ans. Place chaque cash flow sur la timeline. Ensuite demande-toi si tu déplaces la valeur vers le futur ou vers le présent. Cette habitude évite énormément d’erreurs.",
        },
        Intermediate: {
          en: "Model discipline requires consistent rate periodicity, sign convention and cash-flow timing. When payments are irregular, abandon memorized annuity shortcuts and discount the actual dated cash flows.",
          fr: "La discipline de modèle exige cohérence de périodicité du taux, convention de signe et timing des cash flows. Lorsque les paiements sont irréguliers, il vaut mieux abandonner les raccourcis d’annuité et actualiser les flux réellement datés.",
        },
        Professional: {
          en: "Professional valuation errors often come less from algebra than from convention mismatch: mid-year versus year-end timing, stub periods, day-count, nominal/real inconsistency, currency mismatch, double-counting risk or terminal-value assumptions. Model governance begins with a transparent timeline and clearly defined conventions.",
          fr: "Les erreurs professionnelles de valorisation proviennent souvent moins de l’algèbre que d’incohérences de conventions : mid-year vs year-end, stub periods, day count, nominal/réel, devises, double comptage du risque ou hypothèses de terminal value. La gouvernance d’un modèle commence par une timeline transparente et des conventions clairement définies.",
        },
      },
      example: {
        en: "If a cash flow arrives in 18 months and your quoted rate is annual, you must define how the rate convention handles the 1.5-year period rather than pretending the payment arrives at year 1 or year 2.",
        fr: "Si un cash flow arrive dans 18 mois et que ton taux est annualisé, tu dois définir comment la convention de taux traite cette période de 1,5 an plutôt que prétendre que le paiement arrive à t=1 ou t=2.",
      },
      marketConnection: {
        en: "This modeling discipline becomes critical in bond accrued interest, DCF stub periods, swap cash flows, mortgages and project finance.",
        fr: "Cette discipline devient essentielle pour accrued interest obligataire, stub periods DCF, cash flows de swaps, crédits immobiliers et project finance.",
      },
    },
  ],
  quiz: [
    {
      id: "q1",
      conceptKey: "tvm-intuition",
      question: {
        en: "Why is $1,000 today generally worth more than $1,000 received one year from now?",
        fr: "Pourquoi 1 000 $ aujourd’hui valent-ils généralement plus que 1 000 $ reçus dans un an ?",
      },
      options: [
        { id: "a", label: { en: "Because today's cash can be used or invested immediately", fr: "Parce que le cash aujourd’hui peut être utilisé ou investi immédiatement" } },
        { id: "b", label: { en: "Because future cash is always worthless", fr: "Parce que le cash futur ne vaut jamais rien" } },
        { id: "c", label: { en: "Because inflation is always exactly 10%", fr: "Parce que l’inflation est toujours exactement 10 %" } },
        { id: "d", label: { en: "There is no difference", fr: "Il n’existe aucune différence" } },
      ],
      correctOption: "a",
      explanation: {
        en: "Immediate cash has opportunity value and avoids waiting; inflation and risk can add further reasons.",
        fr: "Le cash immédiat possède une valeur d’opportunité et évite l’attente ; inflation et risque peuvent renforcer cette différence.",
      },
    },
    {
      id: "q2",
      conceptKey: "future-value",
      question: {
        en: "What is the future value of $1,000 invested for 2 years at 10% annually?",
        fr: "Quelle est la valeur future de 1 000 $ investis pendant 2 ans à 10 % par an ?",
      },
      options: [
        { id: "a", label: { en: "$1,100", fr: "1 100 $" } },
        { id: "b", label: { en: "$1,200", fr: "1 200 $" } },
        { id: "c", label: { en: "$1,210", fr: "1 210 $" } },
        { id: "d", label: { en: "$1,220", fr: "1 220 $" } },
      ],
      correctOption: "c",
      explanation: {
        en: "$1,000 × 1.10² = $1,210.",
        fr: "1 000 $ × 1,10² = 1 210 $.",
      },
    },
    {
      id: "q3",
      conceptKey: "present-value",
      question: {
        en: "What is the present value of $1,210 received in 2 years at a 10% discount rate?",
        fr: "Quelle est la valeur actuelle de 1 210 $ reçus dans 2 ans avec un taux d’actualisation de 10 % ?",
      },
      options: [
        { id: "a", label: { en: "$1,000", fr: "1 000 $" } },
        { id: "b", label: { en: "$1,100", fr: "1 100 $" } },
        { id: "c", label: { en: "$1,210", fr: "1 210 $" } },
        { id: "d", label: { en: "$990", fr: "990 $" } },
      ],
      correctOption: "a",
      explanation: {
        en: "$1,210 ÷ 1.10² = $1,000.",
        fr: "1 210 $ ÷ 1,10² = 1 000 $.",
      },
    },
    {
      id: "q4",
      conceptKey: "compounding-frequency",
      question: {
        en: "A 12% nominal annual rate compounded monthly has an effective annual rate that is:",
        fr: "Un taux nominal annuel de 12 % capitalisé mensuellement possède un taux annuel effectif :",
      },
      options: [
        { id: "a", label: { en: "Exactly 1%", fr: "Exactement 1 %" } },
        { id: "b", label: { en: "Exactly 12%", fr: "Exactement 12 %" } },
        { id: "c", label: { en: "About 12.68%", fr: "Environ 12,68 %" } },
        { id: "d", label: { en: "About 24%", fr: "Environ 24 %" } },
      ],
      correctOption: "c",
      explanation: {
        en: "(1 + 0.12/12)¹² − 1 ≈ 12.68%.",
        fr: "(1 + 0,12/12)¹² − 1 ≈ 12,68 %.",
      },
    },
    {
      id: "q5",
      conceptKey: "annuity-timing",
      question: {
        en: "What is the defining timing difference between an ordinary annuity and an annuity due?",
        fr: "Quelle est la différence de timing entre ordinary annuity et annuity due ?",
      },
      options: [
        { id: "a", label: { en: "Ordinary annuity pays at period end; annuity due pays at period beginning", fr: "Ordinary annuity paie en fin de période ; annuity due en début de période" } },
        { id: "b", label: { en: "There is no timing difference", fr: "Il n’existe aucune différence de timing" } },
        { id: "c", label: { en: "Annuity due has random payments", fr: "L’annuity due possède des paiements aléatoires" } },
        { id: "d", label: { en: "Ordinary annuity never ends", fr: "L’ordinary annuity ne se termine jamais" } },
      ],
      correctOption: "a",
      explanation: {
        en: "Payment timing is the distinction: end-of-period versus beginning-of-period.",
        fr: "La distinction vient du timing : fin de période contre début de période.",
      },
    },
    {
      id: "q6",
      conceptKey: "perpetuity",
      question: {
        en: "What is the present value of a $50 annual perpetuity at a 5% discount rate?",
        fr: "Quelle est la valeur actuelle d’une perpétuité annuelle de 50 $ avec un taux d’actualisation de 5 % ?",
      },
      options: [
        { id: "a", label: { en: "$250", fr: "250 $" } },
        { id: "b", label: { en: "$500", fr: "500 $" } },
        { id: "c", label: { en: "$1,000", fr: "1 000 $" } },
        { id: "d", label: { en: "$2,500", fr: "2 500 $" } },
      ],
      correctOption: "c",
      explanation: {
        en: "$50 ÷ 0.05 = $1,000.",
        fr: "50 $ ÷ 0,05 = 1 000 $.",
      },
    },
    {
      id: "q7",
      conceptKey: "npv",
      question: {
        en: "A project costs $1,000 today and has a present value of future inflows of $1,080. What is its NPV?",
        fr: "Un projet coûte 1 000 $ aujourd’hui et la valeur actuelle de ses flux futurs entrants vaut 1 080 $. Quelle est sa NPV ?",
      },
      options: [
        { id: "a", label: { en: "−$80", fr: "−80 $" } },
        { id: "b", label: { en: "$0", fr: "0 $" } },
        { id: "c", label: { en: "+$80", fr: "+80 $" } },
        { id: "d", label: { en: "+$1,080", fr: "+1 080 $" } },
      ],
      correctOption: "c",
      explanation: {
        en: "$1,080 − $1,000 = +$80 NPV.",
        fr: "1 080 $ − 1 000 $ = +80 $ de NPV.",
      },
    },
    {
      id: "q8",
      conceptKey: "discount-rate-consistency",
      question: {
        en: "Which pairing is conceptually consistent?",
        fr: "Quelle association est conceptuellement cohérente ?",
      },
      options: [
        { id: "a", label: { en: "Real cash flows with an unrelated nominal discount rate", fr: "Cash flows réels avec un taux nominal sans rapport" } },
        { id: "b", label: { en: "USD cash flows with a risk- and currency-consistent USD discount rate", fr: "Cash flows USD avec un discount rate USD cohérent avec la devise et le risque" } },
        { id: "c", label: { en: "Any cash flow with any convenient rate", fr: "N’importe quel cash flow avec n’importe quel taux pratique" } },
        { id: "d", label: { en: "Time-zero cash flows discounted for ten years", fr: "Cash flows à t=0 actualisés pendant dix ans" } },
      ],
      correctOption: "b",
      explanation: {
        en: "Discount rates should match the cash flow's currency, timing, nominal/real convention and risk.",
        fr: "Le discount rate doit être cohérent avec devise, timing, convention nominal/réel et risque du cash flow.",
      },
    },
  ],
  interviewPrompt: {
    question: {
      en: "Why is $100 today worth more than $100 in one year, and how would you value $100 received one year from now?",
      fr: "Pourquoi 100 $ aujourd’hui valent-ils plus que 100 $ dans un an, et comment valoriserais-tu 100 $ reçus dans un an ?",
    },
    framework: [
      {
        en: "Start with opportunity cost: money today can be invested immediately.",
        fr: "Commencer par le coût d’opportunité : l’argent aujourd’hui peut être investi immédiatement.",
      },
      {
        en: "Mention inflation and uncertainty as additional economic reasons when relevant.",
        fr: "Mentionner inflation et incertitude comme raisons économiques supplémentaires lorsque pertinentes.",
      },
      {
        en: "State the present-value formula: PV = FV / (1 + r) for one period.",
        fr: "Donner la formule de present value : PV = FV / (1 + r) pour une période.",
      },
      {
        en: "Explain that r must be an appropriate opportunity-cost and risk-adjusted discount rate.",
        fr: "Expliquer que r doit être un discount rate approprié au coût d’opportunité et au risque.",
      },
      {
        en: "Use a number: at 5%, $100 in one year is worth about $95.24 today.",
        fr: "Utiliser un nombre : à 5 %, 100 $ dans un an valent environ 95,24 $ aujourd’hui.",
      },
    ],
    sample: {
      en: "One hundred dollars today is generally worth more than one hundred dollars in a year because today's money can be invested immediately, and future purchasing power and payment are uncertain. To value $100 received in one year, I would discount it at an appropriate required return. At a 5% discount rate, present value is $100 divided by 1.05, or about $95.24. The broader principle is that valuation compares cash flows at different dates by bringing them to a common point in time.",
      fr: "Cent dollars aujourd’hui valent généralement plus que cent dollars dans un an car l’argent disponible aujourd’hui peut être investi immédiatement, tandis que le pouvoir d’achat futur et le paiement futur comportent de l’incertitude. Pour valoriser 100 $ reçus dans un an, je les actualise avec un rendement exigé approprié. Avec un discount rate de 5 %, la valeur actuelle vaut 100 / 1,05, soit environ 95,24 $. Le principe général est que la valorisation compare des cash flows reçus à différentes dates en les ramenant à un même point dans le temps.",
    },
  },
};


export const riskReturnDiversificationLesson: FinanceLesson = {
  slug: "year-1-risk-return-diversification",
  year: { en: "Year 1 · Foundations", fr: "Année 1 · Fondations" },
  domain: { en: "Portfolio & Risk", fr: "Portefeuille & risque / Portfolio & Risk" },
  title: {
    en: "Risk, Return & Diversification",
    fr: "Risque, rendement & diversification / Risk, Return & Diversification",
  },
  subtitle: {
    en: "Learn how finance measures return and uncertainty, why correlation matters as much as volatility, how portfolio risk differs from single-asset risk, and why diversification reduces some risks but never eliminates all uncertainty.",
    fr: "Comprendre comment la finance mesure rendement et incertitude, pourquoi la corrélation / correlation compte autant que la volatilité, comment le risque d’un portefeuille diffère du risque d’un actif isolé et pourquoi la diversification réduit certains risques sans jamais supprimer toute incertitude.",
  },
  duration: { en: "85–105 min", fr: "85–105 min" },
  prerequisites: [
    {
      en: "Time Value of Money",
      fr: "Valeur temps de l’argent / Time Value of Money",
    },
    {
      en: "Basic percentages and square roots",
      fr: "Pourcentages de base et racines carrées",
    },
  ],
  objectives: [
    {
      en: "Calculate holding-period return, expected return and weighted portfolio return.",
      fr: "Calculer rendement de période / holding-period return, rendement attendu / expected return et rendement pondéré d’un portefeuille.",
    },
    {
      en: "Explain variance and standard deviation as measures of dispersion rather than guaranteed future loss.",
      fr: "Expliquer variance et écart-type / standard deviation comme mesures de dispersion et non comme pertes futures garanties.",
    },
    {
      en: "Calculate and interpret covariance and correlation.",
      fr: "Calculer et interpréter covariance et corrélation / correlation.",
    },
    {
      en: "Use the two-asset portfolio variance formula and explain the diversification effect.",
      fr: "Utiliser la formule de variance d’un portefeuille à deux actifs et expliquer l’effet de diversification.",
    },
    {
      en: "Distinguish systematic risk from idiosyncratic risk.",
      fr: "Distinguer risque systématique / systematic risk et risque spécifique / idiosyncratic risk.",
    },
    {
      en: "Interpret the Sharpe ratio and recognize its limitations.",
      fr: "Interpréter le ratio de Sharpe / Sharpe ratio et reconnaître ses limites.",
    },
  ],
  overviewFlow: {
    title: {
      en: "From individual returns to portfolio risk",
      fr: "Du rendement individuel au risque du portefeuille",
    },
    steps: [
      {
        title: { en: "Returns", fr: "Rendements / Returns" },
        detail: { en: "Price change · income · expected return", fr: "Variation de prix · revenu · rendement attendu" },
      },
      {
        title: { en: "Single-asset risk", fr: "Risque d’un actif" },
        detail: { en: "Variance · volatility · downside", fr: "Variance · volatilité · downside" },
      },
      {
        title: { en: "Co-movement", fr: "Co-mouvement" },
        detail: { en: "Covariance · correlation", fr: "Covariance · corrélation" },
      },
      {
        title: { en: "Portfolio outcome", fr: "Résultat portefeuille" },
        detail: { en: "Weights · diversification · risk-adjusted return", fr: "Poids · diversification · rendement ajusté du risque" },
      },
    ],
  },
  sections: [
    {
      id: "risk-return-intuition",
      kicker: { en: "01 · RETURN IS NOT FREE", fr: "01 · LE RENDEMENT N’EST PAS GRATUIT" },
      title: {
        en: "Return is compensation for deploying capital; risk is uncertainty around outcomes",
        fr: "Le rendement rémunère le capital engagé ; le risque représente l’incertitude sur les résultats",
      },
      coreFacts: [
        {
          en: "Return measures the economic gain or loss on invested capital over a defined period.",
          fr: "Le rendement / return mesure le gain ou la perte économique sur un capital investi pendant une période définie.",
        },
        {
          en: "Risk is multidimensional: volatility, drawdown, credit loss, liquidity, concentration and tail outcomes capture different forms of uncertainty.",
          fr: "Le risque est multidimensionnel : volatilité, drawdown, perte de crédit, liquidité, concentration et événements extrêmes / tail outcomes décrivent différentes formes d’incertitude.",
        },
        {
          en: "Higher expected return is not a guarantee of higher realized return.",
          fr: "Un rendement attendu / expected return plus élevé ne garantit pas un rendement réalisé plus élevé.",
        },
        {
          en: "A useful portfolio decision compares expected reward with the nature, size and timing of the risks required to earn it.",
          fr: "Une bonne décision de portefeuille compare le rendement attendu avec la nature, la taille et le timing des risques nécessaires pour l’obtenir.",
        },
      ],
      explanation: {
        Beginner: {
          en: "If one investment might earn 8% but can move sharply up or down, while another pays a more stable 3%, the first does not automatically 'beat' the second. You need to understand how uncertain the 8% is, how much loss you could tolerate and how the investment behaves with the rest of your portfolio.",
          fr: "Si un investissement peut rapporter 8 % mais varier fortement à la hausse comme à la baisse, alors qu’un autre rapporte un 3 % plus stable, le premier ne « bat » pas automatiquement le second. Il faut comprendre l’incertitude autour des 8 %, la perte que tu peux supporter et le comportement de l’investissement avec le reste du portefeuille.",
        },
        Intermediate: {
          en: "Expected return summarizes the central tendency of possible outcomes, while risk describes the distribution around that expectation. Variance and volatility are common statistical measures, but economically meaningful risk also includes asymmetry, tail loss, liquidity and horizon mismatch.",
          fr: "Le rendement attendu résume la tendance centrale des résultats possibles, tandis que le risque décrit leur distribution autour de cette attente. Variance et volatilité sont des mesures statistiques courantes, mais le risque économique comprend aussi asymétrie, pertes extrêmes / tail losses, liquidité et inadéquation d’horizon.",
        },
        Professional: {
          en: "Risk should be defined relative to an objective and liability structure, not treated as a single universal number. Volatility is a convenient second-moment statistic, but institutional risk frameworks combine factor exposures, drawdown, liquidity, stress loss, tail metrics, leverage and path dependency.",
          fr: "Le risque doit être défini relativement à un objectif et une structure de passifs, pas comme un nombre universel unique. La volatilité est une statistique pratique de second moment, mais les cadres institutionnels combinent expositions factorielles, drawdown, liquidité, pertes de stress, tail metrics, levier et dépendance au chemin.",
        },
      },
      comparison: {
        title: { en: "Different meanings of risk", fr: "Différentes dimensions du risque" },
        headers: [
          { en: "Risk measure", fr: "Mesure de risque" },
          { en: "What it captures", fr: "Ce qu’elle mesure" },
          { en: "What it can miss", fr: "Ce qu’elle peut manquer" },
        ],
        rows: [
          { cells: [
            { en: "Volatility", fr: "Volatilité / volatility" },
            { en: "Dispersion of returns", fr: "Dispersion des rendements" },
            { en: "Direction and tail shape", fr: "Direction et forme des tails" },
          ]},
          { cells: [
            { en: "Drawdown", fr: "Drawdown / perte depuis un sommet" },
            { en: "Peak-to-trough loss", fr: "Perte entre sommet et point bas" },
            { en: "Probability before the event", fr: "Probabilité avant l’événement" },
          ]},
          { cells: [
            { en: "Credit risk", fr: "Risque de crédit / credit risk" },
            { en: "Failure to meet contractual payments", fr: "Défaut sur paiements contractuels" },
            { en: "Market volatility alone", fr: "La volatilité de marché seule" },
          ]},
          { cells: [
            { en: "Liquidity risk", fr: "Risque de liquidité / liquidity risk" },
            { en: "Cost or difficulty of exiting", fr: "Coût ou difficulté de sortie" },
            { en: "Fundamental value alone", fr: "Valeur fondamentale seule" },
          ]},
        ],
      },
      vocabulary: [
        {
          en: "Realized return",
          fr: "rendement réalisé / realized return",
          definition: {
            en: "The return actually experienced over a completed period.",
            fr: "Rendement effectivement obtenu sur une période terminée.",
          },
        },
        {
          en: "Expected return",
          fr: "rendement attendu / expected return",
          definition: {
            en: "A probability-weighted or model-based expectation of future return.",
            fr: "Espérance de rendement futur fondée sur des probabilités ou un modèle.",
          },
        },
      ],
    },
    {
      id: "return-calculation",
      kicker: { en: "02 · MEASURING RETURN", fr: "02 · MESURER LE RENDEMENT" },
      title: {
        en: "Price change and income both contribute to total return",
        fr: "Variation de prix et revenu contribuent tous deux au rendement total",
      },
      coreFacts: [
        {
          en: "Holding-period return combines price change with cash income received during the period.",
          fr: "Le rendement de période / holding-period return combine variation du prix et revenu cash reçu pendant la période.",
        },
        {
          en: "Returns should be measured over clearly defined horizons and with consistent treatment of distributions, fees and reinvestment.",
          fr: "Les rendements doivent être mesurés sur des horizons clairement définis avec un traitement cohérent des distributions, frais et réinvestissements.",
        },
        {
          en: "Arithmetic returns are convenient for one-period averages, while multi-period wealth compounds geometrically.",
          fr: "Les rendements arithmétiques sont pratiques pour les moyennes sur une période, tandis que la richesse multi-périodes se capitalise géométriquement.",
        },
        {
          en: "A loss of 50% requires a gain of 100% to return to the starting value.",
          fr: "Une perte de 50 % nécessite ensuite un gain de 100 % pour revenir à la valeur de départ.",
        },
      ],
      explanation: {
        Beginner: {
          en: "Buy at $100, receive $3 of income and finish at $108. Your gain is $11: $8 of price appreciation plus $3 of income. Divide $11 by the original $100 and your total return is 11%.",
          fr: "Tu achètes à 100 $, reçois 3 $ de revenu et termines à 108 $. Ton gain total est 11 $ : 8 $ de hausse du prix plus 3 $ de revenu. En divisant 11 par les 100 $ initiaux, le rendement total est 11 %.",
        },
        Intermediate: {
          en: "Holding-period return is a wealth-relative measure. Across multiple periods, cumulative wealth is obtained by multiplying gross returns, not by simply adding percentage returns. This is why volatility can create a gap between arithmetic average return and compound growth.",
          fr: "Le holding-period return mesure l’évolution relative de la richesse. Sur plusieurs périodes, la richesse cumulée s’obtient en multipliant les rendements bruts, pas en additionnant simplement les pourcentages. C’est pourquoi la volatilité peut créer un écart entre moyenne arithmétique et croissance composée.",
        },
        Professional: {
          en: "Performance measurement requires a convention for income, fees, taxes, cash flows and benchmark timing. Time-weighted return isolates investment performance from external cash flows, while money-weighted return reflects the investor's actual timing and is linked to IRR concepts.",
          fr: "La mesure de performance exige une convention pour revenu, frais, fiscalité, flux externes et timing du benchmark. Le time-weighted return isole la performance d’investissement des flux externes, tandis que le money-weighted return reflète le timing réel de l’investisseur et se rapproche des concepts d’IRR.",
        },
      },
      formula: {
        label: { en: "Holding-period total return", fr: "Rendement total de période / Holding-period return" },
        expression: "Return = (Ending Value − Starting Value + Income) ÷ Starting Value",
        explanation: {
          en: "Income can include dividends, coupons or other distributions, depending on the asset.",
          fr: "Le revenu peut inclure dividendes, coupons ou autres distributions selon l’actif.",
        },
        workedExample: {
          en: "($108 − $100 + $3) ÷ $100 = 11%.",
          fr: "(108 $ − 100 $ + 3 $) ÷ 100 $ = 11 %.",
        },
      },
      vocabulary: [
        {
          en: "Gross return",
          fr: "rendement brut / gross return",
          definition: {
            en: "One plus the simple return, often used for compounding across periods.",
            fr: "Un plus le rendement simple, souvent utilisé pour capitaliser plusieurs périodes.",
          },
        },
        {
          en: "Drawdown",
          fr: "drawdown / perte depuis un sommet",
          definition: {
            en: "The decline from a prior peak to a subsequent trough before recovery.",
            fr: "Baisse depuis un sommet antérieur jusqu’à un point bas avant récupération.",
          },
        },
      ],
    },
    {
      id: "expected-return",
      kicker: { en: "03 · EXPECTED RETURN", fr: "03 · RENDEMENT ATTENDU" },
      title: {
        en: "Expected return is a probability-weighted average, not a promise",
        fr: "Le rendement attendu est une moyenne pondérée par les probabilités, pas une promesse",
      },
      coreFacts: [
        {
          en: "Expected return weights each possible outcome by its probability.",
          fr: "Le rendement attendu / expected return pondère chaque résultat possible par sa probabilité.",
        },
        {
          en: "The expected return can be an outcome that never actually occurs.",
          fr: "Le rendement attendu peut être une valeur qui ne se réalise jamais exactement.",
        },
        {
          en: "Probabilities must sum to 100% in a complete discrete-state model.",
          fr: "Les probabilités doivent totaliser 100 % dans un modèle discret complet.",
        },
        {
          en: "Expected return depends on the quality of the assumptions; changing probabilities or scenarios changes the estimate.",
          fr: "Le rendement attendu dépend de la qualité des hypothèses ; changer probabilités ou scénarios modifie l’estimation.",
        },
      ],
      explanation: {
        Beginner: {
          en: "Suppose an investment has a 60% chance of earning 15% and a 40% chance of losing 5%. Its expected return is 0.60×15% + 0.40×(−5%) = 7%. That does not mean you will earn exactly 7%; the actual outcome in this simple model is either +15% or −5%.",
          fr: "Supposons qu’un investissement ait 60 % de chances de gagner 15 % et 40 % de chances de perdre 5 %. Son rendement attendu vaut 0,60×15 % + 0,40×(−5 %) = 7 %. Cela ne signifie pas que tu gagneras exactement 7 % ; dans ce modèle simple, le résultat réel est soit +15 %, soit −5 %.",
        },
        Intermediate: {
          en: "Expected value compresses a return distribution into its first moment. It is useful for portfolio construction, but two assets with the same expected return can have radically different dispersion, skewness and tail risk.",
          fr: "L’espérance compresse une distribution de rendement en son premier moment. Elle est utile pour la construction de portefeuille, mais deux actifs ayant le même expected return peuvent avoir dispersion, asymétrie et tail risk très différents.",
        },
        Professional: {
          en: "Expected return can be estimated from equilibrium models, factor premia, scenario analysis, valuation-implied returns or forecasts. The estimate is inherently uncertain, so robust portfolio construction treats expected returns as noisy inputs rather than precise truths.",
          fr: "Le rendement attendu peut être estimé via modèles d’équilibre, primes factorielles, scénarios, rendements implicites de valorisation ou prévisions. Cette estimation est intrinsèquement incertaine ; une construction robuste considère donc les expected returns comme des inputs bruités plutôt que des vérités précises.",
        },
      },
      formula: {
        label: { en: "Expected return", fr: "Rendement attendu / Expected return" },
        expression: "E[R] = Σ pᵢ × Rᵢ",
        explanation: {
          en: "pᵢ is the probability of outcome i and Rᵢ is the return in that outcome.",
          fr: "pᵢ est la probabilité du scénario i et Rᵢ le rendement dans ce scénario.",
        },
        workedExample: {
          en: "0.60×15% + 0.40×(−5%) = 7%.",
          fr: "0,60×15 % + 0,40×(−5 %) = 7 %.",
        },
      },
    },
    {
      id: "variance-volatility",
      kicker: { en: "04 · VARIANCE & VOLATILITY", fr: "04 · VARIANCE & VOLATILITÉ" },
      title: {
        en: "Volatility measures dispersion around an average outcome",
        fr: "La volatilité mesure la dispersion autour d’un résultat moyen",
      },
      coreFacts: [
        {
          en: "Variance is the expected squared deviation from the mean; standard deviation is the square root of variance.",
          fr: "La variance est l’espérance de l’écart au carré par rapport à la moyenne ; l’écart-type / standard deviation est la racine carrée de la variance.",
        },
        {
          en: "Standard deviation is expressed in the same return units as the underlying data, making it easier to interpret than variance.",
          fr: "L’écart-type s’exprime dans les mêmes unités de rendement que les données, ce qui le rend plus facile à interpréter que la variance.",
        },
        {
          en: "Volatility treats upside and downside deviations symmetrically.",
          fr: "La volatilité traite symétriquement les écarts positifs et négatifs.",
        },
        {
          en: "Historical volatility is backward-looking and may not represent future risk, especially when regimes change.",
          fr: "La volatilité historique est rétrospective et peut mal représenter le risque futur, surtout lors d’un changement de régime.",
        },
      ],
      explanation: {
        Beginner: {
          en: "Return A that stays near 7% every period is more stable than Return B that swings between large gains and losses even if both average 7%. Standard deviation gives a number for how widely results tend to spread around the average.",
          fr: "Un rendement A qui reste proche de 7 % à chaque période est plus stable qu’un rendement B qui alterne fortes hausses et fortes baisses même si les deux ont une moyenne de 7 %. L’écart-type donne un nombre décrivant l’ampleur habituelle de la dispersion autour de la moyenne.",
        },
        Intermediate: {
          en: "Variance squares deviations so positive and negative differences do not cancel. Standard deviation then converts the result back into return units. Under a normal-distribution approximation, volatility also connects to probability ranges, though real returns often exhibit skewness and fat tails.",
          fr: "La variance met les écarts au carré afin que différences positives et négatives ne s’annulent pas. L’écart-type reconvertit ensuite le résultat en unités de rendement. Sous approximation normale, la volatilité peut être reliée à des intervalles de probabilité, mais les rendements réels présentent souvent asymétrie et queues épaisses / fat tails.",
        },
        Professional: {
          en: "Volatility is a conditional and horizon-dependent statistic. Annualization usually scales standard deviation by the square root of time only under assumptions such as independent, identically distributed increments. Clustering, autocorrelation, stochastic volatility and jumps can invalidate naive scaling.",
          fr: "La volatilité dépend du régime et de l’horizon. L’annualisation par racine carrée du temps suppose notamment des variations indépendantes et identiquement distribuées. Clustering de volatilité, autocorrélation, volatilité stochastique et jumps peuvent rendre ce scaling naïf incorrect.",
        },
      },
      formula: {
        label: { en: "State-based variance and volatility", fr: "Variance et volatilité par scénarios" },
        expression: "Variance = Σ pᵢ(Rᵢ − E[R])²   ·   σ = √Variance",
        explanation: {
          en: "Using decimal returns avoids unit confusion. Standard deviation σ is the square root of variance.",
          fr: "Utiliser les rendements en décimales évite les confusions d’unités. L’écart-type σ est la racine carrée de la variance.",
        },
        workedExample: {
          en: "For 60% chance of +15% and 40% chance of −5%, E[R]=7%. Variance = 0.60×0.08² + 0.40×(−0.12)² = 0.0096, so σ ≈ 9.80%.",
          fr: "Avec 60 % de chances de +15 % et 40 % de chances de −5 %, E[R]=7 %. Variance = 0,60×0,08² + 0,40×(−0,12)² = 0,0096, donc σ ≈ 9,80 %.",
        },
      },
      vocabulary: [
        {
          en: "Variance",
          fr: "variance",
          definition: {
            en: "The average squared dispersion of outcomes around their mean under the chosen probability or sample convention.",
            fr: "Dispersion moyenne au carré des résultats autour de leur moyenne selon la convention de probabilité ou d’échantillon utilisée.",
          },
        },
        {
          en: "Standard deviation",
          fr: "écart-type / standard deviation",
          definition: {
            en: "The square root of variance, commonly interpreted as volatility for returns.",
            fr: "Racine carrée de la variance, couramment interprétée comme volatilité pour des rendements.",
          },
        },
      ],
    },
    {
      id: "covariance-correlation",
      kicker: { en: "05 · CO-MOVEMENT", fr: "05 · CO-MOUVEMENT" },
      title: {
        en: "Diversification depends on how assets move together",
        fr: "La diversification dépend de la manière dont les actifs évoluent ensemble",
      },
      coreFacts: [
        {
          en: "Covariance measures whether two returns tend to move in the same or opposite directions, but its scale depends on the units and volatilities.",
          fr: "La covariance mesure si deux rendements ont tendance à évoluer dans le même sens ou en sens opposé, mais son échelle dépend des unités et volatilités.",
        },
        {
          en: "Correlation standardizes covariance to a range from −1 to +1.",
          fr: "La corrélation / correlation standardise la covariance sur une plage de −1 à +1.",
        },
        {
          en: "Correlation of +1 means perfect linear co-movement, −1 perfect opposite linear movement and 0 no linear correlation.",
          fr: "Une corrélation de +1 signifie co-mouvement linéaire parfait, −1 mouvement linéaire opposé parfait et 0 absence de corrélation linéaire.",
        },
        {
          en: "Zero correlation does not mean independence, and historical correlation can change materially in stress.",
          fr: "Une corrélation nulle ne signifie pas indépendance, et les corrélations historiques peuvent fortement changer en période de stress.",
        },
      ],
      explanation: {
        Beginner: {
          en: "If two investments always rise and fall together, owning both may not reduce risk very much. If their movements are less synchronized, weakness in one can sometimes be offset by strength or stability in the other. Correlation measures that relationship.",
          fr: "Si deux investissements montent et baissent toujours ensemble, détenir les deux peut réduire assez peu le risque. Si leurs mouvements sont moins synchronisés, la faiblesse de l’un peut parfois être compensée par la force ou la stabilité de l’autre. La corrélation mesure cette relation.",
        },
        Intermediate: {
          en: "Covariance enters portfolio variance directly, while correlation provides a scale-free interpretation. Correlation is especially useful for comparing relationships across pairs with different volatility levels.",
          fr: "La covariance entre directement dans la variance de portefeuille, tandis que la corrélation fournit une interprétation indépendante de l’échelle. Elle est particulièrement utile pour comparer des paires présentant des niveaux de volatilité différents.",
        },
        Professional: {
          en: "Correlation is regime-dependent, estimator-sensitive and nonlinear relationships can be invisible to Pearson correlation. Portfolio construction often supplements static correlation matrices with factor models, shrinkage, stress correlation and scenario analysis.",
          fr: "La corrélation dépend du régime, de l’estimateur et peut manquer des relations non linéaires. La construction professionnelle complète donc souvent les matrices statiques par modèles factoriels, shrinkage, stress correlations et analyses de scénarios.",
        },
      },
      formula: {
        label: { en: "Correlation", fr: "Corrélation / Correlation" },
        expression: "ρ₍A,B₎ = Cov(A,B) ÷ (σA × σB)",
        explanation: {
          en: "Correlation divides covariance by the product of the two standard deviations.",
          fr: "La corrélation divise la covariance par le produit des deux écarts-types.",
        },
        workedExample: {
          en: "If Cov(A,B)=0.006, σA=20% and σB=15%, correlation = 0.006 ÷ (0.20×0.15) = 0.20.",
          fr: "Si Cov(A,B)=0,006, σA=20 % et σB=15 %, la corrélation = 0,006 ÷ (0,20×0,15) = 0,20.",
        },
      },
      marketConnection: {
        en: "Cross-asset correlations often change when inflation, liquidity or risk sentiment becomes the dominant market driver, reducing the protection investors expected from historical relationships.",
        fr: "Les corrélations multi-actifs changent souvent lorsque inflation, liquidité ou sentiment de risque deviennent les moteurs dominants du marché, réduisant la protection attendue à partir des relations historiques.",
      },
      vocabulary: [
        {
          en: "Covariance",
          fr: "covariance",
          definition: {
            en: "A measure of joint variation between two variables.",
            fr: "Mesure de variation conjointe entre deux variables.",
          },
        },
        {
          en: "Correlation",
          fr: "corrélation / correlation",
          definition: {
            en: "A standardized measure of linear co-movement ranging from −1 to +1.",
            fr: "Mesure standardisée du co-mouvement linéaire comprise entre −1 et +1.",
          },
        },
      ],
    },
    {
      id: "portfolio-return",
      kicker: { en: "06 · PORTFOLIO RETURN", fr: "06 · RENDEMENT DU PORTEFEUILLE" },
      title: {
        en: "Portfolio expected return is the weighted average of asset expected returns",
        fr: "Le rendement attendu du portefeuille est la moyenne pondérée des rendements attendus",
      },
      coreFacts: [
        {
          en: "Portfolio weights represent the share of portfolio value allocated to each asset under the chosen convention.",
          fr: "Les poids de portefeuille / portfolio weights représentent la part de valeur allouée à chaque actif selon la convention choisie.",
        },
        {
          en: "For a fully invested long-only portfolio, weights commonly sum to 100%.",
          fr: "Pour un portefeuille long-only entièrement investi, les poids totalisent généralement 100 %.",
        },
        {
          en: "Expected portfolio return is linear in weights, unlike portfolio volatility.",
          fr: "Le rendement attendu du portefeuille est linéaire par rapport aux poids, contrairement à la volatilité du portefeuille.",
        },
        {
          en: "Leverage, short positions and cash can cause weights to behave differently from the simple long-only case.",
          fr: "Le levier, les positions short et le cash peuvent rendre les poids différents du cas long-only simple.",
        },
      ],
      explanation: {
        Beginner: {
          en: "If 60% of your portfolio is in an asset expected to return 8% and 40% is in an asset expected to return 3%, expected portfolio return is 0.60×8% + 0.40×3% = 6%.",
          fr: "Si 60 % du portefeuille sont investis dans un actif au rendement attendu de 8 % et 40 % dans un actif à 3 %, le rendement attendu du portefeuille vaut 0,60×8 % + 0,40×3 % = 6 %.",
        },
        Intermediate: {
          en: "Portfolio expected return is a weighted average because each dollar contributes proportionally to expected payoff. Risk does not aggregate the same way because cross-products between assets introduce covariance.",
          fr: "Le rendement attendu du portefeuille est une moyenne pondérée car chaque dollar contribue proportionnellement au payoff attendu. Le risque ne s’additionne pas de la même manière car les termes croisés entre actifs introduisent la covariance.",
        },
        Professional: {
          en: "Expected portfolio return is w'μ in vector notation. In optimization, this linear expected-return term is combined with a quadratic covariance term, constraints, transaction costs and estimation uncertainty.",
          fr: "Le rendement attendu du portefeuille s’écrit w'μ en notation vectorielle. En optimisation, ce terme linéaire est combiné à un terme quadratique de covariance, des contraintes, coûts de transaction et incertitudes d’estimation.",
        },
      },
      formula: {
        label: { en: "Expected portfolio return", fr: "Rendement attendu du portefeuille" },
        expression: "E[Rₚ] = Σ wᵢ × E[Rᵢ]",
        explanation: {
          en: "wᵢ is the portfolio weight of asset i.",
          fr: "wᵢ représente le poids de l’actif i dans le portefeuille.",
        },
        workedExample: {
          en: "60%×8% + 40%×3% = 6.0%.",
          fr: "60 %×8 % + 40 %×3 % = 6,0 %.",
        },
      },
    },
    {
      id: "portfolio-variance",
      kicker: { en: "07 · DIVERSIFICATION MATHEMATICS", fr: "07 · MATHÉMATIQUES DE LA DIVERSIFICATION" },
      title: {
        en: "Portfolio risk depends on weights, volatilities and correlation",
        fr: "Le risque du portefeuille dépend des poids, volatilités et corrélations",
      },
      coreFacts: [
        {
          en: "Portfolio volatility is not generally the weighted average of individual volatilities.",
          fr: "La volatilité du portefeuille n’est généralement pas la moyenne pondérée des volatilités individuelles.",
        },
        {
          en: "The covariance term captures the diversification benefit or penalty from co-movement.",
          fr: "Le terme de covariance capture le bénéfice ou la pénalité de diversification liée au co-mouvement.",
        },
        {
          en: "With correlation below +1, combining risky assets can produce portfolio volatility below the weighted average of their individual volatilities.",
          fr: "Avec une corrélation inférieure à +1, combiner des actifs risqués peut produire une volatilité de portefeuille inférieure à la moyenne pondérée des volatilités individuelles.",
        },
        {
          en: "Lower correlation improves diversification, but negative or low historical correlation is not guaranteed to persist.",
          fr: "Une corrélation plus faible améliore la diversification, mais une corrélation historique faible ou négative n’est pas garantie dans le futur.",
        },
      ],
      explanation: {
        Beginner: {
          en: "Take two assets with equal 50% weights. Asset A has 20% volatility and Asset B 10%. If correlation is zero, portfolio volatility is about 11.18%, not 15%. The reason is that their movements do not perfectly reinforce each other.",
          fr: "Prenons deux actifs pondérés chacun à 50 %. L’actif A a 20 % de volatilité et B 10 %. Si leur corrélation est nulle, la volatilité du portefeuille est d’environ 11,18 %, et non 15 %. Leurs mouvements ne se renforcent pas parfaitement.",
        },
        Intermediate: {
          en: "The two-asset formula has three pieces: each asset's own variance contribution plus a covariance interaction term. As correlation falls, the interaction term falls and portfolio variance declines, all else equal.",
          fr: "La formule à deux actifs possède trois parties : contribution de variance de chaque actif plus terme d’interaction de covariance. Lorsque la corrélation baisse, ce terme baisse et la variance de portefeuille diminue, toutes choses égales par ailleurs.",
        },
        Professional: {
          en: "Portfolio variance generalizes to w'Σw. Diversification depends on the covariance matrix, not security count. Estimation error in Σ, unstable correlations and hidden common factors can materially change ex-ante versus realized portfolio risk.",
          fr: "La variance de portefeuille se généralise en w'Σw. La diversification dépend de la matrice de covariance, pas du nombre de titres. Erreurs d’estimation de Σ, corrélations instables et facteurs communs cachés peuvent fortement séparer risque ex ante et risque réalisé.",
        },
      },
      formula: {
        label: { en: "Two-asset portfolio variance", fr: "Variance d’un portefeuille à deux actifs" },
        expression: "σₚ² = wA²σA² + wB²σB² + 2wAwBσAσBρAB",
        explanation: {
          en: "The last term is the interaction created by co-movement.",
          fr: "Le dernier terme représente l’interaction créée par le co-mouvement.",
        },
        workedExample: {
          en: "wA=wB=50%, σA=20%, σB=10%, ρ=0 → variance = 0.25×0.20² + 0.25×0.10² = 0.0125, so σₚ ≈ 11.18%.",
          fr: "wA=wB=50 %, σA=20 %, σB=10 %, ρ=0 → variance = 0,25×0,20² + 0,25×0,10² = 0,0125, donc σₚ ≈ 11,18 %.",
        },
      },
      comparison: {
        title: { en: "Effect of correlation", fr: "Effet de la corrélation" },
        headers: [
          { en: "Correlation", fr: "Corrélation" },
          { en: "Diversification effect", fr: "Effet de diversification" },
          { en: "Interpretation", fr: "Interprétation" },
        ],
        rows: [
          { cells: [
            { en: "+1", fr: "+1" },
            { en: "No volatility benefit beyond weighting", fr: "Pas de bénéfice de volatilité au-delà des poids" },
            { en: "Perfect same-direction linear movement", fr: "Mouvement linéaire parfait dans le même sens" },
          ]},
          { cells: [
            { en: "0", fr: "0" },
            { en: "Meaningful diversification", fr: "Diversification significative" },
            { en: "No linear correlation", fr: "Pas de corrélation linéaire" },
          ]},
          { cells: [
            { en: "−1", fr: "−1" },
            { en: "Potential complete hedge at specific weights", fr: "Couverture potentiellement complète pour certains poids" },
            { en: "Perfect opposite linear movement", fr: "Mouvement linéaire parfaitement opposé" },
          ]},
        ],
      },
    },
    {
      id: "systematic-idiosyncratic",
      kicker: { en: "08 · WHAT DIVERSIFICATION CAN REMOVE", fr: "08 · CE QUE LA DIVERSIFICATION PEUT RÉDUIRE" },
      title: {
        en: "Idiosyncratic risk can be diversified; systematic risk remains",
        fr: "Le risque spécifique peut être diversifié ; le risque systématique demeure",
      },
      coreFacts: [
        {
          en: "Idiosyncratic risk is linked to company- or security-specific events.",
          fr: "Le risque spécifique / idiosyncratic risk provient d’événements propres à une entreprise ou un titre.",
        },
        {
          en: "Systematic risk comes from broad drivers that affect many assets simultaneously.",
          fr: "Le risque systématique / systematic risk provient de moteurs larges affectant de nombreux actifs simultanément.",
        },
        {
          en: "Holding more securities can reduce idiosyncratic concentration if the exposures are genuinely different.",
          fr: "Détenir davantage de titres peut réduire la concentration spécifique si les expositions sont réellement différentes.",
        },
        {
          en: "Diversification cannot eliminate broad market, macro or common-factor shocks from a risky portfolio.",
          fr: "La diversification ne peut pas éliminer les chocs de marché, macro ou factoriels communs d’un portefeuille risqué.",
        },
      ],
      explanation: {
        Beginner: {
          en: "If one company loses a major customer, that is mostly company-specific risk. Owning many unrelated companies can reduce the impact. But if a global recession hurts almost every company, simply owning more stocks may not remove that broad market risk.",
          fr: "Si une entreprise perd un client majeur, il s’agit surtout d’un risque spécifique. Détenir de nombreuses entreprises différentes peut réduire son impact. Mais si une récession mondiale touche presque toutes les entreprises, simplement posséder davantage d’actions ne supprime pas ce risque de marché global.",
        },
        Intermediate: {
          en: "Portfolio theory separates diversifiable residual risk from common-factor risk. As the number of independent positions grows, security-specific variance can decline, but exposures to market, rates, growth, inflation, currency or other common factors remain.",
          fr: "La théorie de portefeuille sépare risque résiduel diversifiable et risque de facteurs communs. Lorsque le nombre de positions indépendantes augmente, la variance spécifique peut baisser, mais les expositions au marché, aux taux, à la croissance, à l’inflation, aux devises ou autres facteurs communs restent présentes.",
        },
        Professional: {
          en: "The relevant distinction is factor decomposition rather than a simplistic stock-count rule. Residual variance can be diversified, while priced systematic exposures persist. Hidden concentration can remain through common beta, duration, credit, liquidity or volatility factors even in portfolios with hundreds of names.",
          fr: "La distinction pertinente vient de la décomposition factorielle plutôt que d’une règle simple sur le nombre d’actions. La variance résiduelle peut être diversifiée tandis que les expositions systématiques rémunérées persistent. Une concentration cachée peut subsister via beta commun, duration, crédit, liquidité ou volatilité même dans des portefeuilles comptant des centaines de lignes.",
        },
      },
      marketConnection: {
        en: "A portfolio of many technology stocks can have low single-name concentration but still carry large common exposure to growth expectations, real yields and equity-market beta.",
        fr: "Un portefeuille contenant de nombreuses valeurs technologiques peut avoir une faible concentration par nom tout en conservant une forte exposition commune aux anticipations de croissance, aux taux réels et au beta actions.",
      },
      vocabulary: [
        {
          en: "Idiosyncratic risk",
          fr: "risque spécifique / idiosyncratic risk",
          definition: {
            en: "Risk unique to a security, issuer or narrow exposure.",
            fr: "Risque propre à un titre, émetteur ou exposition étroite.",
          },
        },
        {
          en: "Systematic risk",
          fr: "risque systématique / systematic risk",
          definition: {
            en: "Risk associated with broad common factors affecting many assets.",
            fr: "Risque associé à des facteurs larges communs affectant de nombreux actifs.",
          },
        },
      ],
    },
    {
      id: "sharpe-limits",
      kicker: { en: "09 · RISK-ADJUSTED PERFORMANCE", fr: "09 · PERFORMANCE AJUSTÉE DU RISQUE" },
      title: {
        en: "The Sharpe ratio compares excess return with volatility",
        fr: "Le ratio de Sharpe compare rendement excédentaire et volatilité",
      },
      coreFacts: [
        {
          en: "The Sharpe ratio divides excess return over a risk-free reference by volatility.",
          fr: "Le ratio de Sharpe / Sharpe ratio divise le rendement excédentaire au-dessus d’une référence sans risque par la volatilité.",
        },
        {
          en: "A higher Sharpe ratio indicates more excess return per unit of measured volatility under the chosen period and assumptions.",
          fr: "Un Sharpe ratio plus élevé indique davantage de rendement excédentaire par unité de volatilité mesurée selon la période et les hypothèses choisies.",
        },
        {
          en: "Sharpe ratios are sensitive to estimation window, return frequency, leverage, smoothing and non-normal return distributions.",
          fr: "Les Sharpe ratios sont sensibles à la fenêtre d’estimation, fréquence des rendements, levier, lissage / smoothing et distributions non normales.",
        },
        {
          en: "A Sharpe ratio should not be used alone to judge liquidity risk, drawdown severity, tail loss or investment suitability.",
          fr: "Un Sharpe ratio ne doit pas être utilisé seul pour juger risque de liquidité, sévérité des drawdowns, pertes extrêmes ou adéquation d’un investissement.",
        },
      ],
      explanation: {
        Beginner: {
          en: "If a portfolio earns 9%, the risk-free rate is 3% and portfolio volatility is 12%, the excess return is 6%. Divide 6% by 12% and the Sharpe ratio is 0.50. It tells you how much excess return was earned relative to measured volatility.",
          fr: "Si un portefeuille rapporte 9 %, que le taux sans risque vaut 3 % et que la volatilité est 12 %, le rendement excédentaire vaut 6 %. En divisant 6 % par 12 %, le Sharpe ratio vaut 0,50. Il mesure le rendement excédentaire obtenu relativement à la volatilité observée.",
        },
        Intermediate: {
          en: "Sharpe is useful for comparing portfolios with similar measurement conventions, but it compresses the whole return distribution into mean excess return and standard deviation. Two strategies can share the same Sharpe while having very different drawdowns or tail risk.",
          fr: "Le Sharpe est utile pour comparer des portefeuilles mesurés de manière cohérente, mais il compresse toute la distribution en rendement excédentaire moyen et écart-type. Deux stratégies peuvent avoir le même Sharpe tout en présentant des drawdowns ou tail risks très différents.",
        },
        Professional: {
          en: "Sharpe is a mean-variance efficiency statistic, not a complete risk metric. Serial correlation, illiquid marks and option-like payoffs can inflate reported Sharpe. Professional performance attribution supplements it with drawdown, downside deviation, beta, factor exposure, stress tests and liquidity-adjusted analysis.",
          fr: "Le Sharpe est une statistique d’efficacité moyenne-variance, pas une mesure complète du risque. Autocorrélation, valorisations d’actifs illiquides et payoffs optionnels peuvent gonfler le Sharpe publié. L’analyse professionnelle le complète avec drawdown, downside deviation, beta, facteurs, stress tests et analyse ajustée de la liquidité.",
        },
      },
      formula: {
        label: { en: "Sharpe ratio", fr: "Ratio de Sharpe / Sharpe ratio" },
        expression: "Sharpe = (Rₚ − Rf) ÷ σₚ",
        explanation: {
          en: "Use consistent horizons for portfolio return, risk-free rate and volatility.",
          fr: "Utiliser des horizons cohérents pour rendement du portefeuille, taux sans risque et volatilité.",
        },
        workedExample: {
          en: "(9% − 3%) ÷ 12% = 0.50.",
          fr: "(9 % − 3 %) ÷ 12 % = 0,50.",
        },
      },
      comparison: {
        title: { en: "What Sharpe sees and misses", fr: "Ce que le Sharpe voit et ne voit pas" },
        headers: [
          { en: "Captures", fr: "Capture" },
          { en: "Does not fully capture", fr: "Ne capture pas complètement" },
        ],
        rows: [
          { cells: [
            { en: "Average excess return", fr: "Rendement excédentaire moyen" },
            { en: "Tail shape and crash severity", fr: "Forme des tails et sévérité d’un crash" },
          ]},
          { cells: [
            { en: "Return volatility", fr: "Volatilité des rendements" },
            { en: "Liquidity and funding risk", fr: "Risque de liquidité et de funding" },
          ]},
          { cells: [
            { en: "Simple risk-adjusted comparison", fr: "Comparaison simple ajustée du risque" },
            { en: "Investor-specific objectives and liabilities", fr: "Objectifs et passifs propres à l’investisseur" },
          ]},
        ],
      },
      marketConnection: {
        en: "Strategies with apparently stable returns can show attractive historical Sharpe ratios while hiding liquidity, leverage or short-volatility exposure that becomes visible only during stress.",
        fr: "Des stratégies aux rendements apparemment stables peuvent afficher des Sharpe ratios historiques attractifs tout en cachant risques de liquidité, levier ou short volatility qui n’apparaissent qu’en période de stress.",
      },
    },
  ],
  quiz: [
    {
      id: "q1",
      conceptKey: "holding-period-return",
      question: {
        en: "You buy an asset at $100, receive $3 of income and finish at $108. What is the total holding-period return?",
        fr: "Tu achètes un actif à 100 $, reçois 3 $ de revenu et termines à 108 $. Quel est le rendement total de période ?",
      },
      options: [
        { id: "a", label: { en: "8%", fr: "8 %" } },
        { id: "b", label: { en: "10%", fr: "10 %" } },
        { id: "c", label: { en: "11%", fr: "11 %" } },
        { id: "d", label: { en: "13%", fr: "13 %" } },
      ],
      correctOption: "c",
      explanation: {
        en: "($108 − $100 + $3) ÷ $100 = 11%.",
        fr: "(108 − 100 + 3) ÷ 100 = 11 %.",
      },
    },
    {
      id: "q2",
      conceptKey: "expected-return",
      question: {
        en: "An investment has a 60% chance of +15% and a 40% chance of −5%. What is expected return?",
        fr: "Un investissement a 60 % de chances de +15 % et 40 % de chances de −5 %. Quel est son rendement attendu ?",
      },
      options: [
        { id: "a", label: { en: "5%", fr: "5 %" } },
        { id: "b", label: { en: "7%", fr: "7 %" } },
        { id: "c", label: { en: "9%", fr: "9 %" } },
        { id: "d", label: { en: "10%", fr: "10 %" } },
      ],
      correctOption: "b",
      explanation: {
        en: "0.60×15% + 0.40×(−5%) = 7%.",
        fr: "0,60×15 % + 0,40×(−5 %) = 7 %.",
      },
    },
    {
      id: "q3",
      conceptKey: "volatility",
      question: {
        en: "What does standard deviation of returns primarily measure?",
        fr: "Que mesure principalement l’écart-type des rendements ?",
      },
      options: [
        { id: "a", label: { en: "Guaranteed future loss", fr: "La perte future garantie" } },
        { id: "b", label: { en: "Dispersion of returns around their mean", fr: "La dispersion des rendements autour de leur moyenne" } },
        { id: "c", label: { en: "Only downside returns", fr: "Uniquement les rendements négatifs" } },
        { id: "d", label: { en: "The number of securities held", fr: "Le nombre de titres détenus" } },
      ],
      correctOption: "b",
      explanation: {
        en: "Standard deviation measures dispersion. It is not a guaranteed loss estimate and it treats upside and downside deviations symmetrically.",
        fr: "L’écart-type mesure la dispersion. Ce n’est pas une perte future garantie et il traite symétriquement écarts positifs et négatifs.",
      },
    },
    {
      id: "q4",
      conceptKey: "correlation",
      question: {
        en: "If covariance is 0.006, σA=20% and σB=15%, what is correlation?",
        fr: "Si la covariance vaut 0,006, σA=20 % et σB=15 %, quelle est la corrélation ?",
      },
      options: [
        { id: "a", label: { en: "0.10", fr: "0,10" } },
        { id: "b", label: { en: "0.20", fr: "0,20" } },
        { id: "c", label: { en: "0.40", fr: "0,40" } },
        { id: "d", label: { en: "1.00", fr: "1,00" } },
      ],
      correctOption: "b",
      explanation: {
        en: "0.006 ÷ (0.20×0.15) = 0.20.",
        fr: "0,006 ÷ (0,20×0,15) = 0,20.",
      },
    },
    {
      id: "q5",
      conceptKey: "portfolio-return",
      question: {
        en: "A portfolio has 60% in an asset expected to return 8% and 40% in an asset expected to return 3%. Expected portfolio return is:",
        fr: "Un portefeuille contient 60 % d’un actif au rendement attendu de 8 % et 40 % d’un actif à 3 %. Le rendement attendu du portefeuille vaut :",
      },
      options: [
        { id: "a", label: { en: "4.0%", fr: "4,0 %" } },
        { id: "b", label: { en: "5.0%", fr: "5,0 %" } },
        { id: "c", label: { en: "6.0%", fr: "6,0 %" } },
        { id: "d", label: { en: "11.0%", fr: "11,0 %" } },
      ],
      correctOption: "c",
      explanation: {
        en: "0.60×8% + 0.40×3% = 6%.",
        fr: "0,60×8 % + 0,40×3 % = 6 %.",
      },
    },
    {
      id: "q6",
      conceptKey: "diversification-correlation",
      question: {
        en: "All else equal, which correlation provides the strongest diversification benefit between two risky assets?",
        fr: "Toutes choses égales par ailleurs, quelle corrélation fournit le plus fort bénéfice de diversification entre deux actifs risqués ?",
      },
      options: [
        { id: "a", label: { en: "+1.0", fr: "+1,0" } },
        { id: "b", label: { en: "+0.8", fr: "+0,8" } },
        { id: "c", label: { en: "0.0", fr: "0,0" } },
        { id: "d", label: { en: "−1.0", fr: "−1,0" } },
      ],
      correctOption: "d",
      explanation: {
        en: "Lower correlation improves diversification; perfect negative correlation can theoretically eliminate volatility at specific weights.",
        fr: "Une corrélation plus faible améliore la diversification ; une corrélation parfaitement négative peut théoriquement éliminer la volatilité pour certains poids.",
      },
    },
    {
      id: "q7",
      conceptKey: "systematic-idiosyncratic",
      question: {
        en: "Which risk is most directly reduced by holding many genuinely different securities?",
        fr: "Quel risque est le plus directement réduit en détenant de nombreux titres réellement différents ?",
      },
      options: [
        { id: "a", label: { en: "Idiosyncratic risk", fr: "Risque spécifique / idiosyncratic risk" } },
        { id: "b", label: { en: "All systematic market risk", fr: "Tout le risque systématique de marché" } },
        { id: "c", label: { en: "Inflation risk permanently", fr: "Le risque d’inflation de manière permanente" } },
        { id: "d", label: { en: "Every possible drawdown", fr: "Tout drawdown possible" } },
      ],
      correctOption: "a",
      explanation: {
        en: "Diversification can reduce security-specific residual risk, while common systematic exposures remain.",
        fr: "La diversification peut réduire le risque résiduel spécifique, tandis que les expositions systématiques communes demeurent.",
      },
    },
    {
      id: "q8",
      conceptKey: "sharpe-ratio",
      question: {
        en: "A portfolio returns 9%, the risk-free rate is 3% and volatility is 12%. What is its Sharpe ratio?",
        fr: "Un portefeuille rapporte 9 %, le taux sans risque vaut 3 % et la volatilité 12 %. Quel est son Sharpe ratio ?",
      },
      options: [
        { id: "a", label: { en: "0.25", fr: "0,25" } },
        { id: "b", label: { en: "0.50", fr: "0,50" } },
        { id: "c", label: { en: "0.75", fr: "0,75" } },
        { id: "d", label: { en: "1.50", fr: "1,50" } },
      ],
      correctOption: "b",
      explanation: {
        en: "(9% − 3%) ÷ 12% = 0.50.",
        fr: "(9 % − 3 %) ÷ 12 % = 0,50.",
      },
    },
  ],
  interviewPrompt: {
    question: {
      en: "Why can combining two risky assets reduce portfolio risk, and what role does correlation play?",
      fr: "Pourquoi combiner deux actifs risqués peut-il réduire le risque du portefeuille, et quel rôle joue la corrélation ?",
    },
    framework: [
      {
        en: "State that portfolio return is weighted, but portfolio risk also depends on co-movement.",
        fr: "Expliquer que le rendement du portefeuille est pondéré, mais que son risque dépend aussi du co-mouvement.",
      },
      {
        en: "Define correlation as standardized linear co-movement from −1 to +1.",
        fr: "Définir la corrélation comme mesure standardisée du co-mouvement linéaire de −1 à +1.",
      },
      {
        en: "Explain that correlation below +1 creates diversification because assets do not reinforce each other perfectly.",
        fr: "Expliquer qu’une corrélation inférieure à +1 crée de la diversification car les actifs ne se renforcent pas parfaitement.",
      },
      {
        en: "Distinguish idiosyncratic risk, which can be diversified, from systematic risk, which remains.",
        fr: "Distinguer risque spécifique, diversifiable, et risque systématique, qui demeure.",
      },
      {
        en: "Add the caveat that correlations can rise in stress and historical estimates are not guarantees.",
        fr: "Ajouter que les corrélations peuvent augmenter en période de stress et que les estimations historiques ne sont pas garanties.",
      },
    ],
    sample: {
      en: "Two risky assets can produce a portfolio with lower volatility than the weighted average of their standalone volatilities because portfolio variance depends not only on each asset's volatility but also on covariance. Correlation standardizes that co-movement. If correlation is below +1, the assets do not move perfectly together, so some fluctuations offset each other and portfolio variance falls. This mainly helps diversify idiosyncratic risk; broad systematic exposures can remain. I would also be careful not to assume historical correlation is stable, because correlations often change during stressed markets.",
      fr: "Deux actifs risqués peuvent produire un portefeuille moins volatil que la moyenne pondérée de leurs volatilités individuelles car la variance du portefeuille dépend non seulement de la volatilité de chaque actif mais aussi de leur covariance. La corrélation standardise ce co-mouvement. Lorsqu’elle est inférieure à +1, les actifs ne bougent pas parfaitement ensemble ; certaines fluctuations se compensent donc et la variance du portefeuille diminue. Cela aide surtout à diversifier le risque spécifique, tandis que les expositions systématiques larges peuvent subsister. Il faut aussi éviter de supposer que la corrélation historique est stable, car elle peut changer fortement en période de stress.",
    },
  },
};


export const microeconomicsForFinanceLesson: FinanceLesson = {
  slug: "year-1-microeconomics-for-finance",
  year: { en: "Year 1 · Foundations", fr: "Année 1 · Fondations" },
  domain: { en: "Macro & Economics", fr: "Macro & économie / Macro & Economics" },
  title: {
    en: "Microeconomics for Finance",
    fr: "Microéconomie pour la finance / Microeconomics for Finance",
  },
  subtitle: {
    en: "Understand how prices, quantities, competition, costs and incentives shape company economics — and turn those ideas into better analysis of margins, pricing power, industry structure and valuation.",
    fr: "Comprendre comment prix, quantités, concurrence, coûts et incitations façonnent l’économie d’une entreprise — puis transformer ces idées en meilleure analyse des marges, du pricing power, de la structure sectorielle et de la valorisation.",
  },
  duration: { en: "85–105 min", fr: "85–105 min" },
  prerequisites: [
    {
      en: "Basic algebra and percentages",
      fr: "Algèbre simple et pourcentages",
    },
    {
      en: "Risk, Return & Diversification",
      fr: "Risque, rendement & diversification / Risk, Return & Diversification",
    },
  ],
  objectives: [
    {
      en: "Explain supply, demand and market equilibrium and distinguish a movement along a curve from a shift of the curve.",
      fr: "Expliquer offre / supply, demande / demand et équilibre de marché / market equilibrium, et distinguer déplacement le long d’une courbe d’un déplacement de la courbe.",
    },
    {
      en: "Calculate and interpret price elasticity of demand and connect elasticity to pricing power and revenue.",
      fr: "Calculer et interpréter l’élasticité-prix de la demande / price elasticity of demand et la relier au pricing power et au chiffre d’affaires.",
    },
    {
      en: "Distinguish fixed, variable, average and marginal costs.",
      fr: "Distinguer coûts fixes / fixed costs, variables / variable costs, moyens / average costs et marginaux / marginal costs.",
    },
    {
      en: "Explain why firms compare marginal revenue and marginal cost when choosing output.",
      fr: "Expliquer pourquoi les entreprises comparent revenu marginal / marginal revenue et coût marginal / marginal cost pour choisir leur niveau de production.",
    },
    {
      en: "Compare perfect competition, monopolistic competition, oligopoly and monopoly.",
      fr: "Comparer concurrence parfaite / perfect competition, concurrence monopolistique / monopolistic competition, oligopole et monopole.",
    },
    {
      en: "Translate microeconomic concepts into company analysis: pricing power, margins, market share, barriers to entry and operating leverage.",
      fr: "Transformer les concepts microéconomiques en analyse d’entreprise : pricing power, marges, part de marché, barrières à l’entrée / barriers to entry et levier opérationnel / operating leverage.",
    },
  ],
  overviewFlow: {
    title: {
      en: "From customer behavior to company value",
      fr: "Du comportement du client à la valeur de l’entreprise",
    },
    steps: [
      {
        title: { en: "Demand", fr: "Demande / Demand" },
        detail: { en: "Willingness to pay · elasticity", fr: "Disposition à payer · élasticité" },
      },
      {
        title: { en: "Competition", fr: "Concurrence / Competition" },
        detail: { en: "Substitutes · market structure · entry", fr: "Substituts · structure · entrée" },
      },
      {
        title: { en: "Company economics", fr: "Économie de l’entreprise" },
        detail: { en: "Price · volume · costs · margins", fr: "Prix · volume · coûts · marges" },
      },
      {
        title: { en: "Finance outcome", fr: "Conséquence financière" },
        detail: { en: "Cash flow · risk · valuation", fr: "Cash flow · risque · valorisation" },
      },
    ],
  },
  sections: [
    {
      id: "supply-demand",
      kicker: { en: "01 · SUPPLY & DEMAND", fr: "01 · OFFRE & DEMANDE" },
      title: {
        en: "Prices coordinate buyers and sellers",
        fr: "Les prix coordonnent acheteurs et vendeurs",
      },
      coreFacts: [
        {
          en: "A demand curve shows the quantity buyers are willing and able to purchase at different prices, holding other relevant factors constant.",
          fr: "Une courbe de demande / demand curve montre la quantité que les acheteurs souhaitent et peuvent acheter à différents prix, toutes choses pertinentes égales par ailleurs.",
        },
        {
          en: "A supply curve shows the quantity sellers are willing and able to offer at different prices, holding other factors constant.",
          fr: "Une courbe d’offre / supply curve montre la quantité que les vendeurs souhaitent et peuvent proposer à différents prix, toutes choses égales par ailleurs.",
        },
        {
          en: "Market equilibrium occurs where quantity demanded equals quantity supplied.",
          fr: "L’équilibre de marché / market equilibrium se situe lorsque quantité demandée et quantité offerte sont égales.",
        },
        {
          en: "A change in the good's own price creates a movement along a curve; changes in income, input costs, technology, preferences or expectations can shift a curve.",
          fr: "Un changement du prix du bien provoque un déplacement le long de la courbe ; revenus, coûts des inputs, technologie, préférences ou anticipations peuvent déplacer la courbe elle-même.",
        },
      ],
      explanation: {
        Beginner: {
          en: "Think about concert tickets. At a very high price, fewer people want to buy. At a higher price, organizers may be more willing to release seats or add dates. The market price moves toward a point where the number of tickets buyers want matches the number sellers offer.",
          fr: "Pense à des billets de concert. À un prix très élevé, moins de personnes veulent acheter. À un prix plus élevé, l’organisateur peut être davantage incité à proposer des places ou ajouter des dates. Le prix de marché se dirige vers un point où la quantité demandée correspond à la quantité offerte.",
        },
        Intermediate: {
          en: "Supply-demand analysis separates endogenous price adjustment from exogenous curve shifts. A demand increase raises equilibrium price and quantity under an upward-sloping supply curve, while an adverse supply shock can raise price and lower quantity.",
          fr: "L’analyse offre-demande sépare l’ajustement endogène du prix des déplacements exogènes des courbes. Une hausse de demande augmente prix et quantité d’équilibre si l’offre est croissante, tandis qu’un choc négatif d’offre peut augmenter le prix et réduire la quantité.",
        },
        Professional: {
          en: "Micro analysis asks which curve moved, why, and how slope determines incidence. In finance, this is the foundation for analyzing commodity shocks, capacity constraints, inventory cycles, wage pressure and demand-driven versus cost-driven changes in company revenue.",
          fr: "L’analyse micro demande quelle courbe s’est déplacée, pourquoi et comment la pente détermine l’incidence. En finance, c’est la base pour analyser chocs de matières premières, contraintes de capacité, cycles de stocks, pression salariale et variations de revenu liées à la demande ou aux coûts.",
        },
      },
      formula: {
        label: { en: "Simple linear equilibrium", fr: "Équilibre linéaire simple" },
        expression: "Demand: Qd = 100 − 2P   ·   Supply: Qs = 20 + 2P   ·   Equilibrium: Qd = Qs",
        explanation: {
          en: "Set quantity demanded equal to quantity supplied and solve for price.",
          fr: "Égaliser quantité demandée et quantité offerte puis résoudre pour le prix.",
        },
        workedExample: {
          en: "100 − 2P = 20 + 2P → 80 = 4P → P = 20; then Q = 60.",
          fr: "100 − 2P = 20 + 2P → 80 = 4P → P = 20 ; puis Q = 60.",
        },
      },
      vocabulary: [
        {
          en: "Equilibrium",
          fr: "équilibre / equilibrium",
          definition: {
            en: "A market-clearing point where planned quantity demanded equals planned quantity supplied.",
            fr: "Point d’équilibre où quantité demandée prévue et quantité offerte prévue sont égales.",
          },
        },
        {
          en: "Supply shock",
          fr: "choc d’offre / supply shock",
          definition: {
            en: "A change in production conditions that shifts the supply relationship.",
            fr: "Modification des conditions de production qui déplace la relation d’offre.",
          },
        },
      ],
    },
    {
      id: "elasticity",
      kicker: { en: "02 · ELASTICITY", fr: "02 · ÉLASTICITÉ" },
      title: {
        en: "Elasticity measures how strongly quantity reacts to price",
        fr: "L’élasticité mesure la force de réaction de la quantité au prix",
      },
      coreFacts: [
        {
          en: "Price elasticity of demand measures the percentage change in quantity demanded relative to the percentage change in price.",
          fr: "L’élasticité-prix de la demande / price elasticity of demand mesure la variation en pourcentage de la quantité demandée par rapport à la variation en pourcentage du prix.",
        },
        {
          en: "Demand is called elastic when the absolute elasticity is greater than 1 and inelastic when it is below 1.",
          fr: "La demande est dite élastique lorsque la valeur absolue de l’élasticité est supérieure à 1 et inélastique lorsqu’elle est inférieure à 1.",
        },
        {
          en: "Availability of substitutes, necessity, time horizon and share of customer budget can influence elasticity.",
          fr: "Disponibilité de substituts, caractère essentiel, horizon temporel et poids dans le budget du client peuvent influencer l’élasticité.",
        },
        {
          en: "Elasticity is central to pricing power because a company can raise price more successfully when customers are less price-sensitive, all else equal.",
          fr: "L’élasticité est centrale pour le pricing power car une entreprise peut augmenter son prix plus facilement lorsque les clients sont moins sensibles au prix, toutes choses égales par ailleurs.",
        },
      ],
      explanation: {
        Beginner: {
          en: "If a company raises price by 10% and quantity sold falls only 2%, demand is relatively inelastic. Customers did not change behavior much. If quantity falls 20%, demand is much more elastic and the price increase may hurt revenue.",
          fr: "Si une entreprise augmente son prix de 10 % et que la quantité vendue baisse seulement de 2 %, la demande est relativement inélastique. Les clients ont peu changé leur comportement. Si les volumes baissent de 20 %, la demande est beaucoup plus élastique et la hausse de prix peut pénaliser le chiffre d’affaires.",
        },
        Intermediate: {
          en: "For a small price change, total revenue tends to rise when demand is inelastic and fall when demand is elastic, because the price effect dominates in the first case and the volume effect in the second.",
          fr: "Pour une petite variation de prix, le chiffre d’affaires tend à augmenter lorsque la demande est inélastique et à baisser lorsqu’elle est élastique, car l’effet prix domine dans le premier cas et l’effet volume dans le second.",
        },
        Professional: {
          en: "Observed elasticity can be segmented by customer cohort, geography, product tier and time horizon. In company analysis, strong pricing power is more credible when price increases persist without abnormal churn, market-share loss or promotional intensity.",
          fr: "L’élasticité observée peut varier par cohorte client, géographie, gamme et horizon. En analyse d’entreprise, un fort pricing power est plus crédible lorsque les hausses de prix persistent sans churn anormal, perte de part de marché ni hausse excessive des promotions.",
        },
      },
      formula: {
        label: { en: "Price elasticity of demand", fr: "Élasticité-prix de la demande / Price elasticity of demand" },
        expression: "Elasticity = %Δ Quantity Demanded ÷ %Δ Price",
        explanation: {
          en: "Demand elasticity is often negative because price and quantity demanded move in opposite directions; analysts frequently discuss its absolute value.",
          fr: "L’élasticité de demande est souvent négative car prix et quantité demandée évoluent en sens opposé ; les analystes discutent souvent sa valeur absolue.",
        },
        workedExample: {
          en: "Price +10%, quantity −5% → elasticity = −5% ÷ 10% = −0.5, so demand is inelastic in absolute value.",
          fr: "Prix +10 %, quantité −5 % → élasticité = −5 % ÷ 10 % = −0,5 ; la demande est donc inélastique en valeur absolue.",
        },
      },
      marketConnection: {
        en: "Investors often watch price/mix versus volume in earnings reports to judge whether revenue growth reflects genuine pricing power or temporary inflation pass-through.",
        fr: "Les investisseurs suivent souvent price/mix et volumes dans les résultats afin de déterminer si la croissance du chiffre d’affaires reflète un vrai pricing power ou seulement un pass-through temporaire de l’inflation.",
      },
      vocabulary: [
        {
          en: "Pricing power",
          fr: "pouvoir de fixation des prix / pricing power",
          definition: {
            en: "The ability to raise prices without losing an economically damaging amount of demand.",
            fr: "Capacité à augmenter les prix sans perdre une quantité économiquement dommageable de demande.",
          },
        },
        {
          en: "Substitute",
          fr: "substitut / substitute",
          definition: {
            en: "A product customers may switch to when relative price or quality changes.",
            fr: "Produit vers lequel les clients peuvent se tourner lorsque prix relatif ou qualité change.",
          },
        },
      ],
    },
    {
      id: "surplus-incidence",
      kicker: { en: "03 · SURPLUS & WELFARE", fr: "03 · SURPLUS & BIEN-ÊTRE" },
      title: {
        en: "Willingness to pay, producer economics and who bears a tax",
        fr: "Disposition à payer, économie du producteur et incidence d’une taxe",
      },
      coreFacts: [
        {
          en: "Consumer surplus is the difference between willingness to pay and the price actually paid.",
          fr: "Le surplus du consommateur / consumer surplus est la différence entre disposition à payer et prix effectivement payé.",
        },
        {
          en: "Producer surplus is related to the difference between market price and the minimum amount required to supply units, under the model.",
          fr: "Le surplus du producteur / producer surplus est lié à l’écart entre prix de marché et montant minimum requis pour fournir les unités, dans le modèle.",
        },
        {
          en: "Taxes or other wedges can reduce traded quantity and create deadweight loss relative to the competitive benchmark.",
          fr: "Taxes ou autres wedges peuvent réduire la quantité échangée et créer une perte sèche / deadweight loss par rapport au benchmark concurrentiel.",
        },
        {
          en: "Economic incidence depends on relative elasticities, not simply on who legally sends the tax payment.",
          fr: "L’incidence économique dépend des élasticités relatives, pas seulement de l’acteur qui verse légalement la taxe.",
        },
      ],
      explanation: {
        Beginner: {
          en: "If you would have paid $15 for a product but the market price is $10, you receive $5 of consumer surplus. If a tax raises the effective cost, buyers and sellers may share the burden depending on how easily each side can change behavior.",
          fr: "Si tu étais prêt à payer 15 $ pour un produit mais que son prix de marché est 10 $, tu obtiens 5 $ de consumer surplus. Si une taxe augmente le coût effectif, acheteurs et vendeurs peuvent partager la charge selon la facilité avec laquelle chacun peut changer son comportement.",
        },
        Intermediate: {
          en: "Tax incidence falls more heavily on the less elastic side of the market. If customers have few substitutes, producers may pass more of a tax or cost increase through to price; if demand is highly elastic, pass-through can be more difficult.",
          fr: "L’incidence d’une taxe pèse davantage sur le côté le moins élastique du marché. Si les clients disposent de peu de substituts, les producteurs peuvent davantage répercuter une taxe ou une hausse de coûts ; si la demande est très élastique, le pass-through peut être plus difficile.",
        },
        Professional: {
          en: "Incidence analysis is directly relevant to regulation, tariffs, excise taxes, payment fees and input-cost shocks. Equity analysts care about who ultimately absorbs the wedge: customers through price, suppliers through concessions, labor through wages or shareholders through margin compression.",
          fr: "L’analyse d’incidence s’applique directement à réglementation, tarifs douaniers, taxes spécifiques, frais de paiement et chocs de coûts d’inputs. Les analystes actions cherchent à savoir qui absorbe finalement le wedge : clients via le prix, fournisseurs via concessions, salariés via salaires ou actionnaires via compression des marges.",
        },
      },
      example: {
        en: "If customers are very insensitive to price but suppliers can easily redirect production elsewhere, a tax is more likely to be reflected in a higher customer price than in a large reduction in supplier net proceeds.",
        fr: "Si les clients sont très peu sensibles au prix mais que les fournisseurs peuvent facilement réorienter leur production, une taxe a davantage de chances de se traduire par un prix client plus élevé que par une forte baisse du revenu net du fournisseur.",
      },
      vocabulary: [
        {
          en: "Consumer surplus",
          fr: "surplus du consommateur / consumer surplus",
          definition: {
            en: "The difference between willingness to pay and price paid.",
            fr: "Différence entre disposition à payer et prix payé.",
          },
        },
        {
          en: "Deadweight loss",
          fr: "perte sèche / deadweight loss",
          definition: {
            en: "Lost total surplus from trades that no longer occur because of a distortion.",
            fr: "Perte de surplus total liée à des échanges qui n’ont plus lieu en raison d’une distorsion.",
          },
        },
      ],
    },
    {
      id: "cost-structure",
      kicker: { en: "04 · COST STRUCTURE", fr: "04 · STRUCTURE DE COÛTS" },
      title: {
        en: "Fixed, variable, average and marginal costs tell different stories",
        fr: "Coûts fixes, variables, moyens et marginaux racontent des histoires différentes",
      },
      coreFacts: [
        {
          en: "Fixed costs do not change directly with short-run output over the relevant range; variable costs change with activity.",
          fr: "Les coûts fixes / fixed costs ne changent pas directement avec le niveau de production à court terme sur la plage pertinente ; les coûts variables évoluent avec l’activité.",
        },
        {
          en: "Average cost equals total cost divided by quantity, while marginal cost is the cost of producing one additional unit.",
          fr: "Le coût moyen / average cost est le coût total divisé par la quantité, tandis que le coût marginal / marginal cost représente le coût de produire une unité supplémentaire.",
        },
        {
          en: "High fixed-cost businesses can experience strong operating leverage because incremental revenue may add disproportionately to profit once fixed costs are covered.",
          fr: "Les entreprises à coûts fixes élevés peuvent présenter un fort levier opérationnel / operating leverage car le revenu supplémentaire peut contribuer de manière disproportionnée au profit une fois les coûts fixes couverts.",
        },
        {
          en: "Economies of scale can reduce average cost as output grows, but diseconomies can appear when complexity or constraints increase.",
          fr: "Les économies d’échelle / economies of scale peuvent réduire le coût moyen lorsque la production augmente, mais des déséconomies peuvent apparaître lorsque complexité ou contraintes augmentent.",
        },
      ],
      explanation: {
        Beginner: {
          en: "A software company may spend heavily to build a product before serving customers. Once the platform exists, the cost of serving one extra user may be relatively small. A restaurant, in contrast, needs more food and often more labor as it serves more meals. Their cost structures are different.",
          fr: "Une entreprise de logiciel peut dépenser beaucoup pour construire le produit avant d’avoir des clients. Une fois la plateforme créée, le coût d’un utilisateur supplémentaire peut être relativement faible. Un restaurant, au contraire, a besoin de davantage de nourriture et souvent de main-d’œuvre lorsqu’il sert plus de repas. Leurs structures de coûts sont différentes.",
        },
        Intermediate: {
          en: "Cost structure determines margin sensitivity to volume. When fixed costs are large, weak volume can depress margins quickly, while strong volume can expand margins. Marginal-cost behavior also affects optimal pricing and capacity decisions.",
          fr: "La structure de coûts détermine la sensibilité des marges au volume. Lorsque les coûts fixes sont élevés, une faiblesse des volumes peut rapidement compresser les marges, tandis qu’une forte croissance des volumes peut les faire progresser. Le comportement du marginal cost influence aussi pricing et capacité.",
        },
        Professional: {
          en: "Analysts separate fixed, semi-fixed and variable costs, then model incremental margins and capacity thresholds. Reported accounting categories do not always map cleanly to economic cost behavior, so historical margin response to volume is often more informative than labels alone.",
          fr: "Les analystes distinguent coûts fixes, semi-fixes et variables, puis modélisent marges incrémentales et seuils de capacité. Les catégories comptables ne correspondent pas toujours parfaitement au comportement économique des coûts ; la réponse historique des marges aux volumes est donc souvent plus informative que les labels seuls.",
        },
      },
      formula: {
        label: { en: "Average and marginal cost", fr: "Coût moyen et coût marginal" },
        expression: "Average Cost = Total Cost ÷ Quantity   ·   Marginal Cost ≈ ΔTotal Cost ÷ ΔQuantity",
        explanation: {
          en: "Average cost describes the cost per unit across all units; marginal cost focuses on the next units.",
          fr: "Le coût moyen décrit le coût par unité sur l’ensemble de la production ; le marginal cost se concentre sur les unités supplémentaires.",
        },
        workedExample: {
          en: "Total cost rises from $1,000 at 100 units to $1,080 at 110 units. Marginal cost over that interval ≈ $80 ÷ 10 = $8 per additional unit.",
          fr: "Le coût total passe de 1 000 $ pour 100 unités à 1 080 $ pour 110 unités. Le marginal cost sur cet intervalle ≈ 80 $ ÷ 10 = 8 $ par unité supplémentaire.",
        },
      },
      vocabulary: [
        {
          en: "Operating leverage",
          fr: "levier opérationnel / operating leverage",
          definition: {
            en: "The sensitivity of operating profit to changes in revenue or volume caused by cost structure.",
            fr: "Sensibilité du profit opérationnel aux variations de revenu ou volume liée à la structure de coûts.",
          },
        },
        {
          en: "Economies of scale",
          fr: "économies d’échelle / economies of scale",
          definition: {
            en: "Declining average cost as output expands over a relevant range.",
            fr: "Baisse du coût moyen lorsque la production augmente sur une plage pertinente.",
          },
        },
      ],
    },
    {
      id: "marginal-decision",
      kicker: { en: "05 · MARGINAL DECISIONS", fr: "05 · DÉCISIONS MARGINALES" },
      title: {
        en: "Firms compare marginal revenue with marginal cost",
        fr: "Les entreprises comparent revenu marginal et coût marginal",
      },
      coreFacts: [
        {
          en: "Marginal revenue is the additional revenue generated by selling an additional unit.",
          fr: "Le revenu marginal / marginal revenue est le revenu supplémentaire généré par la vente d’une unité supplémentaire.",
        },
        {
          en: "Marginal cost is the additional cost of producing an additional unit.",
          fr: "Le coût marginal / marginal cost est le coût supplémentaire de production d’une unité supplémentaire.",
        },
        {
          en: "In a standard profit-maximization framework, a firm expands output while marginal revenue exceeds marginal cost and stops around MR = MC, subject to constraints.",
          fr: "Dans un cadre standard de maximisation du profit, une entreprise augmente la production tant que marginal revenue dépasse marginal cost et s’arrête autour de MR = MC, sous réserve de contraintes.",
        },
        {
          en: "This is a marginal rule, not a statement that accounting profit is zero or that every real company can perfectly optimize.",
          fr: "Il s’agit d’une règle marginale, pas d’une affirmation selon laquelle le bénéfice comptable serait nul ou qu’une entreprise réelle pourrait optimiser parfaitement.",
        },
      ],
      explanation: {
        Beginner: {
          en: "If making one more unit brings in $12 of extra revenue but costs only $8 to produce, that extra unit adds about $4 before other effects. If the next unit brings only $7 but costs $8, producing it destroys about $1 of incremental profit.",
          fr: "Si produire une unité supplémentaire apporte 12 $ de revenu additionnel mais coûte seulement 8 $, cette unité ajoute environ 4 $ avant autres effets. Si l’unité suivante rapporte seulement 7 $ mais coûte 8 $, la produire détruit environ 1 $ de profit incrémental.",
        },
        Intermediate: {
          en: "For a price-taking firm, marginal revenue equals market price. A firm with market power faces a downward-sloping demand curve, so selling more usually requires a lower effective price and marginal revenue can sit below price.",
          fr: "Pour une entreprise price taker, marginal revenue est égal au prix de marché. Une entreprise disposant de market power fait face à une demande décroissante ; vendre davantage exige généralement un prix effectif plus faible et le marginal revenue peut être inférieur au prix.",
        },
        Professional: {
          en: "Marginal economics underpins capacity utilization, promotional decisions, customer acquisition and product mix. Real firms optimize under dynamic constraints — retention, channel conflict, brand effects, fixed capacity and strategic responses from competitors — so static MR=MC is a starting framework, not the end of analysis.",
          fr: "L’économie marginale sous-tend utilisation de capacité, promotions, acquisition clients et product mix. Les entreprises réelles optimisent sous contraintes dynamiques — rétention, conflit de distribution, effet de marque, capacité fixe et réaction stratégique des concurrents — donc MR=MC est un point de départ, pas la fin de l’analyse.",
        },
      },
      formula: {
        label: { en: "Profit and marginal rule", fr: "Profit et règle marginale" },
        expression: "Profit = Total Revenue − Total Cost   ·   Profit-maximizing condition: MR ≈ MC",
        explanation: {
          en: "The equality is a standard interior optimum condition under the model, not a universal operational rule.",
          fr: "L’égalité est une condition standard d’optimum intérieur dans le modèle, pas une règle opérationnelle universelle.",
        },
        workedExample: {
          en: "If the next unit adds $12 revenue and $8 cost, incremental profit is +$4. If the following unit adds $7 revenue and $8 cost, incremental profit is −$1.",
          fr: "Si l’unité suivante ajoute 12 $ de revenu et 8 $ de coût, le profit incrémental vaut +4 $. Si la suivante ajoute 7 $ de revenu et 8 $ de coût, le profit incrémental vaut −1 $.",
        },
      },
    },
    {
      id: "market-structures",
      kicker: { en: "06 · MARKET STRUCTURE", fr: "06 · STRUCTURE DE MARCHÉ" },
      title: {
        en: "Competition determines how much pricing freedom a firm has",
        fr: "La concurrence détermine la liberté de fixation des prix d’une entreprise",
      },
      coreFacts: [
        {
          en: "Perfect competition is a benchmark with many firms, homogeneous products and little individual pricing power.",
          fr: "La concurrence parfaite / perfect competition est un benchmark avec de nombreuses entreprises, produits homogènes et peu de pricing power individuel.",
        },
        {
          en: "Monopolistic competition combines many firms with differentiated products.",
          fr: "La concurrence monopolistique / monopolistic competition combine de nombreuses entreprises et des produits différenciés.",
        },
        {
          en: "Oligopoly contains a small number of strategically interdependent competitors.",
          fr: "Un oligopole comporte un petit nombre de concurrents stratégiquement interdépendants.",
        },
        {
          en: "A monopoly faces no close direct competitor in the defined market, but can still face demand constraints, regulation, substitutes or entry threats.",
          fr: "Un monopole n’a pas de concurrent direct proche dans le marché défini, mais reste soumis à la demande, la réglementation, aux substituts ou à la menace d’entrée.",
        },
      ],
      explanation: {
        Beginner: {
          en: "A wheat farmer usually has little ability to charge twice the market price because buyers can purchase similar wheat elsewhere. A company with a unique patented medicine may have far more pricing power for a time. Industry structure changes business economics.",
          fr: "Un producteur de blé peut difficilement facturer deux fois le prix du marché car les acheteurs trouvent un produit similaire ailleurs. Une entreprise avec un médicament unique protégé par brevet peut disposer de bien plus de pricing power pendant un temps. La structure sectorielle modifie l’économie de l’entreprise.",
        },
        Intermediate: {
          en: "Market structure shapes margins, returns on capital and strategic behavior. In oligopolies, each firm's decision depends on expected competitor response; in differentiated markets, brand, switching costs and product quality can soften direct price competition.",
          fr: "La structure de marché façonne marges, rendements du capital et comportement stratégique. Dans un oligopole, chaque décision dépend de la réaction anticipée des concurrents ; dans les marchés différenciés, marque, switching costs et qualité peuvent réduire la concurrence directe par les prix.",
        },
        Professional: {
          en: "Industry analysis should define the economically relevant market, concentration, capacity discipline, entry barriers, substitution and bargaining power. Headline market share can be misleading if geographic or product segmentation is wrong.",
          fr: "L’analyse sectorielle doit définir le marché économiquement pertinent, concentration, discipline de capacité, barrières à l’entrée, substitution et pouvoir de négociation. Une market share headline peut être trompeuse si la segmentation géographique ou produit est incorrecte.",
        },
      },
      comparison: {
        title: { en: "Four common market structures", fr: "Quatre structures de marché courantes" },
        headers: [
          { en: "Structure", fr: "Structure" },
          { en: "Typical competitors", fr: "Concurrents typiques" },
          { en: "Product", fr: "Produit" },
          { en: "Pricing power", fr: "Pricing power" },
        ],
        rows: [
          { cells: [
            { en: "Perfect competition", fr: "Concurrence parfaite / perfect competition" },
            { en: "Many", fr: "Nombreux" },
            { en: "Highly similar", fr: "Très similaire" },
            { en: "Very limited", fr: "Très limité" },
          ]},
          { cells: [
            { en: "Monopolistic competition", fr: "Concurrence monopolistique" },
            { en: "Many", fr: "Nombreux" },
            { en: "Differentiated", fr: "Différencié" },
            { en: "Some", fr: "Modéré" },
          ]},
          { cells: [
            { en: "Oligopoly", fr: "Oligopole" },
            { en: "Few", fr: "Peu nombreux" },
            { en: "Similar or differentiated", fr: "Similaire ou différencié" },
            { en: "Potentially meaningful", fr: "Potentiellement important" },
          ]},
          { cells: [
            { en: "Monopoly", fr: "Monopole" },
            { en: "One dominant supplier in defined market", fr: "Un fournisseur dominant dans le marché défini" },
            { en: "No close direct substitute", fr: "Pas de substitut direct proche" },
            { en: "High, but not unlimited", fr: "Élevé, mais non illimité" },
          ]},
        ],
      },
      vocabulary: [
        {
          en: "Barrier to entry",
          fr: "barrière à l’entrée / barrier to entry",
          definition: {
            en: "An economic, legal, technological or strategic obstacle that makes entry difficult.",
            fr: "Obstacle économique, juridique, technologique ou stratégique rendant l’entrée difficile.",
          },
        },
        {
          en: "Switching cost",
          fr: "coût de changement / switching cost",
          definition: {
            en: "A financial or non-financial cost borne by a customer when changing provider.",
            fr: "Coût financier ou non financier supporté par le client lorsqu’il change de fournisseur.",
          },
        },
      ],
    },
    {
      id: "pricing-power-margins",
      kicker: { en: "07 · PRICING POWER & MARGINS", fr: "07 · PRICING POWER & MARGES" },
      title: {
        en: "Great businesses often combine willingness to pay with cost advantage",
        fr: "Les meilleures économies d’entreprise combinent souvent disposition à payer et avantage de coûts",
      },
      coreFacts: [
        {
          en: "Pricing power comes from customer value, differentiation, scarcity, switching costs, brand, network effects or limited substitutes.",
          fr: "Le pricing power peut venir de la valeur client, différenciation, rareté, switching costs, marque, effets de réseau / network effects ou faible nombre de substituts.",
        },
        {
          en: "High gross margins can signal attractive economics but must be interpreted with operating expenses, capital intensity and competitive durability.",
          fr: "Des marges brutes élevées peuvent signaler une économie attractive mais doivent être interprétées avec dépenses opérationnelles, intensité capitalistique et durabilité concurrentielle.",
        },
        {
          en: "A price increase does not automatically improve profit if volume, mix or customer retention deteriorate sharply.",
          fr: "Une hausse de prix n’améliore pas automatiquement le profit si volumes, mix ou rétention client se détériorent fortement.",
        },
        {
          en: "Sustainable margin expansion is stronger when supported by real productivity, scale or differentiation rather than temporary underinvestment.",
          fr: "Une expansion durable des marges est plus solide lorsqu’elle repose sur productivité, échelle ou différenciation plutôt que sur un sous-investissement temporaire.",
        },
      ],
      explanation: {
        Beginner: {
          en: "Suppose a product costs $60 to make and sells for $100. Gross profit is $40. If the company can raise price to $105 without losing customers and cost stays $60, gross profit rises to $45. But if customers leave, the total business result may be worse.",
          fr: "Supposons qu’un produit coûte 60 $ à fabriquer et soit vendu 100 $. Le gross profit vaut 40 $. Si l’entreprise peut augmenter le prix à 105 $ sans perdre de clients et que le coût reste 60 $, le gross profit passe à 45 $. Mais si les clients partent, le résultat total peut se détériorer.",
        },
        Intermediate: {
          en: "Pricing analysis decomposes revenue into price, volume and mix. Margin analysis then asks how input costs, labor, utilization and fixed-cost absorption respond. Strong pricing power is most valuable when price increases persist without destroying unit economics or share.",
          fr: "L’analyse du pricing décompose le revenu entre prix, volume et mix. L’analyse de marge observe ensuite coûts d’inputs, travail, utilisation et absorption des coûts fixes. Un pricing power fort est particulièrement précieux lorsque les hausses de prix persistent sans dégrader unit economics ni part de marché.",
        },
        Professional: {
          en: "A durable moat should be visible in economics: stable retention, attractive incremental margins, rational competitive response and returns on invested capital above the cost of capital. Margin quality matters as much as margin level.",
          fr: "Un moat durable doit apparaître dans les economics : rétention stable, marges incrémentales attractives, réaction concurrentielle rationnelle et rendement du capital investi supérieur au coût du capital. La qualité de la marge compte autant que son niveau.",
        },
      },
      formula: {
        label: { en: "Gross margin", fr: "Marge brute / Gross margin" },
        expression: "Gross Margin = (Revenue − Cost of Goods Sold) ÷ Revenue",
        explanation: {
          en: "Gross margin measures how much revenue remains after direct product or service cost under the accounting definition used.",
          fr: "La gross margin mesure la part du revenu restant après coûts directs du produit ou service selon la définition comptable utilisée.",
        },
        workedExample: {
          en: "Revenue $100, COGS $60 → gross margin = $40 ÷ $100 = 40%.",
          fr: "Revenu 100 $, COGS 60 $ → gross margin = 40 ÷ 100 = 40 %.",
        },
      },
      marketConnection: {
        en: "Earnings calls often reveal microeconomics through management commentary on price realization, promotional activity, churn, input inflation, utilization and competitor behavior.",
        fr: "Les earnings calls révèlent souvent la microéconomie via commentaires de management sur price realization, promotions, churn, inflation des inputs, utilisation de capacité et comportement des concurrents.",
      },
      vocabulary: [
        {
          en: "Network effect",
          fr: "effet de réseau / network effect",
          definition: {
            en: "A situation where a product can become more valuable as more users or counterparties join.",
            fr: "Situation dans laquelle un produit peut devenir plus utile ou précieux à mesure que davantage d’utilisateurs ou contreparties rejoignent le réseau.",
          },
        },
        {
          en: "Economic moat",
          fr: "avantage concurrentiel durable / economic moat",
          definition: {
            en: "A durable competitive advantage that protects attractive economics from erosion.",
            fr: "Avantage concurrentiel durable protégeant des economics attractives contre l’érosion.",
          },
        },
      ],
    },
    {
      id: "strategic-interaction",
      kicker: { en: "08 · STRATEGIC INTERACTION", fr: "08 · INTERACTION STRATÉGIQUE" },
      title: {
        en: "Competitors react — which makes oligopolies different",
        fr: "Les concurrents réagissent — ce qui rend les oligopoles particuliers",
      },
      coreFacts: [
        {
          en: "In concentrated markets, one firm's pricing, capacity or product decision can change the incentives of competitors.",
          fr: "Dans les marchés concentrés, une décision de prix, capacité ou produit d’une entreprise peut modifier les incitations de ses concurrents.",
        },
        {
          en: "Price wars can destroy industry profitability even when total demand is healthy.",
          fr: "Les guerres de prix / price wars peuvent détruire la rentabilité sectorielle même lorsque la demande totale reste solide.",
        },
        {
          en: "Capacity discipline can support industry economics when firms avoid persistent oversupply, while aggressive expansion can pressure prices.",
          fr: "La discipline de capacité / capacity discipline peut soutenir l’économie du secteur lorsque les entreprises évitent une surcapacité persistante, tandis qu’une expansion agressive peut peser sur les prix.",
        },
        {
          en: "Strategic behavior must still operate within competition law and regulation; analysts should not assume or endorse unlawful coordination.",
          fr: "Le comportement stratégique doit respecter le droit de la concurrence et la réglementation ; l’analyse ne doit pas supposer ni encourager une coordination illégale.",
        },
      ],
      explanation: {
        Beginner: {
          en: "If two airlines serve the same route, one airline's price cut may cause the other to cut prices too. The first airline cannot analyze its decision as if the competitor will do nothing. That strategic reaction is central to oligopoly.",
          fr: "Si deux compagnies aériennes desservent la même route, une baisse de prix de l’une peut pousser l’autre à baisser aussi. La première ne peut pas analyser sa décision comme si le concurrent restait immobile. Cette réaction stratégique est centrale dans un oligopole.",
        },
        Intermediate: {
          en: "Oligopoly analysis focuses on reaction functions, capacity, product differentiation and repeated interaction. Industry profitability can depend on whether competition occurs through price, quantity, quality, innovation or distribution.",
          fr: "L’analyse d’un oligopole se concentre sur fonctions de réaction, capacité, différenciation produit et interactions répétées. La rentabilité sectorielle dépend de la dimension de concurrence : prix, quantité, qualité, innovation ou distribution.",
        },
        Professional: {
          en: "Financial models often need a competitive-response layer. A market-share assumption that ignores competitor capacity, retaliation or substitution can overstate revenue durability. Scenario analysis should include rational adverse responses from competitors.",
          fr: "Les modèles financiers doivent souvent intégrer une couche de réaction concurrentielle. Une hypothèse de market share ignorant capacité, riposte ou substitution peut surestimer la durabilité du revenu. Les scénarios doivent intégrer des réactions concurrentielles adverses mais rationnelles.",
        },
      },
      marketConnection: {
        en: "A new capacity announcement, aggressive promotion or entrant can move an entire industry's stocks because investors update expected future margins, not just one company's near-term sales.",
        fr: "Une annonce de nouvelle capacité, une promotion agressive ou un nouvel entrant peut faire bouger toutes les actions d’un secteur car les investisseurs révisent les marges futures attendues, pas seulement les ventes court terme d’une seule entreprise.",
      },
      vocabulary: [
        {
          en: "Oligopoly",
          fr: "oligopole / oligopoly",
          definition: {
            en: "A market with a small number of strategically interdependent major firms.",
            fr: "Marché comportant un petit nombre d’acteurs majeurs stratégiquement interdépendants.",
          },
        },
        {
          en: "Capacity discipline",
          fr: "discipline de capacité / capacity discipline",
          definition: {
            en: "Restraint in adding supply capacity relative to demand growth and industry economics.",
            fr: "Modération dans l’ajout de capacité d’offre relativement à la croissance de la demande et à l’économie du secteur.",
          },
        },
      ],
    },
    {
      id: "micro-to-valuation",
      kicker: { en: "09 · FROM MICRO TO VALUATION", fr: "09 · DE LA MICRO À LA VALORISATION" },
      title: {
        en: "Microeconomics becomes revenue, margins, cash flow and valuation",
        fr: "La microéconomie devient revenu, marges, cash flow et valorisation",
      },
      coreFacts: [
        {
          en: "Revenue forecasts can be decomposed into price, volume, market growth and market share.",
          fr: "Les prévisions de revenu peuvent être décomposées en prix, volume, croissance du marché et part de marché.",
        },
        {
          en: "Margins depend on pricing, cost structure, utilization, scale, bargaining power and competitive intensity.",
          fr: "Les marges dépendent du pricing, de la structure de coûts, de l’utilisation, de l’échelle, du pouvoir de négociation et de l’intensité concurrentielle.",
        },
        {
          en: "Barriers to entry and customer switching costs affect how long excess returns may persist.",
          fr: "Les barrières à l’entrée et switching costs influencent la durée pendant laquelle des rendements économiques supérieurs peuvent persister.",
        },
        {
          en: "A valuation is more credible when its financial assumptions are supported by an explicit economic story.",
          fr: "Une valorisation est plus crédible lorsque ses hypothèses financières reposent sur une histoire économique explicite.",
        },
      ],
      explanation: {
        Beginner: {
          en: "If you forecast a company's sales growing 15%, ask why. Is the whole market growing? Is the company gaining share? Is it raising price? Is volume rising? Microeconomics forces you to explain the numbers rather than simply extending a trend.",
          fr: "Si tu prévois +15 % de ventes pour une entreprise, demande pourquoi. Le marché entier grandit-il ? L’entreprise gagne-t-elle des parts ? Augmente-t-elle ses prix ? Les volumes montent-ils ? La microéconomie oblige à expliquer les chiffres plutôt qu’à prolonger une tendance.",
        },
        Intermediate: {
          en: "An earnings model should connect industry demand, price elasticity, competitive response and cost behavior to revenue and margins. This helps distinguish cyclical margin expansion from structural improvement.",
          fr: "Un modèle de résultats doit relier demande sectorielle, élasticité-prix, réaction concurrentielle et comportement des coûts au revenu et aux marges. Cela aide à distinguer expansion cyclique des marges et amélioration structurelle.",
        },
        Professional: {
          en: "Long-duration valuation is especially sensitive to assumptions about competitive advantage period. Microeconomics provides the discipline for terminal margins, reinvestment needs, market-share ceilings and fade in excess returns. A DCF without industry economics is only arithmetic.",
          fr: "Les valorisations longue duration sont particulièrement sensibles à la durée de l’avantage concurrentiel. La microéconomie impose une discipline sur marges terminales, besoins de réinvestissement, plafond de market share et convergence des rendements excédentaires. Un DCF sans économie sectorielle n’est que de l’arithmétique.",
        },
      },
      comparison: {
        title: { en: "Micro driver → financial statement effect", fr: "Driver micro → effet financier" },
        headers: [
          { en: "Micro driver", fr: "Driver micro" },
          { en: "Possible financial effect", fr: "Effet financier possible" },
        ],
        rows: [
          { cells: [
            { en: "Lower demand elasticity", fr: "Demande moins élastique" },
            { en: "Stronger pricing / revenue resilience", fr: "Pricing plus fort / revenu plus résilient" },
          ]},
          { cells: [
            { en: "Economies of scale", fr: "Économies d’échelle" },
            { en: "Lower unit cost / margin expansion", fr: "Coût unitaire plus faible / expansion de marge" },
          ]},
          { cells: [
            { en: "New competitor", fr: "Nouveau concurrent" },
            { en: "Share pressure / higher selling cost / lower price", fr: "Pression sur la part / coûts commerciaux plus élevés / prix plus faible" },
          ]},
          { cells: [
            { en: "High fixed-cost base", fr: "Base de coûts fixes élevée" },
            { en: "High operating leverage", fr: "Fort levier opérationnel" },
          ]},
        ],
      },
      marketConnection: {
        en: "This framework is what turns macro headlines and industry news into company-level earnings revisions and ultimately valuation changes.",
        fr: "Ce cadre permet de transformer actualité macro et nouvelles sectorielles en révisions de bénéfices au niveau de l’entreprise puis en changements de valorisation.",
      },
    },
  ],
  quiz: [
    {
      id: "q1",
      conceptKey: "supply-demand-equilibrium",
      question: {
        en: "Demand is Qd = 100 − 2P and supply is Qs = 20 + 2P. What is the equilibrium price?",
        fr: "La demande est Qd = 100 − 2P et l’offre Qs = 20 + 2P. Quel est le prix d’équilibre ?",
      },
      options: [
        { id: "a", label: { en: "10", fr: "10" } },
        { id: "b", label: { en: "20", fr: "20" } },
        { id: "c", label: { en: "40", fr: "40" } },
        { id: "d", label: { en: "60", fr: "60" } },
      ],
      correctOption: "b",
      explanation: {
        en: "Set Qd=Qs: 100−2P = 20+2P → 80=4P → P=20.",
        fr: "Égaliser Qd et Qs : 100−2P = 20+2P → 80=4P → P=20.",
      },
    },
    {
      id: "q2",
      conceptKey: "demand-elasticity",
      question: {
        en: "Price rises 10% and quantity demanded falls 5%. The approximate price elasticity of demand is:",
        fr: "Le prix augmente de 10 % et la quantité demandée baisse de 5 %. L’élasticité-prix approximative vaut :",
      },
      options: [
        { id: "a", label: { en: "−0.5", fr: "−0,5" } },
        { id: "b", label: { en: "−2.0", fr: "−2,0" } },
        { id: "c", label: { en: "+0.5", fr: "+0,5" } },
        { id: "d", label: { en: "+2.0", fr: "+2,0" } },
      ],
      correctOption: "a",
      explanation: {
        en: "−5% ÷ 10% = −0.5. In absolute value, demand is inelastic.",
        fr: "−5 % ÷ 10 % = −0,5. En valeur absolue, la demande est inélastique.",
      },
    },
    {
      id: "q3",
      conceptKey: "tax-incidence",
      question: {
        en: "Economic tax incidence tends to fall more heavily on which side of the market?",
        fr: "L’incidence économique d’une taxe tend à peser davantage sur quel côté du marché ?",
      },
      options: [
        { id: "a", label: { en: "The more elastic side", fr: "Le côté le plus élastique" } },
        { id: "b", label: { en: "The less elastic side", fr: "Le côté le moins élastique" } },
        { id: "c", label: { en: "Always the seller", fr: "Toujours le vendeur" } },
        { id: "d", label: { en: "Always the buyer", fr: "Toujours l’acheteur" } },
      ],
      correctOption: "b",
      explanation: {
        en: "The less elastic side has less ability to change behavior and therefore tends to bear more of the economic burden.",
        fr: "Le côté le moins élastique a moins de capacité à modifier son comportement et supporte donc généralement davantage de la charge économique.",
      },
    },
    {
      id: "q4",
      conceptKey: "marginal-cost",
      question: {
        en: "Total cost rises from $1,000 at 100 units to $1,080 at 110 units. Approximate marginal cost over the interval is:",
        fr: "Le coût total passe de 1 000 $ pour 100 unités à 1 080 $ pour 110 unités. Le marginal cost approximatif sur l’intervalle vaut :",
      },
      options: [
        { id: "a", label: { en: "$8 per unit", fr: "8 $ par unité" } },
        { id: "b", label: { en: "$10 per unit", fr: "10 $ par unité" } },
        { id: "c", label: { en: "$80 per unit", fr: "80 $ par unité" } },
        { id: "d", label: { en: "$108 per unit", fr: "108 $ par unité" } },
      ],
      correctOption: "a",
      explanation: {
        en: "ΔCost=$80 and ΔQuantity=10, so MC≈$8 per additional unit.",
        fr: "ΔCoût=80 $ et ΔQuantité=10, donc MC≈8 $ par unité supplémentaire.",
      },
    },
    {
      id: "q5",
      conceptKey: "profit-maximization",
      question: {
        en: "In the standard marginal framework, a firm generally expands output while:",
        fr: "Dans le cadre marginal standard, une entreprise augmente généralement sa production tant que :",
      },
      options: [
        { id: "a", label: { en: "MR > MC", fr: "MR > MC" } },
        { id: "b", label: { en: "MR < MC", fr: "MR < MC" } },
        { id: "c", label: { en: "Fixed cost = 0", fr: "Coût fixe = 0" } },
        { id: "d", label: { en: "Price = 0", fr: "Prix = 0" } },
      ],
      correctOption: "a",
      explanation: {
        en: "If marginal revenue exceeds marginal cost, another unit adds positive incremental profit under the model.",
        fr: "Si marginal revenue dépasse marginal cost, une unité supplémentaire ajoute un profit incrémental positif dans le modèle.",
      },
    },
    {
      id: "q6",
      conceptKey: "market-structure",
      question: {
        en: "Which market structure has a few strategically interdependent major firms?",
        fr: "Quelle structure de marché comporte quelques grandes entreprises stratégiquement interdépendantes ?",
      },
      options: [
        { id: "a", label: { en: "Perfect competition", fr: "Concurrence parfaite" } },
        { id: "b", label: { en: "Oligopoly", fr: "Oligopole" } },
        { id: "c", label: { en: "Pure monopsony only", fr: "Monopsone pur uniquement" } },
        { id: "d", label: { en: "No market", fr: "Aucun marché" } },
      ],
      correctOption: "b",
      explanation: {
        en: "Oligopoly is characterized by a small number of important firms whose actions affect one another.",
        fr: "Un oligopole se caractérise par un petit nombre d’entreprises importantes dont les décisions s’influencent mutuellement.",
      },
    },
    {
      id: "q7",
      conceptKey: "gross-margin",
      question: {
        en: "Revenue is $100 and cost of goods sold is $60. Gross margin is:",
        fr: "Le revenu est 100 $ et le coût des ventes / COGS est 60 $. La gross margin vaut :",
      },
      options: [
        { id: "a", label: { en: "20%", fr: "20 %" } },
        { id: "b", label: { en: "40%", fr: "40 %" } },
        { id: "c", label: { en: "60%", fr: "60 %" } },
        { id: "d", label: { en: "160%", fr: "160 %" } },
      ],
      correctOption: "b",
      explanation: {
        en: "($100−$60) ÷ $100 = 40%.",
        fr: "(100−60) ÷ 100 = 40 %.",
      },
    },
    {
      id: "q8",
      conceptKey: "micro-to-valuation",
      question: {
        en: "Which revenue forecast is most economically grounded?",
        fr: "Quelle prévision de revenu est la plus solidement fondée économiquement ?",
      },
      options: [
        { id: "a", label: { en: "Revenue grows 15% because it did last year", fr: "Le revenu augmente de 15 % parce qu’il l’a fait l’an dernier" } },
        { id: "b", label: { en: "Revenue grows from explicit assumptions on market growth, share, price and volume", fr: "Le revenu croît à partir d’hypothèses explicites de croissance du marché, part, prix et volume" } },
        { id: "c", label: { en: "Revenue always grows faster than GDP", fr: "Le revenu croît toujours plus vite que le PIB" } },
        { id: "d", label: { en: "Revenue growth is unrelated to customers or competition", fr: "La croissance du revenu n’a aucun lien avec clients ou concurrence" } },
      ],
      correctOption: "b",
      explanation: {
        en: "A finance forecast is stronger when its revenue assumptions are tied to observable economic drivers.",
        fr: "Une prévision financière est plus solide lorsque les hypothèses de revenu sont reliées à des drivers économiques observables.",
      },
    },
  ],
  interviewPrompt: {
    question: {
      en: "How would you determine whether a company truly has pricing power?",
      fr: "Comment déterminerais-tu si une entreprise possède réellement du pricing power ?",
    },
    framework: [
      {
        en: "Start with demand elasticity and availability of substitutes.",
        fr: "Commencer par l’élasticité de la demande et la disponibilité des substituts.",
      },
      {
        en: "Look for evidence: price increases versus volume, churn, market share and promotional activity.",
        fr: "Chercher les preuves : hausses de prix vs volumes, churn, market share et activité promotionnelle.",
      },
      {
        en: "Identify the source: brand, switching costs, network effects, scarcity, product differentiation or regulation.",
        fr: "Identifier la source : marque, switching costs, network effects, rareté, différenciation produit ou réglementation.",
      },
      {
        en: "Check margin realization: did higher pricing actually improve gross or operating economics?",
        fr: "Vérifier la réalisation dans les marges : le pricing plus élevé a-t-il réellement amélioré gross margin ou economics opérationnels ?",
      },
      {
        en: "Test durability against competitor response and potential new entry.",
        fr: "Tester la durabilité face à la réaction des concurrents et à l’entrée potentielle de nouveaux acteurs.",
      },
    ],
    sample: {
      en: "I would not define pricing power simply as the ability to raise a list price. I would look at what happens after the increase. If price rises while volume, retention and market share remain resilient, that suggests demand is relatively inelastic. I would then identify why customers are willing to stay — for example brand, switching costs, network effects or a lack of substitutes. Finally, I would check whether the price increase actually improves margins and whether competitors or new entrants can erode the advantage. Sustainable pricing power should show up in both customer behavior and long-term economics.",
      fr: "Je ne définirais pas le pricing power simplement comme la capacité à relever un prix catalogue. Je regarderais ce qui se passe après la hausse. Si le prix augmente tandis que volumes, rétention et part de marché restent résilients, cela suggère une demande relativement inélastique. J’identifierais ensuite pourquoi les clients restent — par exemple marque, switching costs, network effects ou manque de substituts. Enfin, je vérifierais si la hausse améliore réellement les marges et si concurrents ou nouveaux entrants peuvent éroder cet avantage. Un pricing power durable doit apparaître à la fois dans le comportement des clients et dans les economics long terme.",
    },
  },
};


export const macroeconomicsForMarketsLesson: FinanceLesson = {
  slug: "year-1-macroeconomics-for-markets",
  year: { en: "Year 1 · Foundations", fr: "Année 1 · Fondations" },
  domain: { en: "Macro & Economics", fr: "Macro & économie / Macro & Economics" },
  title: {
    en: "Macroeconomics for Markets",
    fr: "Macroéconomie pour les marchés / Macroeconomics for Markets",
  },
  subtitle: {
    en: "Learn how growth, inflation, employment, fiscal policy and economic cycles shape expectations — and how markets translate macro surprises into moves across rates, equities, credit, FX and commodities.",
    fr: "Comprendre comment croissance, inflation, emploi, politique budgétaire / fiscal policy et cycles économiques façonnent les anticipations — puis comment les marchés transforment les surprises macro en mouvements sur rates, actions, crédit, FX et matières premières.",
  },
  duration: { en: "90–110 min", fr: "90–110 min" },
  prerequisites: [
    {
      en: "Money, Banking & Central Banks",
      fr: "Monnaie, banques & banques centrales / Money, Banking & Central Banks",
    },
    {
      en: "Microeconomics for Finance",
      fr: "Microéconomie pour la finance / Microeconomics for Finance",
    },
  ],
  objectives: [
    {
      en: "Explain GDP, real growth and the expenditure components of economic activity.",
      fr: "Expliquer PIB / GDP, croissance réelle / real growth et composantes de la dépense dans l’activité économique.",
    },
    {
      en: "Distinguish nominal growth from real growth and interpret inflation-adjusted data.",
      fr: "Distinguer croissance nominale et croissance réelle et interpréter des données ajustées de l’inflation.",
    },
    {
      en: "Read inflation and labor-market indicators without relying on one headline number.",
      fr: "Lire les indicateurs d’inflation et du marché du travail sans dépendre d’un seul chiffre headline.",
    },
    {
      en: "Identify leading, coincident and lagging indicators and place data inside the business cycle.",
      fr: "Identifier indicateurs avancés / leading, coïncidents / coincident et retardés / lagging et replacer les données dans le cycle économique.",
    },
    {
      en: "Explain how fiscal policy can affect aggregate demand, borrowing needs and financial markets.",
      fr: "Expliquer comment la politique budgétaire / fiscal policy peut affecter demande globale, besoins de financement et marchés financiers.",
    },
    {
      en: "Analyze macro data as a surprise versus expectations and map scenarios across asset classes.",
      fr: "Analyser une donnée macro comme une surprise par rapport aux attentes et construire des scénarios multi-actifs.",
    },
  ],
  overviewFlow: {
    title: {
      en: "How macro data becomes a market move",
      fr: "Comment une donnée macro devient un mouvement de marché",
    },
    steps: [
      {
        title: { en: "Economic data", fr: "Données économiques" },
        detail: { en: "Growth · inflation · jobs · fiscal", fr: "Croissance · inflation · emploi · budget" },
      },
      {
        title: { en: "Expectation gap", fr: "Écart aux attentes" },
        detail: { en: "Actual vs consensus vs prior", fr: "Réel vs consensus vs précédent" },
      },
      {
        title: { en: "Policy & earnings path", fr: "Trajectoire politique & bénéfices" },
        detail: { en: "Rates · profits · credit quality", fr: "Taux · profits · qualité de crédit" },
      },
      {
        title: { en: "Cross-asset repricing", fr: "Repricing multi-actifs" },
        detail: { en: "Rates · equities · credit · FX · commodities", fr: "Rates · actions · crédit · FX · commodities" },
      },
    ],
  },
  sections: [
    {
      id: "gdp-growth",
      kicker: { en: "01 · GDP & GROWTH", fr: "01 · PIB & CROISSANCE" },
      title: {
        en: "GDP measures production, but markets care about the growth path",
        fr: "Le PIB mesure la production, mais les marchés regardent surtout la trajectoire de croissance",
      },
      coreFacts: [
        {
          en: "Gross domestic product measures the value of final goods and services produced within an economy over a period under the relevant statistical framework.",
          fr: "Le produit intérieur brut / gross domestic product mesure la valeur des biens et services finaux produits dans une économie sur une période selon le cadre statistique utilisé.",
        },
        {
          en: "The expenditure identity decomposes GDP into consumption, investment, government spending and net exports.",
          fr: "L’identité par la dépense décompose le PIB entre consommation, investissement, dépenses publiques et exportations nettes.",
        },
        {
          en: "Markets often react more to changes in the expected growth trajectory than to the absolute level of GDP.",
          fr: "Les marchés réagissent souvent davantage aux changements de trajectoire de croissance attendue qu’au niveau absolu du PIB.",
        },
        {
          en: "GDP is broad but backward-looking and can be revised as more complete data become available.",
          fr: "Le PIB est une mesure large mais rétrospective et peut être révisé lorsque des données plus complètes deviennent disponibles.",
        },
      ],
      explanation: {
        Beginner: {
          en: "Think of GDP as a very large scorecard for what an economy produces. If households spend more, companies invest more, governments purchase more goods and services, or exports rise relative to imports, measured GDP can increase. But investors care about whether growth is accelerating, slowing or surprising expectations.",
          fr: "Pense au PIB comme à un très grand tableau de score de ce que produit une économie. Si les ménages consomment davantage, les entreprises investissent plus, les administrations achètent davantage de biens et services, ou si les exportations progressent par rapport aux importations, le PIB peut augmenter. Mais les investisseurs regardent surtout si la croissance accélère, ralentit ou surprend les attentes.",
        },
        Intermediate: {
          en: "GDP accounting separates demand into household consumption, private investment, government purchases and net exports. Each component has different drivers, cyclicality and market implications. Inventory changes and trade can make a headline print stronger or weaker than underlying domestic demand.",
          fr: "La comptabilité du PIB sépare la demande entre consommation des ménages, investissement privé, achats publics et exportations nettes. Chaque composante possède ses propres drivers, sa cyclicité et ses implications de marché. Les variations de stocks et le commerce extérieur peuvent rendre le chiffre headline plus fort ou plus faible que la demande domestique sous-jacente.",
        },
        Professional: {
          en: "Macro investors decompose headline GDP into final domestic demand, inventories, trade and sector contributions, then compare the observed mix with trend productivity, labor input and potential output. A high headline growth rate driven by volatile inventories can carry a different signal from equally strong household and business demand.",
          fr: "Les investisseurs macro décomposent le PIB headline entre demande domestique finale, stocks, commerce et contributions sectorielles, puis comparent ce mix à la productivité tendancielle, au facteur travail et au potentiel de production. Une forte croissance alimentée par des stocks volatils n’envoie pas le même signal qu’une croissance équivalente portée par ménages et entreprises.",
        },
      },
      formula: {
        label: { en: "GDP expenditure identity", fr: "Identité du PIB par la dépense" },
        expression: "GDP = C + I + G + (X − M)",
        explanation: {
          en: "C = consumption, I = investment, G = government purchases, X = exports and M = imports.",
          fr: "C = consommation, I = investissement, G = achats publics, X = exportations et M = importations.",
        },
        workedExample: {
          en: "C=700, I=180, G=220, exports=120, imports=150 → GDP = 700+180+220+(120−150)=1,070.",
          fr: "C=700, I=180, G=220, exportations=120, importations=150 → PIB = 700+180+220+(120−150)=1 070.",
        },
      },
      vocabulary: [
        {
          en: "Final domestic demand",
          fr: "demande domestique finale / final domestic demand",
          definition: {
            en: "Domestic consumption and fixed investment plus government demand, excluding some volatile inventory and trade effects depending on definition.",
            fr: "Mesure de demande intérieure combinant notamment consommation, investissement fixe et demande publique, en excluant certains effets volatils de stocks et de commerce selon la définition.",
          },
        },
        {
          en: "Potential output",
          fr: "production potentielle / potential output",
          definition: {
            en: "An estimate of sustainable economic output consistent with available labor, capital and productivity.",
            fr: "Estimation du niveau soutenable de production compte tenu du travail, du capital et de la productivité disponibles.",
          },
        },
      ],
    },
    {
      id: "nominal-real",
      kicker: { en: "02 · NOMINAL VS REAL", fr: "02 · NOMINAL VS RÉEL" },
      title: {
        en: "Nominal growth mixes quantity and price changes",
        fr: "La croissance nominale mélange variation des quantités et variation des prix",
      },
      coreFacts: [
        {
          en: "Nominal GDP values output at current prices; real GDP adjusts for changes in the price level using a statistical methodology.",
          fr: "Le PIB nominal valorise la production aux prix courants ; le PIB réel / real GDP ajuste les variations du niveau des prix selon une méthodologie statistique.",
        },
        {
          en: "Strong nominal revenue growth can come from real volume growth, inflation, or both.",
          fr: "Une forte croissance nominale du revenu peut venir de la croissance réelle des volumes, de l’inflation ou des deux.",
        },
        {
          en: "The GDP deflator is a broad price measure linked to domestically produced final output.",
          fr: "Le déflateur du PIB / GDP deflator est une mesure large des prix liée à la production finale domestique.",
        },
        {
          en: "For approximation, nominal growth is roughly real growth plus inflation, but exact compounding is multiplicative.",
          fr: "En approximation, croissance nominale ≈ croissance réelle + inflation, mais la relation exacte est multiplicative.",
        },
      ],
      explanation: {
        Beginner: {
          en: "If an economy produces the same number of goods but prices rise 5%, nominal GDP can rise even though real output did not. Real GDP tries to remove that price effect so we can see whether the economy actually produced more.",
          fr: "Si une économie produit exactement la même quantité mais que les prix augmentent de 5 %, le PIB nominal peut augmenter alors que la production réelle n’a pas changé. Le PIB réel cherche à retirer cet effet prix pour voir si l’économie a réellement produit davantage.",
        },
        Intermediate: {
          en: "Separating real activity from price effects is essential because assets respond differently to growth and inflation. A company with 8% nominal sales growth during 7% inflation may have very little real volume growth.",
          fr: "Séparer activité réelle et effet prix est essentiel car les actifs réagissent différemment à la croissance et à l’inflation. Une entreprise affichant +8 % de ventes nominales pendant une inflation de 7 % peut avoir très peu de croissance réelle en volume.",
        },
        Professional: {
          en: "Nominal-versus-real decomposition is central to revenue forecasting, debt sustainability and rates analysis. Real activity drives physical utilization and labor demand, while the price component influences nominal cash flows, tax bases and the central-bank reaction function.",
          fr: "La décomposition nominal/réel est centrale pour prévisions de revenu, soutenabilité de la dette et analyse de taux. L’activité réelle influence utilisation physique et demande de travail, tandis que la composante prix influence cash flows nominaux, bases fiscales et fonction de réaction de la banque centrale.",
        },
      },
      formula: {
        label: { en: "GDP deflator", fr: "Déflateur du PIB / GDP deflator" },
        expression: "GDP Deflator = (Nominal GDP ÷ Real GDP) × 100",
        explanation: {
          en: "A deflator above 100 relative to its base reference reflects a higher aggregate price level under the index methodology.",
          fr: "Un déflateur supérieur à 100 par rapport à sa référence de base reflète un niveau agrégé de prix plus élevé selon la méthodologie de l’indice.",
        },
        workedExample: {
          en: "Nominal GDP=1,100 and real GDP=1,000 → deflator = 110.",
          fr: "PIB nominal=1 100 et PIB réel=1 000 → déflateur = 110.",
        },
      },
      marketConnection: {
        en: "A nominal-growth slowdown caused by falling inflation can have very different implications for margins, bond yields and central-bank policy than a slowdown caused by collapsing real demand.",
        fr: "Un ralentissement de croissance nominale provoqué par la baisse de l’inflation peut avoir des implications très différentes pour marges, yields obligataires et banques centrales qu’un ralentissement causé par un effondrement de la demande réelle.",
      },
    },
    {
      id: "inflation",
      kicker: { en: "03 · INFLATION DATA", fr: "03 · DONNÉES D’INFLATION" },
      title: {
        en: "Headline, core, goods, services and shelter can tell different stories",
        fr: "Headline, core, biens, services et logement peuvent raconter des histoires différentes",
      },
      coreFacts: [
        {
          en: "Inflation measures the rate of change in a defined price index, not the absolute level of prices.",
          fr: "L’inflation mesure le taux de variation d’un indice de prix défini, pas le niveau absolu des prix.",
        },
        {
          en: "Headline inflation includes all components in the index; core measures often exclude selected volatile categories to reveal persistence, depending on methodology.",
          fr: "L’inflation headline inclut toutes les composantes de l’indice ; les mesures core excluent souvent certaines catégories volatiles afin d’observer la persistance, selon la méthodologie.",
        },
        {
          en: "Monthly, quarterly and year-over-year rates answer different questions and can send different signals during turning points.",
          fr: "Les taux mensuels, trimestriels et year-over-year répondent à des questions différentes et peuvent envoyer des signaux différents aux points de retournement.",
        },
        {
          en: "Markets often decompose inflation into goods, services, housing, wages and other components rather than relying only on one headline rate.",
          fr: "Les marchés décomposent souvent l’inflation entre biens, services, logement, salaires et autres composantes plutôt que dépendre d’un seul taux headline.",
        },
      ],
      explanation: {
        Beginner: {
          en: "If the price index was 120 last year and is 123.6 this year, year-over-year inflation is 3%. That does not mean prices fell — prices are still higher; they simply increased by 3% over the year.",
          fr: "Si l’indice des prix valait 120 l’an dernier et 123,6 cette année, l’inflation year-over-year vaut 3 %. Cela ne signifie pas que les prix ont baissé : ils sont toujours plus élevés ; ils ont simplement augmenté de 3 % sur l’année.",
        },
        Intermediate: {
          en: "Macro analysis distinguishes inflation level, momentum and breadth. A high year-over-year rate can coexist with weak recent monthly momentum because the annual comparison includes older data. Base effects therefore matter.",
          fr: "L’analyse macro distingue niveau, momentum et diffusion de l’inflation. Un taux year-over-year élevé peut coexister avec un faible momentum mensuel récent car la comparaison annuelle inclut des données plus anciennes. Les effets de base / base effects comptent donc.",
        },
        Professional: {
          en: "Rates markets focus on inflation persistence, diffusion, wage-sensitive services, housing lags and the policy-relevant measure for the jurisdiction. Short-run prints are filtered through seasonal adjustment, base effects and potential measurement noise before being mapped into the expected policy path.",
          fr: "Les marchés de taux se concentrent sur persistance de l’inflation, diffusion, services sensibles aux salaires, retards du logement et mesure pertinente pour la banque centrale concernée. Les prints court terme sont filtrés par ajustement saisonnier, base effects et bruit de mesure avant d’être traduits en trajectoire de politique monétaire.",
        },
      },
      formula: {
        label: { en: "Year-over-year inflation", fr: "Inflation year-over-year" },
        expression: "Inflation = (Price Indexₜ ÷ Price Indexₜ₋₁₂ − 1) × 100",
        explanation: {
          en: "The exact time reference depends on the reporting frequency and index convention.",
          fr: "La référence temporelle exacte dépend de la fréquence de publication et de la convention de l’indice.",
        },
        workedExample: {
          en: "123.6 ÷ 120 − 1 = 3.0%.",
          fr: "123,6 ÷ 120 − 1 = 3,0 %.",
        },
      },
      vocabulary: [
        {
          en: "Base effect",
          fr: "effet de base / base effect",
          definition: {
            en: "A change in the comparison rate caused partly by an unusually high or low base-period observation.",
            fr: "Variation d’un taux de comparaison causée en partie par une observation inhabituellement haute ou basse de la période de base.",
          },
        },
        {
          en: "Core inflation",
          fr: "inflation sous-jacente / core inflation",
          definition: {
            en: "An inflation measure excluding selected components under a defined methodology to study underlying price pressure.",
            fr: "Mesure d’inflation excluant certaines composantes selon une méthodologie définie afin d’étudier les pressions sous-jacentes.",
          },
        },
      ],
    },
    {
      id: "labor-market",
      kicker: { en: "04 · LABOR MARKET", fr: "04 · MARCHÉ DU TRAVAIL" },
      title: {
        en: "Employment data reveal both demand strength and economic slack",
        fr: "Les données d’emploi révèlent à la fois la force de la demande et le slack économique",
      },
      coreFacts: [
        {
          en: "The unemployment rate divides unemployed people by the labor force under the applicable statistical definition.",
          fr: "Le taux de chômage / unemployment rate divise le nombre de chômeurs par la population active / labor force selon la définition statistique utilisée.",
        },
        {
          en: "The labor-force participation rate measures the share of a reference population that is working or actively seeking work, under the chosen definition.",
          fr: "Le taux de participation / labor-force participation rate mesure la part d’une population de référence qui travaille ou recherche activement un emploi, selon la définition choisie.",
        },
        {
          en: "Payroll growth, unemployment, hours worked, wage growth, vacancies and layoffs capture different dimensions of labor demand.",
          fr: "Croissance de l’emploi, chômage, heures travaillées, salaires, postes vacants et licenciements décrivent différentes dimensions de la demande de travail.",
        },
        {
          en: "A low unemployment rate can coexist with slowing hiring if the economy is moving from very strong conditions toward balance.",
          fr: "Un faible taux de chômage peut coexister avec un ralentissement des embauches si l’économie passe d’une situation très forte vers un meilleur équilibre.",
        },
      ],
      explanation: {
        Beginner: {
          en: "If 95 people are working and 5 are actively looking for work, the labor force is 100 and unemployment is 5%. Someone who is not working and not actively looking may be outside the labor force under the statistical definition, so the unemployment rate alone does not describe everyone without a job.",
          fr: "Si 95 personnes travaillent et 5 recherchent activement un emploi, la population active est 100 et le chômage vaut 5 %. Une personne sans emploi qui ne recherche pas activement peut être hors de la labor force selon la définition statistique ; le taux de chômage ne décrit donc pas toutes les personnes sans travail.",
        },
        Intermediate: {
          en: "Labor-market analysis combines stocks and flows. Unemployment is a stock measure, while hiring, quits and layoffs reveal flows. Wage growth matters because it can support household income but can also affect service-sector costs and inflation persistence.",
          fr: "L’analyse du marché du travail combine stocks et flux. Le chômage est une mesure de stock, tandis qu’embauches, démissions et licenciements révèlent les flux. La croissance salariale soutient le revenu des ménages mais peut aussi influencer coûts des services et persistance de l’inflation.",
        },
        Professional: {
          en: "Macro desks watch the joint signal from payrolls, unemployment, participation, hours, earnings, vacancies and claims. A strong payroll headline with falling hours and weak household employment can produce a different market interpretation from a uniformly strong report.",
          fr: "Les desks macro observent le signal conjoint provenant des payrolls, chômage, participation, heures, salaires, vacancies et claims. Un headline payroll fort accompagné d’une baisse des heures et d’un emploi ménages faible peut être interprété différemment d’un rapport uniformément solide.",
        },
      },
      formula: {
        label: { en: "Unemployment rate", fr: "Taux de chômage / Unemployment rate" },
        expression: "Unemployment Rate = Unemployed ÷ Labor Force × 100",
        explanation: {
          en: "Labor force generally includes employed plus unemployed people meeting the relevant definition.",
          fr: "La labor force comprend généralement personnes employées plus chômeurs répondant à la définition pertinente.",
        },
        workedExample: {
          en: "5 unemployed and 95 employed → labor force=100 → unemployment rate=5%.",
          fr: "5 chômeurs et 95 personnes employées → labor force=100 → taux de chômage=5 %.",
        },
      },
      marketConnection: {
        en: "A labor report can move short-term rates sharply because investors update both growth expectations and the expected central-bank reaction.",
        fr: "Un rapport sur l’emploi peut fortement déplacer les taux courts car les investisseurs révisent à la fois leurs anticipations de croissance et la réaction attendue de la banque centrale.",
      },
      vocabulary: [
        {
          en: "Labor-force participation",
          fr: "taux de participation / labor-force participation",
          definition: {
            en: "The share of the defined reference population that is in the labor force.",
            fr: "Part de la population de référence définie appartenant à la population active.",
          },
        },
        {
          en: "Economic slack",
          fr: "slack économique / economic slack",
          definition: {
            en: "Underutilized labor or productive capacity relative to a sustainable benchmark.",
            fr: "Sous-utilisation du travail ou des capacités productives par rapport à un benchmark soutenable.",
          },
        },
      ],
    },
    {
      id: "business-cycle",
      kicker: { en: "05 · BUSINESS CYCLE", fr: "05 · CYCLE ÉCONOMIQUE" },
      title: {
        en: "Different indicators turn at different moments of the cycle",
        fr: "Les indicateurs se retournent à différents moments du cycle",
      },
      coreFacts: [
        {
          en: "Leading indicators tend to change before broader economic activity, coincident indicators move roughly with activity and lagging indicators turn later.",
          fr: "Les indicateurs avancés / leading tendent à changer avant l’activité globale, les indicateurs coïncidents / coincident évoluent approximativement avec elle et les indicateurs retardés / lagging se retournent plus tard.",
        },
        {
          en: "No single indicator reliably identifies every cycle turning point.",
          fr: "Aucun indicateur unique n’identifie de manière fiable tous les retournements de cycle.",
        },
        {
          en: "Credit conditions, new orders, housing, confidence and financial conditions can contain forward-looking information, but relationships are not perfectly stable.",
          fr: "Conditions de crédit, nouvelles commandes, logement, confiance et conditions financières peuvent contenir de l’information prospective, mais les relations ne sont pas parfaitement stables.",
        },
        {
          en: "Markets often price a cycle turn before official GDP data confirm it.",
          fr: "Les marchés pricent souvent un retournement du cycle avant que les données officielles de PIB ne le confirment.",
        },
      ],
      explanation: {
        Beginner: {
          en: "Imagine a company sees fewer new orders. It may first reduce overtime, then hiring, then production. Months later unemployment might rise. The order data were leading, production was closer to coincident, and unemployment may have lagged.",
          fr: "Imagine qu’une entreprise reçoive moins de nouvelles commandes. Elle peut d’abord réduire les heures supplémentaires, puis les embauches, puis la production. Des mois plus tard, le chômage peut augmenter. Les commandes étaient avancées, la production plutôt coïncidente, et le chômage peut avoir été retardé.",
        },
        Intermediate: {
          en: "Cycle analysis uses a dashboard rather than a single threshold. Investors look for breadth and persistence across manufacturing, services, labor, housing, credit and income. A slowdown is not automatically a recession, and a rebound in one survey is not automatically a new expansion.",
          fr: "L’analyse du cycle utilise un dashboard plutôt qu’un seuil unique. Les investisseurs recherchent amplitude et persistance entre industrie, services, emploi, logement, crédit et revenus. Un ralentissement n’est pas automatiquement une récession, et un rebond d’une enquête n’est pas automatiquement une nouvelle expansion.",
        },
        Professional: {
          en: "A market-relevant cycle framework distinguishes level, rate of change and surprise. Assets can rally in weak absolute growth if the rate of deterioration slows and expectations were worse. Macro positioning therefore often depends on second derivatives as much as levels.",
          fr: "Un cadre de cycle pertinent pour les marchés distingue niveau, variation et surprise. Les actifs peuvent monter malgré une croissance absolue faible si le rythme de détérioration ralentit et que les attentes étaient plus mauvaises. Le positionnement macro dépend donc souvent de la dérivée seconde autant que du niveau.",
        },
      },
      comparison: {
        title: { en: "Indicator timing", fr: "Timing des indicateurs" },
        headers: [
          { en: "Type", fr: "Type" },
          { en: "Typical role", fr: "Rôle typique" },
          { en: "Examples of categories", fr: "Exemples de catégories" },
        ],
        rows: [
          { cells: [
            { en: "Leading", fr: "Avancé / leading" },
            { en: "May turn before broad activity", fr: "Peut se retourner avant l’activité globale" },
            { en: "New orders · housing · credit conditions", fr: "Nouvelles commandes · logement · crédit" },
          ]},
          { cells: [
            { en: "Coincident", fr: "Coïncident / coincident" },
            { en: "Moves with current activity", fr: "Évolue avec l’activité actuelle" },
            { en: "Production · income · employment", fr: "Production · revenu · emploi" },
          ]},
          { cells: [
            { en: "Lagging", fr: "Retardé / lagging" },
            { en: "Confirms after the turn", fr: "Confirme après le retournement" },
            { en: "Some inflation and labor measures", fr: "Certaines mesures d’inflation et d’emploi" },
          ]},
        ],
      },
      vocabulary: [
        {
          en: "Rate of change",
          fr: "rythme de variation / rate of change",
          definition: {
            en: "How quickly an economic variable is increasing or decreasing rather than its absolute level.",
            fr: "Vitesse à laquelle une variable économique augmente ou diminue, plutôt que son niveau absolu.",
          },
        },
        {
          en: "Business cycle",
          fr: "cycle économique / business cycle",
          definition: {
            en: "Fluctuations in aggregate economic activity around longer-run trends.",
            fr: "Fluctuations de l’activité économique agrégée autour de tendances de plus long terme.",
          },
        },
      ],
    },
    {
      id: "fiscal-policy",
      kicker: { en: "06 · FISCAL POLICY", fr: "06 · POLITIQUE BUDGÉTAIRE" },
      title: {
        en: "Taxes and public spending change demand, income and financing needs",
        fr: "Taxes et dépenses publiques modifient demande, revenu et besoins de financement",
      },
      coreFacts: [
        {
          en: "Fiscal policy operates through government spending, taxation and transfers under the relevant legal and institutional process.",
          fr: "La politique budgétaire / fiscal policy agit via dépenses publiques, fiscalité et transferts selon le processus juridique et institutionnel applicable.",
        },
        {
          en: "A fiscal deficit occurs when government expenditures exceed revenues over the measured period under the accounting definition.",
          fr: "Un déficit budgétaire apparaît lorsque les dépenses publiques dépassent les recettes sur la période mesurée selon la définition comptable.",
        },
        {
          en: "Fiscal expansion can support aggregate demand, but the size and timing of the effect depend on economic slack, financing, household behavior, import leakage, monetary conditions and implementation.",
          fr: "Une expansion budgétaire peut soutenir la demande globale, mais la taille et le timing de l’effet dépendent du slack économique, du financement, du comportement des ménages, des importations, des conditions monétaires et de l’exécution.",
        },
        {
          en: "Government borrowing needs can affect bond supply and term premia, but market outcomes depend on the broader macro and policy environment.",
          fr: "Les besoins de financement public peuvent influencer l’offre obligataire et les primes de terme / term premia, mais les réactions de marché dépendent du contexte macro et monétaire global.",
        },
      ],
      explanation: {
        Beginner: {
          en: "If a government spends more than it receives in taxes during a period, it runs a deficit and generally needs financing. That spending can support household or business income, but the effect on growth and inflation depends on where the money goes and on the state of the economy.",
          fr: "Si un gouvernement dépense davantage qu’il ne reçoit en impôts sur une période, il enregistre un déficit et doit généralement se financer. Ces dépenses peuvent soutenir le revenu des ménages ou des entreprises, mais l’effet sur croissance et inflation dépend de l’utilisation des fonds et de l’état de l’économie.",
        },
        Intermediate: {
          en: "Fiscal impulse is not equal to the headline deficit. Analysts distinguish automatic stabilizers, discretionary measures, timing and composition. Transfers, infrastructure and tax changes can have different multipliers and different effects on labor supply, investment and imports.",
          fr: "L’impulsion budgétaire n’est pas égale au déficit headline. Les analystes distinguent stabilisateurs automatiques, mesures discrétionnaires, timing et composition. Transferts, infrastructure et modifications fiscales peuvent avoir des multiplicateurs différents et des effets différents sur offre de travail, investissement et importations.",
        },
        Professional: {
          en: "Markets connect fiscal policy to growth impulse, inflation risk, sovereign issuance and the policy mix. The same deficit can be interpreted differently depending on the cycle, maturity structure, domestic savings, currency regime, central-bank response and confidence in the fiscal framework.",
          fr: "Les marchés relient fiscal policy à l’impulsion de croissance, au risque d’inflation, aux émissions souveraines et au policy mix. Un même déficit peut être interprété différemment selon le cycle, la structure de maturité, l’épargne domestique, le régime de change, la réponse de la banque centrale et la confiance dans le cadre budgétaire.",
        },
      },
      formula: {
        label: { en: "Simple budget balance", fr: "Solde budgétaire simple / Budget balance" },
        expression: "Budget Balance = Government Revenue − Government Expenditure",
        explanation: {
          en: "A negative result represents a deficit under this simplified convention.",
          fr: "Un résultat négatif représente un déficit dans cette convention simplifiée.",
        },
        workedExample: {
          en: "Revenue=450 and expenditure=500 → balance = −50, a deficit of 50.",
          fr: "Recettes=450 et dépenses=500 → solde = −50, soit un déficit de 50.",
        },
      },
      marketConnection: {
        en: "A large fiscal change can affect sovereign yields, sector earnings, inflation expectations and FX simultaneously, which is why investors analyze the full policy mix rather than spending alone.",
        fr: "Un changement budgétaire important peut affecter simultanément yields souverains, bénéfices sectoriels, anticipations d’inflation et FX ; les investisseurs analysent donc l’ensemble du policy mix plutôt que la dépense seule.",
      },
      vocabulary: [
        {
          en: "Automatic stabilizer",
          fr: "stabilisateur automatique / automatic stabilizer",
          definition: {
            en: "A fiscal mechanism that changes automatically with economic conditions without a new discretionary decision each time.",
            fr: "Mécanisme budgétaire qui évolue automatiquement avec les conditions économiques sans nouvelle décision discrétionnaire à chaque fois.",
          },
        },
        {
          en: "Fiscal multiplier",
          fr: "multiplicateur budgétaire / fiscal multiplier",
          definition: {
            en: "A measure of the change in economic activity associated with a change in fiscal action under specified conditions.",
            fr: "Mesure de la variation d’activité économique associée à une variation de politique budgétaire sous des conditions données.",
          },
        },
      ],
    },
    {
      id: "macro-surprises",
      kicker: { en: "07 · DATA SURPRISES", fr: "07 · SURPRISES DE DONNÉES" },
      title: {
        en: "Markets trade the gap between reality and expectations",
        fr: "Les marchés tradent l’écart entre réalité et attentes",
      },
      coreFacts: [
        {
          en: "An economic release can be objectively strong but still disappoint markets if consensus expected an even stronger result.",
          fr: "Une publication économique peut être objectivement forte mais décevoir les marchés si le consensus attendait un chiffre encore plus élevé.",
        },
        {
          en: "Investors compare actual data with consensus, prior readings and revisions.",
          fr: "Les investisseurs comparent le chiffre réel au consensus, aux données précédentes et aux révisions.",
        },
        {
          en: "The market impact depends on which part of the release matters for policy, growth, earnings or positioning.",
          fr: "L’impact de marché dépend de la partie de la publication qui compte pour politique monétaire, croissance, bénéfices ou positionnement.",
        },
        {
          en: "Crowded positioning can amplify or reverse the intuitive reaction when traders are forced to unwind.",
          fr: "Un positionnement très consensuel / crowded peut amplifier ou inverser la réaction intuitive lorsque les traders doivent unwinder leurs positions.",
        },
      ],
      explanation: {
        Beginner: {
          en: "Suppose economists expect 200,000 new jobs and the report shows 150,000. Employment still increased, but the result is weaker than expected. Markets may react to that negative surprise rather than to the fact that jobs were positive.",
          fr: "Supposons que les économistes attendent 200 000 créations d’emplois et que le rapport en affiche 150 000. L’emploi a quand même augmenté, mais le chiffre est inférieur aux attentes. Les marchés peuvent réagir à cette surprise négative plutôt qu’au fait que l’emploi soit positif.",
        },
        Intermediate: {
          en: "Surprise analysis asks actual minus consensus, then interprets the composition and revisions. A lower unemployment rate may be less bullish if participation collapsed, while a strong inflation headline may matter less if the policy-sensitive components softened.",
          fr: "L’analyse de surprise calcule réel moins consensus puis interprète composition et révisions. Un chômage plus faible peut être moins bullish si la participation s’effondre, tandis qu’une inflation headline forte peut compter moins si les composantes sensibles à la politique se détendent.",
        },
        Professional: {
          en: "Markets price a distribution before the event. The reaction is therefore a function of standardized surprise, information content, revision structure, policy sensitivity, positioning and liquidity. Event studies often distinguish immediate price shock from the later narrative as analysts process details.",
          fr: "Les marchés pricent une distribution avant l’événement. La réaction dépend donc de la surprise standardisée, du contenu informationnel, des révisions, de la sensibilité à la politique, du positionnement et de la liquidité. Les event studies distinguent souvent le choc immédiat de prix du narratif ultérieur lorsque les détails sont digérés.",
        },
      },
      formula: {
        label: { en: "Simple data surprise", fr: "Surprise de donnée simple" },
        expression: "Surprise = Actual − Consensus",
        explanation: {
          en: "For comparison across different indicators, professionals may standardize surprises by historical forecast error or volatility.",
          fr: "Pour comparer différents indicateurs, les professionnels peuvent standardiser les surprises par l’erreur historique de prévision ou la volatilité.",
        },
        workedExample: {
          en: "Actual payroll growth 150k versus consensus 200k → surprise = −50k.",
          fr: "Créations d’emplois réelles 150k vs consensus 200k → surprise = −50k.",
        },
      },
      vocabulary: [
        {
          en: "Consensus",
          fr: "consensus",
          definition: {
            en: "A summary estimate of market or economist expectations before a release.",
            fr: "Estimation synthétique des attentes du marché ou des économistes avant une publication.",
          },
        },
        {
          en: "Revision",
          fr: "révision / revision",
          definition: {
            en: "A later change to a previously published data estimate.",
            fr: "Modification ultérieure d’une estimation statistique déjà publiée.",
          },
        },
      ],
    },
    {
      id: "cross-asset-regimes",
      kicker: { en: "08 · MACRO REGIMES", fr: "08 · RÉGIMES MACRO" },
      title: {
        en: "Growth and inflation create different cross-asset environments",
        fr: "Croissance et inflation créent différents environnements multi-actifs",
      },
      coreFacts: [
        {
          en: "Asset reactions depend on both growth and inflation because they affect earnings, discount rates, policy and risk premia.",
          fr: "Les réactions des actifs dépendent à la fois de la croissance et de l’inflation car elles influencent bénéfices, discount rates, politique monétaire et primes de risque.",
        },
        {
          en: "A growth acceleration with contained inflation can have different market implications from growth acceleration with inflation pressure.",
          fr: "Une accélération de croissance avec inflation contenue peut avoir des implications très différentes d’une accélération accompagnée de pression inflationniste.",
        },
        {
          en: "Cross-asset relationships are conditional, not mechanical; valuation, positioning and policy expectations can dominate simple regime rules.",
          fr: "Les relations multi-actifs sont conditionnelles et non mécaniques ; valorisation, positionnement et attentes de politique peuvent dominer les règles simples de régime.",
        },
        {
          en: "Scenario analysis is more useful than assuming one asset class always benefits from one macro variable.",
          fr: "L’analyse de scénarios est plus utile que supposer qu’une classe d’actifs bénéficie toujours d’une variable macro donnée.",
        },
      ],
      explanation: {
        Beginner: {
          en: "If growth improves and inflation stays calm, companies may earn more while interest-rate pressure remains limited. If growth improves but inflation also jumps, bond yields may rise and valuations can face pressure. The same growth number can therefore produce different market outcomes.",
          fr: "Si la croissance s’améliore et que l’inflation reste calme, les entreprises peuvent gagner davantage alors que la pression sur les taux reste limitée. Si croissance et inflation accélèrent ensemble, les yields obligataires peuvent monter et peser sur les valorisations. Un même chiffre de croissance peut donc produire des réactions différentes.",
        },
        Intermediate: {
          en: "A useful macro grid has four quadrants: growth up/down crossed with inflation up/down. It helps organize likely pressure on policy expectations, nominal yields, real yields, margins and currencies without pretending the mapping is deterministic.",
          fr: "Une grille macro utile comporte quatre quadrants : croissance en hausse/baisse croisée avec inflation en hausse/baisse. Elle aide à organiser la pression probable sur anticipations de politique, yields nominaux, taux réels, marges et devises sans prétendre que le mapping est déterministe.",
        },
        Professional: {
          en: "Cross-asset macro trading separates the level of growth and inflation from their momentum and surprise. A disinflationary growth slowdown can be bullish for duration before it becomes bearish for credit if the slowdown later threatens cash flows. Sequencing matters.",
          fr: "Le trading macro multi-actifs sépare niveau de croissance/inflation de leur momentum et surprise. Un ralentissement désinflationniste peut d’abord être bullish pour la duration avant de devenir bearish pour le crédit si le ralentissement menace ensuite les cash flows. La séquence compte.",
        },
      },
      comparison: {
        title: { en: "Simple growth-inflation regime map", fr: "Carte simple croissance-inflation" },
        headers: [
          { en: "Regime", fr: "Régime" },
          { en: "Typical macro tension", fr: "Tension macro typique" },
          { en: "What to watch", fr: "À surveiller" },
        ],
        rows: [
          { cells: [
            { en: "Growth ↑ / Inflation ↓", fr: "Croissance ↑ / Inflation ↓" },
            { en: "Improving activity with disinflation", fr: "Activité plus forte avec désinflation" },
            { en: "Earnings breadth · policy easing expectations", fr: "Largeur des bénéfices · attentes d’assouplissement" },
          ]},
          { cells: [
            { en: "Growth ↑ / Inflation ↑", fr: "Croissance ↑ / Inflation ↑" },
            { en: "Overheating risk", fr: "Risque de surchauffe" },
            { en: "Yields · margins · policy repricing", fr: "Yields · marges · repricing monétaire" },
          ]},
          { cells: [
            { en: "Growth ↓ / Inflation ↓", fr: "Croissance ↓ / Inflation ↓" },
            { en: "Demand slowdown", fr: "Ralentissement de la demande" },
            { en: "Duration · credit quality · earnings cuts", fr: "Duration · qualité crédit · révisions bénéficiaires" },
          ]},
          { cells: [
            { en: "Growth ↓ / Inflation ↑", fr: "Croissance ↓ / Inflation ↑" },
            { en: "Stagflationary pressure", fr: "Pression stagflationniste" },
            { en: "Real income · margins · policy constraint", fr: "Revenu réel · marges · contrainte monétaire" },
          ]},
        ],
      },
      vocabulary: [
        {
          en: "Stagflation",
          fr: "stagflation",
          definition: {
            en: "A difficult macro environment combining weak growth with elevated inflation pressure.",
            fr: "Environnement macro difficile combinant faible croissance et pression inflationniste élevée.",
          },
        },
        {
          en: "Disinflation",
          fr: "désinflation / disinflation",
          definition: {
            en: "A decline in the rate of inflation while the price level can still be rising.",
            fr: "Baisse du taux d’inflation alors que le niveau général des prix peut continuer d’augmenter.",
          },
        },
      ],
    },
    {
      id: "macro-dashboard",
      kicker: { en: "09 · BUILD A MACRO DASHBOARD", fr: "09 · CONSTRUIRE UN DASHBOARD MACRO" },
      title: {
        en: "Think in levels, momentum, surprises and cross-asset confirmation",
        fr: "Raisonner en niveaux, momentum, surprises et confirmation multi-actifs",
      },
      coreFacts: [
        {
          en: "A strong macro process tracks a small set of indicators consistently rather than reacting to every headline.",
          fr: "Un bon processus macro suit de manière cohérente un ensemble limité d’indicateurs plutôt que réagir à chaque headline.",
        },
        {
          en: "For each indicator, separate level, direction, acceleration or deceleration, consensus surprise and revisions.",
          fr: "Pour chaque indicateur, séparer niveau, direction, accélération/décélération, surprise face au consensus et révisions.",
        },
        {
          en: "Cross-asset confirmation can reveal whether the market is interpreting a release mainly through growth, inflation, policy or risk sentiment.",
          fr: "La confirmation multi-actifs peut montrer si le marché interprète une publication principalement via croissance, inflation, politique monétaire ou sentiment de risque.",
        },
        {
          en: "A macro thesis should include an invalidation condition because incoming data can change the regime.",
          fr: "Une thèse macro doit inclure une condition d’invalidation car les nouvelles données peuvent modifier le régime.",
        },
      ],
      explanation: {
        Beginner: {
          en: "Do not memorize hundreds of indicators. Start with growth, inflation, labor, credit and policy. For each one, ask: is it strong or weak, getting better or worse, above or below expectations, and what did markets do after the release?",
          fr: "Il n’est pas nécessaire de mémoriser des centaines d’indicateurs. Commence par croissance, inflation, emploi, crédit et politique monétaire. Pour chacun, demande : est-il fort ou faible, s’améliore-t-il ou se détériore-t-il, est-il au-dessus ou en dessous des attentes, et comment les marchés ont-ils réagi ?",
        },
        Intermediate: {
          en: "A practical dashboard combines hard data and surveys, uses rolling trends rather than one print and records revisions. The objective is not to predict every release; it is to maintain a coherent view of the economy and know what evidence would change that view.",
          fr: "Un dashboard pratique combine données dures et enquêtes, utilise des tendances glissantes plutôt qu’un seul print et enregistre les révisions. L’objectif n’est pas de prédire chaque publication mais de maintenir une vision cohérente de l’économie et de savoir quelles preuves changeraient cette vision.",
        },
        Professional: {
          en: "Professional macro frameworks map data into latent factors such as growth, inflation and liquidity, then connect those factors to policy pricing and asset sensitivities. The edge comes from identifying where the market narrative, positioning and incoming data disagree.",
          fr: "Les cadres macro professionnels traduisent les données en facteurs latents comme croissance, inflation et liquidité, puis relient ces facteurs au pricing de politique monétaire et aux sensibilités des actifs. L’edge vient de l’identification des divergences entre narratif de marché, positionnement et données entrantes.",
        },
      },
      comparison: {
        title: { en: "A five-question macro checklist", fr: "Checklist macro en cinq questions" },
        headers: [
          { en: "Question", fr: "Question" },
          { en: "Purpose", fr: "Objectif" },
        ],
        rows: [
          { cells: [
            { en: "What is the level?", fr: "Quel est le niveau ?" },
            { en: "Know the current state", fr: "Connaître l’état actuel" },
          ]},
          { cells: [
            { en: "What is the direction?", fr: "Quelle est la direction ?" },
            { en: "Identify momentum", fr: "Identifier le momentum" },
          ]},
          { cells: [
            { en: "What was expected?", fr: "Qu’attendait le marché ?" },
            { en: "Measure surprise", fr: "Mesurer la surprise" },
          ]},
          { cells: [
            { en: "What was revised?", fr: "Qu’est-ce qui a été révisé ?" },
            { en: "Check signal quality", fr: "Vérifier la qualité du signal" },
          ]},
          { cells: [
            { en: "How did assets respond?", fr: "Comment les actifs ont-ils réagi ?" },
            { en: "Infer the market narrative", fr: "Déduire le narratif de marché" },
          ]},
        ],
      },
      marketConnection: {
        en: "This framework becomes the foundation for FinanceStudio's future live News & Analysis engine, where each release can be linked to rates, equities, credit, FX and commodities.",
        fr: "Ce cadre devient la base du futur moteur live News & Analysis de FinanceStudio, où chaque publication pourra être reliée aux taux, actions, crédit, FX et matières premières.",
      },
    },
  ],
  quiz: [
    {
      id: "q1",
      conceptKey: "gdp-identity",
      question: {
        en: "If C=700, I=180, G=220, exports=120 and imports=150, what is GDP using the expenditure identity?",
        fr: "Si C=700, I=180, G=220, exportations=120 et importations=150, quel est le PIB selon l’identité par la dépense ?",
      },
      options: [
        { id: "a", label: { en: "950", fr: "950" } },
        { id: "b", label: { en: "1,070", fr: "1 070" } },
        { id: "c", label: { en: "1,170", fr: "1 170" } },
        { id: "d", label: { en: "1,370", fr: "1 370" } },
      ],
      correctOption: "b",
      explanation: {
        en: "700+180+220+(120−150)=1,070.",
        fr: "700+180+220+(120−150)=1 070.",
      },
    },
    {
      id: "q2",
      conceptKey: "gdp-deflator",
      question: {
        en: "Nominal GDP is 1,100 and real GDP is 1,000. What is the GDP deflator?",
        fr: "Le PIB nominal vaut 1 100 et le PIB réel 1 000. Quel est le déflateur du PIB ?",
      },
      options: [
        { id: "a", label: { en: "90", fr: "90" } },
        { id: "b", label: { en: "100", fr: "100" } },
        { id: "c", label: { en: "110", fr: "110" } },
        { id: "d", label: { en: "1,100", fr: "1 100" } },
      ],
      correctOption: "c",
      explanation: {
        en: "(1,100 ÷ 1,000)×100 = 110.",
        fr: "(1 100 ÷ 1 000)×100 = 110.",
      },
    },
    {
      id: "q3",
      conceptKey: "inflation-rate",
      question: {
        en: "A price index rises from 120 to 123.6 over one year. Approximate year-over-year inflation is:",
        fr: "Un indice des prix passe de 120 à 123,6 sur un an. L’inflation year-over-year approximative vaut :",
      },
      options: [
        { id: "a", label: { en: "1%", fr: "1 %" } },
        { id: "b", label: { en: "2%", fr: "2 %" } },
        { id: "c", label: { en: "3%", fr: "3 %" } },
        { id: "d", label: { en: "6%", fr: "6 %" } },
      ],
      correctOption: "c",
      explanation: {
        en: "123.6 ÷ 120 − 1 = 3%.",
        fr: "123,6 ÷ 120 − 1 = 3 %.",
      },
    },
    {
      id: "q4",
      conceptKey: "unemployment-rate",
      question: {
        en: "There are 95 employed people and 5 unemployed people in the labor force. What is the unemployment rate?",
        fr: "Il y a 95 personnes employées et 5 chômeurs dans la labor force. Quel est le taux de chômage ?",
      },
      options: [
        { id: "a", label: { en: "4%", fr: "4 %" } },
        { id: "b", label: { en: "5%", fr: "5 %" } },
        { id: "c", label: { en: "5.3%", fr: "5,3 %" } },
        { id: "d", label: { en: "10%", fr: "10 %" } },
      ],
      correctOption: "b",
      explanation: {
        en: "Labor force = 100, so 5 ÷ 100 = 5%.",
        fr: "La labor force vaut 100, donc 5 ÷ 100 = 5 %.",
      },
    },
    {
      id: "q5",
      conceptKey: "indicator-timing",
      question: {
        en: "Which statement best describes a leading indicator?",
        fr: "Quelle proposition décrit le mieux un indicateur avancé / leading indicator ?",
      },
      options: [
        { id: "a", label: { en: "It tends to turn before broader economic activity", fr: "Il tend à se retourner avant l’activité économique globale" } },
        { id: "b", label: { en: "It can only be observed years later", fr: "Il ne peut être observé que plusieurs années plus tard" } },
        { id: "c", label: { en: "It always predicts recessions perfectly", fr: "Il prédit toujours parfaitement les récessions" } },
        { id: "d", label: { en: "It is identical to GDP", fr: "Il est identique au PIB" } },
      ],
      correctOption: "a",
      explanation: {
        en: "Leading indicators tend to move before the broader cycle, but they are not perfect predictors.",
        fr: "Les indicateurs avancés tendent à évoluer avant le cycle global, mais ne sont pas des prédicteurs parfaits.",
      },
    },
    {
      id: "q6",
      conceptKey: "fiscal-balance",
      question: {
        en: "Government revenue is 450 and expenditure is 500. What is the simplified budget balance?",
        fr: "Les recettes publiques valent 450 et les dépenses 500. Quel est le solde budgétaire simplifié ?",
      },
      options: [
        { id: "a", label: { en: "+50 surplus", fr: "+50 d’excédent" } },
        { id: "b", label: { en: "0", fr: "0" } },
        { id: "c", label: { en: "−50 deficit", fr: "−50 de déficit" } },
        { id: "d", label: { en: "−950 deficit", fr: "−950 de déficit" } },
      ],
      correctOption: "c",
      explanation: {
        en: "450−500 = −50.",
        fr: "450−500 = −50.",
      },
    },
    {
      id: "q7",
      conceptKey: "macro-surprise",
      question: {
        en: "Payroll growth is 150k versus 200k consensus. What is the simple surprise?",
        fr: "Les créations d’emplois sont de 150k contre un consensus de 200k. Quelle est la surprise simple ?",
      },
      options: [
        { id: "a", label: { en: "+350k", fr: "+350k" } },
        { id: "b", label: { en: "+50k", fr: "+50k" } },
        { id: "c", label: { en: "−50k", fr: "−50k" } },
        { id: "d", label: { en: "0", fr: "0" } },
      ],
      correctOption: "c",
      explanation: {
        en: "Actual−consensus = 150k−200k = −50k.",
        fr: "Réel−consensus = 150k−200k = −50k.",
      },
    },
    {
      id: "q8",
      conceptKey: "macro-regime",
      question: {
        en: "Why is a growth acceleration with falling inflation different from growth acceleration with rising inflation?",
        fr: "Pourquoi une accélération de croissance avec inflation en baisse diffère-t-elle d’une accélération avec inflation en hausse ?",
      },
      options: [
        { id: "a", label: { en: "Because inflation changes policy and discount-rate implications", fr: "Parce que l’inflation modifie les implications pour politique monétaire et discount rates" } },
        { id: "b", label: { en: "Because GDP stops mattering when inflation rises", fr: "Parce que le PIB ne compte plus quand l’inflation augmente" } },
        { id: "c", label: { en: "Because asset prices are unrelated to rates", fr: "Parce que les prix d’actifs n’ont aucun lien avec les taux" } },
        { id: "d", label: { en: "There is never any difference", fr: "Il n’existe jamais aucune différence" } },
      ],
      correctOption: "a",
      explanation: {
        en: "Growth and inflation jointly shape expected earnings, policy, yields and valuation, so the regime matters.",
        fr: "Croissance et inflation influencent ensemble bénéfices attendus, politique monétaire, yields et valorisation ; le régime compte donc.",
      },
    },
  ],
  interviewPrompt: {
    question: {
      en: "A jobs report is stronger than expected. Walk me through how you would think about the market reaction.",
      fr: "Un rapport sur l’emploi est plus fort que prévu. Explique comment tu analyserais la réaction des marchés.",
    },
    framework: [
      {
        en: "Start with the surprise versus consensus, not just the absolute job number.",
        fr: "Commencer par la surprise face au consensus, pas seulement le chiffre absolu d’emplois.",
      },
      {
        en: "Check composition: unemployment, participation, wages, hours and revisions.",
        fr: "Vérifier la composition : chômage, participation, salaires, heures et révisions.",
      },
      {
        en: "Translate into growth and inflation implications.",
        fr: "Traduire le rapport en implications pour croissance et inflation.",
      },
      {
        en: "Update the expected central-bank path and front-end rates.",
        fr: "Mettre à jour la trajectoire attendue de la banque centrale et les taux courts.",
      },
      {
        en: "Then map to equities, credit and FX while considering prior positioning and what was already priced.",
        fr: "Puis relier aux actions, crédit et FX en tenant compte du positionnement préalable et de ce qui était déjà pricé.",
      },
    ],
    sample: {
      en: "I would begin with the surprise relative to consensus because markets react to new information, not just the headline level. Then I would check the details: unemployment, participation, wage growth, hours worked and revisions. If the report is broadly strong and wage pressure is also firm, markets may price a stronger growth outlook but also a more restrictive expected central-bank path, which can push front-end yields higher. Equities could benefit from stronger growth but face valuation pressure from higher discount rates, so sector composition matters. Credit could initially like better growth, while FX would depend on the change in relative rate expectations. I would also check positioning because a crowded pre-release view can change the price reaction.",
      fr: "Je commencerais par la surprise par rapport au consensus car les marchés réagissent à l’information nouvelle, pas seulement au niveau headline. Ensuite je regarderais les détails : chômage, participation, croissance des salaires, heures travaillées et révisions. Si le rapport est largement solide et que les pressions salariales restent fortes, les marchés peuvent pricer une meilleure croissance mais aussi une trajectoire de banque centrale plus restrictive, ce qui peut faire monter les taux courts. Les actions peuvent bénéficier de la croissance mais subir une pression de valorisation via des discount rates plus élevés ; la composition sectorielle compte donc. Le crédit peut initialement apprécier la meilleure croissance, tandis que le FX dépendra du changement des différentiels de taux attendus. Je regarderais aussi le positionnement, car un consensus très crowded avant la publication peut modifier la réaction des prix.",
    },
  },
};


export const financialAccountingILesson: FinanceLesson = {
  slug: "year-1-financial-accounting-i",
  year: { en: "Year 1 · Foundations", fr: "Année 1 · Fondations" },
  domain: {
    en: "Accounting & Statements",
    fr: "Comptabilité & états financiers / Accounting & Statements",
  },
  title: {
    en: "Financial Accounting I",
    fr: "Comptabilité financière I / Financial Accounting I",
  },
  subtitle: {
    en: "Learn the language behind company financial statements: the balance sheet, income statement and cash flow statement, how accrual accounting works, and how transactions flow through all three statements.",
    fr: "Apprendre le langage des états financiers d’une entreprise : bilan / balance sheet, compte de résultat / income statement et tableau des flux de trésorerie / cash flow statement, comprendre l’accrual accounting et suivre les transactions à travers les trois états.",
  },
  duration: { en: "95–120 min", fr: "95–120 min" },
  prerequisites: [
    {
      en: "Basic algebra and percentages",
      fr: "Algèbre simple et pourcentages",
    },
    {
      en: "Time Value of Money",
      fr: "Valeur temps de l’argent / Time Value of Money",
    },
  ],
  objectives: [
    {
      en: "Explain the purpose of the balance sheet, income statement and cash flow statement.",
      fr: "Expliquer le rôle du bilan / balance sheet, du compte de résultat / income statement et du tableau des flux de trésorerie / cash flow statement.",
    },
    {
      en: "Use the accounting equation and classify common assets, liabilities and equity accounts.",
      fr: "Utiliser l’équation comptable et classer les principaux actifs, passifs et capitaux propres / equity.",
    },
    {
      en: "Explain accrual accounting and distinguish revenue, expenses, profit and cash.",
      fr: "Expliquer la comptabilité d’engagement / accrual accounting et distinguer revenu, dépenses, bénéfice et cash.",
    },
    {
      en: "Classify cash flows into operating, investing and financing activities under common reporting conventions.",
      fr: "Classer les flux de trésorerie entre activités opérationnelles / operating, d’investissement / investing et de financement / financing selon les conventions usuelles.",
    },
    {
      en: "Link net income, retained earnings, depreciation, working capital and cash across the statements.",
      fr: "Relier net income, retained earnings, depreciation, working capital et cash entre les différents états.",
    },
    {
      en: "Recognize why earnings quality and cash conversion matter to investors.",
      fr: "Comprendre pourquoi qualité des bénéfices / earnings quality et conversion en cash comptent pour les investisseurs.",
    },
  ],
  overviewFlow: {
    title: {
      en: "How the three statements connect",
      fr: "Comment les trois états financiers se connectent",
    },
    steps: [
      {
        title: { en: "Income statement", fr: "Compte de résultat / Income statement" },
        detail: { en: "Revenue → expenses → net income", fr: "Revenu → dépenses → net income" },
      },
      {
        title: { en: "Balance sheet", fr: "Bilan / Balance sheet" },
        detail: { en: "Assets = liabilities + equity", fr: "Actifs = passifs + equity" },
      },
      {
        title: { en: "Cash flow statement", fr: "Tableau des flux / Cash flow statement" },
        detail: { en: "Operating · investing · financing", fr: "Operating · investing · financing" },
      },
      {
        title: { en: "Investor analysis", fr: "Analyse investisseur" },
        detail: { en: "Profitability · cash conversion · balance-sheet risk", fr: "Rentabilité · cash conversion · risque de bilan" },
      },
    ],
  },
  sections: [
    {
      id: "three-statements",
      kicker: { en: "01 · THE THREE STATEMENTS", fr: "01 · LES TROIS ÉTATS FINANCIERS" },
      title: {
        en: "One company, three different views",
        fr: "Une entreprise, trois angles de lecture différents",
      },
      coreFacts: [
        {
          en: "The balance sheet is a point-in-time snapshot of assets, liabilities and equity.",
          fr: "Le bilan / balance sheet est une photographie à une date donnée des actifs, passifs et capitaux propres / equity.",
        },
        {
          en: "The income statement reports revenue and expenses over a period and arrives at profit or loss.",
          fr: "Le compte de résultat / income statement présente revenus et dépenses sur une période et aboutit à un bénéfice ou une perte.",
        },
        {
          en: "The cash flow statement explains changes in cash over a period by classifying cash flows into operating, investing and financing activities under the applicable reporting framework.",
          fr: "Le tableau des flux de trésorerie / cash flow statement explique la variation du cash sur une période en classant les flux entre operating, investing et financing selon le référentiel comptable applicable.",
        },
        {
          en: "The three statements are linked; analyzing one in isolation can hide important information about liquidity, leverage or earnings quality.",
          fr: "Les trois états sont liés ; analyser un seul état isolément peut masquer des informations importantes sur liquidité, levier ou qualité des bénéfices.",
        },
      ],
      explanation: {
        Beginner: {
          en: "Imagine taking three pictures of the same business. The balance sheet answers 'What does the company own and owe today?' The income statement answers 'Did the company make a profit during the period?' The cash flow statement answers 'Where did cash actually come from and where did it go?'",
          fr: "Imagine trois photos de la même entreprise. Le balance sheet répond : « Que possède l’entreprise et que doit-elle aujourd’hui ? » L’income statement répond : « A-t-elle réalisé un bénéfice pendant la période ? » Le cash flow statement répond : « D’où vient réellement le cash et où est-il parti ? »",
        },
        Intermediate: {
          en: "The statements measure different dimensions. The balance sheet stores cumulative resources and claims, the income statement measures accounting performance during the period, and the cash flow statement reconciles accounting activity with actual cash movements.",
          fr: "Les états mesurent des dimensions différentes. Le bilan stocke les ressources et créances cumulées, l’income statement mesure la performance comptable sur la période et le cash flow statement rapproche l’activité comptable des mouvements réels de cash.",
        },
        Professional: {
          en: "Financial analysis is a linked-statement exercise. Profitability, capital intensity, financing structure and liquidity all interact. A company can report strong earnings while consuming cash, or weak accounting earnings while generating strong cash because timing and non-cash charges differ.",
          fr: "L’analyse financière est un exercice d’états liés. Rentabilité, intensité capitalistique, structure de financement et liquidité interagissent. Une entreprise peut afficher de bons bénéfices tout en consommant du cash, ou de faibles bénéfices comptables tout en générant beaucoup de cash à cause du timing et des charges non cash.",
        },
      },
      comparison: {
        title: { en: "The three statements at a glance", fr: "Les trois états en un coup d’œil" },
        headers: [
          { en: "Statement", fr: "État" },
          { en: "Timing", fr: "Temporalité" },
          { en: "Core question", fr: "Question principale" },
        ],
        rows: [
          { cells: [
            { en: "Balance sheet", fr: "Bilan / Balance sheet" },
            { en: "Point in time", fr: "À une date donnée" },
            { en: "What does the company own and owe?", fr: "Que possède et doit l’entreprise ?" },
          ]},
          { cells: [
            { en: "Income statement", fr: "Compte de résultat / Income statement" },
            { en: "Over a period", fr: "Sur une période" },
            { en: "Was the period profitable?", fr: "La période a-t-elle été rentable ?" },
          ]},
          { cells: [
            { en: "Cash flow statement", fr: "Tableau des flux / Cash flow statement" },
            { en: "Over a period", fr: "Sur une période" },
            { en: "How did cash change?", fr: "Comment le cash a-t-il évolué ?" },
          ]},
        ],
      },
      vocabulary: [
        {
          en: "Financial statements",
          fr: "états financiers / financial statements",
          definition: {
            en: "Structured reports presenting financial position, performance and cash flows under an accounting framework.",
            fr: "Rapports structurés présentant position financière, performance et flux de trésorerie selon un référentiel comptable.",
          },
        },
        {
          en: "Reporting period",
          fr: "période de reporting / reporting period",
          definition: {
            en: "The span of time covered by a financial report, such as a quarter or fiscal year.",
            fr: "Période couverte par un rapport financier, par exemple un trimestre ou un exercice fiscal.",
          },
        },
      ],
    },
    {
      id: "balance-sheet",
      kicker: { en: "02 · THE BALANCE SHEET", fr: "02 · LE BILAN" },
      title: {
        en: "Assets are funded by liabilities and equity",
        fr: "Les actifs sont financés par les passifs et l’equity",
      },
      coreFacts: [
        {
          en: "Assets are economic resources controlled by the company under the applicable accounting framework.",
          fr: "Les actifs / assets sont des ressources économiques contrôlées par l’entreprise selon le référentiel comptable applicable.",
        },
        {
          en: "Liabilities are present obligations that can require economic resources to be transferred.",
          fr: "Les passifs / liabilities sont des obligations présentes pouvant nécessiter un transfert de ressources économiques.",
        },
        {
          en: "Equity is the residual interest after liabilities are deducted from assets.",
          fr: "Les capitaux propres / equity représentent l’intérêt résiduel après déduction des passifs des actifs.",
        },
        {
          en: "The accounting equation must remain balanced after every recognized transaction.",
          fr: "L’équation comptable doit rester équilibrée après chaque transaction comptabilisée.",
        },
      ],
      explanation: {
        Beginner: {
          en: "If a company has $1,000 of assets and owes creditors $600, the residual equity is $400. If it borrows another $100 and keeps the cash, both assets and liabilities increase by $100, so the equation still balances.",
          fr: "Si une entreprise possède 1 000 $ d’actifs et doit 600 $ à ses créanciers, l’equity résiduelle vaut 400 $. Si elle emprunte 100 $ supplémentaires et conserve ce cash, les actifs et les passifs augmentent chacun de 100 $ ; l’équation reste équilibrée.",
        },
        Intermediate: {
          en: "Balance-sheet analysis separates liquidity, operating assets, financing obligations and shareholder capital. Current versus non-current classification can help assess near-term liquidity, but analysts also examine contractual maturities and economic substance.",
          fr: "L’analyse du bilan distingue liquidité, actifs opérationnels, obligations de financement et capital des actionnaires. La classification courant/non courant aide à évaluer la liquidité court terme, mais les analystes regardent également maturités contractuelles et substance économique.",
        },
        Professional: {
          en: "The balance sheet is the accumulated result of prior operating, investing and financing decisions. Analysts normalize items for excess cash, debt-like liabilities, off-balance-sheet commitments and non-operating assets when moving from accounting values to enterprise-value analysis.",
          fr: "Le bilan est le résultat accumulé des décisions opérationnelles, d’investissement et de financement passées. Les analystes normalisent souvent cash excédentaire, passifs assimilables à de la dette, engagements hors bilan et actifs non opérationnels lorsqu’ils passent des valeurs comptables à l’analyse d’enterprise value.",
        },
      },
      formula: {
        label: { en: "Accounting equation", fr: "Équation comptable / Accounting equation" },
        expression: "Assets = Liabilities + Equity",
        explanation: {
          en: "Equity is the residual claim: Assets − Liabilities.",
          fr: "L’equity est la créance résiduelle : Actifs − Passifs.",
        },
        workedExample: {
          en: "Assets $1,000 − liabilities $600 = equity $400.",
          fr: "Actifs 1 000 $ − passifs 600 $ = equity 400 $.",
        },
      },
      vocabulary: [
        {
          en: "Accounts receivable",
          fr: "créances clients / accounts receivable",
          definition: {
            en: "Amounts owed to the company by customers for recognized sales not yet collected in cash.",
            fr: "Montants dus à l’entreprise par les clients pour des ventes comptabilisées mais pas encore encaissées.",
          },
        },
        {
          en: "Accounts payable",
          fr: "dettes fournisseurs / accounts payable",
          definition: {
            en: "Amounts the company owes suppliers for goods or services already received.",
            fr: "Montants dus par l’entreprise à ses fournisseurs pour des biens ou services déjà reçus.",
          },
        },
      ],
    },
    {
      id: "income-statement",
      kicker: { en: "03 · THE INCOME STATEMENT", fr: "03 · LE COMPTE DE RÉSULTAT" },
      title: {
        en: "Revenue minus expenses becomes profit — but not necessarily cash",
        fr: "Revenu moins dépenses devient bénéfice — mais pas forcément du cash",
      },
      coreFacts: [
        {
          en: "Revenue is recognized according to accounting rules when the relevant performance conditions are satisfied, not simply whenever cash is received.",
          fr: "Le revenu / revenue est comptabilisé selon les règles lorsque les conditions de reconnaissance pertinentes sont satisfaites, pas simplement lorsque le cash est encaissé.",
        },
        {
          en: "Expenses are recognized according to the applicable accounting framework and may be recorded before or after the related cash payment.",
          fr: "Les dépenses / expenses sont reconnues selon le référentiel applicable et peuvent être comptabilisées avant ou après le paiement correspondant.",
        },
        {
          en: "Gross profit, operating income, pre-tax income and net income represent different levels of profitability.",
          fr: "Gross profit, operating income, pre-tax income et net income représentent différents niveaux de rentabilité.",
        },
        {
          en: "Net income belongs to the accounting period and includes non-cash items such as depreciation.",
          fr: "Le net income appartient à la période comptable et inclut des éléments non cash comme la depreciation.",
        },
      ],
      explanation: {
        Beginner: {
          en: "Suppose a company sells a product for $100 that cost $60 to make. Gross profit is $40. If operating expenses are $20, operating income is $20 before interest and taxes. The key point is that these accounting revenues and expenses do not always happen at the same time as cash payments.",
          fr: "Supposons qu’une entreprise vende un produit 100 $ qui lui a coûté 60 $ à produire. Le gross profit vaut 40 $. Si les dépenses opérationnelles valent 20 $, l’operating income vaut 20 $ avant intérêts et impôts. Point essentiel : ces revenus et charges comptables ne se produisent pas toujours au même moment que les encaissements et paiements.",
        },
        Intermediate: {
          en: "The income statement is built on accrual accounting. Analysts decompose revenue growth, gross margin, operating expenses, operating margin, financing costs and taxes to understand the economics behind net income.",
          fr: "L’income statement repose sur l’accrual accounting. Les analystes décomposent croissance du revenu, gross margin, dépenses opérationnelles, operating margin, coûts de financement et impôts afin de comprendre les economics derrière le net income.",
        },
        Professional: {
          en: "Earnings analysis focuses on recurring versus non-recurring items, operating versus non-operating gains, stock-based compensation, impairment, restructuring and tax effects. The objective is not to ignore GAAP or IFRS earnings, but to understand their economic components and persistence.",
          fr: "L’analyse des bénéfices distingue éléments récurrents/non récurrents, gains opérationnels/non opérationnels, stock-based compensation, impairment, restructuring et effets fiscaux. L’objectif n’est pas d’ignorer les résultats GAAP ou IFRS, mais de comprendre leur composition économique et leur persistance.",
        },
      },
      formula: {
        label: { en: "Income statement flow", fr: "Flux simplifié du compte de résultat" },
        expression: "Revenue − COGS = Gross Profit   ·   Gross Profit − Operating Expenses = Operating Income",
        explanation: {
          en: "Interest, taxes and other items are then considered to arrive at net income under the reporting structure.",
          fr: "Intérêts, impôts et autres éléments sont ensuite pris en compte pour arriver au net income selon la structure de reporting.",
        },
        workedExample: {
          en: "Revenue $100 − COGS $60 = gross profit $40. Gross profit $40 − operating expenses $20 = operating income $20.",
          fr: "Revenu 100 $ − COGS 60 $ = gross profit 40 $. Gross profit 40 $ − dépenses opérationnelles 20 $ = operating income 20 $.",
        },
      },
      vocabulary: [
        {
          en: "COGS",
          fr: "coût des ventes / cost of goods sold",
          definition: {
            en: "Costs directly associated with goods or services recognized as sold under the accounting policy.",
            fr: "Coûts directement associés aux biens ou services comptabilisés comme vendus selon la politique comptable.",
          },
        },
        {
          en: "Operating income",
          fr: "résultat opérationnel / operating income",
          definition: {
            en: "Profit generated after operating costs before selected financing, tax and non-operating items.",
            fr: "Profit généré après coûts opérationnels avant certains éléments de financement, impôts et non opérationnels.",
          },
        },
      ],
    },
    {
      id: "cash-flow-statement",
      kicker: { en: "04 · THE CASH FLOW STATEMENT", fr: "04 · LE TABLEAU DES FLUX" },
      title: {
        en: "Cash from operations, investing and financing explains the change in cash",
        fr: "Operating, investing et financing expliquent la variation du cash",
      },
      coreFacts: [
        {
          en: "Operating cash flow relates primarily to the cash consequences of core operating activities under the applicable accounting framework.",
          fr: "Le cash flow from operations / CFO reflète principalement les conséquences cash de l’activité opérationnelle selon le référentiel applicable.",
        },
        {
          en: "Investing cash flow commonly includes purchases and sales of long-term assets and investments, though detailed classification can differ by framework.",
          fr: "Le cash flow from investing / CFI comprend couramment achats et ventes d’actifs long terme et investissements, même si certaines classifications diffèrent selon le référentiel.",
        },
        {
          en: "Financing cash flow commonly includes borrowing, debt repayment, share issuance, buybacks and distributions to capital providers, subject to reporting rules.",
          fr: "Le cash flow from financing / CFF comprend couramment emprunts, remboursements de dette, émissions d’actions, buybacks et distributions aux apporteurs de capitaux, sous réserve des règles de reporting.",
        },
        {
          en: "Beginning cash plus total net cash flow reconciles to ending cash, subject to items such as foreign-exchange effects where separately reported.",
          fr: "Le cash initial plus les flux nets de la période se rapproche du cash final, sous réserve d’éléments comme effets de change lorsqu’ils sont présentés séparément.",
        },
      ],
      explanation: {
        Beginner: {
          en: "A company may earn accounting profit but spend heavily on inventory or equipment. The cash flow statement shows whether operations generated cash, how much was invested and how financing filled any gap.",
          fr: "Une entreprise peut réaliser un bénéfice comptable tout en dépensant beaucoup pour des stocks ou de nouveaux équipements. Le cash flow statement montre si l’activité a généré du cash, combien a été investi et comment le financement a éventuellement comblé l’écart.",
        },
        Intermediate: {
          en: "Under the indirect method, operating cash flow typically starts from net income and adjusts for non-cash items plus changes in operating assets and liabilities. This creates the bridge from accrual earnings to cash.",
          fr: "Avec la méthode indirecte, le CFO part généralement du net income puis ajuste les éléments non cash et les variations d’actifs et passifs opérationnels. Cela crée le pont entre accrual earnings et cash.",
        },
        Professional: {
          en: "Cash-flow analysis emphasizes recurring cash conversion, capital intensity, working-capital volatility and financing dependence. Classification differences across accounting regimes mean analysts often recast cash flows into standardized internal categories.",
          fr: "L’analyse des cash flows se concentre sur conversion récurrente en cash, intensité capitalistique, volatilité du working capital et dépendance au financement. Les différences de classification entre référentiels poussent souvent les analystes à retraiter les flux dans des catégories internes standardisées.",
        },
      },
      formula: {
        label: { en: "Cash reconciliation", fr: "Rapprochement du cash / Cash reconciliation" },
        expression: "Ending Cash ≈ Beginning Cash + CFO + CFI + CFF",
        explanation: {
          en: "Additional reconciling items such as currency effects can appear depending on the reporting format.",
          fr: "Des éléments de rapprochement supplémentaires comme effets de change peuvent apparaître selon le format de reporting.",
        },
        workedExample: {
          en: "Beginning cash $50 + CFO $30 + CFI −$20 + CFF +$10 = ending cash about $70.",
          fr: "Cash initial 50 $ + CFO 30 $ + CFI −20 $ + CFF +10 $ = cash final d’environ 70 $.",
        },
      },
      vocabulary: [
        {
          en: "CFO",
          fr: "flux de trésorerie opérationnel / cash flow from operations",
          definition: {
            en: "Cash flow associated primarily with operating activities under the applicable statement format.",
            fr: "Flux de trésorerie associé principalement aux activités opérationnelles selon le format comptable applicable.",
          },
        },
        {
          en: "Capex",
          fr: "dépenses d’investissement / capital expenditures",
          definition: {
            en: "Cash expenditures for long-lived assets that are capitalized under the accounting policy.",
            fr: "Dépenses cash consacrées à des actifs long terme capitalisés selon la politique comptable.",
          },
        },
      ],
    },
    {
      id: "linking-statements",
      kicker: { en: "05 · LINKING THE STATEMENTS", fr: "05 · RELIER LES TROIS ÉTATS" },
      title: {
        en: "Net income, retained earnings and cash connect the system",
        fr: "Net income, retained earnings et cash connectent le système",
      },
      coreFacts: [
        {
          en: "Net income flows into equity through retained earnings, adjusted for dividends and other equity movements.",
          fr: "Le net income alimente l’equity via retained earnings, ajusté notamment des dividendes et autres mouvements de capitaux propres.",
        },
        {
          en: "Net income is also a starting point for operating cash flow under the common indirect cash-flow method.",
          fr: "Le net income constitue également un point de départ du CFO avec la méthode indirecte couramment utilisée.",
        },
        {
          en: "Ending cash from the cash flow statement links to the cash balance on the ending balance sheet.",
          fr: "Le cash final du cash flow statement se retrouve dans le poste cash du bilan de clôture.",
        },
        {
          en: "Changes in working-capital accounts explain part of the difference between income-statement activity and operating cash flow.",
          fr: "Les variations des comptes de working capital expliquent une partie de l’écart entre activité de l’income statement et CFO.",
        },
      ],
      explanation: {
        Beginner: {
          en: "Suppose a company earns $20 of net income and pays no dividend. Retained earnings generally rise by $20. If $5 of that income came from depreciation, depreciation reduced accounting profit but did not itself use cash in the current period, so it is commonly added back in the indirect cash flow statement.",
          fr: "Supposons qu’une entreprise réalise 20 $ de net income et ne verse aucun dividende. Les retained earnings augmentent généralement de 20 $. Si 5 $ de ce résultat proviennent de depreciation, celle-ci a réduit le bénéfice comptable sans consommer directement de cash pendant la période ; elle est donc généralement ajoutée dans le CFO indirect.",
        },
        Intermediate: {
          en: "A linked model has mechanical integrity. Income-statement profit affects retained earnings, cash-flow adjustments reconcile earnings to cash, investing and financing activities move balance-sheet accounts, and the resulting ending cash closes the balance sheet.",
          fr: "Un modèle lié possède une cohérence mécanique. Le résultat de l’income statement affecte retained earnings, les ajustements du cash flow rapprochent bénéfice et cash, investing et financing déplacent les comptes du bilan, et le cash final ferme le bilan.",
        },
        Professional: {
          en: "Three-statement modeling is the core infrastructure of financial modeling. Circularities can arise from debt, interest, cash sweeps and taxes, so professional models require clear schedules and controlled assumptions rather than hard-coded balancing plugs.",
          fr: "La modélisation à trois états / three-statement modeling est l’infrastructure fondamentale du financial modeling. Des circularités peuvent apparaître via dette, intérêts, cash sweeps et impôts ; les modèles professionnels utilisent donc des schedules clairs et des hypothèses contrôlées plutôt que des plugs artificiels.",
        },
      },
      formula: {
        label: { en: "Retained earnings roll-forward", fr: "Variation des retained earnings" },
        expression: "Ending Retained Earnings = Beginning Retained Earnings + Net Income − Dividends",
        explanation: {
          en: "Other equity adjustments may also affect reported retained earnings depending on circumstances.",
          fr: "D’autres ajustements d’equity peuvent également affecter les retained earnings selon les circonstances.",
        },
        workedExample: {
          en: "Beginning retained earnings $100 + net income $20 − dividends $5 = ending retained earnings $115.",
          fr: "Retained earnings initiales 100 $ + net income 20 $ − dividendes 5 $ = retained earnings finales 115 $.",
        },
      },
      marketConnection: {
        en: "Interview questions frequently test whether a candidate can trace one transaction through the income statement, cash flow statement and balance sheet.",
        fr: "Les entretiens finance testent fréquemment la capacité à suivre une transaction à travers income statement, cash flow statement et balance sheet.",
      },
    },
    {
      id: "depreciation-capex",
      kicker: { en: "06 · DEPRECIATION & CAPEX", fr: "06 · DEPRECIATION & CAPEX" },
      title: {
        en: "Cash spending and accounting expense can happen at different times",
        fr: "La dépense cash et la charge comptable peuvent avoir lieu à des moments différents",
      },
      coreFacts: [
        {
          en: "Capex is cash spent to acquire or improve long-lived assets that meet capitalization criteria.",
          fr: "Le capex représente le cash dépensé pour acquérir ou améliorer des actifs long terme répondant aux critères de capitalisation.",
        },
        {
          en: "Depreciation allocates the cost of a tangible asset over its useful life under an accounting method; it is a non-cash expense in the period it is recognized.",
          fr: "La depreciation répartit le coût d’un actif tangible sur sa durée d’utilisation selon une méthode comptable ; il s’agit d’une charge non cash pendant la période où elle est comptabilisée.",
        },
        {
          en: "Capex usually appears as investing cash flow, while depreciation reduces income and is commonly added back in indirect operating cash flow.",
          fr: "Le capex apparaît généralement dans investing cash flow, tandis que la depreciation réduit le résultat et est couramment ajoutée dans le CFO indirect.",
        },
        {
          en: "Depreciation affects the carrying value of property, plant and equipment on the balance sheet.",
          fr: "La depreciation affecte la valeur comptable des immobilisations corporelles / property, plant and equipment au bilan.",
        },
      ],
      explanation: {
        Beginner: {
          en: "If a company pays $100 cash for a machine expected to be used for five years, the $100 cash outflow happens when the machine is purchased. But accounting does not necessarily expense all $100 immediately. With straight-line depreciation and no residual value, it may record $20 of depreciation expense each year for five years.",
          fr: "Si une entreprise paie 100 $ cash pour une machine utilisée pendant cinq ans, la sortie de cash de 100 $ a lieu lors de l’achat. Mais la comptabilité ne passe pas forcément les 100 $ en charge immédiatement. Avec une straight-line depreciation et aucune valeur résiduelle, elle peut comptabiliser 20 $ de depreciation par an pendant cinq ans.",
        },
        Intermediate: {
          en: "Capex creates or increases a balance-sheet asset, then depreciation transfers part of that asset's carrying value into expense over time. This timing difference is one reason net income and free cash flow differ.",
          fr: "Le capex crée ou augmente un actif au bilan, puis la depreciation transfère progressivement une partie de sa valeur comptable en charge. Ce décalage temporel explique en partie la différence entre net income et free cash flow.",
        },
        Professional: {
          en: "Analysts distinguish maintenance capex from growth capex economically, even though reporting may not provide a clean split. Depreciation methods, useful-life assumptions, impairments and asset disposals all affect reported earnings and invested-capital analysis.",
          fr: "Les analystes distinguent économiquement maintenance capex et growth capex même si le reporting ne fournit pas toujours une séparation claire. Méthodes de depreciation, durées d’utilité, impairments et cessions d’actifs influencent bénéfices publiés et analyse du capital investi.",
        },
      },
      formula: {
        label: { en: "Simple straight-line depreciation", fr: "Depreciation linéaire simple / Straight-line depreciation" },
        expression: "Annual Depreciation = (Asset Cost − Residual Value) ÷ Useful Life",
        explanation: {
          en: "Actual depreciation follows the company's accounting policy and asset assumptions.",
          fr: "La depreciation réelle suit la politique comptable et les hypothèses de l’entreprise sur l’actif.",
        },
        workedExample: {
          en: "Asset cost $100, residual value $0, useful life 5 years → annual depreciation = $20.",
          fr: "Coût de l’actif 100 $, valeur résiduelle 0 $, durée 5 ans → depreciation annuelle = 20 $.",
        },
      },
      vocabulary: [
        {
          en: "PP&E",
          fr: "immobilisations corporelles / property, plant & equipment",
          definition: {
            en: "Long-lived tangible operating assets such as buildings, equipment and machinery.",
            fr: "Actifs opérationnels tangibles long terme comme bâtiments, équipements et machines.",
          },
        },
        {
          en: "Impairment",
          fr: "dépréciation de valeur / impairment",
          definition: {
            en: "A reduction in carrying value when an asset no longer supports its recorded amount under the applicable accounting rules.",
            fr: "Réduction de la valeur comptable lorsqu’un actif ne justifie plus son montant inscrit selon les règles comptables applicables.",
          },
        },
      ],
    },
    {
      id: "working-capital",
      kicker: { en: "07 · WORKING CAPITAL", fr: "07 · WORKING CAPITAL" },
      title: {
        en: "Growth can consume cash before it creates profit",
        fr: "La croissance peut consommer du cash avant de créer du profit",
      },
      coreFacts: [
        {
          en: "Operating working capital commonly includes accounts receivable, inventory and accounts payable, though analyst definitions vary.",
          fr: "Le working capital opérationnel inclut couramment accounts receivable, inventory et accounts payable, même si les définitions d’analystes varient.",
        },
        {
          en: "An increase in accounts receivable means revenue may have been recognized before cash collection.",
          fr: "Une hausse des accounts receivable signifie qu’un revenu peut avoir été comptabilisé avant son encaissement.",
        },
        {
          en: "An increase in inventory generally uses cash before the related goods are sold.",
          fr: "Une hausse des stocks / inventory utilise généralement du cash avant la vente des produits correspondants.",
        },
        {
          en: "An increase in accounts payable can temporarily preserve cash because supplier payments are delayed relative to expense or inventory recognition.",
          fr: "Une hausse des accounts payable peut temporairement préserver du cash car les paiements fournisseurs sont retardés par rapport à la reconnaissance de la charge ou du stock.",
        },
      ],
      explanation: {
        Beginner: {
          en: "Suppose a company records a $100 sale but the customer will pay next month. Revenue can appear today while accounts receivable rises by $100. The company looks more profitable, but it has not yet received the cash.",
          fr: "Supposons qu’une entreprise comptabilise une vente de 100 $ mais que le client paiera le mois prochain. Le revenu peut apparaître aujourd’hui tandis que les accounts receivable augmentent de 100 $. L’entreprise semble plus rentable, mais elle n’a pas encore reçu le cash.",
        },
        Intermediate: {
          en: "Working-capital changes explain a major part of cash conversion. Fast growth can increase receivables and inventory faster than payables, producing strong earnings but weak operating cash flow.",
          fr: "Les variations de working capital expliquent une grande partie de la conversion en cash. Une croissance rapide peut faire augmenter receivables et inventory plus vite que payables, produisant de bons bénéfices mais un CFO faible.",
        },
        Professional: {
          en: "Analysts normalize working capital for seasonality, factoring, supplier-finance arrangements and one-off payment timing. DSO, DIO and DPO can reveal whether cash conversion is changing because of operating performance or financing behavior.",
          fr: "Les analystes normalisent le working capital pour saisonnalité, factoring, supplier finance et timing exceptionnel de paiements. DSO, DIO et DPO peuvent montrer si la conversion en cash change à cause de la performance opérationnelle ou d’un comportement de financement.",
        },
      },
      formula: {
        label: { en: "Simplified operating net working capital", fr: "Working capital opérationnel simplifié" },
        expression: "Operating NWC ≈ Accounts Receivable + Inventory − Accounts Payable",
        explanation: {
          en: "An increase in this simplified operating NWC is generally a use of cash, all else equal.",
          fr: "Une hausse de ce working capital simplifié représente généralement une utilisation de cash, toutes choses égales par ailleurs.",
        },
        workedExample: {
          en: "AR rises $10, inventory rises $5 and AP rises $3 → operating NWC increases $12, implying about a $12 cash use.",
          fr: "AR +10 $, inventory +5 $ et AP +3 $ → operating NWC augmente de 12 $, soit environ 12 $ d’utilisation de cash.",
        },
      },
      marketConnection: {
        en: "A company can beat earnings estimates and still disappoint investors if receivables or inventory rise sharply and cash conversion deteriorates.",
        fr: "Une entreprise peut dépasser les attentes de bénéfices et néanmoins décevoir si receivables ou inventory montent fortement et que la conversion en cash se détériore.",
      },
      vocabulary: [
        {
          en: "DSO",
          fr: "délai moyen de recouvrement / days sales outstanding",
          definition: {
            en: "A working-capital metric approximating how long receivables remain outstanding relative to sales.",
            fr: "Mesure approximant la durée pendant laquelle les créances clients restent en cours par rapport aux ventes.",
          },
        },
        {
          en: "Cash conversion",
          fr: "conversion en cash / cash conversion",
          definition: {
            en: "The extent to which reported earnings or operating activity translates into cash flow.",
            fr: "Degré auquel les bénéfices publiés ou l’activité opérationnelle se transforment en cash flow.",
          },
        },
      ],
    },
    {
      id: "accrual-accounting",
      kicker: { en: "08 · ACCRUAL ACCOUNTING", fr: "08 · ACCRUAL ACCOUNTING" },
      title: {
        en: "Accounting records economic activity before or after cash moves",
        fr: "La comptabilité enregistre l’activité économique avant ou après le mouvement du cash",
      },
      coreFacts: [
        {
          en: "Accrual accounting recognizes economic events according to accounting criteria rather than only when cash changes hands.",
          fr: "L’accrual accounting comptabilise les événements économiques selon des critères comptables plutôt qu’uniquement lorsque le cash change de mains.",
        },
        {
          en: "Unearned or deferred revenue can arise when cash is received before revenue recognition criteria are satisfied.",
          fr: "Un revenu différé / deferred revenue peut apparaître lorsque le cash est reçu avant que les critères de reconnaissance du revenu soient satisfaits.",
        },
        {
          en: "Accrued expenses can arise when an expense is recognized before the related cash payment.",
          fr: "Des charges à payer / accrued expenses peuvent apparaître lorsqu’une dépense est reconnue avant le paiement associé.",
        },
        {
          en: "Accruals improve period matching but create estimates and timing differences that analysts must understand.",
          fr: "Les accruals améliorent la représentation par période mais créent des estimations et différences de timing que les analystes doivent comprendre.",
        },
      ],
      explanation: {
        Beginner: {
          en: "If a customer prepays $120 for a 12-month service, the company may receive all $120 cash immediately but recognize revenue over time as the service is delivered. Cash receipt and revenue recognition are therefore different events.",
          fr: "Si un client paie 120 $ à l’avance pour un service de 12 mois, l’entreprise peut recevoir les 120 $ immédiatement mais reconnaître le revenu progressivement à mesure que le service est fourni. Encaissement et reconnaissance du revenu sont donc deux événements différents.",
        },
        Intermediate: {
          en: "Accrual accounting attempts to reflect economic performance in the period in which activity occurs. Receivables, payables, deferred revenue, prepaid expenses and accrual liabilities are balance-sheet accounts that bridge timing differences between economics and cash.",
          fr: "L’accrual accounting cherche à refléter la performance économique dans la période où l’activité a lieu. Receivables, payables, deferred revenue, prepaid expenses et accrued liabilities sont des comptes de bilan qui relient le timing économique au timing du cash.",
        },
        Professional: {
          en: "Accrual quality matters because management judgment can affect estimates such as reserves, useful lives, revenue timing and expected losses. Analysts compare accrual trends with cash flow, disclosures and operating reality to judge persistence and conservatism.",
          fr: "La qualité des accruals compte car le jugement du management influence des estimations comme provisions, durées d’utilité, timing de revenue et pertes attendues. Les analystes comparent tendances des accruals, cash flow, disclosures et réalité opérationnelle pour juger persistance et prudence.",
        },
      },
      example: {
        en: "A 12-month subscription prepaid for $120 may create $120 cash and a deferred-revenue liability at collection, then revenue can be recognized over the service period as the obligation is fulfilled.",
        fr: "Un abonnement de 12 mois payé 120 $ à l’avance peut créer 120 $ de cash et un passif de deferred revenue à l’encaissement, puis le revenu est reconnu pendant la période de service à mesure que l’obligation est satisfaite.",
      },
      vocabulary: [
        {
          en: "Deferred revenue",
          fr: "revenu différé / deferred revenue",
          definition: {
            en: "A liability commonly arising when consideration is received before the related revenue is recognized.",
            fr: "Passif apparaissant couramment lorsqu’un paiement est reçu avant reconnaissance du revenu associé.",
          },
        },
        {
          en: "Accrued expense",
          fr: "charge à payer / accrued expense",
          definition: {
            en: "An expense recognized before the associated cash payment has occurred.",
            fr: "Charge comptabilisée avant que le paiement cash correspondant n’ait eu lieu.",
          },
        },
      ],
    },
    {
      id: "earnings-quality",
      kicker: { en: "09 · EARNINGS QUALITY", fr: "09 · QUALITÉ DES BÉNÉFICES" },
      title: {
        en: "Investors care about how repeatable and cash-backed earnings really are",
        fr: "Les investisseurs veulent savoir si les bénéfices sont durables et réellement soutenus par le cash",
      },
      coreFacts: [
        {
          en: "High-quality earnings are generally more useful when they are recurring, economically supported and convert into cash over time.",
          fr: "Des bénéfices de qualité sont généralement plus utiles lorsqu’ils sont récurrents, soutenus économiquement et se convertissent en cash avec le temps.",
        },
        {
          en: "A large gap between net income and operating cash flow is not automatically bad, but it requires explanation.",
          fr: "Un écart important entre net income et CFO n’est pas automatiquement mauvais, mais il doit être expliqué.",
        },
        {
          en: "One-time gains, aggressive accruals, unusual working-capital movements or capitalization choices can affect reported earnings.",
          fr: "Gains exceptionnels, accruals agressifs, mouvements inhabituels de working capital ou choix de capitalisation peuvent affecter les bénéfices publiés.",
        },
        {
          en: "Financial-statement analysis combines ratios with footnotes, accounting policies and business context.",
          fr: "L’analyse des états financiers combine ratios, notes annexes / footnotes, politiques comptables et contexte économique.",
        },
      ],
      explanation: {
        Beginner: {
          en: "Two companies can report the same $100 of net income, but one may collect cash quickly while the other builds receivables and inventory. The accounting profit is identical, yet the cash quality is different.",
          fr: "Deux entreprises peuvent afficher le même net income de 100 $, mais l’une encaisse rapidement tandis que l’autre accumule receivables et inventory. Le bénéfice comptable est identique, mais la qualité de conversion en cash est différente.",
        },
        Intermediate: {
          en: "Earnings quality analysis reconciles profit with operating cash flow, checks working capital and non-cash adjustments, identifies recurring versus exceptional items and asks whether accounting choices are consistent with operating reality.",
          fr: "L’analyse de qualité des bénéfices rapproche profit et CFO, vérifie working capital et ajustements non cash, distingue récurrent et exceptionnel et demande si les choix comptables sont cohérents avec la réalité opérationnelle.",
        },
        Professional: {
          en: "Quality-of-earnings work is forensic. Analysts inspect revenue recognition, reserve releases, capitalized costs, stock compensation, supplier finance, acquisition accounting, tax effects and changes in estimates. The goal is to estimate sustainable economics rather than mechanically replace reported earnings.",
          fr: "L’analyse de quality of earnings est presque forensic. Les analystes examinent revenue recognition, reprises de provisions, coûts capitalisés, stock compensation, supplier finance, acquisition accounting, fiscalité et changements d’estimations. L’objectif est d’estimer les economics soutenables plutôt que de remplacer mécaniquement les résultats publiés.",
        },
      },
      formula: {
        label: { en: "Simple operating cash conversion", fr: "Conversion opérationnelle en cash simplifiée" },
        expression: "Cash Conversion Ratio = CFO ÷ Net Income",
        explanation: {
          en: "Interpret carefully: one period can be distorted by working capital, seasonality, taxes or non-recurring items.",
          fr: "À interpréter avec prudence : une période peut être déformée par working capital, saisonnalité, impôts ou éléments non récurrents.",
        },
        workedExample: {
          en: "CFO $120 ÷ net income $100 = 1.20× cash conversion.",
          fr: "CFO 120 $ ÷ net income 100 $ = 1,20× de cash conversion.",
        },
      },
      marketConnection: {
        en: "A strong earnings headline with weak cash conversion can trigger a negative share-price reaction if investors conclude the reported profit is less sustainable than expected.",
        fr: "Un headline de bénéfices solide accompagné d’une faible cash conversion peut provoquer une baisse de l’action si les investisseurs jugent le profit moins durable qu’attendu.",
      },
    },
  ],
  quiz: [
    {
      id: "q1",
      conceptKey: "three-statements-purpose",
      question: {
        en: "Which statement is a point-in-time snapshot?",
        fr: "Quel état financier est une photographie à une date donnée ?",
      },
      options: [
        { id: "a", label: { en: "Balance sheet", fr: "Bilan / Balance sheet" } },
        { id: "b", label: { en: "Income statement", fr: "Compte de résultat / Income statement" } },
        { id: "c", label: { en: "Cash flow statement", fr: "Tableau des flux / Cash flow statement" } },
        { id: "d", label: { en: "All are point-in-time snapshots", fr: "Les trois sont uniquement des photographies à une date" } },
      ],
      correctOption: "a",
      explanation: {
        en: "The balance sheet presents financial position at a specific date; the income and cash flow statements cover periods.",
        fr: "Le bilan présente la position financière à une date précise ; income statement et cash flow statement couvrent une période.",
      },
    },
    {
      id: "q2",
      conceptKey: "accounting-equation",
      question: {
        en: "A company has $1,000 of assets and $600 of liabilities. What is equity?",
        fr: "Une entreprise possède 1 000 $ d’actifs et 600 $ de passifs. Quelle est son equity ?",
      },
      options: [
        { id: "a", label: { en: "$400", fr: "400 $" } },
        { id: "b", label: { en: "$600", fr: "600 $" } },
        { id: "c", label: { en: "$1,000", fr: "1 000 $" } },
        { id: "d", label: { en: "$1,600", fr: "1 600 $" } },
      ],
      correctOption: "a",
      explanation: {
        en: "Equity = assets − liabilities = $400.",
        fr: "Equity = actifs − passifs = 400 $.",
      },
    },
    {
      id: "q3",
      conceptKey: "gross-profit",
      question: {
        en: "Revenue is $100 and COGS is $60. What is gross profit?",
        fr: "Le revenu est 100 $ et le COGS 60 $. Quel est le gross profit ?",
      },
      options: [
        { id: "a", label: { en: "$20", fr: "20 $" } },
        { id: "b", label: { en: "$40", fr: "40 $" } },
        { id: "c", label: { en: "$60", fr: "60 $" } },
        { id: "d", label: { en: "$160", fr: "160 $" } },
      ],
      correctOption: "b",
      explanation: {
        en: "$100 revenue − $60 COGS = $40 gross profit.",
        fr: "100 $ de revenu − 60 $ de COGS = 40 $ de gross profit.",
      },
    },
    {
      id: "q4",
      conceptKey: "cash-flow-classification",
      question: {
        en: "Under a common presentation, purchasing long-lived equipment for cash is primarily classified as:",
        fr: "Dans une présentation courante, l’achat cash d’un équipement long terme est principalement classé comme :",
      },
      options: [
        { id: "a", label: { en: "Operating cash flow", fr: "Operating cash flow" } },
        { id: "b", label: { en: "Investing cash flow", fr: "Investing cash flow" } },
        { id: "c", label: { en: "Financing cash flow", fr: "Financing cash flow" } },
        { id: "d", label: { en: "Revenue", fr: "Revenue" } },
      ],
      correctOption: "b",
      explanation: {
        en: "Purchases of long-lived assets are commonly reported as investing cash outflows.",
        fr: "Les achats d’actifs long terme sont couramment présentés comme sorties de cash d’investissement / investing.",
      },
    },
    {
      id: "q5",
      conceptKey: "depreciation",
      question: {
        en: "A $100 asset has zero residual value and a 5-year straight-line useful life. Annual depreciation is:",
        fr: "Un actif de 100 $ a une valeur résiduelle nulle et une durée de vie linéaire de 5 ans. La depreciation annuelle vaut :",
      },
      options: [
        { id: "a", label: { en: "$5", fr: "5 $" } },
        { id: "b", label: { en: "$10", fr: "10 $" } },
        { id: "c", label: { en: "$20", fr: "20 $" } },
        { id: "d", label: { en: "$100", fr: "100 $" } },
      ],
      correctOption: "c",
      explanation: {
        en: "($100−$0) ÷ 5 = $20 per year.",
        fr: "(100−0) ÷ 5 = 20 $ par an.",
      },
    },
    {
      id: "q6",
      conceptKey: "working-capital-cash",
      question: {
        en: "Accounts receivable rises $10, inventory rises $5 and accounts payable rises $3. What is the approximate increase in simplified operating NWC?",
        fr: "Accounts receivable augmente de 10 $, inventory de 5 $ et accounts payable de 3 $. De combien augmente approximativement l’operating NWC simplifié ?",
      },
      options: [
        { id: "a", label: { en: "$2", fr: "2 $" } },
        { id: "b", label: { en: "$8", fr: "8 $" } },
        { id: "c", label: { en: "$12", fr: "12 $" } },
        { id: "d", label: { en: "$18", fr: "18 $" } },
      ],
      correctOption: "c",
      explanation: {
        en: "+$10 AR +$5 inventory −$3 AP = +$12 operating NWC.",
        fr: "+10 $ AR +5 $ inventory −3 $ AP = +12 $ d’operating NWC.",
      },
    },
    {
      id: "q7",
      conceptKey: "deferred-revenue",
      question: {
        en: "A customer prepays cash before the company has delivered the service. Before revenue recognition, this commonly creates:",
        fr: "Un client paie à l’avance avant que le service soit fourni. Avant reconnaissance du revenu, cela crée couramment :",
      },
      options: [
        { id: "a", label: { en: "Deferred revenue liability", fr: "Un passif de deferred revenue" } },
        { id: "b", label: { en: "Accounts receivable", fr: "Des accounts receivable" } },
        { id: "c", label: { en: "Immediate depreciation expense", fr: "Une depreciation immédiate" } },
        { id: "d", label: { en: "No balance-sheet effect", fr: "Aucun effet au bilan" } },
      ],
      correctOption: "a",
      explanation: {
        en: "Cash is received before the performance obligation is fully satisfied, so a liability can be recognized until revenue criteria are met.",
        fr: "Le cash est reçu avant satisfaction complète de l’obligation de performance ; un passif peut donc être comptabilisé jusqu’à reconnaissance du revenu.",
      },
    },
    {
      id: "q8",
      conceptKey: "cash-conversion",
      question: {
        en: "CFO is $120 and net income is $100. What is the simple cash conversion ratio?",
        fr: "Le CFO vaut 120 $ et le net income 100 $. Quel est le cash conversion ratio simple ?",
      },
      options: [
        { id: "a", label: { en: "0.20×", fr: "0,20×" } },
        { id: "b", label: { en: "0.83×", fr: "0,83×" } },
        { id: "c", label: { en: "1.00×", fr: "1,00×" } },
        { id: "d", label: { en: "1.20×", fr: "1,20×" } },
      ],
      correctOption: "d",
      explanation: {
        en: "$120 ÷ $100 = 1.20×.",
        fr: "120 $ ÷ 100 $ = 1,20×.",
      },
    },
  ],
  interviewPrompt: {
    question: {
      en: "Walk me through how a $10 increase in depreciation affects the three financial statements, assuming a 25% tax rate and no other changes.",
      fr: "Explique l’effet d’une hausse de 10 $ de depreciation sur les trois états financiers, en supposant un taux d’impôt de 25 % et aucun autre changement.",
    },
    framework: [
      {
        en: "Income statement: depreciation expense rises $10, pre-tax income falls $10 and taxes fall by $2.50, so net income falls $7.50.",
        fr: "Income statement : depreciation +10 $, pre-tax income −10 $, impôts −2,50 $, donc net income −7,50 $.",
      },
      {
        en: "Cash flow statement: start with net income down $7.50, add back the $10 non-cash depreciation, so operating cash flow rises $2.50 before other changes.",
        fr: "Cash flow statement : partir du net income −7,50 $, ajouter les 10 $ de depreciation non cash ; le CFO augmente donc de 2,50 $ avant autres changements.",
      },
      {
        en: "Balance sheet cash rises $2.50, net PP&E falls $10, so total assets fall $7.50.",
        fr: "Balance sheet : cash +2,50 $, net PP&E −10 $, donc total assets −7,50 $.",
      },
      {
        en: "Equity falls $7.50 through lower retained earnings, so the balance sheet still balances.",
        fr: "L’equity baisse de 7,50 $ via retained earnings plus faibles ; le bilan reste donc équilibré.",
      },
      {
        en: "Mention that this simplified interview bridge ignores deferred taxes and other complications unless asked.",
        fr: "Préciser que ce bridge simplifié d’entretien ignore deferred taxes et autres complications sauf si la question les introduit.",
      },
    ],
    sample: {
      en: "A $10 increase in depreciation reduces operating income and pre-tax income by $10. At a 25% tax rate, taxes fall by $2.50, so net income falls by $7.50. On the cash flow statement, I start with net income down $7.50 and add back the $10 of depreciation because it is non-cash, so cash from operations increases by $2.50, assuming no other changes. On the balance sheet, cash is up $2.50 and net PP&E is down $10, so total assets are down $7.50. Retained earnings, and therefore equity, are down $7.50 through lower net income, so the balance sheet balances. That is the simplified interview version before deferred-tax or other complications.",
      fr: "Une hausse de 10 $ de depreciation réduit operating income et pre-tax income de 10 $. Avec un taux d’impôt de 25 %, les impôts diminuent de 2,50 $, donc le net income baisse de 7,50 $. Dans le cash flow statement, je pars du net income en baisse de 7,50 $ et j’ajoute les 10 $ de depreciation car c’est une charge non cash ; le CFO augmente donc de 2,50 $, en supposant aucun autre changement. Au bilan, le cash augmente de 2,50 $ et le net PP&E diminue de 10 $, donc les actifs totaux baissent de 7,50 $. Les retained earnings, et donc l’equity, baissent de 7,50 $ via le net income plus faible ; le bilan reste équilibré. C’est la version simplifiée d’entretien avant deferred taxes ou autres complications.",
    },
  },
};


export const statisticsProbabilityLesson: FinanceLesson = {
  slug: "year-1-statistics-probability",
  year: { en: "Year 1 · Foundations", fr: "Année 1 · Fondations" },
  domain: { en: "Portfolio & Risk", fr: "Portefeuille & risque / Portfolio & Risk" },
  title: {
    en: "Statistics & Probability",
    fr: "Statistiques & probabilités / Statistics & Probability",
  },
  subtitle: {
    en: "Build the quantitative language used throughout finance: descriptive statistics, distributions, z-scores, probability, conditional probability, Bayes, sampling and dependence between variables.",
    fr: "Construire le langage quantitatif utilisé dans toute la finance : statistiques descriptives, distributions, z-scores, probabilités, probabilités conditionnelles, Bayes, échantillonnage et dépendance entre variables.",
  },
  duration: { en: "95–120 min", fr: "95–120 min" },
  prerequisites: [
    {
      en: "Basic algebra, percentages and square roots",
      fr: "Algèbre, pourcentages et racines carrées de base",
    },
    {
      en: "Risk, Return & Diversification",
      fr: "Risque, rendement & diversification / Risk, Return & Diversification",
    },
  ],
  objectives: [
    {
      en: "Calculate and interpret mean, median, percentiles, variance and standard deviation.",
      fr: "Calculer et interpréter moyenne / mean, médiane / median, percentiles, variance et écart-type / standard deviation.",
    },
    {
      en: "Understand distributions, skewness, outliers and why averages can be misleading.",
      fr: "Comprendre distributions, asymétrie / skewness, outliers et pourquoi les moyennes peuvent être trompeuses.",
    },
    {
      en: "Calculate and interpret z-scores and use them to standardize observations.",
      fr: "Calculer et interpréter les z-scores et les utiliser pour standardiser des observations.",
    },
    {
      en: "Apply basic probability rules, conditional probability and Bayes' theorem.",
      fr: "Appliquer les règles de probabilité de base, les probabilités conditionnelles et le théorème de Bayes.",
    },
    {
      en: "Explain sampling, standard error and why larger samples usually reduce sampling uncertainty.",
      fr: "Expliquer échantillonnage / sampling, erreur standard / standard error et pourquoi des échantillons plus grands réduisent généralement l’incertitude d’échantillonnage.",
    },
    {
      en: "Distinguish covariance, correlation and causation.",
      fr: "Distinguer covariance, corrélation / correlation et causalité / causation.",
    },
  ],
  overviewFlow: {
    title: {
      en: "From raw data to a financial conclusion",
      fr: "Des données brutes à une conclusion financière",
    },
    steps: [
      {
        title: { en: "Describe", fr: "Décrire" },
        detail: { en: "Mean · median · dispersion", fr: "Moyenne · médiane · dispersion" },
      },
      {
        title: { en: "Standardize", fr: "Standardiser" },
        detail: { en: "Percentiles · z-scores · distributions", fr: "Percentiles · z-scores · distributions" },
      },
      {
        title: { en: "Infer", fr: "Inférer" },
        detail: { en: "Probability · sampling · Bayes", fr: "Probabilité · échantillonnage · Bayes" },
      },
      {
        title: { en: "Relate", fr: "Relier" },
        detail: { en: "Covariance · correlation · finance decisions", fr: "Covariance · corrélation · décisions financières" },
      },
    ],
  },
  sections: [
    {
      id: "center",
      kicker: { en: "01 · CENTER OF A DISTRIBUTION", fr: "01 · CENTRE D’UNE DISTRIBUTION" },
      title: {
        en: "Mean and median summarize different notions of a typical value",
        fr: "Moyenne et médiane résument différentes notions d’une valeur typique",
      },
      coreFacts: [
        {
          en: "The arithmetic mean is the sum of observations divided by the number of observations.",
          fr: "La moyenne arithmétique / arithmetic mean est la somme des observations divisée par leur nombre.",
        },
        {
          en: "The median is the middle observation after sorting the data, or the average of the two middle observations for an even sample size.",
          fr: "La médiane / median est l’observation centrale après tri, ou la moyenne des deux observations centrales lorsque l’échantillon contient un nombre pair de valeurs.",
        },
        {
          en: "The mean is sensitive to extreme observations; the median is more robust to outliers.",
          fr: "La moyenne est sensible aux observations extrêmes / outliers ; la médiane y est plus robuste.",
        },
        {
          en: "In skewed financial data, mean and median can tell very different stories.",
          fr: "Dans des données financières asymétriques / skewed, moyenne et médiane peuvent raconter des histoires très différentes.",
        },
      ],
      explanation: {
        Beginner: {
          en: "Suppose five returns are 2%, 3%, 4%, 5% and 26%. The mean is 8%, but four of the five observations are below 8%. The median is 4%, which better describes the center of this skewed sample.",
          fr: "Supposons cinq rendements : 2 %, 3 %, 4 %, 5 % et 26 %. La moyenne vaut 8 %, mais quatre observations sur cinq sont inférieures à 8 %. La médiane vaut 4 % et décrit mieux le centre de cet échantillon asymétrique.",
        },
        Intermediate: {
          en: "The mean uses every observation and is the natural center for many models, but robustness matters when data contain outliers or heavy tails. Median and trimmed statistics can sometimes better represent a typical observation.",
          fr: "La moyenne utilise toutes les observations et constitue un centre naturel pour de nombreux modèles, mais la robustesse compte lorsque les données contiennent outliers ou queues épaisses / heavy tails. Médiane et statistiques tronquées peuvent parfois mieux représenter une observation typique.",
        },
        Professional: {
          en: "Choice of location statistic should reflect the data-generating process and objective. Mean is optimal under some symmetric loss functions, while median minimizes absolute deviation. For cross-sectional valuation multiples or wealth data, skewness often makes median-based summaries more informative.",
          fr: "Le choix de la statistique de position doit refléter le processus de génération des données et l’objectif. La moyenne est optimale sous certaines fonctions de perte symétriques, tandis que la médiane minimise la déviation absolue. Pour des multiples de valorisation ou données de patrimoine, l’asymétrie rend souvent les statistiques basées sur la médiane plus informatives.",
        },
      },
      formula: {
        label: { en: "Arithmetic mean", fr: "Moyenne arithmétique / Arithmetic mean" },
        expression: "Mean = Σxᵢ ÷ n",
        explanation: {
          en: "Add all observations and divide by the number of observations.",
          fr: "Additionner toutes les observations puis diviser par leur nombre.",
        },
        workedExample: {
          en: "(2 + 3 + 4 + 5 + 26) ÷ 5 = 8.",
          fr: "(2 + 3 + 4 + 5 + 26) ÷ 5 = 8.",
        },
      },
      comparison: {
        title: { en: "Mean vs median", fr: "Moyenne vs médiane" },
        headers: [
          { en: "Statistic", fr: "Statistique" },
          { en: "Strength", fr: "Avantage" },
          { en: "Weakness", fr: "Limite" },
        ],
        rows: [
          { cells: [
            { en: "Mean", fr: "Moyenne / mean" },
            { en: "Uses all observations", fr: "Utilise toutes les observations" },
            { en: "Sensitive to outliers", fr: "Sensible aux outliers" },
          ]},
          { cells: [
            { en: "Median", fr: "Médiane / median" },
            { en: "Robust to extremes", fr: "Robuste aux extrêmes" },
            { en: "Uses less magnitude information", fr: "Utilise moins l’amplitude des observations" },
          ]},
        ],
      },
      vocabulary: [
        {
          en: "Outlier",
          fr: "valeur aberrante / outlier",
          definition: {
            en: "An observation unusually far from the rest of the data.",
            fr: "Observation située inhabituellement loin du reste des données.",
          },
        },
        {
          en: "Skewness",
          fr: "asymétrie / skewness",
          definition: {
            en: "A measure or description of asymmetry in a distribution.",
            fr: "Mesure ou description de l’asymétrie d’une distribution.",
          },
        },
      ],
    },
    {
      id: "percentiles",
      kicker: { en: "02 · PERCENTILES & RANKS", fr: "02 · PERCENTILES & RANGS" },
      title: {
        en: "Percentiles tell you where an observation sits relative to others",
        fr: "Les percentiles montrent où se situe une observation par rapport aux autres",
      },
      coreFacts: [
        {
          en: "A percentile describes the relative position of an observation within a distribution.",
          fr: "Un percentile décrit la position relative d’une observation dans une distribution.",
        },
        {
          en: "The 50th percentile corresponds to the median under common conventions.",
          fr: "Le 50e percentile correspond à la médiane selon les conventions courantes.",
        },
        {
          en: "Quartiles divide ordered data into four regions and are often used with the interquartile range.",
          fr: "Les quartiles divisent les données ordonnées en quatre régions et sont souvent utilisés avec l’intervalle interquartile / interquartile range.",
        },
        {
          en: "Exact percentile interpolation rules can vary by software and statistical convention.",
          fr: "Les règles exactes d’interpolation des percentiles peuvent varier selon le logiciel et la convention statistique.",
        },
      ],
      explanation: {
        Beginner: {
          en: "If your score is at the 90th percentile, you are above roughly 90% of the reference observations under the chosen convention. It does not mean you scored 90% on the test.",
          fr: "Si ton score se situe au 90e percentile, il est supérieur à environ 90 % des observations de référence selon la convention utilisée. Cela ne signifie pas que tu as obtenu 90 % au test.",
        },
        Intermediate: {
          en: "Percentiles are useful when distributions are skewed because they do not assume normality. Finance uses ranks for valuation screens, factor portfolios, credit scoring and performance comparisons.",
          fr: "Les percentiles sont utiles lorsque les distributions sont asymétriques car ils ne supposent pas de normalité. En finance, les rangs servent aux screens de valorisation, portefeuilles factoriels, scores de crédit et comparaisons de performance.",
        },
        Professional: {
          en: "Rank transforms reduce sensitivity to scale and extremes but discard distance information. Cross-sectional strategies often use percentile or quantile buckets to stabilize noisy raw signals before portfolio construction.",
          fr: "Les transformations en rang réduisent la sensibilité à l’échelle et aux valeurs extrêmes mais perdent l’information de distance. Les stratégies cross-section utilisent souvent percentiles ou quantiles pour stabiliser des signaux bruts avant construction de portefeuille.",
        },
      },
      formula: {
        label: { en: "Interquartile range", fr: "Intervalle interquartile / Interquartile range" },
        expression: "IQR = Q3 − Q1",
        explanation: {
          en: "IQR captures the spread of the middle 50% of observations.",
          fr: "L’IQR mesure la dispersion des 50 % centraux des observations.",
        },
        workedExample: {
          en: "If Q1=10 and Q3=18, IQR=8.",
          fr: "Si Q1=10 et Q3=18, IQR=8.",
        },
      },
      vocabulary: [
        {
          en: "Quartile",
          fr: "quartile",
          definition: {
            en: "A cutoff dividing ordered observations into four groups under a chosen convention.",
            fr: "Seuil divisant les observations ordonnées en quatre groupes selon une convention choisie.",
          },
        },
        {
          en: "Interquartile range",
          fr: "intervalle interquartile / interquartile range",
          definition: {
            en: "The distance between the 75th and 25th percentiles.",
            fr: "Distance entre le 75e et le 25e percentile.",
          },
        },
      ],
    },
    {
      id: "dispersion",
      kicker: { en: "03 · VARIANCE & STANDARD DEVIATION", fr: "03 · VARIANCE & ÉCART-TYPE" },
      title: {
        en: "Two datasets can have the same mean and completely different risk",
        fr: "Deux jeux de données peuvent avoir la même moyenne et un risque totalement différent",
      },
      coreFacts: [
        {
          en: "Variance measures average squared distance from the mean under the chosen population or sample convention.",
          fr: "La variance mesure l’écart quadratique moyen à la moyenne selon la convention population ou échantillon choisie.",
        },
        {
          en: "Standard deviation is the square root of variance and is expressed in the same units as the observations.",
          fr: "L’écart-type / standard deviation est la racine carrée de la variance et s’exprime dans les mêmes unités que les observations.",
        },
        {
          en: "Sample variance commonly divides by n−1 rather than n to correct bias in estimating population variance under standard assumptions.",
          fr: "La variance d’échantillon / sample variance divise couramment par n−1 plutôt que n afin de corriger le biais d’estimation de la variance de population sous des hypothèses standard.",
        },
        {
          en: "Standard deviation measures dispersion, not guaranteed downside loss.",
          fr: "L’écart-type mesure la dispersion, pas une perte future garantie.",
        },
      ],
      explanation: {
        Beginner: {
          en: "Returns of 4%, 5%, 6% are much more stable than −10%, 5%, 20%, even though both samples have a mean of 5%. Standard deviation tells you how spread out the observations are around the mean.",
          fr: "Les rendements 4 %, 5 %, 6 % sont beaucoup plus stables que −10 %, 5 %, 20 %, même si les deux échantillons ont une moyenne de 5 %. L’écart-type décrit l’ampleur de la dispersion autour de la moyenne.",
        },
        Intermediate: {
          en: "Variance squares deviations so they do not cancel. Sample and population formulas differ because estimating an unknown population mean uses one degree of freedom.",
          fr: "La variance met les écarts au carré afin qu’ils ne s’annulent pas. Les formules échantillon et population diffèrent car l’estimation d’une moyenne de population inconnue consomme un degré de liberté.",
        },
        Professional: {
          en: "Variance is a second-moment risk measure and can be unstable in heavy-tailed financial data. Real-world risk estimation often uses rolling windows, robust estimators, shrinkage or volatility models rather than one static sample estimate.",
          fr: "La variance est une mesure de risque de second moment et peut être instable avec des données financières à queues épaisses. L’estimation réelle du risque utilise souvent fenêtres glissantes, estimateurs robustes, shrinkage ou modèles de volatilité plutôt qu’une seule estimation statique.",
        },
      },
      formula: {
        label: { en: "Sample variance", fr: "Variance d’échantillon / Sample variance" },
        expression: "s² = Σ(xᵢ − x̄)² ÷ (n − 1)   ·   s = √s²",
        explanation: {
          en: "Use the sample convention when estimating variance from a sample under standard assumptions.",
          fr: "Utiliser la convention d’échantillon lorsqu’on estime une variance à partir d’un échantillon sous des hypothèses standard.",
        },
        workedExample: {
          en: "For 4,5,6: mean=5; squared deviations=1,0,1; sample variance=2/2=1; sample standard deviation=1.",
          fr: "Pour 4,5,6 : moyenne=5 ; écarts au carré=1,0,1 ; variance d’échantillon=2/2=1 ; écart-type=1.",
        },
      },
      vocabulary: [
        {
          en: "Degree of freedom",
          fr: "degré de liberté / degree of freedom",
          definition: {
            en: "The number of independent pieces of information available after estimating constraints such as the sample mean.",
            fr: "Nombre d’informations indépendantes restantes après estimation de contraintes comme la moyenne d’échantillon.",
          },
        },
        {
          en: "Dispersion",
          fr: "dispersion",
          definition: {
            en: "The extent to which observations are spread around a central value.",
            fr: "Amplitude avec laquelle les observations sont réparties autour d’une valeur centrale.",
          },
        },
      ],
    },
    {
      id: "distributions-zscores",
      kicker: { en: "04 · DISTRIBUTIONS & Z-SCORES", fr: "04 · DISTRIBUTIONS & Z-SCORES" },
      title: {
        en: "Standardization lets you compare observations across different scales",
        fr: "La standardisation permet de comparer des observations sur différentes échelles",
      },
      coreFacts: [
        {
          en: "A probability distribution describes possible values and how probability is allocated across them.",
          fr: "Une distribution de probabilité décrit les valeurs possibles et la manière dont la probabilité est répartie entre elles.",
        },
        {
          en: "A z-score measures how many standard deviations an observation lies above or below the mean.",
          fr: "Un z-score mesure le nombre d’écarts-types séparant une observation de la moyenne.",
        },
        {
          en: "A positive z-score lies above the mean and a negative z-score below it.",
          fr: "Un z-score positif se situe au-dessus de la moyenne et un z-score négatif en dessous.",
        },
        {
          en: "Normal-distribution rules are useful approximations but financial returns often exhibit skewness, fat tails and volatility clustering.",
          fr: "Les règles de distribution normale sont des approximations utiles, mais les rendements financiers présentent souvent skewness, fat tails et clustering de volatilité.",
        },
      ],
      explanation: {
        Beginner: {
          en: "If the mean exam score is 70 and standard deviation is 10, a score of 90 has a z-score of +2. It is two standard deviations above the mean. A score of 60 has a z-score of −1.",
          fr: "Si la moyenne d’un examen est 70 et l’écart-type 10, un score de 90 a un z-score de +2 : il est à deux écarts-types au-dessus de la moyenne. Un score de 60 a un z-score de −1.",
        },
        Intermediate: {
          en: "Z-scores put variables on a common scale centered at zero with unit standard deviation. Under a normal distribution, about 68% of observations lie within one standard deviation and about 95% within two, but this approximation depends on normality.",
          fr: "Les z-scores placent les variables sur une échelle commune centrée à zéro avec écart-type unitaire. Sous distribution normale, environ 68 % des observations se situent à ±1 écart-type et environ 95 % à ±2, mais cette approximation dépend de la normalité.",
        },
        Professional: {
          en: "Standardization is common in factor models and signal construction, but extreme z-scores in finance should not be interpreted with naive Gaussian tail probabilities when the empirical distribution is heavy-tailed.",
          fr: "La standardisation est courante dans les factor models et la construction de signaux, mais les z-scores extrêmes en finance ne doivent pas être interprétés avec des probabilités de queue gaussiennes naïves lorsque la distribution empirique est à queues épaisses.",
        },
      },
      formula: {
        label: { en: "Z-score", fr: "Z-score" },
        expression: "z = (x − μ) ÷ σ",
        explanation: {
          en: "x is the observation, μ the reference mean and σ the reference standard deviation.",
          fr: "x est l’observation, μ la moyenne de référence et σ l’écart-type de référence.",
        },
        workedExample: {
          en: "(90 − 70) ÷ 10 = +2.0.",
          fr: "(90 − 70) ÷ 10 = +2,0.",
        },
      },
      marketConnection: {
        en: "Traders and analysts often use standardized moves to compare an unusually large move in one asset with moves in another asset that has a different natural volatility.",
        fr: "Les traders et analystes utilisent souvent des mouvements standardisés pour comparer un mouvement inhabituel d’un actif avec celui d’un autre actif ayant une volatilité naturelle différente.",
      },
      vocabulary: [
        {
          en: "Normal distribution",
          fr: "distribution normale / normal distribution",
          definition: {
            en: "A symmetric bell-shaped probability distribution defined by its mean and variance.",
            fr: "Distribution de probabilité symétrique en cloche définie par sa moyenne et sa variance.",
          },
        },
        {
          en: "Fat tails",
          fr: "queues épaisses / fat tails",
          definition: {
            en: "More probability in extreme outcomes than a reference thin-tailed distribution such as the normal.",
            fr: "Probabilité plus élevée d’événements extrêmes qu’avec une distribution de référence à queues fines comme la normale.",
          },
        },
      ],
    },
    {
      id: "probability-rules",
      kicker: { en: "05 · BASIC PROBABILITY", fr: "05 · PROBABILITÉS DE BASE" },
      title: {
        en: "Probability rules prevent intuitive mistakes",
        fr: "Les règles de probabilité évitent de nombreuses erreurs intuitives",
      },
      coreFacts: [
        {
          en: "Probabilities range from 0 to 1 and sum to 1 across mutually exclusive exhaustive outcomes.",
          fr: "Les probabilités vont de 0 à 1 et totalisent 1 pour des événements mutuellement exclusifs couvrant tous les résultats possibles.",
        },
        {
          en: "The complement rule states P(not A)=1−P(A).",
          fr: "La règle du complément indique P(non A)=1−P(A).",
        },
        {
          en: "For independent events, the probability of both occurring equals the product of their probabilities.",
          fr: "Pour des événements indépendants, la probabilité que les deux se produisent est le produit de leurs probabilités.",
        },
        {
          en: "Mutually exclusive and independent are different concepts.",
          fr: "Mutuellement exclusif / mutually exclusive et indépendant / independent sont deux concepts différents.",
        },
      ],
      explanation: {
        Beginner: {
          en: "If there is a 30% chance of loss, there is a 70% chance of no loss under a two-outcome setup. If two independent events each have 50% probability, the chance both happen is 25%.",
          fr: "S’il existe 30 % de probabilité de perte, alors il existe 70 % de probabilité de non-perte dans un cadre à deux résultats. Si deux événements indépendants ont chacun 50 % de probabilité, la probabilité que les deux se produisent vaut 25 %.",
        },
        Intermediate: {
          en: "Probability errors often come from confusing disjoint events with independent events. If two events are mutually exclusive and each has positive probability, observing one makes the other impossible, so they are not independent.",
          fr: "Les erreurs de probabilité viennent souvent de la confusion entre événements disjoints et indépendants. Si deux événements sont mutuellement exclusifs et ont chacun une probabilité positive, observer l’un rend l’autre impossible ; ils ne sont donc pas indépendants.",
        },
        Professional: {
          en: "Financial risk systems aggregate events under dependence structures that are rarely truly independent. Assuming independence can dramatically understate joint tail risk when common factors drive multiple positions.",
          fr: "Les systèmes de risque financier agrègent des événements dont les dépendances sont rarement réellement indépendantes. Supposer l’indépendance peut fortement sous-estimer le joint tail risk lorsque plusieurs positions dépendent de facteurs communs.",
        },
      },
      formula: {
        label: { en: "Independent joint probability", fr: "Probabilité conjointe pour événements indépendants" },
        expression: "If A and B are independent: P(A ∩ B) = P(A) × P(B)",
        explanation: {
          en: "Only use the multiplication shortcut when independence is justified.",
          fr: "N’utiliser le raccourci multiplicatif que lorsque l’indépendance est justifiée.",
        },
        workedExample: {
          en: "Two independent 50% events: 0.50×0.50=0.25, or 25%.",
          fr: "Deux événements indépendants à 50 % : 0,50×0,50=0,25, soit 25 %.",
        },
      },
      vocabulary: [
        {
          en: "Independent events",
          fr: "événements indépendants / independent events",
          definition: {
            en: "Events where occurrence of one does not change the probability of the other under the model.",
            fr: "Événements pour lesquels la réalisation de l’un ne modifie pas la probabilité de l’autre dans le modèle.",
          },
        },
        {
          en: "Mutually exclusive",
          fr: "mutuellement exclusif / mutually exclusive",
          definition: {
            en: "Events that cannot occur at the same time.",
            fr: "Événements qui ne peuvent pas se produire simultanément.",
          },
        },
      ],
    },
    {
      id: "conditional-bayes",
      kicker: { en: "06 · CONDITIONAL PROBABILITY & BAYES", fr: "06 · PROBABILITÉ CONDITIONNELLE & BAYES" },
      title: {
        en: "New information should update probabilities",
        fr: "Une nouvelle information doit mettre à jour les probabilités",
      },
      coreFacts: [
        {
          en: "Conditional probability asks for the probability of one event given that another event has occurred.",
          fr: "La probabilité conditionnelle / conditional probability demande la probabilité d’un événement sachant qu’un autre s’est produit.",
        },
        {
          en: "Bayes' theorem reverses conditional probabilities using prior probabilities and evidence.",
          fr: "Le théorème de Bayes inverse les probabilités conditionnelles à l’aide des probabilités a priori / priors et de l’évidence observée.",
        },
        {
          en: "Base rates matter: a strong signal can still imply a modest posterior probability when the event is very rare.",
          fr: "Les taux de base / base rates comptent : même un signal fort peut produire une probabilité postérieure modeste lorsque l’événement est très rare.",
        },
        {
          en: "Bayesian thinking is useful whenever investors update beliefs after earnings, macro data, credit events or new company information.",
          fr: "Le raisonnement bayésien est utile chaque fois que les investisseurs mettent à jour leurs croyances après résultats, données macro, événements de crédit ou nouvelles informations d’entreprise.",
        },
      ],
      explanation: {
        Beginner: {
          en: "Suppose only 10% of firms are truly distressed. A warning signal appears in 80% of distressed firms but also in 20% of healthy firms. Seeing the warning does not mean there is an 80% chance the firm is distressed. You must combine the signal with the low base rate.",
          fr: "Supposons que seulement 10 % des entreprises soient réellement en difficulté. Un signal d’alerte apparaît chez 80 % des entreprises en difficulté mais aussi chez 20 % des entreprises saines. Voir le signal ne signifie pas qu’il existe 80 % de probabilité que l’entreprise soit en difficulté. Il faut combiner le signal avec le faible base rate.",
        },
        Intermediate: {
          en: "Bayes combines prior probability with likelihood. In the example, the posterior probability of distress after the warning is 0.10×0.80 divided by [0.10×0.80 + 0.90×0.20], which is about 30.8%.",
          fr: "Bayes combine la probabilité a priori avec la vraisemblance / likelihood. Dans l’exemple, la probabilité postérieure de difficulté après le signal vaut 0,10×0,80 divisé par [0,10×0,80 + 0,90×0,20], soit environ 30,8 %.",
        },
        Professional: {
          en: "Bayesian updating formalizes belief revision as evidence arrives. In practice, finance rarely knows exact priors and likelihoods, but the framework disciplines analysts to distinguish prior belief, signal reliability and posterior conviction.",
          fr: "La mise à jour bayésienne formalise la révision des croyances lorsque l’information arrive. En pratique, la finance connaît rarement exactement priors et likelihoods, mais le cadre force les analystes à distinguer croyance initiale, fiabilité du signal et conviction postérieure.",
        },
      },
      formula: {
        label: { en: "Bayes' theorem", fr: "Théorème de Bayes" },
        expression: "P(A|B) = P(B|A) × P(A) ÷ P(B)",
        explanation: {
          en: "P(A) is the prior, P(B|A) the likelihood and P(A|B) the posterior probability.",
          fr: "P(A) est le prior, P(B|A) la likelihood et P(A|B) la probabilité postérieure.",
        },
        workedExample: {
          en: "0.80×0.10 ÷ [0.80×0.10 + 0.20×0.90] ≈ 30.8%.",
          fr: "0,80×0,10 ÷ [0,80×0,10 + 0,20×0,90] ≈ 30,8 %.",
        },
      },
      marketConnection: {
        en: "An earnings miss should not reset a company thesis from 100% bullish to 100% bearish; analysts should update conviction according to how informative the miss is relative to what they already believed.",
        fr: "Un earnings miss ne doit pas transformer automatiquement une thèse 100 % bullish en 100 % bearish ; l’analyste doit mettre à jour sa conviction selon l’information réellement contenue dans la publication relativement à ses croyances initiales.",
      },
      vocabulary: [
        {
          en: "Prior",
          fr: "probabilité a priori / prior",
          definition: {
            en: "A probability assessment before incorporating new evidence.",
            fr: "Évaluation probabiliste avant incorporation d’une nouvelle information.",
          },
        },
        {
          en: "Posterior",
          fr: "probabilité postérieure / posterior",
          definition: {
            en: "The updated probability after incorporating evidence.",
            fr: "Probabilité mise à jour après incorporation de l’évidence.",
          },
        },
      ],
    },
    {
      id: "sampling",
      kicker: { en: "07 · SAMPLING & STANDARD ERROR", fr: "07 · ÉCHANTILLONNAGE & ERREUR STANDARD" },
      title: {
        en: "A sample estimate is noisy — and sample size matters",
        fr: "Une estimation d’échantillon est bruitée — et la taille de l’échantillon compte",
      },
      coreFacts: [
        {
          en: "A sample is a subset used to learn about a broader population.",
          fr: "Un échantillon / sample est un sous-ensemble utilisé pour apprendre quelque chose sur une population plus large.",
        },
        {
          en: "Sampling error is the difference between a sample statistic and the population quantity it estimates due to random sampling variation.",
          fr: "L’erreur d’échantillonnage / sampling error est l’écart entre une statistique d’échantillon et la quantité de population estimée, dû à la variation aléatoire d’échantillonnage.",
        },
        {
          en: "The standard error of the sample mean decreases with the square root of sample size under standard independent-sampling assumptions.",
          fr: "L’erreur standard de la moyenne diminue avec la racine carrée de la taille de l’échantillon sous des hypothèses standard d’échantillonnage indépendant.",
        },
        {
          en: "A larger sample reduces random sampling uncertainty but does not automatically fix biased data or poor measurement.",
          fr: "Un échantillon plus grand réduit l’incertitude aléatoire mais ne corrige pas automatiquement un biais de sélection ou une mauvaise mesure.",
        },
      ],
      explanation: {
        Beginner: {
          en: "If you estimate average customer spending from only 4 customers, one unusual customer can move the result a lot. With 400 representative customers, the average is usually more stable. But 400 badly selected customers can still give a biased answer.",
          fr: "Si tu estimes la dépense moyenne à partir de seulement 4 clients, un client inhabituel peut beaucoup déplacer le résultat. Avec 400 clients représentatifs, la moyenne est généralement plus stable. Mais 400 clients mal sélectionnés peuvent toujours donner une estimation biaisée.",
        },
        Intermediate: {
          en: "For an independent sample, standard error of the mean is approximately sample standard deviation divided by square root of n. Quadrupling sample size roughly halves the standard error.",
          fr: "Pour un échantillon indépendant, l’erreur standard de la moyenne est approximativement égale à l’écart-type d’échantillon divisé par racine de n. Multiplier la taille par quatre divise approximativement l’erreur standard par deux.",
        },
        Professional: {
          en: "Financial samples often violate simple iid assumptions through autocorrelation, heteroskedasticity and regime shifts. Naive standard errors can then overstate precision, motivating robust, clustered or time-series-aware inference.",
          fr: "Les échantillons financiers violent souvent les hypothèses iid simples via autocorrélation, hétéroscédasticité et changements de régime. Les erreurs standards naïves peuvent alors surestimer la précision, d’où l’usage d’inférences robustes, clusterisées ou adaptées aux séries temporelles.",
        },
      },
      formula: {
        label: { en: "Standard error of the mean", fr: "Erreur standard de la moyenne / Standard error" },
        expression: "SE(x̄) ≈ s ÷ √n",
        explanation: {
          en: "s is sample standard deviation and n sample size under the standard approximation.",
          fr: "s est l’écart-type de l’échantillon et n sa taille dans l’approximation standard.",
        },
        workedExample: {
          en: "If s=20 and n=100, SE≈20/10=2.",
          fr: "Si s=20 et n=100, SE≈20/10=2.",
        },
      },
      vocabulary: [
        {
          en: "Population",
          fr: "population",
          definition: {
            en: "The full set of observations or units the analysis aims to understand.",
            fr: "Ensemble complet des observations ou unités que l’analyse cherche à comprendre.",
          },
        },
        {
          en: "Sampling bias",
          fr: "biais d’échantillonnage / sampling bias",
          definition: {
            en: "Systematic distortion caused by a sample that is not representative of the target population.",
            fr: "Distorsion systématique causée par un échantillon non représentatif de la population cible.",
          },
        },
      ],
    },
    {
      id: "confidence",
      kicker: { en: "08 · CONFIDENCE & UNCERTAINTY", fr: "08 · CONFIANCE & INCERTITUDE" },
      title: {
        en: "An estimate should come with uncertainty, not false precision",
        fr: "Une estimation doit être accompagnée d’incertitude, pas d’une fausse précision",
      },
      coreFacts: [
        {
          en: "A confidence interval is a range produced by a procedure designed to contain the true parameter at a stated long-run frequency under assumptions.",
          fr: "Un intervalle de confiance / confidence interval est une plage produite par une procédure conçue pour contenir le vrai paramètre avec une fréquence donnée à long terme sous certaines hypothèses.",
        },
        {
          en: "A wider confidence interval reflects less precision; a narrower interval reflects more precision under the same framework.",
          fr: "Un intervalle plus large reflète moins de précision ; un intervalle plus étroit davantage de précision dans le même cadre.",
        },
        {
          en: "Confidence level and interval width trade off: higher confidence generally requires a wider interval, all else equal.",
          fr: "Niveau de confiance et largeur de l’intervalle impliquent un compromis : un niveau plus élevé exige généralement un intervalle plus large, toutes choses égales par ailleurs.",
        },
        {
          en: "Statistical significance is not the same as economic significance.",
          fr: "La significativité statistique / statistical significance n’est pas la même chose que la significativité économique / economic significance.",
        },
      ],
      explanation: {
        Beginner: {
          en: "If an estimated average is 10 with a rough 95% interval from 8 to 12, the result is not saying the true value is definitely inside that one interval with 95% probability under frequentist interpretation. It means the method would capture the true value about 95% of the time over repeated samples under the assumptions.",
          fr: "Si une moyenne estimée vaut 10 avec un intervalle à 95 % de 8 à 12, l’interprétation fréquentiste ne dit pas que le vrai nombre a 95 % de probabilité d’être dans cet intervalle particulier. Elle dit que la procédure couvrirait la vraie valeur environ 95 % du temps sur des échantillons répétés sous les hypothèses.",
        },
        Intermediate: {
          en: "Approximate normal confidence intervals use estimate plus or minus a critical value times standard error. More data reduce standard error, while higher confidence increases the critical value.",
          fr: "Les intervalles approximativement normaux utilisent estimation plus ou moins valeur critique multipliée par erreur standard. Davantage de données réduisent l’erreur standard, tandis qu’un niveau de confiance plus élevé augmente la valeur critique.",
        },
        Professional: {
          en: "Inference quality depends on model assumptions, estimator properties and data dependence. In finance, multiple testing, data mining and non-stationarity can make apparently precise confidence intervals misleading.",
          fr: "La qualité de l’inférence dépend des hypothèses du modèle, des propriétés de l’estimateur et de la dépendance des données. En finance, multiple testing, data mining et non-stationnarité peuvent rendre trompeurs des intervalles apparemment précis.",
        },
      },
      formula: {
        label: { en: "Approximate 95% confidence interval", fr: "Intervalle de confiance approximatif à 95 %" },
        expression: "Estimate ± 1.96 × Standard Error",
        explanation: {
          en: "This common approximation relies on conditions supporting an approximately normal sampling distribution.",
          fr: "Cette approximation courante repose sur des conditions permettant une distribution d’échantillonnage approximativement normale.",
        },
        workedExample: {
          en: "Estimate 10, SE 1 → approximate 95% interval = 10 ± 1.96 = [8.04, 11.96].",
          fr: "Estimation 10, SE 1 → intervalle approximatif à 95 % = 10 ± 1,96 = [8,04 ; 11,96].",
        },
      },
      marketConnection: {
        en: "A strategy backtest with a tiny apparent edge but huge uncertainty should not be treated as equally credible to one supported by a large, robust sample.",
        fr: "Un backtest avec un très petit edge apparent mais une énorme incertitude ne doit pas être traité comme aussi crédible qu’un résultat soutenu par un échantillon large et robuste.",
      },
    },
    {
      id: "covariance-correlation-causation",
      kicker: { en: "09 · DEPENDENCE & CAUSATION", fr: "09 · DÉPENDANCE & CAUSALITÉ" },
      title: {
        en: "Correlation measures co-movement; it does not prove cause",
        fr: "La corrélation mesure le co-mouvement ; elle ne prouve pas la causalité",
      },
      coreFacts: [
        {
          en: "Covariance measures joint variation but depends on the scale of the variables.",
          fr: "La covariance mesure la variation conjointe mais dépend de l’échelle des variables.",
        },
        {
          en: "Correlation standardizes covariance between −1 and +1.",
          fr: "La corrélation standardise la covariance entre −1 et +1.",
        },
        {
          en: "Correlation does not establish that one variable causes the other.",
          fr: "Une corrélation n’établit pas qu’une variable cause l’autre.",
        },
        {
          en: "A hidden common factor can create correlation between two variables even when neither causes the other.",
          fr: "Un facteur commun caché peut créer une corrélation entre deux variables même si aucune ne cause l’autre.",
        },
      ],
      explanation: {
        Beginner: {
          en: "Ice-cream sales and sunburns may rise together in summer. That does not mean ice cream causes sunburn. Hot weather affects both. Finance has the same problem: two assets can move together because both react to interest rates.",
          fr: "Les ventes de glaces et les coups de soleil peuvent augmenter ensemble en été. Cela ne signifie pas que les glaces causent les coups de soleil. La chaleur influence les deux. En finance, deux actifs peuvent bouger ensemble parce qu’ils réagissent tous deux aux taux d’intérêt.",
        },
        Intermediate: {
          en: "Correlation is useful for portfolio construction and risk analysis, but causal interpretation requires stronger identification. Reverse causality, omitted variables and regime dependence can all create misleading relationships.",
          fr: "La corrélation est utile pour la construction de portefeuille et l’analyse de risque, mais une interprétation causale exige une identification plus forte. Causalité inverse, variables omises et dépendance au régime peuvent créer des relations trompeuses.",
        },
        Professional: {
          en: "Finance frequently observes endogenous systems where prices, flows and expectations influence each other. Causal claims require experimental or quasi-experimental identification, structural assumptions or carefully designed econometrics rather than correlation alone.",
          fr: "La finance observe fréquemment des systèmes endogènes où prix, flux et anticipations s’influencent mutuellement. Les affirmations causales nécessitent identification expérimentale ou quasi-expérimentale, hypothèses structurelles ou économétrie soigneusement conçue plutôt qu’une simple corrélation.",
        },
      },
      formula: {
        label: { en: "Correlation from covariance", fr: "Corrélation à partir de la covariance" },
        expression: "ρ₍X,Y₎ = Cov(X,Y) ÷ (σX × σY)",
        explanation: {
          en: "Correlation is scale-free but remains a measure of linear association, not causation.",
          fr: "La corrélation est indépendante de l’échelle mais reste une mesure d’association linéaire, pas de causalité.",
        },
        workedExample: {
          en: "Cov=0.012, σX=20%, σY=30% → correlation = 0.012/(0.20×0.30)=0.20.",
          fr: "Cov=0,012, σX=20 %, σY=30 % → corrélation = 0,012/(0,20×0,30)=0,20.",
        },
      },
      comparison: {
        title: { en: "Correlation vs causation", fr: "Corrélation vs causalité" },
        headers: [
          { en: "Concept", fr: "Concept" },
          { en: "What it tells you", fr: "Ce qu’il indique" },
          { en: "What it does not prove", fr: "Ce qu’il ne prouve pas" },
        ],
        rows: [
          { cells: [
            { en: "Correlation", fr: "Corrélation / correlation" },
            { en: "Linear co-movement", fr: "Co-mouvement linéaire" },
            { en: "Cause and effect", fr: "Cause et effet" },
          ]},
          { cells: [
            { en: "Causal relationship", fr: "Relation causale" },
            { en: "Changing one variable changes another under a valid identification framework", fr: "Modifier une variable change l’autre dans un cadre d’identification valide" },
            { en: "Established by correlation alone", fr: "Établie par simple corrélation" },
          ]},
        ],
      },
      vocabulary: [
        {
          en: "Omitted-variable bias",
          fr: "biais de variable omise / omitted-variable bias",
          definition: {
            en: "Bias that can arise when a relevant variable affecting the relationship is excluded.",
            fr: "Biais pouvant apparaître lorsqu’une variable pertinente influençant la relation est exclue.",
          },
        },
        {
          en: "Endogeneity",
          fr: "endogénéité / endogeneity",
          definition: {
            en: "A situation where an explanatory variable is correlated with the model error or jointly determined with the outcome.",
            fr: "Situation où une variable explicative est corrélée avec l’erreur du modèle ou déterminée conjointement avec le résultat.",
          },
        },
      ],
    },
  ],
  quiz: [
    {
      id: "q1",
      conceptKey: "mean-median",
      question: {
        en: "For the data 2, 3, 4, 5, 26, what are the mean and median?",
        fr: "Pour les données 2, 3, 4, 5, 26, quelles sont la moyenne et la médiane ?",
      },
      options: [
        { id: "a", label: { en: "Mean 8, median 4", fr: "Moyenne 8, médiane 4" } },
        { id: "b", label: { en: "Mean 4, median 8", fr: "Moyenne 4, médiane 8" } },
        { id: "c", label: { en: "Mean 5, median 5", fr: "Moyenne 5, médiane 5" } },
        { id: "d", label: { en: "Mean 26, median 4", fr: "Moyenne 26, médiane 4" } },
      ],
      correctOption: "a",
      explanation: {
        en: "The mean is 40/5=8 and the middle ordered observation is 4.",
        fr: "La moyenne vaut 40/5=8 et l’observation centrale triée vaut 4.",
      },
    },
    {
      id: "q2",
      conceptKey: "sample-variance",
      question: {
        en: "For the sample 4, 5, 6, what is the sample standard deviation?",
        fr: "Pour l’échantillon 4, 5, 6, quel est l’écart-type d’échantillon ?",
      },
      options: [
        { id: "a", label: { en: "0", fr: "0" } },
        { id: "b", label: { en: "1", fr: "1" } },
        { id: "c", label: { en: "2", fr: "2" } },
        { id: "d", label: { en: "5", fr: "5" } },
      ],
      correctOption: "b",
      explanation: {
        en: "Mean=5; squared deviations sum to 2; sample variance=2/(3−1)=1; standard deviation=1.",
        fr: "Moyenne=5 ; somme des écarts au carré=2 ; variance d’échantillon=2/(3−1)=1 ; écart-type=1.",
      },
    },
    {
      id: "q3",
      conceptKey: "z-score",
      question: {
        en: "Mean=70, standard deviation=10 and x=90. What is the z-score?",
        fr: "Moyenne=70, écart-type=10 et x=90. Quel est le z-score ?",
      },
      options: [
        { id: "a", label: { en: "−2", fr: "−2" } },
        { id: "b", label: { en: "−1", fr: "−1" } },
        { id: "c", label: { en: "+1", fr: "+1" } },
        { id: "d", label: { en: "+2", fr: "+2" } },
      ],
      correctOption: "d",
      explanation: {
        en: "(90−70)/10=+2.",
        fr: "(90−70)/10=+2.",
      },
    },
    {
      id: "q4",
      conceptKey: "independence",
      question: {
        en: "Two independent events each have probability 50%. What is the probability both occur?",
        fr: "Deux événements indépendants ont chacun une probabilité de 50 %. Quelle est la probabilité que les deux se produisent ?",
      },
      options: [
        { id: "a", label: { en: "25%", fr: "25 %" } },
        { id: "b", label: { en: "50%", fr: "50 %" } },
        { id: "c", label: { en: "75%", fr: "75 %" } },
        { id: "d", label: { en: "100%", fr: "100 %" } },
      ],
      correctOption: "a",
      explanation: {
        en: "0.50×0.50=0.25, or 25%.",
        fr: "0,50×0,50=0,25, soit 25 %.",
      },
    },
    {
      id: "q5",
      conceptKey: "bayes",
      question: {
        en: "Why can a strong warning signal still produce a modest posterior probability of distress?",
        fr: "Pourquoi un signal d’alerte fort peut-il malgré tout produire une probabilité postérieure modeste de difficulté ?",
      },
      options: [
        { id: "a", label: { en: "Because base rates matter", fr: "Parce que les base rates comptent" } },
        { id: "b", label: { en: "Because Bayes ignores prior information", fr: "Parce que Bayes ignore les informations a priori" } },
        { id: "c", label: { en: "Because conditional probability is always 50%", fr: "Parce que toute probabilité conditionnelle vaut 50 %" } },
        { id: "d", label: { en: "Because signals cannot contain information", fr: "Parce que les signaux ne peuvent jamais contenir d’information" } },
      ],
      correctOption: "a",
      explanation: {
        en: "Posterior probability combines the prior base rate with signal reliability.",
        fr: "La probabilité postérieure combine le base rate initial avec la fiabilité du signal.",
      },
    },
    {
      id: "q6",
      conceptKey: "standard-error",
      question: {
        en: "If sample standard deviation is 20 and sample size is 100, approximate standard error of the mean is:",
        fr: "Si l’écart-type d’échantillon vaut 20 et la taille 100, l’erreur standard approximative de la moyenne vaut :",
      },
      options: [
        { id: "a", label: { en: "0.2", fr: "0,2" } },
        { id: "b", label: { en: "2", fr: "2" } },
        { id: "c", label: { en: "10", fr: "10" } },
        { id: "d", label: { en: "20", fr: "20" } },
      ],
      correctOption: "b",
      explanation: {
        en: "20/√100 = 20/10 = 2.",
        fr: "20/√100 = 20/10 = 2.",
      },
    },
    {
      id: "q7",
      conceptKey: "confidence-interval",
      question: {
        en: "Estimate=10 and standard error=1. What is the approximate 95% confidence interval using ±1.96 SE?",
        fr: "Estimation=10 et erreur standard=1. Quel est l’intervalle de confiance approximatif à 95 % avec ±1,96 SE ?",
      },
      options: [
        { id: "a", label: { en: "[9, 11]", fr: "[9 ; 11]" } },
        { id: "b", label: { en: "[8.04, 11.96]", fr: "[8,04 ; 11,96]" } },
        { id: "c", label: { en: "[0, 20]", fr: "[0 ; 20]" } },
        { id: "d", label: { en: "[10, 11.96]", fr: "[10 ; 11,96]" } },
      ],
      correctOption: "b",
      explanation: {
        en: "10±1.96 gives approximately [8.04, 11.96].",
        fr: "10±1,96 donne environ [8,04 ; 11,96].",
      },
    },
    {
      id: "q8",
      conceptKey: "correlation-causation",
      question: {
        en: "Which statement is correct?",
        fr: "Quelle proposition est correcte ?",
      },
      options: [
        { id: "a", label: { en: "High correlation proves causation", fr: "Une forte corrélation prouve la causalité" } },
        { id: "b", label: { en: "Correlation measures linear co-movement but does not by itself prove causation", fr: "La corrélation mesure un co-mouvement linéaire mais ne prouve pas à elle seule la causalité" } },
        { id: "c", label: { en: "Zero correlation always means independence", fr: "Une corrélation nulle signifie toujours indépendance" } },
        { id: "d", label: { en: "Covariance and correlation are always numerically equal", fr: "Covariance et corrélation sont toujours numériquement égales" } },
      ],
      correctOption: "b",
      explanation: {
        en: "Correlation measures association, not cause and effect.",
        fr: "La corrélation mesure une association, pas une relation de cause à effet.",
      },
    },
  ],
  interviewPrompt: {
    question: {
      en: "Explain the difference between standard deviation and standard error, and why that distinction matters in finance.",
      fr: "Explique la différence entre écart-type / standard deviation et erreur standard / standard error, et pourquoi cette distinction compte en finance.",
    },
    framework: [
      {
        en: "Define standard deviation as dispersion of observations or returns around their mean.",
        fr: "Définir l’écart-type comme la dispersion des observations ou rendements autour de leur moyenne.",
      },
      {
        en: "Define standard error as uncertainty around an estimated statistic, such as the sample mean.",
        fr: "Définir l’erreur standard comme l’incertitude autour d’une statistique estimée, par exemple la moyenne d’échantillon.",
      },
      {
        en: "State SE(mean) ≈ s/√n under standard assumptions.",
        fr: "Donner SE(mean) ≈ s/√n sous des hypothèses standard.",
      },
      {
        en: "Explain that more data can reduce estimation uncertainty without reducing the underlying volatility of the asset.",
        fr: "Expliquer que davantage de données peuvent réduire l’incertitude d’estimation sans réduire la volatilité réelle de l’actif.",
      },
      {
        en: "Connect the distinction to confidence in backtests, expected returns and risk estimates.",
        fr: "Relier la distinction à la confiance dans backtests, expected returns et estimations de risque.",
      },
    ],
    sample: {
      en: "Standard deviation measures how dispersed the underlying observations are, so for returns it is often used as a measure of volatility. Standard error measures how uncertain an estimated statistic is. For the sample mean, a common approximation is standard deviation divided by the square root of sample size. That distinction matters because adding more observations can make our estimate of average return more precise even though the asset itself remains just as volatile. In finance, confusing the two can make a backtest or expected-return estimate look much more reliable than it really is.",
      fr: "L’écart-type mesure la dispersion des observations sous-jacentes ; pour des rendements, il est souvent utilisé comme mesure de volatilité. L’erreur standard mesure l’incertitude autour d’une statistique estimée. Pour la moyenne d’échantillon, une approximation courante est écart-type divisé par racine de la taille de l’échantillon. La distinction compte car ajouter davantage d’observations peut rendre notre estimation du rendement moyen plus précise sans rendre l’actif lui-même moins volatil. En finance, confondre les deux peut faire paraître un backtest ou une estimation d’expected return beaucoup plus fiable qu’elle ne l’est réellement.",
    },
  },
};


export const excelFoundationsForFinanceLesson: FinanceLesson = {
  slug: "year-1-excel-foundations-for-finance",
  year: { en: "Year 1 · Foundations", fr: "Année 1 · Fondations" },
  domain: {
    en: "Corporate Finance & Valuation",
    fr: "Finance d’entreprise & valorisation / Corporate Finance & Valuation",
  },
  title: {
    en: "Excel Foundations for Finance",
    fr: "Fondamentaux Excel pour la finance / Excel Foundations for Finance",
  },
  subtitle: {
    en: "Build the spreadsheet habits used in finance: clean model architecture, reliable formulas, logical tests, lookups, date handling, financial functions, sensitivities, charts and error checks.",
    fr: "Construire les habitudes Excel utilisées en finance : architecture propre du modèle, formules fiables, tests logiques, lookups, gestion des dates, fonctions financières, sensitivities, graphiques et contrôles d’erreurs.",
  },
  duration: { en: "100–125 min", fr: "100–125 min" },
  prerequisites: [
    {
      en: "Time Value of Money",
      fr: "Valeur temps de l’argent / Time Value of Money",
    },
    {
      en: "Financial Accounting I",
      fr: "Comptabilité financière I / Financial Accounting I",
    },
  ],
  objectives: [
    {
      en: "Build a clean finance workbook with separated inputs, calculations and outputs.",
      fr: "Construire un workbook financier propre séparant inputs, calculs et outputs.",
    },
    {
      en: "Use relative, absolute and mixed cell references correctly.",
      fr: "Utiliser correctement références relatives, absolues et mixtes.",
    },
    {
      en: "Apply logical, conditional aggregation and lookup functions to financial datasets.",
      fr: "Appliquer fonctions logiques, agrégations conditionnelles et lookups à des données financières.",
    },
    {
      en: "Work safely with dates, time periods and common finance functions such as NPV, XNPV, IRR and XIRR.",
      fr: "Travailler proprement avec dates, périodes et fonctions financières courantes comme NPV, XNPV, IRR et XIRR.",
    },
    {
      en: "Create scenario and sensitivity analysis without hard-coding outputs.",
      fr: "Créer des analyses de scénarios et de sensibilité sans hard-coder les outputs.",
    },
    {
      en: "Audit a spreadsheet for formula consistency, data quality and presentation risk.",
      fr: "Auditer un spreadsheet pour cohérence des formules, qualité des données et risque de présentation.",
    },
  ],
  overviewFlow: {
    title: {
      en: "A professional spreadsheet workflow",
      fr: "Workflow d’un spreadsheet professionnel",
    },
    steps: [
      {
        title: { en: "Inputs", fr: "Inputs / Hypothèses" },
        detail: { en: "Source · clean · label", fr: "Source · nettoyage · labels" },
      },
      {
        title: { en: "Calculations", fr: "Calculs" },
        detail: { en: "References · logic · schedules", fr: "Références · logique · schedules" },
      },
      {
        title: { en: "Outputs", fr: "Outputs / Résultats" },
        detail: { en: "KPIs · valuation · charts", fr: "KPIs · valuation · graphiques" },
      },
      {
        title: { en: "Controls", fr: "Contrôles" },
        detail: { en: "Checks · sensitivities · audit", fr: "Checks · sensitivities · audit" },
      },
    ],
  },
  sections: [
    {
      id: "workbook-architecture",
      kicker: { en: "01 · MODEL ARCHITECTURE", fr: "01 · ARCHITECTURE DU MODÈLE" },
      title: {
        en: "A good finance model is designed before formulas are written",
        fr: "Un bon modèle financier se structure avant d’écrire les formules",
      },
      coreFacts: [
        {
          en: "Professional spreadsheets separate source data, assumptions, calculations and outputs so users can trace logic.",
          fr: "Les spreadsheets professionnels séparent données sources, hypothèses / assumptions, calculs et outputs afin que la logique soit traçable.",
        },
        {
          en: "Inputs should be clearly labeled with units, dates and source context.",
          fr: "Les inputs doivent être clairement identifiés avec unités, dates et contexte de source.",
        },
        {
          en: "Hard-coded assumptions embedded inside long formulas are harder to review and update.",
          fr: "Les hypothèses hard-codées à l’intérieur de longues formules sont plus difficiles à relire et à mettre à jour.",
        },
        {
          en: "Consistency of time direction, signs and units matters as much as formula syntax.",
          fr: "La cohérence de la direction temporelle, des signes et des unités compte autant que la syntaxe des formules.",
        },
      ],
      explanation: {
        Beginner: {
          en: "Instead of typing growth of 5% directly into twenty formulas, place the 5% assumption in one labeled cell and reference it everywhere. Then when the assumption changes, the whole model updates from one place.",
          fr: "Au lieu de taper une croissance de 5 % directement dans vingt formules, place l’hypothèse de 5 % dans une cellule clairement nommée et référence-la partout. Lorsque l’hypothèse change, tout le modèle se met à jour depuis un seul endroit.",
        },
        Intermediate: {
          en: "A clean workbook usually separates historical data from forecasts and distinguishes imported data from analyst assumptions. Rows should have consistent units and columns should follow a logical period structure.",
          fr: "Un workbook propre sépare généralement données historiques et forecasts et distingue données importées des hypothèses analyste. Les lignes doivent utiliser des unités cohérentes et les colonnes suivre une structure temporelle logique.",
        },
        Professional: {
          en: "Spreadsheet architecture is model governance. A reviewer should be able to identify source data, assumption ownership, calculation dependencies and key outputs without reverse-engineering every formula. Good structure reduces key-person risk and makes model changes safer.",
          fr: "L’architecture Excel est une forme de gouvernance du modèle. Un reviewer doit pouvoir identifier données sources, ownership des hypothèses, dépendances de calcul et outputs clés sans reverse-engineer chaque formule. Une bonne structure réduit le key-person risk et sécurise les modifications.",
        },
      },
      comparison: {
        title: { en: "Weak vs strong model design", fr: "Design faible vs design solide" },
        headers: [
          { en: "Weak practice", fr: "Mauvaise pratique" },
          { en: "Better practice", fr: "Meilleure pratique" },
        ],
        rows: [
          { cells: [
            { en: "Assumption hidden inside formula", fr: "Hypothèse cachée dans une formule" },
            { en: "Dedicated labeled input cell", fr: "Cellule input dédiée et clairement nommée" },
          ]},
          { cells: [
            { en: "Mixed units without labels", fr: "Unités mélangées sans labels" },
            { en: "Explicit units on every schedule", fr: "Unités explicites sur chaque schedule" },
          ]},
          { cells: [
            { en: "Manual output edits", fr: "Outputs modifiés manuellement" },
            { en: "Outputs driven by formulas", fr: "Outputs alimentés par formules" },
          ]},
          { cells: [
            { en: "No error checks", fr: "Aucun contrôle d’erreur" },
            { en: "Visible control checks", fr: "Checks visibles" },
          ]},
        ],
      },
      vocabulary: [
        {
          en: "Hard-code",
          fr: "valeur saisie en dur / hard-code",
          definition: {
            en: "A manually typed value rather than a formula-linked or source-linked value.",
            fr: "Valeur saisie manuellement plutôt que reliée par formule ou à une source.",
          },
        },
        {
          en: "Schedule",
          fr: "tableau de calcul / schedule",
          definition: {
            en: "A structured supporting calculation block used by a financial model.",
            fr: "Bloc de calcul structuré servant de support à un modèle financier.",
          },
        },
      ],
    },
    {
      id: "cell-references",
      kicker: { en: "02 · CELL REFERENCES", fr: "02 · RÉFÉRENCES DE CELLULES" },
      title: {
        en: "Relative, absolute and mixed references control how formulas copy",
        fr: "Références relatives, absolues et mixtes contrôlent la copie des formules",
      },
      coreFacts: [
        {
          en: "A relative reference such as B2 changes when a formula is copied to another location.",
          fr: "Une référence relative comme B2 change lorsqu’une formule est copiée ailleurs.",
        },
        {
          en: "An absolute reference such as $B$2 locks both row and column.",
          fr: "Une référence absolue comme $B$2 verrouille à la fois la ligne et la colonne.",
        },
        {
          en: "Mixed references such as $B2 or B$2 lock only one dimension.",
          fr: "Les références mixtes comme $B2 ou B$2 verrouillent une seule dimension.",
        },
        {
          en: "Reference design is essential for scalable forecasting, sensitivity tables and repeated calculations.",
          fr: "Le design des références est essentiel pour les forecasts scalables, sensitivity tables et calculs répétés.",
        },
      ],
      explanation: {
        Beginner: {
          en: "Suppose revenue is in B5 and a tax rate assumption is in B2. If you copy a tax formula across years, you may want the revenue reference to move while the tax-rate cell stays fixed. That is why absolute references exist.",
          fr: "Supposons que le revenu soit en B5 et le taux d’impôt en B2. Si tu copies une formule de taxe sur plusieurs années, tu veux peut-être que la référence au revenu se déplace mais que la cellule du taux reste fixe. C’est précisément le rôle des références absolues.",
        },
        Intermediate: {
          en: "Mixed references are especially useful in two-dimensional tables. Locking a row but not a column, or vice versa, lets one formula adapt correctly across a matrix.",
          fr: "Les références mixtes sont particulièrement utiles dans les tableaux à deux dimensions. Verrouiller une ligne mais pas une colonne, ou l’inverse, permet à une formule de s’adapter correctement dans une matrice.",
        },
        Professional: {
          en: "Reference discipline prevents silent model corruption. When copying formulas through long schedules, every anchor should be intentional. Analysts often inspect formulas across a row to confirm references move consistently rather than merely checking displayed values.",
          fr: "La discipline des références évite les corruptions silencieuses du modèle. Lorsqu’une formule est copiée dans de longs schedules, chaque ancrage doit être intentionnel. Les analystes inspectent souvent les formules sur toute une ligne pour vérifier le déplacement cohérent des références plutôt que seulement les valeurs affichées.",
        },
      },
      formula: {
        label: { en: "Example of an anchored assumption", fr: "Exemple d’hypothèse ancrée" },
        expression: "= B5 × $B$2",
        explanation: {
          en: "B5 can move when copied; $B$2 remains fixed.",
          fr: "B5 peut se déplacer lors de la copie ; $B$2 reste fixe.",
        },
        workedExample: {
          en: "If B5=100 and $B$2=25%, the result is 25. Copying the formula to C5 can reference C5 while retaining the same tax assumption.",
          fr: "Si B5=100 et $B$2=25 %, le résultat vaut 25. En copiant vers C5, la formule peut utiliser C5 tout en gardant le même taux d’impôt.",
        },
      },
      vocabulary: [
        {
          en: "Absolute reference",
          fr: "référence absolue / absolute reference",
          definition: {
            en: "A cell reference that remains fixed when a formula is copied.",
            fr: "Référence de cellule qui reste fixe lors de la copie d’une formule.",
          },
        },
        {
          en: "Mixed reference",
          fr: "référence mixte / mixed reference",
          definition: {
            en: "A reference locking only a row or only a column.",
            fr: "Référence verrouillant uniquement la ligne ou uniquement la colonne.",
          },
        },
      ],
    },
    {
      id: "core-formulas",
      kicker: { en: "03 · CORE FORMULAS", fr: "03 · FORMULES FONDAMENTALES" },
      title: {
        en: "Simple formulas become powerful when they are consistent and auditable",
        fr: "Les formules simples deviennent puissantes lorsqu’elles sont cohérentes et auditables",
      },
      coreFacts: [
        {
          en: "SUM, AVERAGE, MIN, MAX and ROUND are simple but heavily used in finance models.",
          fr: "SUM, AVERAGE, MIN, MAX et ROUND sont simples mais très utilisés dans les modèles financiers.",
        },
        {
          en: "Parentheses determine calculation order and should be used explicitly when formula intent could be ambiguous.",
          fr: "Les parenthèses déterminent l’ordre des calculs et doivent être utilisées explicitement lorsque l’intention pourrait être ambiguë.",
        },
        {
          en: "Percentages are stored numerically, so 5% equals 0.05 in calculations.",
          fr: "Les pourcentages sont stockés numériquement ; 5 % équivaut donc à 0,05 dans les calculs.",
        },
        {
          en: "Rounding displayed values is different from rounding values inside calculations.",
          fr: "Arrondir l’affichage est différent d’arrondir les valeurs réellement utilisées dans les calculs.",
        },
      ],
      explanation: {
        Beginner: {
          en: "If quarterly revenue is 20, 25, 30 and 35, SUM gives annual revenue of 110. AVERAGE gives 27.5. These are basic functions, but most financial models are built from many simple formulas connected correctly.",
          fr: "Si les revenus trimestriels valent 20, 25, 30 et 35, SUM donne un revenu annuel de 110. AVERAGE donne 27,5. Ce sont des fonctions simples, mais la majorité des modèles financiers reposent sur de nombreuses formules simples correctement connectées.",
        },
        Intermediate: {
          en: "Use formulas that express economic logic directly. For example, revenue forecast can be prior-year revenue multiplied by one plus growth, instead of manually typing each forecast year.",
          fr: "Les formules doivent exprimer directement la logique économique. Par exemple, un forecast de revenu peut être revenu de l’année précédente multiplié par un plus la croissance plutôt que d’être saisi manuellement chaque année.",
        },
        Professional: {
          en: "Model quality comes from consistent formula patterns, explicit assumptions and transparent checks rather than clever formula complexity. A formula that is easy to audit is often preferable to a shorter but opaque alternative.",
          fr: "La qualité du modèle vient de patterns de formules cohérents, hypothèses explicites et checks transparents plutôt que de formules complexes. Une formule facile à auditer est souvent préférable à une formule plus courte mais opaque.",
        },
      },
      formula: {
        label: { en: "Basic revenue forecast", fr: "Forecast simple de revenu" },
        expression: "= Prior Revenue × (1 + Growth Rate)",
        explanation: {
          en: "The forecast should reference a separate growth assumption rather than hard-coding the rate repeatedly.",
          fr: "Le forecast doit référencer une hypothèse de croissance séparée plutôt que hard-coder le taux à répétition.",
        },
        workedExample: {
          en: "Revenue 100 and growth 5% → next-period revenue = 100×1.05 = 105.",
          fr: "Revenu 100 et croissance 5 % → revenu période suivante = 100×1,05 = 105.",
        },
      },
      vocabulary: [
        {
          en: "Formula consistency",
          fr: "cohérence des formules / formula consistency",
          definition: {
            en: "Using the same logical formula pattern across comparable periods or entities.",
            fr: "Utilisation du même pattern logique de formule entre périodes ou entités comparables.",
          },
        },
        {
          en: "Calculation order",
          fr: "ordre des opérations / calculation order",
          definition: {
            en: "The sequence in which spreadsheet arithmetic is evaluated.",
            fr: "Séquence selon laquelle les opérations arithmétiques sont évaluées.",
          },
        },
      ],
    },
    {
      id: "logical-functions",
      kicker: { en: "04 · LOGIC & ERROR HANDLING", fr: "04 · LOGIQUE & GESTION DES ERREURS" },
      title: {
        en: "IF, AND, OR and IFERROR turn rules into model logic",
        fr: "IF, AND, OR et IFERROR transforment des règles en logique de modèle",
      },
      coreFacts: [
        {
          en: "IF returns different outputs depending on whether a logical test is true or false.",
          fr: "IF renvoie différents outputs selon qu’un test logique est vrai ou faux.",
        },
        {
          en: "AND requires all included conditions to be true; OR requires at least one.",
          fr: "AND exige que toutes les conditions soient vraies ; OR qu’au moins une le soit.",
        },
        {
          en: "IFERROR can improve presentation but should not be used to hide unexplained model errors.",
          fr: "IFERROR peut améliorer la présentation mais ne doit pas servir à masquer des erreurs de modèle non comprises.",
        },
        {
          en: "Nested logic should remain readable; complex business rules may be clearer when broken into helper rows.",
          fr: "Les logiques imbriquées doivent rester lisibles ; des règles complexes sont souvent plus claires lorsqu’elles sont décomposées en helper rows.",
        },
      ],
      explanation: {
        Beginner: {
          en: "A simple IF can classify leverage. If Debt/EBITDA is above 4.0×, return 'High'; otherwise return 'Normal'. Excel is simply applying a rule you define.",
          fr: "Un IF simple peut classer le levier. Si Debt/EBITDA dépasse 4,0×, renvoyer « High » ; sinon « Normal ». Excel applique simplement la règle que tu définis.",
        },
        Intermediate: {
          en: "Logical formulas are useful for scenario switches, covenant tests, rating buckets and data flags. Separating the test from the output can make the model easier to audit.",
          fr: "Les formules logiques servent aux scenario switches, tests de covenant, rating buckets et data flags. Séparer le test de l’output peut rendre le modèle plus facile à auditer.",
        },
        Professional: {
          en: "Error-handling functions should be defensive, not cosmetic. Suppressing every #N/A or #DIV/0! can conceal broken links or missing data. Professional models distinguish expected missing values from true calculation failures.",
          fr: "Les fonctions de gestion d’erreur doivent être défensives et non cosmétiques. Supprimer tous les #N/A ou #DIV/0! peut masquer liens cassés ou données manquantes. Les modèles professionnels distinguent valeurs manquantes attendues et vraies erreurs de calcul.",
        },
      },
      formula: {
        label: { en: "Simple covenant flag", fr: "Flag simple de covenant" },
        expression: "= IF(Debt_EBITDA > 4, \"High\", \"Normal\")",
        explanation: {
          en: "The logical test evaluates leverage and returns a label.",
          fr: "Le test logique évalue le levier et renvoie un label.",
        },
        workedExample: {
          en: "Debt/EBITDA 4.6× → High. Debt/EBITDA 3.2× → Normal.",
          fr: "Debt/EBITDA 4,6× → High. Debt/EBITDA 3,2× → Normal.",
        },
      },
      vocabulary: [
        {
          en: "Boolean",
          fr: "booléen / Boolean",
          definition: {
            en: "A logical value such as TRUE or FALSE.",
            fr: "Valeur logique comme TRUE ou FALSE.",
          },
        },
        {
          en: "Helper row",
          fr: "ligne auxiliaire / helper row",
          definition: {
            en: "An intermediate calculation row used to make logic more transparent.",
            fr: "Ligne de calcul intermédiaire utilisée pour rendre la logique plus transparente.",
          },
        },
      ],
    },
    {
      id: "conditional-aggregation",
      kicker: { en: "05 · SUMIFS & CONDITIONAL ANALYSIS", fr: "05 · SUMIFS & ANALYSE CONDITIONNELLE" },
      title: {
        en: "Aggregate financial data by company, period, region or category",
        fr: "Agréger des données financières par entreprise, période, région ou catégorie",
      },
      coreFacts: [
        {
          en: "SUMIFS sums values meeting multiple criteria.",
          fr: "SUMIFS additionne les valeurs répondant à plusieurs critères.",
        },
        {
          en: "COUNTIFS counts rows meeting multiple criteria, while AVERAGEIFS calculates conditional averages.",
          fr: "COUNTIFS compte les lignes répondant à plusieurs critères, tandis qu’AVERAGEIFS calcule des moyennes conditionnelles.",
        },
        {
          en: "Criteria ranges should align in size and structure with the sum or average range.",
          fr: "Les plages de critères doivent être alignées en taille et structure avec la plage à sommer ou moyenner.",
        },
        {
          en: "Conditional aggregation is useful for transaction data, portfolio holdings, expenses and segment analysis.",
          fr: "L’agrégation conditionnelle est utile pour données de transactions, holdings de portefeuille, dépenses et analyses par segment.",
        },
      ],
      explanation: {
        Beginner: {
          en: "Imagine a table containing 1,000 transactions with company, region and revenue columns. SUMIFS can add only the revenue rows where company equals A and region equals Europe without manually filtering each row.",
          fr: "Imagine un tableau de 1 000 transactions avec colonnes entreprise, région et revenu. SUMIFS peut additionner uniquement les lignes où l’entreprise vaut A et la région Europe sans filtrer manuellement chaque ligne.",
        },
        Intermediate: {
          en: "Conditional functions are robust building blocks for management reporting and portfolio dashboards. Criteria can reference cells, making the same output update dynamically when the selected company or period changes.",
          fr: "Les fonctions conditionnelles sont des briques solides pour management reporting et dashboards de portefeuille. Les critères peuvent référencer des cellules afin que l’output se mette à jour dynamiquement lorsque l’entreprise ou la période sélectionnée change.",
        },
        Professional: {
          en: "SUMIFS-style models are transparent and auditable for moderate datasets. For larger or more complex workflows, structured tables, PivotTables, Power Query or data models may be more appropriate, but the economic aggregation logic remains the same.",
          fr: "Les modèles basés sur SUMIFS sont transparents et auditables pour des datasets modérés. Pour des workflows plus larges ou complexes, tables structurées, PivotTables, Power Query ou data models peuvent être plus adaptés, mais la logique économique d’agrégation reste la même.",
        },
      },
      formula: {
        label: { en: "Conditional revenue sum", fr: "Somme conditionnelle du revenu" },
        expression: "= SUMIFS(RevenueRange, CompanyRange, SelectedCompany, RegionRange, SelectedRegion)",
        explanation: {
          en: "SUMIFS applies every supplied criterion before summing the revenue range.",
          fr: "SUMIFS applique tous les critères fournis avant de sommer la plage de revenu.",
        },
        workedExample: {
          en: "If matching transactions are 20, 35 and 45, the conditional sum is 100.",
          fr: "Si les transactions correspondantes valent 20, 35 et 45, la somme conditionnelle vaut 100.",
        },
      },
      vocabulary: [
        {
          en: "Criteria range",
          fr: "plage de critères / criteria range",
          definition: {
            en: "A range evaluated against a condition in a conditional function.",
            fr: "Plage évaluée par rapport à une condition dans une fonction conditionnelle.",
          },
        },
        {
          en: "Aggregation",
          fr: "agrégation / aggregation",
          definition: {
            en: "Combining detailed observations into a summarized metric.",
            fr: "Combinaison d’observations détaillées en une métrique résumée.",
          },
        },
      ],
    },
    {
      id: "lookups",
      kicker: { en: "06 · LOOKUPS", fr: "06 · LOOKUPS / RECHERCHE" },
      title: {
        en: "XLOOKUP and INDEX-MATCH connect data tables reliably",
        fr: "XLOOKUP et INDEX-MATCH relient les tables de données de manière fiable",
      },
      coreFacts: [
        {
          en: "XLOOKUP searches for a key and returns a corresponding value from another range.",
          fr: "XLOOKUP recherche une clé et renvoie la valeur correspondante dans une autre plage.",
        },
        {
          en: "INDEX-MATCH separates the location step from the return step and remains useful in flexible models.",
          fr: "INDEX-MATCH sépare l’étape de localisation de l’étape de retour et reste utile dans les modèles flexibles.",
        },
        {
          en: "Exact matching is usually safer for identifiers such as tickers, account codes or company IDs.",
          fr: "L’exact match est généralement plus sûr pour les identifiants comme tickers, codes comptables ou company IDs.",
        },
        {
          en: "Duplicate keys, inconsistent text and missing values can produce incorrect or ambiguous lookup results.",
          fr: "Des clés dupliquées, textes incohérents ou valeurs manquantes peuvent produire des résultats de lookup incorrects ou ambigus.",
        },
      ],
      explanation: {
        Beginner: {
          en: "Suppose one table has ticker and company name, while another sheet only has the ticker. XLOOKUP can find the ticker and return the company name automatically.",
          fr: "Supposons qu’une table contienne ticker et nom d’entreprise, tandis qu’une autre feuille ne contient que le ticker. XLOOKUP peut trouver le ticker et renvoyer automatiquement le nom de l’entreprise.",
        },
        Intermediate: {
          en: "Lookups are essential for mapping reference data such as sector, currency, tax rate or credit rating into transaction or valuation datasets. The lookup key must be clean and consistently formatted.",
          fr: "Les lookups sont essentiels pour mapper des données de référence comme secteur, devise, taux d’impôt ou rating vers des datasets de transactions ou de valuation. La clé doit être propre et formatée de manière cohérente.",
        },
        Professional: {
          en: "A lookup is only as reliable as its key architecture. Analysts should test uniqueness, use explicit not-found handling and avoid approximate matching unless the data are intentionally designed for ranges or bands.",
          fr: "Un lookup n’est fiable que si son architecture de clés l’est. Les analystes testent l’unicité, gèrent explicitement les not-found et évitent les approximate matches sauf lorsque les données sont volontairement conçues sous forme de bandes ou intervalles.",
        },
      },
      formula: {
        label: { en: "Exact lookup", fr: "Lookup exact" },
        expression: "= XLOOKUP(A2, TickerRange, CompanyNameRange, \"Not Found\")",
        explanation: {
          en: "The value in A2 is searched in TickerRange and the corresponding company name is returned.",
          fr: "La valeur de A2 est recherchée dans TickerRange et le nom d’entreprise correspondant est renvoyé.",
        },
        workedExample: {
          en: "A2 contains MSFT and the reference table maps MSFT to Microsoft → output Microsoft.",
          fr: "A2 contient MSFT et la table de référence associe MSFT à Microsoft → output Microsoft.",
        },
      },
      comparison: {
        title: { en: "XLOOKUP vs INDEX-MATCH", fr: "XLOOKUP vs INDEX-MATCH" },
        headers: [
          { en: "Method", fr: "Méthode" },
          { en: "Strength", fr: "Avantage" },
          { en: "Typical use", fr: "Usage typique" },
        ],
        rows: [
          { cells: [
            { en: "XLOOKUP", fr: "XLOOKUP" },
            { en: "Readable and direct", fr: "Lisible et direct" },
            { en: "Modern exact lookups", fr: "Lookups exacts modernes" },
          ]},
          { cells: [
            { en: "INDEX-MATCH", fr: "INDEX-MATCH" },
            { en: "Flexible component approach", fr: "Approche modulaire flexible" },
            { en: "Legacy compatibility or complex setups", fr: "Compatibilité legacy ou setups complexes" },
          ]},
        ],
      },
      vocabulary: [
        {
          en: "Lookup key",
          fr: "clé de recherche / lookup key",
          definition: {
            en: "The identifier used to find a matching record.",
            fr: "Identifiant utilisé pour trouver un enregistrement correspondant.",
          },
        },
        {
          en: "Exact match",
          fr: "correspondance exacte / exact match",
          definition: {
            en: "A lookup requiring the key to match the target value exactly.",
            fr: "Lookup exigeant une correspondance exacte entre la clé et la valeur cible.",
          },
        },
      ],
    },
    {
      id: "dates-financial-functions",
      kicker: { en: "07 · DATES & FINANCIAL FUNCTIONS", fr: "07 · DATES & FONCTIONS FINANCIÈRES" },
      title: {
        en: "Timing conventions determine whether a valuation formula is correct",
        fr: "Les conventions de timing déterminent si une formule de valorisation est correcte",
      },
      coreFacts: [
        {
          en: "Excel stores dates as serial values, allowing arithmetic and date functions to calculate periods.",
          fr: "Excel stocke les dates sous forme de valeurs sérielles, permettant l’arithmétique et l’utilisation de fonctions de dates.",
        },
        {
          en: "EOMONTH and YEARFRAC are useful for period logic, but exact day-count conventions depend on the application.",
          fr: "EOMONTH et YEARFRAC sont utiles pour la logique temporelle, mais les conventions exactes de day count dépendent de l’application.",
        },
        {
          en: "NPV assumes equally spaced periodic cash flows under its standard use; XNPV uses actual dates.",
          fr: "NPV suppose des cash flows périodiques régulièrement espacés dans son usage standard ; XNPV utilise les dates réelles.",
        },
        {
          en: "IRR is a periodic internal rate of return; XIRR uses irregularly dated cash flows.",
          fr: "IRR est un internal rate of return périodique ; XIRR utilise des cash flows datés de manière irrégulière.",
        },
      ],
      explanation: {
        Beginner: {
          en: "If cash flows arrive exactly once per year, NPV can be appropriate when used with the correct periodic rate and timing. If cash flows happen on irregular dates, XNPV is often the safer choice because it uses the actual dates.",
          fr: "Si les cash flows arrivent exactement une fois par an, NPV peut être approprié avec le bon taux périodique et le bon timing. Si les cash flows arrivent à des dates irrégulières, XNPV est souvent plus sûr car il utilise les dates réelles.",
        },
        Intermediate: {
          en: "Excel's NPV function discounts future values in the supplied range as period-one onward values. A time-zero investment is commonly added separately rather than included as if it occurred one period later.",
          fr: "La fonction Excel NPV actualise les valeurs de la plage comme des flux à partir de la période 1. Un investissement à t=0 est généralement ajouté séparément plutôt qu’inclus comme s’il avait lieu une période plus tard.",
        },
        Professional: {
          en: "Finance functions are convention-sensitive. Analysts must align rate frequency, date basis, sign convention and cash-flow timing. XIRR can also produce misleading outputs when cash-flow patterns are unusual or contain multiple sign changes, so the economic result should always be sanity-checked.",
          fr: "Les fonctions financières sont sensibles aux conventions. Les analystes doivent aligner fréquence du taux, date basis, convention de signe et timing des cash flows. XIRR peut aussi produire des outputs trompeurs avec des patterns inhabituels ou plusieurs changements de signe ; le résultat économique doit toujours être sanity-checked.",
        },
      },
      formula: {
        label: { en: "Periodic NPV setup", fr: "Setup de NPV périodique" },
        expression: "= NPV(DiscountRate, FutureCashFlows) + InitialCashFlow",
        explanation: {
          en: "The initial cash flow at time zero is commonly added separately because Excel's NPV function treats the range as future periodic flows.",
          fr: "Le cash flow initial à t=0 est généralement ajouté séparément car la fonction NPV d’Excel traite la plage comme des flux futurs périodiques.",
        },
        workedExample: {
          en: "Initial investment −100, then 60 and 60 one year apart at 10% → NPV ≈ −100 + 60/1.10 + 60/1.10² ≈ 4.13.",
          fr: "Investissement initial −100, puis 60 et 60 espacés d’un an à 10 % → NPV ≈ −100 + 60/1,10 + 60/1,10² ≈ 4,13.",
        },
      },
      vocabulary: [
        {
          en: "XNPV",
          fr: "XNPV / valeur actuelle nette datée",
          definition: {
            en: "An Excel function discounting cash flows using their actual dates.",
            fr: "Fonction Excel actualisant des cash flows à partir de leurs dates réelles.",
          },
        },
        {
          en: "XIRR",
          fr: "XIRR / taux de rendement interne daté",
          definition: {
            en: "An Excel function estimating an annualized internal rate of return for irregularly dated cash flows.",
            fr: "Fonction Excel estimant un taux de rendement interne annualisé pour des cash flows à dates irrégulières.",
          },
        },
      ],
    },
    {
      id: "sensitivity-analysis",
      kicker: { en: "08 · SCENARIOS & SENSITIVITIES", fr: "08 · SCÉNARIOS & SENSITIVITIES" },
      title: {
        en: "A model should show what changes when assumptions change",
        fr: "Un modèle doit montrer ce qui change lorsque les hypothèses changent",
      },
      coreFacts: [
        {
          en: "Scenario analysis changes a coherent set of assumptions together, while sensitivity analysis typically isolates the effect of selected variables.",
          fr: "L’analyse de scénario modifie un ensemble cohérent d’hypothèses, tandis que la sensitivity analysis isole généralement l’effet de certaines variables.",
        },
        {
          en: "Base, upside and downside cases should be driven by explicit inputs, not manual output overrides.",
          fr: "Les scénarios base, upside et downside doivent être pilotés par des inputs explicites et non par des modifications manuelles des outputs.",
        },
        {
          en: "Two-variable sensitivity tables are common in valuation for combinations such as WACC and terminal growth.",
          fr: "Les sensitivity tables à deux variables sont courantes en valuation pour des combinaisons comme WACC et terminal growth.",
        },
        {
          en: "Sensitivity outputs should be sanity-checked for monotonic relationships where economics imply them.",
          fr: "Les outputs de sensitivity doivent être sanity-checked pour vérifier les relations monotones lorsque l’économie les implique.",
        },
      ],
      explanation: {
        Beginner: {
          en: "If your valuation depends on growth and discount rate, do not calculate only one answer. Show what happens if growth is lower or higher and if the discount rate changes. This tells you how fragile the valuation is.",
          fr: "Si ta valorisation dépend de la croissance et du discount rate, ne calcule pas une seule réponse. Montre ce qui se passe si la croissance baisse ou monte et si le discount rate change. Cela révèle la fragilité de la valorisation.",
        },
        Intermediate: {
          en: "A scenario should be economically coherent. An upside case might combine stronger volume, better margins and lower credit losses only if those assumptions make sense together. Sensitivity tables, by contrast, intentionally vary selected drivers mechanically.",
          fr: "Un scénario doit être économiquement cohérent. Un upside case peut combiner volumes plus forts, meilleures marges et pertes de crédit plus faibles seulement si ces hypothèses sont cohérentes ensemble. Une sensitivity table fait au contraire varier mécaniquement certains drivers.",
        },
        Professional: {
          en: "Sensitivity analysis is model-risk analysis. If a small change in one uncertain input drives a very large change in valuation, that input deserves more diligence, wider scenario ranges and clearer communication.",
          fr: "La sensitivity analysis est une analyse du model risk. Si une petite variation d’un input incertain produit une forte variation de valuation, cet input mérite davantage de diligence, des plages de scénarios plus larges et une communication plus claire.",
        },
      },
      formula: {
        label: { en: "Scenario switch concept", fr: "Concept de scenario switch" },
        expression: "= CHOOSE(ScenarioNumber, DownsideInput, BaseInput, UpsideInput)",
        explanation: {
          en: "A scenario selector can drive assumptions consistently from one control cell.",
          fr: "Un sélecteur de scénario peut piloter les hypothèses de manière cohérente depuis une seule cellule de contrôle.",
        },
        workedExample: {
          en: "ScenarioNumber=2 returns the base-case input; changing the selector can update all linked assumptions.",
          fr: "ScenarioNumber=2 renvoie l’input du base case ; modifier le sélecteur peut mettre à jour toutes les hypothèses liées.",
        },
      },
      marketConnection: {
        en: "Valuation ranges are often more informative than a single target because market prices respond to uncertainty in growth, margins, rates and terminal assumptions.",
        fr: "Les fourchettes de valorisation sont souvent plus informatives qu’un target unique car les prix de marché réagissent à l’incertitude sur croissance, marges, taux et hypothèses terminales.",
      },
      vocabulary: [
        {
          en: "Sensitivity table",
          fr: "table de sensibilité / sensitivity table",
          definition: {
            en: "A grid showing how an output changes as one or more inputs vary.",
            fr: "Grille montrant comment un output change lorsque certains inputs varient.",
          },
        },
        {
          en: "Scenario switch",
          fr: "sélecteur de scénario / scenario switch",
          definition: {
            en: "A control used to activate a chosen set of model assumptions.",
            fr: "Contrôle utilisé pour activer un ensemble choisi d’hypothèses du modèle.",
          },
        },
      ],
    },
    {
      id: "data-quality-audit",
      kicker: { en: "09 · DATA QUALITY, CHARTS & AUDIT", fr: "09 · QUALITÉ DES DONNÉES, GRAPHIQUES & AUDIT" },
      title: {
        en: "A spreadsheet is only useful if the data and logic can be trusted",
        fr: "Un spreadsheet n’est utile que si les données et la logique sont fiables",
      },
      coreFacts: [
        {
          en: "Common data problems include numbers stored as text, duplicate records, hidden spaces, inconsistent dates and mixed units.",
          fr: "Les problèmes de données courants incluent nombres stockés comme texte, doublons, espaces cachés, dates incohérentes et unités mélangées.",
        },
        {
          en: "Excel Tables can create structured ranges that expand with new data and improve readability.",
          fr: "Les Excel Tables peuvent créer des plages structurées qui s’étendent avec les nouvelles données et améliorent la lisibilité.",
        },
        {
          en: "Charts should communicate one analytical message rather than add decoration.",
          fr: "Les graphiques doivent communiquer un message analytique plutôt qu’ajouter de la décoration.",
        },
        {
          en: "Audit checks should verify balance, sign consistency, formula continuity, source completeness and expected relationships.",
          fr: "Les audit checks doivent vérifier équilibre, cohérence des signes, continuité des formules, complétude des sources et relations attendues.",
        },
      ],
      explanation: {
        Beginner: {
          en: "Before trusting a spreadsheet, check whether values really are numbers, whether dates are recognized as dates and whether formulas were copied consistently. A beautiful chart cannot fix bad source data.",
          fr: "Avant de faire confiance à un spreadsheet, vérifie que les valeurs sont réellement numériques, que les dates sont reconnues comme dates et que les formules ont été copiées correctement. Un beau graphique ne corrige pas de mauvaises données sources.",
        },
        Intermediate: {
          en: "Useful controls include a balance-sheet check, source-row counts, duplicate-key checks, missing-value flags and trend reasonableness tests. These controls should be visible rather than buried.",
          fr: "Les contrôles utiles incluent balance-sheet check, comptage des lignes source, tests de clés dupliquées, flags de valeurs manquantes et tests de cohérence des tendances. Ces contrôles doivent rester visibles plutôt qu’être cachés.",
        },
        Professional: {
          en: "Spreadsheet risk combines data lineage, formula risk, manual override risk and presentation risk. A strong analyst documents sources, protects critical logic where appropriate, minimizes unnecessary manual intervention and makes review exceptions obvious.",
          fr: "Le spreadsheet risk combine data lineage, risque de formule, risque d’override manuel et risque de présentation. Un bon analyste documente les sources, protège la logique critique lorsque pertinent, minimise les interventions manuelles inutiles et rend les exceptions de review évidentes.",
        },
      },
      formula: {
        label: { en: "Simple model control", fr: "Contrôle simple du modèle" },
        expression: "= Assets − Liabilities − Equity",
        explanation: {
          en: "For a correctly linked balance sheet, the control should equal zero subject to rounding conventions.",
          fr: "Pour un bilan correctement lié, le contrôle doit être égal à zéro sous réserve des conventions d’arrondi.",
        },
        workedExample: {
          en: "Assets 1,000 − liabilities 600 − equity 400 = 0 → balance check passes.",
          fr: "Actifs 1 000 − passifs 600 − equity 400 = 0 → le balance check passe.",
        },
      },
      comparison: {
        title: { en: "Useful chart choices", fr: "Choix de graphiques utiles" },
        headers: [
          { en: "Question", fr: "Question" },
          { en: "Typical chart", fr: "Graphique typique" },
        ],
        rows: [
          { cells: [
            { en: "How has a metric changed over time?", fr: "Comment une métrique évolue-t-elle dans le temps ?" },
            { en: "Line chart", fr: "Graphique en ligne / line chart" },
          ]},
          { cells: [
            { en: "How do categories compare?", fr: "Comment comparer des catégories ?" },
            { en: "Bar or column chart", fr: "Barres / colonnes" },
          ]},
          { cells: [
            { en: "How do two variables relate?", fr: "Comment deux variables sont-elles liées ?" },
            { en: "Scatter plot", fr: "Nuage de points / scatter plot" },
          ]},
        ],
      },
      vocabulary: [
        {
          en: "Data lineage",
          fr: "traçabilité des données / data lineage",
          definition: {
            en: "The documented path from original source through transformations to final output.",
            fr: "Chemin documenté depuis la source originale à travers les transformations jusqu’à l’output final.",
          },
        },
        {
          en: "Sanity check",
          fr: "contrôle de vraisemblance / sanity check",
          definition: {
            en: "A reasonableness test used to identify results that may be mathematically possible but economically implausible.",
            fr: "Test de vraisemblance permettant d’identifier des résultats mathématiquement possibles mais économiquement peu plausibles.",
          },
        },
      ],
    },
  ],
  quiz: [
    {
      id: "q1",
      conceptKey: "absolute-reference",
      question: {
        en: "Which Excel reference locks both row and column when copied?",
        fr: "Quelle référence Excel verrouille à la fois la ligne et la colonne lors d’une copie ?",
      },
      options: [
        { id: "a", label: { en: "B2", fr: "B2" } },
        { id: "b", label: { en: "$B2", fr: "$B2" } },
        { id: "c", label: { en: "B$2", fr: "B$2" } },
        { id: "d", label: { en: "$B$2", fr: "$B$2" } },
      ],
      correctOption: "d",
      explanation: {
        en: "$B$2 locks both the B column and row 2.",
        fr: "$B$2 verrouille la colonne B et la ligne 2.",
      },
    },
    {
      id: "q2",
      conceptKey: "forecast-formula",
      question: {
        en: "Revenue is 100 and growth is 5%. What is next-period revenue using Revenue×(1+Growth)?",
        fr: "Le revenu vaut 100 et la croissance 5 %. Quel est le revenu de la période suivante avec Revenue×(1+Growth) ?",
      },
      options: [
        { id: "a", label: { en: "100", fr: "100" } },
        { id: "b", label: { en: "105", fr: "105" } },
        { id: "c", label: { en: "150", fr: "150" } },
        { id: "d", label: { en: "500", fr: "500" } },
      ],
      correctOption: "b",
      explanation: {
        en: "100×1.05=105.",
        fr: "100×1,05=105.",
      },
    },
    {
      id: "q3",
      conceptKey: "if-logic",
      question: {
        en: "What does IF primarily do in Excel?",
        fr: "Que fait principalement la fonction IF dans Excel ?",
      },
      options: [
        { id: "a", label: { en: "Returns one result if a test is true and another if false", fr: "Renvoie un résultat si le test est vrai et un autre s’il est faux" } },
        { id: "b", label: { en: "Always deletes errors", fr: "Supprime toujours les erreurs" } },
        { id: "c", label: { en: "Creates a chart automatically", fr: "Crée automatiquement un graphique" } },
        { id: "d", label: { en: "Locks all references", fr: "Verrouille toutes les références" } },
      ],
      correctOption: "a",
      explanation: {
        en: "IF evaluates a logical test and selects between two outputs.",
        fr: "IF évalue un test logique et choisit entre deux outputs.",
      },
    },
    {
      id: "q4",
      conceptKey: "sumifs",
      question: {
        en: "Which function is designed to sum values that meet multiple criteria?",
        fr: "Quelle fonction est conçue pour sommer des valeurs répondant à plusieurs critères ?",
      },
      options: [
        { id: "a", label: { en: "SUM", fr: "SUM" } },
        { id: "b", label: { en: "SUMIFS", fr: "SUMIFS" } },
        { id: "c", label: { en: "ROUND", fr: "ROUND" } },
        { id: "d", label: { en: "MAX", fr: "MAX" } },
      ],
      correctOption: "b",
      explanation: {
        en: "SUMIFS filters by multiple criteria before summing the target range.",
        fr: "SUMIFS applique plusieurs critères avant de sommer la plage cible.",
      },
    },
    {
      id: "q5",
      conceptKey: "xlookup",
      question: {
        en: "What is the main purpose of XLOOKUP?",
        fr: "Quel est l’objectif principal de XLOOKUP ?",
      },
      options: [
        { id: "a", label: { en: "Find a key and return a corresponding value", fr: "Trouver une clé et renvoyer la valeur correspondante" } },
        { id: "b", label: { en: "Calculate volatility", fr: "Calculer la volatilité" } },
        { id: "c", label: { en: "Format every cell", fr: "Formater toutes les cellules" } },
        { id: "d", label: { en: "Create a macro automatically", fr: "Créer automatiquement une macro" } },
      ],
      correctOption: "a",
      explanation: {
        en: "XLOOKUP searches for a lookup value and returns the corresponding value from another range.",
        fr: "XLOOKUP recherche une valeur clé et renvoie la valeur correspondante depuis une autre plage.",
      },
    },
    {
      id: "q6",
      conceptKey: "npv-timing",
      question: {
        en: "Why is a time-zero investment commonly added separately to Excel's NPV function?",
        fr: "Pourquoi l’investissement à t=0 est-il généralement ajouté séparément à la fonction NPV d’Excel ?",
      },
      options: [
        { id: "a", label: { en: "Because Excel NPV treats the supplied range as future periodic cash flows", fr: "Parce qu’Excel NPV traite la plage fournie comme des cash flows futurs périodiques" } },
        { id: "b", label: { en: "Because NPV cannot use negative numbers", fr: "Parce que NPV ne peut pas utiliser de nombres négatifs" } },
        { id: "c", label: { en: "Because time zero is always ignored in finance", fr: "Parce que t=0 est toujours ignoré en finance" } },
        { id: "d", label: { en: "Because Excel cannot calculate discounting", fr: "Parce qu’Excel ne peut pas calculer l’actualisation" } },
      ],
      correctOption: "a",
      explanation: {
        en: "Excel's NPV function discounts the range from period one onward, so a time-zero flow is commonly added separately.",
        fr: "La fonction NPV d’Excel actualise la plage à partir de la période 1 ; un flux à t=0 est donc généralement ajouté séparément.",
      },
    },
    {
      id: "q7",
      conceptKey: "sensitivity",
      question: {
        en: "What is the main purpose of a sensitivity table in valuation?",
        fr: "Quel est l’objectif principal d’une sensitivity table en valuation ?",
      },
      options: [
        { id: "a", label: { en: "Show how an output changes when key inputs vary", fr: "Montrer comment un output change lorsque les inputs clés varient" } },
        { id: "b", label: { en: "Hide uncertainty", fr: "Masquer l’incertitude" } },
        { id: "c", label: { en: "Replace all assumptions with one number", fr: "Remplacer toutes les hypothèses par un seul nombre" } },
        { id: "d", label: { en: "Prevent formulas from recalculating", fr: "Empêcher les formules de se recalculer" } },
      ],
      correctOption: "a",
      explanation: {
        en: "Sensitivity analysis exposes model dependence on uncertain assumptions.",
        fr: "La sensitivity analysis montre la dépendance du modèle aux hypothèses incertaines.",
      },
    },
    {
      id: "q8",
      conceptKey: "model-check",
      question: {
        en: "Assets are 1,000, liabilities 600 and equity 400. What should Assets−Liabilities−Equity equal?",
        fr: "Actifs=1 000, passifs=600 et equity=400. Que doit donner Actifs−Passifs−Equity ?",
      },
      options: [
        { id: "a", label: { en: "0", fr: "0" } },
        { id: "b", label: { en: "400", fr: "400" } },
        { id: "c", label: { en: "600", fr: "600" } },
        { id: "d", label: { en: "1,000", fr: "1 000" } },
      ],
      correctOption: "a",
      explanation: {
        en: "1,000−600−400=0, so the balance check passes.",
        fr: "1 000−600−400=0 ; le balance check passe.",
      },
    },
  ],
  interviewPrompt: {
    question: {
      en: "You receive a messy Excel model from another analyst. How would you review it before relying on the outputs?",
      fr: "Tu reçois un modèle Excel désordonné construit par un autre analyste. Comment le vérifierais-tu avant de faire confiance aux outputs ?",
    },
    framework: [
      {
        en: "Start with model architecture: identify source data, assumptions, calculations and outputs.",
        fr: "Commencer par l’architecture : identifier données sources, assumptions, calculs et outputs.",
      },
      {
        en: "Check units, dates, signs and historical-to-forecast transition.",
        fr: "Vérifier unités, dates, signes et transition historique → forecast.",
      },
      {
        en: "Inspect formula consistency across rows and columns and identify hard-coded values inside calculation blocks.",
        fr: "Inspecter la cohérence des formules entre lignes/colonnes et identifier les hard-codes dans les blocs de calcul.",
      },
      {
        en: "Test key reconciliations such as balance-sheet balance, cash roll-forward and subtotal logic.",
        fr: "Tester les rapprochements clés comme équilibre du bilan, cash roll-forward et logique des sous-totaux.",
      },
      {
        en: "Run sensitivities and sanity checks to see whether outputs move economically when assumptions change.",
        fr: "Faire des sensitivities et sanity checks afin de vérifier que les outputs bougent économiquement lorsque les hypothèses changent.",
      },
    ],
    sample: {
      en: "I would first map the model into inputs, calculations and outputs so I understand the flow before changing anything. Then I would check units, dates, signs and the transition from historical data into forecasts. I would inspect formulas across comparable periods to make sure references move consistently and look for hard-coded values inside calculation areas. Next I would test control checks such as whether the balance sheet balances, whether cash rolls correctly and whether important subtotals reconcile. Finally, I would change a few key assumptions and confirm the outputs respond in the expected economic direction. I would not rely on the headline valuation until both the mechanics and the economic logic pass those checks.",
      fr: "Je commencerais par cartographier le modèle entre inputs, calculs et outputs afin de comprendre son fonctionnement avant de modifier quoi que ce soit. Ensuite je vérifierais unités, dates, signes et transition des données historiques vers les forecasts. J’inspecterais les formules sur des périodes comparables pour vérifier que les références se déplacent de manière cohérente et je chercherais les hard-codes dans les zones de calcul. Puis je testerais les contrôles : équilibre du bilan, cash roll-forward et rapprochement des sous-totaux importants. Enfin, je modifierais quelques hypothèses clés pour vérifier que les outputs réagissent dans le sens économique attendu. Je ne me fierais pas à la valuation headline tant que la mécanique et la logique économique n’ont pas passé ces checks.",
    },
  },
};


export const financialVocabularyFrEnLesson: FinanceLesson = {
  slug: "year-1-financial-vocabulary-fr-en",
  year: { en: "Year 1 · Foundations", fr: "Année 1 · Fondations" },
  domain: {
    en: "Professional Vocabulary",
    fr: "Vocabulaire professionnel / Professional Vocabulary",
  },
  title: {
    en: "Financial Vocabulary FR ↔ EN",
    fr: "Vocabulaire financier FR ↔ EN / Financial Vocabulary",
  },
  subtitle: {
    en: "Master the bilingual vocabulary used in accounting, valuation, markets, rates, credit, equities, derivatives, portfolio management, banking and interviews — with definitions, context and common translation traps.",
    fr: "Maîtriser le vocabulaire bilingue utilisé en comptabilité / accounting, valorisation / valuation, marchés / markets, taux / rates, crédit / credit, actions / equities, produits dérivés / derivatives, gestion de portefeuille / portfolio management, banque / banking et entretiens / interviews — avec définitions, contexte et pièges de traduction.",
  },
  duration: { en: "90–115 min", fr: "90–115 min" },
  prerequisites: [
    {
      en: "Financial Accounting I",
      fr: "Comptabilité financière I / Financial Accounting I",
    },
    {
      en: "Macroeconomics for Markets",
      fr: "Macroéconomie pour les marchés / Macroeconomics for Markets",
    },
  ],
  objectives: [
    {
      en: "Use core finance terms naturally in both English and French.",
      fr: "Utiliser naturellement les principaux termes de finance en français / English.",
    },
    {
      en: "Distinguish close but non-equivalent terms such as revenue, income, profit, yield and return.",
      fr: "Distinguer les termes proches mais non équivalents comme chiffre d’affaires / revenue, résultat / income, bénéfice / profit, rendement obligataire / yield et rendement d’investissement / return.",
    },
    {
      en: "Recognize context-dependent words such as equity, spread, margin, duration and leverage.",
      fr: "Reconnaître les mots dépendant du contexte comme capitaux propres / equity, écart / spread, marge / margin, duration et levier / leverage.",
    },
    {
      en: "Understand the vocabulary used in markets, banking, valuation and interview questions.",
      fr: "Comprendre le vocabulaire utilisé sur les marchés / markets, en banque / banking, en valorisation / valuation et en entretien / interview.",
    },
    {
      en: "Translate finance concepts without relying on literal word-for-word translation.",
      fr: "Traduire les concepts financiers sans dépendre d’une traduction littérale mot à mot.",
    },
    {
      en: "Speak more precisely when explaining a company, trade, portfolio or market view.",
      fr: "S’exprimer avec davantage de précision pour expliquer une entreprise, une position / trade, un portefeuille / portfolio ou une vue de marché / market view.",
    },
  ],
  overviewFlow: {
    title: {
      en: "A finance vocabulary map",
      fr: "Carte du vocabulaire financier / Finance vocabulary map",
    },
    steps: [
      {
        title: { en: "Company", fr: "Entreprise / Company" },
        detail: { en: "Accounting · valuation · capital", fr: "Comptabilité · valorisation · capital" },
      },
      {
        title: { en: "Markets", fr: "Marchés / Markets" },
        detail: { en: "Prices · rates · credit · trading", fr: "Prix · taux · crédit · trading" },
      },
      {
        title: { en: "Risk", fr: "Risque / Risk" },
        detail: { en: "Portfolio · derivatives · hedging", fr: "Portefeuille · dérivés · couverture" },
      },
      {
        title: { en: "Communication", fr: "Communication" },
        detail: { en: "Interviews · research · professional usage", fr: "Entretiens · recherche · usage professionnel" },
      },
    ],
  },
  sections: [
    {
      id: "accounting-language",
      kicker: { en: "01 · ACCOUNTING LANGUAGE", fr: "01 · LANGAGE COMPTABLE / ACCOUNTING" },
      title: {
        en: "Revenue, profit, cash and equity are not interchangeable",
        fr: "Chiffre d’affaires / revenue, bénéfice / profit, cash et capitaux propres / equity ne sont pas interchangeables",
      },
      coreFacts: [
        {
          en: "Revenue is the top-line amount recognized from selling goods or services; profit is what remains after relevant expenses.",
          fr: "Le chiffre d’affaires / revenue correspond au montant comptabilisé des ventes de biens ou services ; le bénéfice / profit correspond à ce qui reste après les dépenses pertinentes.",
        },
        {
          en: "Income can refer to different profit measures depending on context, such as operating income or net income.",
          fr: "Le terme résultat / income peut désigner différents niveaux de bénéfice selon le contexte, par exemple résultat opérationnel / operating income ou résultat net / net income.",
        },
        {
          en: "Cash flow is not the same as accounting earnings because accrual accounting creates timing and non-cash differences.",
          fr: "Le flux de trésorerie / cash flow n’est pas identique au bénéfice comptable / accounting earnings car la comptabilité d’engagement / accrual accounting crée des différences de timing et des éléments non cash.",
        },
        {
          en: "Equity can mean shareholders' book equity, the equity asset class, or ownership interest depending on context.",
          fr: "Le mot capitaux propres / equity peut désigner les capitaux propres comptables, la classe d’actifs actions / equities ou une participation au capital selon le contexte.",
        },
      ],
      explanation: {
        Beginner: {
          en: "If a company sells $1 million of products, that is revenue, not profit. After costs, interest and taxes, perhaps only $80,000 remains as net income. If customers have not paid yet, cash may still be different again.",
          fr: "Si une entreprise vend pour 1 million de dollars de produits, il s’agit de chiffre d’affaires / revenue et non de bénéfice / profit. Après coûts, intérêts et impôts, il peut ne rester que 80 000 $ de résultat net / net income. Et si les clients n’ont pas encore payé, le cash peut encore être différent.",
        },
        Intermediate: {
          en: "Accounting vocabulary is hierarchical. Revenue flows into gross profit, then operating income, pre-tax income and net income. Balance-sheet terms describe stocks at a date; income-statement terms describe flows over a period.",
          fr: "Le vocabulaire comptable est hiérarchique. Le chiffre d’affaires / revenue conduit à la marge brute / gross profit, puis au résultat opérationnel / operating income, au résultat avant impôt / pre-tax income et au résultat net / net income. Les termes du bilan / balance sheet décrivent des stocks à une date ; ceux du compte de résultat / income statement décrivent des flux sur une période.",
        },
        Professional: {
          en: "Professionals use terminology precisely because small wording differences imply different claim structures, accounting locations or valuation treatment. 'Earnings', 'EBIT', 'EBITDA', 'net income' and 'free cash flow' should never be treated as synonyms.",
          fr: "Les professionnels utilisent les termes avec précision car de petites différences de vocabulaire impliquent des structures de créance, positions comptables ou traitements de valorisation différents. Bénéfices / earnings, EBIT, EBITDA, résultat net / net income et flux de trésorerie disponible / free cash flow ne sont jamais des synonymes.",
        },
      },
      vocabulary: [
        {
          en: "Revenue",
          fr: "chiffre d’affaires / revenue",
          definition: {
            en: "Amount recognized from sales before expenses.",
            fr: "Montant comptabilisé provenant des ventes avant déduction des dépenses.",
          },
        },
        {
          en: "Gross profit",
          fr: "marge brute en valeur / gross profit",
          definition: {
            en: "Revenue minus cost of goods or services sold.",
            fr: "Chiffre d’affaires / revenue moins coût des ventes / COGS.",
          },
        },
        {
          en: "Operating income",
          fr: "résultat opérationnel / operating income",
          definition: {
            en: "Profit after operating costs before selected financing, tax and non-operating items.",
            fr: "Résultat après coûts opérationnels avant certains éléments financiers, fiscaux et non opérationnels.",
          },
        },
        {
          en: "Net income",
          fr: "résultat net / net income",
          definition: {
            en: "Accounting profit attributable after recognized expenses, interest, taxes and other items.",
            fr: "Bénéfice comptable final après dépenses reconnues, intérêts, impôts et autres éléments.",
          },
        },
        {
          en: "Balance sheet",
          fr: "bilan / balance sheet",
          definition: {
            en: "Point-in-time statement of assets, liabilities and equity.",
            fr: "État présentant à une date donnée actifs, passifs et capitaux propres / equity.",
          },
        },
        {
          en: "Cash flow statement",
          fr: "tableau des flux de trésorerie / cash flow statement",
          definition: {
            en: "Statement explaining cash movements through operating, investing and financing activities.",
            fr: "État expliquant les mouvements de cash via activités opérationnelles / operating, d’investissement / investing et de financement / financing.",
          },
        },
        {
          en: "Accounts receivable",
          fr: "créances clients / accounts receivable",
          definition: {
            en: "Amounts customers owe the company for recognized sales.",
            fr: "Montants dus à l’entreprise par les clients au titre de ventes déjà comptabilisées.",
          },
        },
        {
          en: "Accounts payable",
          fr: "dettes fournisseurs / accounts payable",
          definition: {
            en: "Amounts the company owes suppliers.",
            fr: "Montants dus par l’entreprise à ses fournisseurs.",
          },
        },
      ],
    },
    {
      id: "valuation-corporate-finance",
      kicker: { en: "02 · VALUATION & CORPORATE FINANCE", fr: "02 · VALORISATION & FINANCE D’ENTREPRISE" },
      title: {
        en: "Enterprise value, equity value and cash flow language",
        fr: "Valeur d’entreprise / enterprise value, valeur des capitaux propres / equity value et vocabulaire des cash flows",
      },
      coreFacts: [
        {
          en: "Enterprise value and equity value represent different claims and should not be used interchangeably.",
          fr: "La valeur d’entreprise / enterprise value et la valeur des capitaux propres / equity value représentent des créances différentes et ne doivent pas être confondues.",
        },
        {
          en: "A multiple is only meaningful when numerator and denominator correspond economically.",
          fr: "Un multiple n’est pertinent que lorsque numérateur et dénominateur correspondent économiquement.",
        },
        {
          en: "Discount rate, cost of capital and required return overlap conceptually but are not always identical in application.",
          fr: "Taux d’actualisation / discount rate, coût du capital / cost of capital et rendement exigé / required return se recoupent conceptuellement mais ne sont pas toujours identiques en pratique.",
        },
        {
          en: "Dilution means an existing holder's ownership percentage or per-share claim can fall when new shares or equivalents are issued.",
          fr: "La dilution / dilution signifie que le pourcentage de détention ou la créance par action d’un actionnaire existant peut diminuer lorsque de nouvelles actions ou équivalents sont émis.",
        },
      ],
      explanation: {
        Beginner: {
          en: "Equity value is the value belonging to shareholders. Enterprise value is a broader value of the operating business available to all capital providers before allocating value between debt and equity.",
          fr: "La valeur des capitaux propres / equity value correspond à la valeur revenant aux actionnaires. La valeur d’entreprise / enterprise value est une mesure plus large de la valeur des opérations avant répartition entre dette / debt et capitaux propres / equity.",
        },
        Intermediate: {
          en: "This distinction explains why EV/EBITDA is an enterprise multiple while P/E is an equity multiple. EBITDA is before interest to debt holders, while net income is after interest and belongs lower in the capital structure.",
          fr: "Cette distinction explique pourquoi EV/EBITDA est un multiple d’entreprise / enterprise multiple alors que P/E est un multiple d’actions / equity multiple. EBITDA est calculé avant intérêts versés aux créanciers, tandis que le résultat net / net income est après intérêts et correspond davantage à la créance actionnariale.",
        },
        Professional: {
          en: "Valuation vocabulary encodes claim seniority and cash-flow ownership. Analysts should match unlevered cash flows with enterprise discount rates and levered equity cash flows with equity-required returns, while adjusting for non-operating assets and debt-like claims.",
          fr: "Le vocabulaire de valorisation encode la priorité des créances / claim seniority et la propriété des cash flows. Les analystes associent les flux non levier / unlevered cash flows à un taux d’actualisation d’entreprise et les flux d’equity levier / levered equity cash flows au rendement exigé des actionnaires, tout en ajustant les actifs non opérationnels et passifs assimilables à de la dette.",
        },
      },
      vocabulary: [
        {
          en: "Enterprise value",
          fr: "valeur d’entreprise / enterprise value",
          definition: {
            en: "Value of the operating business attributable to debt and equity capital providers before selected non-operating adjustments.",
            fr: "Valeur des opérations attribuable aux apporteurs de dette / debt et de capitaux propres / equity avant certains ajustements non opérationnels.",
          },
        },
        {
          en: "Equity value",
          fr: "valeur des capitaux propres / equity value",
          definition: {
            en: "Value attributable to common equity holders.",
            fr: "Valeur attribuable aux actionnaires ordinaires / common equity holders.",
          },
        },
        {
          en: "DCF",
          fr: "actualisation des flux de trésorerie / discounted cash flow",
          definition: {
            en: "Valuation framework that discounts forecast cash flows to present value.",
            fr: "Méthode de valorisation actualisant les cash flows prévisionnels en valeur actuelle / present value.",
          },
        },
        {
          en: "Terminal value",
          fr: "valeur terminale / terminal value",
          definition: {
            en: "Estimated value of cash flows beyond the explicit forecast period.",
            fr: "Valeur estimée des cash flows au-delà de la période de prévision explicite.",
          },
        },
        {
          en: "WACC",
          fr: "coût moyen pondéré du capital / weighted average cost of capital",
          definition: {
            en: "Weighted required return across debt and equity financing under a standard corporate-finance framework.",
            fr: "Rendement exigé pondéré entre financement par dette / debt et capitaux propres / equity dans un cadre standard de finance d’entreprise.",
          },
        },
        {
          en: "Multiple",
          fr: "multiple de valorisation / valuation multiple",
          definition: {
            en: "Ratio comparing a value measure with an operating or financial metric.",
            fr: "Ratio comparant une mesure de valeur à une métrique opérationnelle ou financière.",
          },
        },
        {
          en: "Accretion / dilution",
          fr: "relution / dilution / accretion / dilution",
          definition: {
            en: "Increase or decrease in a per-share metric after a transaction, depending on the metric and assumptions.",
            fr: "Hausse ou baisse d’une métrique par action après une transaction selon la métrique et les hypothèses utilisées.",
          },
        },
        {
          en: "Capital structure",
          fr: "structure du capital / capital structure",
          definition: {
            en: "Mix of debt, equity and other financing claims used by a company.",
            fr: "Combinaison de dette / debt, capitaux propres / equity et autres sources de financement d’une entreprise.",
          },
        },
      ],
    },
    {
      id: "market-language",
      kicker: { en: "03 · MARKET & TRADING LANGUAGE", fr: "03 · VOCABULAIRE DE MARCHÉ & TRADING" },
      title: {
        en: "Bid, ask, spread, liquidity and execution",
        fr: "Prix acheteur / bid, prix vendeur / ask, écart / spread, liquidité / liquidity et exécution / execution",
      },
      coreFacts: [
        {
          en: "Bid is the price a buyer is willing to pay; ask or offer is the price a seller is willing to accept.",
          fr: "Le prix acheteur / bid est le prix qu’un acheteur est prêt à payer ; le prix vendeur / ask ou offer est le prix auquel un vendeur accepte de vendre.",
        },
        {
          en: "Bid-ask spread is a transaction-cost and liquidity concept, distinct from credit spread or yield spread.",
          fr: "L’écart bid-ask / bid-ask spread est un concept de coût de transaction et de liquidité, différent d’un spread de crédit / credit spread ou d’un écart de rendement / yield spread.",
        },
        {
          en: "Liquidity means the ability to transact meaningful size quickly with limited price impact, not simply the existence of a quoted price.",
          fr: "La liquidité / liquidity désigne la capacité à exécuter une taille significative rapidement avec un impact de prix limité, pas seulement l’existence d’un prix affiché.",
        },
        {
          en: "A long position benefits from price appreciation, while a short position generally benefits from price decline, subject to financing and other risks.",
          fr: "Une position acheteuse / long bénéficie généralement d’une hausse du prix, tandis qu’une position vendeuse / short bénéficie généralement d’une baisse, sous réserve des coûts de financement et autres risques.",
        },
      ],
      explanation: {
        Beginner: {
          en: "If a stock shows a bid of $99.90 and an ask of $100.00, buyers are currently bidding $99.90 while sellers are offering at $100.00. The $0.10 difference is the bid-ask spread.",
          fr: "Si une action affiche un bid à 99,90 $ et un ask à 100,00 $, les acheteurs proposent actuellement 99,90 $ tandis que les vendeurs demandent 100,00 $. La différence de 0,10 $ est l’écart bid-ask / bid-ask spread.",
        },
        Intermediate: {
          en: "Market vocabulary distinguishes price, size, liquidity and execution. A liquid market can absorb orders with limited slippage; a thin market may show a quote but move sharply when meaningful size trades.",
          fr: "Le vocabulaire de marché distingue prix, taille / size, liquidité / liquidity et exécution / execution. Un marché liquide peut absorber des ordres avec peu de slippage ; un marché peu profond / thin peut afficher un prix mais bouger fortement lorsqu’une taille significative est exécutée.",
        },
        Professional: {
          en: "Execution quality depends on spread, depth, volatility, information leakage, market impact and timing. 'Liquidity' is therefore a multi-dimensional market-microstructure concept rather than a binary property.",
          fr: "La qualité d’exécution dépend du spread, de la profondeur / depth, de la volatilité, des fuites d’information / information leakage, de l’impact de marché / market impact et du timing. La liquidité est donc un concept multidimensionnel de microstructure de marché plutôt qu’une propriété binaire.",
        },
      },
      vocabulary: [
        {
          en: "Bid",
          fr: "prix acheteur / bid",
          definition: {
            en: "Highest quoted price a buyer is currently willing to pay.",
            fr: "Prix coté le plus élevé qu’un acheteur est actuellement prêt à payer.",
          },
        },
        {
          en: "Ask / offer",
          fr: "prix vendeur / ask / offer",
          definition: {
            en: "Lowest quoted price a seller is currently willing to accept.",
            fr: "Prix coté le plus faible qu’un vendeur est actuellement prêt à accepter.",
          },
        },
        {
          en: "Bid-ask spread",
          fr: "écart achat-vente / bid-ask spread",
          definition: {
            en: "Difference between best ask and best bid.",
            fr: "Différence entre meilleur prix vendeur / ask et meilleur prix acheteur / bid.",
          },
        },
        {
          en: "Liquidity",
          fr: "liquidité / liquidity",
          definition: {
            en: "Ability to transact with limited delay and price impact.",
            fr: "Capacité à effectuer une transaction avec délai et impact de prix limités.",
          },
        },
        {
          en: "Slippage",
          fr: "écart d’exécution / slippage",
          definition: {
            en: "Difference between an expected execution price and the price actually achieved.",
            fr: "Différence entre le prix d’exécution attendu et le prix réellement obtenu.",
          },
        },
        {
          en: "Market depth",
          fr: "profondeur de marché / market depth",
          definition: {
            en: "Amount of executable interest available across price levels.",
            fr: "Quantité d’intérêt acheteur et vendeur exécutable à différents niveaux de prix.",
          },
        },
        {
          en: "Long",
          fr: "position acheteuse / long",
          definition: {
            en: "Exposure that generally benefits from an increase in the underlying value.",
            fr: "Exposition bénéficiant généralement d’une hausse de la valeur du sous-jacent.",
          },
        },
        {
          en: "Short",
          fr: "position vendeuse / short",
          definition: {
            en: "Exposure structured to benefit from a decline in the underlying value, with potentially asymmetric risks.",
            fr: "Exposition structurée pour bénéficier d’une baisse du sous-jacent, avec des risques pouvant être asymétriques.",
          },
        },
      ],
    },
    {
      id: "rates-fixed-income",
      kicker: { en: "04 · RATES & FIXED INCOME", fr: "04 · TAUX & OBLIGATIONS / FIXED INCOME" },
      title: {
        en: "Yield is not coupon, and duration is not simply maturity",
        fr: "Le rendement obligataire / yield n’est pas le coupon, et la duration n’est pas simplement la maturité",
      },
      coreFacts: [
        {
          en: "Coupon is a contractual payment rate or amount, while yield is a return measure implied by price and cash flows.",
          fr: "Le coupon est un taux ou paiement contractuel, tandis que le rendement obligataire / yield est une mesure de rendement implicite dans le prix et les cash flows.",
        },
        {
          en: "Yield curve describes yields across maturities or tenors for related debt instruments.",
          fr: "La courbe des taux / yield curve décrit les yields selon les maturités / maturities ou tenors d’instruments de dette comparables.",
        },
        {
          en: "Duration is a measure related to bond price sensitivity to yield changes, not simply the remaining years to maturity.",
          fr: "La duration est une mesure liée à la sensibilité du prix obligataire aux variations de yield, et non simplement au nombre d’années avant maturité.",
        },
        {
          en: "Basis point is one hundredth of a percentage point.",
          fr: "Un point de base / basis point correspond à un centième de point de pourcentage.",
        },
      ],
      explanation: {
        Beginner: {
          en: "A 5% coupon bond does not necessarily have a 5% yield. If the bond price moves above or below par, the return implied by the bond's cash flows changes even though the contractual coupon does not.",
          fr: "Une obligation avec coupon de 5 % n’a pas nécessairement un yield de 5 %. Si son prix passe au-dessus ou en dessous du pair / par, le rendement implicite des cash flows change même si le coupon contractuel ne change pas.",
        },
        Intermediate: {
          en: "Rates vocabulary separates policy rates, spot yields, forward rates and spreads. A curve can steepen or flatten because short and long maturities move by different amounts.",
          fr: "Le vocabulaire de taux distingue taux directeurs / policy rates, taux spot / spot yields, taux forward / forward rates et spreads. Une courbe peut se pentifier / steepen ou s’aplatir / flatten parce que les maturités courtes et longues ne bougent pas du même montant.",
        },
        Professional: {
          en: "Fixed-income language is convention-heavy. Yield measures depend on compounding, day count, settlement and embedded-option assumptions. Professionals therefore specify which yield or spread measure they mean rather than using 'yield' generically.",
          fr: "Le langage obligataire dépend fortement des conventions. Les mesures de yield varient selon capitalisation / compounding, day count, settlement et hypothèses sur options intégrées. Les professionnels précisent donc le type exact de yield ou spread plutôt que d’utiliser un terme générique.",
        },
      },
      vocabulary: [
        {
          en: "Yield",
          fr: "rendement obligataire / yield",
          definition: {
            en: "A return measure linked to an instrument's price and expected cash flows under a specified convention.",
            fr: "Mesure de rendement liée au prix d’un instrument et à ses cash flows attendus selon une convention donnée.",
          },
        },
        {
          en: "Coupon",
          fr: "coupon",
          definition: {
            en: "Contractual interest payment on a bond, often stated as a rate of face value.",
            fr: "Paiement d’intérêt contractuel d’une obligation, souvent exprimé en pourcentage de la valeur nominale.",
          },
        },
        {
          en: "Maturity",
          fr: "échéance / maturity",
          definition: {
            en: "Date when the principal is contractually due, subject to instrument terms.",
            fr: "Date à laquelle le principal doit contractuellement être remboursé selon les termes de l’instrument.",
          },
        },
        {
          en: "Duration",
          fr: "duration / sensibilité de taux",
          definition: {
            en: "Measure related to bond-price sensitivity to changes in yield.",
            fr: "Mesure liée à la sensibilité du prix d’une obligation aux variations de yield.",
          },
        },
        {
          en: "Yield curve",
          fr: "courbe des taux / yield curve",
          definition: {
            en: "Relationship between yields and maturities for comparable debt instruments.",
            fr: "Relation entre yields et maturités d’instruments de dette comparables.",
          },
        },
        {
          en: "Basis point",
          fr: "point de base / basis point",
          definition: {
            en: "0.01 percentage point; 100 basis points equal 1 percentage point.",
            fr: "0,01 point de pourcentage ; 100 points de base correspondent à 1 point de pourcentage.",
          },
        },
        {
          en: "Steepening",
          fr: "pentification de la courbe / steepening",
          definition: {
            en: "Increase in the slope between selected longer- and shorter-maturity yields.",
            fr: "Augmentation de la pente entre certains yields longs et courts.",
          },
        },
        {
          en: "Flattening",
          fr: "aplatissement de la courbe / flattening",
          definition: {
            en: "Decrease in the slope between selected longer- and shorter-maturity yields.",
            fr: "Réduction de la pente entre certains yields longs et courts.",
          },
        },
      ],
    },
    {
      id: "credit-language",
      kicker: { en: "05 · CREDIT", fr: "05 · CRÉDIT / CREDIT" },
      title: {
        en: "Spread, default, recovery and seniority describe different risks",
        fr: "Spread, défaut / default, taux de recouvrement / recovery et séniorité / seniority décrivent différents risques",
      },
      coreFacts: [
        {
          en: "Credit spread is compensation relative to a reference yield for credit and related risks, depending on the measure.",
          fr: "Le spread de crédit / credit spread est une rémunération par rapport à un yield de référence pour le risque de crédit et risques associés, selon la mesure utilisée.",
        },
        {
          en: "Default means failure to meet contractual obligations under the instrument terms, not simply a fall in market price.",
          fr: "Un défaut / default signifie le non-respect d’obligations contractuelles selon les termes de l’instrument, pas simplement une baisse du prix de marché.",
        },
        {
          en: "Recovery rate describes value recovered after default relative to a specified claim basis.",
          fr: "Le taux de recouvrement / recovery rate décrit la valeur récupérée après défaut relativement à une base de créance donnée.",
        },
        {
          en: "Seniority determines priority of claims in the capital structure, subject to legal structure and collateral.",
          fr: "La séniorité / seniority détermine la priorité des créances dans la structure du capital, sous réserve de la structure juridique et des sûretés / collateral.",
        },
      ],
      explanation: {
        Beginner: {
          en: "A corporate bond may yield more than a government bond because investors demand compensation for the possibility that the company may not repay fully or on time. The difference is often discussed as a credit spread, although exact spread measures vary.",
          fr: "Une obligation d’entreprise peut offrir un yield supérieur à une obligation souveraine car les investisseurs demandent une compensation pour le risque que l’entreprise ne rembourse pas totalement ou à temps. Cette différence est souvent décrite comme un spread de crédit / credit spread, même si les mesures exactes de spread varient.",
        },
        Intermediate: {
          en: "Credit language distinguishes probability of default from loss given default. A risky issuer can still have high recovery if debt is well collateralized and senior, while an unsecured junior claim may recover much less.",
          fr: "Le langage du crédit distingue probabilité de défaut / probability of default et perte en cas de défaut / loss given default. Un émetteur risqué peut conserver un recovery élevé si la dette est bien sécurisée et senior, tandis qu’une créance junior non sécurisée peut récupérer beaucoup moins.",
        },
        Professional: {
          en: "Spread is a market price of several risks: expected credit loss, liquidity, uncertainty, technicals and risk premium. Analysts separate fundamental credit quality from spread valuation because a good company can still have an expensive bond and vice versa.",
          fr: "Le spread est un prix de marché combinant plusieurs risques : perte de crédit attendue, liquidité, incertitude, facteurs techniques / technicals et prime de risque. Les analystes distinguent qualité fondamentale du crédit et valorisation du spread car une bonne entreprise peut avoir une obligation chère, et inversement.",
        },
      },
      vocabulary: [
        {
          en: "Credit spread",
          fr: "écart de crédit / credit spread",
          definition: {
            en: "Yield or spread premium versus a reference associated with credit and related risks.",
            fr: "Prime de yield ou de spread par rapport à une référence associée au risque de crédit et aux risques connexes.",
          },
        },
        {
          en: "Default",
          fr: "défaut / default",
          definition: {
            en: "Failure to satisfy a contractual credit obligation under its terms.",
            fr: "Non-respect d’une obligation contractuelle de crédit selon ses termes.",
          },
        },
        {
          en: "Recovery rate",
          fr: "taux de recouvrement / recovery rate",
          definition: {
            en: "Portion of a claim recovered after default under a specified measurement basis.",
            fr: "Part d’une créance récupérée après défaut selon une base de mesure donnée.",
          },
        },
        {
          en: "Loss given default",
          fr: "perte en cas de défaut / loss given default",
          definition: {
            en: "Loss severity conditional on default, often related to one minus recovery.",
            fr: "Sévérité de la perte conditionnelle au défaut, souvent liée à un moins le taux de recouvrement.",
          },
        },
        {
          en: "Investment grade",
          fr: "catégorie investissement / investment grade",
          definition: {
            en: "Credit-rating category above the conventional speculative-grade cutoff under rating-agency scales.",
            fr: "Catégorie de notation située au-dessus du seuil conventionnel de speculative grade selon les échelles des agences.",
          },
        },
        {
          en: "High yield",
          fr: "haut rendement / high yield",
          definition: {
            en: "Credit market segment below the conventional investment-grade rating threshold.",
            fr: "Segment du marché du crédit situé sous le seuil conventionnel investment grade.",
          },
        },
        {
          en: "Seniority",
          fr: "séniorité / seniority",
          definition: {
            en: "Priority of a claim relative to other claims.",
            fr: "Priorité d’une créance par rapport aux autres créances.",
          },
        },
        {
          en: "Collateral",
          fr: "sûreté / collateral",
          definition: {
            en: "Assets pledged or otherwise securing a borrowing obligation.",
            fr: "Actifs donnés en garantie ou servant autrement à sécuriser une obligation d’emprunt.",
          },
        },
      ],
    },
    {
      id: "equity-investing",
      kicker: { en: "06 · EQUITIES & INVESTING", fr: "06 · ACTIONS & INVESTISSEMENT / EQUITIES" },
      title: {
        en: "Shares, market cap, EPS, catalysts and guidance",
        fr: "Actions / shares, capitalisation / market cap, BPA / EPS, catalyseurs / catalysts et prévisions / guidance",
      },
      coreFacts: [
        {
          en: "Stock and share are often used interchangeably in everyday finance, while equity can refer more broadly to ownership capital.",
          fr: "Action / stock et action / share sont souvent utilisés de manière interchangeable en pratique, tandis que capitaux propres / equity peut désigner plus largement le capital de propriété.",
        },
        {
          en: "Market capitalization equals share price times shares outstanding under the chosen share count.",
          fr: "La capitalisation boursière / market capitalization correspond au prix de l’action multiplié par le nombre d’actions en circulation / shares outstanding selon le nombre retenu.",
        },
        {
          en: "EPS is earnings per share; it differs from total net income because it incorporates share count.",
          fr: "Le BPA / EPS correspond au bénéfice par action / earnings per share ; il diffère du net income total car il intègre le nombre d’actions.",
        },
        {
          en: "A catalyst is an event or development expected to change market expectations or valuation.",
          fr: "Un catalyseur / catalyst est un événement ou développement susceptible de modifier les attentes du marché ou la valorisation.",
        },
      ],
      explanation: {
        Beginner: {
          en: "If a company has 100 million shares and each trades at $20, its market capitalization is $2 billion. If it earns $200 million, simple EPS is $2 per share before considering dilution conventions.",
          fr: "Si une entreprise possède 100 millions d’actions / shares et que chacune vaut 20 $, sa capitalisation boursière / market cap est de 2 milliards de dollars. Si elle réalise 200 millions de dollars de résultat, le BPA / EPS simple est de 2 $ par action avant prise en compte des conventions de dilution.",
        },
        Intermediate: {
          en: "Equity research vocabulary separates fundamentals from expectations. A company can report strong absolute results but miss consensus, lower guidance or reveal weaker margins, causing the stock to fall.",
          fr: "Le vocabulaire de recherche actions / equity research distingue fondamentaux et attentes. Une entreprise peut publier de bons résultats absolus mais manquer le consensus, abaisser ses prévisions / guidance ou révéler des marges plus faibles, entraînant une baisse du titre.",
        },
        Professional: {
          en: "Equity language often describes the path from thesis to catalyst to earnings revisions to multiple re-rating. 'Upside' and 'downside' are relative to a reference price or scenario and should be stated explicitly.",
          fr: "Le langage actions décrit souvent la chaîne thèse / thesis → catalyseur / catalyst → révisions de bénéfices / earnings revisions → revalorisation du multiple / multiple re-rating. Potentiel haussier / upside et risque baissier / downside sont relatifs à un prix ou scénario de référence et doivent être précisés.",
        },
      },
      vocabulary: [
        {
          en: "Share / stock",
          fr: "action / share / stock",
          definition: {
            en: "Unit of equity ownership in a company.",
            fr: "Unité de participation en capitaux propres / equity d’une entreprise.",
          },
        },
        {
          en: "Market capitalization",
          fr: "capitalisation boursière / market capitalization",
          definition: {
            en: "Share price multiplied by the relevant shares outstanding.",
            fr: "Prix de l’action multiplié par le nombre pertinent d’actions en circulation / shares outstanding.",
          },
        },
        {
          en: "EPS",
          fr: "bénéfice par action / earnings per share",
          definition: {
            en: "Earnings allocated per share under the relevant accounting share-count convention.",
            fr: "Bénéfice attribué par action selon la convention comptable pertinente de nombre d’actions.",
          },
        },
        {
          en: "Guidance",
          fr: "prévisions communiquées par la direction / guidance",
          definition: {
            en: "Forward-looking information management provides about expected performance.",
            fr: "Informations prospectives fournies par la direction sur la performance attendue.",
          },
        },
        {
          en: "Catalyst",
          fr: "catalyseur / catalyst",
          definition: {
            en: "Event expected to change investor expectations or valuation.",
            fr: "Événement susceptible de modifier les attentes des investisseurs ou la valorisation.",
          },
        },
        {
          en: "Consensus",
          fr: "consensus",
          definition: {
            en: "Summary of analyst or market expectations for a metric.",
            fr: "Synthèse des attentes d’analystes ou du marché pour une métrique.",
          },
        },
        {
          en: "Upside",
          fr: "potentiel haussier / upside",
          definition: {
            en: "Potential increase relative to a stated reference value.",
            fr: "Hausse potentielle par rapport à une valeur de référence précisée.",
          },
        },
        {
          en: "Downside",
          fr: "risque baissier / downside",
          definition: {
            en: "Potential decrease or adverse scenario relative to a reference.",
            fr: "Baisse potentielle ou scénario défavorable par rapport à une référence.",
          },
        },
      ],
    },
    {
      id: "derivatives-language",
      kicker: { en: "07 · DERIVATIVES", fr: "07 · PRODUITS DÉRIVÉS / DERIVATIVES" },
      title: {
        en: "Forward, future, option and hedge describe contracts and purposes",
        fr: "Forward, future, option et couverture / hedge décrivent des contrats et des objectifs différents",
      },
      coreFacts: [
        {
          en: "A forward and a future both create obligations linked to a future transaction, but contract structure and trading venue differ.",
          fr: "Un forward et un future créent tous deux des obligations liées à une transaction future, mais leur structure contractuelle et leur lieu de négociation diffèrent.",
        },
        {
          en: "An option gives the holder a right, not an obligation, subject to contract terms.",
          fr: "Une option donne au détenteur un droit et non une obligation, selon les termes du contrat.",
        },
        {
          en: "Hedging aims to reduce or reshape risk; speculation intentionally takes risk to seek return.",
          fr: "La couverture / hedging vise à réduire ou remodeler un risque ; la spéculation / speculation prend intentionnellement un risque pour rechercher un rendement.",
        },
        {
          en: "Delta, gamma, vega and theta describe different option sensitivities and should not be used interchangeably.",
          fr: "Delta, gamma, vega et theta décrivent différentes sensibilités d’options et ne doivent pas être confondus.",
        },
      ],
      explanation: {
        Beginner: {
          en: "A call option gives the holder the right to buy under specified terms; a put gives the right to sell. Buying an option is different from entering a forward because the holder has a choice rather than a symmetric future obligation.",
          fr: "Une option d’achat / call donne au détenteur le droit d’acheter selon des termes définis ; une option de vente / put donne le droit de vendre. Acheter une option est différent d’entrer dans un forward car le détenteur possède un choix plutôt qu’une obligation future symétrique.",
        },
        Intermediate: {
          en: "Derivative vocabulary describes payoff geometry. Delta measures first-order sensitivity to the underlying, gamma the change in delta, vega sensitivity to implied volatility and theta sensitivity to passage of time.",
          fr: "Le vocabulaire des dérivés décrit la géométrie du payoff. Delta mesure la sensibilité de premier ordre au sous-jacent / underlying, gamma la variation du delta, vega la sensibilité à la volatilité implicite / implied volatility et theta la sensibilité au passage du temps.",
        },
        Professional: {
          en: "A hedge rarely eliminates every risk because basis risk, convexity, volatility, liquidity and model assumptions remain. Professionals specify what risk is hedged and with which instrument rather than saying a position is simply 'hedged'.",
          fr: "Une couverture / hedge élimine rarement tous les risques car risque de base / basis risk, convexité / convexity, volatilité, liquidité et hypothèses de modèle subsistent. Les professionnels précisent quel risque est couvert et avec quel instrument plutôt que de dire qu’une position est simplement « couverte ».",
        },
      },
      vocabulary: [
        {
          en: "Forward",
          fr: "contrat à terme de gré à gré / forward",
          definition: {
            en: "Contract to transact an underlying at a future date under agreed terms, typically over the counter.",
            fr: "Contrat prévoyant une transaction future sur un sous-jacent selon des termes convenus, généralement de gré à gré / OTC.",
          },
        },
        {
          en: "Future",
          fr: "contrat à terme standardisé / future",
          definition: {
            en: "Standardized exchange-traded forward-like contract with margining and clearing conventions.",
            fr: "Contrat à terme standardisé négocié sur marché organisé avec conventions de marge / margining et compensation / clearing.",
          },
        },
        {
          en: "Call",
          fr: "option d’achat / call",
          definition: {
            en: "Option giving the holder the right to buy the underlying under specified terms.",
            fr: "Option donnant au détenteur le droit d’acheter le sous-jacent selon des conditions définies.",
          },
        },
        {
          en: "Put",
          fr: "option de vente / put",
          definition: {
            en: "Option giving the holder the right to sell the underlying under specified terms.",
            fr: "Option donnant au détenteur le droit de vendre le sous-jacent selon des conditions définies.",
          },
        },
        {
          en: "Strike",
          fr: "prix d’exercice / strike",
          definition: {
            en: "Contractual exercise price of an option.",
            fr: "Prix contractuel auquel l’option peut être exercée.",
          },
        },
        {
          en: "Implied volatility",
          fr: "volatilité implicite / implied volatility",
          definition: {
            en: "Volatility parameter implied by an option price under a pricing model.",
            fr: "Paramètre de volatilité implicite dans le prix d’une option selon un modèle de valorisation.",
          },
        },
        {
          en: "Hedge",
          fr: "couverture / hedge",
          definition: {
            en: "Position designed to offset or reshape a specified risk.",
            fr: "Position conçue pour compenser ou remodeler un risque précis.",
          },
        },
        {
          en: "Underlying",
          fr: "sous-jacent / underlying",
          definition: {
            en: "Asset, rate, index or variable on which a derivative payoff depends.",
            fr: "Actif, taux, indice ou variable dont dépend le payoff d’un produit dérivé.",
          },
        },
      ],
    },
    {
      id: "portfolio-risk-language",
      kicker: { en: "08 · PORTFOLIO & RISK", fr: "08 · PORTEFEUILLE & RISQUE / PORTFOLIO & RISK" },
      title: {
        en: "Allocation, exposure, beta, drawdown and attribution",
        fr: "Allocation, exposition / exposure, beta, drawdown et attribution de performance / attribution",
      },
      coreFacts: [
        {
          en: "Allocation describes how capital or risk is distributed across assets, strategies or categories.",
          fr: "L’allocation décrit la manière dont le capital ou le risque est réparti entre actifs, stratégies ou catégories.",
        },
        {
          en: "Exposure measures sensitivity or amount at risk to a position, asset, factor or market.",
          fr: "L’exposition / exposure mesure la sensibilité ou le montant exposé à une position, un actif, un facteur ou un marché.",
        },
        {
          en: "Drawdown measures decline from a prior peak and differs from volatility.",
          fr: "Le drawdown mesure la baisse depuis un sommet antérieur et diffère de la volatilité / volatility.",
        },
        {
          en: "Performance attribution explains where portfolio returns came from rather than merely reporting total return.",
          fr: "L’attribution de performance / performance attribution explique l’origine des rendements du portefeuille plutôt que de simplement afficher le rendement total.",
        },
      ],
      explanation: {
        Beginner: {
          en: "A portfolio can be 60% equities and 40% bonds by capital allocation, but its risk may not be split 60/40 because equities may contribute much more volatility. Capital weight and risk contribution are different ideas.",
          fr: "Un portefeuille peut être alloué à 60 % en actions / equities et 40 % en obligations / bonds en poids de capital, mais son risque ne sera pas forcément réparti 60/40 car les actions peuvent contribuer beaucoup plus à la volatilité. Poids de capital et contribution au risque sont deux notions différentes.",
        },
        Intermediate: {
          en: "Portfolio language distinguishes absolute return, benchmark-relative return, alpha, beta and tracking error. The same portfolio can have positive absolute return but negative relative performance versus its benchmark.",
          fr: "Le langage de portefeuille distingue rendement absolu / absolute return, rendement relatif au benchmark, alpha, beta et tracking error. Un portefeuille peut afficher un rendement absolu positif mais une performance relative négative face à son indice de référence / benchmark.",
        },
        Professional: {
          en: "Risk communication should specify exposure by factor, gross versus net, liquidity and horizon. A low-volatility portfolio can still contain concentrated tail or liquidity risk that standard deviation does not reveal.",
          fr: "La communication du risque doit préciser exposition par facteur, exposition brute / gross versus nette / net, liquidité et horizon. Un portefeuille à faible volatilité peut malgré tout concentrer du tail risk ou du risque de liquidité non visible dans l’écart-type.",
        },
      },
      vocabulary: [
        {
          en: "Asset allocation",
          fr: "allocation d’actifs / asset allocation",
          definition: {
            en: "Distribution of a portfolio across asset classes or strategies.",
            fr: "Répartition d’un portefeuille entre classes d’actifs ou stratégies.",
          },
        },
        {
          en: "Exposure",
          fr: "exposition / exposure",
          definition: {
            en: "Economic sensitivity or amount linked to a position, market or risk factor.",
            fr: "Sensibilité économique ou montant lié à une position, un marché ou un facteur de risque.",
          },
        },
        {
          en: "Benchmark",
          fr: "indice de référence / benchmark",
          definition: {
            en: "Reference portfolio or index used for comparison.",
            fr: "Portefeuille ou indice de référence utilisé pour comparer la performance.",
          },
        },
        {
          en: "Alpha",
          fr: "alpha",
          definition: {
            en: "Return component interpreted as beyond modeled benchmark or factor exposure, depending on methodology.",
            fr: "Composante de rendement interprétée comme supérieure à celle expliquée par un benchmark ou des facteurs selon la méthodologie.",
          },
        },
        {
          en: "Beta",
          fr: "beta",
          definition: {
            en: "Sensitivity of an asset or portfolio to a specified market or factor.",
            fr: "Sensibilité d’un actif ou portefeuille à un marché ou facteur donné.",
          },
        },
        {
          en: "Drawdown",
          fr: "baisse depuis un sommet / drawdown",
          definition: {
            en: "Decline from a prior peak to a subsequent trough.",
            fr: "Baisse entre un sommet antérieur et un point bas ultérieur.",
          },
        },
        {
          en: "Tracking error",
          fr: "écart de suivi / tracking error",
          definition: {
            en: "Volatility of active return relative to a benchmark.",
            fr: "Volatilité du rendement actif / active return par rapport à un benchmark.",
          },
        },
        {
          en: "Attribution",
          fr: "attribution de performance / performance attribution",
          definition: {
            en: "Decomposition of portfolio performance into sources such as allocation, selection or factors.",
            fr: "Décomposition de la performance en sources comme allocation, sélection de titres / selection ou facteurs.",
          },
        },
      ],
    },
    {
      id: "banking-interview-language",
      kicker: { en: "09 · BANKING & INTERVIEW LANGUAGE", fr: "09 · BANQUE & ENTRETIENS / BANKING & INTERVIEWS" },
      title: {
        en: "Pitch, deal, mandate, book, desk and market view",
        fr: "Pitch, transaction / deal, mandat / mandate, book, desk et vue de marché / market view",
      },
      coreFacts: [
        {
          en: "A desk is a functional trading or sales unit; a book is a portfolio of positions or business tracked together.",
          fr: "Un desk est une unité fonctionnelle de trading ou de vente / sales ; un book est un ensemble de positions ou d’activité suivi comme un portefeuille.",
        },
        {
          en: "A mandate is an authorized client engagement, while a pitch is a proposal intended to win business.",
          fr: "Un mandat / mandate est un engagement client autorisé, tandis qu’un pitch est une proposition destinée à remporter un mandat.",
        },
        {
          en: "A deal or transaction can refer to M&A, financing, issuance or another executed transaction depending on context.",
          fr: "Une transaction / deal peut désigner une opération de M&A, financement, émission ou autre transaction exécutée selon le contexte.",
        },
        {
          en: "Interview language should be concise, structured and technically precise rather than filled with unexplained jargon.",
          fr: "Le langage d’entretien / interview doit être concis, structuré et techniquement précis plutôt que rempli de jargon non expliqué.",
        },
      ],
      explanation: {
        Beginner: {
          en: "If an interviewer asks for your 'market view', they want your current interpretation of markets supported by evidence and risks — not just whether you feel bullish or bearish.",
          fr: "Si un recruteur te demande ta vue de marché / market view, il attend ton interprétation actuelle des marchés appuyée par des éléments concrets et des risques — pas simplement si tu es haussière / bullish ou baissière / bearish.",
        },
        Intermediate: {
          en: "A strong finance answer often follows: view, evidence, mechanism, risk and invalidation. This vocabulary makes the answer sound professional because each word has a precise analytical role.",
          fr: "Une bonne réponse finance suit souvent : vue / view, preuves / evidence, mécanisme / mechanism, risque / risk et condition d’invalidation / invalidation. Ce vocabulaire rend la réponse professionnelle car chaque mot possède un rôle analytique précis.",
        },
        Professional: {
          en: "Professional fluency means choosing the correct term for the business context. 'Client flow', 'inventory', 'risk limits', 'pipeline', 'mandate' and 'book' have desk-specific meanings, so candidates should demonstrate understanding without pretending all roles use identical language.",
          fr: "La maîtrise professionnelle consiste à choisir le bon terme selon le contexte métier. Flux client / client flow, inventaire / inventory, limites de risque / risk limits, pipeline, mandat / mandate et book possèdent des significations spécifiques aux métiers ; un candidat doit montrer qu’il les comprend sans prétendre que tous les rôles utilisent exactement le même vocabulaire.",
        },
      },
      comparison: {
        title: { en: "Common professional terms", fr: "Termes professionnels courants" },
        headers: [
          { en: "English term", fr: "Terme anglais" },
          { en: "French meaning", fr: "Sens en français" },
          { en: "Context", fr: "Contexte" },
        ],
        rows: [
          { cells: [
            { en: "Pitch", fr: "Pitch" },
            { en: "Client proposal", fr: "Présentation ou proposition commerciale" },
            { en: "Banking / sales", fr: "Banque / banking · vente / sales" },
          ]},
          { cells: [
            { en: "Mandate", fr: "Mandat / mandate" },
            { en: "Authorized client engagement", fr: "Mission officiellement confiée par le client" },
            { en: "Investment banking", fr: "Banque d’investissement / investment banking" },
          ]},
          { cells: [
            { en: "Desk", fr: "Desk" },
            { en: "Functional market team", fr: "Équipe fonctionnelle de marché" },
            { en: "Sales & Trading", fr: "Sales & Trading" },
          ]},
          { cells: [
            { en: "Book", fr: "Book / portefeuille de positions" },
            { en: "Positions or business tracked together", fr: "Ensemble de positions ou d’activité suivi ensemble" },
            { en: "Trading / risk", fr: "Trading / risque" },
          ]},
        ],
      },
      vocabulary: [
        {
          en: "Pitch",
          fr: "présentation commerciale / pitch",
          definition: {
            en: "Proposal or presentation designed to win business or support an idea.",
            fr: "Proposition ou présentation destinée à gagner un mandat ou défendre une idée.",
          },
        },
        {
          en: "Mandate",
          fr: "mandat / mandate",
          definition: {
            en: "Formal client authorization to perform an advisory or financing role.",
            fr: "Autorisation formelle d’un client pour exercer un rôle de conseil ou de financement.",
          },
        },
        {
          en: "Deal",
          fr: "transaction / deal",
          definition: {
            en: "Transaction such as acquisition, financing, issuance or restructuring.",
            fr: "Opération comme acquisition, financement, émission ou restructuration.",
          },
        },
        {
          en: "Desk",
          fr: "desk / équipe de marché",
          definition: {
            en: "Functional unit within a markets business such as rates, FX or equities.",
            fr: "Unité fonctionnelle d’une activité de marchés comme taux / rates, FX ou actions / equities.",
          },
        },
        {
          en: "Book",
          fr: "book / portefeuille de positions",
          definition: {
            en: "Set of positions or exposures managed or tracked together.",
            fr: "Ensemble de positions ou expositions gérées ou suivies ensemble.",
          },
        },
        {
          en: "Pipeline",
          fr: "pipeline / portefeuille d’opportunités",
          definition: {
            en: "Potential future business or transactions at different stages of development.",
            fr: "Ensemble d’opportunités ou transactions potentielles à différents stades d’avancement.",
          },
        },
        {
          en: "Market view",
          fr: "vue de marché / market view",
          definition: {
            en: "Structured interpretation of market conditions, drivers and risks.",
            fr: "Interprétation structurée des conditions de marché, de leurs moteurs et de leurs risques.",
          },
        },
        {
          en: "Investment thesis",
          fr: "thèse d’investissement / investment thesis",
          definition: {
            en: "Structured argument explaining why an asset may perform in a certain way and what would invalidate the view.",
            fr: "Argument structuré expliquant pourquoi un actif pourrait évoluer d’une certaine manière et ce qui invaliderait cette vue.",
          },
        },
      ],
    },
  ],
  quiz: [
    {
      id: "q1",
      conceptKey: "revenue-profit",
      question: {
        en: "Which statement is correct?",
        fr: "Quelle affirmation est correcte ?",
      },
      options: [
        { id: "a", label: { en: "Revenue and net income are always identical", fr: "Le chiffre d’affaires / revenue et le résultat net / net income sont toujours identiques" } },
        { id: "b", label: { en: "Revenue is before relevant expenses; net income is after recognized expenses and other items", fr: "Le chiffre d’affaires / revenue est avant les dépenses pertinentes ; le résultat net / net income est après les dépenses reconnues et autres éléments" } },
        { id: "c", label: { en: "Cash is always equal to profit", fr: "Le cash est toujours égal au bénéfice / profit" } },
        { id: "d", label: { en: "Equity always means stock-market index", fr: "Equity signifie toujours indice boursier" } },
      ],
      correctOption: "b",
      explanation: {
        en: "Revenue is top-line sales recognition, while net income is a bottom-line profit measure after recognized costs and other items.",
        fr: "Le chiffre d’affaires / revenue est une mesure de ventes en haut du compte de résultat, tandis que le résultat net / net income est un bénéfice final après coûts et autres éléments reconnus.",
      },
    },
    {
      id: "q2",
      conceptKey: "enterprise-equity-value",
      question: {
        en: "Which pairing is conceptually consistent?",
        fr: "Quelle association est conceptuellement cohérente ?",
      },
      options: [
        { id: "a", label: { en: "Enterprise value with EBITDA", fr: "Valeur d’entreprise / enterprise value avec EBITDA" } },
        { id: "b", label: { en: "Equity value with debt interest before tax only", fr: "Equity value avec uniquement les intérêts de dette avant impôt" } },
        { id: "c", label: { en: "Market cap equals enterprise value in every company", fr: "La capitalisation / market cap est toujours égale à enterprise value" } },
        { id: "d", label: { en: "WACC is always identical to cost of equity", fr: "Le WACC est toujours identique au coût des capitaux propres / cost of equity" } },
      ],
      correctOption: "a",
      explanation: {
        en: "EV/EBITDA is a standard enterprise-level matching because EBITDA is before interest allocated to debt holders.",
        fr: "EV/EBITDA est une association standard au niveau entreprise car EBITDA est calculé avant les intérêts revenant aux créanciers.",
      },
    },
    {
      id: "q3",
      conceptKey: "bid-ask",
      question: {
        en: "A market shows bid 99.90 and ask 100.00. What is the bid-ask spread?",
        fr: "Un marché affiche bid 99,90 et ask 100,00. Quel est le bid-ask spread ?",
      },
      options: [
        { id: "a", label: { en: "0.01", fr: "0,01" } },
        { id: "b", label: { en: "0.10", fr: "0,10" } },
        { id: "c", label: { en: "99.90", fr: "99,90" } },
        { id: "d", label: { en: "199.90", fr: "199,90" } },
      ],
      correctOption: "b",
      explanation: {
        en: "100.00−99.90 = 0.10.",
        fr: "100,00−99,90 = 0,10.",
      },
    },
    {
      id: "q4",
      conceptKey: "yield-coupon",
      question: {
        en: "Why can a bond's yield differ from its coupon?",
        fr: "Pourquoi le yield d’une obligation peut-il différer de son coupon ?",
      },
      options: [
        { id: "a", label: { en: "Because yield depends on market price and cash flows", fr: "Parce que le yield dépend du prix de marché et des cash flows" } },
        { id: "b", label: { en: "Because coupon changes every second", fr: "Parce que le coupon change chaque seconde" } },
        { id: "c", label: { en: "Because maturity never matters", fr: "Parce que la maturité ne compte jamais" } },
        { id: "d", label: { en: "They can never differ", fr: "Ils ne peuvent jamais être différents" } },
      ],
      correctOption: "a",
      explanation: {
        en: "Coupon is contractual while yield is a return measure implied by price and cash flows.",
        fr: "Le coupon est contractuel tandis que le yield est une mesure de rendement implicite dans le prix et les cash flows.",
      },
    },
    {
      id: "q5",
      conceptKey: "credit-default-recovery",
      question: {
        en: "Which term describes the portion of a credit claim recovered after default?",
        fr: "Quel terme décrit la part d’une créance récupérée après défaut / default ?",
      },
      options: [
        { id: "a", label: { en: "Recovery rate", fr: "Taux de recouvrement / recovery rate" } },
        { id: "b", label: { en: "Bid-ask spread", fr: "Bid-ask spread" } },
        { id: "c", label: { en: "Market cap", fr: "Capitalisation boursière / market cap" } },
        { id: "d", label: { en: "Gamma", fr: "Gamma" } },
      ],
      correctOption: "a",
      explanation: {
        en: "Recovery rate measures how much value is recovered after default under the stated basis.",
        fr: "Le taux de recouvrement / recovery rate mesure la valeur récupérée après défaut selon la base définie.",
      },
    },
    {
      id: "q6",
      conceptKey: "market-cap-eps",
      question: {
        en: "A company has 100 million shares trading at $20. What is its market capitalization?",
        fr: "Une entreprise possède 100 millions d’actions cotant 20 $. Quelle est sa capitalisation boursière / market capitalization ?",
      },
      options: [
        { id: "a", label: { en: "$200 million", fr: "200 millions $" } },
        { id: "b", label: { en: "$2 billion", fr: "2 milliards $" } },
        { id: "c", label: { en: "$20 billion", fr: "20 milliards $" } },
        { id: "d", label: { en: "$120 million", fr: "120 millions $" } },
      ],
      correctOption: "b",
      explanation: {
        en: "100 million × $20 = $2 billion.",
        fr: "100 millions × 20 $ = 2 milliards $.",
      },
    },
    {
      id: "q7",
      conceptKey: "derivative-right-obligation",
      question: {
        en: "Which instrument gives its holder a right rather than a symmetric obligation, subject to contract terms?",
        fr: "Quel instrument donne à son détenteur un droit plutôt qu’une obligation symétrique, selon les termes du contrat ?",
      },
      options: [
        { id: "a", label: { en: "Option", fr: "Option" } },
        { id: "b", label: { en: "Standard forward", fr: "Forward standard" } },
        { id: "c", label: { en: "Common share", fr: "Action ordinaire / common share" } },
        { id: "d", label: { en: "Accounts payable", fr: "Dettes fournisseurs / accounts payable" } },
      ],
      correctOption: "a",
      explanation: {
        en: "An option gives the holder a contractual right; forwards and futures create future obligations for both sides.",
        fr: "Une option donne au détenteur un droit contractuel ; forwards et futures créent des obligations futures pour les deux parties.",
      },
    },
    {
      id: "q8",
      conceptKey: "market-view",
      question: {
        en: "What makes a professional market view stronger?",
        fr: "Qu’est-ce qui rend une vue de marché / market view plus professionnelle ?",
      },
      options: [
        { id: "a", label: { en: "A view supported by evidence, mechanism, risks and invalidation", fr: "Une vue appuyée par preuves, mécanisme, risques et condition d’invalidation" } },
        { id: "b", label: { en: "Using as much unexplained jargon as possible", fr: "Utiliser autant de jargon non expliqué que possible" } },
        { id: "c", label: { en: "Saying only bullish or bearish", fr: "Dire seulement bullish ou bearish" } },
        { id: "d", label: { en: "Ignoring what is already priced", fr: "Ignorer ce qui est déjà intégré dans les prix / priced" } },
      ],
      correctOption: "a",
      explanation: {
        en: "Professional communication links a clear view to evidence, a causal mechanism, key risks and what would invalidate the thesis.",
        fr: "Une communication professionnelle relie une vue claire à des preuves, un mécanisme causal, les principaux risques et ce qui invaliderait la thèse.",
      },
    },
  ],
  interviewPrompt: {
    question: {
      en: "In simple terms, explain the difference between revenue, EBITDA, net income and free cash flow.",
      fr: "Explique simplement la différence entre chiffre d’affaires / revenue, EBITDA, résultat net / net income et flux de trésorerie disponible / free cash flow.",
    },
    framework: [
      {
        en: "Revenue is the top line: recognized sales before expenses.",
        fr: "Le chiffre d’affaires / revenue est le haut du compte de résultat : ventes reconnues avant dépenses.",
      },
      {
        en: "EBITDA is an operating profitability proxy before interest, tax, depreciation and amortization.",
        fr: "EBITDA est une mesure de rentabilité opérationnelle avant intérêts, impôts, depreciation et amortization.",
      },
      {
        en: "Net income is bottom-line accounting profit after recognized expenses, interest, taxes and other items.",
        fr: "Le résultat net / net income est le bénéfice comptable final après dépenses reconnues, intérêts, impôts et autres éléments.",
      },
      {
        en: "Free cash flow focuses on cash generated after the cash needs required by the chosen definition, such as capital expenditures.",
        fr: "Le flux de trésorerie disponible / free cash flow se concentre sur le cash généré après les besoins de cash définis, par exemple les dépenses d’investissement / capex.",
      },
      {
        en: "Finish by saying none of these measures is universally 'best'; each answers a different analytical question.",
        fr: "Terminer en précisant qu’aucune de ces mesures n’est universellement « meilleure » : chacune répond à une question analytique différente.",
      },
    ],
    sample: {
      en: "Revenue is the company's top line: the sales it recognizes before expenses. EBITDA moves lower in the income statement and gives a rough view of operating profitability before interest, taxes, depreciation and amortization. Net income is the bottom-line accounting profit after those recognized expenses and other items. Free cash flow is different because it focuses on cash generation after the cash needs included in the chosen definition, such as capital expenditures. I would not say one metric is always better than the others; they answer different questions about scale, operating performance, shareholder earnings and cash generation.",
      fr: "Le chiffre d’affaires / revenue est le haut du compte de résultat : les ventes reconnues avant dépenses. EBITDA descend plus bas dans le compte de résultat et donne une vision approximative de la rentabilité opérationnelle avant intérêts, impôts, depreciation et amortization. Le résultat net / net income est le bénéfice comptable final après ces dépenses reconnues et les autres éléments. Le flux de trésorerie disponible / free cash flow est différent car il se concentre sur la génération de cash après les besoins de cash inclus dans la définition retenue, par exemple le capex. Je ne dirais pas qu’une métrique est toujours meilleure que les autres : elles répondent à différentes questions sur taille, performance opérationnelle, bénéfice actionnarial et génération de cash.",
    },
  },
};

export const lessons: FinanceLesson[] = [financialSystemLesson, stocksBondsFundsLesson, moneyBankingCentralBanksLesson, timeValueOfMoneyLesson, riskReturnDiversificationLesson, microeconomicsForFinanceLesson, macroeconomicsForMarketsLesson, financialAccountingILesson, statisticsProbabilityLesson, excelFoundationsForFinanceLesson, financialVocabularyFrEnLesson];

export function getLessonBySlug(slug: string) {
  return lessons.find((lesson) => lesson.slug === slug);
}

export function hasLessonContent(slug: string) {
  return lessons.some((lesson) => lesson.slug === slug);
}
