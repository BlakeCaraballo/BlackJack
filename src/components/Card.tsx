import React from "react";
import { Card as PlayingCard } from "../types/card";
import "../Card.css";

interface CardProps {
  card: PlayingCard;
  hidden?: boolean;
}

const Card: React.FC<CardProps> = ({ card, hidden = false }) => {
  const suitSymbol = {
    Hearts: "♥️",
    Diamonds: "♦️",
    Clubs: "♣️",
    Spades: "♠️",
  }[card.suit];

  const isRed = card.suit === "Hearts" || card.suit === "Diamonds";

  return (
    <div className="card-container">
      <div className={`card-flip ${hidden ? "" : "flipped"}`}>
        <div className="card-face card-back">🎴</div>
        <div
          className={`card-face card-front ${
            isRed ? "text-danger" : "text-dark"
          }`}
        >
          <strong>{card.rank}</strong>
          <span>{suitSymbol}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
