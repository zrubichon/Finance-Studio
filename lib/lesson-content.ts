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

export const lessons: FinanceLesson[] = [financialSystemLesson, stocksBondsFundsLesson];

export function getLessonBySlug(slug: string) {
  return lessons.find((lesson) => lesson.slug === slug);
}

export function hasLessonContent(slug: string) {
  return lessons.some((lesson) => lesson.slug === slug);
}
