import React, {useState, useEffect, Fragment} from 'react'
import Messages from './Messages';

function Chatting({socket,nick,partner}) {
  const [TextTyping, setTextTyping] = useState({
    text:'',
    nickName:nick
  })
  const [ChatMonitor, setChatMonitor] = useState([]);
  const [RecentChat, setRecentChat] = useState({
    text:'',
    nickName:nick
  });
  const [UserEnterMsg, setUserEnterMsg] = useState('')

 const onInputHandler = (e) => {
  setTextTyping({
    ...TextTyping,
    nickName: nick,
    text:e.currentTarget.value
  })
 }

 const onInputEnter = (e) => {
  if(e.keyCode == 13 && TextTyping.length !== 0){
    socket.emit('message', {TextTyping})
    setTextTyping({ ...TextTyping, text: '' })
  }
 }

 const scrollToBottom = () => {
  document.getElementById('chatMonitor').scrollBy({ top: 100 });
};

 useEffect(() => {
  socket.on('createMessage', message => {
    setRecentChat(message.TextTyping)
  })
  socket.on('userEnterMsg', nick => {
    if(nick !== null){
      setUserEnterMsg({
        text: `${nick}님이 입장하셨습니다.`,
        color: [0,0,0]
      })
    }
  })

 }, [])

 useEffect(() => {
   if(RecentChat.text){
    RecentChat.text.length > 0 && setChatMonitor([...ChatMonitor, RecentChat] );
    scrollToBottom();
    setRecentChat({text:''})
   }
}, [RecentChat]);

 useEffect(() => {
   if(UserEnterMsg.text){
    UserEnterMsg.text.length > 0 && setChatMonitor([...ChatMonitor, UserEnterMsg] );
    scrollToBottom();
    setUserEnterMsg({text:''})
   }
}, [UserEnterMsg]);




  return (
    <div className="chat-wrap">
        <div className="chat-header"><h2>채팅</h2></div>
        <div id="chatMonitor" className="chat-window ">
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
          value={TextTyping.text||''}
          onKeyDown={onInputEnter}
          onChange={onInputHandler} />
        </div>
    </div>
  )
}

export default Chatting
