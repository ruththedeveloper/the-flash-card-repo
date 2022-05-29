import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import * as Utils from "../../utils/api";

export default function EditAndAddForm({ card, deck, editing }) {
  const [formData, setFormData] = useState({ front: "", back: "" });

  const history = useHistory();

  useEffect(() => {
    if (editing) setFormData({ front: card?.front, back: card?.back });
  }, [card, editing]);

  async function handleSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();

    try {
      if (editing) {
        const response = await Utils.updateCard(
          { ...formData, id: card.id, deckId: card.deckId },
          abortController.signal
        );
        setFormData(response);

        history.push(`/decks/${deck.id}`);
      } else {
        await Utils.createCard(deck.id, formData, abortController.signal);
        setFormData({ front: "", back: "" });
      }
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

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="formGroupExampleInput">Front</label>
        <textarea
          name="front"
          onChange={handleChange}
           value={formData?.front}
          //defaultValue={card? card.front: ""}
          type="text"
          className="form-control"
          id="formGroupExampleInput"
          placeholder="Front side of card"
        />
      </div>
      <div className="form-group">
        <label htmlFor="formGroupExampleInput2">Back</label>
        <textarea
          name="back"
          onChange={handleChange}
          //defaultValue={card? card.back : ""}
          value={formData?.back}
          type="text"
          className="form-control"
          id="formGroupExampleInput2"
          placeholder="Back side of card"
        />
      </div>
      {editing ? (
        <div>
          <Link to={`/decks/${deck?.id}`}>
            <button className="btn btn-secondary mr-1">Cancel</button>
          </Link>
          <button type="submit" className="btn btn-primary ">
            Submit
          </button>
        </div>
      ) : (
        <div>
          <Link to={`/decks/${deck?.id}`}>
            <button className="btn btn-secondary mr-1">Done</button>
          </Link>
          <button type="submit" className="btn btn-primary ">
            Save
          </button>
        </div>
      )}
    </form>
  );
}
