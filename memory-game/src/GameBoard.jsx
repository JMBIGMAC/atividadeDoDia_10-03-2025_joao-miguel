import React from "react";
import Card from "./Card";
import "./App.css";


const GameBoard = ({ cards, flippedCards, matchedCards, onCardClick }) => {
    return (
      <div className="game-board">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            flipped={flippedCards.some((flipped) => flipped.id === card.id) || matchedCards.includes(card.image)}
            onClick={onCardClick}
          />
        ))}
      </div>
    );
  };
  
  export default GameBoard;
