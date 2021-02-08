import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
//import { response } from 'express'

function LandingPage(props) {


const [userInfo, setuserInfo] = useState(false)
  
  const loadItem = async () => {
    axios
      .get('/api/users/auth')
      .then(( response ) => {
        setuserInfo(response.data);
        console.log(response.data)
      })
      .catch(e => {  // API 호출이 실패한 경우
        console.error(e);  // 에러표시
      
      });
  };

  useEffect(() => {
    loadItem()
  }, [])
     
/*   useEffect(() => {
    axios.get('/api/users/auth')
    .then(response => {
      setuserInfo(response.data);
      console.log(response.data)})
  }, []) */

  const onClickHandler = () => {
    axios.get('/api/users/logout')
    .then(response => {
      if(response.data.success){
        props.history.push('/login')
      } else {
        alert ('로그아웃 실패')
      }
    })
  } 


  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100vh'
    }}>
      <h2>LandingPage</h2>
      {userInfo.isAuth ? (<br/>):(<button onClick = {onClickHandler} >Logout</button>)}
    </div>
  )
}

export default withRouter(LandingPage)
