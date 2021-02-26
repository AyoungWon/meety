import React from 'react'

function Messages(props) {
  console.log('messaggggggg')
  console.log(props)
  return (
    <li>
      <p>{props.chat}</p>
    </li>
  )
}

export default Messages
