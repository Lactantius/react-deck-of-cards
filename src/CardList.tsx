import React, { useState, useEffect } from "react";
import Card, { CardData } from "./Card";
import "./CardList.css";

function getDeck(): Promise<string> {
  return fetch("http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
    .then((res) => res.json())
    .then((json) => json.deck_id)
    .catch((err) => err);
}

function drawCard(deck: string): Promise<CardData> {
  return fetch(`http://deckofcardsapi.com/api/deck/${deck}/draw/?count=1`)
    .then((res) => res.json())
    .then((json) => ({
      imgURL: json.cards[0].image,
      value: json.cards[0].code,
    }));
  /* .catch((err) => {
   *   const drawCardButton = cardsControls.querySelector(
   *     "#draw-card-button"
   *   ) as HTMLButtonElement;
   *   cardsControls.removeChild(drawCardButton);
   *   return "none";
   * }); */
}

function CardList(): JSX.Element {
  const [deckId, setDeckId] = useState("");
  const [cards, setCards] = useState(Array<CardData>);

  useEffect(() => {
    getDeck().then((id) => setDeckId(id));
  }, []);

  const addCard = async (deck: string) => {
    const card = await drawCard(deck);
    setCards([...cards, card]);
  };

  return (
    <div className="CardList">
      <button onClick={() => addCard(deckId)}>Draw a card</button>
      <button>Autodraw</button>
      <div className="CardList-container">
        {cards.map((card) => (
          <Card imgURL={card.imgURL} value={card.value} key={card.value} />
        ))}
      </div>
    </div>
  );
}

export default CardList;
