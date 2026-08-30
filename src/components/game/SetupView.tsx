import { useState } from "react";
import { PlayerBadge } from "./PlayerBadge";
import { TOTAL_WORDS } from "@/lib/game/words";
import {
  MAX_PLAYERS,
  MIN_PLAYERS,
  TEAM_MODE_MIN_PLAYERS,
  canStart,
  maxImpostorsFor,
  teamModeAvailable,
  type GameAction,
  type GameState,
  type ImpostorCount,
} from "@/lib/game/state";

interface SetupViewProps {
  state: GameState;
  dispatch: (action: GameAction) => void;
}

export function SetupView({ state, dispatch }: SetupViewProps) {
  const [draft, setDraft] = useState("");
  const ready = canStart(state);
  const maxImpostors = maxImpostorsFor(state.players.length);
  const teamPossible = teamModeAvailable(state);

  const addPlayer = () => {
    const name = draft.trim();
    if (!name || state.players.length >= MAX_PLAYERS) return;
    dispatch({ type: "addPlayer", name });
    setDraft("");
  };

  return (
    <>
      <section className="flex-1 px-5 pt-6 pb-6 flex flex-col gap-5 stagger">
        <div>
          <h1 className="text-4xl leading-[0.95] text-pretty">
            Who's lying <span className="text-accent">this round?</span>
          </h1>
          <p className="mt-2 text-sm text-muted-foreground text-pretty">
            Set your table, then pass the phone. The category is dealt by the game —{" "}
            {TOTAL_WORDS}+ secrets, anything from food to feelings.
          </p>
        </div>

        <div className="rounded-2xl bg-surface ring-1 ring-black/20 p-4 lift">
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
              <li
                key={player.id}
                className="flex items-center gap-3 rounded-xl bg-card px-3 py-2.5 lift glow-accent"
              >
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
                  className="press text-muted-foreground text-lg leading-none px-1 transition-colors hover:text-primary"
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
                className="flex-1 min-w-0 rounded-xl bg-card px-3 py-2.5 text-sm outline-none ring-1 ring-transparent focus:ring-accent/50 placeholder:text-muted-foreground transition-shadow"
              />
              <button
                type="submit"
                aria-label="Add player"
                className="press lift grid place-items-center size-10 shrink-0 rounded-full bg-foreground/10 ring-1 ring-foreground/15 text-lg leading-none hover:bg-accent hover:text-accent-foreground"
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
          <div className="mt-2 grid grid-cols-3 gap-2 p-1 rounded-2xl bg-surface ring-1 ring-black/20">
            {([1, 2, 3] as ImpostorCount[]).map((count) => {
              const locked = count > maxImpostors;
              return (
                <button
                  key={count}
                  type="button"
                  disabled={locked}
                  onClick={() => dispatch({ type: "setImpostorCount", count })}
                  aria-pressed={state.impostorCount === count}
                  className={`press h-11 rounded-xl font-display font-bold text-lg transition-colors disabled:opacity-30 ${
                    state.impostorCount === count
                      ? "bg-primary text-primary-foreground shadow-[0_2px_0_#00000030]"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {count}
                </button>
              );
            })}
          </div>
          <p className="mt-1.5 text-[11px] text-muted-foreground">
            Bigger tables unlock more impostors (5+ for two, 8+ for three).
          </p>
        </div>

        <button
          type="button"
          disabled={!teamPossible}
          onClick={() => dispatch({ type: "setTeamMode", teamMode: !state.teamMode })}
          aria-pressed={state.teamMode && teamPossible}
          className={`lift press text-left rounded-2xl p-4 ring-1 transition-colors disabled:opacity-45 ${
            state.teamMode && teamPossible
              ? "bg-primary/15 ring-primary/50"
              : "bg-surface ring-black/20"
          }`}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="font-display font-bold text-base">Team mode</p>
              <p className="text-xs text-muted-foreground mt-0.5 text-pretty">
                {teamPossible
                  ? "Impostors learn each other's names and can cover for one another."
                  : `Needs ${TEAM_MODE_MIN_PLAYERS}+ players and 2+ impostors.`}
              </p>
            </div>
            <span
              className={`shrink-0 w-12 h-7 rounded-full p-1 transition-colors ${
                state.teamMode && teamPossible ? "bg-primary" : "bg-foreground/15"
              }`}
            >
              <span
                className={`block size-5 rounded-full bg-foreground transition-transform ${
                  state.teamMode && teamPossible ? "translate-x-5" : ""
                }`}
              />
            </span>
          </div>
        </button>

        <div className="rounded-2xl bg-surface/60 ring-1 ring-black/20 p-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
            Dealt, not chosen
          </p>
          <p className="mt-1.5 text-sm text-muted-foreground text-pretty">
            Everyone sees the category. Civilians get the exact word; impostors get only a slippery
            clue — enough to bluff, never enough to be safe.
          </p>
        </div>
      </section>

      <div className="sticky bottom-0 bg-background px-5 pb-6 pt-2">
        <button
          type="button"
          disabled={!ready}
          onClick={() => dispatch({ type: "startGame" })}
          className="press lift w-full h-14 rounded-2xl bg-primary text-primary-foreground font-display font-bold text-lg ring-2 ring-primary/40 shadow-[0_4px_0_#00000040] disabled:opacity-40"
        >
          {ready ? "Deal the secrets" : `Add ${MIN_PLAYERS - state.players.length} more player(s)`}
        </button>
      </div>
    </>
  );
}
