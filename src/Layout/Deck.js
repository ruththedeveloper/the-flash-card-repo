import React, { useState,useEffect } from 'react';
import{Route,Switch,useParams,Link,useHistory} from"react-router-dom";
import EditDeck from './EditDeck';
import * as Utils from "./../utils/api";
import Study from"./Study";
import AddCard from './AddCard';
import Nav from './Nav';

export default function Deck() {
    const [deck,setDeck]=useState({});

    const {deckId}=useParams();
    const history =useHistory();


    useEffect(() => {
        const abortController = new AbortController();
    
        async function loadDeckId() {
          try {
            const response = await Utils.readDeck(deckId,abortController.signal);
            console.log(response);
    
            
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





      

      function handleDelete() {

        
        if (window.confirm("Delete this Deck \n You will not be able to recover it.")) {
            const abortController = new AbortController();

    async function deckDelete() {
      try {
        const response = await Utils.deleteDeck(deckId,abortController.signal);
        console.log(response);

        
        history.push("/")
        
        
        

    
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
              

          

  
};


  return (
      <>








    <div className="app-routes container">
      <Switch>  
        <Route  path="/decks/:deckId/study">
          <Study/>
        </Route>
        <Route path="/decks/:deckId/edit">
          <EditDeck/>
        </Route>
        <Route path="/decks/:deckId/cards/new">
          <AddCard/>
        </Route>
        <Route exact path="/decks/:deckId">
        <Nav/>
      <h5>{deck.name}</h5>
      <p>{deck.description}</p>
      <div>
      <div className='row'>
             <div className='col-10'>
         <Link to="/decks/:deckId/edit"><span  className="btn btn-secondary mr-1"><span className="oi oi-pen" title="pen" aria-hidden="true"></span>Edit</span></Link>
        <Link to="/decks/:deckId/study"><span className="btn btn-primary mr-1"> <span className="oi oi-book" title="person" aria-hidden="true"></span>Study</span></Link>
        <Link to="/decks/:deckId/cards/new"><span className="btn btn-primary"> <span className="oi oi-plus" title="person" aria-hidden="true"></span>Add Cards</span></Link>

         </div>
        <div onClick={handleDelete} className='col-2'><a  className ="btn btn-danger"> <span className="oi oi-trash" title="person" aria-hidden="true"></span></a></div>
         </div>

      </div>

      <h2>Cards</h2>


        </Route>
        
      </Switch>
    </div>
    </>



  )
}
