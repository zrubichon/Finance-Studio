import Link from "next/link";
import { cookies } from "next/headers";
import SectionLayout from "@/components/section-layout";
import { createClient } from "@/lib/supabase/server";
import { allCurriculumModules, domainDescriptions, domainDescriptionsFr, domainLabelsFr, type CurriculumDomain } from "@/lib/curriculum";
import { hasLessonContent, lessons } from "@/lib/lesson-registry";

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
  let weeklyActions = 0;
  let activeDays30 = 0;
  let masteryRows: {
    concept_key: string;
    mastery_score: number;
    attempts: number;
    next_review_at: string | null;
  }[] = [];

  if (user) {
    const [progressResult, masteryResult, interviewResult, activityResult] = await Promise.all([
      supabase.from("course_progress").select("lesson_slug,status,progress_percent").eq("user_id", user.id),
      supabase.from("concept_mastery").select("concept_key,mastery_score,attempts,next_review_at").eq("user_id", user.id),
      supabase.from("interview_attempts").select("id", { count: "exact", head: true }).eq("user_id", user.id),
      supabase.from("user_activity_days").select("activity_date,activity_count").eq("user_id", user.id).order("activity_date", { ascending: false }).limit(60),
    ]);
    progressRows = progressResult.data ?? [];
    masteryRows = (masteryResult.data ?? []).map((row) => ({
      concept_key: row.concept_key,
      mastery_score: Number(row.mastery_score ?? 0),
      attempts: Number(row.attempts ?? 0),
      next_review_at: row.next_review_at,
    }));
    conceptsMastered = masteryRows.filter((row) => row.mastery_score >= 70).length;
    interviewDrills = interviewResult.count ?? 0;

    const activityRows = (activityResult.data ?? []).map((row) => ({
      activity_date: row.activity_date,
      activity_count: Number(row.activity_count ?? 0),
    }));
    streak = calculateStreak(activityRows.map((row) => row.activity_date));

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const sevenDayStart = new Date(today);
    sevenDayStart.setUTCDate(sevenDayStart.getUTCDate() - 6);
    const thirtyDayStart = new Date(today);
    thirtyDayStart.setUTCDate(thirtyDayStart.getUTCDate() - 29);

    weeklyActions = activityRows
      .filter(
        (row) =>
          new Date(`${row.activity_date}T00:00:00Z`).getTime() >=
          sevenDayStart.getTime(),
      )
      .reduce((sum, row) => sum + row.activity_count, 0);

    activeDays30 = activityRows.filter(
      (row) =>
        new Date(`${row.activity_date}T00:00:00Z`).getTime() >=
        thirtyDayStart.getTime(),
    ).length;
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
  const curriculumComplete = modules.length > 0 && completedLessons === modules.length;
  const conceptLessonMap = new Map<
    string,
    { slug: string; title: string; titleFr: string }
  >();

  for (const lesson of lessons) {
    for (const question of lesson.quiz) {
      if (!conceptLessonMap.has(question.conceptKey)) {
        conceptLessonMap.set(question.conceptKey, {
          slug: lesson.slug,
          title: lesson.title.en,
          titleFr: lesson.title.fr,
        });
      }
    }
  }

  const now = Date.now();
  const reviewQueue = masteryRows
    .filter((row) => {
      const reviewAt = row.next_review_at
        ? new Date(row.next_review_at).getTime()
        : 0;
      return row.mastery_score < 70 || reviewAt <= now;
    })
    .sort((a, b) => {
      const aDue = a.next_review_at
        ? new Date(a.next_review_at).getTime()
        : 0;
      const bDue = b.next_review_at
        ? new Date(b.next_review_at).getTime()
        : 0;
      if (aDue !== bDue) return aDue - bDue;
      return a.mastery_score - b.mastery_score;
    })
    .slice(0, 6)
    .map((row) => ({
      ...row,
      lesson: conceptLessonMap.get(row.concept_key) ?? null,
    }));

  const metrics = [
    { label: t("Lessons completed", "Cours terminés"), value: String(completedLessons), note: t(`${modules.length} modules in the full curriculum`, `${modules.length} modules dans le programme complet`) },
    { label: t("Concepts mastered", "Concepts maîtrisés"), value: String(conceptsMastered), note: t("Mastery requires a score of 70 or above", "La maîtrise / mastery nécessite un score de 70 ou plus") },
    { label: t("Interview drills", "Entraînements entretien"), value: String(interviewDrills), note: t("Saved interview practice attempts", "Tentatives d’entretien / interview attempts enregistrées") },
    { label: t("Current streak", "Série actuelle / streak"), value: isFrench ? `${streak} jour${streak === 1 ? "" : "s"}` : `${streak} day${streak === 1 ? "" : "s"}`, note: t("Based on recorded learning activity", "Basé sur l’activité d’apprentissage enregistrée") },
    { label: t("7-day activity", "Activité sur 7 jours"), value: String(weeklyActions), note: t("Saved study, interview, tutoring and investing actions", "Actions enregistrées : cours, entretien, tutorat et investissement") },
    { label: t("Active days · 30d", "Jours actifs · 30 j"), value: String(activeDays30), note: t("Distinct days with meaningful FinanceStudio activity", "Jours distincts avec une activité FinanceStudio significative") },
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

        <section className="knowledge-map-panel">
          <div className="panel-heading">
            <div>
              <span className="mini-label">{t("SPACED REVIEW QUEUE", "FILE DE RÉVISION ESPACÉE / SPACED REVIEW")}</span>
              <h2>{t("Review weak or due concepts before they fade.", "Revois les concepts faibles ou arrivés à échéance avant qu’ils ne s’oublient.")}</h2>
            </div>
            <span className="connection-badge">
              {user
                ? isFrench
                  ? `${reviewQueue.length} priorité${reviewQueue.length === 1 ? "" : "s"} affichée${reviewQueue.length === 1 ? "" : "s"}`
                  : `${reviewQueue.length} priorit${reviewQueue.length === 1 ? "y" : "ies"} shown`
                : t("Sign in to build your queue", "Connecte-toi pour créer ta file")}
            </span>
          </div>

          {user && reviewQueue.length ? (
            <div className="review-queue-grid">
              {reviewQueue.map((item) => {
                const readableConcept = item.concept_key
                  .replace(/[-_]+/g, " ")
                  .replace(/\b\w/g, (letter) => letter.toUpperCase());
                const dueDate = item.next_review_at
                  ? new Date(item.next_review_at)
                  : null;

                return (
                  <article className="review-queue-card" key={item.concept_key}>
                    <div className="knowledge-domain-head">
                      <span>{item.mastery_score}%</span>
                      <strong>{isFrench ? `${item.attempts} tentatives` : `${item.attempts} attempts`}</strong>
                    </div>
                    <h3>{readableConcept}</h3>
                    <p>
                      {item.lesson
                        ? isFrench
                          ? item.lesson.titleFr
                          : item.lesson.title
                        : t("Concept review", "Révision du concept")}
                    </p>
                    <small>
                      {item.mastery_score < 70
                        ? t("Weak concept · review now", "Concept faible · à revoir maintenant")
                        : dueDate
                          ? isFrench
                            ? `Révision prévue : ${dueDate.toLocaleDateString("fr-FR")}`
                            : `Review due: ${dueDate.toLocaleDateString("en-US")}`
                          : t("Review now", "À revoir maintenant")}
                    </small>
                    {item.lesson && (
                      <Link href={`/university/${item.lesson.slug}`}>
                        {t("Review lesson", "Revoir le cours")} →
                      </Link>
                    )}
                  </article>
                );
              })}
            </div>
          ) : (
            <p className="account-muted">
              {user
                ? t(
                    "No weak or due concept is currently in your queue. New quiz attempts will schedule the next review automatically.",
                    "Aucun concept faible ou arrivé à échéance n’est actuellement dans ta file. Les nouvelles tentatives de quiz planifieront automatiquement la prochaine révision.",
                  )
                : t(
                    "Your queue is generated from saved quiz performance and review dates.",
                    "Ta file est générée à partir des performances aux quiz et des dates de révision enregistrées.",
                  )}
            </p>
          )}
        </section>

        <section className="next-best-panel">
          <div>
            <span className="mini-label">{t("NEXT BEST LESSON", "PROCHAIN MEILLEUR COURS")}</span>
            <h2>
              {nextModule
                ? (isFrench ? `${nextModule.year.replace("Year", "Année")} · ${nextModule.titleFr}` : `${nextModule.year} · ${nextModule.title}`)
                : curriculumComplete
                  ? t(
                      `Curriculum complete · ${modules.length}/${modules.length}`,
                      `Programme terminé · ${modules.length}/${modules.length}`,
                    )
                  : t(
                      `Next course in build · ${firstPlannedModule?.title ?? "Finance University"}`,
                      `Prochain cours en construction · ${firstPlannedModule?.titleFr ?? "Université de Finance"}`,
                    )}
            </h2>
          </div>
          <p>
            {nextModule
              ? t(
                  "This recommendation follows real available course content and curriculum prerequisites.",
                  "Cette recommandation suit les vrais cours disponibles et les prérequis du programme.",
                )
              : curriculumComplete
                ? t(
                    "You have completed all 48 FinanceStudio lessons. Use Interview Studio, AI Professor and weak-concept reviews to turn completion into durable mastery.",
                    "Tu as terminé les 48 cours FinanceStudio. Utilise Interview Studio, le Professeur IA et la révision des concepts faibles pour transformer la complétion en maîtrise durable.",
                  )
                : t(
                    "You have completed every lesson currently available. The next planned module will appear here when published.",
                    "Tu as terminé tous les cours actuellement disponibles. Le prochain module prévu apparaîtra ici lorsqu’il sera publié.",
                  )}
          </p>
          <Link href={nextModule ? `/university/${nextModule.slug}` : curriculumComplete ? "/interview" : "/university"}>
            {nextModule
              ? t("Open lesson", "Ouvrir le cours")
              : curriculumComplete
                ? t("Practice in Interview Studio", "S’entraîner dans Interview Studio")
                : t("Open Finance University", "Ouvrir l’Université de Finance")} →
          </Link>
        </section>
      </div>
    </SectionLayout>
  );
}
