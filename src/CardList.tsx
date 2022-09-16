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
  // Not caught here, but in the addCard function
}

function CardList(): JSX.Element {
  const [deckId, setDeckId] = useState("");
  const [cards, setCards] = useState(Array<CardData>);

  useEffect(() => {
    getDeck().then((id) => setDeckId(id));
  }, []);

  const addCard = (deck: string) => {
    drawCard(deck)
      .then((card) => setCards([...cards, card]))
      .catch((err) => setDeckId(""));
  };

  const newDeck = () => {
    setCards([]);
    getDeck();
  };

  return (
    <div className="CardList">
      <div className="CardList-buttons">
        {deckId ? (
          <>
            <button onClick={() => addCard(deckId)}>Draw a card</button>
            <button>Autodraw</button>
          </>
        ) : null}
        <button onClick={() => newDeck()}>New Deck?</button>
      </div>
      <div className="CardList-container">
        {cards.map((card) => (
          <Card imgURL={card.imgURL} value={card.value} key={card.value} />
        ))}
      </div>
    </div>
  );
}

export default CardList;
