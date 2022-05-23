import React, { useState, useEffect } from "react";
import Nav from "../Nav";
import * as Utils from "../../utils/api";

import {useParams } from "react-router-dom";
import EditAndAddForm from "./EditAndAddForm";

export default function AddCard() {
  const { deckId } = useParams();

  const [deck, setDeck] = useState();

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
    <div>
      <Nav
        pageTitle="Add Card"
        previousPageTitle={deck?.name}
        previousPageLink={`/decks/${deck?.id}`}
      />

      <h2>{deck?.name}:Add Card</h2>

      <EditAndAddForm deck={deck} editing={false} />
    </div>
  );
}
