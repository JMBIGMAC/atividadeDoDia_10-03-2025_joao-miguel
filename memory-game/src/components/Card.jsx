import React from "react";
import "../../src/App.css";


const Card = ({ card, flipped, onClick }) => {
  return (
    <div
      className={`card ${flipped ? "flipped" : ""}`}
      onClick={() => onClick(card.id, card.image)}
    >
      <div className="card-inner">
        <div className="card-front"></div>
        <div className="card-back">
          <img src={`/public/${card.image}`} alt="Carta" />
        </div>
      </div>
    </div>
  );
};

export default Card;

