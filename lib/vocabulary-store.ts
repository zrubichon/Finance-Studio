"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { normalizeDictionaryTerm } from "@/lib/dictionary-search";

export type VocabularyCard = { term: string; language: "EN" | "FR"; answer: string; at: number };
const eventName = "finance-vocabulary-changed";
const keyFor = (userId: string | null) => `finance-studio-vocabulary-v2:${userId || "guest"}`;
const identity = (card: VocabularyCard) => `${normalizeDictionaryTerm(card.term)}:${card.language}`;
function merge(...groups: VocabularyCard[][]) {
  const cards = new Map<string, VocabularyCard>();
  for (const card of groups.flat()) {
    if (!card || typeof card.term !== "string" || typeof card.answer !== "string" || !["EN", "FR"].includes(card.language)) continue;
    const previous = cards.get(identity(card));
    if (!previous || card.at >= previous.at) cards.set(identity(card), card);
  }
  return [...cards.values()].sort((a, b) => b.at - a.at);
}
function read(userId: string | null): VocabularyCard[] {
  try {
    const stored = JSON.parse(localStorage.getItem(keyFor(userId)) || "[]");
    const legacy = !userId ? JSON.parse(localStorage.getItem("finance-studio-concept-vocabulary") || "[]") : [];
    return merge(Array.isArray(legacy) ? legacy.filter(row => typeof row?.term === "string").map(row => ({...row,answer:""})) : [], Array.isArray(stored) ? stored : []);
  } catch { return []; }
}
function write(userId: string | null, cards: VocabularyCard[]) {
  localStorage.setItem(keyFor(userId), JSON.stringify(cards));
  window.dispatchEvent(new Event(eventName));
}

export async function saveVocabularyCard(card: VocabularyCard): Promise<"account" | "browser" | "failed"> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const userId = user?.id || null;
  let localSaved = false;
  try { write(userId, merge(read(userId), [card])); localSaved = true; } catch { /* Report storage failure below. */ }
  if (user) {
    const { error } = await supabase.from("saved_items").upsert({
      user_id: user.id, item_type: "concept", item_key: `vocabulary:${identity(card)}`,
      metadata: { ...card, source: "FinanceStudio Vocabulary", titleEn: card.term, titleFr: card.term, href: `/dictionary?term=${encodeURIComponent(card.term)}` },
    }, { onConflict: "user_id,item_type,item_key" });
    if (!error) return "account";
  }
  return localSaved ? "browser" : "failed";
}

export function useVocabularyCards() {
  const [cards, setCards] = useState<VocabularyCard[]>([]);
  useEffect(() => {
    let active = true;
    let scope: string | null = null;
    let revision = 0;
    const supabase = createClient();
    const refresh = () => { if (active) setCards(read(scope)); };
    async function load() {
      const currentRevision = ++revision;
      const { data: { user } } = await supabase.auth.getUser();
      if (!active || currentRevision !== revision) return;
      scope = user?.id || null;
      refresh();
      if (!user) return;
      const { data, error } = await supabase.from("saved_items").select("metadata").eq("user_id", user.id).eq("item_type", "concept").like("item_key", "vocabulary:%");
      if (!active || currentRevision !== revision || error) return;
      const merged = merge(read(scope), (data || []).map(row => row.metadata as VocabularyCard));
      try { write(scope, merged); } catch { setCards(merged); }
    }
    void load();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => { void load(); });
    window.addEventListener(eventName, refresh);
    window.addEventListener("storage", refresh);
    return () => { active = false; revision++; subscription.unsubscribe(); window.removeEventListener(eventName, refresh); window.removeEventListener("storage", refresh); };
  }, []);
  return cards;
}
