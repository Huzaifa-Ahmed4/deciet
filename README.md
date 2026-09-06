### Project Overview

A single-device, pass-the-phone social deduction web app (like Spyfall or Undercover). 

- **Core Loop:** 3–10 players pass one phone around. Everyone gets a secret word (e.g., "Pizza"), except 1 or 2 players who get assigned the role "IMPOSTOR". Players give subtle verbal clues in person, discuss, and vote out the Impostor.

---

### Scope & Constraints

#### 1. In-Scope MVP Features

* **Setup Screen:**

  * Add/edit/remove player names (3 to 10 players).

  * Impostor count selector (1 or 2).

* **Pass & Reveal Flow (Local Single-Device):**

  * Interstitial screen: "Pass phone to [Player Name]".

  * Tap-and-hold (or flip card) to reveal secret role (Secret Word vs. "YOU ARE THE IMPOSTOR").

  * "Got it" / "Hide" button to obscure the screen before handing it to the next player.

* **Game Phase & Reveal:**

  * Displays turn order for giving verbal clues.

  * Discussion prompt & simple timer.

  * "Reveal Impostor(s)" button to show true roles at the end.

  * "Play Again" button (retains player names, reshuffles new secret word).

#### 2. Technical Stack 

* **Framework:** Next.js (React) or SvelteKit (Single-Page App approach).

* **Styling:** Tailwind CSS + basic animations (Framer Motion or CSS transitions for card flips).

* **Backend:** None required for MVP. Game state should live entirely in client memory / LocalStorage.

* **Mobile Web UX Enhancements:** 

  * Implement Web Screen Wake Lock API (`navigator.wakeLock`) so the screen stays on.

  * Prevent swipe-to-navigate accidental gestures using `touch-action`.


---


## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
