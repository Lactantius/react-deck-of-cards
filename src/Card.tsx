import React from "react";
import "./Card.css";

interface CardData {
  imgURL: string;
  value: string;
}

function Card({ imgURL, value }: CardData): JSX.Element {
  return <img className="Card" src={imgURL} alt={value}></img>;
}

export default Card;
export type { CardData };
