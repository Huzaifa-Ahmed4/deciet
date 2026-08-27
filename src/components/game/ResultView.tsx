import { PlayerBadge } from "./PlayerBadge";
import { roleOf, type GameAction, type GameState } from "@/lib/game/state";

interface ResultViewProps {
  state: GameState;
  dispatch: (action: GameAction) => void;
}

export function ResultView({ state, dispatch }: ResultViewProps) {
  const round = state.round!;
  const order = round.order.map((id) => state.players.find((p) => p.id === id)!);

  return (
    <section className="flex-1 px-5 pt-6 pb-6 flex flex-col gap-5">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
          Reveal impostor{round.impostorIds.length > 1 ? "s" : ""}
        </p>
        <h2 className="mt-2 text-4xl leading-[0.95]">
          The word was <span className="text-accent">{round.word}</span>
        </h2>
      </div>

      <div className="rounded-2xl bg-surface ring-1 ring-black/20 p-4">
        <div className="flex flex-col gap-2">
          {order.map((player) => {
            const impostor = roleOf(round, player.id) === "impostor";
            return (
              <div
                key={player.id}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 ${
                  impostor ? "bg-primary/15 ring-1 ring-primary/40" : "bg-card"
                }`}
              >
                <PlayerBadge name={player.name} tone={impostor ? "crimson" : "gold"} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">{player.name}</p>
                  <p className={`text-xs ${impostor ? "text-primary" : "text-muted-foreground"}`}>
                    {impostor ? "The Impostor" : `Cleared · word was ${round.word}`}
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
            className="press h-12 rounded-xl bg-foreground/10 ring-1 ring-foreground/15 font-display font-semibold text-sm"
          >
            Back to lobby
          </button>
          <button
            type="button"
            onClick={() => dispatch({ type: "playAgain" })}
            className="press h-12 rounded-xl bg-accent text-accent-foreground font-display font-bold text-sm"
          >
            Play again
          </button>
        </div>
      </div>
    </section>
  );
}
