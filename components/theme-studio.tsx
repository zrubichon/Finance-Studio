"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Theme = "classic" | "girl" | "terminal";

const presets: { id: Theme; name: string; description: string; swatches: string[] }[] = [
  { id: "classic", name: "Classic Finance", description: "Editorial cream, deep green and high readability for long study sessions.", swatches: ["#f4f2eb", "#fffdf7", "#1f5a45", "#172019"] },
  { id: "girl", name: "Finance Girl", description: "Cream, blush and burgundy without sacrificing professional information density.", swatches: ["#f8f0ec", "#fffaf7", "#852f47", "#3c2329"] },
  { id: "terminal", name: "Wall Street", description: "Dark, compact and terminal-inspired for users who prefer high-contrast market screens.", swatches: ["#0d1110", "#121816", "#81e6b5", "#ebf6ef"] },
];

export default function ThemeStudio() {
  const [theme, setTheme] = useState<Theme>("classic");
  const [radius, setRadius] = useState("22");
  const [accent, setAccent] = useState("#1f5a45");
  const [userId, setUserId] = useState<string | null>(null);
  const [syncLabel, setSyncLabel] = useState("Stored on this device");

  useEffect(() => {
    const savedTheme = (window.localStorage.getItem("finance-studio-theme") as Theme | null) || "classic";
    const savedRadius = window.localStorage.getItem("finance-studio-radius") || "22";
    const savedAccent = window.localStorage.getItem("finance-studio-accent") || "#1f5a45";
    setTheme(savedTheme);
    setRadius(savedRadius);
    setAccent(savedAccent);

    async function hydrateAccountPreferences() {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        setUserId(user.id);
        const { data } = await supabase
          .from("user_preferences")
          .select("theme, accent_color, card_radius")
          .eq("user_id", user.id)
          .maybeSingle();

        if (!data) return;

        const accountTheme = data.theme as Theme;
        const accountRadius = String(data.card_radius ?? 22);
        const accountAccent = data.accent_color || (accountTheme === "girl" ? "#852f47" : accountTheme === "terminal" ? "#81e6b5" : "#1f5a45");

        setTheme(accountTheme);
        setRadius(accountRadius);
        setAccent(accountAccent);
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

        setSyncLabel("Synced with your account");
      } catch {
        setSyncLabel("Stored on this device");
      }
    }

    void hydrateAccountPreferences();
  }, []);

  async function persistPreference(values: Record<string, string | number | null>) {
    if (!userId) return;
    try {
      const supabase = createClient();
      await supabase.from("user_preferences").update({ ...values, updated_at: new Date().toISOString() }).eq("user_id", userId);
      setSyncLabel("Synced with your account");
    } catch {
      setSyncLabel("Saved locally · account sync pending");
    }
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
    } else {
      void persistPreference({ theme: nextTheme });
    }
  };

  const applyRadius = (nextRadius: string) => {
    setRadius(nextRadius);
    window.localStorage.setItem("finance-studio-radius", nextRadius);
    document.documentElement.style.setProperty("--radius", `${nextRadius}px`);
    void persistPreference({ card_radius: Number(nextRadius) });
  };

  const applyAccent = (nextAccent: string) => {
    setAccent(nextAccent);
    setTheme("classic");
    window.localStorage.setItem("finance-studio-theme", "classic");
    window.localStorage.setItem("finance-studio-accent", nextAccent);
    document.documentElement.dataset.theme = "classic";
    document.documentElement.style.setProperty("--accent", nextAccent);
    void persistPreference({ theme: "classic", accent_color: nextAccent });
  };

  return (
    <div className="workspace-stack">
      <section className="theme-preset-grid">
        {presets.map((preset) => (
          <button className={theme === preset.id ? "theme-preset-card active" : "theme-preset-card"} key={preset.id} onClick={() => applyTheme(preset.id)} type="button">
            <div className="theme-swatch-row">{preset.swatches.map((swatch) => <span key={swatch} style={{ background: swatch }} />)}</div>
            <span className="mini-label">PRESET</span>
            <h2>{preset.name}</h2>
            <p>{preset.description}</p>
          </button>
        ))}
      </section>

      <section className="theme-control-panel">
        <div>
          <span className="control-label">CARD ROUNDNESS</span>
          <div className="chip-row">
            {["10", "16", "22", "30"].map((value) => (
              <button className={radius === value ? "chip active" : "chip"} key={value} onClick={() => applyRadius(value)} type="button">{value}px</button>
            ))}
          </div>
        </div>
        <label className="accent-control">
          <span className="control-label">CUSTOM CLASSIC ACCENT</span>
          <div><input type="color" value={accent} onChange={(event) => applyAccent(event.target.value)} /><strong>{accent.toUpperCase()}</strong></div>
        </label>
      </section>

      <section className="theme-preview-panel">
        <div className="theme-preview-copy">
          <span className="mini-label">LIVE PREVIEW · {syncLabel.toUpperCase()}</span>
          <h2>Your workspace updates immediately.</h2>
          <p>Guests keep preferences in this browser. Signed-in users load and save their Theme Studio choices through their FinanceStudio account.</p>
        </div>
        <div className="theme-preview-dashboard">
          <div className="preview-mini-card"><span>MARKETS</span><strong>Rates & curves</strong><p>Teaching layer + real data connection</p></div>
          <div className="preview-mini-card"><span>LEARNING</span><strong>Year 1 Foundations</strong><p>Concept → math → market</p></div>
          <div className="preview-mini-card"><span>INTERVIEW</span><strong>Technical drill</strong><p>Reasoning before memorization</p></div>
        </div>
      </section>
    </div>
  );
}
