export type NewsCategory =
  | "all"
  | "markets"
  | "macro"
  | "central-banks"
  | "companies"
  | "geopolitics"
  | "policy";

export type LocalizedNewsText = {
  en: string;
  fr: string;
};

export type NewsInsight = {
  lens: LocalizedNewsText;
  whyItMatters: LocalizedNewsText;
  transmission: {
    en: string[];
    fr: string[];
  };
  assets: string[];
  watchNext: LocalizedNewsText;
  scenario: LocalizedNewsText;
};

export type NewsItem = {
  id: string;
  title: string;
  url: string;
  domain: string;
  publishedAt: string;
  sourceCountry: string;
  language: string;
  imageUrl: string | null;
  sourceQuality: "established" | "external";
  topics: Exclude<NewsCategory, "all">[];
  insight: NewsInsight;
};

export type NewsDataResponse = {
  category: NewsCategory;
  updatedAt: string;
  items: NewsItem[];
  provider: {
    id: "gdelt";
    label: string;
    status: "live" | "empty" | "error";
    message: string;
  };
};

const financeQuery =
  '("stock market" OR inflation OR "Federal Reserve" OR ECB OR "Bank of England" OR "Bank of Japan" OR earnings OR merger OR IPO OR bonds OR commodities OR currencies OR tariff OR sanctions OR "trade war" OR "export controls" OR oil OR OPEC OR ceasefire OR conflict OR war OR shipping OR "government shutdown" OR budget OR "debt ceiling" OR regulation OR antitrust OR "fiscal policy") sourcelang:english';

const categorySignals: Record<Exclude<NewsCategory, "all">, string[]> = {
  markets: [
    "market",
    "stocks",
    "stock ",
    "equities",
    "bond",
    "yield",
    "credit",
    "commodity",
    "commodities",
    "oil",
    "currency",
    "currencies",
    "dollar",
    "euro",
    "yen",
    "vix",
    "volatility",
    "treasury",
  ],
  macro: [
    "inflation",
    "jobs",
    "employment",
    "unemployment",
    "payroll",
    "gdp",
    "growth",
    "recession",
    "consumer",
    "wage",
    "economic",
    "retail sales",
    "pmi",
    "manufacturing",
  ],
  "central-banks": [
    "federal reserve",
    " fed ",
    "ecb",
    "bank of england",
    "bank of japan",
    "central bank",
    "monetary policy",
    "rate decision",
    "interest rate",
    "rate cut",
    "rate hike",
  ],
  companies: [
    "earnings",
    "revenue",
    "profit",
    "margin",
    "guidance",
    "sales",
    "valuation",
    "stock",
    "shares",
    "share price",
    "merger",
    "acquisition",
    "acquire",
    "ipo",
    "deal",
    "takeover",
    "buyout",
  ],
  geopolitics: [
    "sanction",
    "war",
    "conflict",
    "ceasefire",
    "missile",
    "attack",
    "invasion",
    "embargo",
    "strait",
    "shipping",
    "red sea",
    "taiwan",
    "nato",
    "trade war",
    "export control",
    "geopolit",
  ],
  policy: [
    "tariff",
    "regulation",
    "regulator",
    "antitrust",
    "budget",
    "government shutdown",
    "debt ceiling",
    "fiscal policy",
    "tax",
    "legislation",
    "law",
    "bill",
    "vote",
    "election",
    "sec ",
    "doj",
  ],
};

const establishedDomains = [
  "reuters.com",
  "bloomberg.com",
  "ft.com",
  "wsj.com",
  "cnbc.com",
  "marketwatch.com",
  "barrons.com",
  "finance.yahoo.com",
  "apnews.com",
  "bbc.com",
];

function normalizeDomain(domain: string) {
  return domain.toLowerCase().replace(/^www\./, "");
}

function isEstablishedDomain(domain: string) {
  const normalized = normalizeDomain(domain);
  return establishedDomains.some(
    (trusted) => normalized === trusted || normalized.endsWith(`.${trusted}`),
  );
}

function normalizeGdeltDate(value: string | undefined) {
  if (!value) return "";

  const match = value.match(
    /^(\d{4})(\d{2})(\d{2})T?(\d{2})?(\d{2})?(\d{2})?Z?$/,
  );

  if (!match) return value;

  const [, year, month, day, hour = "00", minute = "00", second = "00"] =
    match;

  return `${year}-${month}-${day}T${hour}:${minute}:${second}Z`;
}

