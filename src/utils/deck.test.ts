import { getShuffledDeck, generateDeck } from "./deck";
import { describe, it, expect } from "vitest";

describe("Deck Utilities", () => {
  it("should generate 52 cards", () => {
    const deck = generateDeck();
    expect(deck.length).toBe(52);
  });

  it("should shuffle the deck", () => {
    const original = generateDeck();
    const shuffled = getShuffledDeck();

    // Not guaranteed to be different but likely
    expect(shuffled).not.toEqual(original);
  });
});
