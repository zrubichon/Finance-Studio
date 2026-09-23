"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useLanguage } from "@/components/language-provider";

export default function ForgotPasswordPage() {
  const { text } = useLanguage();
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim() || busy) return;

    setBusy(true);
    setMessage("");

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.resetPasswordForEmail(
        email.trim(),
        {
          redirectTo: `${window.location.origin}/auth/callback?next=/update-password`,
        },
      );

      if (error) throw error;

      setMessage(text(
        "If an account exists for this email, a password-reset link has been sent. Check your inbox and spam folder.",
        "Si un compte existe pour cette adresse, un lien de réinitialisation a été envoyé. Vérifie ta boîte de réception et les courriers indésirables.",
      ));
    } catch {
      setMessage(text(
        "The reset request could not be completed right now. Please try again.",
        "La demande de réinitialisation n’a pas pu être effectuée pour le moment. Réessaie.",
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
          <p className="eyebrow">{text("ACCOUNT RECOVERY", "RÉCUPÉRATION DU COMPTE")}</p>
          <h1>{text("Reset your FinanceStudio password.", "Réinitialise ton mot de passe FinanceStudio.")}</h1>
          <p>{text(
            "We will send a secure recovery link to the email associated with your account.",
            "Nous enverrons un lien de récupération sécurisé à l’adresse e-mail associée à ton compte.",
          )}</p>
        </div>
      </section>

      <section className="auth-panel">
        <div className="auth-panel-inner">
          <p className="eyebrow">{text("PASSWORD RESET", "RÉINITIALISATION DU MOT DE PASSE")}</p>
          <h2>{text("Enter your email.", "Entre ton adresse e-mail.")}</h2>

          <div className="auth-card">
            <form onSubmit={submit}>
              <label>
                <span>Email</span>
                <input
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </label>

              <button className="auth-submit" disabled={busy || !email.trim()} type="submit">
                {busy
                  ? text("Sending…", "Envoi…")
                  : text("Send reset link", "Envoyer le lien de réinitialisation")}
              </button>
            </form>

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
