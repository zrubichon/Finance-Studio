"use client";

import { useState } from "react";

type Mode = "Beginner" | "Intermediate" | "Professional";

const explanations: Record<Mode, { title: string; body: string; example: string }> = {
  Beginner: {
    title: "Duration measures how sensitive a bond is to interest-rate changes.",
    body: "Think of duration as a bond's rate sensitivity. A bond with higher duration usually moves more when yields change. The key relationship is inverse: when yields rise, bond prices generally fall; when yields fall, bond prices generally rise.",
    example: "A rough rule: if modified duration is 6 and yields rise by 1 percentage point, the bond price may fall by about 6%, before convexity adjustments.",
  },
  Intermediate: {
    title: "Duration links bond price sensitivity to a change in yield.",
    body: "Modified duration approximates the percentage price change for a small parallel move in yield. Longer maturity, lower coupon and lower starting yield generally increase rate sensitivity, although cash-flow timing matters more precisely than maturity alone.",
    example: "ΔP/P ≈ -Modified Duration × Δy. With duration 6 and Δy = +0.50%, the first-order estimate is roughly -3.0%.",
  },
  Professional: {
    title: "Duration is a first-order measure of fixed-income price sensitivity to yield changes.",
    body: "Modified duration captures the local slope of the price-yield relationship and is most useful for relatively small yield moves. Portfolio risk management also requires key-rate duration, curve-shape exposure and convexity because a parallel-shift assumption is often too simplistic.",
    example: "For a non-parallel selloff, aggregate duration can hide where the exposure sits on the curve; key-rate durations reveal whether the risk is concentrated in the front end, belly or long end.",
  },
};

const teachingActions = ["Explain more simply", "Use numbers", "Show the formula", "Connect to markets", "Interview answer", "Quiz me"];

export default function ProfessorLab() {
  const [mode, setMode] = useState<Mode>("Beginner");
  const active = explanations[mode];

  return (
    <div className="workspace-stack">
      <section className="control-panel professor-control-panel">
        <div>
          <span className="control-label">EXPLANATION MODE</span>
          <div className="chip-row">
            {(["Beginner", "Intermediate", "Professional"] as Mode[]).map((item) => (
              <button className={mode === item ? "chip active" : "chip"} onClick={() => setMode(item)} key={item} type="button">{item}</button>
            ))}
          </div>
        </div>
        <div>
          <span className="control-label">AI CONNECTION</span>
          <span className="connection-badge">Teaching UI ready · model backend not connected yet</span>
        </div>
      </section>

      <section className="professor-demo-panel">
        <div className="professor-demo-question">
          <span className="mini-label">SAMPLE QUESTION</span>
          <h2>“I still don't understand duration. Explain it again.”</h2>
          <p>This fixed example proves the teaching-mode behavior without pretending that a live AI model is already connected.</p>
        </div>
        <div className="professor-response-card">
          <span className="mini-label">{mode.toUpperCase()} RESPONSE</span>
          <h3>{active.title}</h3>
          <p>{active.body}</p>
          <div className="professor-example"><strong>Example</strong><p>{active.example}</p></div>
        </div>
      </section>

      <section className="teaching-action-grid">
        {teachingActions.map((action, index) => (
          <article key={action}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{action}</h3>
            <p>The connected professor will preserve the same underlying knowledge while changing the teaching method.</p>
          </article>
        ))}
      </section>

      <section className="misconception-panel">
        <div><span className="mini-label">ERROR-BASED LEARNING</span><h2>Do not just correct the answer — diagnose the misconception.</h2></div>
        <div className="misconception-flow">
          <span>Your answer</span><b>→</b><span>Find exact error</span><b>→</b><span>Rebuild concept</span><b>→</b><span>New question</span><b>→</b><span>Confirm mastery</span>
        </div>
      </section>
    </div>
  );
}
