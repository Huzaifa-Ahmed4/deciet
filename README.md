# Secret Word Society

Act as a Senior Full-Stack Engineer and UX Designer. I want to build a Minimal Viable Product (MVP) for a web-based party game inspired by "Imposter Game - Party Edition". 

Please review the requirements below and help me build/architect the application.

---

### Project Overview

A single-device, pass-the-phone social deduction web app (like Spyfall or Undercover). 

- **Target Experience:** Zero setup, no app store download, instant load in a mobile browser.

- **Core Loop:** 3–10 players pass one phone around. Everyone gets a secret word (e.g., "Pizza"), except 1 or 2 players who get assigned the role "IMPOSTOR". Players give subtle verbal clues in person, discuss, and vote out the Impostor.

---

### Scope & Constraints

#### 1. In-Scope MVP Features

* **Setup Screen:**

  * Add/edit/remove player names (3 to 10 players).

  * Impostor count selector (1 or 2).

  * Category picker (Provide 2 default built-in categories: *Food* and *Everyday Objects*).

* **Pass & Reveal Flow (Local Single-Device):**

  * Interstitial screen: "Pass phone to [Player Name]".

  * Tap-and-hold (or flip card) to reveal secret role (Secret Word vs. "YOU ARE THE IMPOSTOR").

  * "Got it" / "Hide" button to obscure the screen before handing it to the next player.

* **Game Phase & Reveal:**

  * Displays turn order for giving verbal clues.

  * Discussion prompt & simple timer.

  * "Reveal Impostor(s)" button to show true roles at the end.

  * "Play Again" button (retains player names, reshuffles new secret word).

#### 2. Technical Stack Preferences

* **Framework:** Next.js (React) or SvelteKit (Single-Page App approach).

* **Styling:** Tailwind CSS + basic animations (Framer Motion or CSS transitions for card flips).

* **Backend:** None required for MVP. Game state should live entirely in client memory / LocalStorage.

* **Mobile Web UX Enhancements:** 

  * Implement Web Screen Wake Lock API (`navigator.wakeLock`) so the screen stays on.

  * Prevent swipe-to-navigate accidental gestures using `touch-action`.

---

### Expected Deliverables

1. **Architecture & State Structure:** Show how the game state machine should be structured in client-side code.

2. **UI Component Breakdown:** Outline the key views (`SetupView`, `PassRevealView`, `GamePlayView`, `ResultView`).

3. **Working Code Implementation:** Write clean, modular, mobile-responsive component code (HTML/Tailwind/JS or React) for the primary game loop.

---

Please start by outlining the state model, and then provide the core application code to execute this MVP.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://deciet.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/fd2e8acf-9a99-4808-9dd3-9466b5347d7d).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
