import React, { useEffect, useState } from "react";
import Hand from "./Hand";
import { Card as PlayingCard } from "../../types/card";
import { getShuffledDeck } from "../../utils/deck";
import {
  calculateHandValue,
  isBust,
  determineWinner,
} from "../../utils/gameLogic";
import "../../App.css";

type GamePhase = "initial" | "player-turn" | "dealer-turn" | "game-over";

const Game: React.FC = () => {
  const [deck, setDeck] = useState<PlayingCard[]>([]);
  const [playerHand, setPlayerHand] = useState<PlayingCard[]>([]);
  const [dealerHand, setDealerHand] = useState<PlayingCard[]>([]);
  const [gamePhase, setGamePhase] = useState<GamePhase>("initial");
  const [message, setMessage] = useState("");
  const [showDealerCard, setShowDealerCard] = useState(false);
  const [darkMode, setDarkMode] = useState(false); // New state for dark mode

  // 🔁 Initialize new game
  const startNewGame = () => {
    const newDeck = getShuffledDeck();
    const newPlayerHand = [newDeck.pop()!, newDeck.pop()!];
    const newDealerHand = [newDeck.pop()!, newDeck.pop()!];

    setDeck(newDeck);
    setPlayerHand(newPlayerHand);
    setDealerHand(newDealerHand);
    setGamePhase("player-turn");
    setMessage("");
    setShowDealerCard(false);

    // 🎯 Check for Blackjack immediately after initial deal
    if (
      calculateHandValue(newPlayerHand) === 21 &&
      newPlayerHand.length === 2
    ) {
      setMessage("Blackjack! You win!");
      setGamePhase("game-over");
      return; // Player wins immediately
    }

    if (
      calculateHandValue(newDealerHand) === 21 &&
      newDealerHand.length === 2
    ) {
      setMessage("Dealer Blackjack! You lose!");
      setGamePhase("game-over");
      return; // Dealer wins immediately
    }
  };

  useEffect(() => {
    startNewGame();
  }, []);

  // 🎯 Handle player actions
  const handleHit = () => {
    if (gamePhase !== "player-turn") return;
    const newCard = deck.pop()!;
    const newHand = [...playerHand, newCard];
    setPlayerHand(newHand);
    setDeck([...deck]);

    if (isBust(newHand)) {
      setMessage("You busted! Dealer wins.");
      setGamePhase("game-over");
      setShowDealerCard(true);
    }
  };

  const handleStand = () => {
    if (gamePhase !== "player-turn") return;
    setGamePhase("dealer-turn");
    setShowDealerCard(true);
  };

  // 🧠 Dealer auto-plays when it's their turn
  useEffect(() => {
    const playDealerTurn = async () => {
      if (gamePhase !== "dealer-turn") return;

      let newDealerHand = [...dealerHand];

      // Dealer hits until 17+
      while (calculateHandValue(newDealerHand) < 17) {
        await new Promise((res) => setTimeout(res, 1000)); // delay for realism
        const newCard = deck.pop()!;
        newDealerHand.push(newCard);
        setDealerHand([...newDealerHand]);
        setDeck([...deck]);
      }

      // 🎯 Determine outcome
      const result = determineWinner(playerHand, newDealerHand);
      if (result === "player") setMessage("You win!");
      else if (result === "dealer") setMessage("Dealer wins!");
      else setMessage("Push!");

      setGamePhase("game-over");
    };

    playDealerTurn();
  }, [gamePhase]);

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Apply dark mode or light mode class to the root element
  const appClass = darkMode ? "dark-mode" : "light-mode";

  return (
    <div className={`container text-center mt-4 ${appClass}`}>
      {/* Dark Mode Toggle Button */}
      <button className="btn btn-secondary" onClick={toggleDarkMode}>
        {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </button>

      <h1 className="mb-4">Blackjack</h1>

      <div className="mb-4">
        <h4>Dealer's Hand</h4>
        <Hand hand={dealerHand} hideFirst={!showDealerCard} />
        {showDealerCard && <p>Total: {calculateHandValue(dealerHand)}</p>}
      </div>

      <div className="mb-4">
        <h4>Your Hand</h4>
        <Hand hand={playerHand} />
        <p>Total: {calculateHandValue(playerHand)}</p>
      </div>

      {message && <h3 className="text-info">{message}</h3>}

      {gamePhase === "player-turn" && (
        <div className="d-flex justify-content-center gap-2">
          <button className="btn btn-primary" onClick={handleHit}>
            Hit
          </button>
          <button className="btn btn-warning" onClick={handleStand}>
            Stand
          </button>
        </div>
      )}

      {gamePhase === "game-over" && (
        <button className="btn btn-success mt-3" onClick={startNewGame}>
          New Game
        </button>
      )}
    </div>
  );
};

export default Game;
