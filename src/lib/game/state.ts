import { getCategory, pickSecret, type CategoryId } from "./words";

/* ---------------------------------------------------------------------------
 * State model
 *
 * The whole game is a finite state machine held in one reducer:
 *
 *   setup ──start──▶ reveal ──(all players seen card)──▶ play ──reveal──▶ result
 *     ▲                                                                    │
 *     └───────────────── backToLobby ◀───────────── playAgain ─────────────┘
 *
 * `config` (players / impostorCount / teamMode) survives every transition and
 * is persisted to LocalStorage. The category is chosen by the game, never the
 * players, and `round` is regenerated on each new game.
 * ------------------------------------------------------------------------- */

export type Phase = "setup" | "reveal" | "play" | "result";

export interface Player {
  id: string;
  name: string;
}

export interface Round {
  word: string;
  /** oblique hint shown only to impostors */
  clue: string;
  categoryId: CategoryId;
  categoryLabel: string;
  /** ids of players holding the IMPOSTOR role */
  impostorIds: string[];
  /** impostors see each other's names on their card */
  teamMode: boolean;
  /** shuffled player ids: both pass-the-phone order and clue turn order */
  order: string[];
  /** how many players have already seen their card */
  seen: number;
}

export interface GameState {
  phase: Phase;
  players: Player[];
  impostorCount: ImpostorCount;
  teamMode: boolean;
  timerSeconds: number;
  round: Round | null;
}

export type ImpostorCount = 1 | 2 | 3;

export type GameAction =
  | { type: "addPlayer"; name: string }
  | { type: "renamePlayer"; id: string; name: string }
  | { type: "removePlayer"; id: string }
  | { type: "setImpostorCount"; count: ImpostorCount }
  | { type: "setTeamMode"; teamMode: boolean }
  | { type: "startGame" }
  | { type: "nextPlayer" }
  | { type: "revealResult" }
  | { type: "playAgain" }
  | { type: "backToLobby" }
  | { type: "hydrate"; state: GameState };

export const MIN_PLAYERS = 3;
export const MAX_PLAYERS = 10;
/** team mode only makes sense with a bigger table */
export const TEAM_MODE_MIN_PLAYERS = 6;
export const STORAGE_KEY = "deceit.state.v2";

export const initialState: GameState = {
  phase: "setup",
  players: [
    { id: "p1", name: "Maya" },
    { id: "p2", name: "Dev" },
    { id: "p3", name: "Sofia" },
  ],
  impostorCount: 1,
  teamMode: false,
  timerSeconds: 120,
  round: null,
};

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

function shuffle<T>(items: T[]): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = out[i]!;
    out[i] = out[j]!;
    out[j] = tmp;
  }
  return out;
}

/** How many impostors this table can actually support. */
export function maxImpostorsFor(playerCount: number): ImpostorCount {
  if (playerCount >= 8) return 3;
  if (playerCount >= 5) return 2;
  return 1;
}

export function teamModeAvailable(state: GameState) {
  return state.players.length >= TEAM_MODE_MIN_PLAYERS && state.impostorCount >= 2;
}

function createRound(state: GameState): Round {
  const { category, entry } = pickSecret();
  const order = shuffle(state.players).map((p) => p.id);
  const impostorCount = Math.min(state.impostorCount, maxImpostorsFor(state.players.length));
  const impostorIds = shuffle(order).slice(0, impostorCount);
  return {
    word: entry.word,
    clue: entry.clue,
    categoryId: category.id,
    categoryLabel: category.label,
    impostorIds,
    teamMode: teamModeAvailable(state) && impostorCount > 1,
    order,
    seen: 0,
  };
}

export function canStart(state: GameState) {
  return (
    state.players.length >= MIN_PLAYERS &&
    state.players.length <= MAX_PLAYERS &&
    state.players.every((p) => p.name.trim().length > 0)
  );
}

export function roleOf(round: Round, playerId: string) {
  return round.impostorIds.includes(playerId) ? "impostor" : "civilian";
}

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "hydrate":
      return action.state;

    case "addPlayer": {
      if (state.players.length >= MAX_PLAYERS) return state;
      return {
        ...state,
        players: [...state.players, { id: uid(), name: action.name }],
      };
    }

    case "renamePlayer":
      return {
        ...state,
        players: state.players.map((p) => (p.id === action.id ? { ...p, name: action.name } : p)),
      };

    case "removePlayer": {
      const players = state.players.filter((p) => p.id !== action.id);
      const impostorCount = Math.min(
        state.impostorCount,
        maxImpostorsFor(players.length),
      ) as ImpostorCount;

      return {
        ...state,
        players,
        impostorCount,
        teamMode: state.teamMode && players.length >= TEAM_MODE_MIN_PLAYERS && impostorCount >= 2,
      };
    }

    case "setImpostorCount":
      return {
        ...state,
        impostorCount: action.count,
        teamMode: action.count >= 2 ? state.teamMode : false,
      };

    case "setTeamMode":
      return { ...state, teamMode: action.teamMode };

    case "startGame": {
      if (!canStart(state)) return state;
      return { ...state, phase: "reveal", round: createRound(state) };
    }

    case "nextPlayer": {
      if (!state.round) return state;
      const seen = state.round.seen + 1;
      const round = { ...state.round, seen };
      return seen >= state.round.order.length
        ? { ...state, phase: "play", round }
        : { ...state, round };
    }

    case "revealResult":
      return { ...state, phase: "result" };

    case "playAgain":
      return { ...state, phase: "reveal", round: createRound(state) };

    case "backToLobby":
      return { ...state, phase: "setup", round: null };

    default:
      return state;
  }
}

export function loadState(): GameState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<GameState>;
    if (!Array.isArray(parsed.players)) return null;
    const count = parsed.impostorCount;
    // Never resume mid-reveal: a reloaded phone should not leak a card.
    return {
      ...initialState,
      players: parsed.players,
      impostorCount: count === 2 || count === 3 ? count : 1,
      teamMode: parsed.teamMode === true,
    };
  } catch {
    return null;
  }
}

export function persistState(state: GameState) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        players: state.players,
        impostorCount: state.impostorCount,
        teamMode: state.teamMode,
      }),
    );
  } catch {
    /* storage unavailable — game still works in memory */
  }
}

export { getCategory };
