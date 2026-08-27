import { useEffect, useRef, useState } from "react";
import { PlayerBadge } from "./PlayerBadge";
import { roleOf, type GameAction, type GameState } from "@/lib/game/state";

interface PassRevealViewProps {
  state: GameState;
  dispatch: (action: GameAction) => void;
}

export function PassRevealView({ state, dispatch }: PassRevealViewProps) {
  const round = state.round!;
  const playerId = round.order[round.seen];
  const player = state.players.find((p) => p.id === playerId)!;
  const isImpostor = roleOf(round, playerId) === "impostor";

  const [flipped, setFlipped] = useState(false);
  const [hasPeeked, setHasPeeked] = useState(false);
  const held = useRef(false);

  // New player in hand → reseal the card.
  useEffect(() => {
    setFlipped(false);
    setHasPeeked(false);
  }, [playerId]);

  const hold = () => {
    held.current = true;
    setFlipped(true);
    setHasPeeked(true);
  };
  const release = () => {
    held.current = false;
    setFlipped(false);
  };

  return (
    <section className="flex-1 px-5 pt-6 pb-6 flex flex-col">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
        Player {round.seen + 1} of {round.order.length}
      </p>
      <h2 className="mt-2 text-3xl leading-tight text-pretty">
        Pass phone to <span className="text-accent">{player.name}</span>
      </h2>
      <p className="text-sm text-muted-foreground mt-1">
        Hold the card to peek. No one else can see.
      </p>

      <div className="mt-5 flex-1 min-h-[300px] [perspective:1400px]">
        <div
          className={`card-3d relative w-full h-full rounded-3xl ${flipped ? "[transform:rotateY(180deg)]" : ""}`}
        >
          {/* Sealed face */}
          <div className="backface absolute inset-0 rounded-3xl bg-card ring-1 ring-black/30 grid place-items-center">
            <div className="text-center px-6">
              <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary/15">
                <PlayerBadge name={player.name} tone="crimson" />
              </span>
              <p className="mt-4 font-display font-bold text-lg">Secret sealed</p>
              <p className="text-sm text-muted-foreground mt-1">Hold to reveal your role</p>
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
                {isImpostor ? "Your role" : "Your word"}
              </p>
              <p
                className={`mt-3 font-display font-bold text-5xl leading-[0.9] tracking-tight ${
                  isImpostor ? "text-primary-foreground" : "text-accent-foreground"
                }`}
              >
                {isImpostor ? "YOU ARE THE IMPOSTOR" : round.word}
              </p>
              <p
                className={`mt-4 text-sm ${
                  isImpostor ? "text-primary-foreground/80" : "text-accent-foreground/80"
                }`}
              >
                {isImpostor
                  ? "Blend in. Bluff a clue that sounds like you know the word."
                  : "Give a clue. Don't give it away."}
              </p>
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
        className="press mt-4 w-full h-14 rounded-2xl bg-accent text-accent-foreground font-display font-bold text-lg shadow-[0_4px_0_#00000040] touch-none"
      >
        {flipped ? "Keep holding…" : "Hold to reveal"}
      </button>

      <button
        type="button"
        disabled={!hasPeeked}
        onClick={() => dispatch({ type: "nextPlayer" })}
        className="press mt-2 w-full h-12 rounded-2xl bg-foreground/10 ring-1 ring-foreground/15 font-display font-semibold text-sm disabled:opacity-40"
      >
        {round.seen + 1 === round.order.length ? "Got it · start clues" : "Got it · hide & pass on"}
      </button>
    </section>
  );
}
