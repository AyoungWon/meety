import React from 'react'


function RoomEnter({sendNickName, handleNickname, nick, render}) {
  if(render) {
    return (
      <div className="room-enter-wrap">
        <h2>닉네임 설정</h2>
        <div className="nickName-wrap">

          <input type="test" id="nickName-input" value={nick||''} onChange={handleNickname}></input>
          <button id="enter-btn" onClick={sendNickName}>완료</button>
        </div>
      </div>
    )
  }else{
    return (
      null
    )
  }


}

export default RoomEnter
