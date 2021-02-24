import React, {useEffect, useState, useRef} from 'react'
import { useDispatch,useSelector} from 'react-redux'
import { withRouter } from 'react-router-dom'
import uuid from 'react-uuid'
import io from "socket.io-client";

function Room() {
  useEffect(() => {
  window.location.href=`/room/${uuid()}`
  }, [])

 
 return (
  <div>
  room landing
</div>
)
 }

export default withRouter(Room)
