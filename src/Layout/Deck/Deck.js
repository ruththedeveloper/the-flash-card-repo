import React, { useState, useEffect } from "react";
import { Route, Switch, useParams, Link, useHistory } from "react-router-dom";
import EditDeck from "./EditDeck";
import * as Utils from "../../utils/api";
import Study from "./Study";
import AddCard from "./../Card/AddCard";
import Nav from "../Nav";
import Card from "../Card/Card";
import EditCard from "../Card/EditCard";

export default function Deck() {
  const [deck, setDeck] = useState({});
  const [change, setChange] = useState(false);

  const { deckId } = useParams();
  const history = useHistory();

  useEffect(() => {
    setChange(false);

    const abortController = new AbortController();
    setChange(false);

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
    ////
  }, [deckId, change]);

  function handleDelete() {
    if (
      window.confirm("Delete this Deck \n You will not be able to recover it.")
    ) {
      const abortController = new AbortController();

      async function deckDelete() {
        try {
          await Utils.deleteDeck(
            deckId,
            abortController.signal
          );

          history.push("/");
        } catch (error) {
          if (error.name !== "AbortError") {
            console.error(error);
          }
        }
      }

      deckDelete();

      return () => {
        abortController.abort(); // cancels any pending request or response
      };
    }
  }
  /// passing card since it an object containing the id , front , back
  const cardElements = deck.cards?.map((card) => (
    <Card key={card.id} card={card} change={notifyDeckOfChange} />
  ));

  function notifyDeckOfChange() {
    setChange(true);
  }

  return (
    <>
      <div className="app-routes container">
        <Switch>
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>

          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route exact path="/decks/:deckId">
            <Nav pageTitle={deck.name} />

            <h5>{deck.name}</h5>
            <p>{deck.description}</p>
            <div>
              <div className="row">
                <div className="col-10">
                  <Link to={`/decks/${deck.id}/edit`}>
                    <span className="btn btn-secondary mr-1">
                      <span
                        className="oi oi-pencil"
                        title="pen"
                        aria-hidden="true"
                      ></span>
                      Edit
                    </span>
                  </Link>
                  <Link to={`/decks/${deck.id}/study`}>
                    <span className="btn btn-primary mr-1">
                      {" "}
                      <span
                        className="oi oi-book"
                        title="person"
                        aria-hidden="true"
                      ></span>
                      Study
                    </span>
                  </Link>
                  <Link to={`/decks/${deck.id}/cards/new`}>
                    <span className="btn btn-primary">
                      {" "}
                      <span
                        className="oi oi-plus"
                        title="person"
                        aria-hidden="true"
                      ></span>
                      Add Cards
                    </span>
                  </Link>
                </div>
                <div onClick={handleDelete} className="col-2 text-right">
                  <span className="btn btn-danger">
                    {" "}
                    <span
                      className="oi oi-trash"
                      title="person"
                      aria-hidden="true"
                    ></span>
                  </span>
                </div>
              </div>
            </div>

            <h1>Cards</h1>
            {cardElements}
          </Route>
        </Switch>
      </div>
    </>
  );
}
