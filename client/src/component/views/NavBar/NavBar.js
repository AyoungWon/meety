import React from 'react'
import './NavBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHandshake} from '@fortawesome/free-solid-svg-icons'


function NavBar() {
  return (
    <div className="nav-wrap">
      <ul className="nav-bar left-nav">
        <li id="logo"><a href="/">
        <h1>MEETY</h1>
          <div><FontAwesomeIcon icon={faHandshake}/></div>

          </a></li>
        <li><a href="/room">Chatting</a></li>
      </ul>
      <ul className="nav-bar right-nav"> 
      <li><a href="/register">Signup</a></li>
      <li><a href="/login">Signin</a></li>
      </ul>
    </div>
  )
}

export default NavBar
