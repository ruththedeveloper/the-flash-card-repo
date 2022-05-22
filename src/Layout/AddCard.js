import React from 'react'
import Nav from"./Nav";
import {Link} from "react-router-dom";
import EditAndAddForm from './EditAndAddForm';

export default function AddCard() {
  return (<div>
  <Nav/>
    <div>AddCard</div>
 <h2>:Add Card</h2>

 <EditAndAddForm/>


    </div>
  )
}
