import React from 'react'

function Menu({user, logoutHandler}) {

  if((!user)){
    return(
      <ul className="nav-bar right-nav"> 
      <li><a href="/register">Signup</a></li>
      <li><a href="/login">Signin</a></li>
      </ul>
    )

  }else{
    return(
      <ul className="nav-bar right-nav"> 
      <li><a onClick={logoutHandler}>logout</a></li>
      </ul>
    )

  }
}

export default Menu
