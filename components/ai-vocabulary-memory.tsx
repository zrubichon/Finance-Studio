"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useLanguage } from "@/components/language-provider";

type MemoryItem = {
  key: string;
  termEn: string;
  termFr: string;
  oneLineEn: string;
  oneLineFr: string;
  categoryEn?: string;
  categoryFr?: string;
  plainEn?: string;
  plainFr?: string;
  exampleEn?: string;
  exampleFr?: string;
};

const LOCAL_KEY = "finance-studio-ai-vocabulary";

function fromMetadata(itemKey: string, metadata: Record<string, unknown> | null): MemoryItem | null {
  if (!metadata) return null;
  const termEn = typeof metadata.titleEn === "string" ? metadata.titleEn : itemKey;
  const termFr = typeof metadata.titleFr === "string" ? metadata.titleFr : termEn;
  const oneLineEn = typeof metadata.subtitleEn === "string" ? metadata.subtitleEn : "";
  const oneLineFr = typeof metadata.subtitleFr === "string" ? metadata.subtitleFr : oneLineEn;
  return {
    key: itemKey,
    termEn,
    termFr,
    oneLineEn,
    oneLineFr,
    categoryEn: typeof metadata.categoryEn === "string" ? metadata.categoryEn : undefined,
    categoryFr: typeof metadata.categoryFr === "string" ? metadata.categoryFr : undefined,
    plainEn: typeof metadata.plainEn === "string" ? metadata.plainEn : undefined,
    plainFr: typeof metadata.plainFr === "string" ? metadata.plainFr : undefined,
    exampleEn: typeof metadata.exampleEn === "string" ? metadata.exampleEn : undefined,
    exampleFr: typeof metadata.exampleFr === "string" ? metadata.exampleFr : undefined,
  };
}

export default function AiVocabularyMemory() {
  const { isFrench, text } = useLanguage();
  const [items, setItems] = useState<MemoryItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let active = true;

    async function load() {
      const merged = new Map<string, MemoryItem>();
      try {
        const local = JSON.parse(localStorage.getItem(LOCAL_KEY) ?? "[]") as MemoryItem[];
        for (const item of local) if (item?.key) merged.set(item.key, item);
      } catch {}

      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data } = await supabase
            .from("saved_items")
            .select("item_key,metadata")
            .eq("user_id", user.id)
            .eq("item_type", "vocabulary")
            .order("created_at", { ascending: false })
            .limit(250);

          for (const row of data ?? []) {
            const normalized = fromMetadata(String(row.item_key), (row.metadata ?? null) as Record<string, unknown> | null);
            if (normalized) merged.set(normalized.key, normalized);
          }
        }
      } catch {}

      if (active) {
        setItems([...merged.values()]);
        setLoaded(true);
      }
    }

    void load();
    return () => { active = false; };
  }, []);

  const preview = useMemo(() => items.slice(0, 3), [items]);

  if (!loaded || preview.length === 0) return null;

  return (
    <section className="news-blueprint-panel">
      <div className="panel-heading">
        <div>
          <span className="mini-label">✦ {text("RECENT VOCABULARY", "VOCABULAIRE RÉCENT")}</span>
          <h2>{text("Your three most recent finance concepts", "Tes trois concepts finance les plus récents")}</h2>
        </div>
        <span className="connection-badge">3 {text("most recent", "plus récents")}</span>
      </div>

      <p className="explanation-copy">{text(
        "FinanceStudio keeps this section deliberately short: only the three most recent concepts you highlighted or explored are shown here.",
        "FinanceStudio garde volontairement cette section courte : seuls les trois concepts les plus récents que tu as surlignés ou explorés apparaissent ici.",
      )}</p>

      <div className="dictionary-grid">
        {preview.map((item) => (
          <article className="dictionary-card" key={item.key}>
            <div className="dictionary-card-head">
              <span className="mini-label">{isFrench ? (item.categoryFr || "Concept IA") : (item.categoryEn || "AI concept")}</span>
              <span>✦</span>
            </div>
            <h2>{isFrench ? `${item.termFr} / ${item.termEn}` : `${item.termEn} / ${item.termFr}`}</h2>
            <p>{isFrench ? item.oneLineFr : item.oneLineEn}</p>
            {(isFrench ? item.plainFr : item.plainEn) && (
              <div className="lesson-explanation">
                <div className="lesson-explanation-label"><span>{text("Plain explanation", "Explication simple")}</span></div>
                <p>{isFrench ? item.plainFr : item.plainEn}</p>
              </div>
            )}
            {(isFrench ? item.exampleFr : item.exampleEn) && (
              <p><strong>{text("Example:", "Exemple :")}</strong> {isFrench ? item.exampleFr : item.exampleEn}</p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}