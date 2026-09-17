import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "./actions";

export const dynamic = "force-dynamic";

export default async function AccountPage() {
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

  return (
    <main className="account-shell">
      <header className="account-topbar">
        <Link className="brand" href="/">
          <span className="brand-mark">FS</span>
          <span>FinanceStudio</span>
        </Link>
        <Link className="account-dashboard-link" href="/">Open dashboard →</Link>
      </header>

      <section className="account-hero">
        <p className="eyebrow">YOUR FINANCESTUDIO ACCOUNT</p>
        <h1>{profile?.display_name ? `Welcome, ${profile.display_name}.` : "Your learning workspace."}</h1>
        <p>{user.email}</p>
      </section>

      <section className="account-grid">
        <article className="account-card">
          <span className="mini-label">LEARNING PROFILE</span>
          <h2>How FinanceStudio teaches you</h2>
          <dl>
            <div><dt>Language</dt><dd>{profile?.preferred_language === "fr" ? "French + English terms" : "English"}</dd></div>
            <div><dt>Explanation level</dt><dd>{profile?.explanation_level ?? "beginner"}</dd></div>
            <div><dt>Target role</dt><dd>{profile?.target_role ?? "Not selected yet"}</dd></div>
            <div><dt>Onboarding</dt><dd>{profile?.onboarding_completed ? "Complete" : "To complete"}</dd></div>
          </dl>
        </article>

        <article className="account-card">
          <span className="mini-label">KNOWLEDGE PROGRESS</span>
          <h2>Your current learning record</h2>
          <div className="account-stat-grid">
            <div><strong>{completedResult.count ?? 0}</strong><span>Lessons completed</span></div>
            <div><strong>{masteryResult.count ?? 0}</strong><span>Concepts mastered</span></div>
            <div><strong>{interviewResult.count ?? 0}</strong><span>Interview attempts</span></div>
          </div>
          <Link className="account-inline-link" href="/progress">Open knowledge map →</Link>
        </article>

        <article className="account-card">
          <span className="mini-label">WORKSPACE</span>
          <h2>Your preferred setup</h2>
          <dl>
            <div><dt>Theme</dt><dd>{preferences?.theme ?? "classic"}</dd></div>
            <div><dt>Card radius</dt><dd>{preferences?.card_radius ?? 22}px</dd></div>
            <div><dt>Market regions</dt><dd>{preferences?.market_regions?.join(", ") ?? "Global, USA, Europe"}</dd></div>
          </dl>
          <Link className="account-inline-link" href="/themes">Customize workspace →</Link>
        </article>

        <article className="account-card">
          <span className="mini-label">INVESTING LAB</span>
          <h2>{portfolio?.name ?? "Main Portfolio"}</h2>
          <p className="account-portfolio-value">{portfolio ? `${portfolio.starting_cash.toLocaleString()} ${portfolio.base_currency}` : "100,000 USD"}</p>
          <p className="account-muted">Virtual capital only. FinanceStudio does not place real trades.</p>
          <Link className="account-inline-link" href="/investing">Open Investing Lab →</Link>
        </article>
      </section>

      <section className="account-security-card">
        <div>
          <span className="mini-label">ACCOUNT SECURITY</span>
          <h2>Signed in as {user.email}</h2>
          <p>Your personal learning records are protected by row-level security in Supabase.</p>
        </div>
        <form action={signOut}>
          <button type="submit">Sign out</button>
        </form>
      </section>
    </main>
  );
}
