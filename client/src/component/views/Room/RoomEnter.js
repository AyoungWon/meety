import React from 'react'
import Peer from 'peerjs';

function RoomEnter({sendNickName, handleNickname, nick, render}) {
  if(render) {
    return (
      <div className="room-enter-wrap">
        <div className="nickName-wrap">
          <label >닉네임</label>
          <input type="test" id="nickName-input" value={nick||''} onChange={handleNickname}></input>
          <button id="enter-btn" onClick={sendNickName}>Enter</button>
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
