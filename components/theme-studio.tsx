"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useLanguage } from "@/components/language-provider";

type Theme = "classic" | "girl" | "terminal";
type SyncState = "local" | "synced" | "pending";

const presets: { id: Theme; name: string; nameFr: string; description: string; descriptionFr: string; swatches: string[] }[] = [
  { id: "classic", name: "Classic Finance", nameFr: "Finance Classique", description: "Editorial cream, deep green and high readability for long study sessions.", descriptionFr: "Crème éditorial, vert profond et excellente lisibilité pour de longues sessions d’étude.", swatches: ["#f4f2eb", "#fffdf7", "#1f5a45", "#172019"] },
  { id: "girl", name: "Finance Girl", nameFr: "Finance Girl", description: "Cream, blush and burgundy without sacrificing professional information density.", descriptionFr: "Crème, blush et bordeaux sans sacrifier la densité d’information professionnelle.", swatches: ["#f8f0ec", "#fffaf7", "#852f47", "#3c2329"] },
  { id: "terminal", name: "Wall Street", nameFr: "Wall Street", description: "Dark, compact and terminal-inspired for users who prefer high-contrast market screens.", descriptionFr: "Sombre, compact et inspiré des terminaux de marché pour les utilisateurs qui préfèrent un affichage à fort contraste.", swatches: ["#0d1110", "#121816", "#81e6b5", "#ebf6ef"] },
];