function normalizeTitle(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function titleMatchesCategory(
  title: string,
  category: Exclude<NewsCategory, "all">,
) {
  const normalized = ` ${title.toLowerCase()} `;
  return categorySignals[category].some((signal) =>
    normalized.includes(signal),
  );
}

function topicsForTitle(title: string) {
  return (Object.keys(categorySignals) as Exclude<NewsCategory, "all">[])
    .filter((category) => titleMatchesCategory(title, category));
}

function insight(
  lens: LocalizedNewsText,
  whyItMatters: LocalizedNewsText,
  transmission: NewsInsight["transmission"],
  assets: string[],
  watchNext: LocalizedNewsText,
  scenario: LocalizedNewsText,
): NewsInsight {
  return {
    lens,
    whyItMatters,
    transmission,
    assets,
    watchNext,
    scenario,
  };
}

function buildInsight(
  title: string,
  topics: Exclude<NewsCategory, "all">[],
): NewsInsight {
  const normalized = title.toLowerCase();

  if (
    /(war|conflict|ceasefire|missile|attack|invasion|embargo|red sea|strait|shipping)/.test(
      normalized,
    )
  ) {
    return insight(
      { en: "Geopolitical risk transmission", fr: "Transmission du risque géopolitique" },
      {
        en: "Geopolitical developments can change risk premia, energy and shipping costs, supply-chain reliability and safe-haven demand even before the economic impact is measurable.",
        fr: "Les développements géopolitiques peuvent modifier les primes de risque, les coûts de l’énergie et du transport, la fiabilité des chaînes d’approvisionnement et la demande de valeurs refuges avant même que l’impact économique soit mesurable.",
      },
      {
        en: [
          "Energy or transport disruption can feed into inflation and corporate input costs.",
          "Escalation or de-escalation can change risk appetite, volatility and safe-haven flows.",
        ],
        fr: [
          "Une perturbation de l’énergie ou du transport peut alimenter l’inflation et les coûts des entreprises.",
          "Une escalade ou une désescalade peut modifier l’appétit pour le risque, la volatilité et les flux vers les valeurs refuges.",
        ],
      },
      ["Oil", "Gold", "USD", "Sovereign bonds", "Defense", "Airlines & shipping"],
      {
        en: "Watch official statements, sanctions, shipping routes, energy flows and whether markets confirm the headline through oil, volatility, FX and rates.",
        fr: "Surveille les déclarations officielles, sanctions, routes maritimes, flux énergétiques et vérifie si les marchés confirment le titre via le pétrole, la volatilité, les devises et les taux.",
      },
      {
        en: "If the event broadens or disrupts real flows, financial transmission can strengthen. If it is contained or reversed quickly, the first market reaction can fade.",
        fr: "Si l’événement s’élargit ou perturbe les flux réels, la transmission financière peut s’intensifier. S’il reste contenu ou est rapidement inversé, la première réaction de marché peut s’estomper.",
      },
    );
  }

  if (/(tariff|sanction|trade war|export control|import duty)/.test(normalized)) {
    return insight(
      { en: "Trade, sanctions & supply chains", fr: "Commerce, sanctions & chaînes d’approvisionnement" },
      {
        en: "Trade restrictions can affect prices, margins, supply chains, currencies and expected growth. The financial effect depends heavily on scope, timing, exemptions and retaliation.",
        fr: "Les restrictions commerciales peuvent affecter les prix, les marges, les chaînes d’approvisionnement, les devises et la croissance attendue. L’effet financier dépend fortement de l’ampleur, du calendrier, des exemptions et des représailles.",
      },
      {
        en: [
          "Higher import costs can pressure margins or consumer prices.",
          "Retaliation and rerouting can change exporters, industrial supply chains and FX expectations.",
        ],
        fr: [
          "Des coûts d’importation plus élevés peuvent peser sur les marges ou les prix à la consommation.",
          "Les représailles et le réacheminement peuvent modifier les exportateurs, les chaînes industrielles et les anticipations de change.",
        ],
      },
      ["FX", "Industrials", "Semiconductors", "Consumer goods", "Rates", "Commodities"],
      {
        en: "Watch the final legal text, effective date, product coverage, exemptions, retaliation and company guidance on costs.",
        fr: "Surveille le texte juridique final, la date d’entrée en vigueur, les produits concernés, les exemptions, les représailles et les indications des entreprises sur leurs coûts.",
      },
      {
        en: "A narrow or delayed measure can have a smaller transmission channel; a broad measure with retaliation can create larger inflation, growth and margin effects.",
        fr: "Une mesure limitée ou retardée peut avoir un canal de transmission plus faible ; une mesure large accompagnée de représailles peut produire des effets plus importants sur l’inflation, la croissance et les marges.",
      },
    );
  }

  if (
    /(federal reserve|\bfed\b|ecb|bank of england|bank of japan|central bank|rate cut|rate hike|interest rate|monetary policy)/.test(
      normalized,
    )
  ) {
    return insight(
      { en: "Central-bank transmission", fr: "Transmission de la banque centrale" },
      {
        en: "Monetary-policy news changes expectations for the path of interest rates. That directly affects discount rates, borrowing costs, currencies and asset valuations.",
        fr: "Les nouvelles de politique monétaire modifient les anticipations sur la trajectoire des taux d’intérêt. Cela affecte directement les taux d’actualisation, les coûts d’emprunt, les devises et les valorisations.",
      },
      {
        en: [
          "Rate expectations usually appear first in short-dated sovereign yields and futures.",
          "Changes in yield differentials can transmit into FX, equities, credit and housing-sensitive assets.",
        ],
        fr: [
          "Les anticipations de taux apparaissent souvent d’abord dans les rendements souverains courts et les futures.",
          "Les variations des différentiels de taux peuvent se transmettre aux devises, actions, crédit et actifs sensibles au logement.",
        ],
      },
      ["2Y yields", "10Y yields", "USD", "EUR", "JPY", "Banks", "Growth equities"],
      {
        en: "Watch the official statement, voting split, projections, press conference, futures repricing and the next inflation and labor data.",
        fr: "Surveille le communiqué officiel, la répartition des votes, les projections, la conférence de presse, la revalorisation des futures et les prochaines données d’inflation et d’emploi.",
      },
      {
        en: "The key question is not only the current decision, but whether it changes the expected path of future rates relative to what markets had already priced.",
        fr: "La question clé n’est pas seulement la décision actuelle, mais si elle change la trajectoire attendue des taux futurs par rapport à ce que les marchés avaient déjà intégré.",
      },
    );
  }

  if (/(inflation|cpi|pce|prices|price index)/.test(normalized)) {
    return insight(
      { en: "Inflation → rates → valuation", fr: "Inflation → taux → valorisation" },
      {
        en: "Inflation changes real purchasing power and can alter the expected path of central-bank policy, which then feeds into discount rates and company financing costs.",
        fr: "L’inflation modifie le pouvoir d’achat réel et peut changer la trajectoire attendue de la politique monétaire, ce qui se transmet ensuite aux taux d’actualisation et aux coûts de financement des entreprises.",
      },
      {
        en: [
          "Persistent inflation can keep rate expectations restrictive for longer.",
          "The mix matters: goods, services, housing and wages can carry different policy signals.",
        ],
        fr: [
          "Une inflation persistante peut maintenir plus longtemps des anticipations de taux restrictives.",
          "La composition compte : biens, services, logement et salaires peuvent envoyer des signaux différents à la banque centrale.",
        ],
      },
      ["2Y yields", "10Y yields", "FX", "Growth equities", "Banks", "Gold"],
      {
        en: "Watch core measures, services inflation, wages, inflation expectations and how rate futures reprice after the release.",
        fr: "Surveille les mesures sous-jacentes, l’inflation des services, les salaires, les anticipations d’inflation et la revalorisation des futures de taux après la publication.",
      },
      {
        en: "A single release matters less than whether it confirms or breaks the recent trend and changes the expected policy path.",
        fr: "Une seule publication compte moins que sa capacité à confirmer ou casser la tendance récente et à modifier la trajectoire attendue de politique monétaire.",
      },
    );
  }

  if (/(jobs|employment|unemployment|payroll|gdp|growth|recession|pmi|retail sales)/.test(normalized)) {
    return insight(
      { en: "Growth & labor transmission", fr: "Transmission croissance & emploi" },
      {
        en: "Growth and labor data affect expected consumer demand, company revenues, default risk and the balance between growth support and inflation pressure.",
        fr: "Les données de croissance et d’emploi affectent la demande attendue, les revenus des entreprises, le risque de défaut et l’équilibre entre soutien à la croissance et pression inflationniste.",
      },
      {
        en: [
          "Stronger activity can support earnings while also keeping rates higher if inflation pressure persists.",
          "Weaker activity can reduce earnings expectations and credit quality while increasing expectations for policy easing.",
        ],
        fr: [
          "Une activité plus forte peut soutenir les bénéfices tout en maintenant les taux plus élevés si les pressions inflationnistes persistent.",
          "Une activité plus faible peut réduire les attentes de bénéfices et la qualité du crédit tout en renforçant les anticipations d’assouplissement monétaire.",
        ],
      },
      ["Equities", "Credit", "2Y yields", "10Y yields", "USD", "Cyclicals"],
      {
        en: "Watch revisions, participation, wages, forward-looking surveys and whether earnings expectations move with the data.",
        fr: "Surveille les révisions, la participation, les salaires, les enquêtes prospectives et l’évolution des attentes de bénéfices avec les données.",
      },
      {
        en: "Markets often react to the difference between the data and prior expectations, not simply whether the number looks strong or weak in isolation.",
        fr: "Les marchés réagissent souvent à l’écart entre la donnée et les attentes précédentes, pas simplement au fait que le chiffre paraisse fort ou faible isolément.",
      },
    );
  }

  if (/(oil|crude|natural gas|opec|energy|refinery)/.test(normalized)) {
    return insight(
      { en: "Energy → inflation & margins", fr: "Énergie → inflation & marges" },
      {
        en: "Energy prices can transmit quickly into inflation expectations, transport costs, producer margins and the trade balances of importing and exporting countries.",
        fr: "Les prix de l’énergie peuvent se transmettre rapidement aux anticipations d’inflation, aux coûts de transport, aux marges des producteurs et aux balances commerciales des pays importateurs et exportateurs.",
      },
      {
        en: [
          "Supply changes can alter headline inflation and corporate input costs.",
          "Exporters and importers can experience opposite fiscal, FX and growth effects.",
        ],
        fr: [
          "Les variations d’offre peuvent modifier l’inflation globale et les coûts des entreprises.",
          "Les pays exportateurs et importateurs peuvent subir des effets opposés sur les finances publiques, les devises et la croissance.",
        ],
      },
      ["Oil", "Energy equities", "Airlines", "Industrials", "Inflation breakevens", "FX"],
      {
        en: "Watch inventories, production guidance, OPEC decisions, shipping constraints and whether the move persists beyond the first headline reaction.",
        fr: "Surveille les stocks, les indications de production, les décisions de l’OPEP, les contraintes de transport et la persistance du mouvement au-delà de la première réaction.",
      },
      {
        en: "The financial impact depends on whether the change is temporary, demand-driven or a durable supply shock.",
        fr: "L’impact financier dépend du caractère temporaire du mouvement, de son origine par la demande ou d’un choc d’offre durable.",
      },
    );
  }

  if (/(budget|debt ceiling|government shutdown|deficit|fiscal|bond auction|treasury issuance)/.test(normalized)) {
    return insight(
      { en: "Fiscal policy & sovereign funding", fr: "Politique budgétaire & financement souverain" },
      {
        en: "Fiscal decisions can change government borrowing needs, growth expectations and sovereign risk premia, which can transmit through bond yields and currencies.",
        fr: "Les décisions budgétaires peuvent modifier les besoins d’emprunt de l’État, les attentes de croissance et les primes de risque souverain, avec une transmission via les rendements obligataires et les devises.",
      },
      {
        en: [
          "More borrowing can affect bond supply and term premia.",
          "Changes in taxes or spending can alter sector demand, household income and growth expectations.",
        ],
        fr: [
          "Davantage d’emprunts peuvent affecter l’offre obligataire et les primes de terme.",
          "Les changements d’impôts ou de dépenses peuvent modifier la demande sectorielle, le revenu des ménages et les attentes de croissance.",
        ],
      },
      ["Sovereign bonds", "Yield curve", "FX", "Banks", "Domestic equities"],
      {
        en: "Watch the enacted text rather than proposals alone, financing details, auction demand, rating commentary and the reaction of the yield curve.",
        fr: "Surveille le texte adopté plutôt que les seules propositions, les détails de financement, la demande aux adjudications, les commentaires des agences et la réaction de la courbe des taux.",
      },
      {
        en: "The market effect depends on implementation, financing and whether the policy changes expected growth or inflation enough to alter the rate path.",
        fr: "L’effet de marché dépend de la mise en œuvre, du financement et de l’ampleur avec laquelle la politique change les attentes de croissance ou d’inflation et donc la trajectoire des taux.",
      },
    );
  }

  if (/(earnings|revenue|profit|margin|guidance|sales)/.test(normalized)) {
    return insight(
      { en: "Earnings & cash-flow expectations", fr: "Résultats & attentes de cash-flow" },
      {
        en: "Company results matter because valuation depends on expected future cash flows, margins, growth and the discount rate investors apply to them.",
        fr: "Les résultats d’entreprise comptent car la valorisation dépend des flux de trésorerie futurs attendus, des marges, de la croissance et du taux d’actualisation appliqué par les investisseurs.",
      },
      {
        en: [
          "Guidance can matter more than the reported quarter because markets price future earnings.",
          "Sector read-through can move suppliers, customers and competitors even if they did not report.",
        ],
        fr: [
          "Les prévisions de l’entreprise peuvent compter davantage que le trimestre publié car les marchés valorisent les bénéfices futurs.",
          "La lecture sectorielle peut faire bouger fournisseurs, clients et concurrents même s’ils n’ont pas publié.",
        ],
      },
      ["Company shares", "Sector peers", "Credit", "Options volatility"],
      {
        en: "Watch guidance, margins, free cash flow, capex, demand commentary and changes to analyst estimates.",
        fr: "Surveille les prévisions, les marges, le free cash flow, les investissements, les commentaires sur la demande et les révisions des estimations des analystes.",
      },
      {
        en: "A headline beat or miss is less informative than what changes in the market’s estimate of future earnings and risk.",
        fr: "Un simple dépassement ou manque par rapport aux attentes est moins informatif que le changement dans l’estimation des bénéfices futurs et du risque par le marché.",
      },
    );
  }

  if (/(merger|acquisition|acquire|buyout|takeover|deal|ipo)/.test(normalized)) {
    return insight(
      { en: "Deal economics & capital markets", fr: "Économie du deal & marchés de capitaux" },
      {
        en: "Deals can change valuation, leverage, industry structure and financing demand. The headline price is only one part of the financial story.",
        fr: "Les opérations peuvent modifier la valorisation, l’endettement, la structure du secteur et les besoins de financement. Le prix annoncé n’est qu’une partie de l’histoire financière.",
      },
      {
        en: [
          "Financing terms can affect debt issuance, credit spreads and the buyer’s balance sheet.",
          "Regulatory risk and closing probability can create a gap between the announced price and traded price.",
        ],
        fr: [
          "Les conditions de financement peuvent affecter les émissions de dette, les spreads de crédit et le bilan de l’acquéreur.",
          "Le risque réglementaire et la probabilité de clôture peuvent créer un écart entre le prix annoncé et le prix coté.",
        ],
      },
      ["Target shares", "Acquirer shares", "Credit", "Sector peers", "Event-driven spreads"],
      {
        en: "Watch financing, shareholder votes, regulatory approvals, closing conditions and expected synergies.",
        fr: "Surveille le financement, les votes des actionnaires, les autorisations réglementaires, les conditions de clôture et les synergies attendues.",
      },
      {
        en: "The key market question is whether the economics and probability of completion justify the price and financing risk.",
        fr: "La question clé pour le marché est de savoir si l’économie du deal et la probabilité de réalisation justifient le prix et le risque de financement.",
      },
    );
  }

  if (/(regulation|regulator|antitrust|sec |doj|legislation|law|bill|vote|election)/.test(normalized)) {
    return insight(
      { en: "Policy & regulation transmission", fr: "Transmission politique publique & réglementation" },
      {
        en: "Rules and government decisions can change allowed business models, compliance costs, taxes, competition and capital requirements. Market impact depends on the final rule and implementation.",
        fr: "Les règles et décisions publiques peuvent modifier les modèles économiques autorisés, les coûts de conformité, la fiscalité, la concurrence et les exigences de capital. L’impact dépend du texte final et de sa mise en œuvre.",
      },
      {
        en: [
          "Sector profitability can change through taxes, compliance costs or restrictions.",
          "Legal challenges, implementation delays and exemptions can materially alter the first market interpretation.",
        ],
        fr: [
          "La rentabilité sectorielle peut changer via la fiscalité, les coûts de conformité ou les restrictions.",
          "Les recours juridiques, retards de mise en œuvre et exemptions peuvent modifier fortement la première interprétation du marché.",
        ],
      },
      ["Affected sector", "Domestic equities", "Credit", "FX", "Government bonds"],
      {
        en: "Watch the final text, implementation date, agencies involved, legal challenges and company guidance. For electoral events, distinguish campaign proposals from enacted policy.",
        fr: "Surveille le texte final, la date d’application, les agences concernées, les recours juridiques et les indications des entreprises. Pour les événements électoraux, distingue les propositions de campagne des politiques effectivement adoptées.",
      },
      {
        en: "Treat political proposals and attributed claims as uncertain until concrete rules, votes or implementation details are known.",
        fr: "Traite les propositions politiques et les affirmations attribuées comme incertaines tant que les règles concrètes, votes ou détails de mise en œuvre ne sont pas connus.",
      },
    );
  }

  if (/(dollar|euro|yen|currency|currencies|fx)/.test(normalized)) {
    return insight(
      { en: "FX & relative-rate transmission", fr: "FX & transmission par taux relatifs" },
      {
        en: "Currencies reflect relative growth, inflation, policy and capital flows. FX moves then feed back into import prices, export competitiveness and multinational earnings.",
        fr: "Les devises reflètent la croissance relative, l’inflation, la politique monétaire et les flux de capitaux. Les mouvements de change se répercutent ensuite sur les prix importés, la compétitivité des exportations et les bénéfices des multinationales.",
      },
      {
        en: [
          "Yield differentials and policy expectations can shift capital between currencies.",
          "Large currency moves can change inflation and earnings translation for international companies.",
        ],
        fr: [
          "Les différentiels de taux et les anticipations de politique monétaire peuvent déplacer les capitaux entre devises.",
          "De grands mouvements de change peuvent modifier l’inflation et la conversion des bénéfices des entreprises internationales.",
        ],
      },
      ["USD", "EUR", "JPY", "GBP", "Exporters", "Importers"],
      {
        en: "Watch rate differentials, central-bank communication, positioning and whether the move is confirmed by bond markets.",
        fr: "Surveille les différentiels de taux, la communication des banques centrales, le positionnement et la confirmation éventuelle par les marchés obligataires.",
      },
      {
        en: "FX direction is usually about relative conditions between two economies, not the strength or weakness of one economy in isolation.",
        fr: "La direction d’une devise dépend généralement des conditions relatives entre deux économies, pas de la force ou faiblesse d’une seule économie isolément.",
      },
    );
  }

  return insight(
    {
      en: topics.includes("markets") ? "Market structure & expectations" : "Financial transmission",
      fr: topics.includes("markets") ? "Structure de marché & anticipations" : "Transmission financière",
    },
    {
      en: "The headline may matter if it changes expected cash flows, growth, inflation, policy, liquidity or risk premia. The first task is identifying which mechanism is actually relevant.",
      fr: "Le titre peut compter s’il modifie les flux de trésorerie attendus, la croissance, l’inflation, la politique économique, la liquidité ou les primes de risque. La première étape consiste à identifier le mécanisme réellement pertinent.",
    },
    {
      en: [
        "Separate the reported fact from the market interpretation.",
        "Check whether rates, FX, credit, commodities or equities confirm the supposed transmission channel.",
      ],
      fr: [
        "Sépare le fait rapporté de l’interprétation de marché.",
        "Vérifie si les taux, devises, crédit, matières premières ou actions confirment le canal de transmission supposé.",
      ],
    },
    ["Equities", "Rates", "FX", "Credit", "Commodities", "Volatility"],
    {
      en: "Open the original reporting, identify the primary source, then watch the next official data, statement or company update that could confirm or contradict the story.",
      fr: "Ouvre le reporting original, identifie la source primaire, puis surveille la prochaine donnée, déclaration officielle ou mise à jour d’entreprise susceptible de confirmer ou contredire l’histoire.",
    },
    {
      en: "Do not treat the headline as a forecast. A durable market move usually requires new information that changes expectations, not just repetition of an existing narrative.",
      fr: "Ne traite pas le titre comme une prévision. Un mouvement de marché durable nécessite généralement une information nouvelle qui modifie les anticipations, pas seulement la répétition d’un récit déjà connu.",
    },
  );
}

export function isNewsCategory(value: string | null): value is NewsCategory {
  return (
    value === "all" ||
    value === "markets" ||
    value === "macro" ||
    value === "central-banks" ||
    value === "companies" ||
    value === "geopolitics" ||
    value === "policy"
  );
}

async function requestGdelt(endpoint: string) {
  const request = (cacheMode: RequestCache | undefined) =>
    fetch(endpoint, {
      headers: {
        Accept: "application/json",
        "User-Agent": "FinanceStudio/1.0 educational-market-intelligence",
      },
      ...(cacheMode
        ? { cache: cacheMode }
        : { next: { revalidate: 900 } }),
    });

  let response = await request(undefined);

  if (response.status === 429) {
    const retryAfterHeader = Number(response.headers.get("retry-after"));
    const retrySeconds = Number.isFinite(retryAfterHeader)
      ? Math.min(Math.max(retryAfterHeader, 1), 3)
      : 2;

    await new Promise((resolve) =>
      setTimeout(resolve, retrySeconds * 1000),
    );

    response = await request("no-store");
  }

  return response;
}

export async function getNewsData(
  category: NewsCategory,
): Promise<NewsDataResponse> {
  const params = new URLSearchParams({
    query: financeQuery,
    mode: "artlist",
    maxrecords: "100",
    timespan: "72h",
    sort: "datedesc",
    format: "json",
  });

  const endpoint = `https://api.gdeltproject.org/api/v2/doc/doc?${params.toString()}`;

  try {
    const response = await requestGdelt(endpoint);

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error(
          "GDELT is temporarily rate-limited. FinanceStudio will not replace the unavailable feed with synthetic headlines.",
        );
      }
      throw new Error(`GDELT request failed: ${response.status}`);
    }

    const payload = (await response.json()) as {
      articles?: Array<{
        url?: string;
        title?: string;
        seendate?: string;
        socialimage?: string;
        domain?: string;
        language?: string;
        sourcecountry?: string;
      }>;
    };

    const unique = new Map<string, NewsItem>();

    for (const article of payload.articles ?? []) {
      const url = article.url?.trim();
      const title = article.title?.trim();
      if (!url || !title || unique.has(url)) continue;

      const topics = topicsForTitle(title);
      if (!topics.length) continue;

      const domain =
        article.domain?.trim() ||
        (() => {
          try {
            return new URL(url).hostname;
          } catch {
            return "";
          }
        })();

      unique.set(url, {
        id: url,
        title,
        url,
        domain: normalizeDomain(domain),
        publishedAt: normalizeGdeltDate(article.seendate),
        sourceCountry: article.sourcecountry?.trim() ?? "",
        language: article.language?.trim() ?? "",
        imageUrl: article.socialimage?.trim() || null,
        sourceQuality: isEstablishedDomain(domain)
          ? "established"
          : "external",
        topics,
        insight: buildInsight(title, topics),
      });
    }

    const sortedItems = [...unique.values()].sort((a, b) => {
      const time = b.publishedAt.localeCompare(a.publishedAt);
      if (time !== 0) return time;

      if (a.sourceQuality !== b.sourceQuality) {
        return a.sourceQuality === "established" ? -1 : 1;
      }

      return a.title.localeCompare(b.title);
    });

    const seenTitles = new Set<string>();
    const allItems = sortedItems.filter((item) => {
      const key = normalizeTitle(item.title);
      if (!key || seenTitles.has(key)) return false;
      seenTitles.add(key);
      return true;
    });

    const items = allItems
      .filter((item) =>
        category === "all" ? true : item.topics.includes(category),
      )
      .slice(0, 100);

    return {
      category,
      updatedAt: new Date().toISOString(),
      items,
      provider: {
        id: "gdelt",
        label: "GDELT DOC 2.0",
        status: items.length ? "live" : "empty",
        message: items.length
          ? `${items.length} recent external articles indexed from one shared cached finance-and-geopolitics query.`
          : "No matching article was returned for this category.",
      },
    };
  } catch (error) {
    return {
      category,
      updatedAt: new Date().toISOString(),
      items: [],
      provider: {
        id: "gdelt",
        label: "GDELT DOC 2.0",
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "The news index could not be loaded.",
      },
    };
  }
}
