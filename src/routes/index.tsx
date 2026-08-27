import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useReducer } from "react";
import { SetupView } from "@/components/game/SetupView";
import { PassRevealView } from "@/components/game/PassRevealView";
import { GamePlayView } from "@/components/game/GamePlayView";
import { ResultView } from "@/components/game/ResultView";
import { useWakeLock } from "@/hooks/use-wake-lock";
import { gameReducer, initialState, loadState, persistState } from "@/lib/game/state";

const title = "Maskroom — Pass-the-Phone Impostor Party Game";
const description =
  "One phone, 3–10 players. Everyone gets a secret word except the impostor. Give clues, argue, and vote them out. No signup, plays instantly in your browser.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  useEffect(() => {
    const saved = loadState();
    if (saved) dispatch({ type: "hydrate", state: saved });
  }, []);

  useEffect(() => {
    persistState(state);
  }, [state.players, state.impostorCount, state.category]);

  useWakeLock(state.phase !== "setup");

  const phaseLabel =
    state.phase === "setup"
      ? "Lobby 01"
      : state.phase === "reveal"
        ? "Pass & reveal"
        : state.phase === "play"
          ? "Clue round"
          : "Reveal";

  return (
    <main className="min-h-screen w-full bg-background text-foreground select-none">
      <div className="mx-auto max-w-[430px] min-h-screen flex flex-col">
        <header className="flex items-center justify-between px-5 pt-5">
          <div className="flex items-center gap-2">
            <span className="size-6 grid place-items-center rounded-md bg-primary text-primary-foreground font-display font-bold text-sm shadow-[0_2px_0_#00000030]">
              M
            </span>
            <span className="font-display font-bold tracking-tight text-base leading-none">
              MASK<span className="text-primary">ROOM</span>
            </span>
          </div>
          <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            {phaseLabel}
          </span>
        </header>

        {state.phase === "setup" && <SetupView state={state} dispatch={dispatch} />}
        {state.phase === "reveal" && state.round && (
          <PassRevealView state={state} dispatch={dispatch} />
        )}
        {state.phase === "play" && state.round && <GamePlayView state={state} dispatch={dispatch} />}
        {state.phase === "result" && state.round && <ResultView state={state} dispatch={dispatch} />}
      </div>
    </main>
  );
}
