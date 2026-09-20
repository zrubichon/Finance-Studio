import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  getInstrumentQuote,
  type InvestableAssetClass,
} from "@/lib/providers/instrument-data";
import { createClient } from "@/lib/supabase/server";
import AccountSettingsForm from "@/components/account-settings-form";
import { signOut } from "./actions";

export const dynamic = "force-dynamic";

function money(value: number | null, currency: string, locale: string) {
  if (value === null || !Number.isFinite(value)) return "—";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(value);
}

export default async function AccountPage() {
  const cookieStore = await cookies();
  const isFrench = cookieStore.get("finance-studio-language")?.value === "FR";
  const t = (en: string, fr: string) => isFrench ? fr : en;
  const locale = isFrench ? "fr-FR" : "en-US";

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const [
    profileResult,
    preferencesResult,
    completedResult,
    masteryResult,
    interviewResult,
    portfolioResult,
  ] = await Promise.all([
    supabase
      .from("profiles")
      .select("display_name, preferred_language, explanation_level, target_role, onboarding_completed")
      .eq("user_id", user.id)
      .maybeSingle(),
    supabase
      .from("user_preferences")
      .select("theme, card_radius, market_regions")
      .eq("user_id", user.id)
      .maybeSingle(),
    supabase
      .from("course_progress")
      .select("id", { count: "exact", head: true })
      .eq("user_id", user.id)
      .eq("status", "completed"),
    supabase
      .from("concept_mastery")
      .select("id", { count: "exact", head: true })
      .eq("user_id", user.id)
      .gte("mastery_score", 70),
    supabase
      .from("interview_attempts")
      .select("id", { count: "exact", head: true })
      .eq("user_id", user.id),
    supabase
      .from("paper_portfolios")
      .select("id,name,base_currency,starting_cash,cash_balance")
      .eq("user_id", user.id)
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle(),
  ]);

  const profile = profileResult.data;
  const preferences = preferencesResult.data;
  const portfolio = portfolioResult.data;

  let portfolioSummary: {
    positions: number;
    cashBalance: number;
    totalEquity: number | null;
    totalPnl: number | null;
    fullCoverage: boolean;
  } | null = null;

  if (portfolio) {
    const [{ data: positions }, { data: transactions }] = await Promise.all([
      supabase
        .from("paper_positions")
        .select("symbol,asset_class,quantity,average_cost")
        .eq("portfolio_id", portfolio.id),
      supabase
        .from("paper_transactions")
        .select("realized_pnl")
        .eq("portfolio_id", portfolio.id),
    ]);

    const priced = await Promise.all(
      (positions ?? []).map(async (position) => {
        const pricing = await getInstrumentQuote(
          position.symbol,
          position.asset_class as InvestableAssetClass,
        );

        if (
          !pricing.quote ||
          (pricing.quote.currency &&
            pricing.quote.currency !== portfolio.base_currency)
        ) {
          return null;
        }

        return Number(position.quantity) * pricing.quote.price;
      }),
    );

    const fullCoverage = priced.every((value) => value !== null);
    const marketValue = fullCoverage
      ? priced.reduce((sum, value) => sum + Number(value ?? 0), 0)
      : null;

    const cashBalance = Number(portfolio.cash_balance);
    const startingCash = Number(portfolio.starting_cash);
    const totalEquity =
      marketValue === null ? null : cashBalance + marketValue;

    // Realized P&L is already embedded in cash. We still query transactions
    // so the account summary reflects whether a real paper-trading record exists.
    void transactions;

    portfolioSummary = {
      positions: positions?.length ?? 0,
      cashBalance,
      totalEquity,
      totalPnl:
        totalEquity === null ? null : totalEquity - startingCash,
      fullCoverage,
    };
  }

  const level = profile?.explanation_level ?? "beginner";
  const localizedLevel =
    level === "beginner"
      ? t("Beginner", "Débutant")
      : level === "intermediate"
        ? t("Intermediate", "Intermédiaire")
        : level === "professional"
          ? t("Professional", "Professionnel")
          : level;

  const theme = preferences?.theme ?? "classic";
  const localizedTheme =
    theme === "classic"
      ? t("Classic", "Classique")
      : theme === "girl"
        ? "Finance Girl"
        : theme === "terminal"
          ? "Wall Street"
          : theme;

  const regions =
    preferences?.market_regions?.join(", ") ??
    t("Global, USA, Europe", "Monde, USA, Europe");

  const portfolioName =
    portfolio?.name === "Main Portfolio"
      ? t("Main Portfolio", "Portefeuille principal")
      : portfolio?.name;

  return (
    <main className="account-shell">
      <header className="account-topbar">
        <Link className="brand" href="/">
          <span className="brand-mark">FS</span>
          <span>FinanceStudio</span>
        </Link>
        <Link className="account-dashboard-link" href="/">
          {t("Open dashboard", "Ouvrir le tableau de bord")} →
        </Link>
      </header>

      <section className="account-hero">
        <p className="eyebrow">
          {t("YOUR FINANCESTUDIO ACCOUNT", "TON COMPTE FINANCESTUDIO")}
        </p>
        <h1>
          {profile?.display_name
            ? isFrench
              ? `Bienvenue, ${profile.display_name}.`
              : `Welcome, ${profile.display_name}.`
            : t("Your learning workspace.", "Ton espace d’apprentissage.")}
        </h1>
        <p>{user.email}</p>
      </section>

      <section className="account-grid">
        <article className="account-card">
          <span className="mini-label">
            {t("LEARNING PROFILE", "PROFIL D’APPRENTISSAGE")}
          </span>
          <h2>
            {t(
              "How FinanceStudio teaches you",
              "Comment FinanceStudio t’enseigne la finance",
            )}
          </h2>
          <dl>
            <div>
              <dt>{t("Language", "Langue")}</dt>
              <dd>
                {isFrench
                  ? "Français + termes techniques / English terms"
                  : "English"}
              </dd>
            </div>
            <div>
              <dt>{t("Explanation level", "Niveau d’explication")}</dt>
              <dd>{localizedLevel}</dd>
            </div>
            <div>
              <dt>{t("Target role", "Métier cible / target role")}</dt>
              <dd>
                {profile?.target_role ??
                  t("Not selected yet", "Pas encore sélectionné")}
              </dd>
            </div>
            <div>
              <dt>{t("Onboarding", "Configuration initiale / onboarding")}</dt>
              <dd>
                {profile?.onboarding_completed
                  ? t("Complete", "Terminée")
                  : t("To complete", "À terminer")}
              </dd>
            </div>
          </dl>
        </article>

        <article className="account-card">
          <span className="mini-label">
            {t("KNOWLEDGE PROGRESS", "PROGRESSION DES CONNAISSANCES")}
          </span>
          <h2>{t("Your current learning record", "Ton suivi d’apprentissage actuel")}</h2>
          <div className="account-stat-grid">
            <div>
              <strong>{completedResult.count ?? 0}</strong>
              <span>{t("Lessons completed", "Cours terminés")}</span>
            </div>
            <div>
              <strong>{masteryResult.count ?? 0}</strong>
              <span>{t("Concepts mastered", "Concepts maîtrisés")}</span>
            </div>
            <div>
              <strong>{interviewResult.count ?? 0}</strong>
              <span>
                {t(
                  "Interview attempts",
                  "Tentatives d’entretien / interview attempts",
                )}
              </span>
            </div>
          </div>
          <Link className="account-inline-link" href="/progress">
            {t(
              "Open knowledge map",
              "Ouvrir la carte des connaissances / knowledge map",
            )}{" "}
            →
          </Link>
        </article>

        <article className="account-card">
          <span className="mini-label">{t("WORKSPACE", "ESPACE DE TRAVAIL")}</span>
          <h2>{t("Your preferred setup", "Ta configuration préférée")}</h2>
          <dl>
            <div>
              <dt>{t("Theme", "Thème")}</dt>
              <dd>{localizedTheme}</dd>
            </div>
            <div>
              <dt>{t("Card radius", "Arrondi des cartes")}</dt>
              <dd>{preferences?.card_radius ?? 22}px</dd>
            </div>
            <div>
              <dt>{t("Market regions", "Régions de marché")}</dt>
              <dd>{regions}</dd>
            </div>
          </dl>
          <Link className="account-inline-link" href="/themes">
            {t("Customize workspace", "Personnaliser l’espace de travail")} →
          </Link>
        </article>

        <article className="account-card">
          <span className="mini-label">
            {t("INVESTING LAB", "LABORATOIRE D’INVESTISSEMENT")}
          </span>
          <h2>
            {portfolioName ??
              t("Portfolio not initialized", "Portefeuille non initialisé")}
          </h2>

          {portfolio && portfolioSummary ? (
            <>
              <p className="account-portfolio-value">
                {portfolioSummary.totalEquity !== null
                  ? money(
                      portfolioSummary.totalEquity,
                      portfolio.base_currency,
                      locale,
                    )
                  : money(
                      portfolioSummary.cashBalance,
                      portfolio.base_currency,
                      locale,
                    )}
              </p>

              <div className="account-stat-grid">
                <div>
                  <strong>
                    {money(
                      portfolioSummary.cashBalance,
                      portfolio.base_currency,
                      locale,
                    )}
                  </strong>
                  <span>{t("Virtual cash", "Cash virtuel")}</span>
                </div>
                <div>
                  <strong>{portfolioSummary.positions}</strong>
                  <span>{t("Open positions", "Positions ouvertes")}</span>
                </div>
                <div>
                  <strong>
                    {portfolioSummary.totalPnl === null
                      ? "—"
                      : money(
                          portfolioSummary.totalPnl,
                          portfolio.base_currency,
                          locale,
                        )}
                  </strong>
                  <span>{t("Total P&L", "P&L total")}</span>
                </div>
              </div>

              <p className="account-muted">
                {portfolioSummary.fullCoverage
                  ? t(
                      "Current value uses verified provider prices. Virtual capital only — no real broker order is placed.",
                      "La valeur actuelle utilise des prix fournisseurs vérifiés. Capital virtuel uniquement — aucun ordre réel n’est envoyé à un courtier / broker.",
                    )
                  : t(
                      "Some positions do not have compatible verified prices, so FinanceStudio shows cash but does not fabricate a total portfolio value.",
                      "Certaines positions n’ont pas de prix vérifié compatible ; FinanceStudio affiche donc le cash sans fabriquer de valeur totale du portefeuille.",
                    )}
              </p>
            </>
          ) : (
            <p className="account-muted">
              {t(
                "Open Investing Lab to initialize your virtual portfolio.",
                "Ouvre Investing Lab pour initialiser ton portefeuille virtuel.",
              )}
            </p>
          )}

          <Link className="account-inline-link" href="/investing">
            {t("Open Investing Lab", "Ouvrir le Laboratoire d’Investissement")} →
          </Link>
        </article>
      </section>

      <section className="account-settings-card">
        <div className="account-settings-heading">
          <span className="mini-label">
            {t("EDIT YOUR PROFILE", "MODIFIER TON PROFIL")}
          </span>
          <h2>
            {t(
              "Keep FinanceStudio aligned with how you want to learn and what you are preparing for.",
              "Garde FinanceStudio aligné avec ta façon d’apprendre et le métier que tu prépares.",
            )}
          </h2>
          <p className="account-muted">
            {t(
              "These settings personalize Home, Interview Studio, AI Professor and market coverage.",
              "Ces paramètres personnalisent Accueil, Interview Studio, le Professeur IA et la couverture des marchés.",
            )}
          </p>
        </div>

        <AccountSettingsForm
          initialDisplayName={profile?.display_name ?? ""}
          initialLanguage={profile?.preferred_language === "fr" ? "FR" : "EN"}
          initialLevel={
            profile?.explanation_level === "intermediate" ||
            profile?.explanation_level === "professional"
              ? profile.explanation_level
              : "beginner"
          }
          initialTargetRole={profile?.target_role ?? ""}
          initialRegions={preferences?.market_regions ?? ["global", "usa", "europe"]}
        />
      </section>

      <section className="account-security-card">
        <div>
          <span className="mini-label">
            {t("ACCOUNT SECURITY", "SÉCURITÉ DU COMPTE")}
          </span>
          <h2>
            {isFrench
              ? `Connecté en tant que ${user.email}`
              : `Signed in as ${user.email}`}
          </h2>
          <p>
            {t(
              "Your personal learning and paper-trading records are protected by row-level security in Supabase.",
              "Tes données personnelles d’apprentissage et de trading simulé sont protégées par la sécurité au niveau des lignes / row-level security (RLS) dans Supabase.",
            )}
          </p>
        </div>
        <form action={signOut}>
          <button type="submit">{t("Sign out", "Se déconnecter")}</button>
        </form>
      </section>
    </main>
  );
}
