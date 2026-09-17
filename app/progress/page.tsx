import Link from "next/link";
import { cookies } from "next/headers";
import SectionLayout from "@/components/section-layout";
import { createClient } from "@/lib/supabase/server";
import { allCurriculumModules, domainDescriptions, domainDescriptionsFr, domainLabelsFr, type CurriculumDomain } from "@/lib/curriculum";
import { hasLessonContent } from "@/lib/lesson-content";

function calculateStreak(dates: string[]) {
  if (!dates.length) return 0;
  const unique = [...new Set(dates)].sort().reverse();
  let streak = 0;
  const cursor = new Date();
  cursor.setHours(0, 0, 0, 0);
  for (const date of unique) {
    const activity = new Date(`${date}T00:00:00`);
    const diff = Math.round((cursor.getTime() - activity.getTime()) / 86400000);
    if (diff === 0 || (streak === 0 && diff === 1)) { streak += 1; cursor.setDate(cursor.getDate() - (diff === 0 ? 1 : diff)); }
    else if (diff === 1) { streak += 1; cursor.setDate(cursor.getDate() - 1); }
    else break;
  }
  return streak;
}

export default async function ProgressPage() {
  const cookieStore = await cookies();
  const isFrench = cookieStore.get("finance-studio-language")?.value === "FR";
  const t = (en: string, fr: string) => isFrench ? fr : en;
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

  const completedSlugs = new Set(
    progressRows
      .filter((row) => row.status === "completed" && hasLessonContent(row.lesson_slug))
      .map((row) => row.lesson_slug),
  );
  const completedLessons = completedSlugs.size;
  const domainNames = Object.keys(domainDescriptions) as CurriculumDomain[];
  const domainStats = domainNames.map((domain) => {
    const domainModules = modules.filter((module) => module.domain === domain);
    const complete = domainModules.filter((module) => completedSlugs.has(module.slug)).length;
    const percent = domainModules.length ? Math.round((complete / domainModules.length) * 100) : 0;
    return { name: isFrench ? domainLabelsFr[domain] : domain, detail: isFrench ? domainDescriptionsFr[domain] : domainDescriptions[domain], complete, total: domainModules.length, percent };
  });

  const nextModule = modules.find((module) => hasLessonContent(module.slug) && !completedSlugs.has(module.slug));
  const firstPlannedModule = modules.find((module) => !hasLessonContent(module.slug));
  const metrics = [
    { label: t("Lessons completed", "Cours terminés"), value: String(completedLessons), note: t(`${modules.length} modules in the full curriculum`, `${modules.length} modules dans le programme complet`) },
    { label: t("Concepts mastered", "Concepts maîtrisés"), value: String(conceptsMastered), note: t("Mastery requires a score of 70 or above", "La maîtrise / mastery nécessite un score de 70 ou plus") },
    { label: t("Interview drills", "Entraînements entretien"), value: String(interviewDrills), note: t("Saved interview practice attempts", "Tentatives d’entretien / interview attempts enregistrées") },
    { label: t("Current streak", "Série actuelle / streak"), value: isFrench ? `${streak} jour${streak === 1 ? "" : "s"}` : `${streak} day${streak === 1 ? "" : "s"}`, note: t("Based on recorded learning activity", "Basé sur l’activité d’apprentissage enregistrée") },
  ];

  return (
    <SectionLayout
      activeSlug="progress"
      eyebrow={{ en: "KNOWLEDGE MAP", fr: "CARTE DES CONNAISSANCES / KNOWLEDGE MAP" }}
      title={{ en: "See what you know, what you only recognize and what you should learn next.", fr: "Vois ce que tu maîtrises, ce que tu reconnais seulement et ce que tu dois apprendre ensuite." }}
      description={{ en: "Progress is calculated from your real FinanceStudio account data. No completion, mastery score or interview attempt is prefilled.", fr: "La progression est calculée à partir des vraies données de ton compte FinanceStudio. Aucun cours terminé, score de maîtrise / mastery ni tentative d’entretien n’est prérempli." }}
    >
      <div className="workspace-stack">
        {!user && <section className="learning-account-strip"><div><span className="mini-label">{t("ACCOUNT REQUIRED FOR SYNC", "COMPTE REQUIS POUR LA SYNCHRONISATION")}</span><h2>{t("Your knowledge map starts at zero until you sign in.", "Ta carte des connaissances commence à zéro tant que tu n’es pas connecté.")}</h2><p>{t("Browse freely, then sign in to keep course completion and practice history across devices.", "Explore librement, puis connecte-toi pour conserver les cours terminés et l’historique d’entraînement sur tous tes appareils.")}</p></div><Link className="full-button" href="/login">{t("Sign in", "Se connecter")} →</Link></section>}

        <section className="progress-metric-grid">{metrics.map((item) => <article className="progress-metric-card" key={item.label}><span className="control-label">{item.label.toUpperCase()}</span><strong>{item.value}</strong><p>{item.note}</p></article>)}</section>

        <section className="knowledge-map-panel">
          <div className="panel-heading"><div><span className="mini-label">{t("FINANCE KNOWLEDGE MAP", "CARTE DES CONNAISSANCES FINANCIÈRES")}</span><h2>{t("Your mastery by domain", "Ta maîtrise / mastery par domaine")}</h2></div><span className="connection-badge">{user ? t("Live account data", "Données du compte en direct") : t("Sign in to sync", "Connecte-toi pour synchroniser")}</span></div>
          <div className="knowledge-domain-grid">{domainStats.map((domain, index) => <article className="knowledge-domain-card" key={domain.name}><div className="knowledge-domain-head"><span>{String(index + 1).padStart(2, "0")}</span><strong>{domain.percent}%</strong></div><h3>{domain.name}</h3><p>{domain.detail}</p><div className="empty-progress-bar"><span style={{ width: `${domain.percent}%` }} /></div><small>{isFrench ? `${domain.complete} / ${domain.total} modules terminés` : `${domain.complete} / ${domain.total} modules completed`}</small></article>)}</div>
        </section>

        <section className="next-best-panel">
          <div>
            <span className="mini-label">{t("NEXT BEST LESSON", "PROCHAIN MEILLEUR COURS")}</span>
            <h2>
              {nextModule
                ? (isFrench ? `${nextModule.year.replace("Year", "Année")} · ${nextModule.titleFr}` : `${nextModule.year} · ${nextModule.title}`)
                : t(
                    `Next course in build · ${firstPlannedModule?.title ?? "Year 1 curriculum"}`,
                    `Prochain cours en construction · ${firstPlannedModule?.titleFr ?? "Programme Année 1"}`,
                  )}
            </h2>
          </div>
          <p>{nextModule
            ? t(
                "This recommendation follows real available course content and curriculum prerequisites.",
                "Cette recommandation suit les vrais cours disponibles et les prérequis du programme.",
              )
            : t(
                "You have completed every full lesson currently published. New Year 1 lessons are being added next.",
                "Tu as terminé tous les cours complets actuellement publiés. Les prochains cours de l’Année 1 arrivent ensuite.",
              )}
          </p>
          <Link href={nextModule ? `/university/${nextModule.slug}` : "/university"}>
            {nextModule ? t("Open lesson", "Ouvrir le cours") : t("Open Finance University", "Ouvrir l’Université de Finance")} →
          </Link>
        </section>
      </div>
    </SectionLayout>
  );
}
