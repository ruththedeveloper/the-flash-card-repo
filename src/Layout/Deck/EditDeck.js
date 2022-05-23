import React, { useEffect, useState } from "react";
import Nav from "../Nav";
import * as Utils from "../../utils/api";
import { useParams, Link, useHistory } from "react-router-dom";

export default function EditDeck() {
  const history = useHistory();
  const [deck, setDeck] = useState({});
  const [formData, setFormData] = useState({ name: "", description: "" });
  const { deckId } = useParams();

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  }

  useEffect(() => {
    const abortController = new AbortController();

    async function loadDeckId() {
      try {
        const response = await Utils.readDeck(deckId, abortController.signal);
        
        setFormData(response);
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

  async function handleSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();

    try {
      const response = await Utils.updateDeck(formData, abortController.signal);
      history.push(`/decks/${response.id}`);
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

  return (
    <>
      <Nav
        pageTitle="Edit Deck"
        previousPageTitle={deck.name}
        previousPageLink={`/decks/${deck.id}`}
      />

      <h2>EditDeck</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            onChange={handleChange}
            type="text"
            value={formData.name}
            className="form-control"
            id="name"
            aria-describedby="name"
            placeholder=""
            name="name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            onChange={handleChange}
            placeholder=""
            value={formData.description}
            className="form-control"
            id="description"
            rows="3"
            name="description"
          />
        </div>

        <div className="row">
          <Link to={`/decks/${deck.id}`}>
            <button className="btn btn-secondary mr-1">Cancel</button>
          </Link>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </>
  );
}
