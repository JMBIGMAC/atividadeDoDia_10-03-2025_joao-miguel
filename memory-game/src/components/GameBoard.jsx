import React, { useState, useEffect } from "react";
import Card from "./Card";
import "../../src/App.css";

const GameBoard = () => {
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [lives, setLives] = useState(5); // Vidas do jogador
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [time, setTime] = useState(0); // Tempo em segundos
  const [gameOver, setGameOver] = useState(false); // Indica se o jogador perdeu

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

    const shuffledCards = [...images, ...images]
      .map((card) => ({ image: card, id: Math.random(), isFlipped: false }))
      .sort(() => Math.random() - 0.5);

    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedCards([]);
    setScore(0);
    setMoves(0);
    setLives(5); // Reinicia as vidas
    setTime(0); // Reinicia o tempo
    setGameOver(false); // Reinicia o estado de derrota
  };

  // Inicia o jogo ao carregar
  useEffect(() => {
    initGame();
  }, []);

  // Timer
  useEffect(() => {
    let timer;
    if (score < 8 && !gameOver) {
      timer = setInterval(() => setTime((prevTime) => prevTime + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [score, gameOver]);

  const handleCardClick = (id, image) => {
    if (flippedCards.length === 2 || gameOver || score === 8) return;

    const newFlippedCards = [...flippedCards, { id, image }];
    setFlippedCards(newFlippedCards);
    setMoves(moves + 1);

    if (newFlippedCards.length === 2) {
      const [first, second] = newFlippedCards;
      if (first.image === second.image) {
        setMatchedCards((prevMatchedCards) => [...prevMatchedCards, first.image]);
        setScore(score + 1);
        setFlippedCards([]);
      } else {
        setTimeout(() => setFlippedCards([]), 1000);
        setLives((prevLives) => prevLives - 1); // Perde uma vida
      }
    }
  };

  // Verifica se o jogador perdeu
  useEffect(() => {
    if (lives === 0) {
      setGameOver(true);
    }
  }, [lives]);

  const handleReset = () => {
    initGame();
  };

  return (
    <>
      <div className="game-info">
        <div className="timer">Tempo: {time}s</div>
        <div className="score">Pontuação: {score}</div>
        <div className="lives">Vidas: {lives}</div>
        <div className="moves">Jogadas: {moves}</div>
      </div>
      {gameOver ? (
        <div className="game-over-message">
          <h2>Você perdeu! Tente de novo.</h2>
          <button onClick={handleReset} className="reset-button">
            Jogar Novamente
          </button>
        </div>
      ) : score === 8 ? (
        <div className="win-message">
          <h2>Parabéns, você ganhou!</h2>
          <p>Tempo gasto: {time}s</p>
          <button onClick={handleReset} className="reset-button">
            Jogar Novamente
          </button>
        </div>
      ) : (
        <div className="game-board">
          {cards.map((card) => (
            <Card
              key={card.id}
              card={card}
              flipped={
                flippedCards.some((flipped) => flipped.id === card.id) ||
                matchedCards.includes(card.image)
              }
              onClick={handleCardClick}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default GameBoard;