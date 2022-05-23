import React from "react";
import { Link } from "react-router-dom";

export default function DeckCard(props) {
  return (
    <div className="card">
      <div className="card-body">
        <div className="row">
          <div className="col-10">
            {" "}
            <h5 className="card-title"> {props.title}</h5>
          </div>
          <div className="col-2">
            <span>{props.numberOfCard} cards</span>
          </div>
        </div>
        <p className="card-text">{props.description}</p>
        <div className="row">
          <div className="col-10">
            <Link to={`/decks/${props.id}`}>
              {" "}
              <span className="btn btn-secondary mr-1">
                <span
                  className="oi oi-eye"
                  title="eye"
                  aria-hidden="true"
                ></span>
                View
              </span>
            </Link>
            <Link to={`/decks/${props.id}/study`}>
              {" "}
              <span className="btn btn-primary">
                {" "}
                <span
                  className="oi oi-book"
                  title="person"
                  aria-hidden="true"
                ></span>
                Study
              </span>
            </Link>
          </div>
          <div className="col-2">
            <span
              onClick={() => props.handleDelete(props.id)}
              className="btn btn-danger"
            >
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
    </div>
  );
}
