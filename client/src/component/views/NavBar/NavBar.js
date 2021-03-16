import React,{useState, useEffect} from 'react'
import './NavBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHandshake} from '@fortawesome/free-solid-svg-icons'
import { useSelector } from "react-redux";
import Menu from './Menu';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';


function NavBar() {
  const user = useSelector(state => state.user)
  const [userInfo, setuserInfo] = useState(false)
  
  useEffect(() => {
  if(user.loginSuccess){
    setuserInfo(true)
  }
  }, [user])


  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        setuserInfo(false)
      } else {
        alert('Log Out Failed')
      }
    });
  };

  return (
    <div className="nav-wrap">
      <ul className="nav-bar left-nav">
        <li id="logo"><a href="/">
        <h1>MEETY</h1>
          <div><FontAwesomeIcon icon={faHandshake}/></div>

          </a></li>
        <li><a href="/room">Chatting</a></li>
      </ul>
      <Menu
      user={userInfo}
      logoutHandler={logoutHandler}
      />
    </div>
  )
}

export default NavBar
