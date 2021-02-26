import React from 'react'

function Messages({chat}) {
  console.log(chat)
  return (
    <li>
      {chat.nickName ? (<p><span>{chat.nickName}:</span>{chat.text}</p>) : (<p><span>{chat.nickName}</span>{chat.text}</p>)}
      
    </li>
  )
}

export default Messages
