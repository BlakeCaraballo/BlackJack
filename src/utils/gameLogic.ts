import { Card } from "../types/card";

export function calculateHandValue(hand: Card[]): number {
  let total = 0;
  let aces = 0;

  hand.forEach((card) => {
    if (["J", "Q", "K"].includes(card.rank)) {
      total += 10;
    } else if (card.rank === "A") {
      total += 11;
      aces += 1;
    } else {
      total += parseInt(card.rank);
    }
  });

  // Adjust for aces if total > 21
  while (total > 21 && aces > 0) {
    total -= 10;
    aces -= 1;
  }

  return total;
}

export function isBust(hand: Card[]): boolean {
  return calculateHandValue(hand) > 21;
}

export function determineWinner(
  playerHand: Card[],
  dealerHand: Card[]
): "player" | "dealer" | "push" {
  const playerTotal = calculateHandValue(playerHand);
  const dealerTotal = calculateHandValue(dealerHand);

  if (playerTotal > 21) return "dealer";
  if (dealerTotal > 21) return "player";
  if (playerTotal > dealerTotal) return "player";
  if (dealerTotal > playerTotal) return "dealer";
  return "push";
}
