import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "./actions";

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const cookieStore = await cookies();
  const isFrench = cookieStore.get("finance-studio-language")?.value === "FR";
  const t = (en: string, fr: string) => isFrench ? fr : en;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const [profileResult, preferencesResult, completedResult, masteryResult, interviewResult, portfolioResult] = await Promise.all([
    supabase.from("profiles").select("display_name, preferred_language, explanation_level, target_role, onboarding_completed").eq("user_id", user.id).maybeSingle(),
    supabase.from("user_preferences").select("theme, card_radius, market_regions").eq("user_id", user.id).maybeSingle(),
    supabase.from("course_progress").select("id", { count: "exact", head: true }).eq("user_id", user.id).eq("status", "completed"),
    supabase.from("concept_mastery").select("id", { count: "exact", head: true }).eq("user_id", user.id).gte("mastery_score", 70),
    supabase.from("interview_attempts").select("id", { count: "exact", head: true }).eq("user_id", user.id),
    supabase.from("paper_portfolios").select("name, base_currency, starting_cash").eq("user_id", user.id).order("created_at", { ascending: true }).limit(1).maybeSingle(),
  ]);

  const profile = profileResult.data;
  const preferences = preferencesResult.data;
  const portfolio = portfolioResult.data;
  const level = profile?.explanation_level ?? "beginner";
  const localizedLevel = level === "beginner" ? t("Beginner", "Débutant") : level === "intermediate" ? t("Intermediate", "Intermédiaire") : level === "professional" ? t("Professional", "Professionnel") : level;
  const theme = preferences?.theme ?? "classic";
  const localizedTheme = theme === "classic" ? t("Classic", "Classique") : theme === "girl" ? "Finance Girl" : theme === "terminal" ? "Wall Street" : theme;
  const regions = preferences?.market_regions?.join(", ") ?? t("Global, USA, Europe", "Monde, USA, Europe");
  const portfolioName = portfolio?.name === "Main Portfolio" ? t("Main Portfolio", "Portefeuille principal") : portfolio?.name;

  return (
    <main className="account-shell">
      <header className="account-topbar">
        <Link className="brand" href="/">
          <span className="brand-mark">FS</span>
          <span>FinanceStudio</span>
        </Link>
        <Link className="account-dashboard-link" href="/">{t("Open dashboard", "Ouvrir le tableau de bord")} →</Link>
      </header>

      <section className="account-hero">
        <p className="eyebrow">{t("YOUR FINANCESTUDIO ACCOUNT", "TON COMPTE FINANCESTUDIO")}</p>
        <h1>{profile?.display_name ? (isFrench ? `Bienvenue, ${profile.display_name}.` : `Welcome, ${profile.display_name}.`) : t("Your learning workspace.", "Ton espace d’apprentissage.")}</h1>
        <p>{user.email}</p>
      </section>

      <section className="account-grid">
        <article className="account-card">
          <span className="mini-label">{t("LEARNING PROFILE", "PROFIL D’APPRENTISSAGE")}</span>
          <h2>{t("How FinanceStudio teaches you", "Comment FinanceStudio t’enseigne la finance")}</h2>
          <dl>
            <div><dt>{t("Language", "Langue")}</dt><dd>{isFrench ? "Français + termes techniques / English terms" : "English"}</dd></div>
            <div><dt>{t("Explanation level", "Niveau d’explication")}</dt><dd>{localizedLevel}</dd></div>
            <div><dt>{t("Target role", "Métier cible / target role")}</dt><dd>{profile?.target_role ?? t("Not selected yet", "Pas encore sélectionné")}</dd></div>
            <div><dt>{t("Onboarding", "Configuration initiale / onboarding")}</dt><dd>{profile?.onboarding_completed ? t("Complete", "Terminée") : t("To complete", "À terminer")}</dd></div>
          </dl>
        </article>

        <article className="account-card">
          <span className="mini-label">{t("KNOWLEDGE PROGRESS", "PROGRESSION DES CONNAISSANCES")}</span>
          <h2>{t("Your current learning record", "Ton suivi d’apprentissage actuel")}</h2>
          <div className="account-stat-grid">
            <div><strong>{completedResult.count ?? 0}</strong><span>{t("Lessons completed", "Cours terminés")}</span></div>
            <div><strong>{masteryResult.count ?? 0}</strong><span>{t("Concepts mastered", "Concepts maîtrisés")}</span></div>
            <div><strong>{interviewResult.count ?? 0}</strong><span>{t("Interview attempts", "Tentatives d’entretien / interview attempts")}</span></div>
          </div>
          <Link className="account-inline-link" href="/progress">{t("Open knowledge map", "Ouvrir la carte des connaissances / knowledge map")} →</Link>
        </article>

        <article className="account-card">
          <span className="mini-label">{t("WORKSPACE", "ESPACE DE TRAVAIL")}</span>
          <h2>{t("Your preferred setup", "Ta configuration préférée")}</h2>
          <dl>
            <div><dt>{t("Theme", "Thème")}</dt><dd>{localizedTheme}</dd></div>
            <div><dt>{t("Card radius", "Arrondi des cartes")}</dt><dd>{preferences?.card_radius ?? 22}px</dd></div>
            <div><dt>{t("Market regions", "Régions de marché")}</dt><dd>{regions}</dd></div>
          </dl>
          <Link className="account-inline-link" href="/themes">{t("Customize workspace", "Personnaliser l’espace de travail")} →</Link>
        </article>

        <article className="account-card">
          <span className="mini-label">{t("INVESTING LAB", "LABORATOIRE D’INVESTISSEMENT")}</span>
          <h2>{portfolioName ?? t("Main Portfolio", "Portefeuille principal")}</h2>
          <p className="account-portfolio-value">{portfolio ? `${Number(portfolio.starting_cash).toLocaleString(isFrench ? "fr-FR" : "en-US")} ${portfolio.base_currency}` : "100,000 USD"}</p>
          <p className="account-muted">{t("Virtual capital only. FinanceStudio does not place real trades.", "Capital virtuel uniquement. FinanceStudio ne passe aucun ordre réel / real trade.")}</p>
          <Link className="account-inline-link" href="/investing">{t("Open Investing Lab", "Ouvrir le Laboratoire d’Investissement")} →</Link>
        </article>
      </section>

      <section className="account-security-card">
        <div>
          <span className="mini-label">{t("ACCOUNT SECURITY", "SÉCURITÉ DU COMPTE")}</span>
          <h2>{isFrench ? `Connecté en tant que ${user.email}` : `Signed in as ${user.email}`}</h2>
          <p>{t("Your personal learning records are protected by row-level security in Supabase.", "Tes données personnelles d’apprentissage sont protégées par la sécurité au niveau des lignes / row-level security (RLS) dans Supabase.")}</p>
        </div>
        <form action={signOut}>
          <button type="submit">{t("Sign out", "Se déconnecter")}</button>
        </form>
      </section>
    </main>
  );
}
