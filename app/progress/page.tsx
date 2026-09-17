import Link from "next/link";
import SectionLayout from "@/components/section-layout";
import { createClient } from "@/lib/supabase/server";
import { allCurriculumModules, domainDescriptions, type CurriculumDomain } from "@/lib/curriculum";

function calculateStreak(dates: string[]) {
  if (!dates.length) return 0;
  const unique = [...new Set(dates)].sort().reverse();
  let streak = 0;
  const cursor = new Date();
  cursor.setHours(0, 0, 0, 0);

  for (const date of unique) {
    const activity = new Date(`${date}T00:00:00`);
    const diff = Math.round((cursor.getTime() - activity.getTime()) / 86400000);
    if (diff === 0 || (streak === 0 && diff === 1)) {
      streak += 1;
      cursor.setDate(cursor.getDate() - (diff === 0 ? 1 : diff));
    } else if (diff === 1) {
      streak += 1;
      cursor.setDate(cursor.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}

export default async function ProgressPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const modules = allCurriculumModules();

  let progressRows: { lesson_slug: string; status: string; progress_percent: number }[] = [];
  let conceptsMastered = 0;
  let interviewDrills = 0;
  let streak = 0;

  if (user) {
    const [progressResult, masteryResult, interviewResult, activityResult] = await Promise.all([
      supabase.from("course_progress").select("lesson_slug,status,progress_percent").eq("user_id", user.id),
      supabase.from("concept_mastery").select("id", { count: "exact", head: true }).eq("user_id", user.id).gte("mastery_score", 70),
      supabase.from("interview_attempts").select("id", { count: "exact", head: true }).eq("user_id", user.id),
      supabase.from("user_activity_days").select("activity_date").eq("user_id", user.id).order("activity_date", { ascending: false }).limit(60),
    ]);

    progressRows = progressResult.data ?? [];
    conceptsMastered = masteryResult.count ?? 0;
    interviewDrills = interviewResult.count ?? 0;
    streak = calculateStreak((activityResult.data ?? []).map((row) => row.activity_date));
  }

  const completedSlugs = new Set(progressRows.filter((row) => row.status === "completed").map((row) => row.lesson_slug));
  const completedLessons = completedSlugs.size;
  const domainNames = Object.keys(domainDescriptions) as CurriculumDomain[];
  const domainStats = domainNames.map((domain) => {
    const domainModules = modules.filter((module) => module.domain === domain);
    const complete = domainModules.filter((module) => completedSlugs.has(module.slug)).length;
    const percent = domainModules.length ? Math.round((complete / domainModules.length) * 100) : 0;
    return { name: domain, detail: domainDescriptions[domain], complete, total: domainModules.length, percent };
  });

  const nextModule = modules.find((module) => !completedSlugs.has(module.slug)) ?? modules[0];
  const metrics = [
    { label: "Lessons completed", value: String(completedLessons), note: `${modules.length} modules in the full curriculum` },
    { label: "Concepts mastered", value: String(conceptsMastered), note: "Mastery requires a score of 70 or above" },
    { label: "Interview drills", value: String(interviewDrills), note: "Saved interview practice attempts" },
    { label: "Current streak", value: `${streak} day${streak === 1 ? "" : "s"}`, note: "Based on recorded learning activity" },
  ];

  return (
    <SectionLayout
      activeSlug="progress"
      eyebrow="KNOWLEDGE MAP"
      title="See what you know, what you only recognize and what you should learn next."
      description="Progress is calculated from your real FinanceStudio account data. No completion, mastery score or interview attempt is prefilled."
    >
      <div className="workspace-stack">
        {!user && (
          <section className="learning-account-strip">
            <div>
              <span className="mini-label">ACCOUNT REQUIRED FOR SYNC</span>
              <h2>Your knowledge map starts at zero until you sign in.</h2>
              <p>Browse freely, then sign in to keep course completion and practice history across devices.</p>
            </div>
            <Link className="full-button" href="/login">Sign in →</Link>
          </section>
        )}

        <section className="progress-metric-grid">
          {metrics.map((item) => (
            <article className="progress-metric-card" key={item.label}>
              <span className="control-label">{item.label.toUpperCase()}</span>
              <strong>{item.value}</strong>
              <p>{item.note}</p>
            </article>
          ))}
        </section>

        <section className="knowledge-map-panel">
          <div className="panel-heading">
            <div><span className="mini-label">FINANCE KNOWLEDGE MAP</span><h2>Your mastery by domain</h2></div>
            <span className="connection-badge">{user ? "Live account data" : "Sign in to sync"}</span>
          </div>
          <div className="knowledge-domain-grid">
            {domainStats.map((domain, index) => (
              <article className="knowledge-domain-card" key={domain.name}>
                <div className="knowledge-domain-head"><span>{String(index + 1).padStart(2, "0")}</span><strong>{domain.percent}%</strong></div>
                <h3>{domain.name}</h3>
                <p>{domain.detail}</p>
                <div className="empty-progress-bar"><span style={{ width: `${domain.percent}%` }} /></div>
                <small>{domain.complete} / {domain.total} modules completed</small>
              </article>
            ))}
          </div>
        </section>

        <section className="next-best-panel">
          <div><span className="mini-label">NEXT BEST LESSON</span><h2>{nextModule.year} · {nextModule.title}</h2></div>
          <p>This recommendation currently follows curriculum prerequisites. Later it will also include weak concepts, spaced repetition timing and the user’s selected career track.</p>
          <Link href="/university">Open Finance University →</Link>
        </section>
      </div>
    </SectionLayout>
  );
}
