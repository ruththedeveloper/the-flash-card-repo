import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import * as Utils from "../../utils/api";
import Nav from "../Nav";
import { Link } from "react-router-dom";

export default function Study() {
  const history = useHistory();

  const [deck, setDeck] = useState({});
  const [cardIndex, setCardIndex] = useState(0);
  const [cardFlipped, setCardFlipped] = useState(false);

  const { deckId } = useParams();

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

  function flip() {
    setCardFlipped((prevState) => !prevState);
  }
  function nextCard() {
    if (deck.cards.length - 1 <= cardIndex) {
      if (
        window.confirm(
          "Restart cards? \n Click 'cancel' to return to the home page."
        )
      ) {
        setCardFlipped(false);
        setCardIndex(0);
      } else {
        history.push("/");
      }
    } else {
      setCardIndex((prevIndex) => prevIndex + 1);
      setCardFlipped(false);
    }
  }
  
  
  
  if (deck.cards?.length > 2) {
    return (
      <div>
        <Nav
          pageTitle="Study"
          previousPageTitle={deck.name}
          previousPageLink={`/decks/${deck.id}`}
        />
        <h3>Study: {deck.name}</h3>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">
              {" "}
              Card {cardIndex + 1} of {deck.cards?.length}
            </h5>
            <p className="card-text">
              {deck.cards?.[cardIndex]?.[cardFlipped ? "back" : "front"]}
            </p>
            <div>
              <span onClick={flip} href="#" className="btn btn-secondary mr-2">
                Flip
              </span>
              {cardFlipped ? (
                <span onClick={nextCard} href="#" className="btn btn-primary">
                  Next
                </span>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
         <Nav
          pageTitle="Study"
          previousPageTitle={deck.name}
          previousPageLink={`/decks/${deck.id}`}
        />
        
        <h3>{deck.name +' :Study'}</h3>
        <h6> Not enough cards.</h6>
        <p>
        {'You need at least 3 cards to study. There are ' + deck?.cards?.length + ' cards in this deck.'}
        </p>
        <Link to={`/decks/${deck.id}/cards/new`}>
          <span className="btn btn-primary mb-2">
            <span className="oi oi-plus" title="plus" aria-hidden="true"></span>
            Add Cards
          </span>
        </Link>
      </div>
    );
  }
}
