import React, {useState, useEffect, Fragment} from 'react'
import Messages from './Messages';

function Chating({socket}) {
  const [TextTyping, setTextTyping] = useState('')
  const [ChatMonitor, setChatMonitor] = useState([]);
  const [RecentChat, setRecentChat] = useState('');
  const test = 'test'

 const onInputHandler = (e) => {
  setTextTyping(e.currentTarget.value)
 }

 const onInputEnter = (e) => {
  if(e.keyCode == 13n && TextTyping.length !== 0){
    socket.emit('message', TextTyping)
    setTextTyping('')
  }
 }

 useEffect(() => {
  socket.on('createMessage', message => {
    console.log('확인',message)
    setRecentChat(message)
  })
 }, [])

 useEffect(() => {
   console.log(ChatMonitor)
  RecentChat.length > 0 && setChatMonitor([...ChatMonitor, RecentChat]);
  setRecentChat('');
}, [RecentChat]);




  return (
    <div className="chat-wrap">
        <div className="chat-header"><h2>채팅</h2></div>
        <div className="chat-window">
          <ul className="massages">
            {ChatMonitor && ChatMonitor.map((chat, index) => (
              <Fragment key={index}>
                <Messages chat={chat} />
              </Fragment>
              
            ))}
            
          </ul>
        </div>
        <div className="massage-input">
        <input id="chat_message" 
          type="text" 
          placeholder="Type message here..." 
          value={TextTyping}
          onKeyDown={onInputEnter}
          onChange={onInputHandler} />
        </div>
    </div>
  )
}

export default Chating
