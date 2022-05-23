import React from "react";
import DeckCard from "./DeckCard";

export default function DeckList({ deckData, handleDelete }) {
  const deckElement = deckData.map((deck) => (
    <DeckCard
      key={deck.id}
      title={deck.name}
      numberOfCard={deck.cards.length}
      description={deck.description}
      id={deck.id}
      handleDelete={handleDelete}
    />
  ));

  return <div>{deckElement}</div>;
}
