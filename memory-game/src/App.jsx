import React, { useState, useEffect } from "react";
import GameBoard from "./GameBoard";
import "./App.css";

const App = () => {
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0); // Contador de jogadas
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);

  // Inicializa o tabuleiro
  const initGame = () => {
    const images = [
      "card1.png",
      "card2.png",
      "card3.png",
      "card4.png",
      "card5.png",
      "card6.png",
      "card7.png",
      "card8.png",
    ];

    // Embaralha as cartas
    const shuffledCards = [...images, ...images]
      .map((card) => ({ image: card, id: Math.random(), isFlipped: false }))
      .sort(() => Math.random() - 0.5);

    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedCards([]);
    setScore(0); // Zera o score
    setMoves(0); // Zera o contador de jogadas
  };

  // Inicia o jogo ao carregar
  useEffect(() => {
    initGame();
  }, []);

  const handleCardClick = (id, image) => {
    if (flippedCards.length === 2) return; // Evita mais de duas cartas viradas ao mesmo tempo

    // Vira a carta
    const newFlippedCards = [...flippedCards, { id, image }];
    setFlippedCards(newFlippedCards);
    setMoves(moves + 1); // Incrementa o contador de jogadas

    // Verifica se as duas cartas viradas são iguais
    if (newFlippedCards.length === 2) {
      const [first, second] = newFlippedCards;
      if (first.image === second.image) {
        setMatchedCards((prevMatchedCards) => [...prevMatchedCards, first.image]);
        setScore(score + 1);
        setFlippedCards([]);
      } else {
        setTimeout(() => setFlippedCards([]), 1000); // Espere 1 segundo antes de virar as cartas
      }
    }
  };

  // Função de reset do jogo
  const handleReset = () => {
    initGame(); // Re-inicializa o jogo
  };

  return (
    <div className="app">
      <h1>Jogo da Memória</h1>
      <div className="score">Pontuação: {score}</div>
      <div className="moves">Jogadas: {moves}</div> {/* Exibe o contador de jogadas */}
      <button onClick={handleReset} className="reset-button">
        Resetar Jogo
      </button>
      <GameBoard
        cards={cards}
        flippedCards={flippedCards}
        matchedCards={matchedCards}
        onCardClick={handleCardClick}
      />
    </div>
  );
};

export default App;
