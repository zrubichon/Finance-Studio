"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useLanguage } from "@/components/language-provider";

export default function UpdatePasswordPage() {
  const router = useRouter();
  const { text } = useLanguage();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let mounted = true;

    async function verifyRecoverySession() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!mounted) return;

      if (!user) {
        setMessage(text(
          "This recovery session is missing or expired. Request a new password-reset email.",
          "Cette session de récupération est absente ou expirée. Demande un nouveau lien de réinitialisation.",
        ));
        setReady(false);
        return;
      }

      setReady(true);
    }

    void verifyRecoverySession();
    return () => { mounted = false; };
  }, [text]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    if (password.length < 8) {
      setMessage(text(
        "Use a password of at least 8 characters.",
        "Utilise un mot de passe d’au moins 8 caractères.",
      ));
      return;
    }

    if (password !== confirmPassword) {
      setMessage(text(
        "The passwords do not match.",
        "Les mots de passe ne correspondent pas.",
      ));
      return;
    }

    setBusy(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;

      setMessage(text(
        "Password updated successfully.",
        "Mot de passe mis à jour avec succès.",
      ));
      router.push("/account");
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error
        ? error.message
        : text(
            "The password could not be updated.",
            "Le mot de passe n’a pas pu être mis à jour.",
          ));
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="auth-shell">
      <section className="auth-story">
        <Link className="brand" href="/">
          <span className="brand-mark">FS</span>
          <span>FinanceStudio</span>
        </Link>

        <div>
          <p className="eyebrow">{text("SECURE RECOVERY", "RÉCUPÉRATION SÉCURISÉE")}</p>
          <h1>{text("Choose a new password.", "Choisis un nouveau mot de passe.")}</h1>
          <p>{text(
            "The recovery link creates a temporary authenticated session before FinanceStudio allows a password change.",
            "Le lien de récupération crée une session authentifiée temporaire avant que FinanceStudio n’autorise le changement du mot de passe.",
          )}</p>
        </div>
      </section>

      <section className="auth-panel">
        <div className="auth-panel-inner">
          <p className="eyebrow">{text("NEW PASSWORD", "NOUVEAU MOT DE PASSE")}</p>
          <h2>{text("Secure your account.", "Sécurise ton compte.")}</h2>

          <div className="auth-card">
            {ready ? (
              <form onSubmit={submit}>
                <label>
                  <span>{text("New password", "Nouveau mot de passe")}</span>
                  <input
                    type="password"
                    autoComplete="new-password"
                    minLength={8}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                  />
                </label>

                <label>
                  <span>{text("Confirm password", "Confirmer le mot de passe")}</span>
                  <input
                    type="password"
                    autoComplete="new-password"
                    minLength={8}
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    required
                  />
                </label>

                <button
                  className="auth-submit"
                  type="submit"
                  disabled={busy || password.length < 8 || confirmPassword.length < 8}
                >
                  {busy
                    ? text("Updating…", "Mise à jour…")
                    : text("Update password", "Mettre à jour le mot de passe")}
                </button>
              </form>
            ) : (
              <Link className="full-button" href="/forgot-password">
                {text("Request a new recovery link", "Demander un nouveau lien de récupération")} →
              </Link>
            )}

            {message && <p className="auth-message" role="status">{message}</p>}
          </div>

          <Link className="auth-back" href="/login">
            ← {text("Back to sign in", "Retour à la connexion")}
          </Link>
        </div>
      </section>
    </main>
  );
}
