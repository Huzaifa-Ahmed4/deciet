import { createFileRoute, Link } from "@tanstack/react-router";

const title = "How to Play Deceit — Rules for the Impostor Party Game";
const description =
  "Deceit rules in one page: deal the secrets, pass the phone, give one clue each, argue, then reveal the impostors. Includes team mode for 6+ players.";

export const Route = createFileRoute("/how-to-play")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HowToPlay,
});

const steps = [
  {
    n: "01",
    title: "Set the table",
    body: "Add 3–10 names, pick 1–3 impostors, and switch on team mode if you have 6 or more players.",
  },
  {
    n: "02",
    title: "The game deals the secret",
    body: "Deceit picks the category and the word — nobody chooses. The category is shown to everyone.",
  },
  {
    n: "03",
    title: "Pass and peek",
    body: "Each player holds the card to see their own screen, then hides it and passes the phone on. Civilians see the word. Impostors see only a vague clue.",
  },
  {
    n: "04",
    title: "One clue each, out loud",
    body: "Follow the turn order on screen. Say a single word or short phrase about the secret — specific enough to prove you know it, vague enough not to hand it to the impostors.",
  },
  {
    n: "05",
    title: "Argue and accuse",
    body: "Use the timer for open discussion. Impostors bluff from their clue; in team mode they can back each other up.",
  },
  {
    n: "06",
    title: "Reveal",
    body: "Vote out loud, then hit Reveal. The word, the clue and every role are unmasked. Play again keeps your names and deals a fresh secret.",
  },
];

function HowToPlay() {
  return (
    <main className="min-h-screen w-full bg-background text-foreground">
      <div className="mx-auto max-w-[430px] min-h-screen flex flex-col">
        <header className="flex items-center justify-between px-5 pt-5">
          <Link to="/" className="flex items-center gap-2 press">
            <span className="size-6 grid place-items-center rounded-md bg-primary text-primary-foreground font-display font-bold text-sm shadow-[0_2px_0_#00000030]">
              D
            </span>
            <span className="font-display font-bold tracking-tight text-base leading-none">
              DECE<span className="text-primary">IT</span>
            </span>
          </Link>
          <Link
            to="/play"
            className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent transition-colors hover:text-foreground"
          >
            Play
          </Link>
        </header>

        <section className="flex-1 px-5 pt-8 pb-6 flex flex-col gap-6">
          <div className="haze">
            <h1 className="text-4xl leading-[0.95] text-pretty">
              How to play <span className="text-primary">Deceit</span>
            </h1>
            <p className="mt-2 text-sm text-muted-foreground text-pretty">
              A talking game. One phone, no accounts, six short steps.
            </p>
          </div>

          <ol className="flex flex-col gap-2 stagger">
            {steps.map((s) => (
              <li
                key={s.n}
                className="rounded-2xl bg-surface ring-1 ring-black/20 p-4 lift glow-accent"
              >
                <div className="flex items-start gap-3">
                  <span className="font-display font-bold text-accent text-sm mt-0.5">{s.n}</span>
                  <div className="min-w-0">
                    <p className="font-display font-bold text-base">{s.title}</p>
                    <p className="text-sm text-muted-foreground mt-1 text-pretty">{s.body}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>

          <div className="rounded-2xl bg-primary/12 ring-1 ring-primary/35 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
              House rules that help
            </p>
            <ul className="mt-2 flex flex-col gap-1.5 text-sm text-muted-foreground">
              <li>No repeating another player's clue.</li>
              <li>No clues that only make sense if you already said the word.</li>
              <li>Impostors win if they survive the vote — or guess the word at the reveal.</li>
            </ul>
          </div>

          <Link
            to="/play"
            className="press lift grid place-items-center w-full h-14 rounded-2xl bg-primary text-primary-foreground font-display font-bold text-lg ring-2 ring-primary/40 shadow-[0_4px_0_#00000040]"
          >
            Start a game
          </Link>
        </section>
      </div>
    </main>
  );
}
