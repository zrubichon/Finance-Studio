"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useLanguage } from "@/components/language-provider";

type Mode = "signin" | "signup";

export default function AuthForm() {
  const router = useRouter();
  const { language, text } = useLanguage();
  const [mode, setMode] = useState<Mode>("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    if (!email.trim() || password.length < 8) {
      setMessage(text("Use a valid email and a password of at least 8 characters.", "Utilise une adresse e-mail valide et un mot de passe d’au moins 8 caractères."));
      return;
    }
    setBusy(true);
    try {
      const supabase = createClient();
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: { name: name.trim() || email.split("@")[0], preferred_language: language.toLowerCase() },
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });
        if (error) throw error;
        if (data.session) { router.push("/account"); router.refresh(); return; }
        setMessage(text("Account created. Check your email to confirm your address, then sign in.", "Compte créé. Vérifie ton e-mail pour confirmer ton adresse, puis connecte-toi."));
        return;
      }
      const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      if (error) throw error;
      router.push("/account");
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : text("Authentication failed. Please try again.", "L’authentification a échoué. Réessaie."));
    } finally { setBusy(false); }
  }

  return (
    <div className="auth-card">
      <div className="auth-toggle" aria-label={text("Authentication mode", "Mode d’authentification")}>
        <button className={mode === "signin" ? "active" : ""} onClick={() => setMode("signin")} type="button">{text("Sign in", "Se connecter")}</button>
        <button className={mode === "signup" ? "active" : ""} onClick={() => setMode("signup")} type="button">{text("Create account", "Créer un compte")}</button>
      </div>

      <form onSubmit={handleSubmit}>
        {mode === "signup" && <label><span>{text("Name", "Nom")}</span><input autoComplete="name" onChange={(event) => setName(event.target.value)} placeholder={text("Your name", "Ton nom")} value={name} /></label>}
        <label><span>Email</span><input autoComplete="email" onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" type="email" value={email} /></label>
        <label><span>{text("Password", "Mot de passe")}</span><input autoComplete={mode === "signup" ? "new-password" : "current-password"} minLength={8} onChange={(event) => setPassword(event.target.value)} placeholder={text("At least 8 characters", "Au moins 8 caractères")} type="password" value={password} /></label>
        <button className="auth-submit" disabled={busy} type="submit">{busy ? text("Working…", "Traitement…") : mode === "signup" ? text("Create my FinanceStudio account", "Créer mon compte FinanceStudio") : text("Sign in to FinanceStudio", "Se connecter à FinanceStudio")}</button>
      </form>

      {message && <p className="auth-message" role="status">{message}</p>}
      <p className="auth-footnote">{text("Your progress, themes, interview practice and paper portfolio stay tied to your account.", "Ta progression, tes thèmes, tes entraînements d’entretien et ton portefeuille simulé / paper portfolio restent liés à ton compte.")}</p>
    </div>
  );
}
