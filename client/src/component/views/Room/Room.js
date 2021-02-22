import React,{useEffect, useState} from 'react'
import { withRouter } from 'react-router-dom'
import uuid from 'react-uuid'

function Room() {
  useEffect(() => {
  window.location.href=`/room/${uuid()}`
  //window.location.href='https://www.naver.com/'

  }, [])
  return (
    <div>
      room landing
    </div>
  )
}

export default withRouter(Room)
