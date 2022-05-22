import React from 'react';
import Nav from "./Nav";

export default function EditDeck() {
  return (<>
      <Nav/>
    <div>EditDeck</div>

    <form  >
  <div className="form-group">
    <label htmlFor="name">Name</label>
    <input type="text" className="form-control" id="name" aria-describedby="name" placeholder="" name="name" />
  </div>
  <div className="form-group">
    <label htmlFor="description">Description</label>
    <textarea placeholder='' className="form-control" id="description" rows="3" name="description"  />
  </div>





  <div className='row'>
  <button  className="btn btn-secondary mr-1">Cancel</button>

  <button  type="submit" className="btn btn-primary">Submit</button>
  </div>
</form>


    </>
  )
}
