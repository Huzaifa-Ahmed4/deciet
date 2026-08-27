import { useState } from "react";
import { PlayerBadge } from "./PlayerBadge";
import { CATEGORIES } from "@/lib/game/words";
import { MAX_PLAYERS, MIN_PLAYERS, canStart, type GameAction, type GameState } from "@/lib/game/state";

interface SetupViewProps {
  state: GameState;
  dispatch: (action: GameAction) => void;
}

export function SetupView({ state, dispatch }: SetupViewProps) {
  const [draft, setDraft] = useState("");
  const ready = canStart(state);

  const addPlayer = () => {
    const name = draft.trim();
    if (!name || state.players.length >= MAX_PLAYERS) return;
    dispatch({ type: "addPlayer", name });
    setDraft("");
  };

  return (
    <>
      <section className="flex-1 px-5 pt-6 pb-6 flex flex-col gap-5">
        <div>
          <h1 className="text-4xl leading-[0.95] text-pretty">
            Who's lying <span className="text-accent">this round?</span>
          </h1>
          <p className="mt-2 text-sm text-muted-foreground text-pretty">
            Set your table. Add names, pick a category, then pass the phone around the circle.
          </p>
        </div>

        <div className="rounded-2xl bg-surface ring-1 ring-black/20 p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
              Players · {state.players.length}
            </span>
            <span className="text-[11px] text-muted-foreground">
              {MIN_PLAYERS}–{MAX_PLAYERS}
            </span>
          </div>

          <ul className="flex flex-col gap-2">
            {state.players.map((player, i) => (
              <li key={player.id} className="flex items-center gap-3 rounded-xl bg-card px-3 py-2.5">
                <PlayerBadge name={player.name} tone={i % 2 === 0 ? "crimson" : "gold"} />
                <input
                  value={player.name}
                  onChange={(e) =>
                    dispatch({ type: "renamePlayer", id: player.id, name: e.target.value })
                  }
                  aria-label={`Player ${i + 1} name`}
                  maxLength={16}
                  className="flex-1 min-w-0 bg-transparent text-sm font-medium outline-none focus:text-accent"
                />
                <button
                  type="button"
                  onClick={() => dispatch({ type: "removePlayer", id: player.id })}
                  aria-label={`Remove ${player.name}`}
                  className="press text-muted-foreground text-lg leading-none px-1"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>

          {state.players.length < MAX_PLAYERS && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addPlayer();
              }}
              className="mt-3 flex items-center gap-2"
            >
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Add a player…"
                maxLength={16}
                aria-label="New player name"
                className="flex-1 min-w-0 rounded-xl bg-card px-3 py-2.5 text-sm outline-none ring-1 ring-transparent focus:ring-accent/50 placeholder:text-muted-foreground"
              />
              <button
                type="submit"
                aria-label="Add player"
                className="press grid place-items-center size-10 shrink-0 rounded-full bg-foreground/10 ring-1 ring-foreground/15 text-lg leading-none"
              >
                +
              </button>
            </form>
          )}
        </div>

        <div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Impostors
          </span>
          <div className="mt-2 grid grid-cols-2 gap-2 p-1 rounded-2xl bg-surface ring-1 ring-black/20">
            {([1, 2] as const).map((count) => (
              <button
                key={count}
                type="button"
                onClick={() => dispatch({ type: "setImpostorCount", count })}
                aria-pressed={state.impostorCount === count}
                className={`press h-11 rounded-xl font-display font-bold text-lg ${
                  state.impostorCount === count
                    ? "bg-primary text-primary-foreground shadow-[0_2px_0_#00000030]"
                    : "text-muted-foreground"
                }`}
              >
                {count}
              </button>
            ))}
          </div>
        </div>

        <div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Category
          </span>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {CATEGORIES.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => dispatch({ type: "setCategory", category: category.id })}
                aria-pressed={state.category === category.id}
                className={`press h-14 rounded-2xl font-display font-bold text-base flex items-center justify-center text-center px-2 ${
                  state.category === category.id
                    ? "bg-accent text-accent-foreground shadow-[0_2px_0_#00000030]"
                    : "bg-surface ring-1 ring-black/20 text-muted-foreground"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="sticky bottom-0 bg-background px-5 pb-6 pt-2">
        <button
          type="button"
          disabled={!ready}
          onClick={() => dispatch({ type: "startGame" })}
          className="press w-full h-14 rounded-2xl bg-primary text-primary-foreground font-display font-bold text-lg ring-2 ring-primary/40 shadow-[0_4px_0_#00000040] disabled:opacity-40"
        >
          {ready ? "Start the game" : `Add ${MIN_PLAYERS - state.players.length} more player(s)`}
        </button>
      </div>
    </>
  );
}
