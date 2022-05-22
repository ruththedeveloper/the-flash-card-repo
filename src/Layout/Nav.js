import React from 'react'
import { Link } from 'react-router-dom'

export default function Nav() {
  return (
    <div>

<nav aria-label="breadcrumb" >
  <ol className="breadcrumb">
    <li className="breadcrumb-item"> <Link to="/"><span href="#"><span className="oi oi-home" title="home" aria-hidden="true"></span>
     Home</span> </Link></li>

    <li className="breadcrumb-item"><a href="#">Card Title</a></li>
    <li className="breadcrumb-item active" aria-current="page">Study</li>
  </ol>
</nav>


    </div>
  )
}
