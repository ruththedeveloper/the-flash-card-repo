import React from 'react'
import { Link} from 'react-router-dom';

export default function EditAndAddForm() {
  return (
    <form>
  <div class="form-group">
    <label htmlFor="formGroupExampleInput">Front</label>
    <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Front side of card"/>
  </div>
  <div className="form-group">
    <label htmlFor="formGroupExampleInput2">Back</label>
    <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Back side of card"/>
  </div>
  <div>
  <Link to="/decks/:deckId"><button  className="btn btn-secondary mr-1">Done</button></Link>
  <button  className="btn btn-primary ">Save</button>



  </div>
 </form>
  )
}
