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

function useToggle(
  initial: boolean
): [boolean, (arg0: boolean) => void, () => void] {
  const [state, setState] = useState(initial);
  const toggleState = () => {
    setState((state) => !state);
  };
  return [state, setState, toggleState];
}

function CardList(): JSX.Element {
  const [deckId, setDeckId] = useState("");
  const [cards, setCards] = useState(Array<CardData>);
  const [drawAll, setDrawAll, toggleDrawAll] = useToggle(false);

  const addCard = (deck: string) => {
    drawCard(deck)
      .then((card) => setCards([...cards, card]))
      .catch((err) => {
        setDeckId("");
        setDrawAll(false);
      });
  };

  const newDeck = () => {
    setCards([]);
    getDeck();
  };

  useEffect(() => {
    getDeck().then((id) => setDeckId(id));
  }, []);

  useEffect(() => {
    /* if (drawAll && !timerRef.current) {
     *   timerRef.current = setInterval(() => {
     *     addCard(deckId);
     *     console.log(`Interval ${timerRef.current}`);
     *   }, 1000);
     * } */

    /* return () => {
     *   if (timerRef.current) clearInterval(timerRef.current);
     *   timerRef.current = null;
     * }; */

    const intervalId = drawAll
      ? setInterval(() => {
          addCard(deckId);
          console.log(`Interval ${intervalId}`);
        }, 1000)
      : null;

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [drawAll, toggleDrawAll, deckId]);

  return (
    <div className="CardList">
      <div className="CardList-buttons">
        {deckId ? (
          <>
            <button onClick={() => addCard(deckId)}>Draw a card</button>
            <button onClick={() => toggleDrawAll()}>Autodraw</button>
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
