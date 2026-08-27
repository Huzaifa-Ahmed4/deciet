interface PlayerBadgeProps {
  name: string;
  tone?: "gold" | "crimson";
}

export function PlayerBadge({ name, tone = "gold" }: PlayerBadgeProps) {
  const initial = name.trim().charAt(0).toUpperCase() || "?";
  return (
    <span
      className={`size-8 shrink-0 grid place-items-center rounded-xl font-display font-bold text-sm ${
        tone === "crimson" ? "bg-primary/20 text-accent" : "bg-accent/20 text-accent"
      }`}
      aria-hidden="true"
    >
      {initial}
    </span>
  );
}
