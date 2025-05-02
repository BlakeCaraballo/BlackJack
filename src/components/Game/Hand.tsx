import React from "react";
import Card from "../Card";
import { Card as PlayingCard } from "../../types/card";

interface HandProps {
  hand: PlayingCard[];
  hideFirst?: boolean;
}

const Hand: React.FC<HandProps> = ({ hand, hideFirst = false }) => {
  return (
    <div className="d-flex justify-content-center gap-2">
      {hand.map((card, idx) => (
        <Card key={idx} card={card} hidden={hideFirst && idx === 0} />
      ))}
    </div>
  );
};

export default Hand;
