import React, { useState, useEffect } from "react";
import Nav from "../Nav";
import * as Utils from "../../utils/api";

import { useParams, useHistory } from "react-router-dom";
import Form from "./Form";

export default function AddCard({ change }) {
  const { deckId } = useParams();

  const [deck, setDeck] = useState();
  const history = useHistory();
  ////////////
  async function submitForm(formData) {
    const abortController = new AbortController();

    try {
      await Utils.createCard(deck.id, formData, abortController.signal);
      //setFormData({ front: "", back: "" });
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error(error);
      }
    }

    // createNewDeck();

    return () => {
      abortController.abort(); // cancels any pending request or response
    };
  }

  function doneAdding() {
    change();
    history.push(`/decks/${deck?.id}`);
  }

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

      <Form
        front=""
        back=""
        cancelForm={doneAdding}
        submitText={"Save"}
        cancelText={"Done"}
        submitForm={submitForm}
      />
    </div>
  );
}
