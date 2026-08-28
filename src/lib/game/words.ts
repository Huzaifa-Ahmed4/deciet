export type CategoryId = "food" | "objects";

export interface Category {
  id: CategoryId;
  label: string;
  words: string[];
}

export const CATEGORIES: Category[] = [
  {
    id: "food",
    label: "Food",
    words: [
      "Pizza",
      "Sushi",
      "Pancakes",
      "Ice cream",
      "Popcorn",
      "Spaghetti",
      "Watermelon",
      "Tacos",
      "Cheeseburger",
      "Dumplings",
      "Croissant",
      "Fried chicken",
      "Chocolate cake",
      "Ramen",
      "Peanut butter",
    ],
  },
  {
    id: "objects",
    label: "Everyday Objects",
    words: [
      "Toothbrush",
      "Umbrella",
      "Stapler",
      "Doorknob",
      "Pillow",
      "Kettle",
      "Sunglasses",
      "Backpack",
      "Hairdryer",
      "Remote control",
      "Shoelace",
      "Mirror",
      "Bicycle",
      "Wallet",
      "Alarm clock",
    ],
  },
];

export function getCategory(id: CategoryId): Category {
  return CATEGORIES.find((c) => c.id === id) ?? CATEGORIES[0]!;
}
