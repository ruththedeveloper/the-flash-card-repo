import React, { useState } from "react";
import Nav from "../Nav";
import * as Utils from "../../utils/api";
import { useParams } from "react-router-dom";
import EditAndAddForm from "./EditAndAddForm";
import { useEffect } from "react";

export default function EditCard() {
  const [card, setCard] = useState([]);
  const [deck, setDeck] = useState([]);

  const { cardId } = useParams();
  const { deckId } = useParams();

  useEffect(() => {
    const abortController = new AbortController();

    async function loadCardId() {
      try {
        const response = await Utils.readCard(cardId, abortController.signal);
        setCard(response);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(error);
        }
      }
    }

    loadCardId();

    return () => {
      abortController.abort(); // cancels any pending request or response
    };
  }, [cardId]);

  useEffect(() => {
    const abortController = new AbortController();

    async function loadDeckId() {
      try {
        const response = await Utils.readDeck(deckId, abortController.signal);
        setDeck(response);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(error);
        }
      }
    }

    loadDeckId();

    return () => {
      abortController.abort(); // cancels any pending request or response
    };
  }, [deckId]);

  return (
    <>
      <Nav
        pageTitle={`Edit Card ${cardId}`}
        previousPageTitle={deck.name}
        previousPageLink={`/decks/${deck.id}`}
      />

      <h1>Edit Card</h1>
      <EditAndAddForm editing={true} deck={deck} card={card} />
    </>
  );
}
