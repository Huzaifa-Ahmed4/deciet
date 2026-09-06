import { useEffect, useState } from "react";
import { PlayerBadge } from "./PlayerBadge";
import { roleOf, type GameAction, type GameState } from "@/lib/game/state";

interface PassRevealViewProps {
  state: GameState;
  dispatch: (action: GameAction) => void;
}

export function PassRevealView({ state, dispatch }: PassRevealViewProps) {
  const round = state.round!;
  const playerId = round.order[round.seen]!;
  const player = state.players.find((p) => p.id === playerId)!;
  const isImpostor = roleOf(round, playerId) === "impostor";
  const teammates = round.teamMode
    ? round.impostorIds
        .filter((id) => id !== playerId)
        .map((id) => state.players.find((p) => p.id === id)?.name)
        .filter(Boolean)
    : [];

  const [flipped, setFlipped] = useState(false);
  const [hasPeeked, setHasPeeked] = useState(false);

  // New player in hand → reseal the card.
  useEffect(() => {
    setFlipped(false);
    setHasPeeked(false);
  }, [playerId]);

  const hold = () => {
    setFlipped(true);
    setHasPeeked(true);
  };
  const release = () => setFlipped(false);

  return (
    <section className="flex-1 px-5 pt-6 pb-6 flex flex-col">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
        Player {round.seen + 1} of {round.order.length}
      </p>
      <h2 className="mt-2 text-3xl leading-tight text-pretty animate-rise">
        Pass phone to <span className="text-accent">{player.name}</span>
      </h2>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-accent/15 text-accent px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em]">
          Category · {round.categoryLabel}
        </span>
        {round.teamMode && (
          <span className="rounded-full bg-primary/20 text-primary px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em]">
            Team mode
          </span>
        )}
      </div>
      <p className="text-sm text-muted-foreground mt-2">
        Hold the card to peek. No one else can see.
      </p>

      <div className="relative mt-5 flex-1 min-h-[340px] [perspective:1400px] haze">
        <div
          className={`card-3d absolute inset-0 rounded-3xl ${flipped ? "[transform:rotateY(180deg)]" : ""}`}
        >
          {/* Sealed face */}
          <div className="backface absolute inset-0 rounded-3xl bg-card ring-1 ring-black/30 grid place-items-center overflow-hidden">
            <span className="pointer-events-none absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-accent/10 to-transparent animate-scan" />
            <div className="text-center px-6">
              <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary/15">
                <PlayerBadge name={player.name} tone="crimson" />
              </span>
              <p className="mt-4 font-display font-bold text-lg">Secret sealed</p>
              <p className="text-sm text-muted-foreground mt-1">Hold to reveal your role</p>
              <p className="text-xs text-muted-foreground/70 mt-4">{round.categoryLabel}</p>
            </div>
          </div>

          {/* Revealed face */}
          <div
            className={`backface absolute inset-0 rounded-3xl grid place-items-center p-6 [transform:rotateY(180deg)] ${
              isImpostor ? "bg-primary" : "bg-accent"
            }`}
          >
            <div className="text-center">
              <p
                className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${
                  isImpostor ? "text-primary-foreground/70" : "text-accent-foreground/60"
                }`}
              >
                {round.categoryLabel}
              </p>

              {isImpostor ? (
                <>
                  <p
                    className={`mt-3 font-display font-bold text-4xl leading-[0.9] tracking-tight text-primary-foreground ${flipped ? "animate-slam" : ""}`}
                  >
                    YOU ARE THE IMPOSTOR
                  </p>
                  <div className="mt-4 rounded-2xl bg-black/25 px-4 py-3">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-foreground/60">
                      Your only clue
                    </p>
                    <p
                      className={`mt-1 font-display font-bold text-xl text-primary-foreground ${flipped ? "animate-smear" : ""}`}
                    >
                      “{round.clue}”
                    </p>
                  </div>
                  {teammates.length > 0 && (
                    <p className="mt-3 text-sm text-primary-foreground/85">
                      Working with{" "}
                      <span className="font-semibold">{teammates.join(" & ")}</span> — cover for each
                      other.
                    </p>
                  )}
                  <p className="mt-3 text-sm text-primary-foreground/80">
                    Bluff a clue that fits the category. Never guess out loud.
                  </p>
                </>
              ) : (
                <>
                  <p
                    className={`mt-3 font-display font-bold text-5xl leading-[0.9] tracking-tight text-accent-foreground ${flipped ? "animate-smear" : ""}`}
                  >
                    {round.word}
                  </p>
                  <p className="mt-4 text-sm text-accent-foreground/80">
                    Give a clue. Don't give it away.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        onPointerDown={hold}
        onPointerUp={release}
        onPointerLeave={release}
        onPointerCancel={release}
        onContextMenu={(e) => e.preventDefault()}
        className="press lift mt-4 w-full h-14 rounded-2xl bg-accent text-accent-foreground font-display font-bold text-lg shadow-[0_4px_0_#00000040] touch-none"
      >
        {flipped ? "Keep holding…" : "Hold to reveal"}
      </button>

      <button
        type="button"
        disabled={!hasPeeked}
        onClick={() => dispatch({ type: "nextPlayer" })}
        className="press mt-2 w-full h-12 rounded-2xl bg-foreground/10 ring-1 ring-foreground/15 font-display font-semibold text-sm disabled:opacity-40 transition-colors hover:bg-foreground/15"
      >
        {round.seen + 1 === round.order.length ? "Got it · start clues" : "Got it · hide & pass on"}
      </button>
    </section>
  );
}
