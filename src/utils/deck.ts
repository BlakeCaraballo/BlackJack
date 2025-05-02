import { Card, Rank, Suit } from "../types/card";

const suits: Suit[] = ["Hearts", "Diamonds", "Clubs", "Spades"];
const ranks: Rank[] = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];

/**
 * Generate a fresh deck of 52 cards.
 */
export function generateDeck(): Card[] {
  const deck: Card[] = [];

  for (const suit of suits) {
    for (const rank of ranks) {
      deck.push({ suit, rank });
    }
  }

  return deck;
}

/**
 * Shuffle a deck using Fisher-Yates algorithm.
 */
export function shuffleDeck(deck: Card[]): Card[] {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Get a freshly shuffled 52-card deck.
 */
export function getShuffledDeck(): Card[] {
  return shuffleDeck(generateDeck());
}
