import React from 'react'
import { Link } from 'react-router-dom'

export default function Nav({pageTitle,previousPageTitle,previousPageLink}) {
  return (
    <div>

<nav aria-label="breadcrumb" >
  <ol className="breadcrumb">
    <li className="breadcrumb-item"> <Link to="/"><span ><span className="oi oi-home" title="home" aria-hidden="true"></span>
     Home</span> </Link></li>

   { previousPageLink? <li className="breadcrumb-item"><Link to= {previousPageLink}><span >{previousPageTitle}</span> </Link></li>:""}
    <li className="breadcrumb-item active" aria-current="page">{pageTitle}</li>
  </ol>
</nav>


    </div>
  )
}
