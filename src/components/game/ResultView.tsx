import { useEffect, useState } from "react";
import { PlayerBadge } from "./PlayerBadge";
import { roleOf, type GameAction, type GameState } from "@/lib/game/state";

interface ResultViewProps {
  state: GameState;
  dispatch: (action: GameAction) => void;
}

/** Reveal runs as a short sequence: drumroll → word slams in → names unmask. */
export function ResultView({ state, dispatch }: ResultViewProps) {
  const round = state.round!;
  const order = round.order.map((id) => state.players.find((p) => p.id === id)!);
  const [step, setStep] = useState<0 | 1 | 2>(0);

  useEffect(() => {
    const a = setTimeout(() => setStep(1), 900);
    const b = setTimeout(() => setStep(2), 1900);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, []);

  return (
    <section className="flex-1 px-5 pt-6 pb-6 flex flex-col gap-5">
      <div className="haze">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
          {round.categoryLabel} · reveal
        </p>

        {step === 0 ? (
          <h2 className="mt-2 text-4xl leading-[0.95] animate-suspect">
            Someone here <span className="text-primary">lied…</span>
          </h2>
        ) : (
          <h2 className="mt-2 text-4xl leading-[0.95]">
            The word was{" "}
            <span className="text-accent inline-block animate-slam">{round.word}</span>
          </h2>
        )}

        {step >= 1 && (
          <p className="mt-2 text-sm text-muted-foreground animate-rise">
            Impostor clue was “{round.clue}”
          </p>
        )}
      </div>

      {step >= 2 ? (
        <div className="rounded-2xl bg-surface ring-1 ring-black/20 p-4 animate-rise">
          <div className="flex flex-col gap-2 stagger">
            {order.map((player) => {
              const impostor = roleOf(round, player.id) === "impostor";
              return (
                <div
                  key={player.id}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 lift ${
                    impostor ? "bg-primary/15 ring-1 ring-primary/40" : "bg-card"
                  }`}
                >
                  <PlayerBadge name={player.name} tone={impostor ? "crimson" : "gold"} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">{player.name}</p>
                    <p className={`text-xs ${impostor ? "text-primary" : "text-muted-foreground"}`}>
                      {impostor
                        ? round.teamMode
                          ? "Impostor · on the team"
                          : "The Impostor"
                        : `Cleared · knew ${round.word}`}
                    </p>
                  </div>
                  <span
                    className={`font-display font-bold text-sm ${impostor ? "text-primary" : "text-accent"}`}
                  >
                    {impostor ? "✕" : "✓"}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => dispatch({ type: "backToLobby" })}
              className="press lift h-12 rounded-xl bg-foreground/10 ring-1 ring-foreground/15 font-display font-semibold text-sm"
            >
              Back to lobby
            </button>
            <button
              type="button"
              onClick={() => dispatch({ type: "playAgain" })}
              className="press lift h-12 rounded-xl bg-accent text-accent-foreground font-display font-bold text-sm"
            >
              Play again
            </button>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl bg-surface ring-1 ring-black/20 p-6 grid place-items-center min-h-[220px]">
          <div className="flex items-center gap-2">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="size-3 rounded-full bg-primary animate-pulse"
                style={{ animationDelay: `${i * 160}ms` }}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
