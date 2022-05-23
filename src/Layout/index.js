import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home";
import {Route,Switch} from "react-router-dom";
import CreateDeck from "./Deck/CreateDeck";
import Deck from "./Deck/Deck";


function Layout() {
  return (
    <>
      <Header />

      <div className="app-routes container">
      <Switch>
        <Route  exact path="/">
          <Home/>
        </Route>
        <Route path="/decks/new">
          <CreateDeck/>
        </Route>
        <Route path="/decks/:deckId">
          <Deck/>
        </Route>
        <Route>
          <NotFound/>
        </Route>
      </Switch>
    </div>

    </>
  );
}

export default Layout;
