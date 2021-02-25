import React, {useEffect} from 'react'

import { withRouter } from 'react-router-dom'
import uuid from 'react-uuid'


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
