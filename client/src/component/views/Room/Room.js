import React, {useEffect, useState} from 'react'
import { withRouter } from 'react-router-dom'
import uuid from 'react-uuid'
import RoomEnter from './RoomEnter'
import './Room.css'


function Room() {
  const [NickName, setNickName] = useState()
  const [Render, setRender] = useState(true)
  const [RoomNumber, setRoomNumber] = useState()
  const [NeedName, setNeedName] = useState(true)
  useEffect(() => {
    if(window.sessionStorage.getItem("nickName")){
      setNickName(window.sessionStorage.getItem("nickName"))
      setNeedName(false)
    }
  
  }, [])

  const sendNickName = () => {
    window.sessionStorage.setItem("nickName", NickName)
    setRender(false)
    setNeedName(true)
  }

  const handleNickname = (e) => {
    setNickName(e.currentTarget.value)
  }
  const onRoomNumberHandler = (e) => {
    setRoomNumber(e.currentTarget.value)
  }

  const onNicknameChange = () => {
  setNeedName(true)
  setRender(true)
  }

 return (
  <div>
    <div className="room-main">
      <p id="greeting">안녕하세요! <span id="name">{NickName}</span> 님</p>
      <ul>
      <li>
          <input type="text" 
          value={RoomNumber}
          onChange={onRoomNumberHandler}></input>
          <a href={`/room/${RoomNumber}`}>입장하기</a>
        </li>
        <li>
          <a href={`/room/${uuid()}`}>새로운 방 만들기</a>
        </li>

      <button onClick={onNicknameChange}>닉네임 바꾸기</button>
      </ul>
    </div>
    {NeedName ? (  <RoomEnter
    render={Render}
    nick={NickName}
    handleNickname={handleNickname}
    sendNickName={sendNickName}/>) : null}

</div>
)
 }

export default withRouter(Room)
