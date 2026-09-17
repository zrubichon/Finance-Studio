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

export type LessonSection = {
  id: string;
  title: LocalizedText;
  kicker: LocalizedText;
  coreFacts: LocalizedText[];
  explanation: Record<TeachingMode, LocalizedText>;
  example?: LocalizedText;
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

export const lessons: FinanceLesson[] = [financialSystemLesson];

export function getLessonBySlug(slug: string) {
  return lessons.find((lesson) => lesson.slug === slug);
}

export function hasLessonContent(slug: string) {
  return lessons.some((lesson) => lesson.slug === slug);
}
