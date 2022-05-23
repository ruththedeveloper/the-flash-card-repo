import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Nav from "../Nav";
import * as Utils from "../../utils/api";

export default function CreateDeck() {
  const history = useHistory();
  const [formData, setFormData] = useState({ name: "", description: "" });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();

    try {
      const response = await Utils.createDeck(formData, abortController.signal);
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
    <div>
      <Nav pageTitle="Create Deck" />

      <h2>Create Deck</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            aria-describedby="name"
            placeholder="Deck Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            placeholder="Brief description of the deck "
            className="form-control"
            id="description"
            rows="3"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="row">
          <Link to="/">
            <button className="btn btn-secondary mr-1">Cancel</button>
          </Link>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
