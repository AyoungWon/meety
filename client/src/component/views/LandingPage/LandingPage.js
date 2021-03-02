import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import './LandingPage.css'

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
    <div className="landing-wrap" >
      <h2>HELLO! WELCOM TO <span className="color-highlight">MEETY</span> </h2>
      <h3>MEETY는 <span className="color-highlight">1:1 화상채팅 서비스</span>입니다. 다자간 화상채팅은 서비스되지 않습니다</h3>
      <ul>
      <h3>요구사항</h3>
      <li>Chrome 브라우저 이용을 권장합니다</li>
      <li>카메라와 마이크 권한 설정을 필요로 합니다</li>
      <li>로그인하신 후 채팅에 입장해주세요</li>
      </ul>

{/*       {userInfo.isAuth ? (<br/>):(<button onClick = {onClickHandler} >Logout</button>)} */}
    </div>
  )
}

export default withRouter(LandingPage)
