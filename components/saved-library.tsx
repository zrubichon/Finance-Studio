"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useLanguage } from "@/components/language-provider";

type SavedItem = {
  id: string;
  item_type: string;
  item_key: string;
  metadata: Record<string, unknown>;
  created_at: string;
};

type Filter = "all" | "lesson" | "news" | "dictionary";

function metadataString(
  metadata: Record<string, unknown>,
  key: string,
  fallback = "",
) {
  const value = metadata[key];
  return typeof value === "string" ? value : fallback;
}

function itemHref(item: SavedItem) {
  const href = metadataString(item.metadata, "href");
  if (href) return href;
  if (item.item_type === "lesson") return `/university/${item.item_key}`;
  return "#";
}

export default function SavedLibrary() {
  const { isFrench, text } = useLanguage();
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
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!active) return;

      if (!user) {
        setAuthenticated(false);
        setLoading(false);
        return;
      }

      setAuthenticated(true);

      const { data, error } = await supabase
        .from("saved_items")
        .select("id,item_type,item_key,metadata,created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (!active) return;

      if (error) {
        setStatus(
          text(
            "Your saved items could not be loaded.",
            "Tes éléments enregistrés n’ont pas pu être chargés.",
          ),
        );
      } else {
        setItems((data ?? []) as SavedItem[]);
      }

      setLoading(false);
    }

    void load();

    return () => {
      active = false;
    };
  }, [text]);

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return items.filter((item) => {
      if (filter !== "all" && item.item_type !== filter) return false;
      if (!normalizedQuery) return true;

      const searchable = [
        item.item_key,
        ...Object.values(item.metadata).filter(
          (value): value is string => typeof value === "string",
        ),
      ]
        .join(" ")
        .toLowerCase();

      return searchable.includes(normalizedQuery);
    });
  }, [filter, items, query]);

  const counts = useMemo(
    () => ({
      all: items.length,
      lesson: items.filter((item) => item.item_type === "lesson").length,
      news: items.filter((item) => item.item_type === "news").length,
      dictionary: items.filter((item) => item.item_type === "dictionary")
        .length,
    }),
    [items],
  );

  async function removeItem(item: SavedItem) {
    if (removingId) return;

    setRemovingId(item.id);
    setStatus("");

    const supabase = createClient();
    const { error } = await supabase
      .from("saved_items")
      .delete()
      .eq("id", item.id);

    if (error) {
      setStatus(
        text(
          "This item could not be removed.",
          "Cet élément n’a pas pu être supprimé.",
        ),
      );
    } else {
      setItems((current) => current.filter((entry) => entry.id !== item.id));
    }

    setRemovingId(null);
  }

  const filters: Array<{ id: Filter; en: string; fr: string }> = [
    { id: "all", en: "All", fr: "Tout" },
    { id: "lesson", en: "Lessons", fr: "Cours" },
    { id: "news", en: "News", fr: "Actualités" },
    { id: "dictionary", en: "Dictionary", fr: "Dictionnaire" },
  ];

  if (loading || authenticated === null) {
    return (
      <div className="empty-state">
        <strong>{text("Loading your library…", "Chargement de ta bibliothèque…")}</strong>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <section className="saved-login-panel">
        <span className="mini-label">
          {text("PRIVATE LIBRARY", "BIBLIOTHÈQUE PRIVÉE")}
        </span>
        <h2>
          {text(
            "Sign in to build your personal finance library.",
            "Connecte-toi pour construire ta bibliothèque finance personnelle.",
          )}
        </h2>
        <p>
          {text(
            "Saved lessons, articles and dictionary terms stay attached to your account.",
            "Les cours, articles et termes du dictionnaire enregistrés restent liés à ton compte.",
          )}
        </p>
        <Link className="full-button" href="/login">
          {text("Sign in", "Se connecter")} →
        </Link>
      </section>
    );
  }

  return (
    <div className="workspace-stack">
      <section className="saved-library-toolbar">
        <label>
          <span className="control-label">
            {text("SEARCH YOUR LIBRARY", "RECHERCHER DANS TA BIBLIOTHÈQUE")}
          </span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={text(
              "Search a lesson, article or concept…",
              "Recherche un cours, un article ou un concept…",
            )}
          />
        </label>

        <div>
          <span className="control-label">
            {text("CONTENT TYPE", "TYPE DE CONTENU")}
          </span>
          <div className="chip-row">
            {filters.map((item) => (
              <button
                className={filter === item.id ? "chip active" : "chip"}
                type="button"
                key={item.id}
                onClick={() => setFilter(item.id)}
              >
                {isFrench ? item.fr : item.en} · {counts[item.id]}
              </button>
            ))}
          </div>
        </div>
      </section>

      {status && (
        <p className="inline-status" role="status">
          {status}
        </p>
      )}

      {filteredItems.length > 0 ? (
        <section className="saved-library-grid">
          {filteredItems.map((item) => {
            const titleEn = metadataString(
              item.metadata,
              "titleEn",
              metadataString(item.metadata, "title", item.item_key),
            );
            const titleFr = metadataString(
              item.metadata,
              "titleFr",
              titleEn,
            );
            const subtitleEn = metadataString(item.metadata, "subtitleEn");
            const subtitleFr = metadataString(
              item.metadata,
              "subtitleFr",
              subtitleEn,
            );
            const source = metadataString(item.metadata, "source");
            const href = itemHref(item);

            return (
              <article className="saved-library-card" key={item.id}>
                <div className="saved-library-card-head">
                  <span className="mini-label">
                    {item.item_type === "lesson"
                      ? text("LESSON", "COURS")
                      : item.item_type === "news"
                        ? text("NEWS", "ACTUALITÉ")
                        : text("DICTIONARY", "DICTIONNAIRE")}
                  </span>
                  <button
                    type="button"
                    className="saved-remove-button"
                    disabled={removingId === item.id}
                    onClick={() => void removeItem(item)}
                  >
                    {removingId === item.id
                      ? text("Removing…", "Suppression…")
                      : text("Remove", "Supprimer")}
                  </button>
                </div>

                <h2>{isFrench ? titleFr : titleEn}</h2>

                {(isFrench ? subtitleFr : subtitleEn) ? (
                  <p>{isFrench ? subtitleFr : subtitleEn}</p>
                ) : null}

                {source ? <small>{source}</small> : null}

                {href !== "#" ? (
                  href.startsWith("http") ? (
                    <a
                      className="module-open-link"
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {text("Open resource", "Ouvrir la ressource")} ↗
                    </a>
                  ) : (
                    <Link className="module-open-link" href={href}>
                      {text("Open resource", "Ouvrir la ressource")} →
                    </Link>
                  )
                ) : null}
              </article>
            );
          })}
        </section>
      ) : (
        <div className="empty-state">
          <strong>
            {items.length === 0
              ? text(
                  "Your library is empty.",
                  "Ta bibliothèque est vide.",
                )
              : text(
                  "No saved item matches this filter.",
                  "Aucun élément enregistré ne correspond à ce filtre.",
                )}
          </strong>
          <p>
            {items.length === 0
              ? text(
                  "Use the Save button on lessons, news and dictionary terms to build it.",
                  "Utilise le bouton Enregistrer sur les cours, actualités et termes du dictionnaire pour la remplir.",
                )
              : text(
                  "Try another content type or search term.",
                  "Essaie un autre type de contenu ou une autre recherche.",
                )}
          </p>
        </div>
      )}
    </div>
  );
}
