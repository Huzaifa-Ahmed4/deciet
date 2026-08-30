/* ---------------------------------------------------------------------------
 * Word bank
 *
 * Every entry is a secret word plus a deliberately oblique clue handed to the
 * impostor. The clue must let them bluff without ever naming the word or an
 * obvious synonym — think "adjacent, not aligned".
 * ------------------------------------------------------------------------- */

export type CategoryId =
  | "food"
  | "objects"
  | "people"
  | "emotions"
  | "places"
  | "animals"
  | "activities"
  | "screen"
  | "abstract";

export interface WordEntry {
  word: string;
  /** vague nudge shown only to the impostor */
  clue: string;
}

export interface Category {
  id: CategoryId;
  label: string;
  words: WordEntry[];
}

export const CATEGORIES: Category[] = [
  {
    id: "food",
    label: "Food & Drink",
    words: [
      { word: "Pizza", clue: "Shared, sliced, argued over" },
      { word: "Sushi", clue: "Cold, precise, wrapped tight" },
      { word: "Pancakes", clue: "Stacked and slow mornings" },
      { word: "Ice cream", clue: "It punishes hesitation" },
      { word: "Popcorn", clue: "Noise in a dark room" },
      { word: "Spaghetti", clue: "Long, tangled, undignified" },
      { word: "Watermelon", clue: "Mostly water, briefly heavy" },
      { word: "Tacos", clue: "Held with both hands" },
      { word: "Cheeseburger", clue: "Stacked and unstable" },
      { word: "Dumplings", clue: "Small parcels, hidden inside" },
      { word: "Croissant", clue: "Flaky evidence on your shirt" },
      { word: "Fried chicken", clue: "Greasy fingers, no regrets" },
      { word: "Chocolate cake", clue: "Occasions demand it" },
      { word: "Ramen", clue: "Steam, slurping, late hours" },
      { word: "Peanut butter", clue: "Sticks to the roof of things" },
      { word: "Coffee", clue: "Bitter permission to function" },
      { word: "Hot sauce", clue: "A dare in a bottle" },
      { word: "Birthday candles", clue: "Wax, wishes, then dark" },
      { word: "Sourdough", clue: "Patience you can slice" },
      { word: "Bubble tea", clue: "A drink that needs chewing" },
      { word: "Oysters", clue: "Trust required to swallow" },
      { word: "Cotton candy", clue: "It vanishes on contact" },
      { word: "Leftovers", clue: "Yesterday, reheated" },
      { word: "Mint gum", clue: "Covering something up" },
    ],
  },
  {
    id: "objects",
    label: "Everyday Objects",
    words: [
      { word: "Toothbrush", clue: "A private twice-daily ritual" },
      { word: "Umbrella", clue: "Useless until it isn't" },
      { word: "Stapler", clue: "It commits things together" },
      { word: "Doorknob", clue: "The last thing before leaving" },
      { word: "Pillow", clue: "It keeps your secrets" },
      { word: "Kettle", clue: "It screams when ready" },
      { word: "Sunglasses", clue: "Nobody sees where you look" },
      { word: "Backpack", clue: "Weight you chose to carry" },
      { word: "Hairdryer", clue: "Loud and briefly tropical" },
      { word: "Remote control", clue: "Power, always lost" },
      { word: "Shoelace", clue: "One small failure ruins it" },
      { word: "Mirror", clue: "Honest in the worst way" },
      { word: "Bicycle", clue: "Balance you never forget" },
      { word: "Wallet", clue: "Panic when it's not there" },
      { word: "Alarm clock", clue: "The enemy of morning" },
      { word: "Padlock", clue: "It says stay out" },
      { word: "Candle", clue: "It shrinks as it works" },
      { word: "Diary", clue: "Written to be unread" },
      { word: "Scissors", clue: "Two halves, one decision" },
      { word: "Rearview mirror", clue: "Behind you, always" },
      { word: "Elevator", clue: "Strangers, silence, numbers" },
      { word: "Duct tape", clue: "A temporary fix that stays" },
      { word: "Passport", clue: "Proof you are allowed" },
      { word: "Fire alarm", clue: "Nobody believes it anymore" },
    ],
  },
  {
    id: "people",
    label: "People & Roles",
    words: [
      { word: "Magician", clue: "Attention aimed the wrong way" },
      { word: "Detective", clue: "Asks what it already knows" },
      { word: "Referee", clue: "Hated by both sides" },
      { word: "Barber", clue: "Trusted with something sharp" },
      { word: "Politician", clue: "Promises with an expiry date" },
      { word: "Nurse", clue: "Calm inside other people's worst days" },
      { word: "Babysitter", clue: "Borrowed authority" },
      { word: "Landlord", clue: "Owns the space you live in" },
      { word: "Influencer", clue: "A life edited for viewing" },
      { word: "Spy", clue: "Two names, one face" },
      { word: "Taxi driver", clue: "Knows the city and your business" },
      { word: "Wedding planner", clue: "Someone else's big day" },
      { word: "Lifeguard", clue: "Paid to watch, rarely to act" },
      { word: "Stand-up comedian", clue: "Silence is the worst outcome" },
      { word: "Chess grandmaster", clue: "Thinking six moves ahead" },
      { word: "Fortune teller", clue: "Vague enough to be right" },
      { word: "Tourist", clue: "Obvious to everyone but themselves" },
      { word: "Bouncer", clue: "Decides who belongs" },
      { word: "Ghostwriter", clue: "Credit goes elsewhere" },
      { word: "Sibling", clue: "Loyalty and rivalry, same person" },
    ],
  },
  {
    id: "emotions",
    label: "Feelings & States",
    words: [
      { word: "Jealousy", clue: "Wanting someone else's version" },
      { word: "Nostalgia", clue: "Editing the past kindly" },
      { word: "Stage fright", clue: "The body betraying the plan" },
      { word: "Relief", clue: "After the worst didn't happen" },
      { word: "Guilt", clue: "It shows up at night" },
      { word: "Boredom", clue: "Time with nowhere to go" },
      { word: "Homesickness", clue: "Missing a place, not a thing" },
      { word: "Rage", clue: "It arrives before the words" },
      { word: "Embarrassment", clue: "Replayed on a loop" },
      { word: "Hope", clue: "Unreasonable and necessary" },
      { word: "Suspicion", clue: "Nothing proven, everything felt" },
      { word: "Loneliness", clue: "Possible in a crowded room" },
      { word: "Anticipation", clue: "Better than the thing itself" },
      { word: "Regret", clue: "The road you didn't take" },
      { word: "Awkward silence", clue: "Everyone waiting for anyone" },
      { word: "Overconfidence", clue: "Right up until it isn't" },
      { word: "Panic", clue: "Speed without direction" },
      { word: "Betrayal", clue: "It has to be someone close" },
    ],
  },
  {
    id: "places",
    label: "Places",
    words: [
      { word: "Airport", clue: "Everyone is between lives" },
      { word: "Library", clue: "Volume is the rule" },
      { word: "Hospital waiting room", clue: "Time behaves strangely" },
      { word: "Casino", clue: "No clocks on purpose" },
      { word: "Graveyard", clue: "Quiet, tidy, permanent" },
      { word: "Amusement park", clue: "Paying to be frightened" },
      { word: "Attic", clue: "Storage for the past" },
      { word: "Desert", clue: "Nothing hides out here" },
      { word: "Subway", clue: "Underground and on schedule" },
      { word: "Courtroom", clue: "Stories compete for belief" },
      { word: "Rooftop", clue: "Above the conversation" },
      { word: "Locker room", clue: "Before or after, never during" },
      { word: "Hotel lobby", clue: "Nobody stays, everyone passes" },
      { word: "Haunted house", clue: "Fear you paid for" },
      { word: "Border crossing", clue: "One line changes everything" },
      { word: "Basement", clue: "Below the story" },
    ],
  },
  {
    id: "animals",
    label: "Animals",
    words: [
      { word: "Chameleon", clue: "Blends in for a living" },
      { word: "Wolf", clue: "Stronger with the group" },
      { word: "Owl", clue: "Awake when others aren't" },
      { word: "Snake", clue: "Silent until it isn't" },
      { word: "Octopus", clue: "Too many plans at once" },
      { word: "Penguin", clue: "Dressed for the wrong climate" },
      { word: "Crow", clue: "Remembers faces, holds grudges" },
      { word: "Housecat", clue: "Affection on its own terms" },
      { word: "Mosquito", clue: "Small, hated, persistent" },
      { word: "Elephant", clue: "Never forgets the route" },
      { word: "Peacock", clue: "All display, no need" },
      { word: "Cuckoo", clue: "Raised by someone else" },
      { word: "Shark", clue: "Rumours worse than reality" },
      { word: "Sloth", clue: "In no hurry to survive" },
      { word: "Bee", clue: "The group outlives the worker" },
      { word: "Fox", clue: "Reputation for cleverness" },
    ],
  },
  {
    id: "activities",
    label: "Things We Do",
    words: [
      { word: "Poker night", clue: "Faces matter more than cards" },
      { word: "First date", clue: "Best version, briefly" },
      { word: "Job interview", clue: "Rehearsed honesty" },
      { word: "Karaoke", clue: "Courage borrowed from the room" },
      { word: "Moving house", clue: "Everything you own, judged" },
      { word: "Group project", clue: "Credit split unfairly" },
      { word: "Wedding toast", clue: "One shot, everyone listening" },
      { word: "Camping", clue: "Discomfort, chosen" },
      { word: "Haircut", clue: "Committing to a stranger's plan" },
      { word: "Road trip", clue: "The point isn't the arrival" },
      { word: "Grocery shopping", clue: "A list you'll ignore" },
      { word: "Gossip", clue: "It travels faster than truth" },
      { word: "Apology", clue: "Cheap or expensive, never neutral" },
      { word: "Exam", clue: "Alone in a room full of people" },
      { word: "Sleepover", clue: "Nobody actually sleeps" },
      { word: "Voting", clue: "Private, then argued about" },
      { word: "Blind auction", clue: "Guessing what others will pay" },
      { word: "Ghosting", clue: "An answer made of nothing" },
    ],
  },
  {
    id: "screen",
    label: "Screen & Story",
    words: [
      { word: "Plot twist", clue: "Everything before it was a setup" },
      { word: "Superhero", clue: "A second identity, badly hidden" },
      { word: "Zombie apocalypse", clue: "The people are the problem" },
      { word: "Reality TV", clue: "Edited to feel unscripted" },
      { word: "Horror movie", clue: "You shout at the choices" },
      { word: "Villain monologue", clue: "Explaining instead of winning" },
      { word: "Time travel", clue: "Rules nobody follows twice" },
      { word: "Sequel", clue: "Same shape, less magic" },
      { word: "Cliffhanger", clue: "Owing you an ending" },
      { word: "Laugh track", clue: "Told when to react" },
      { word: "Undercover cop", clue: "Long enough to forget which side" },
      { word: "Documentary", clue: "Truth, arranged" },
      { word: "Cameo", clue: "Brief and unmistakable" },
      { word: "Soap opera", clue: "Nobody stays dead" },
    ],
  },
  {
    id: "abstract",
    label: "Abstract Ideas",
    words: [
      { word: "Trust", clue: "Cheap to break, slow to build" },
      { word: "Luck", clue: "Only obvious afterwards" },
      { word: "Reputation", clue: "Owned by other people" },
      { word: "Secret", clue: "Value depends on silence" },
      { word: "Deadline", clue: "Motivation with a date" },
      { word: "Rumour", clue: "No author, many editors" },
      { word: "Karma", clue: "A bill that arrives late" },
      { word: "Silence", clue: "Read as agreement or guilt" },
      { word: "Fame", clue: "Attention without permission" },
      { word: "Loophole", clue: "Following the letter, not the point" },
      { word: "Debt", clue: "Someone else's patience" },
      { word: "Alibi", clue: "Convenient and rehearsed" },
      { word: "Gravity", clue: "Never negotiable" },
      { word: "Peer pressure", clue: "Nobody voted, everyone agreed" },
      { word: "Momentum", clue: "Hard to start, harder to stop" },
      { word: "Paranoia", clue: "Sometimes correct" },
    ],
  },
];

export function getCategory(id: CategoryId): Category {
  return CATEGORIES.find((c) => c.id === id) ?? CATEGORIES[0]!;
}

export const TOTAL_WORDS = CATEGORIES.reduce((n, c) => n + c.words.length, 0);

/** Picks a random category + entry. Players never choose the category. */
export function pickSecret() {
  const category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)]!;
  const entry = category.words[Math.floor(Math.random() * category.words.length)]!;
  return { category, entry };
}
