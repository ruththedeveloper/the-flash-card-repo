import React, { useState } from "react";
import Nav from "../Nav";
import * as Utils from "../../utils/api";
import { useParams, useHistory } from "react-router-dom";
import Form from "./Form";
import { useEffect } from "react";

export default function EditCard({ change }) {
  const [card, setCard] = useState([]);
  const [deck, setDeck] = useState([]);

  const { cardId } = useParams();
  const { deckId } = useParams();
  const history = useHistory();

  async function submitForm(formData) {
    const abortController = new AbortController();

    try {
      const response = await Utils.updateCard(
        { ...formData, id: card.id, deckId: card.deckId },
        abortController.signal
      );

      returnToDeck();
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error(error);
      }
    }
  }
  /// cancelForm
  function returnToDeck() {
    change();
    history.push(`/decks/${deck.id}`);
  }

  ////// loading the card

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
      <Form
        front={card.front}
        back={card.back}
        submitText={"Submit"}
        cancelText={"Cancel"}
        cancelForm={returnToDeck}
        submitForm={submitForm}
      />
    </>
  );
}
