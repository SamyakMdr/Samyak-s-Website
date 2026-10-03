const COLORS = [
  "bg", "panel", "panel-2", "panel-hover", "line", "fg", "dim", "code-bg", "code-fg",
  "blue", "blue-t", "blue-hover", "blue-pressed", "green", "green-t", "violet", "violet-t",
  "warn", "bad", "focus", "on-accent",
  "p-heli", "p-mhn", "p-voice", "p-backup", "p-travel", "p-scan",
] as const;

const TEXT_STYLES = [
  ["t-h1", "Display/H1"],
  ["t-h2", "Heading/H2"],
  ["t-h3", "Heading/H3"],
  ["t-h4", "Heading/H4"],
  ["t-stat", "Display/Stat"],
  ["t-body-lg", "Body/Large"],
  ["t-body", "Body/Default"],
  ["t-body-sm", "Body/Small"],
  ["t-caption", "Body/Caption"],
  ["t-strong", "Body/Strong"],
  ["t-btn", "Button/Label"],
  ["t-btn-sm", "Button/Small"],
  ["t-mono-label", "Mono/Label"],
  ["t-mono-sm", "Mono/Small"],
  ["t-code", "Mono/Code"],
  ["t-m-display", "Mobile/Display"],
  ["t-m-h2", "Mobile/H2"],
  ["t-m-lead", "Mobile/Lead"],
] as const;

const RADII = [
  ["xs", "rounded-xs"], ["sm", "rounded-sm"], ["btn", "rounded-btn"], ["md", "rounded-md"],
  ["win", "rounded-win"], ["card", "rounded-card"], ["lg", "rounded-lg"], ["xl", "rounded-xl"],
  ["2xl", "rounded-2xl"], ["full", "rounded-full"],
] as const;

const SHADOWS = [
  ["card", "shadow-card"], ["readme", "shadow-readme"], ["float", "shadow-float"],
  ["tooltip", "shadow-tooltip"], ["glow-blue", "shadow-glow-blue"],
  ["glow-violet", "shadow-glow-violet"], ["glow-card", "shadow-glow-card"],
] as const;

export function Foundations() {
  return (
    <section className="flex flex-col gap-8">
      <h2 className="t-h2">01 Foundations</h2>

      <div className="grid grid-cols-3 gap-3 tablet:grid-cols-6 desktop:grid-cols-9">
        {COLORS.map((name) => (
          <div key={name} className="flex flex-col gap-1.5">
            <div
              className="h-14 rounded-md border border-line"
              style={{ background: `var(--${name})` }}
            />
            <span className="t-mono-sm text-dim">--{name}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {TEXT_STYLES.map(([cls, label]) => (
          <div key={cls} className="flex items-baseline gap-6 border-b border-line pb-3">
            <span className="t-mono-sm w-36 shrink-0 text-dim">{label}</span>
            <span className={cls}>Samyak builds fast web apps</span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-4">
        {RADII.map(([name, cls]) => (
          <div key={name} className="flex flex-col items-center gap-1.5">
            <div className={`size-16 border border-line bg-panel ${cls}`} />
            <span className="t-mono-sm text-dim">{name}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-8 pb-6">
        {SHADOWS.map(([name, cls]) => (
          <div key={name} className="flex flex-col items-center gap-3">
            <div className={`size-20 rounded-card border border-line bg-panel ${cls}`} />
            <span className="t-mono-sm text-dim">{name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
