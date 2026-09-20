"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useLanguage, type Language } from "@/components/language-provider";
import { interviewTracks, type Track } from "@/lib/interview-content";

type Level = "beginner" | "intermediate" | "professional";

const regionOptions = [
  { value: "global", en: "Global", fr: "Monde" },
  { value: "usa", en: "USA", fr: "USA" },
  { value: "europe", en: "Europe", fr: "Europe" },
  { value: "uk", en: "UK", fr: "Royaume-Uni" },
  { value: "asia", en: "Asia", fr: "Asie" },
  { value: "china", en: "China", fr: "Chine" },
  { value: "japan", en: "Japan", fr: "Japon" },
  {
    value: "emerging-markets",
    en: "Emerging Markets",
    fr: "Marchés émergents",
  },
];

export default function AccountSettingsForm({
  initialDisplayName,
  initialLanguage,
  initialLevel,
  initialTargetRole,
  initialRegions,
}: {
  initialDisplayName: string;
  initialLanguage: Language;
  initialLevel: Level;
  initialTargetRole: string;
  initialRegions: string[];
}) {
  const router = useRouter();
  const { isFrench, setLanguage, text } = useLanguage();
  const [displayName, setDisplayName] = useState(initialDisplayName);
  const [language, setLocalLanguage] = useState<Language>(initialLanguage);
  const [level, setLevel] = useState<Level>(initialLevel);
  const [targetRole, setTargetRole] = useState(initialTargetRole);
  const [regions, setRegions] = useState<string[]>(
    initialRegions.length ? initialRegions : ["global", "usa", "europe"],
  );
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");

  const selectedRegions = useMemo(() => new Set(regions), [regions]);

  function toggleRegion(region: string) {
    setRegions((current) =>
      current.includes(region)
        ? current.filter((item) => item !== region)
        : [...current, region],
    );
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (saving) return;

    setSaving(true);
    setStatus("");

    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error(
          text(
            "Your session expired. Sign in again before saving.",
            "Ta session a expiré. Reconnecte-toi avant d’enregistrer.",
          ),
        );
      }

      const now = new Date().toISOString();
      const cleanName = displayName.trim().slice(0, 80);
      const cleanRole = targetRole.trim().slice(0, 120);
      const safeRegions = regions.length ? regions : ["global"];

      const [profileResult, preferencesResult] = await Promise.all([
        supabase.from("profiles").upsert(
          {
            user_id: user.id,
            display_name: cleanName || null,
            preferred_language: language.toLowerCase(),
            explanation_level: level,
            target_role: cleanRole || null,
            updated_at: now,
          },
          { onConflict: "user_id" },
        ),
        supabase.from("user_preferences").upsert(
          {
            user_id: user.id,
            market_regions: safeRegions,
            updated_at: now,
          },
          { onConflict: "user_id" },
        ),
      ]);

      if (profileResult.error) throw profileResult.error;
      if (preferencesResult.error) throw preferencesResult.error;

      if (language !== (isFrench ? "FR" : "EN")) {
        setLanguage(language);
      }

      setStatus(
        text(
          "Profile settings saved.",
          "Paramètres du profil enregistrés.",
        ),
      );
      router.refresh();
    } catch (cause) {
      setStatus(
        cause instanceof Error
          ? cause.message
          : text(
              "Your settings could not be saved.",
              "Tes paramètres n’ont pas pu être enregistrés.",
            ),
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="account-settings-form" onSubmit={submit}>
      <div className="account-settings-grid">
        <label>
          <span>{text("Display name", "Nom affiché")}</span>
          <input
            value={displayName}
            maxLength={80}
            onChange={(event) => setDisplayName(event.target.value)}
            placeholder={text("Your name", "Ton nom")}
          />
        </label>

        <label>
          <span>{text("Language", "Langue")}</span>
          <select
            value={language}
            onChange={(event) =>
              setLocalLanguage(event.target.value as Language)
            }
          >
            <option value="EN">English</option>
            <option value="FR">Français + English technical terms</option>
          </select>
        </label>

        <label>
          <span>{text("Explanation level", "Niveau d’explication")}</span>
          <select
            value={level}
            onChange={(event) => setLevel(event.target.value as Level)}
          >
            <option value="beginner">{text("Beginner", "Débutant")}</option>
            <option value="intermediate">
              {text("Intermediate", "Intermédiaire")}
            </option>
            <option value="professional">
              {text("Professional", "Professionnel")}
            </option>
          </select>
        </label>

        <label>
          <span>{text("Target role", "Métier cible / target role")}</span>
          <select
            value={targetRole}
            onChange={(event) => setTargetRole(event.target.value)}
          >
            <option value="">
              {text("No target selected", "Aucun métier cible")}
            </option>
            {interviewTracks.map((item) => (
              <option value={item.key} key={item.key}>
                {isFrench ? item.fr : item.key}
              </option>
            ))}
          </select>
        </label>
      </div>

      <fieldset className="account-region-fieldset">
        <legend>{text("Market regions", "Régions de marché")}</legend>
        <div className="account-region-grid">
          {regionOptions.map((region) => (
            <label
              className={
                selectedRegions.has(region.value)
                  ? "account-region-option active"
                  : "account-region-option"
              }
              key={region.value}
            >
              <input
                type="checkbox"
                checked={selectedRegions.has(region.value)}
                onChange={() => toggleRegion(region.value)}
              />
              <span>{isFrench ? region.fr : region.en}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="account-settings-actions">
        <button className="auth-submit" type="submit" disabled={saving}>
          {saving
            ? text("Saving…", "Enregistrement…")
            : text("Save profile settings", "Enregistrer les paramètres")}
        </button>
        {status && (
          <span className="auth-message" role="status">
            {status}
          </span>
        )}
      </div>
    </form>
  );
}
