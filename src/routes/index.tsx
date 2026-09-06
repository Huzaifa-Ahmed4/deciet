import { createFileRoute, Link } from "@tanstack/react-router";
import { CATEGORIES, TOTAL_WORDS } from "@/lib/game/words";

const title = "Deceit — Pass-the-Phone Impostor Party Game";
const description =
  "One phone, 3–10 players. Everyone gets the category and the secret word — except the impostors, who get only a slippery clue. Bluff, accuse, expose. No signup.";

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
  component: Home,
});

const features = [
  {
    label: "Clue, not certainty",
    body: "Impostors get a deliberately vague hint — enough to bluff, never enough to be safe.",
  },
  {
    label: "The game deals the category",
    body: "Nobody picks. Everyone sees it. Words can be food, places, people, feelings — anything.",
  },
  {
    label: "Team mode",
    body: "With 6+ players, two or three impostors learn each other and cover for one another.",
  },
];

function Home() {
  return (
    <main className="min-h-screen w-full bg-background text-foreground">
      <div className="mx-auto max-w-[430px] min-h-screen flex flex-col">
        <header className="flex items-center justify-between px-5 pt-5">
          <div className="flex items-center gap-2">
            <span className="size-6 grid place-items-center rounded-md bg-primary text-primary-foreground font-display font-bold text-sm shadow-[0_2px_0_#00000030]">
              D
            </span>
            <span className="font-display font-bold tracking-tight text-base leading-none">
              DECE<span className="text-primary">IT</span>
            </span>
          </div>
          <Link
            to="/how-to-play"
            className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-accent"
          >
            How to play
          </Link>
        </header>

        <section className="flex-1 px-5 pt-10 pb-6 flex flex-col gap-6 stagger">
          <div className="haze">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
              One phone · 3–10 players · no signup
            </p>
            <h1 className="mt-3 text-5xl leading-[0.92] text-pretty">
              Everybody knows the word.{" "}
              <span className="text-primary animate-suspect inline-block">Almost everybody.</span>
            </h1>
            <p className="mt-3 text-sm text-muted-foreground text-pretty">
              Pass the phone around the table. Most players get the secret word and its category —
              the impostors get only a slippery clue. Give clues out loud, watch for the one who's
              guessing, and vote.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <Link
              to="/play"
              className="press lift grid place-items-center w-full h-16 rounded-2xl bg-primary text-primary-foreground font-display font-bold text-xl ring-2 ring-primary/40 shadow-[0_4px_0_#00000040]"
            >
              Start a game
            </Link>
            <Link
              to="/how-to-play"
              className="press lift glow-accent grid place-items-center w-full h-13 py-3.5 rounded-2xl bg-surface ring-1 ring-black/20 font-display font-semibold text-sm"
            >
              How to play
            </Link>
          </div>

          <ul className="flex flex-col gap-2">
            {features.map((f) => (
              <li
                key={f.label}
                className="rounded-2xl bg-surface ring-1 ring-black/20 p-4 lift glow-accent"
              >
                <p className="font-display font-bold text-base">{f.label}</p>
                <p className="text-sm text-muted-foreground mt-1 text-pretty">{f.body}</p>
              </li>
            ))}
          </ul>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              {TOTAL_WORDS} secrets across {CATEGORIES.length} categories
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {CATEGORIES.map((c) => (
                <span
                  key={c.id}
                  className="rounded-full bg-card px-3 py-1.5 text-xs text-muted-foreground ring-1 ring-black/20 transition-colors hover:text-accent"
                >
                  {c.label}
                </span>
              ))}
            </div>
          </div>
        </section>

        <footer className="px-5 pb-6 text-[11px] text-muted-foreground">
          Best played out loud, in person, with people you thought you could trust.
        </footer>
      </div>
    </main>
  );
}
