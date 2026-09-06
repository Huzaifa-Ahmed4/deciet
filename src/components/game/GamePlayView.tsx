import { useEffect, useState } from "react";
import { type GameAction, type GameState } from "@/lib/game/state";

interface GamePlayViewProps {
  state: GameState;
  dispatch: (action: GameAction) => void;
}

function format(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function GamePlayView({ state, dispatch }: GamePlayViewProps) {
  const round = state.round!;
  const order = round.order.map((id) => state.players.find((p) => p.id === id)!);

  const [remaining, setRemaining] = useState(state.timerSeconds);
  const [running, setRunning] = useState(true);
  const [turn, setTurn] = useState(0);

  useEffect(() => {
    if (!running || remaining <= 0) return;
    const t = setTimeout(() => setRemaining((r) => r - 1), 1000);
    return () => clearTimeout(t);
  }, [running, remaining]);

  const progress = Math.max(0, remaining / state.timerSeconds);

  return (
    <section className="flex-1 px-5 pt-6 pb-6 flex flex-col gap-5 stagger">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-accent/15 text-accent px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em]">
          Category · {round.categoryLabel}
        </span>
        {round.teamMode && (
          <span className="rounded-full bg-primary/20 text-primary px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em]">
            Team mode · {round.impostorIds.length} impostors
          </span>
        )}
      </div>
      <div className="flex items-center gap-4 rounded-2xl bg-surface ring-1 ring-black/20 p-4 lift">

        <div className="relative size-16 shrink-0">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `conic-gradient(var(--primary) 0 ${progress * 100}%, var(--card) ${progress * 100}% 100%)`,
            }}
          />
          <div className="absolute inset-[6px] rounded-full bg-surface grid place-items-center">
            <span className="font-display font-bold text-lg leading-none">{format(Math.max(0, remaining))}</span>
          </div>
        </div>
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Discussion timer
          </p>
          <p className="font-display font-bold text-lg leading-tight mt-0.5">
            Clue round · {Math.min(turn + 1, order.length)} of {order.length}
          </p>
          <button
            type="button"
            onClick={() => setRunning((r) => !r)}
            className="press mt-1 text-xs uppercase tracking-[0.14em] text-accent"
          >
            {running ? "Pause" : "Resume"}
          </button>
        </div>
      </div>

      <div>
        <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          Turn order
        </span>
        <ul className="mt-2 flex flex-col gap-1.5">
          {order.map((player, i) => {
            const isNow = i === turn;
            const isDone = i < turn;
            return (
              <li
                key={player.id}
                className={`flex items-center gap-3 rounded-xl px-3 py-2 ${
                  isNow ? "bg-accent/90 text-accent-foreground" : "bg-card"
                }`}
              >
                <span
                  className={`size-7 shrink-0 grid place-items-center rounded-full font-display font-bold text-xs ${
                    isNow ? "bg-accent-foreground/15" : "bg-muted-foreground/20 text-muted-foreground"
                  }`}
                >
                  {i + 1}
                </span>
                <span className={`text-sm ${isNow ? "font-semibold" : ""}`}>{player.name}</span>
                {isNow && (
                  <span className="ml-auto text-[11px] font-semibold uppercase tracking-wide">Now</span>
                )}
                {isDone && (
                  <span className="ml-auto text-[11px] uppercase tracking-wide text-muted-foreground">
                    Done
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      <p className="text-sm text-muted-foreground text-pretty">
        One subtle clue each, in order. Then argue, accuse, and vote out loud — the impostor is
        guessing.
      </p>

      <div className="mt-auto flex flex-col gap-2">
        <button
          type="button"
          onClick={() => setTurn((t) => Math.min(t + 1, order.length - 1))}
          className="press w-full h-12 rounded-2xl bg-foreground/10 ring-1 ring-foreground/15 font-display font-semibold text-sm"
        >
          Next speaker
        </button>
        <button
          type="button"
          onClick={() => dispatch({ type: "revealResult" })}
          className="press w-full h-14 rounded-2xl bg-primary text-primary-foreground font-display font-bold text-lg ring-2 ring-primary/40 shadow-[0_4px_0_#00000040]"
        >
          Reveal impostor{state.impostorCount > 1 ? "s" : ""}
        </button>
      </div>
    </section>
  );
}