export default function ThemeStudio() {
  const { isFrench, text } = useLanguage();
  const [theme, setTheme] = useState<Theme>("classic");
  const [radius, setRadius] = useState("22");
  const [accent, setAccent] = useState("#1f5a45");
  const [userId, setUserId] = useState<string | null>(null);
  const [syncState, setSyncState] = useState<SyncState>("local");

  useEffect(() => {
    const savedTheme = (window.localStorage.getItem("finance-studio-theme") as Theme | null) || "classic";
    const savedRadius = window.localStorage.getItem("finance-studio-radius") || "22";
    const savedAccent = window.localStorage.getItem("finance-studio-accent") || "#1f5a45";
    setTheme(savedTheme); setRadius(savedRadius); setAccent(savedAccent);

    async function hydrateAccountPreferences() {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        setUserId(user.id);
        const { data } = await supabase.from("user_preferences").select("theme, accent_color, card_radius").eq("user_id", user.id).maybeSingle();
        if (!data) return;
        const accountTheme = data.theme as Theme;
        const accountRadius = String(data.card_radius ?? 22);
        const accountAccent = data.accent_color || (accountTheme === "girl" ? "#852f47" : accountTheme === "terminal" ? "#81e6b5" : "#1f5a45");
        setTheme(accountTheme); setRadius(accountRadius); setAccent(accountAccent);
        window.localStorage.setItem("finance-studio-theme", accountTheme);
        window.localStorage.setItem("finance-studio-radius", accountRadius);
        document.documentElement.dataset.theme = accountTheme;
        document.documentElement.style.setProperty("--radius", `${accountRadius}px`);
        if (data.accent_color && accountTheme === "classic") {
          window.localStorage.setItem("finance-studio-accent", data.accent_color);
          document.documentElement.style.setProperty("--accent", data.accent_color);
        } else {
          window.localStorage.removeItem("finance-studio-accent");
          document.documentElement.style.removeProperty("--accent");
        }
        setSyncState("synced");
      } catch { setSyncState("local"); }
    }
    void hydrateAccountPreferences();
  }, []);

  async function persistPreference(values: Record<string, string | number | null>) {
    if (!userId) return;
    try {
      const supabase = createClient();
      await supabase.from("user_preferences").update({ ...values, updated_at: new Date().toISOString() }).eq("user_id", userId);
      setSyncState("synced");
    } catch { setSyncState("pending"); }
  }

  const applyTheme = (nextTheme: Theme) => {
    setTheme(nextTheme);
    window.localStorage.setItem("finance-studio-theme", nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    if (nextTheme !== "classic") {
      window.localStorage.removeItem("finance-studio-accent");
      document.documentElement.style.removeProperty("--accent");
      setAccent(nextTheme === "girl" ? "#852f47" : "#81e6b5");
      void persistPreference({ theme: nextTheme, accent_color: null });
    } else void persistPreference({ theme: nextTheme });
  };

  const applyRadius = (nextRadius: string) => {
    setRadius(nextRadius);
    window.localStorage.setItem("finance-studio-radius", nextRadius);
    document.documentElement.style.setProperty("--radius", `${nextRadius}px`);
    void persistPreference({ card_radius: Number(nextRadius) });
  };

  const applyAccent = (nextAccent: string) => {
    setAccent(nextAccent); setTheme("classic");
    window.localStorage.setItem("finance-studio-theme", "classic");
    window.localStorage.setItem("finance-studio-accent", nextAccent);
    document.documentElement.dataset.theme = "classic";
    document.documentElement.style.setProperty("--accent", nextAccent);
    void persistPreference({ theme: "classic", accent_color: nextAccent });
  };

  const syncLabel = syncState === "synced" ? text("Synced with your account", "Synchronisé avec ton compte") : syncState === "pending" ? text("Saved locally · account sync pending", "Enregistré localement · synchronisation du compte en attente") : text("Stored on this device", "Enregistré sur cet appareil");

  return (
    <div className="workspace-stack">
      <section className="theme-preset-grid">
        {presets.map((preset) => <button className={theme === preset.id ? "theme-preset-card active" : "theme-preset-card"} key={preset.id} onClick={() => applyTheme(preset.id)} type="button"><div className="theme-swatch-row">{preset.swatches.map((swatch) => <span key={swatch} style={{ background: swatch }} />)}</div><span className="mini-label">{text("PRESET", "PRÉRÉGLAGE")}</span><h2>{isFrench ? preset.nameFr : preset.name}</h2><p>{isFrench ? preset.descriptionFr : preset.description}</p></button>)}
      </section>

      <section className="theme-control-panel">
        <div><span className="control-label">{text("CARD ROUNDNESS", "ARRONDI DES CARTES")}</span><div className="chip-row">{["10", "16", "22", "30"].map((value) => <button className={radius === value ? "chip active" : "chip"} key={value} onClick={() => applyRadius(value)} type="button">{value}px</button>)}</div></div>
        <label className="accent-control"><span className="control-label">{text("CUSTOM CLASSIC ACCENT", "COULEUR D’ACCENT CLASSIQUE PERSONNALISÉE")}</span><div><input type="color" value={accent} onChange={(event) => applyAccent(event.target.value)} /><strong>{accent.toUpperCase()}</strong></div></label>
      </section>

      <section className="theme-preview-panel">
        <div className="theme-preview-copy"><span className="mini-label">{text("LIVE PREVIEW", "APERÇU EN DIRECT")} · {syncLabel.toUpperCase()}</span><h2>{text("Your workspace updates immediately.", "Ton espace de travail se met à jour immédiatement.")}</h2><p>{text("Guests keep preferences in this browser. Signed-in users load and save their Theme Studio choices through their FinanceStudio account.", "Les visiteurs conservent leurs préférences dans ce navigateur. Les utilisateurs connectés chargent et enregistrent leurs choix de thème via leur compte FinanceStudio.")}</p></div>
        <div className="theme-preview-dashboard">
          <div className="preview-mini-card"><span>{text("MARKETS", "MARCHÉS")}</span><strong>{text("Rates & curves", "Taux & courbes / rates & curves")}</strong><p>{text("Teaching layer + real data connection", "Couche pédagogique + connexion aux données réelles")}</p></div>
          <div className="preview-mini-card"><span>{text("LEARNING", "APPRENTISSAGE")}</span><strong>{text("Year 1 Foundations", "Année 1 · Fondations")}</strong><p>{text("Concept → math → market", "Concept → calcul → marché")}</p></div>
          <div className="preview-mini-card"><span>{text("INTERVIEW", "ENTRETIEN")}</span><strong>{text("Technical drill", "Entraînement technique")}</strong><p>{text("Reasoning before memorization", "Raisonnement avant mémorisation")}</p></div>
        </div>
      </section>
    </div>
  );
}
