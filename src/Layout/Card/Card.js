import React from "react";
import { Link, useParams } from "react-router-dom";
import * as Utils from "../../utils/api";

export default function Card(props) {
  const { deckId } = useParams();

  function handleCardDelete() {
    if (
      window.confirm("Delete this Card? \n You will not be able to recover it.")
    ) {
      const abortController = new AbortController();

      async function cardDelete() {
        try {
           await Utils.deleteCard(
            props.card.id,
            abortController.signal
          );
          props.change();
        } catch (error) {
          if (error.name !== "AbortError") {
            console.error(error);
          }
        }
      }

      cardDelete();

      return () => {
        abortController.abort(); // cancels any pending request or response
      };
    }
  }

  return (
    <>
      <div className="card p-4">
        <div className="row">
          <div className="col-sm-5 col-md-6">{props.card?.front}</div>
          <div className="col-sm-5 offset-sm-2 col-md-6 offset-md-0">
            {" "}
            {props.card?.back}
          </div>
        </div>

        <div className="row pt-2">
          <div className="col-sm-2 offset-sm-10 text-right">
            <Link to={`/decks/${deckId}/cards/${props.card.id}/edit`}>
              <button className="btn btn-secondary mr-1 ">
                <span
                  className="oi oi-pencil"
                  title="person"
                  aria-hidden="true"
                ></span>
                Edit
              </button>
            </Link>

            <span onClick={handleCardDelete} className="btn btn-danger ">
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
    </>
  );
}
