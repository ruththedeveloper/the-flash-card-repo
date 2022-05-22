import React,{useEffect, useState} from 'react'
import DeckList from './DeckList'
import * as Utils from "./../utils/api"
import {Link} from "react-router-dom"


export default function Home() {
    const [deckData, setDeckData]=useState([]);
    const[change,setChange]=useState(false);



    function handleDelete(id) {

        
        if (window.confirm("Delete this deck? \n You will not be able to recover it.")) {
            const abortController = new AbortController();

    async function deckDelete() {
      try {
        const response = await Utils.deleteDeck(id,abortController.signal);
        console.log(response);

        setChange(true)
        
        
        

    
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





















    



        useEffect(() => {
            setDeckData([]);
            setChange(false);
            const abortController = new AbortController(); // Create a new `AbortController`
          
            async function loadDecks() {
              try {
                const response = 
                   await Utils.listDecks(abortController.signal)

                
                console.log(response)
                setDeckData(response);
                


            
              } catch (error) {
                if (error.name === "AbortError") {
                  // Ignore `AbortError`
                  console.log("Aborted");
                } else {
                  throw error;
                }
              }
            }
          
            loadDecks();

            console.log(deckData);
          
            return () => {
              console.log("cleanup");
              abortController.abort(); // Cancels any pending request or response
            };
          }, [change]);













    
    






  return (
    <div>
<h1>Home</h1>
<Link to="/decks/new"><span className='btn btn-secondary mb-2'><span className="oi oi-plus" title="plus" aria-hidden="true"></span>Create Deck </span></Link>
<DeckList  deckData={deckData} handleDelete={handleDelete}/>



 
    </div>
  )
}
