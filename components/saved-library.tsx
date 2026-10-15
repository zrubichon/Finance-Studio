"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useLanguage } from "@/components/language-provider";
import { allCurriculumModules } from "@/lib/curriculum";

type SavedItem = {
  id: string;
  item_type: string;
  item_key: string;
  metadata: Record<string, unknown>;
  created_at: string;
  progressDerived?: boolean;
};
type ProgressRow = { lesson_slug: string; status: string; progress_percent: number };
type Filter = "all" | "lesson" | "news" | "dictionary";

function metadataString(metadata: Record<string, unknown>, key: string, fallback = "") {
  const value = metadata[key]; return typeof value === "string" ? value : fallback;
}
function itemHref(item: SavedItem) {
  if (item.item_type === "lesson") return `/university/${encodeURIComponent(item.item_key)}`;
  if (item.item_type === "dictionary") return `/dictionary?term=${encodeURIComponent(item.item_key)}`;
  if (item.item_type === "news") {
    const href = metadataString(item.metadata, "href");
    try { const url = new URL(href); if (["https:", "http:"].includes(url.protocol)) return url.toString(); } catch { return "#"; }
  }
  return "#";
}

export default function SavedLibrary() {
  const { isFrench, text } = useLanguage();
  const modules = useMemo(() => allCurriculumModules(), []);
  const moduleMap = useMemo(() => new Map(modules.map((module) => [module.slug, module])), [modules]);
  const [items, setItems] = useState<SavedItem[]>([]);
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    let active = true;
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!active) return;
      if (!user) { setAuthenticated(false); setLoading(false); return; }
      setAuthenticated(true);

      const [savedResult, progressResult] = await Promise.all([
        supabase.from("saved_items").select("id,item_type,item_key,metadata,created_at").eq("user_id", user.id).order("created_at", { ascending: false }),
        supabase.from("course_progress").select("lesson_slug,status,progress_percent").eq("user_id", user.id),
      ]);
      if (!active) return;
      if (savedResult.error) setStatus(text("Some saved items could not be loaded.", "Certains éléments enregistrés n’ont pas pu être chargés."));

      const saved = (savedResult.data ?? []) as SavedItem[];
      const savedLessons = new Set(saved.filter((item) => item.item_type === "lesson").map((item) => item.item_key));
      const progressItems = ((progressResult.data ?? []) as ProgressRow[])
        .filter((row) => row.status === "completed" || Number(row.progress_percent) > 0)
        .filter((row) => !savedLessons.has(row.lesson_slug))
        .map((row): SavedItem => {
          const module = moduleMap.get(row.lesson_slug);
          return {
            id: `progress-${row.lesson_slug}`,
            item_type: "lesson",
            item_key: row.lesson_slug,
            created_at: "",
            progressDerived: true,
            metadata: {
              titleEn: module?.title ?? row.lesson_slug.replace(/-/g, " "),
              titleFr: module?.titleFr ?? module?.title ?? row.lesson_slug.replace(/-/g, " "),
              subtitleEn: row.status === "completed" ? "Completed lesson · available from your learning history" : `${Math.round(Number(row.progress_percent) || 0)}% complete · continue where you left off`,
              subtitleFr: row.status === "completed" ? "Cours terminé · retrouvé depuis ton historique d’apprentissage" : `${Math.round(Number(row.progress_percent) || 0)} % terminé · reprends là où tu t’es arrêté`,
              source: "Finance University progress",
            },
          };
        });
      setItems([...progressItems, ...saved]);
      setLoading(false);
    }
    void load(); return () => { active = false; };
  }, [moduleMap, text]);

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return items.filter((item) => {
      if (filter !== "all" && item.item_type !== filter) return false;
      if (!normalizedQuery) return true;
      return [item.item_key, ...Object.values(item.metadata).filter((value): value is string => typeof value === "string")].join(" ").toLowerCase().includes(normalizedQuery);
    });
  }, [filter, items, query]);

  const counts = useMemo(() => ({ all: items.length, lesson: items.filter(i => i.item_type === "lesson").length, news: items.filter(i => i.item_type === "news").length, dictionary: items.filter(i => i.item_type === "dictionary").length }), [items]);

  async function removeItem(item: SavedItem) {
    if (removingId || item.progressDerived) return;
    setRemovingId(item.id); setStatus("");
    const { error } = await createClient().from("saved_items").delete().eq("id", item.id);
    if (error) setStatus(text("This item could not be removed.", "Cet élément n’a pas pu être supprimé."));
    else setItems((current) => current.filter((entry) => entry.id !== item.id));
    setRemovingId(null);
  }

  const filters: Array<{ id: Filter; en: string; fr: string }> = [
    { id: "all", en: "All", fr: "Tout" }, { id: "lesson", en: "Lessons", fr: "Cours" }, { id: "news", en: "News", fr: "Actualités" }, { id: "dictionary", en: "Dictionary", fr: "Dictionnaire" },
  ];

  if (loading || authenticated === null) return <div className="empty-state"><strong>{text("Loading your library…", "Chargement de ta bibliothèque…")}</strong></div>;
  if (!authenticated) return <section className="saved-login-panel"><span className="mini-label">{text("PRIVATE LIBRARY", "BIBLIOTHÈQUE PRIVÉE")}</span><h2>{text("Sign in to build your personal finance library.", "Connecte-toi pour construire ta bibliothèque finance personnelle.")}</h2><p>{text("Saved resources plus your started and completed Finance University lessons stay attached to your account.", "Tes ressources enregistrées ainsi que les cours Finance University commencés et terminés restent liés à ton compte.")}</p><Link className="full-button" href="/login">{text("Sign in", "Se connecter")} →</Link></section>;

  return (
    <div className="workspace-stack">
      <section className="saved-library-toolbar">
        <label><span className="control-label">{text("SEARCH YOUR LIBRARY", "RECHERCHER DANS TA BIBLIOTHÈQUE")}</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={text("Search a lesson, article or concept…", "Recherche un cours, un article ou un concept…")} /></label>
        <div><span className="control-label">{text("CONTENT TYPE", "TYPE DE CONTENU")}</span><div className="chip-row">{filters.map((item) => <button className={filter === item.id ? "chip active" : "chip"} type="button" key={item.id} onClick={() => setFilter(item.id)}>{isFrench ? item.fr : item.en} · {counts[item.id]}</button>)}</div></div>
      </section>
      <section className="coverage-panel"><span className="mini-label">{text("LIBRARY + LEARNING HISTORY", "BIBLIOTHÈQUE + HISTORIQUE D’APPRENTISSAGE")}</span><p>{text("My Library now includes lessons you actually started or completed, even if you forgot to press Save. Explicitly saved news and dictionary terms remain here too.", "My Library inclut maintenant les cours réellement commencés ou terminés, même si tu as oublié de cliquer sur Enregistrer. Les news et termes explicitement sauvegardés restent également ici.")}</p></section>
      {status && <p className="inline-status" role="status">{status}</p>}
      {filteredItems.length > 0 ? <section className="saved-library-grid">{filteredItems.map((item) => {
        const titleEn = metadataString(item.metadata,"titleEn", metadataString(item.metadata,"title",item.item_key));
        const titleFr = metadataString(item.metadata,"titleFr",titleEn);
        const subtitleEn = metadataString(item.metadata,"subtitleEn"); const subtitleFr = metadataString(item.metadata,"subtitleFr",subtitleEn);
        const source = metadataString(item.metadata,"source"); const href = itemHref(item);
        return <article className="saved-library-card" key={item.id}><div className="saved-library-card-head"><span className="mini-label">{item.item_type === "lesson" ? text("LESSON", "COURS") : item.item_type === "news" ? text("NEWS", "ACTUALITÉ") : text("DICTIONARY", "DICTIONNAIRE")}</span>{item.progressDerived ? <span className="connection-badge">{text("From learning history", "Depuis l’historique")}</span> : <button type="button" className="saved-remove-button" disabled={removingId === item.id} onClick={() => void removeItem(item)}>{removingId === item.id ? text("Removing…", "Suppression…") : text("Remove", "Supprimer")}</button>}</div><h2>{isFrench ? titleFr : titleEn}</h2>{(isFrench ? subtitleFr : subtitleEn) ? <p>{isFrench ? subtitleFr : subtitleEn}</p> : null}{source ? <small>{source}</small> : null}{href !== "#" ? href.startsWith("http") ? <a className="module-open-link" href={href} target="_blank" rel="noreferrer">{text("Open resource", "Ouvrir la ressource")} ↗</a> : <Link className="module-open-link" href={href}>{text("Open resource", "Ouvrir la ressource")} →</Link> : null}</article>;
      })}</section> : <div className="empty-state"><strong>{items.length === 0 ? text("Your library is empty.", "Ta bibliothèque est vide.") : text("No library item matches this filter.", "Aucun élément ne correspond à ce filtre.")}</strong><p>{text("Complete a lesson or save a resource and it will appear here.", "Commence ou termine un cours, ou sauvegarde une ressource : elle apparaîtra ici.")}</p></div>}
    </div>
  );
}
